"use client";

import { useState, useEffect } from "react";
import { z } from "zod";
import { api, type RouterOutputs } from "~/trpc/react";
import { ImageUpload } from "./image-upload";

type Project = RouterOutputs["project"]["getProjects"][number];

const projectSchema = z
  .object({
    projectName: z.string().min(1, "Project name is required"),
    description: z.string().min(1, "Description is required"),
    photos: z.array(z.string().url("Invalid URL format")),
    donationGoalAmount: z
      .number()
      .positive("Donation goal amount must be positive"),
    currentDonationAmount: z
      .number()
      .min(0, "Current donation amount cannot be negative"),
    projectType: z.string().min(1, "Project type is required"),
    projectNature: z.enum(["Continuous", "One-time"], {
      required_error:
        "Project nature must be either 'Continuous' or 'One-time'",
    }),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    donationLinkTarget: z.enum(["Daily Dana", "Poya Day", "Special Projects"], {
      required_error:
        "Donation link target must be 'Daily Dana', 'Poya Day', or 'Special Projects'",
    }),
  })
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return data.startDate <= data.endDate;
      }
      return true;
    },
    {
      message: "End date must be after start date",
      path: ["endDate"],
    },
  );

interface ProjectFormProps {
  onProjectCreated?: () => void;
  onProjectUpdated?: () => void;
  onCancel?: () => void;
  editProject?: Project;
  mode?: "create" | "edit";
}

export function ProjectForm({
  onProjectCreated,
  onProjectUpdated,
  onCancel,
  editProject,
  mode = "create",
}: ProjectFormProps) {
  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    photos: [] as string[],
    donationGoalAmount: "" as string | number,
    currentDonationAmount: "" as string | number,
    projectType: "",
    projectNature: "Continuous" as "Continuous" | "One-time",
    startDate: "",
    endDate: "",
    donationLinkTarget: "Daily Dana" as
      | "Daily Dana"
      | "Poya Day"
      | "Special Projects",
  });
  const [newPhotoUrl, setNewPhotoUrl] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Populate form with edit data when in edit mode
  useEffect(() => {
    if (mode === "edit" && editProject) {
      const formatDateForInput = (date: Date | null) => {
        if (!date) return "";
        const localDate = new Date(
          date.getTime() - date.getTimezoneOffset() * 60000,
        );
        return localDate.toISOString().slice(0, 10);
      };

      setFormData({
        projectName: editProject.projectName,
        description: editProject.description,
        photos: editProject.photos,
        donationGoalAmount:
          typeof editProject.donationGoalAmount?.toNumber === "function"
            ? editProject.donationGoalAmount.toNumber()
            : Number(editProject.donationGoalAmount) || 0,
        currentDonationAmount:
          typeof editProject.currentDonationAmount?.toNumber === "function"
            ? editProject.currentDonationAmount.toNumber()
            : Number(editProject.currentDonationAmount) || 0,
        projectType: editProject.projectType,
        projectNature: editProject.projectNature as "Continuous" | "One-time",
        startDate: formatDateForInput(editProject.startDate),
        endDate: formatDateForInput(editProject.endDate),
        donationLinkTarget: editProject.donationLinkTarget as
          | "Daily Dana"
          | "Poya Day"
          | "Special Projects",
      });
    }
  }, [mode, editProject]);

  const createProjectMutation = api.project.createProject.useMutation({
    onSuccess: () => {
      // Reset form
      setFormData({
        projectName: "",
        description: "",
        photos: [],
        donationGoalAmount: "",
        currentDonationAmount: "",
        projectType: "",
        projectNature: "Continuous",
        startDate: "",
        endDate: "",
        donationLinkTarget: "Daily Dana",
      });
      setErrors({});
      onProjectCreated?.();
    },
    onError: (error) => {
      console.error("Error creating project:", error);
      setErrors({ submit: error.message });
    },
  });

  const updateProjectMutation = api.project.updateProject.useMutation({
    onSuccess: () => {
      setErrors({});
      onProjectUpdated?.();
    },
    onError: (error) => {
      console.error("Error updating project:", error);
      setErrors({ submit: error.message });
    },
  });

  const validateForm = () => {
    const transformedData = {
      ...formData,
      // Convert number fields properly, ensuring they're numbers for validation
      donationGoalAmount:
        typeof formData.donationGoalAmount === "string" &&
        formData.donationGoalAmount === ""
          ? 0
          : Number(formData.donationGoalAmount),
      currentDonationAmount:
        typeof formData.currentDonationAmount === "string" &&
        formData.currentDonationAmount === ""
          ? 0
          : Number(formData.currentDonationAmount),
      startDate: formData.startDate ? new Date(formData.startDate) : undefined,
      endDate: formData.endDate ? new Date(formData.endDate) : undefined,
    };

    const result = projectSchema.safeParse(transformedData);
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        newErrors[issue.path[0] as string] = issue.message;
      }
      setErrors(newErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const submitData = {
      projectName: formData.projectName.trim(),
      description: formData.description.trim(),
      photos: formData.photos,
      donationGoalAmount:
        typeof formData.donationGoalAmount === "string" &&
        formData.donationGoalAmount === ""
          ? 0
          : Number(formData.donationGoalAmount),
      currentDonationAmount:
        typeof formData.currentDonationAmount === "string" &&
        formData.currentDonationAmount === ""
          ? 0
          : Number(formData.currentDonationAmount),
      projectType: formData.projectType.trim(),
      projectNature: formData.projectNature,
      startDate: formData.startDate ? new Date(formData.startDate) : undefined,
      endDate: formData.endDate ? new Date(formData.endDate) : undefined,
      donationLinkTarget: formData.donationLinkTarget,
    };

    if (mode === "create") {
      createProjectMutation.mutate(submitData);
    } else if (mode === "edit" && editProject) {
      updateProjectMutation.mutate({
        id: editProject.id,
        ...submitData,
      });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    let processedValue: string | number = value;

    if (type === "number") {
      // Handle empty values properly - allow empty for user input flow
      if (value === "") {
        processedValue = "";
      } else {
        const numValue = parseFloat(value);
        processedValue = isNaN(numValue) ? 0 : numValue;
      }
    }

    setFormData((prev) => ({ ...prev, [name]: processedValue }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleProjectNatureChange = (nature: "Continuous" | "One-time") => {
    setFormData((prev) => ({
      ...prev,
      projectNature: nature,
      // Clear date fields if switching to Continuous
      startDate: nature === "Continuous" ? "" : prev.startDate,
      endDate: nature === "Continuous" ? "" : prev.endDate,
    }));
  };

  const addPhotoUrl = () => {
    if (!newPhotoUrl.trim()) return;

    try {
      new URL(newPhotoUrl); // Validate URL
      setFormData((prev) => ({
        ...prev,
        photos: [...prev.photos, newPhotoUrl.trim()],
      }));
      setNewPhotoUrl("");
    } catch {
      setErrors((prev) => ({ ...prev, photos: "Please enter a valid URL" }));
    }
  };

  const removePhotoUrl = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  const isSubmitting =
    createProjectMutation.isPending || updateProjectMutation.isPending;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Project Name */}
      <div>
        <label
          htmlFor="projectName"
          className="block text-sm font-medium text-gray-700"
        >
          Project Name *
        </label>
        <input
          type="text"
          id="projectName"
          name="projectName"
          value={formData.projectName}
          onChange={handleInputChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
            errors.projectName ? "border-red-300" : ""
          }`}
          placeholder="Enter project name"
        />
        {errors.projectName && (
          <p className="mt-1 text-sm text-red-600">{errors.projectName}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={formData.description}
          onChange={handleInputChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
            errors.description ? "border-red-300" : ""
          }`}
          placeholder="Enter project description"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description}</p>
        )}
      </div>

      {/* Project Type */}
      <div>
        <label
          htmlFor="projectType"
          className="block text-sm font-medium text-gray-700"
        >
          Project Type *
        </label>
        <input
          type="text"
          id="projectType"
          name="projectType"
          value={formData.projectType}
          onChange={handleInputChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
            errors.projectType ? "border-red-300" : ""
          }`}
          placeholder="e.g., Digital Infrastructure, Physical Infrastructure"
        />
        {errors.projectType && (
          <p className="mt-1 text-sm text-red-600">{errors.projectType}</p>
        )}
      </div>

      {/* Project Nature */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Project Nature *
        </label>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              id="continuous"
              name="projectNature"
              type="radio"
              checked={formData.projectNature === "Continuous"}
              onChange={() => handleProjectNatureChange("Continuous")}
              className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label
              htmlFor="continuous"
              className="ml-3 block text-sm font-medium text-gray-700"
            >
              Continuous
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="one-time"
              name="projectNature"
              type="radio"
              checked={formData.projectNature === "One-time"}
              onChange={() => handleProjectNatureChange("One-time")}
              className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label
              htmlFor="one-time"
              className="ml-3 block text-sm font-medium text-gray-700"
            >
              One-time
            </label>
          </div>
        </div>
        {errors.projectNature && (
          <p className="mt-1 text-sm text-red-600">{errors.projectNature}</p>
        )}
      </div>

      {/* Date Fields - Conditional based on Project Nature */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-gray-700"
          >
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
            disabled={formData.projectNature === "Continuous"}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
              errors.startDate ? "border-red-300" : ""
            } ${formData.projectNature === "Continuous" ? "bg-gray-100" : ""}`}
          />
          {errors.startDate && (
            <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-700"
          >
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleInputChange}
            disabled={formData.projectNature === "Continuous"}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
              errors.endDate ? "border-red-300" : ""
            } ${formData.projectNature === "Continuous" ? "bg-gray-100" : ""}`}
          />
          {errors.endDate && (
            <p className="mt-1 text-sm text-red-600">{errors.endDate}</p>
          )}
        </div>
      </div>

      {/* Donation Amounts */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="donationGoalAmount"
            className="block text-sm font-medium text-gray-700"
          >
            Donation Goal Amount ($) *
          </label>
          <input
            type="number"
            id="donationGoalAmount"
            name="donationGoalAmount"
            min="0"
            step="0.01"
            value={formData.donationGoalAmount}
            onChange={handleInputChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
              errors.donationGoalAmount ? "border-red-300" : ""
            }`}
            placeholder="0.00"
          />
          {errors.donationGoalAmount && (
            <p className="mt-1 text-sm text-red-600">
              {errors.donationGoalAmount}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="currentDonationAmount"
            className="block text-sm font-medium text-gray-700"
          >
            Current Donation Amount ($)
          </label>
          <input
            type="number"
            id="currentDonationAmount"
            name="currentDonationAmount"
            min="0"
            step="0.01"
            value={formData.currentDonationAmount}
            onChange={handleInputChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
              errors.currentDonationAmount ? "border-red-300" : ""
            }`}
            placeholder="0.00"
          />
          {errors.currentDonationAmount && (
            <p className="mt-1 text-sm text-red-600">
              {errors.currentDonationAmount}
            </p>
          )}
        </div>
      </div>

      {/* Donation Link Target */}
      <div>
        <label
          htmlFor="donationLinkTarget"
          className="block text-sm font-medium text-gray-700"
        >
          Donation Link Target *
        </label>
        <select
          id="donationLinkTarget"
          name="donationLinkTarget"
          value={formData.donationLinkTarget}
          onChange={handleInputChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
            errors.donationLinkTarget ? "border-red-300" : ""
          }`}
        >
          <option value="Daily Dana">Daily Dana</option>
          <option value="Poya Day">Poya Day</option>
          <option value="Special Projects">Special Projects</option>
        </select>
        {errors.donationLinkTarget && (
          <p className="mt-1 text-sm text-red-600">
            {errors.donationLinkTarget}
          </p>
        )}
      </div>

      {/* Image Upload Section */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Project Images
        </label>
        <ImageUpload
          entityType="project"
          entityId={editProject?.id}
        />
        {errors.photos && (
          <p className="mt-1 text-sm text-red-600">{errors.photos}</p>
        )}
      </div>

      {/* Legacy Photo URLs (Optional - for backward compatibility) */}
      <details className="rounded-lg border border-gray-200 p-4">
        <summary className="cursor-pointer text-sm font-medium text-gray-700">
          Or add photo URLs manually (legacy method)
        </summary>
        <div className="mt-4 space-y-2">
          <div className="flex gap-2">
            <input
              type="url"
              value={newPhotoUrl}
              onChange={(e) => setNewPhotoUrl(e.target.value)}
              placeholder="Enter photo URL"
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            <button
              type="button"
              onClick={addPhotoUrl}
              className="rounded-md bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add
            </button>
          </div>

          {/* Display Photo URLs */}
          {formData.photos.length > 0 && (
            <div className="space-y-2">
              {formData.photos.map((url, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 rounded bg-gray-50 p-2"
                >
                  <span className="flex-1 truncate text-sm">{url}</span>
                  <button
                    type="button"
                    onClick={() => removePhotoUrl(index)}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </details>

      {/* Submit Error */}
      {errors.submit && (
        <div className="rounded-md border border-red-200 bg-red-50 p-4">
          <p className="text-red-800">{errors.submit}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3">
        {mode === "edit" && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting
            ? "Saving..."
            : mode === "edit"
              ? "Update Project"
              : "Create Project"}
        </button>
      </div>
    </form>
  );
}

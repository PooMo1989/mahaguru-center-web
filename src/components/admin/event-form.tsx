"use client";

import { useState } from "react";
import { z } from "zod";
import { api } from "~/trpc/react";

const eventSchema = z.object({
  name: z.string().min(1, "Event name is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  eventDate: z.string().min(1, "Event date is required"),
  photos: z.array(z.string().url("Invalid URL format")),
});

interface EventFormProps {
  onEventCreated: () => void;
}

export function EventForm({ onEventCreated }: EventFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    eventDate: "",
    photos: [] as string[],
  });
  const [newPhotoUrl, setNewPhotoUrl] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const createEventMutation = api.event.createEvent.useMutation({
    onSuccess: () => {
      // Reset form
      setFormData({
        name: "",
        description: "",
        category: "",
        eventDate: "",
        photos: [],
      });
      setErrors({});
      onEventCreated();
    },
    onError: (error) => {
      console.error("Error creating event:", error);
      setErrors({ submit: error.message });
    },
  });

  const validateForm = () => {
    const result = eventSchema.safeParse(formData);
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

    createEventMutation.mutate({
      name: formData.name.trim(),
      description: formData.description.trim(),
      category: formData.category.trim(),
      eventDate: new Date(formData.eventDate),
      photos: formData.photos,
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Event Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Event Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
            errors.name ? "border-red-300" : ""
          }`}
          placeholder="Enter event name"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
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
          placeholder="Enter event description"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description}</p>
        )}
      </div>

      {/* Category */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category *
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
            errors.category ? "border-red-300" : ""
          }`}
        >
          <option value="">Select a category</option>
          <option value="Dhamma Discussion">Dhamma Discussion</option>
          <option value="Meditation Session">Meditation Session</option>
          <option value="Workshop">Workshop</option>
          <option value="Retreat">Retreat</option>
          <option value="Community Outreach">Community Outreach</option>
          <option value="Special Event">Special Event</option>
        </select>
        {errors.category && (
          <p className="mt-1 text-sm text-red-600">{errors.category}</p>
        )}
      </div>

      {/* Event Date */}
      <div>
        <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700">
          Event Date & Time *
        </label>
        <input
          type="datetime-local"
          id="eventDate"
          name="eventDate"
          value={formData.eventDate}
          onChange={handleInputChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
            errors.eventDate ? "border-red-300" : ""
          }`}
        />
        {errors.eventDate && (
          <p className="mt-1 text-sm text-red-600">{errors.eventDate}</p>
        )}
      </div>

      {/* Photos */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Photo URLs
        </label>
        <div className="mt-1 space-y-2">
          <div className="flex space-x-2">
            <input
              type="url"
              value={newPhotoUrl}
              onChange={(e) => setNewPhotoUrl(e.target.value)}
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Enter photo URL"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addPhotoUrl();
                }
              }}
            />
            <button
              type="button"
              onClick={addPhotoUrl}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add
            </button>
          </div>
          
          {/* Display added photos */}
          {formData.photos.length > 0 && (
            <div className="space-y-2">
              {formData.photos.map((url, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <span className="text-sm text-gray-600 truncate flex-1 mr-2">
                    {url}
                  </span>
                  <button
                    type="button"
                    onClick={() => removePhotoUrl(index)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
          
          {errors.photos && (
            <p className="text-sm text-red-600">{errors.photos}</p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end space-x-3">
        <button
          type="submit"
          disabled={createEventMutation.isPending}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {createEventMutation.isPending ? "Creating..." : "Create Event"}
        </button>
      </div>

      {/* Global Error */}
      {errors.submit && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-sm text-red-800">{errors.submit}</p>
        </div>
      )}
    </form>
  );
}
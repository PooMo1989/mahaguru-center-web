"use client";

import { useState, useRef } from "react";
import { api } from "~/trpc/react";

interface ImageUploadProps {
  entityType: "event" | "project";
  entityId?: string;
  onImagesChange?: (images: UploadedImage[]) => void;
}

interface UploadedImage {
  id: string;
  url: string;
  originalName: string;
  isFeatured: boolean;
  alt?: string | null;
}

export function ImageUpload({
  entityType,
  entityId,
  onImagesChange,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get existing images if entityId is provided
  const {
    data: images = [],
    refetch,
    isLoading,
  } = api.image.getEntityImages.useQuery(
    { entityType, entityId: entityId! },
    { enabled: !!entityId },
  );

  // Mutations
  const uploadImageMutation = api.image.uploadImage.useMutation({
    onSuccess: () => {
      void refetch();
      if (onImagesChange) {
        void refetch().then((result) => {
          if (result.data) {
            onImagesChange(result.data as UploadedImage[]);
          }
        });
      }
    },
    onError: (error) => {
      setUploadError(error.message);
      setTimeout(() => setUploadError(null), 5000);
    },
  });

  const setFeaturedMutation = api.image.setFeaturedImage.useMutation({
    onSuccess: () => {
      void refetch();
    },
    onError: (error) => {
      setUploadError(error.message);
      setTimeout(() => setUploadError(null), 5000);
    },
  });

  const deleteImageMutation = api.image.deleteImage.useMutation({
    onSuccess: () => {
      void refetch();
      if (onImagesChange) {
        void refetch().then((result) => {
          if (result.data) {
            onImagesChange(result.data as UploadedImage[]);
          }
        });
      }
    },
    onError: (error) => {
      setUploadError(error.message);
      setTimeout(() => setUploadError(null), 5000);
    },
  });

  // File upload handler
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !entityId) return;

    setUploading(true);
    setUploadError(null);

    for (const file of Array.from(files)) {
      try {
        // Validate file type
        if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
          throw new Error(
            `Invalid file type: ${file.name}. Only JPEG, PNG, and WEBP are allowed.`,
          );
        }

        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
          throw new Error(
            `File too large: ${file.name}. Maximum size is 5MB.`,
          );
        }

        // TODO: Implement actual file upload to storage
        // For now, create a temporary URL
        const tempUrl = URL.createObjectURL(file);
        const timestamp = Date.now();
        const filename = `${timestamp}-${file.name}`;

        // Create database record
        await uploadImageMutation.mutateAsync({
          entityType,
          entityId,
          filename,
          originalName: file.name,
          mimeType: file.type,
          size: file.size,
          path: `/uploads/${filename}`,
          url: tempUrl, // In production, this would be the actual storage URL
        });
      } catch (error) {
        setUploadError(
          error instanceof Error ? error.message : "Upload failed",
        );
      }
    }

    setUploading(false);
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Set featured image
  const handleSetFeatured = async (imageId: string) => {
    if (!entityId) return;

    try {
      await setFeaturedMutation.mutateAsync({
        imageId,
        entityType,
        entityId,
      });
    } catch (error) {
      console.error("Failed to set featured image:", error);
    }
  };

  // Delete image
  const handleDeleteImage = async (imageId: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      await deleteImageMutation.mutateAsync({ imageId });
    } catch (error) {
      console.error("Failed to delete image:", error);
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
          disabled={!entityId || uploading}
          className="hidden"
          id="image-upload-input"
        />
        <label
          htmlFor="image-upload-input"
          className={`block w-full cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition-colors hover:border-gray-400 ${
            !entityId || uploading ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          <div className="space-y-2">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="text-gray-600">
              <span className="font-medium text-blue-600 hover:text-blue-500">
                Click to upload
              </span>{" "}
              or drag and drop
            </div>
            <p className="text-sm text-gray-500">
              JPEG, PNG, WEBP (max 5MB each)
            </p>
            {!entityId && (
              <p className="text-sm text-amber-600">
                Save the event/project first to enable image uploads
              </p>
            )}
          </div>
        </label>
      </div>

      {/* Error Message */}
      {uploadError && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-800">{uploadError}</p>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {(uploading || isLoading) && (
        <div className="flex items-center justify-center py-4">
          <div className="flex items-center space-x-2">
            <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-blue-600"></div>
            <span className="text-sm text-gray-600">
              {uploading ? "Uploading images..." : "Loading images..."}
            </span>
          </div>
        </div>
      )}

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {images.map((image) => (
            <div key={image.id} className="group relative">
              <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={image.url}
                  alt={image.alt ?? image.originalName}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Image Controls Overlay */}
              <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black bg-opacity-0 opacity-0 transition-all duration-200 group-hover:bg-opacity-50 group-hover:opacity-100">
                <div className="flex space-x-2">
                  {!image.isFeatured && (
                    <button
                      onClick={() => handleSetFeatured(image.id)}
                      disabled={setFeaturedMutation.isPending}
                      className="rounded bg-blue-600 px-2 py-1 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                      Set Featured
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteImage(image.id)}
                    disabled={deleteImageMutation.isPending}
                    className="rounded bg-red-600 px-2 py-1 text-xs font-medium text-white hover:bg-red-700 disabled:opacity-50"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* Featured Badge */}
              {image.isFeatured && (
                <div className="absolute left-2 top-2 rounded bg-green-600 px-2 py-1 text-xs font-medium text-white">
                  Featured
                </div>
              )}

              {/* Filename */}
              <div className="mt-1 truncate text-xs text-gray-500">
                {image.originalName}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !uploading && images.length === 0 && entityId && (
        <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
          <p className="text-sm text-gray-500">
            No images uploaded yet. Click or drag files to upload.
          </p>
        </div>
      )}
    </div>
  );
}

import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

// Input validation schemas
const uploadImageInput = z.object({
  entityType: z.enum(["event", "project"]),
  entityId: z.string(),
  filename: z.string(),
  originalName: z.string(),
  mimeType: z.string(),
  size: z.number().max(MAX_FILE_SIZE, "File size must not exceed 5MB"),
  path: z.string(),
  url: z.string(),
  alt: z.string().optional(),
});

const getEntityImagesInput = z.object({
  entityType: z.enum(["event", "project"]),
  entityId: z.string(),
});

const setFeaturedImageInput = z.object({
  imageId: z.string(),
  entityType: z.enum(["event", "project"]),
  entityId: z.string(),
});

const deleteImageInput = z.object({
  imageId: z.string(),
});

export const imageRouter = createTRPCRouter({
  // Upload image for entity
  uploadImage: protectedProcedure
    .input(uploadImageInput)
    .mutation(async ({ ctx, input }) => {
      // Validate file type
      if (!ALLOWED_TYPES.includes(input.mimeType)) {
        throw new Error(
          "Invalid file type. Only JPEG, PNG, and WEBP are allowed.",
        );
      }

      // Create image record with proper relationship
      const imageData = {
        filename: input.filename,
        originalName: input.originalName,
        mimeType: input.mimeType,
        size: input.size,
        path: input.path,
        url: input.url,
        alt: input.alt,
        uploadedBy: ctx.session.user.id,
        ...(input.entityType === "event"
          ? { eventId: input.entityId }
          : { projectId: input.entityId }),
      };

      return ctx.db.image.create({ data: imageData });
    }),

  // Get images for specific entity
  getEntityImages: publicProcedure
    .input(getEntityImagesInput)
    .query(async ({ ctx, input }) => {
      const whereClause =
        input.entityType === "event"
          ? { eventId: input.entityId }
          : { projectId: input.entityId };

      return ctx.db.image.findMany({
        where: whereClause,
        orderBy: [
          { isFeatured: "desc" }, // Featured images first
          { createdAt: "asc" },
        ],
      });
    }),

  // Set featured image (unset others)
  setFeaturedImage: protectedProcedure
    .input(setFeaturedImageInput)
    .mutation(async ({ ctx, input }) => {
      // Use transaction to ensure atomicity
      return ctx.db.$transaction(async (tx) => {
        // First, unset all featured images for this entity
        const whereClause =
          input.entityType === "event"
            ? { eventId: input.entityId }
            : { projectId: input.entityId };

        await tx.image.updateMany({
          where: { ...whereClause, isFeatured: true },
          data: { isFeatured: false },
        });

        // Then set the new featured image
        return tx.image.update({
          where: { id: input.imageId },
          data: { isFeatured: true },
        });
      });
    }),

  // Delete image
  deleteImage: protectedProcedure
    .input(deleteImageInput)
    .mutation(async ({ ctx, input }) => {
      // Get image details first
      const image = await ctx.db.image.findUnique({
        where: { id: input.imageId },
      });

      if (!image) {
        throw new Error("Image not found");
      }

      // Delete from Supabase Storage
      try {
        const { deleteFileFromSupabase } = await import(
          "~/lib/supabase-storage"
        );
        await deleteFileFromSupabase(image.path);
      } catch (error) {
        console.error("Failed to delete file from storage:", error);
        // Continue with database deletion even if storage deletion fails
      }

      // Delete from database
      return ctx.db.image.delete({
        where: { id: input.imageId },
      });
    }),

  // Get featured image for entity
  getFeaturedImage: publicProcedure
    .input(getEntityImagesInput)
    .query(async ({ ctx, input }) => {
      const whereClause =
        input.entityType === "event"
          ? { eventId: input.entityId }
          : { projectId: input.entityId };

      return ctx.db.image.findFirst({
        where: { ...whereClause, isFeatured: true },
      });
    }),
});

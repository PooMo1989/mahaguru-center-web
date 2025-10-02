import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

// Input validation schemas
const eventCreateInput = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  eventDate: z.date(),
  photos: z.array(z.string().url()).default([]),
});

const eventUpdateInput = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
  category: z.string().min(1, "Category is required").optional(),
  eventDate: z.date().optional(),
  photos: z.array(z.string().url()).optional(),
});

const eventFilterInput = z.object({
  filter: z.enum(["all", "upcoming", "past"]).default("all"),
});

export const eventRouter = createTRPCRouter({
  // Create a new event (admin only)
  createEvent: protectedProcedure
    .input(eventCreateInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.event.create({
        data: {
          name: input.name,
          description: input.description,
          category: input.category,
          eventDate: input.eventDate,
          photos: input.photos,
        },
      });
    }),

  // Update an existing event (admin only)
  updateEvent: protectedProcedure
    .input(eventUpdateInput)
    .mutation(async ({ ctx, input }) => {
      const { id, ...updateData } = input;

      // Remove undefined values from updateData
      const cleanUpdateData = Object.fromEntries(
        Object.entries(updateData).filter(([_, value]) => value !== undefined),
      );

      return ctx.db.event.update({
        where: { id },
        data: cleanUpdateData,
      });
    }),

  // Delete an event (admin only)
  deleteEvent: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.event.delete({
        where: { id: input.id },
      });
    }),

  // Get all events with optional filtering (public)
  getEvents: publicProcedure
    .input(eventFilterInput)
    .query(async ({ ctx, input }) => {
      const now = new Date();

      let whereClause = {};

      if (input.filter === "upcoming") {
        whereClause = {
          eventDate: {
            gte: now,
          },
        };
      } else if (input.filter === "past") {
        whereClause = {
          eventDate: {
            lt: now,
          },
        };
      }

      return ctx.db.event.findMany({
        where: whereClause,
        orderBy: {
          eventDate: input.filter === "past" ? "desc" : "asc",
        },
        include: {
          images: true,
        },
      });
    }),

  // Get a single event by ID (public)
  getEvent: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.event.findUnique({
        where: { id: input.id },
      });
    }),
});

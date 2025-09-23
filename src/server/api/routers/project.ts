import { z } from "zod";
import { Decimal } from "@prisma/client/runtime/library";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

// Input validation schemas
const projectCreateInput = z
  .object({
    projectName: z.string().min(1, "Project name is required"),
    description: z.string().min(1, "Description is required"),
    photos: z.array(z.string().url()).default([]),
    donationGoalAmount: z
      .number()
      .positive("Donation goal amount must be positive")
      .transform((val) => new Decimal(val)),
    currentDonationAmount: z
      .number()
      .min(0, "Current donation amount cannot be negative")
      .transform((val) => new Decimal(val))
      .default(0),
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

const projectUpdateInput = z
  .object({
    id: z.string(),
    projectName: z.string().min(1, "Project name is required").optional(),
    description: z.string().min(1, "Description is required").optional(),
    photos: z.array(z.string().url()).optional(),
    donationGoalAmount: z
      .number()
      .positive("Donation goal amount must be positive")
      .transform((val) => new Decimal(val))
      .optional(),
    currentDonationAmount: z
      .number()
      .min(0, "Current donation amount cannot be negative")
      .transform((val) => new Decimal(val))
      .optional(),
    projectType: z.string().min(1, "Project type is required").optional(),
    projectNature: z.enum(["Continuous", "One-time"]).optional(),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    donationLinkTarget: z
      .enum(["Daily Dana", "Poya Day", "Special Projects"])
      .optional(),
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

const projectFilterInput = z.object({
  projectNature: z.enum(["all", "Continuous", "One-time"]).default("all"),
  donationLinkTarget: z
    .enum(["all", "Daily Dana", "Poya Day", "Special Projects"])
    .default("all"),
});

export const projectRouter = createTRPCRouter({
  // Create a new project (admin only)
  createProject: protectedProcedure
    .input(projectCreateInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.project.create({
        data: {
          projectName: input.projectName,
          description: input.description,
          photos: input.photos,
          donationGoalAmount: input.donationGoalAmount,
          currentDonationAmount: input.currentDonationAmount,
          projectType: input.projectType,
          projectNature: input.projectNature,
          startDate: input.startDate,
          endDate: input.endDate,
          donationLinkTarget: input.donationLinkTarget,
        },
      });
    }),

  // Update an existing project (admin only)
  updateProject: protectedProcedure
    .input(projectUpdateInput)
    .mutation(async ({ ctx, input }) => {
      const { id, ...updateData } = input;

      // Remove undefined values from updateData
      const cleanUpdateData = Object.fromEntries(
        Object.entries(updateData).filter(([_, value]) => value !== undefined),
      );

      return ctx.db.project.update({
        where: { id },
        data: cleanUpdateData,
      });
    }),

  // Delete a project (admin only)
  deleteProject: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.project.delete({
        where: { id: input.id },
      });
    }),

  // Get all projects with optional filtering (public)
  getProjects: publicProcedure
    .input(projectFilterInput)
    .query(async ({ ctx, input }) => {
      let whereClause = {};

      if (input.projectNature !== "all") {
        whereClause = {
          ...whereClause,
          projectNature: input.projectNature,
        };
      }

      if (input.donationLinkTarget !== "all") {
        whereClause = {
          ...whereClause,
          donationLinkTarget: input.donationLinkTarget,
        };
      }

      return ctx.db.project.findMany({
        where: whereClause,
        orderBy: {
          createdAt: "desc",
        },
      });
    }),

  // Get a single project by ID (public)
  getProject: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.project.findUnique({
        where: { id: input.id },
      });
    }),
});

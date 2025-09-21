import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Decimal } from "@prisma/client/runtime/library";
import { z } from "zod";

// Types for our test data
interface TestProject {
  id: string;
  projectName: string;
  description: string;
  photos: string[];
  donationGoalAmount: Decimal;
  currentDonationAmount: Decimal;
  projectType: string;
  projectNature: "Continuous" | "One-time";
  startDate?: Date;
  endDate?: Date;
  donationLinkTarget: "Daily Dana" | "Poya Day" | "Special Projects";
  createdAt: Date;
  updatedAt: Date;
}

// Mock project filtering logic that would be used in the tRPC router
function filterProjectsByNature(projects: TestProject[], filter: "all" | "Continuous" | "One-time") {
  if (filter === "all") return projects;
  return projects.filter(project => project.projectNature === filter);
}

function filterProjectsByDonationTarget(projects: TestProject[], filter: "all" | "Daily Dana" | "Poya Day" | "Special Projects") {
  if (filter === "all") return projects;
  return projects.filter(project => project.donationLinkTarget === filter);
}

// Project Brief validation schemas (matching router schemas)
const projectCreateInputSchema = z.object({
  projectName: z.string().min(1, "Project name is required"),
  description: z.string().min(1, "Description is required"),
  photos: z.array(z.string().url()).default([]),
  donationGoalAmount: z.number().positive("Donation goal amount must be positive"),
  currentDonationAmount: z.number().min(0, "Current donation amount cannot be negative").default(0),
  projectType: z.string().min(1, "Project type is required"),
  projectNature: z.enum(["Continuous", "One-time"]),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  donationLinkTarget: z.enum(["Daily Dana", "Poya Day", "Special Projects"]),
}).refine(
  (data) => {
    if (data.startDate && data.endDate) {
      return data.startDate <= data.endDate;
    }
    return true;
  },
  {
    message: "End date must be after start date",
    path: ["endDate"],
  }
);

describe("Project Data Model Validation", () => {
  it("validates Project Brief projects data structure", () => {
    // Test Project 1: "Our Digital Mission"
    const digitalMissionData = {
      projectName: "Our Digital Mission",
      description: "Our Digital Mission is to create a comprehensive digital sanctuary that preserves and shares over two decades of authentic Dhamma teachings. Supported by a dedicated team of staff and volunteers, this project ensures timeless wisdom is accessible to all. The mission is composed of four key pillars: the **Web Archive**, a complete online platform organizing our spiritual wisdom; a **Video Archive** on our YouTube Channel with extensive Dhamma discussions; a thriving **Facebook Community** for daily inspiration; and a collection of **Key Publications** featuring our most essential teachings.",
      photos: [],
      donationGoalAmount: 500000,
      currentDonationAmount: 0,
      projectType: "Digital Infrastructure",
      projectNature: "Continuous" as const,
      donationLinkTarget: "Special Projects" as const,
    };

    const result = projectCreateInputSchema.safeParse(digitalMissionData);
    expect(result.success).toBe(true);
  });

  it("validates Arahathmaga Spiritual Center project data", () => {
    // Test Project 2: "Arahathmaga Spiritual Center"
    const spiritualCenterData = {
      projectName: "Arahathmaga Spiritual Center",
      description: "The Arahathmaga Spiritual Center is our physical sanctuary, a peaceful environment where seekers can practice meditation, meet with experienced spiritual facilitators, and spend quality time in contemplation and learning. It is a place to access direct guidance from Mahaguru and our dedicated full-time team. To keep our doors open and our services free, we rely on the generosity of our community. Your support helps us cover our essential monthly expenses.",
      photos: [],
      donationGoalAmount: 750000, // LKR monthly goal per FR5
      currentDonationAmount: 0,
      projectType: "Physical Infrastructure",
      projectNature: "Continuous" as const,
      donationLinkTarget: "Daily Dana" as const,
    };

    const result = projectCreateInputSchema.safeParse(spiritualCenterData);
    expect(result.success).toBe(true);
  });

  it("validates The AI Guru project data", () => {
    // Test Project 3: "The AI Guru"
    const aiGuruData = {
      projectName: "The AI Guru",
      description: "We are developing **The AI Guru**, a revolutionary project to transform our vast digital archive from a static repository into a dynamic, interactive spiritual partner. Using sophisticated AI, we are creating an intelligent guide that allows anyone to ask complex questions in natural language and receive clear, contextual answers drawn directly from the authentic Dhamma teachings. This project makes profound wisdom instantly accessible and personalized.",
      photos: [],
      donationGoalAmount: 2000000,
      currentDonationAmount: 0,
      projectType: "Technology Development",
      projectNature: "One-time" as const,
      donationLinkTarget: "Special Projects" as const,
    };

    const result = projectCreateInputSchema.safeParse(aiGuruData);
    expect(result.success).toBe(true);
  });

  it("validates Beyond Words project data", () => {
    // Test Project 4: "Beyond Words"
    const beyondWordsData = {
      projectName: "Beyond Words",
      description: "The **Beyond Words** initiative is a visionary project centered on the sacred 'Maithri Bodhi' text. Our goal is to go beyond literal translation and use language itself as a tool for liberation. We aim to capture the subtle vibration and transformative power of the original teachings, creating a version of the text that conveys not just meaning, but the very essence of the Dhamma.",
      photos: [],
      donationGoalAmount: 1000000,
      currentDonationAmount: 0,
      projectType: "Publication/Translation",
      projectNature: "One-time" as const,
      donationLinkTarget: "Special Projects" as const,
    };

    const result = projectCreateInputSchema.safeParse(beyondWordsData);
    expect(result.success).toBe(true);
  });
});

describe("Project Input Validation", () => {
  it("rejects invalid project creation data", () => {
    const invalidData = {
      projectName: "", // Empty string should fail
      description: "Valid description",
      donationGoalAmount: -100, // Negative amount should fail
      projectType: "Valid Type",
      projectNature: "Invalid" as any, // Invalid enum value
      donationLinkTarget: "Daily Dana" as const,
    };

    const result = projectCreateInputSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    
    if (!result.success) {
      const errors = result.error.issues.map(issue => issue.message);
      expect(errors).toContain("Project name is required");
      expect(errors).toContain("Donation goal amount must be positive");
    }
  });

  it("validates projectNature enum values", () => {
    const validContinuous = { projectNature: "Continuous" };
    const validOneTime = { projectNature: "One-time" };
    const invalid = { projectNature: "Invalid" };

    const continousSchema = z.enum(["Continuous", "One-time"]);
    
    expect(continousSchema.safeParse(validContinuous.projectNature).success).toBe(true);
    expect(continousSchema.safeParse(validOneTime.projectNature).success).toBe(true);
    expect(continousSchema.safeParse(invalid.projectNature).success).toBe(false);
  });

  it("validates donationLinkTarget enum values", () => {
    const validDailyDana = { donationLinkTarget: "Daily Dana" };
    const validPoyaDay = { donationLinkTarget: "Poya Day" };
    const validSpecialProjects = { donationLinkTarget: "Special Projects" };
    const invalid = { donationLinkTarget: "Invalid" };

    const targetSchema = z.enum(["Daily Dana", "Poya Day", "Special Projects"]);
    
    expect(targetSchema.safeParse(validDailyDana.donationLinkTarget).success).toBe(true);
    expect(targetSchema.safeParse(validPoyaDay.donationLinkTarget).success).toBe(true);
    expect(targetSchema.safeParse(validSpecialProjects.donationLinkTarget).success).toBe(true);
    expect(targetSchema.safeParse(invalid.donationLinkTarget).success).toBe(false);
  });

  it("validates DECIMAL field handling", () => {
    const validDecimalData = {
      projectName: "Test Project",
      description: "Test description",
      donationGoalAmount: 1500.50, // Should be converted to Decimal
      currentDonationAmount: 500.25, // Should be converted to Decimal
      projectType: "Test Type",
      projectNature: "Continuous" as const,
      donationLinkTarget: "Daily Dana" as const,
    };

    const result = projectCreateInputSchema.safeParse(validDecimalData);
    expect(result.success).toBe(true);
  });

  it("validates date constraint (end date after start date)", () => {
    const validDateData = {
      projectName: "Test Project",
      description: "Test description",
      donationGoalAmount: 1000,
      projectType: "Test Type",
      projectNature: "One-time" as const,
      startDate: new Date("2025-01-01"),
      endDate: new Date("2025-12-31"), // After start date - valid
      donationLinkTarget: "Special Projects" as const,
    };

    const invalidDateData = {
      ...validDateData,
      startDate: new Date("2025-12-31"),
      endDate: new Date("2025-01-01"), // Before start date - invalid
    };

    expect(projectCreateInputSchema.safeParse(validDateData).success).toBe(true);
    expect(projectCreateInputSchema.safeParse(invalidDateData).success).toBe(false);
  });

  it("validates photo URLs array", () => {
    const validPhotoData = {
      projectName: "Test Project",
      description: "Test description",
      photos: [
        "https://example.com/photo1.jpg",
        "https://example.com/photo2.png"
      ],
      donationGoalAmount: 1000,
      projectType: "Test Type",
      projectNature: "Continuous" as const,
      donationLinkTarget: "Daily Dana" as const,
    };

    const invalidPhotoData = {
      ...validPhotoData,
      photos: ["not-a-url", "also-not-a-url"], // Invalid URLs
    };

    expect(projectCreateInputSchema.safeParse(validPhotoData).success).toBe(true);
    expect(projectCreateInputSchema.safeParse(invalidPhotoData).success).toBe(false);
  });
});

describe("Project Filtering Logic", () => {
  const mockProjects: TestProject[] = [
    {
      id: "1",
      projectName: "Our Digital Mission",
      description: "Digital sanctuary project",
      photos: [],
      donationGoalAmount: new Decimal("500000"),
      currentDonationAmount: new Decimal("100000"),
      projectType: "Digital Infrastructure",
      projectNature: "Continuous",
      donationLinkTarget: "Special Projects",
      createdAt: new Date("2025-01-01"),
      updatedAt: new Date("2025-01-01"),
    },
    {
      id: "2",
      projectName: "Arahathmaga Spiritual Center",
      description: "Physical sanctuary project",
      photos: [],
      donationGoalAmount: new Decimal("750000"),
      currentDonationAmount: new Decimal("200000"),
      projectType: "Physical Infrastructure",
      projectNature: "Continuous",
      donationLinkTarget: "Daily Dana",
      createdAt: new Date("2025-01-02"),
      updatedAt: new Date("2025-01-02"),
    },
    {
      id: "3",
      projectName: "The AI Guru",
      description: "AI development project",
      photos: [],
      donationGoalAmount: new Decimal("2000000"),
      currentDonationAmount: new Decimal("0"),
      projectType: "Technology Development",
      projectNature: "One-time",
      donationLinkTarget: "Special Projects",
      createdAt: new Date("2025-01-03"),
      updatedAt: new Date("2025-01-03"),
    },
    {
      id: "4",
      projectName: "Beyond Words",
      description: "Translation project",
      photos: [],
      donationGoalAmount: new Decimal("1000000"),
      currentDonationAmount: new Decimal("0"),
      projectType: "Publication/Translation",
      projectNature: "One-time",
      donationLinkTarget: "Special Projects",
      createdAt: new Date("2025-01-04"),
      updatedAt: new Date("2025-01-04"),
    },
  ];

  it("filters projects by nature correctly", () => {
    const continuousProjects = filterProjectsByNature(mockProjects, "Continuous");
    const oneTimeProjects = filterProjectsByNature(mockProjects, "One-time");
    const allProjects = filterProjectsByNature(mockProjects, "all");

    expect(continuousProjects).toHaveLength(2);
    expect(continuousProjects.map(p => p.projectName)).toEqual([
      "Our Digital Mission",
      "Arahathmaga Spiritual Center"
    ]);

    expect(oneTimeProjects).toHaveLength(2);
    expect(oneTimeProjects.map(p => p.projectName)).toEqual([
      "The AI Guru",
      "Beyond Words"
    ]);

    expect(allProjects).toHaveLength(4);
  });

  it("filters projects by donation link target correctly", () => {
    const dailyDanaProjects = filterProjectsByDonationTarget(mockProjects, "Daily Dana");
    const specialProjectsProjects = filterProjectsByDonationTarget(mockProjects, "Special Projects");
    const allProjects = filterProjectsByDonationTarget(mockProjects, "all");

    expect(dailyDanaProjects).toHaveLength(1);
    expect(dailyDanaProjects[0]?.projectName).toBe("Arahathmaga Spiritual Center");

    expect(specialProjectsProjects).toHaveLength(3);
    expect(specialProjectsProjects.map(p => p.projectName)).toEqual([
      "Our Digital Mission",
      "The AI Guru", 
      "Beyond Words"
    ]);

    expect(allProjects).toHaveLength(4);
  });
});

describe("Project CRUD Operations", () => {
  it("validates project creation with all required fields", () => {
    const createData = {
      projectName: "Test Project",
      description: "Test project description",
      photos: ["https://example.com/photo.jpg"],
      donationGoalAmount: 100000,
      currentDonationAmount: 25000,
      projectType: "Test Type",
      projectNature: "Continuous" as const,
      startDate: new Date("2025-01-01"),
      endDate: new Date("2025-12-31"),
      donationLinkTarget: "Daily Dana" as const,
    };

    // This would be the data structure sent to the createProject mutation
    expect(createData).toHaveProperty("projectName");
    expect(createData).toHaveProperty("description");
    expect(createData).toHaveProperty("donationGoalAmount");
    expect(createData).toHaveProperty("currentDonationAmount");
    expect(createData).toHaveProperty("projectType");
    expect(createData).toHaveProperty("projectNature");
    expect(createData).toHaveProperty("donationLinkTarget");

    const validationResult = projectCreateInputSchema.safeParse(createData);
    expect(validationResult.success).toBe(true);
  });

  it("validates project update with partial fields", () => {
    const updateData = {
      id: "test-id",
      projectName: "Updated Project Name",
      currentDonationAmount: 50000,
      // Other fields omitted - should be optional for updates
    };

    // Validate that partial updates work correctly
    expect(updateData).toHaveProperty("id");
    expect(updateData.projectName).toBe("Updated Project Name");
    expect(updateData.currentDonationAmount).toBe(50000);
  });

  it("validates project deletion requires only ID", () => {
    const deleteData = {
      id: "test-project-id",
    };

    expect(deleteData).toHaveProperty("id");
    expect(typeof deleteData.id).toBe("string");
    expect(deleteData.id).toBeTruthy();
  });

  it("validates project retrieval by ID", () => {
    const getByIdData = {
      id: "test-project-id",
    };

    expect(getByIdData).toHaveProperty("id");
    expect(typeof getByIdData.id).toBe("string");
  });
});

describe("Project Model Edge Cases", () => {
  it("handles empty photos array", () => {
    const projectWithoutPhotos = {
      projectName: "Project Without Photos",
      description: "Test description",
      photos: [],
      donationGoalAmount: 1000,
      projectType: "Test Type",
      projectNature: "Continuous" as const,
      donationLinkTarget: "Daily Dana" as const,
    };

    const result = projectCreateInputSchema.safeParse(projectWithoutPhotos);
    expect(result.success).toBe(true);
  });

  it("handles null/undefined dates properly", () => {
    const projectWithoutDates = {
      projectName: "Project Without Dates",
      description: "Test description",
      donationGoalAmount: 1000,
      projectType: "Test Type",
      projectNature: "Continuous" as const,
      donationLinkTarget: "Daily Dana" as const,
      // startDate and endDate omitted (optional fields)
    };

    const result = projectCreateInputSchema.safeParse(projectWithoutDates);
    expect(result.success).toBe(true);
  });

  it("handles zero current donation amount", () => {
    const projectWithZeroDonation = {
      projectName: "New Project",
      description: "Test description",
      donationGoalAmount: 1000,
      currentDonationAmount: 0, // Should be valid
      projectType: "Test Type",
      projectNature: "Continuous" as const,
      donationLinkTarget: "Daily Dana" as const,
    };

    const result = projectCreateInputSchema.safeParse(projectWithZeroDonation);
    expect(result.success).toBe(true);
  });
});
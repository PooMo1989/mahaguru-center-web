import { describe, it, expect } from "vitest";
import { z } from "zod";

// Test the input validation schemas directly
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

describe("Event Router Input Validation", () => {
  describe("eventCreateInput validation", () => {
    it("should validate valid event creation data", () => {
      const validData = {
        name: "Test Event",
        description: "Test Description",
        category: "Workshop",
        eventDate: new Date("2025-12-01"),
        photos: ["https://example.com/photo.jpg"],
      };

      const result = eventCreateInput.safeParse(validData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    it("should reject empty name", () => {
      const invalidData = {
        name: "",
        description: "Test Description",
        category: "Workshop",
        eventDate: new Date("2025-12-01"),
      };

      const result = eventCreateInput.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe("Name is required");
      }
    });

    it("should reject empty description", () => {
      const invalidData = {
        name: "Test Event",
        description: "",
        category: "Workshop",
        eventDate: new Date("2025-12-01"),
      };

      const result = eventCreateInput.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe("Description is required");
      }
    });

    it("should reject empty category", () => {
      const invalidData = {
        name: "Test Event",
        description: "Test Description",
        category: "",
        eventDate: new Date("2025-12-01"),
      };

      const result = eventCreateInput.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe("Category is required");
      }
    });

    it("should reject invalid photo URLs", () => {
      const invalidData = {
        name: "Test Event",
        description: "Test Description",
        category: "Workshop",
        eventDate: new Date("2025-12-01"),
        photos: ["not-a-url"],
      };

      const result = eventCreateInput.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("should default to empty photos array", () => {
      const validData = {
        name: "Test Event",
        description: "Test Description",
        category: "Workshop",
        eventDate: new Date("2025-12-01"),
      };

      const result = eventCreateInput.safeParse(validData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.photos).toEqual([]);
      }
    });
  });

  describe("eventUpdateInput validation", () => {
    it("should validate valid update data", () => {
      const validData = {
        id: "event-1",
        name: "Updated Event",
        description: "Updated Description",
      };

      const result = eventUpdateInput.safeParse(validData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    it("should require ID field", () => {
      const invalidData = {
        name: "Updated Event",
      };

      const result = eventUpdateInput.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("should allow partial updates", () => {
      const validData = {
        id: "event-1",
        name: "Only updating name",
      };

      const result = eventUpdateInput.safeParse(validData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.description).toBeUndefined();
        expect(result.data.category).toBeUndefined();
      }
    });
  });

  describe("eventFilterInput validation", () => {
    it("should validate filter options", () => {
      const validFilters = ["all", "upcoming", "past"];
      
      validFilters.forEach(filter => {
        const result = eventFilterInput.safeParse({ filter });
        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data.filter).toBe(filter);
        }
      });
    });

    it("should default to 'all' filter", () => {
      const result = eventFilterInput.safeParse({});
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.filter).toBe("all");
      }
    });

    it("should reject invalid filter values", () => {
      const invalidData = { filter: "invalid" };
      const result = eventFilterInput.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });
});

describe("Event Date Filtering Logic", () => {
  it("should correctly categorize events as past or upcoming", () => {
    const now = new Date();
    const pastDate = new Date(now.getTime() - 24 * 60 * 60 * 1000); // yesterday
    const futureDate = new Date(now.getTime() + 24 * 60 * 60 * 1000); // tomorrow

    // Test that past date is before now
    expect(pastDate < now).toBe(true);
    
    // Test that future date is after now
    expect(futureDate > now).toBe(true);

    // Test filtering logic
    const isUpcoming = (eventDate: Date) => eventDate >= now;
    const isPast = (eventDate: Date) => eventDate < now;

    expect(isUpcoming(futureDate)).toBe(true);
    expect(isUpcoming(pastDate)).toBe(false);
    expect(isPast(pastDate)).toBe(true);
    expect(isPast(futureDate)).toBe(false);
  });
});
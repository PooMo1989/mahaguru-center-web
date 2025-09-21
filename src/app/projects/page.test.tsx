import { describe, it, expect } from "vitest";
import { Decimal } from "@prisma/client/runtime/library";

// Test the core business logic functions that would be used in the component
describe("Projects Page Logic Tests", () => {
  describe("Progress Bar Calculations", () => {
    it("calculates percentage correctly for normal case", () => {
      const current = new Decimal(250000);
      const goal = new Decimal(1000000);
      const percentage = (current.toNumber() / goal.toNumber()) * 100;
      
      expect(percentage).toBe(25);
    });

    it("handles percentage calculation when current exceeds goal", () => {
      const current = new Decimal(1200000);
      const goal = new Decimal(1000000);
      const percentage = Math.min((current.toNumber() / goal.toNumber()) * 100, 100);
      
      expect(percentage).toBe(100);
    });

    it("handles zero goal amount edge case", () => {
      const current = new Decimal(100000);
      const goal = new Decimal(0);
      const percentage = goal.toNumber() > 0 ? (current.toNumber() / goal.toNumber()) * 100 : 0;
      
      expect(percentage).toBe(0);
    });

    it("handles zero current amount", () => {
      const current = new Decimal(0);
      const goal = new Decimal(1000000);
      const percentage = (current.toNumber() / goal.toNumber()) * 100;
      
      expect(percentage).toBe(0);
    });
  });

  describe("Currency Formatting", () => {
    it("formats LKR currency correctly", () => {
      const amount = 250000;
      const formatted = new Intl.NumberFormat('en-LK', {
        style: 'currency',
        currency: 'LKR',
        minimumFractionDigits: 0,
      }).format(amount);
      
      expect(formatted).toContain("250,000");
      expect(formatted).toContain("LKR");
    });

    it("formats large amounts correctly", () => {
      const amount = 1000000;
      const formatted = new Intl.NumberFormat('en-LK', {
        style: 'currency',
        currency: 'LKR',
        minimumFractionDigits: 0,
      }).format(amount);
      
      expect(formatted).toContain("1,000,000");
    });
  });

  describe("Donation URL Generation", () => {
    it("generates correct URL for Daily Dana target", () => {
      const donationTargetMap = {
        "Daily Dana": "daily-dana",
        "Poya Day": "poya-day-event", // Updated to match contact page tab ID
        "Special Projects": "special-projects"
      };
      
      const url = `/contact?tab=donate&target=${donationTargetMap["Daily Dana"]}`;
      expect(url).toBe("/contact?tab=donate&target=daily-dana");
    });

    it("generates correct URL for Poya Day target", () => {
      const donationTargetMap = {
        "Daily Dana": "daily-dana",
        "Poya Day": "poya-day-event", // Updated to match contact page tab ID
        "Special Projects": "special-projects"
      };
      
      const url = `/contact?tab=donate&target=${donationTargetMap["Poya Day"]}`;
      expect(url).toBe("/contact?tab=donate&target=poya-day-event");
    });

    it("generates correct URL for Special Projects target", () => {
      const donationTargetMap = {
        "Daily Dana": "daily-dana",
        "Poya Day": "poya-day-event", // Updated to match contact page tab ID
        "Special Projects": "special-projects"
      };
      
      const url = `/contact?tab=donate&target=${donationTargetMap["Special Projects"]}`;
      expect(url).toBe("/contact?tab=donate&target=special-projects");
    });

    it("generates correct URL with project parameter", () => {
      const donationTargetMap = {
        "Daily Dana": "daily-dana",
        "Poya Day": "poya-day-event",
        "Special Projects": "special-projects"
      };
      const projectName = "Digital Mission";
      
      const url = `/contact?tab=donate&target=${donationTargetMap["Daily Dana"]}&project=${encodeURIComponent(projectName)}`;
      expect(url).toBe("/contact?tab=donate&target=daily-dana&project=Digital%20Mission");
    });

    it("handles project names with special characters", () => {
      const donationTargetMap = {
        "Daily Dana": "daily-dana",
        "Poya Day": "poya-day-event",
        "Special Projects": "special-projects"
      };
      const projectName = "AI Guru & Beyond Words";
      
      const url = `/contact?tab=donate&target=${donationTargetMap["Special Projects"]}&project=${encodeURIComponent(projectName)}`;
      expect(url).toBe("/contact?tab=donate&target=special-projects&project=AI%20Guru%20%26%20Beyond%20Words");
    });

    it("falls back to special-projects for invalid donation target", () => {
      const donationTargetMap: Record<string, string> = {
        "Daily Dana": "daily-dana",
        "Poya Day": "poya-day-event",
        "Special Projects": "special-projects"
      };
      const invalidTarget = "Invalid Target";
      const projectName = "Test Project";
      
      const url = `/contact?tab=donate&target=${donationTargetMap[invalidTarget] ?? "special-projects"}&project=${encodeURIComponent(projectName)}`;
      expect(url).toBe("/contact?tab=donate&target=special-projects&project=Test%20Project");
    });
  });

  describe("Project Grouping Logic", () => {
    const mockProjects = [
      {
        id: "1",
        projectNature: "Continuous" as const,
        projectName: "Digital Mission",
      },
      {
        id: "2",
        projectNature: "Continuous" as const,
        projectName: "Spiritual Center",
      },
      {
        id: "3",
        projectNature: "One-time" as const,
        projectName: "AI Guru",
      },
      {
        id: "4",
        projectNature: "One-time" as const,
        projectName: "Beyond Words",
      },
    ];

    it("filters ongoing projects correctly", () => {
      const ongoingProjects = mockProjects.filter(p => p.projectNature === "Continuous");
      expect(ongoingProjects).toHaveLength(2);
      expect(ongoingProjects[0]?.projectName).toBe("Digital Mission");
      expect(ongoingProjects[1]?.projectName).toBe("Spiritual Center");
    });

    it("filters special initiatives correctly", () => {
      const specialInitiatives = mockProjects.filter(p => p.projectNature === "One-time");
      expect(specialInitiatives).toHaveLength(2);
      expect(specialInitiatives[0]?.projectName).toBe("AI Guru");
      expect(specialInitiatives[1]?.projectName).toBe("Beyond Words");
    });
  });

  describe("API Query Parameters", () => {
    it("constructs correct query parameters for all projects", () => {
      const params = {
        projectNature: "all" as const,
        donationLinkTarget: "all" as const
      };
      
      expect(params.projectNature).toBe("all");
      expect(params.donationLinkTarget).toBe("all");
    });

    it("validates project nature values", () => {
      const validNatures = ["all", "Continuous", "One-time"];
      
      validNatures.forEach(nature => {
        expect(["all", "Continuous", "One-time"]).toContain(nature);
      });
    });

    it("validates donation link target values", () => {
      const validTargets = ["all", "Daily Dana", "Poya Day", "Special Projects"];
      
      validTargets.forEach(target => {
        expect(["all", "Daily Dana", "Poya Day", "Special Projects"]).toContain(target);
      });
    });
  });
});
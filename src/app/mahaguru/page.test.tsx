import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import MahaguruPage from "./page";

// Mock the Navigation component with both Navigation and Footer
vi.mock("~/components/navigation", () => ({
  Navigation: () => <nav data-testid="navigation">Mock Navigation</nav>,
  Footer: () => <footer data-testid="footer">Mock Footer</footer>,
}));

// Mock Next.js Image component
vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    ...props
  }: {
    src: string;
    alt: string;
    [key: string]: unknown;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      data-testid={`image-${alt.toLowerCase().replace(/\s+/g, "-")}`}
      {...props}
    />
  ),
}));

describe("Mahaguru Page UI Implementation (Story 7.2)", () => {
  beforeEach(() => {
    render(<MahaguruPage />);
  });

  describe("Hero Section", () => {
    it("renders hero section with background image and dramatic typography", () => {
      expect(
        screen.getByRole("heading", { level: 1, name: "Mahaguru" }),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          "A Journey Through the Five Stages of Spiritual Realization",
        ),
      ).toBeInTheDocument();

      // Hero background image
      expect(
        screen.getByTestId("image-spiritual-journey-background"),
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("image-spiritual-journey-background"),
      ).toHaveAttribute("src", "/heroImage.webp");
    });

    it("has proper hero section height and styling", () => {
      const heroSection = screen
        .getByRole("heading", { level: 1 })
        .closest("div");
      expect(heroSection).toHaveClass("text-center", "text-white");
    });
  });

  describe("Interactive Tab Navigation", () => {
    it("renders all five tab buttons with short titles", () => {
      const expectedTabs = [
        "Early Age",
        "Dawn",
        "Mind Study",
        "Framework",
        "Legacy",
      ];

      expectedTabs.forEach((tabName) => {
        expect(screen.getByRole("tab", { name: tabName })).toBeInTheDocument();
      });
    });

    it("sets 'Early Age' as default active tab", () => {
      const firstTab = screen.getByRole("tab", { name: "Early Age" });
      expect(firstTab).toHaveAttribute("data-state", "active");
    });

    it("renders tab list with proper accessibility structure", () => {
      expect(screen.getByRole("tablist")).toBeInTheDocument();

      // Check that all tabs have proper ARIA attributes
      const tabs = screen.getAllByRole("tab");
      expect(tabs).toHaveLength(5);

      tabs.forEach((tab) => {
        expect(tab).toHaveAttribute("value");
      });
    });

    it("has connected tab design with visual connectors", () => {
      const tabList = screen.getByRole("tablist");
      expect(tabList).toHaveClass("flex", "flex-wrap", "justify-center");
    });
  });

  describe("Stage Content Display", () => {
    it("displays Stage 1 content by default", () => {
      expect(
        screen.getByText("Stage 1: The Formative Years"),
      ).toBeInTheDocument();
      expect(screen.getByText("An Era of Truth Seeking")).toBeInTheDocument();
      expect(
        screen.getByText(
          /During his early years, Mahaguru embarked on an earnest quest/,
        ),
      ).toBeInTheDocument();
    });

    it("includes poetic stanza for Stage 1", () => {
      expect(
        screen.getByText(/In youth's earnest quest for truth divine/),
      ).toBeInTheDocument();
    });

    it("displays stage images with proper alt text", () => {
      // Stage 1 image should be visible by default
      expect(
        screen.getByTestId("image-stage-1:-the-formative-years"),
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("image-stage-1:-the-formative-years"),
      ).toHaveAttribute("src", "/stage 01.png");
    });

    it("has proper content structure with paragraphs", () => {
      // Check that content is split into paragraphs
      const contentText = screen.getByText(
        /During his early years, Mahaguru embarked on an earnest quest/,
      );
      expect(contentText).toBeInTheDocument();
      expect(contentText.tagName).toBe("P");
    });
  });

  describe("Tab Switching Functionality", () => {
    it("switches content when clicking different tabs", () => {
      // Initially, Stage 1 content should be visible
      expect(
        screen.getByText("Stage 1: The Formative Years"),
      ).toBeInTheDocument();

      // Click on Dawn tab
      const dawnTab = screen.getByRole("tab", { name: "Dawn" });
      fireEvent.click(dawnTab);

      // Verify that the tab is now active
      expect(dawnTab).toHaveAttribute("data-state", "active");
    });

    it("displays unique content for each stage", () => {
      const stages = [
        {
          tab: "Dawn",
          title: "Stage 2: The Dawn of Awakening",
          subtitle: "An Era of Fulfillment",
        },
        {
          tab: "Mind Study",
          title: "Stage 3: Insightful Experimentation",
          subtitle: "Understanding the Human Mind",
        },
        {
          tab: "Framework",
          title: "Stage 4: A Framework for Wisdom",
          subtitle: "Systematizing the Teachings",
        },
        {
          tab: "Legacy",
          title: "Stage 5: The Enduring Legacy",
          subtitle: "A System for All Beings",
        },
      ];

      stages.forEach((stage) => {
        const tabButton = screen.getByRole("tab", { name: stage.tab });
        fireEvent.click(tabButton);

        expect(screen.getByText(stage.title)).toBeInTheDocument();
        expect(screen.getByText(stage.subtitle)).toBeInTheDocument();
      });
    });

    it("updates active tab visual state correctly", () => {
      const earlyAgeTab = screen.getByRole("tab", { name: "Early Age" });
      const dawnTab = screen.getByRole("tab", { name: "Dawn" });

      // Initially Early Age should be active
      expect(earlyAgeTab).toHaveAttribute("data-state", "active");
      expect(dawnTab).toHaveAttribute("data-state", "inactive");

      // Click Dawn tab
      fireEvent.click(dawnTab);

      // Dawn should now be active
      expect(dawnTab).toHaveAttribute("data-state", "active");
      expect(earlyAgeTab).toHaveAttribute("data-state", "inactive");
    });
  });

  describe("Responsive Design", () => {
    it("has proper responsive layout classes", () => {
      const main = screen.getByRole("main");
      expect(main).toHaveClass("min-h-screen");

      // Check for responsive text classes on hero
      const heroTitle = screen.getByRole("heading", { level: 1 });
      expect(heroTitle).toHaveClass("text-5xl", "md:text-7xl");
    });

    it("has responsive content containers", () => {
      // Check for max-width container
      const contentContainer = document.querySelector(".max-w-6xl");
      expect(contentContainer).toBeInTheDocument();
    });
  });

  describe("Professional Styling", () => {
    it("uses correct brand color palette", () => {
      // Check tab buttons use brand colors
      const tabs = screen.getAllByRole("tab");
      tabs.forEach((tab) => {
        expect(tab).toHaveClass("text-[#183F37]");
      });
    });

    it("has proper card styling for content", () => {
      // Content should be in white cards with shadows
      const contentCard = document.querySelector(
        ".bg-white.rounded-2xl.shadow-xl",
      );
      expect(contentCard).toBeInTheDocument();
    });

    it("includes smooth transitions", () => {
      const tabs = screen.getAllByRole("tab");
      tabs.forEach((tab) => {
        expect(tab).toHaveClass("transition-all", "duration-300");
      });
    });
  });

  describe("Image Integration", () => {
    it("includes hero background image with priority loading", () => {
      const heroImage = screen.getByTestId(
        "image-spiritual-journey-background",
      );
      expect(heroImage).toBeInTheDocument();
      expect(heroImage).toHaveAttribute("src", "/heroImage.webp");
    });

    it("includes stage-specific images", () => {
      // Default stage (Stage 1) image
      expect(
        screen.getByTestId("image-stage-1:-the-formative-years"),
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("image-stage-1:-the-formative-years"),
      ).toHaveAttribute("src", "/stage 01.png");

      // Test switching to Stage 2
      const dawnTab = screen.getByRole("tab", { name: "Dawn" });
      fireEvent.click(dawnTab);

      expect(
        screen.getByTestId("image-stage-2:-the-dawn-of-awakening"),
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("image-stage-2:-the-dawn-of-awakening"),
      ).toHaveAttribute("src", "/stage 02.webp");
    });
  });

  describe("Content Organization", () => {
    it("has proper heading hierarchy", () => {
      // Hero h1
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        "Mahaguru",
      );

      // Stage title h2
      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
        "Stage 1: The Formative Years",
      );

      // Stage subtitle h3
      expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
        "An Era of Truth Seeking",
      );
    });

    it("includes Navigation and Footer components", () => {
      expect(screen.getByTestId("navigation")).toBeInTheDocument();
      expect(screen.getByTestId("footer")).toBeInTheDocument();
    });

    it("has proper content spacing and layout", () => {
      // Check for proper spacing classes
      const contentSection = document.querySelector(".space-y-4");
      expect(contentSection).toBeInTheDocument();
    });
  });

  describe("Poetic Elements", () => {
    it("displays poetic stanzas with proper styling", () => {
      const poeticStanza = screen.getByText(
        /In youth's earnest quest for truth divine/,
      );
      expect(poeticStanza).toBeInTheDocument();

      // Check that it's in the styled container
      const poeticContainer = poeticStanza.closest(".bg-\\[\\#183F37\\]\\/5");
      expect(poeticContainer).toBeInTheDocument();
    });

    it("includes poetic content for different stages", () => {
      // Switch to Dawn stage
      const dawnTab = screen.getByRole("tab", { name: "Dawn" });
      fireEvent.click(dawnTab);

      expect(
        screen.getByText(/When morning breaks on consciousness wide/),
      ).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has proper semantic structure", () => {
      expect(screen.getByRole("main")).toBeInTheDocument();
      expect(screen.getByRole("tablist")).toBeInTheDocument();
      expect(screen.getAllByRole("tab")).toHaveLength(5);
      expect(screen.getAllByRole("tabpanel")).toHaveLength(5);
    });

    it("includes descriptive alt text for images", () => {
      expect(
        screen.getByTestId("image-spiritual-journey-background"),
      ).toHaveAttribute("alt", "Spiritual journey background");
      expect(
        screen.getByTestId("image-stage-1:-the-formative-years"),
      ).toHaveAttribute("alt", "Stage 1: The Formative Years");
    });

    it("supports keyboard navigation with focus rings", () => {
      const tabs = screen.getAllByRole("tab");
      tabs.forEach((tab) => {
        expect(tab).toHaveClass("focus:outline-none", "focus:ring-2");
      });
    });
  });

  describe("Animation and Transitions", () => {
    it("includes smooth transitions for content switching", () => {
      // Check for animation classes on tab content
      const tabContent = document.querySelector('[role="tabpanel"]');
      expect(tabContent).toHaveClass(
        "animate-in",
        "fade-in-50",
        "duration-300",
      );
    });
  });
});

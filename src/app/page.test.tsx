import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Home from "./page";

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

// Mock Next.js Link component
vi.mock("next/link", () => ({
  default: ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} data-testid={`link-${href}`}>
      {children}
    </a>
  ),
}));

describe("Homepage UI Enhancements (Story 7.1)", () => {
  it("renders the full-screen hero section with background image", () => {
    render(<Home />);

    // Hero section content
    expect(screen.getByText("Welcome to Mahaguru Center")).toBeInTheDocument();
    expect(
      screen.getByText(/The mind is everything. What you think you become/),
    ).toBeInTheDocument();
    expect(screen.getByText("Explore Our Offerings")).toBeInTheDocument();

    // Hero background image
    expect(screen.getByTestId("image-mahaguru-center")).toBeInTheDocument();
    expect(screen.getByTestId("image-mahaguru-center")).toHaveAttribute(
      "src",
      "/heroImage2.webp",
    );
  });

  it("renders the About Mahaguru section with proper layout", () => {
    render(<Home />);

    expect(screen.getByText("About Mahaguru")).toBeInTheDocument();
    expect(
      screen.getByText(
        /A rare human being who has walked a unique spiritual path/,
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("Witness")).toBeInTheDocument();

    // About Mahaguru image
    expect(screen.getByTestId("image-mahaguru")).toBeInTheDocument();
    expect(screen.getByTestId("image-mahaguru")).toHaveAttribute(
      "src",
      "/Untitled design (1).jpg",
    );
  });

  it("renders the Our Services section", () => {
    render(<Home />);

    expect(screen.getByText("Our Services")).toBeInTheDocument();
    expect(
      screen.getByText(/From Dhamma Talks to Individual meetups/),
    ).toBeInTheDocument();
    expect(screen.getByText("Explore")).toBeInTheDocument();

    // Services image
    expect(screen.getByTestId("image-our-services")).toBeInTheDocument();
    expect(screen.getByTestId("image-our-services")).toHaveAttribute(
      "src",
      "/Screenshot 2025-08-20 185255.jpg",
    );
  });

  it("renders the Monthly Dhamma Discussion section", () => {
    render(<Home />);

    expect(screen.getByText("Monthly Dhamma Discussion")).toBeInTheDocument();
    expect(
      screen.getByText(
        /We had been continuously conducting Monthly Dhamma Discussion/,
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("View Events")).toBeInTheDocument();

    // Events image
    expect(
      screen.getByTestId("image-monthly-dhamma-discussion"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("image-monthly-dhamma-discussion"),
    ).toHaveAttribute("src", "/Screenshot 2025-07-29 161148.jpg");
  });

  it("renders the Our Projects section with image grid", () => {
    render(<Home />);

    expect(screen.getByText("Our Projects")).toBeInTheDocument();
    expect(
      screen.getByText(/We have several ongoing physical and digital projects/),
    ).toBeInTheDocument();
    expect(screen.getByText("See Projects")).toBeInTheDocument();

    // Project images
    expect(screen.getByTestId("image-project-1")).toBeInTheDocument();
    expect(screen.getByTestId("image-project-1")).toHaveAttribute(
      "src",
      "/Screenshot 2025-08-20 223553.jpg",
    );
    expect(screen.getByTestId("image-project-2")).toBeInTheDocument();
    expect(screen.getByTestId("image-project-2")).toHaveAttribute(
      "src",
      "/490061273_1097783239058409_8966922447246500945_n.jpg",
    );
  });

  it("includes all required navigation links", () => {
    render(<Home />);

    // Check for all CTA buttons with correct href attributes
    // Note: /services appears twice (hero and services section)
    expect(screen.getAllByTestId("link-/services")).toHaveLength(2);
    expect(screen.getByTestId("link-/mahaguru")).toBeInTheDocument();
    expect(screen.getByTestId("link-/events")).toBeInTheDocument();
    expect(screen.getByTestId("link-/projects")).toBeInTheDocument();
  });

  it("includes Navigation and Footer components", () => {
    render(<Home />);

    expect(screen.getByTestId("navigation")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("uses the correct custom color palette", () => {
    render(<Home />);

    // Check for custom green color usage in buttons
    const ctaButtons = screen.getAllByRole("button");
    ctaButtons.forEach((button) => {
      expect(button).toHaveClass("bg-[#183F37]");
      expect(button).toHaveClass("hover:bg-[#152F2E]");
    });
  });

  it("has proper responsive layout structure", () => {
    render(<Home />);

    const main = screen.getByRole("main");
    expect(main).toHaveClass("min-h-screen");

    // Check for hero section full screen
    const heroSection = screen
      .getByText("Welcome to Mahaguru Center")
      .closest("section");
    expect(heroSection).toHaveClass("h-screen");
  });

  it("includes proper semantic HTML structure", () => {
    render(<Home />);

    // Check for main element
    expect(screen.getByRole("main")).toBeInTheDocument();

    // Check for proper heading hierarchy
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent("Welcome to Mahaguru Center");

    const h2Elements = screen.getAllByRole("heading", { level: 2 });
    expect(h2Elements).toHaveLength(4); // About Mahaguru, Our Services, Monthly Dhamma Discussion, Our Projects
  });
});

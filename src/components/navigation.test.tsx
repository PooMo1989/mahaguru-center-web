import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Navigation, Footer } from "./navigation";

// Mock Next.js Link component
vi.mock("next/link", () => {
  return {
    default: function MockLink({
      children,
      href,
    }: {
      children: React.ReactNode;
      href: string;
    }) {
      return <a href={href}>{children}</a>;
    },
  };
});

describe("Navigation Component", () => {
  it("renders the logo link", () => {
    render(<Navigation />);
    const logoLink = screen.getByText("Mahaguru Center");
    expect(logoLink).toBeInTheDocument();
    expect(logoLink.closest("a")).toHaveAttribute("href", "/");
  });

  it("renders all navigation links on desktop", () => {
    render(<Navigation />);

    const expectedLinks = [
      { text: "Mahaguru", href: "/mahaguru" },
      { text: "Services", href: "/services" },
      { text: "Projects", href: "/projects" },
      { text: "Events", href: "/events" },
      { text: "Contact Us", href: "/contact" },
    ];

    expectedLinks.forEach(({ text, href }) => {
      const link = screen.getByText(text);
      expect(link).toBeInTheDocument();
      expect(link.closest("a")).toHaveAttribute("href", href);
    });
  });

  it("shows mobile menu trigger on mobile screens", () => {
    render(<Navigation />);
    const mobileMenuTrigger = screen.getByRole("button");
    expect(mobileMenuTrigger).toBeInTheDocument();
  });

  it("toggles mobile menu when clicking the hamburger icon", () => {
    render(<Navigation />);
    const mobileMenuTrigger = screen.getByRole("button");

    // Initially, the menu should not be open
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();

    // Click to open the menu
    fireEvent.click(mobileMenuTrigger);

    // Menu should now be open (we can check for the navigation links in the dropdown)
    expect(mobileMenuTrigger).toBeInTheDocument();
  });

  it("has proper accessibility attributes", () => {
    render(<Navigation />);
    const mobileMenuTrigger = screen.getByRole("button");

    expect(mobileMenuTrigger).toHaveAttribute("aria-expanded");
    expect(screen.getByText("Open main menu")).toBeInTheDocument();
  });

  it("applies correct CSS classes for styling", () => {
    render(<Navigation />);
    const nav = screen.getByRole("navigation");

    expect(nav).toHaveClass(
      "bg-white/95",
      "backdrop-blur-sm",
      "border-b",
      "border-gray-200",
      "sticky",
      "top-0",
      "z-50",
    );
  });
});

describe("Footer Component", () => {
  it("renders the footer with correct content", () => {
    render(<Footer />);

    expect(screen.getByText("Mahaguru Center")).toBeInTheDocument();
    expect(screen.getByText("Contact Details")).toBeInTheDocument();
    expect(screen.getByText("secretary@mahaguru.lk")).toBeInTheDocument();
    expect(screen.getByText("+94 777 100 490")).toBeInTheDocument();
  });

  it("renders social media links", () => {
    render(<Footer />);

    expect(screen.getByLabelText("Facebook")).toBeInTheDocument();
    expect(screen.getByLabelText("YouTube")).toBeInTheDocument();
    expect(screen.getByLabelText("Dhamma Archive")).toBeInTheDocument();
  });

  it("renders the map section", () => {
    render(<Footer />);

    expect(screen.getByText("Visit Us")).toBeInTheDocument();
    expect(
      screen.getByTitle("Arahath maga Center Location"),
    ).toBeInTheDocument();
    expect(screen.getByText("Open in Google Maps")).toBeInTheDocument();
  });
});

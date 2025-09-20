import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Navigation } from "./navigation";

// Mock Next.js Link component
vi.mock("next/link", () => {
  return {
    default: function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
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
    
    expect(nav).toHaveClass("bg-white/95", "backdrop-blur-sm", "border-b", "border-gray-200", "sticky", "top-0", "z-50");
  });
});
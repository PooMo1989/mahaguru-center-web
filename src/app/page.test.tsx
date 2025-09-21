import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Home from "./page";

// Mock the Navigation component with both Navigation and Footer
vi.mock("~/components/navigation", () => ({
  Navigation: () => <nav data-testid="navigation">Mock Navigation</nav>,
  Footer: () => <footer data-testid="footer">Mock Footer</footer>,
}));

describe("Home Page", () => {
  it("renders the main homepage content", () => {
    render(<Home />);
    
    // Check for hero section content
    expect(screen.getByText("Welcome to Mahaguru Center")).toBeInTheDocument();
    expect(screen.getByText(/The mind is everything/)).toBeInTheDocument();
    expect(screen.getByText("Explore Our Journey")).toBeInTheDocument();
  });

  it("renders the introduction section", () => {
    render(<Home />);
    
    expect(screen.getByText("A Place of Peace and Learning")).toBeInTheDocument();
    expect(screen.getByText(/Welcome to Mahaguru Center, a serene sanctuary/)).toBeInTheDocument();
  });

  it("renders all featured page cards", () => {
    render(<Home />);
    
    // Check for all four cards
    expect(screen.getByText("About Mahaguru")).toBeInTheDocument();
    expect(screen.getByText("Our Services")).toBeInTheDocument();
    expect(screen.getByText("Monthly Dhamma Discussion")).toBeInTheDocument();
    expect(screen.getByText("Our Community Projects")).toBeInTheDocument();
  });

  it("has correct navigation links in featured cards", () => {
    render(<Home />);
    
    const expectedLinks = [
      { text: "Learn More", href: "/mahaguru" },
      { text: "Explore Services", href: "/services" },
      { text: "View Events", href: "/events" },
      { text: "See Projects", href: "/projects" },
    ];

    expectedLinks.forEach(({ text, href }) => {
      const link = screen.getByText(text);
      expect(link).toBeInTheDocument();
      expect(link.closest("a")).toHaveAttribute("href", href);
    });
  });

  it("includes the Navigation component", () => {
    render(<Home />);
    
    expect(screen.getByTestId("navigation")).toBeInTheDocument();
  });

  it("has proper responsive layout classes", () => {
    render(<Home />);
    
    const main = screen.getByRole("main");
    expect(main).toHaveClass("min-h-screen");
    
    // Check for responsive grid classes
    const featuredSection = screen.getByText("Discover Our Community").closest("section");
    expect(featuredSection?.querySelector(".grid")).toHaveClass("grid-cols-1", "md:grid-cols-2", "lg:grid-cols-4");
  });

  it("applies serene and welcoming theme colors", () => {
    render(<Home />);
    
    const heroSection = screen.getByText("Welcome to Mahaguru Center").closest("section");
    expect(heroSection).toHaveClass("bg-gradient-to-br", "from-blue-50", "via-indigo-50", "to-purple-50");
  });
});
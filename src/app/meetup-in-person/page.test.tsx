import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import MeetupInPersonPage from "./page";

// Mock Next.js navigation hooks
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => '/meetup-in-person',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock Next.js components
vi.mock('next/link', () => {
  return {
    default: ({ children, href, ...props }: any) => (
      <a href={href} {...props}>
        {children}
      </a>
    ),
  };
});

describe("Meetup In-Person Page", () => {
  it("renders the main title", () => {
    render(<MeetupInPersonPage />);
    expect(screen.getByText("Book")).toBeInTheDocument();
    expect(screen.getByText("In-Person")).toBeInTheDocument();
    expect(screen.getByText("Meetup")).toBeInTheDocument();
  });

  it("displays the wisdom content", () => {
    render(<MeetupInPersonPage />);
    expect(screen.getByText("We don't price wisdom. We can't.")).toBeInTheDocument();
    expect(screen.getByText(/Your time is valuable/)).toBeInTheDocument();
  });

  it("renders all price options", () => {
    render(<MeetupInPersonPage />);
    expect(screen.getByText("5,000")).toBeInTheDocument();
    expect(screen.getByText("25,000")).toBeInTheDocument();
    expect(screen.getByText("50,000")).toBeInTheDocument();
    expect(screen.getByText("100,000")).toBeInTheDocument();
    expect(screen.getByText("250,000")).toBeInTheDocument();
    expect(screen.getByText("500,000")).toBeInTheDocument();
    expect(screen.getByText("1,000,000")).toBeInTheDocument();
    expect(screen.getByText("FREE")).toBeInTheDocument();
    expect(screen.getByText("Free session")).toBeInTheDocument();
  });

  it("renders the section heading", () => {
    render(<MeetupInPersonPage />);
    expect(screen.getByText("Choose Your Contribution")).toBeInTheDocument();
  });

  it("renders the bottom quote", () => {
    render(<MeetupInPersonPage />);
    expect(screen.getByText(/The value of wisdom cannot be measured/)).toBeInTheDocument();
  });
});
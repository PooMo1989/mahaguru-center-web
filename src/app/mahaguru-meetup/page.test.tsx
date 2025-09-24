import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import MahaguruMeetupPage from "./page";

// Mock the Navigation component with both Navigation and Footer
vi.mock("~/components/navigation", () => ({
  Navigation: () => <nav data-testid="navigation">Navigation</nav>,
  Footer: () => <footer data-testid="footer">Mock Footer</footer>,
}));

describe("MahaguruMeetupPage", () => {
  it("renders the hero section with main heading", () => {
    render(<MahaguruMeetupPage />);
    expect(
      screen.getByRole("heading", { name: /the nudge you've been waiting for/i }),
    ).toBeInTheDocument();
  });

  it("renders all six required sections", () => {
    render(<MahaguruMeetupPage />);

    // Section 1: About Mahaguru
    expect(screen.getByTestId("section-about-mahaguru")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /about mahaguru/i }),
    ).toBeInTheDocument();

    // Section 2: What is a Mahaguru Meetup
    expect(screen.getByTestId("section-what-is-meetup")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /your moment of absolute clarity/i }),
    ).toBeInTheDocument();

    // Section 3: Booking Options
    expect(screen.getByTestId("section-booking-options")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /booking options/i }),
    ).toBeInTheDocument();

    // Section 4: Group & Team Sessions
    expect(
      screen.getByTestId("section-group-team-sessions"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /group & team sessions/i }),
    ).toBeInTheDocument();

    // Section 5: Our Mission
    expect(screen.getByTestId("section-our-mission")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /our mission \(contribution\)/i }),
    ).toBeInTheDocument();

    // Section 6: Free Alternative
    expect(screen.getByTestId("section-free-alternative")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /experience the dialogue/i }),
    ).toBeInTheDocument();
  });

  it("displays all required content from Project Brief", () => {
    render(<MahaguruMeetupPage />);

    // Section 1 content
    expect(
      screen.getByText(
        /a rare human being who has walked a unique spiritual path for over 20 years/i,
      ),
    ).toBeInTheDocument();

    // Section 2 content
    expect(
      screen.getByText(
        /in a world of endless noise, a mahaguru meetup is a space of profound stillness/i,
      ),
    ).toBeInTheDocument();

    // Section 3 pricing
    expect(screen.getByText("LKR 5,000 ~ 18 USD")).toBeInTheDocument();
    expect(screen.getByText("35 USD")).toBeInTheDocument();

    // Section 5 mission content
    expect(
      screen.getByText(
        /your payment is an offering that directly supports the sustainability/i,
      ),
    ).toBeInTheDocument();

    // Section 6 free alternative content
    expect(
      screen.getByText(
        /not sure where to begin\? join our weekly recorded group consultation/i,
      ),
    ).toBeInTheDocument();
  });

  it("renders all call-to-action buttons", () => {
    render(<MahaguruMeetupPage />);

    // All required CTA buttons
    expect(screen.getByTestId("cta-book-in-person")).toBeInTheDocument();
    expect(screen.getByTestId("cta-book-online")).toBeInTheDocument();
    expect(screen.getByTestId("cta-inquire-team")).toBeInTheDocument();
    expect(screen.getByTestId("cta-inquire-group")).toBeInTheDocument();
    expect(screen.getByTestId("cta-learn-more-mission")).toBeInTheDocument();
    expect(screen.getByTestId("cta-register-free")).toBeInTheDocument();

    // Verify button text
    expect(
      screen.getByRole("link", { name: /book in-person session/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /book online session/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /inquire for your team/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /inquire for your group/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /learn more about our mission/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /register for free session/i }),
    ).toBeInTheDocument();
  });

  it("has proper responsive layout structure", () => {
    render(<MahaguruMeetupPage />);

    // Check for responsive container classes
    const mainContainer = screen.getByRole("main");
    expect(mainContainer).toHaveClass("min-h-screen");

    // Check that sections use proper grid layout
    const bookingSection = screen.getByTestId("section-booking-options");
    expect(bookingSection.querySelector(".grid")).toBeInTheDocument();

    const groupSection = screen.getByTestId("section-group-team-sessions");
    expect(groupSection.querySelector(".grid")).toBeInTheDocument();
  });

  it("includes Navigation component", () => {
    render(<MahaguruMeetupPage />);
    expect(screen.getByTestId("navigation")).toBeInTheDocument();
  });
});

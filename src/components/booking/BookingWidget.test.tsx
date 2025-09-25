import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import BookingWidget from "./BookingWidget";

// Mock the global SimplybookWidget
global.window = global.window || {};
global.window.SimplybookWidget = vi.fn();

// Mock MutationObserver
global.MutationObserver = vi.fn().mockImplementation((callback) => ({
  observe: vi.fn(),
  disconnect: vi.fn(),
  takeRecords: vi.fn(),
}));

describe("BookingWidget", () => {
  it("renders booking widget container", () => {
    render(<BookingWidget amount="5,000" />);
    const container = screen.getByTestId("booking-widget");
    expect(container).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<BookingWidget amount="25,000" className="custom-class" />);
    const container = screen.getByTestId("booking-widget");
    expect(container).toHaveClass("booking-widget-container", "custom-class");
  });

  it("creates unique container ID", () => {
    render(<BookingWidget amount="50,000" />);
    const widgetContainer = screen.getByTestId("widget-container");
    expect(widgetContainer).toBeInTheDocument();
  });

  it("handles different amount values", () => {
    render(<BookingWidget amount="free" />);
    const container = screen.getByTestId("booking-widget");
    expect(container).toBeInTheDocument();
  });

  it("handles unknown amount values gracefully", () => {
    render(<BookingWidget amount="unknown" />);
    const container = screen.getByTestId("booking-widget");
    expect(container).toBeInTheDocument();
  });
});
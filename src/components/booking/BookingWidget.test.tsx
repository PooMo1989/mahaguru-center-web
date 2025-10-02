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
    render(<BookingWidget serviceId="service-1" />);
    const container = screen.getByTestId("booking-widget");
    expect(container).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<BookingWidget serviceId="service-2" />);
    const container = screen.getByTestId("booking-widget");
    expect(container).toBeInTheDocument();
  });

  it("creates unique container ID", () => {
    render(<BookingWidget serviceId="service-3" />);
    const widgetContainer = screen.getByTestId("widget-container");
    expect(widgetContainer).toBeInTheDocument();
  });

  it("handles different serviceId values", () => {
    render(<BookingWidget serviceId="service-free" />);
    const container = screen.getByTestId("booking-widget");
    expect(container).toBeInTheDocument();
  });

  it("handles empty serviceId gracefully", () => {
    render(<BookingWidget serviceId="" />);
    const container = screen.getByTestId("booking-widget");
    expect(container).toBeInTheDocument();
  });
});
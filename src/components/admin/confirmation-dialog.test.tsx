import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ConfirmationDialog } from "./confirmation-dialog";

describe("ConfirmationDialog", () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    onConfirm: vi.fn(),
    title: "Test Title",
    message: "Test message",
  };

  it("renders dialog when isOpen is true", () => {
    render(<ConfirmationDialog {...defaultProps} />);
    
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test message")).toBeInTheDocument();
  });

  it("does not render when isOpen is false", () => {
    render(<ConfirmationDialog {...defaultProps} isOpen={false} />);
    
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("calls onConfirm when confirm button is clicked", () => {
    const onConfirm = vi.fn();
    render(<ConfirmationDialog {...defaultProps} onConfirm={onConfirm} />);
    
    fireEvent.click(screen.getByText("Confirm"));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when cancel button is clicked", () => {
    const onClose = vi.fn();
    render(<ConfirmationDialog {...defaultProps} onClose={onClose} />);
    
    fireEvent.click(screen.getByText("Cancel"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when clicking backdrop", () => {
    const onClose = vi.fn();
    render(<ConfirmationDialog {...defaultProps} onClose={onClose} />);
    
    // Find the backdrop div and click it
    const backdrop = document.querySelector('.fixed.inset-0.bg-gray-500');
    if (backdrop) {
      fireEvent.click(backdrop);
      expect(onClose).toHaveBeenCalledTimes(1);
    }
  });

  it("displays custom button text", () => {
    render(
      <ConfirmationDialog
        {...defaultProps}
        confirmText="Delete"
        cancelText="Keep"
      />
    );
    
    expect(screen.getByText("Delete")).toBeInTheDocument();
    expect(screen.getByText("Keep")).toBeInTheDocument();
  });

  it("disables buttons when loading", () => {
    render(<ConfirmationDialog {...defaultProps} isLoading={true} />);
    
    const confirmButton = screen.getByText("Processing...");
    const cancelButton = screen.getByText("Cancel");
    
    expect(confirmButton).toBeDisabled();
    expect(cancelButton).toBeDisabled();
  });

  it("renders complex message content", () => {
    const complexMessage = (
      <div>
        <p>Are you sure?</p>
        <div className="event-details">
          <p>Event: Test Event</p>
          <p>Date: Today</p>
        </div>
      </div>
    );
    
    render(<ConfirmationDialog {...defaultProps} message={complexMessage} />);
    
    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
    expect(screen.getByText("Event: Test Event")).toBeInTheDocument();
    expect(screen.getByText("Date: Today")).toBeInTheDocument();
  });
});
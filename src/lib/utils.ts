import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format an event date for display
 * @param date - Date string or Date object
 * @param compact - Optional parameter for compact formatting
 * @returns Formatted date string
 */
export function formatEventDate(
  date: string | Date,
  compact?: boolean,
): string {
  const eventDate = new Date(date);

  if (isNaN(eventDate.getTime())) {
    return "Invalid Date";
  }

  if (compact) {
    return eventDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }

  return eventDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    hour: "numeric",
    minute: "2-digit",
  });
}

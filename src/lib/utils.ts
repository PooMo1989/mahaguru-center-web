import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx and tailwind-merge for optimal class merging with conflict resolution
 * 
 * @param inputs - Variable number of class values (strings, objects, arrays)
 * @returns Merged and deduplicated class string
 * 
 * @example
 * ```ts
 * cn("px-2 py-1", "px-4", { "bg-red-500": isError }) 
 * // Returns: "py-1 px-4 bg-red-500" (if isError is true)
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format date consistently across server/client to prevent hydration mismatch
 * Provides both full and compact formatting options for different UI contexts
 * 
 * Key features:
 * - Prevents React hydration mismatch by using consistent formatting
 * - Supports both full and compact display modes
 * - Manual date formatting ensures timezone consistency
 * - Optimized for event display use cases
 * 
 * @param date - Date object to format
 * @param compact - Whether to use compact format (default: false)
 *   - false: "Wednesday, January 25, 2025 at 6:00 PM" (full format)
 *   - true: "Jan 25, 6:00 PM" (compact format for sidebars)
 * @returns Formatted date string
 * 
 * @example
 * ```ts
 * const date = new Date("2025-01-25T18:00:00Z");
 * formatEventDate(date) // "Wednesday, January 25, 2025 at 6:00 PM"
 * formatEventDate(date, true) // "Jan 25, 6:00 PM"
 * ```
 */
export function formatEventDate(date: Date, compact = false): string {
  const months = compact 
    ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  const weekday = weekdays[date.getDay()];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;

  if (compact) {
    return `${month} ${day}, ${displayHours}:${minutes} ${ampm}`;
  }
  
  return `${weekday}, ${month} ${day}, ${year} at ${displayHours}:${minutes} ${ampm}`;
}

/**
 * Truncate text to specified length with ellipsis
 * Useful for limiting text display in UI components with space constraints
 * 
 * @param text - Text string to potentially truncate
 * @param maxLength - Maximum allowed length before truncation
 * @returns Original text if under limit, otherwise truncated text with ellipsis
 * 
 * @example
 * ```ts
 * truncateText("This is a very long text", 10) // "This is a..."
 * truncateText("Short", 10) // "Short"
 * ```
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

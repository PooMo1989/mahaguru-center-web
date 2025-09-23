"use client";

import { api } from "~/trpc/react";
import { useState, useEffect } from "react";
import { formatEventDate } from "~/lib/utils";
import { SafeImage } from "~/components/ui/safe-image";

/**
 * Event data structure for sidebar display
 * Simplified interface containing only fields needed for sidebar rendering
 */
interface Event {
  id: string;
  name: string;
  description: string;
  category: string;
  eventDate: Date;
  photos: string[];
}

/**
 * Configuration options for the UpcomingEventsSidebar component
 */
interface UpcomingEventsSidebarProps {
  /** Maximum number of events to display (default: 5) */
  maxEvents?: number;
  /** Additional CSS classes to apply to the sidebar container */
  className?: string;
}

/**
 * Safe date display component optimized for sidebar use
 * Uses compact date formatting and prevents hydration mismatch
 *
 * @param date - Date object to format in compact style
 * @returns JSX element with compact formatted date (e.g., "Dec 25, 6:00 PM")
 */
function SidebarSafeDateDisplay({ date }: { date: Date }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const staticFormat = formatEventDate(date, true); // Use compact format for sidebar

  if (!mounted) {
    return <span>{staticFormat}</span>;
  }

  return <span>{staticFormat}</span>;
}

/**
 * Individual event card component optimized for sidebar display
 * Compact layout with truncated text and reduced photo display
 *
 * @param event - Event data to display in compact format
 * @returns JSX element containing compact event card suitable for sidebar
 */
function SidebarEventCard({ event }: { event: Event }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="line-clamp-2 text-sm font-semibold text-gray-900">
            {event.name}
          </h3>
          <span className="ml-2 flex-shrink-0 rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-500">
            {event.category}
          </span>
        </div>

        <div className="text-xs text-gray-600">
          <time dateTime={event.eventDate.toISOString()}>
            <SidebarSafeDateDisplay date={event.eventDate} />
          </time>
        </div>

        <p className="line-clamp-3 text-xs leading-relaxed text-gray-700">
          {event.description}
        </p>

        {event.photos.length > 0 && (
          <div className="flex space-x-1">
            {event.photos.slice(0, 2).map((photo, index) => (
              <SafeImage
                key={index}
                src={photo}
                alt={`${event.name} photo ${index + 1}`}
                className="h-12 w-12 rounded-md object-cover"
                width={48}
                height={48}
                fallbackIcon="📷"
              />
            ))}
            {event.photos.length > 2 && (
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-100 text-xs text-gray-500">
                +{event.photos.length - 2}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * UpcomingEventsSidebar Component
 *
 * A reusable sidebar component that displays upcoming events in a compact format.
 * Designed to be embedded in other pages as a supplementary information panel.
 *
 * Features:
 * - Fetches upcoming events from tRPC API with automatic filtering
 * - Compact card layout optimized for sidebar display
 * - Configurable maximum number of events to show
 * - Responsive design that works across screen sizes
 * - Loading states with skeleton placeholders
 * - Error handling with user-friendly messages
 * - Empty state handling when no events are available
 * - Truncated text and limited photo display for space efficiency
 * - Hover effects and smooth transitions
 *
 * @param maxEvents - Maximum number of events to display (default: 5)
 * @param className - Additional CSS classes for customization
 * @returns JSX element containing the complete sidebar with upcoming events
 *
 * @example
 * ```tsx
 * // Basic usage
 * <UpcomingEventsSidebar />
 *
 * // With custom configuration
 * <UpcomingEventsSidebar
 *   maxEvents={3}
 *   className="md:w-80"
 * />
 * ```
 */
export function UpcomingEventsSidebar({
  maxEvents = 5,
  className = "",
}: UpcomingEventsSidebarProps) {
  const {
    data: upcomingEvents = [],
    isLoading,
    error,
  } = api.event.getEvents.useQuery({
    filter: "upcoming",
  });

  const displayEvents = upcomingEvents.slice(0, maxEvents);

  return (
    <div className={`w-full ${className}`}>
      <div className="rounded-lg border border-gray-200 bg-slate-50 p-4">
        <h2 className="mb-4 flex items-center text-lg font-bold text-gray-800">
          <svg
            className="mr-2 h-5 w-5 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Upcoming Events
        </h2>

        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }, (_, i) => (
              <div
                key={i}
                className="rounded-lg border border-gray-200 bg-white p-4"
                data-testid="event-skeleton"
              >
                <div className="animate-pulse space-y-2">
                  <div className="h-4 w-3/4 rounded bg-gray-200"></div>
                  <div className="h-3 w-1/2 rounded bg-gray-200"></div>
                  <div className="h-3 w-full rounded bg-gray-200"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-center">
            <p className="text-sm text-red-600">Unable to load events</p>
          </div>
        ) : displayEvents.length === 0 ? (
          <div className="rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm">
            <svg
              className="mx-auto mb-2 h-8 w-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="mb-1 text-sm text-gray-500">No upcoming events</p>
            <p className="text-xs text-gray-400">
              Check back soon for new events!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {displayEvents.map((event: Event) => (
              <SidebarEventCard key={event.id} event={event} />
            ))}

            {upcomingEvents.length > maxEvents && (
              <div className="border-t border-gray-200 pt-2">
                <p className="text-center text-xs text-gray-500">
                  And {upcomingEvents.length - maxEvents} more upcoming events
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

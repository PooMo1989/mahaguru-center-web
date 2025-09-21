"use client";

import { Navigation, Footer } from "~/components/navigation";
import { api } from "~/trpc/react";
import { useState, useEffect } from "react";
import { formatEventDate } from "~/lib/utils";
import { SafeImage } from "~/components/ui/safe-image";

/**
 * Event data structure as returned from the tRPC API
 * Matches the Event model from the database schema
 */
interface Event {
  id: string;
  name: string;
  description: string;
  category: string;
  eventDate: Date;
  photos: string[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Props for event display components
 * Contains essential event data needed for rendering
 */
interface EventDisplayProps {
  event: {
    id: string;
    name: string;
    description: string;
    category: string;
    eventDate: Date;
    photos: string[];
  };
}

/**
 * Safe date display component that prevents hydration mismatch
 * Uses client-side mounting to ensure consistent rendering between server and client
 * 
 * @param date - Date object to format and display
 * @returns JSX element with consistently formatted date
 */
function SafeDateDisplay({ date }: { date: Date }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const staticFormat = formatEventDate(date);

  if (!mounted) {
    return <span>{staticFormat}</span>;
  }

  return <span>{staticFormat}</span>;
}

/**
 * Individual event card component for displaying event details
 * Shows event name, category, date, description, and photos in a responsive card layout
 * 
 * @param event - Event data to display
 * @returns JSX element containing formatted event card
 */
function EventCard({ event }: EventDisplayProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-xl font-semibold text-gray-900">{event.name}</h3>
          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {event.category}
          </span>
        </div>
        
        <div className="text-sm text-gray-600">
          <time dateTime={event.eventDate.toISOString()}>
            <SafeDateDisplay date={event.eventDate} />
          </time>
        </div>
        
        <p className="text-gray-700 leading-relaxed">{event.description}</p>
        
        {event.photos.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {event.photos.slice(0, 3).map((photo, index) => (
              <SafeImage
                key={index}
                src={photo}
                alt={`${event.name} photo ${index + 1}`}
                className="w-full h-20 object-cover rounded-md"
                width={160}
                height={80}
              />
            ))}
            {event.photos.length > 3 && (
              <div className="flex items-center justify-center bg-gray-100 rounded-md h-20 text-sm text-gray-500">
                +{event.photos.length - 3} more
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Main Events Page Component
 * 
 * Displays a comprehensive events page with:
 * - Static recurring events section with predefined content
 * - Dynamic upcoming events section with API-fetched data
 * - Dynamic past events archive section with API-fetched data
 * - Responsive design optimized for all screen sizes
 * - Error handling and loading states for all API calls
 * - Empty state handling when no events are available
 * 
 * Features:
 * - Automatic date-based filtering of events
 * - Proper event ordering (upcoming: earliest first, past: most recent first)
 * - Event photos with error handling and optimization
 * - Type-safe tRPC integration for API calls
 * - Hydration-safe date formatting
 * 
 * @returns JSX element containing the complete events page
 */
export default function EventsPage() {
  const { data: upcomingEvents = [], isLoading: upcomingLoading, error: upcomingError } = api.event.getEvents.useQuery({
    filter: "upcoming"
  });
  
  const { data: pastEvents = [], isLoading: pastLoading, error: pastError } = api.event.getEvents.useQuery({
    filter: "past"
  });

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Events & Monthly Dhamma Discussion
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join our community for meaningful discussions, spiritual growth, and shared learning experiences.
            </p>
          </div>

          {/* Static Recurring Events Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Recurring Events</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Monthly Dhamma Discussion</h3>
                <p className="text-gray-700 leading-relaxed">
                  Our signature monthly Dhamma Discussion is a cornerstone event held on the full moon Poya day, 
                  drawing over a hundred curious seekers of truth. The session begins with a profound talk by Mahaguru, 
                  followed by co-facilitated breakout discussions with Rev. Bhaddiya and Nevil Guru to explore the 
                  teachings more deeply.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Weekly Clarity Q&A</h3>
                <p className="text-gray-700 leading-relaxed">
                  Join our interactive Weekly Clarity Q&A session, a supportive space for both new and experienced 
                  followers to find answers. Whether you have questions about your personal practice or seek to 
                  clarify concepts from our Dhamma discussions, this is your opportunity to engage directly with our 
                  facilitators. The session is expertly guided by Rev. Dodangoda Bhaddiya and Nevil Guru, with 
                  Mahaguru often in attendance to provide deeper insights where needed.
                </p>
              </div>
            </div>
          </section>

          {/* Upcoming Events Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Upcoming Events</h2>
            {upcomingError ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                <p className="text-red-600">Error loading upcoming events: {upcomingError.message}</p>
              </div>
            ) : upcomingLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" data-testid="loading-spinner"></div>
              </div>
            ) : upcomingEvents.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center border border-gray-200">
                <p className="text-gray-500 text-lg">No upcoming events scheduled at this time.</p>
                <p className="text-gray-400 text-sm mt-2">Please check back soon for new events!</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {upcomingEvents.map((event: Event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </section>

          {/* Past Events Archive Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Past Events Archive</h2>
            {pastError ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                <p className="text-red-600">Error loading past events: {pastError.message}</p>
              </div>
            ) : pastLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" data-testid="loading-spinner"></div>
              </div>
            ) : pastEvents.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center border border-gray-200">
                <p className="text-gray-500 text-lg">No past events in our archive yet.</p>
                <p className="text-gray-400 text-sm mt-2">Check back after our first events!</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {pastEvents.map((event: Event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
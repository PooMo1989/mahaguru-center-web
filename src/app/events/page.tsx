"use client";

import Image from "next/image";
import { Navigation, Footer } from "~/components/navigation";
import { api } from "~/trpc/react";
import { useState, useEffect } from "react";
import { formatEventDate } from "~/lib/utils";
import { MessageCircle, Calendar } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";

/**
 * Image data structure from the database
 */
interface ImageData {
  id: string;
  url: string;
  alt: string | null;
  isFeatured: boolean;
}

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
  images: ImageData[]; // New image structure
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
    images: ImageData[];
  };
  showParticipateButton?: boolean; // Add flag to control CTA visibility
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
 * Styled similar to project cards with image carousel at the top
 *
 * @param event - Event data to display
 * @param showParticipateButton - Whether to show the participate CTA (only for upcoming events)
 * @returns JSX element containing formatted event card
 */
function EventCard({ event, showParticipateButton = false }: EventDisplayProps) {
  // Get images - prioritize new image structure, fallback to legacy photos
  const eventImages = event.images.length > 0
    ? event.images
    : event.photos.map((photo, index) => ({
        id: `legacy-${index}`,
        url: photo,
        alt: `${event.name} photo ${index + 1}`,
        isFeatured: index === 0,
      }));

  // Sort images to show featured first
  const sortedImages = [...eventImages].sort((a, b) =>
    a.isFeatured === b.isFeatured ? 0 : a.isFeatured ? -1 : 1,
  );

  const hasMultipleImages = sortedImages.length > 1;

  // Create participate link (only used for upcoming events)
  const participateUrl = `/contact?tab=participate&event=${encodeURIComponent(event.name)}`;

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl">
      {/* Featured Image / Image Carousel */}
      {sortedImages.length > 0 && (
        <div className="relative h-48 sm:h-56">
          {hasMultipleImages ? (
            <Carousel className="h-full w-full">
              <CarouselContent>
                {sortedImages.map((image) => (
                  <CarouselItem key={image.id}>
                    <div className="relative h-48 sm:h-56">
                      <Image
                        src={image.url}
                        alt={image.alt ?? `${event.name} image`}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          ) : (
            <Image
              src={sortedImages[0]!.url}
              alt={sortedImages[0]!.alt ?? `${event.name} image`}
              fill
              className="object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          )}
        </div>
      )}

      <div className="p-6">
        {/* Event Name and Category */}
        <div className="mb-4">
          <h3 className="mb-2 text-xl font-bold text-gray-800">
            {event.name}
          </h3>
          <div className="mb-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">
              {event.category}
            </span>
            <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800">
              <time dateTime={event.eventDate.toISOString()}>
                <SafeDateDisplay date={event.eventDate} />
              </time>
            </span>
          </div>
        </div>

        {/* Event Description */}
        <p className={`leading-relaxed text-gray-600 ${showParticipateButton ? 'mb-6' : ''}`}>
          {event.description}
        </p>

        {/* CTA - Participate Button (only for upcoming events) */}
        {showParticipateButton && (
          <a
            href={participateUrl}
            className="block w-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-center font-semibold text-white transition-all duration-300 hover:from-blue-700 hover:to-blue-800"
          >
            Participate
          </a>
        )}
      </div>
    </div>
  );
}

/**
 * Main Events Page Component
 *
 * Displays a comprehensive events page with:
 * - Hero section with background image and CTA
 * - Static frequent events section (Monthly Dhamma Discussion & Weekly Clarity Q&A)
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
 * - Image carousel support for events with multiple images
 *
 * @returns JSX element containing the complete events page
 */
export default function EventsPage() {
  const {
    data: upcomingEvents = [],
    isLoading: upcomingLoading,
    error: upcomingError,
  } = api.event.getEvents.useQuery({
    filter: "upcoming",
  });

  const {
    data: pastEvents = [],
    isLoading: pastLoading,
    error: pastError,
  } = api.event.getEvents.useQuery({
    filter: "past",
  });

  // WhatsApp link with pre-filled message
  const whatsappNumber = "+94777100490";
  const whatsappMessage = encodeURIComponent("Tell me how to join ...");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-[70vh]">
          <div className="absolute inset-0">
            <Image
              src="/projects-hero.png"
              alt="Our Events Hero"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10 flex min-h-[70vh] items-center justify-center px-4">
            <div className="text-center text-white">
              <h1 className="mb-6 text-4xl font-bold md:text-6xl lg:text-7xl">
                Our Events
              </h1>
              <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed md:text-xl">
                Join our community for meaningful discussions, spiritual growth, and shared learning experiences.
              </p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-lg"
              >
                Inquire
              </a>
            </div>
          </div>
        </section>

        {/* Frequent Events Section */}
        <section className="bg-gradient-to-b from-gray-50 to-slate-100 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-800 md:text-4xl">
              Frequent Events
            </h2>
            <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl bg-white p-8 shadow-lg md:p-12">
              <div className="grid gap-8 md:grid-cols-2 md:gap-12">
                {/* Left Column: Monthly Dhamma Discussion */}
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
                    <Calendar className="h-10 w-10 text-blue-600" />
                  </div>
                  <h3 className="mb-4 text-2xl font-semibold text-gray-900">
                    Monthly Dhamma Discussion
                  </h3>
                  <p className="leading-relaxed text-gray-700">
                    Our signature monthly Dhamma Discussion is a cornerstone event
                    held on the full moon Poya day, drawing over a hundred curious
                    seekers of truth. The session begins with a profound talk by
                    Mahaguru, followed by co-facilitated breakout discussions with
                    Rev. Bhaddiya and Nevil Guru to explore the teachings more
                    deeply.
                  </p>
                </div>

                {/* Animated Vertical Divider */}
                <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 md:block">
                  <div className="h-full w-full animate-pulse bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
                </div>

                {/* Right Column: Weekly Clarity Q&A */}
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                    <MessageCircle className="h-10 w-10 text-green-600" />
                  </div>
                  <h3 className="mb-4 text-2xl font-semibold text-gray-900">
                    Weekly Clarity Q&A
                  </h3>
                  <p className="leading-relaxed text-gray-700">
                    Join our interactive Weekly Clarity Q&A session, a supportive
                    space for both new and experienced followers to find answers.
                    Whether you have questions about your personal practice or
                    seek to clarify concepts from our Dhamma discussions, this is
                    your opportunity to engage directly with our facilitators. The
                    session is expertly guided by Rev. Dodangoda Bhaddiya and
                    Nevil Guru, with Mahaguru often in attendance to provide
                    deeper insights where needed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Events Section */}
        {upcomingEvents.length > 0 && (
          <section className="bg-white py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="mb-12 text-center text-3xl font-bold text-gray-800 md:text-4xl">
                Upcoming Events
              </h2>
              {upcomingError ? (
                <div className="mx-auto max-w-2xl rounded-lg border border-red-200 bg-red-50 p-4 text-center">
                  <p className="text-red-600">
                    Error loading upcoming events: {upcomingError.message}
                  </p>
                </div>
              ) : upcomingLoading ? (
                <div className="flex justify-center py-8">
                  <div
                    className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"
                    data-testid="loading-spinner"
                  ></div>
                </div>
              ) : (
                <div className="mx-auto grid max-w-7xl grid-cols-1 justify-items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {upcomingEvents.map((event: Event) => (
                    <EventCard key={event.id} event={event} showParticipateButton={true} />
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Past Events Archive Section */}
        {pastEvents.length > 0 && (
          <section className="bg-gradient-to-b from-gray-50 to-slate-100 py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="mb-12 text-center text-3xl font-bold text-gray-800 md:text-4xl">
                Past Events Archive
              </h2>
              {pastError ? (
                <div className="mx-auto max-w-2xl rounded-lg border border-red-200 bg-red-50 p-4 text-center">
                  <p className="text-red-600">
                    Error loading past events: {pastError.message}
                  </p>
                </div>
              ) : pastLoading ? (
                <div className="flex justify-center py-8">
                  <div
                    className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"
                    data-testid="loading-spinner"
                  ></div>
                </div>
              ) : (
                <div className="mx-auto grid max-w-7xl grid-cols-1 justify-items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {pastEvents.map((event: Event) => (
                    <EventCard key={event.id} event={event} showParticipateButton={false} />
                  ))}
                </div>
              )}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}

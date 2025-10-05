"use client";

import Image from "next/image";
import { Navigation, Footer } from "~/components/navigation";
import { api } from "~/trpc/react";
import { useState, useEffect } from "react";
import type { Decimal } from "@prisma/client/runtime/library";
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
 * Project data structure as returned from the tRPC API
 * Matches the Project model from the database schema
 */
interface Project {
  id: string;
  projectName: string;
  description: string;
  photos: string[];
  images: ImageData[]; // New image structure
  donationGoalAmount: Decimal | number | null; // Handle both Decimal objects, serialized numbers, and null
  currentDonationAmount: Decimal | number | null; // Handle both Decimal objects, serialized numbers, and null
  projectType: string;
  projectNature: string; // API returns string, will be filtered properly
  startDate?: Date | null;
  endDate?: Date | null;
  donationLinkTarget: string; // API returns string, will be mapped properly
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Progress bar component for showing funding progress
 */
function ProjectProgressBar({
  current,
  goal,
  className = "",
}: {
  current: Decimal | number | null;
  goal: Decimal | number | null;
  className?: string;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-4 animate-pulse rounded-full bg-gray-200" />;
  }

  // Safely convert Decimal to number - handle both Prisma Decimal objects, plain numbers, and null
  const currentNum =
    current === null
      ? 0
      : typeof current === "object" && current !== null && "toNumber" in current
        ? current.toNumber()
        : Number(current);
  const goalNum =
    goal === null
      ? 0
      : typeof goal === "object" && goal !== null && "toNumber" in goal
        ? goal.toNumber()
        : Number(goal);
  const percentage =
    goalNum > 0 ? Math.min((currentNum / goalNum) * 100, 100) : 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex justify-between text-sm font-medium text-gray-700">
        <span>{formatCurrency(currentNum)} raised</span>
        <span>{percentage.toFixed(1)}%</span>
      </div>
      <div className="h-4 w-full rounded-full bg-gray-200">
        <div
          className="h-4 rounded-full bg-gradient-to-r from-[#E85D5D] to-[#D64C4C] transition-all duration-300 ease-in-out"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${percentage.toFixed(1)}% of ${formatCurrency(goalNum)} goal reached`}
        />
      </div>
      <div className="text-sm text-gray-600">
        of {formatCurrency(goalNum)} goal
      </div>
    </div>
  );
}

/**
 * Individual project card component
 */
function ProjectCard({ project }: { project: Project }) {
  const donationTargetMap: Record<string, string> = {
    "Daily Dana": "daily-dana",
    "Poya Day": "poya-day-event", // Fixed to match contact page tab ID
    "Special Projects": "special-projects",
  };

  const donationUrl = `/contact?tab=donate&target=${donationTargetMap[project.donationLinkTarget] ?? "special-projects"}&project=${encodeURIComponent(project.projectName)}`;

  // Get images - prioritize new image structure, fallback to legacy photos
  const projectImages = project.images.length > 0
    ? project.images
    : project.photos.map((photo, index) => ({
        id: `legacy-${index}`,
        url: photo,
        alt: `${project.projectName} photo ${index + 1}`,
        isFeatured: index === 0,
      }));

  // Sort images to show featured first
  const sortedImages = [...projectImages].sort((a, b) =>
    a.isFeatured === b.isFeatured ? 0 : a.isFeatured ? -1 : 1,
  );

  const hasMultipleImages = sortedImages.length > 1;

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
                        alt={image.alt ?? `${project.projectName} image`}
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
              alt={sortedImages[0]!.alt ?? `${project.projectName} image`}
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
        {/* Project Name and Tags */}
        <div className="mb-4">
          <h3 className="mb-2 text-xl font-bold text-[#301020]">
            {project.projectName}
          </h3>
          <div className="mb-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-[#FCE8D9] px-3 py-1 text-sm text-[#301020]">
              {project.projectType}
            </span>
            <span className="rounded-full bg-[#F3D1C4] px-3 py-1 text-sm text-[#301020]">
              {project.projectNature}
            </span>
          </div>
        </div>

        {/* Project Description */}
        <p className="mb-6 leading-relaxed text-gray-600">
          {project.description}
        </p>

        {/* Progress Bar */}
        <ProjectProgressBar
          current={project.currentDonationAmount}
          goal={project.donationGoalAmount}
          className="mb-6"
        />

        {/* CTA - Donate Button */}
        <a
          href={donationUrl}
          className="block w-full rounded-full bg-[#E85D5D] px-6 py-3 text-center font-semibold text-white transition-all duration-300 hover:bg-[#D64C4C]"
        >
          Donate Now
        </a>
      </div>
    </div>
  );
}

/**
 * Projects section component for grouping projects by nature
 * Currently unused but kept for future implementation
 */
/*
function ProjectsSection({
  title,
  projects,
  description,
}: {
  title: string;
  projects: Project[];
  description: string;
}) {
  if (projects.length === 0) return null;

  return (
    <section className="mb-16">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
          {title}
        </h2>
        <p className="mx-auto max-w-3xl text-lg text-gray-600">{description}</p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
*/

export default function ProjectsPage() {
  const {
    data: projects,
    isLoading,
    error,
  } = api.project.getProjects.useQuery({
    projectNature: "all",
    donationLinkTarget: "all",
  });

  if (isLoading) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen">
          <div className="flex items-center justify-center py-32">
            <div className="flex items-center space-x-2 text-[#301020]">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-[#E85D5D]"></div>
              <span className="text-lg">Loading projects...</span>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen">
          <div className="mx-auto max-w-4xl px-4 py-16 text-center">
            <div className="rounded-lg border border-red-200 bg-red-50 p-6">
              <p className="font-medium text-red-600">
                Unable to load projects at this time. Please try again later.
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Group projects by nature with proper type casting (kept for future use)
  // const ongoingProjects =
  //   projects?.filter((p: Project) => p.projectNature === "Continuous") ?? [];
  // const specialInitiatives =
  //   projects?.filter((p: Project) => p.projectNature === "One-time") ?? [];

  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {/* Section 01: Hero Section */}
        <section className="relative min-h-screen">
          <div className="absolute inset-0">
            <Image
              src="/projects-hero.png"
              alt="Our Projects Hero"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
            <div className="text-center text-white">
              <h1 className="mb-6 text-4xl font-bold md:text-6xl lg:text-7xl">
                Our Projects
              </h1>
              <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed md:text-xl">
                Explore our meaningful initiatives that serve our community and preserve the Dhamma. Your generosity helps us maintain these vital projects and expand our reach to help more seekers on their spiritual journey.
              </p>
              <a
                href="/contact?tab=volunteer"
                className="inline-block rounded-full bg-[#E85D5D] px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-[#D64C4C] hover:shadow-lg"
              >
                Volunteer
              </a>
            </div>
          </div>
        </section>

        {/* Section 02: Arahathmaga Spiritual Center */}
        <section className="py-16 md:py-24 bg-[#FCE8D9]">
          <div className="container mx-auto px-6 max-w-6xl">
            {/* Main Title and Subtitle */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#301020] mb-4">
                Arahathmaga Spiritual Center
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
                Our physical sanctuary where seekers can find peace and spiritual guidance
              </p>
            </div>

            {/* Wide Featured Image */}
            <div className="relative h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-xl mb-16 max-w-5xl mx-auto">
              <Image
                src="/amc-featured.png"
                alt="AMC Featured"
                fill
                className="object-cover"
              />
            </div>

            {/* What We Offer Section */}
            <div className="mb-20">
              <div className="text-center mb-12">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                  What We Offer
                </h3>
              </div>

              {/* 2x2 Grid of Features */}
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="flex items-start space-x-4 p-6 rounded-xl bg-white shadow-lg">
                  <div className="w-12 h-12 bg-[#E85D5D]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[#E85D5D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Peaceful Meditation</h4>
                    <p className="text-gray-700">Practice meditation in a peaceful environment</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-6 rounded-xl bg-white shadow-lg">
                  <div className="w-12 h-12 bg-[#E85D5D]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[#E85D5D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Expert Facilitators</h4>
                    <p className="text-gray-700">Meet with experienced spiritual facilitators</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-6 rounded-xl bg-white shadow-lg">
                  <div className="w-12 h-12 bg-[#E85D5D]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[#E85D5D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Learning & Contemplation</h4>
                    <p className="text-gray-700">Spend quality time in contemplation and learning</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-6 rounded-xl bg-white shadow-lg">
                  <div className="w-12 h-12 bg-[#D64C4C]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[#D64C4C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Mahaguru Guidance</h4>
                    <p className="text-gray-700">Access guidance from Mahaguru and other full-time facilitators</p>
                  </div>
                </div>
              </div>
            </div>

            {/* How the Center is Sustained Section */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="grid grid-cols-2 gap-4 h-full">
                  <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src="/AMC-employees.jpg"
                      alt="AMC Employees"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src="/AMC-light.png"
                      alt="AMC Light"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src="/AMC-water.jpg"
                      alt="AMC Water"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src="/car-four.png"
                      alt="Kids at Center"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2 bg-white rounded-2xl p-8 shadow-lg h-full flex flex-col justify-center">
                <h3 className="text-3xl font-bold text-[#301020] mb-6 md:text-4xl">
                  How the Center is Sustained
                </h3>
                <p className="text-[#301020] mb-8 text-lg leading-relaxed">
                  Every contribution directly supports the daily operations and long-term vision of our sanctuary
                </p>
                <div className="grid gap-6 mb-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#E85D5D]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-[#E85D5D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium text-lg">Permanent staff and full-time volunteers</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#D64C4C]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-[#D64C4C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium text-lg">Utilities and facility maintenance</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#E85D5D]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-[#E85D5D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium text-lg">Daily Dana for facilitators</span>
                  </div>
                </div>
                <div>
                  <a
                    href="/contact?tab=donate&target=daily-dana"
                    className="inline-block rounded-full bg-[#E85D5D] px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-[#D64C4C]"
                  >
                    Support Our Center
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 03: Digital Mission */}
        <section className="py-16 md:py-24 bg-[#FFF9F5]">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#301020]">Our Digital Mission</h2>
              <p className="mt-4 text-gray-600 max-w-2xl mx-auto">A comprehensive digital repository distilling over two decades of authentic dhamma teachings, supported by dedicated staff and volunteers.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col group">
                <a href="https://www.maithribodhi.org/" target="_blank" rel="noopener noreferrer" className="block relative aspect-video w-full bg-gray-200 rounded-md overflow-hidden mb-4">
                  <iframe src="https://www.maithribodhi.org/" className="w-full h-full pointer-events-none" title="Maithri Bodhi Website"></iframe>
                  <div className="absolute inset-0 bg-transparent group-hover:bg-[#E85D5D]/10 transition-colors"></div>
                </a>
                <h3 className="font-semibold text-xl group-hover:text-[#E85D5D] transition-colors">Web Archive</h3>
                <p className="text-gray-600 text-sm">A complete online platform preserving and organizing spiritual wisdom.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col">
                <div className="aspect-video w-full bg-gray-200 rounded-md overflow-hidden mb-4">
                  <iframe className="w-full h-full" src="https://www.youtube.com/embed/BKBs8NBnOHI" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
                <h3 className="font-semibold text-xl">YouTube Channel</h3>
                <p className="text-gray-600 text-sm">Extensive dhamma discussions with curated playlists for different spiritual topics.</p>
              </div>
              <a href="https://www.facebook.com/arahthmaga" target="_blank" rel="noopener noreferrer" className="block bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow group">
                <div className="relative aspect-video w-full bg-gray-100 rounded-md overflow-hidden mb-4">
                  <Image
                    src="https://i.ibb.co/nqBRmJRp/Screenshot-2025-07-29-153316.jpg"
                    alt="Facebook Page Snippet"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-semibold text-xl group-hover:text-[#E85D5D] transition-colors">Facebook Community</h3>
                <p className="text-gray-600 text-sm">Daily inspiration and guidance for our growing community of followers.</p>
              </a>
              <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col">
                <div className="relative aspect-video w-full rounded-md overflow-hidden mb-4">
                  <Image
                    src="https://i.ibb.co/fV2fm1RB/IMG-0324.jpg"
                    alt="Book Cover for Dhamma Publication"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-semibold text-xl">Key Publications</h3>
                <p className="text-gray-600 text-sm">Carefully curated books featuring the most important teachings and dispensations.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Special Projects (Dynamic Projects) */}
        {projects && projects.length > 0 && (
          <section className="py-16 md:py-24 bg-[#FCE8D9]">
            <div className="mx-auto max-w-7xl px-4">
              <div className="mb-16 text-center">
                <h2 className="mb-8 text-3xl font-bold text-[#301020] md:text-4xl">
                  Special Projects
                </h2>
                <p className="mx-auto max-w-3xl text-lg leading-relaxed text-[#301020]">
                  One-time projects with specific goals that help us expand our mission and reach new communities.
                </p>
              </div>

              {/* Display all projects */}
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}

"use client";

import Image from "next/image";
import { Navigation, Footer } from "~/components/navigation";
import { api } from "~/trpc/react";
import { useState, useEffect } from "react";
import type { Decimal } from "@prisma/client/runtime/library";

/**
 * Project data structure as returned from the tRPC API
 * Matches the Project model from the database schema
 */
interface Project {
  id: string;
  projectName: string;
  description: string;
  photos: string[];
  donationGoalAmount: Decimal | number; // Handle both Decimal objects and serialized numbers
  currentDonationAmount: Decimal | number; // Handle both Decimal objects and serialized numbers
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
  current: Decimal | number;
  goal: Decimal | number;
  className?: string;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-4 animate-pulse rounded-full bg-gray-200" />;
  }

  // Safely convert Decimal to number - handle both Prisma Decimal objects and plain numbers
  const currentNum =
    typeof current === "object" && current !== null && "toNumber" in current
      ? current.toNumber()
      : Number(current);
  const goalNum =
    typeof goal === "object" && goal !== null && "toNumber" in goal
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
          className="h-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 ease-in-out"
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

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl">
      {/* Project Photos */}
      {project.photos.length > 0 && (
        <div className="relative h-48 sm:h-56">
          <Image
            src={project.photos[0] ?? ""}
            alt={`${project.projectName} photo`}
            fill
            className="object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      )}

      <div className="p-6">
        {/* Project Header */}
        <div className="mb-4">
          <h3 className="mb-2 text-xl font-bold text-gray-800">
            {project.projectName}
          </h3>
          <div className="mb-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">
              {project.projectType}
            </span>
            <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800">
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

        {/* Donate Button */}
        <a
          href={donationUrl}
          className="block w-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-center font-semibold text-white transition-all duration-300 hover:from-blue-700 hover:to-blue-800"
        >
          Donate Now
        </a>
      </div>
    </div>
  );
}

/**
 * Projects section component for grouping projects by nature
 */
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
        <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
          <div className="mx-auto max-w-7xl px-4 py-16">
            <div className="mb-16 text-center">
              <h1 className="mb-8 text-4xl font-bold text-gray-800 md:text-5xl">
                Our Projects
              </h1>
              <div className="flex items-center justify-center space-x-2 text-gray-600">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
                <span className="text-lg">Loading projects...</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="animate-pulse rounded-lg bg-white p-6 shadow-lg"
                >
                  <div className="mb-4 h-6 rounded bg-gray-300"></div>
                  <div className="mb-2 h-4 rounded bg-gray-300"></div>
                  <div className="mb-6 h-4 w-3/4 rounded bg-gray-300"></div>
                  <div className="mb-2 h-4 rounded bg-gray-300"></div>
                  <div className="mb-6 h-4 rounded bg-gray-300"></div>
                  <div className="h-10 rounded bg-gray-300"></div>
                </div>
              ))}
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
        <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
          <div className="mx-auto max-w-4xl px-4 py-16 text-center">
            <h1 className="mb-8 text-4xl font-bold text-gray-800 md:text-5xl">
              Our Projects
            </h1>
            <div className="rounded-lg border border-red-200 bg-red-50 p-6">
              <p className="font-medium text-red-600">
                Unable to load projects at this time. Please try again later.
              </p>
            </div>
          </div>
        </main>
      </>
    );
  }

  // Group projects by nature with proper type casting
  const ongoingProjects =
    projects?.filter((p: Project) => p.projectNature === "Continuous") ?? [];
  const specialInitiatives =
    projects?.filter((p: Project) => p.projectNature === "One-time") ?? [];

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
        <div className="mx-auto max-w-7xl px-4 py-16">
          {/* Page Header */}
          <div className="mb-16 text-center">
            <h1 className="mb-8 text-4xl font-bold text-gray-800 md:text-5xl">
              Our Projects
            </h1>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600">
              Explore our meaningful initiatives that serve our community and
              preserve the Dhamma. Your generosity helps us maintain these vital
              projects and expand our reach to help more seekers on their
              spiritual journey.
            </p>
          </div>

          {/* Show message if no projects */}
          {(!projects || projects.length === 0) && (
            <div className="py-16 text-center">
              <div className="mx-auto max-w-2xl rounded-lg bg-white p-8 shadow-lg">
                <h2 className="mb-4 text-2xl font-bold text-gray-800">
                  No Projects Available
                </h2>
                <p className="text-gray-600">
                  We&apos;re currently preparing new projects to serve our
                  community. Please check back soon or contact us to learn more
                  about upcoming initiatives.
                </p>
              </div>
            </div>
          )}

          {/* Ongoing Projects Section */}
          <ProjectsSection
            title="Ongoing Projects"
            projects={ongoingProjects}
            description="Our continuous initiatives that require ongoing support to maintain and grow our community services."
          />

          {/* Special Initiatives Section */}
          <ProjectsSection
            title="Special Initiatives"
            projects={specialInitiatives}
            description="One-time projects with specific goals that help us expand our mission and reach new communities."
          />
        </div>
      </main>
      <Footer />
    </>
  );
}

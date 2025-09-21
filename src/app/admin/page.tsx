"use client";

import { useState } from "react";
import { api, type RouterOutputs } from "~/trpc/react";
import { EventList } from "~/components/admin/event-list";
import { EventForm } from "~/components/admin/event-form";
import { ProjectList } from "~/components/admin/project-list";
import { ProjectForm } from "~/components/admin/project-form";
import { ConfirmationDialog } from "~/components/admin/confirmation-dialog";

type Event = RouterOutputs["event"]["getEvents"][number];
type Project = RouterOutputs["project"]["getProjects"][number];

export default function AdminPage() {
  // Tab state
  const [activeTab, setActiveTab] = useState<"events" | "projects">("events");
  
  // Event states
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [deletingEvent, setDeletingEvent] = useState<Event | null>(null);
  
  // Project states
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deletingProject, setDeletingProject] = useState<Project | null>(null);
  
  // Get events query
  const {
    data: events,
    isLoading: eventsLoading,
    error: eventsError,
    refetch: refetchEvents,
  } = api.event.getEvents.useQuery({ filter: "all" });

  // Get projects query
  const {
    data: projects,
    isLoading: projectsLoading,
    error: projectsError,
    refetch: refetchProjects,
  } = api.project.getProjects.useQuery(
    { projectNature: "all", donationLinkTarget: "all" },
    {
      retry: 1,
    }
  );

  // Log projects error if any
  if (projectsError) {
    console.error("Error loading projects:", projectsError);
  }

  // Delete event mutation
  const deleteEventMutation = api.event.deleteEvent.useMutation({
    onSuccess: () => {
      setDeletingEvent(null);
      void refetchEvents();
    },
    onError: (error) => {
      console.error("Error deleting event:", error);
      // Could add toast notification here
    },
  });

  // Delete project mutation
  const deleteProjectMutation = api.project.deleteProject.useMutation({
    onSuccess: () => {
      setDeletingProject(null);
      void refetchProjects();
    },
    onError: (error) => {
      console.error("Error deleting project:", error);
      // Could add toast notification here
    },
  });

  const handleEventCreated = () => {
    setShowEventForm(false);
    void refetchEvents();
  };

  const handleEventUpdated = () => {
    setEditingEvent(null);
    void refetchEvents();
  };

  const handleProjectCreated = () => {
    setShowProjectForm(false);
    void refetchProjects();
  };

  const handleProjectUpdated = () => {
    setEditingProject(null);
    void refetchProjects();
  };

  const handleEventEdit = (event: Event) => {
    setEditingEvent(event);
    setShowEventForm(false); // Close create form if open
  };

  const handleProjectEdit = (project: Project) => {
    setEditingProject(project);
    setShowProjectForm(false); // Close create form if open
  };

  const handleEventDelete = (event: Event) => {
    setDeletingEvent(event);
  };

  const handleProjectDelete = (project: Project) => {
    setDeletingProject(project);
  };

  const confirmEventDelete = () => {
    if (deletingEvent) {
      deleteEventMutation.mutate({ id: deletingEvent.id });
    }
  };

  const confirmProjectDelete = () => {
    if (deletingProject) {
      deleteProjectMutation.mutate({ id: deletingProject.id });
    }
  };

  const cancelEventEdit = () => {
    setEditingEvent(null);
  };

  const cancelProjectEdit = () => {
    setEditingProject(null);
  };

  const cancelEventDelete = () => {
    setDeletingEvent(null);
  };

  const cancelProjectDelete = () => {
    setDeletingProject(null);
  };

  // Determine loading and error states based on active tab
  const isLoading = activeTab === "events" ? eventsLoading : projectsLoading;
  const error = activeTab === "events" ? eventsError : projectsError;

  // Debug logging
  if (activeTab === "projects" && projects) {
    console.log("Projects data:", projects);
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <p className="text-red-800">Error loading {activeTab}: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Tab Navigation */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Admin Portal</h2>
              <p className="mt-1 text-sm text-gray-500">
                Manage events and projects for the Mahaguru Center
              </p>
            </div>
          </div>
          
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab("events")}
                className={`${
                  activeTab === "events"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`}
              >
                Events
                {events && events.length > 0 && (
                  <span className="ml-2 bg-gray-100 text-gray-900 hidden sm:inline-block py-0.5 px-2.5 rounded-full text-xs font-medium">
                    {events.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab("projects")}
                className={`${
                  activeTab === "projects"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`}
              >
                Projects
                {projects && projects.length > 0 && (
                  <span className="ml-2 bg-gray-100 text-gray-900 hidden sm:inline-block py-0.5 px-2.5 rounded-full text-xs font-medium">
                    {projects.length}
                  </span>
                )}
              </button>
            </nav>
          </div>
          
          {/* Action Button */}
          <div className="mt-4 flex justify-end">
            {activeTab === "events" ? (
              <button
                onClick={() => {
                  setShowEventForm(!showEventForm);
                  setEditingEvent(null); // Close edit form if open
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {showEventForm ? "Cancel" : "Create New Event"}
              </button>
            ) : (
              <button
                onClick={() => {
                  setShowProjectForm(!showProjectForm);
                  setEditingProject(null); // Close edit form if open
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {showProjectForm ? "Cancel" : "Add New Project"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === "events" ? (
        <>
          {/* Event Creation Form */}
          {showEventForm && (
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Event</h3>
                <EventForm onEventCreated={handleEventCreated} />
              </div>
            </div>
          )}

          {/* Event Edit Form */}
          {editingEvent && (
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Event</h3>
                <EventForm 
                  mode="edit"
                  editEvent={editingEvent}
                  onEventUpdated={handleEventUpdated}
                  onCancel={cancelEventEdit}
                />
              </div>
            </div>
          )}

          {/* Events List */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">All Events</h3>
              <EventList 
                events={events ?? []} 
                onRefresh={refetchEvents}
                onEdit={handleEventEdit}
                onDelete={handleEventDelete}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Project Creation Form */}
          {showProjectForm && (
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Project</h3>
                <ProjectForm onProjectCreated={handleProjectCreated} />
              </div>
            </div>
          )}

          {/* Project Edit Form */}
          {editingProject && (
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Project</h3>
                <ProjectForm 
                  mode="edit"
                  editProject={editingProject}
                  onProjectUpdated={handleProjectUpdated}
                  onCancel={cancelProjectEdit}
                />
              </div>
            </div>
          )}

          {/* Projects List */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">All Projects</h3>
              <ProjectList 
                projects={projects ?? []} 
                onRefresh={refetchProjects}
                onEdit={handleProjectEdit}
                onDelete={handleProjectDelete}
              />
            </div>
          </div>
        </>
      )}

      {/* Delete Confirmation Dialogs */}
      <ConfirmationDialog
        isOpen={!!deletingEvent}
        onClose={cancelEventDelete}
        onConfirm={confirmEventDelete}
        title="Delete Event"
        message={
          deletingEvent ? (
            <div>
              <p>Are you sure you want to delete this event?</p>
              <div className="mt-2 p-3 bg-gray-50 rounded">
                <p className="font-medium">{deletingEvent.name}</p>
                <p className="text-sm text-gray-600">
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  }).format(new Date(deletingEvent.eventDate))}
                </p>
              </div>
              <p className="mt-2 text-red-600">This action cannot be undone.</p>
            </div>
          ) : ""
        }
        confirmText="Delete Event"
        cancelText="Cancel"
        isLoading={deleteEventMutation.isPending}
      />

      <ConfirmationDialog
        isOpen={!!deletingProject}
        onClose={cancelProjectDelete}
        onConfirm={confirmProjectDelete}
        title="Delete Project"
        message={
          deletingProject ? (
            <div>
              <p>Are you sure you want to delete this project?</p>
              <div className="mt-2 p-3 bg-gray-50 rounded">
                <p className="font-medium">{deletingProject.projectName}</p>
                <p className="text-sm text-gray-600">{deletingProject.projectType} - {deletingProject.projectNature}</p>
                <p className="text-sm text-gray-600">Goal: ${typeof deletingProject.donationGoalAmount?.toNumber === 'function' 
                  ? deletingProject.donationGoalAmount.toNumber() 
                  : Number(deletingProject.donationGoalAmount) || 0}</p>
              </div>
              <p className="mt-2 text-red-600">This action cannot be undone.</p>
            </div>
          ) : ""
        }
        confirmText="Delete Project"
        cancelText="Cancel"
        isLoading={deleteProjectMutation.isPending}
      />
    </div>
  );
}
"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { EventList } from "~/components/admin/event-list";
import { EventForm } from "~/components/admin/event-form";

export default function AdminPage() {
  const [showForm, setShowForm] = useState(false);
  
  // Get events query
  const {
    data: events,
    isLoading,
    error,
    refetch: refetchEvents,
  } = api.event.getEvents.useQuery({ filter: "all" });

  const handleEventCreated = () => {
    setShowForm(false);
    void refetchEvents();
  };

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
        <p className="text-red-800">Error loading events: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Event Management</h2>
              <p className="mt-1 text-sm text-gray-500">
                Create and manage events for the Mahaguru Center
              </p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {showForm ? "Cancel" : "Create New Event"}
            </button>
          </div>
        </div>
      </div>

      {/* Event Creation Form */}
      {showForm && (
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Event</h3>
            <EventForm onEventCreated={handleEventCreated} />
          </div>
        </div>
      )}

      {/* Events List */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">All Events</h3>
          <EventList events={events ?? []} onRefresh={refetchEvents} />
        </div>
      </div>
    </div>
  );
}
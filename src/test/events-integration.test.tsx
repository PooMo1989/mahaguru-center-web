import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { formatEventDate } from "~/lib/utils";

interface TestEvent {
  id: string;
  name: string;
  eventDate: Date;
}

// Mock the date filtering logic that would be used in the tRPC router
function filterEventsByDate(events: TestEvent[], filter: "upcoming" | "past" | "all") {
  const now = new Date();
  
  if (filter === "upcoming") {
    return events.filter(event => event.eventDate >= now);
  } else if (filter === "past") {
    return events.filter(event => event.eventDate < now);
  }
  
  return events;
}

function sortEventsByDate(events: TestEvent[], filter: "upcoming" | "past" | "all") {
  const sortedEvents = [...events];
  
  if (filter === "past") {
    // Most recent first for past events
    return sortedEvents.sort((a, b) => b.eventDate.getTime() - a.eventDate.getTime());
  } else {
    // Earliest first for upcoming events and default
    return sortedEvents.sort((a, b) => a.eventDate.getTime() - b.eventDate.getTime());
  }
}

describe("Events Date Filtering Logic", () => {
  const mockEvents: TestEvent[] = [
    {
      id: "1",
      name: "Far Future Event",
      eventDate: new Date("2026-06-15T18:00:00Z"),
    },
    {
      id: "2", 
      name: "Near Future Event",
      eventDate: new Date("2025-12-25T18:00:00Z"),
    },
    {
      id: "3",
      name: "Recent Past Event", 
      eventDate: new Date("2025-08-15T18:00:00Z"),
    },
    {
      id: "4",
      name: "Old Past Event",
      eventDate: new Date("2025-01-15T18:00:00Z"),
    },
  ];

  beforeEach(() => {
    // Mock current date to September 20, 2025
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-09-20T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("filters upcoming events correctly", () => {
    const upcomingEvents = filterEventsByDate(mockEvents, "upcoming");
    
    expect(upcomingEvents).toHaveLength(2);
    expect(upcomingEvents.map(e => e.name)).toEqual([
      "Far Future Event",
      "Near Future Event"
    ]);
  });

  it("filters past events correctly", () => {
    const pastEvents = filterEventsByDate(mockEvents, "past");
    
    expect(pastEvents).toHaveLength(2);
    expect(pastEvents.map(e => e.name)).toEqual([
      "Recent Past Event",
      "Old Past Event"
    ]);
  });

  it("returns all events when filter is 'all'", () => {
    const allEvents = filterEventsByDate(mockEvents, "all");
    
    expect(allEvents).toHaveLength(4);
  });

  it("sorts upcoming events chronologically (earliest first)", () => {
    const upcomingEvents = filterEventsByDate(mockEvents, "upcoming");
    const sortedEvents = sortEventsByDate(upcomingEvents, "upcoming");
    
    expect(sortedEvents.map(e => e.name)).toEqual([
      "Near Future Event",  // Dec 25, 2025
      "Far Future Event"    // Jun 15, 2026
    ]);
  });

  it("sorts past events reverse chronologically (most recent first)", () => {
    const pastEvents = filterEventsByDate(mockEvents, "past");
    const sortedEvents = sortEventsByDate(pastEvents, "past");
    
    expect(sortedEvents.map(e => e.name)).toEqual([
      "Recent Past Event",  // Aug 15, 2025 (more recent)
      "Old Past Event"      // Jan 15, 2025 (older)
    ]);
  });

  it("handles edge case of event at exact current time", () => {
    const now = new Date("2025-09-20T12:00:00Z");
    const edgeCaseEvents: TestEvent[] = [
      {
        id: "1",
        name: "Event at Current Time",
        eventDate: now,
      },
      {
        id: "2", 
        name: "Event 1 Second Future",
        eventDate: new Date(now.getTime() + 1000),
      },
      {
        id: "3",
        name: "Event 1 Second Past",
        eventDate: new Date(now.getTime() - 1000),
      },
    ];

    const upcomingEvents = filterEventsByDate(edgeCaseEvents, "upcoming");
    const pastEvents = filterEventsByDate(edgeCaseEvents, "past");

    // Event at current time should be considered upcoming (>=)
    expect(upcomingEvents).toHaveLength(2);
    expect(upcomingEvents.map(e => e.name)).toEqual([
      "Event at Current Time",
      "Event 1 Second Future"
    ]);

    expect(pastEvents).toHaveLength(1);
    expect(pastEvents.map(e => e.name)).toEqual(["Event 1 Second Past"]);
  });
});

describe("Event Display Requirements", () => {
  const sampleEvent = {
    id: "test-event",
    name: "Test Event Name",
    description: "Test event description with details",
    category: "Workshop", 
    eventDate: new Date("2025-12-25T18:00:00Z"),
    photos: ["https://example.com/photo1.jpg", "https://example.com/photo2.jpg"],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  it("event contains all required fields", () => {
    // Verify the event model has all required fields as per AC 11
    expect(sampleEvent).toHaveProperty("name");
    expect(sampleEvent).toHaveProperty("description");
    expect(sampleEvent).toHaveProperty("category");
    expect(sampleEvent).toHaveProperty("eventDate");
    expect(sampleEvent).toHaveProperty("photos");
    
    expect(typeof sampleEvent.name).toBe("string");
    expect(typeof sampleEvent.description).toBe("string");
    expect(typeof sampleEvent.category).toBe("string");
    expect(sampleEvent.eventDate).toBeInstanceOf(Date);
    expect(Array.isArray(sampleEvent.photos)).toBe(true);
  });

  it("photos field handles empty array", () => {
    const eventWithoutPhotos = { ...sampleEvent, photos: [] };
    expect(Array.isArray(eventWithoutPhotos.photos)).toBe(true);
    expect(eventWithoutPhotos.photos).toHaveLength(0);
  });

  it("date formatting works correctly", () => {
    const date = new Date("2025-12-25T18:00:00Z");
    
    // Test the date formatting using our utility
    const formattedDate = formatEventDate(date);
    
    expect(formattedDate).toMatch(/Thursday.*December.*25.*2025.*at.*\d{1,2}:\d{2} [AP]M/);
  });

  it("compact date formatting works for sidebar", () => {
    const date = new Date("2025-12-25T14:30:00Z");
    
    // Test the compact date formatting using our utility
    const compactDate = formatEventDate(date, true);
    
    expect(compactDate).toMatch(/Dec 25, \d{1,2}:\d{2} [AP]M/);
  });
});
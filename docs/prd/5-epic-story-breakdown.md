# 5. Epic & Story Breakdown

### **Epic 1: Core Informational Pages**

* **Goal:** Launch the initial version of the website with the Homepage, Services, 'Book a Meetup' page, and a basic informational page for the Gen Alpha Academy to establish the core online presence.
* **Pages Included:** Homepage, Services, Book a Meetup, Gen Alpha Academy (Basic Version).

#### **Story 1.1: Project Foundation**
> As a developer, I want to set up the initial project structure and repository so that we have a solid foundation to build upon.
* **Acceptance Criteria:**
    1.  A new Git repository for the project must be initialized.
    2.  The repository must follow the agreed-upon **Monorepo** structure, with distinct packages/directories for the `frontend` and `backend` applications.
    3.  The `frontend` application must be initialized with a standard framework and its basic dependencies.
    4.  The `backend` application (as a **Monolith**) must be initialized with a standard framework and its basic dependencies.
    5.  Basic development tooling (e.g., a linter for code quality) must be configured at the root of the monorepo.
    6.  A basic `README.md` file must be created with instructions on how to install dependencies and run the project locally.
    7.  The initial, empty applications must be successfully deployed to a staging/development environment to confirm the deployment pipeline is functional.

#### **Story 1.2: Homepage Implementation**
> As a first-time visitor, I want to see a clean Homepage with clear navigation so that I can easily understand the purpose of the site and find the main sections.
* **Acceptance Criteria:**
    1.  The homepage must display a main navigation bar.
    2.  The navigation bar must contain functional links for: Mahaguru, Services, Projects, Events, and Contact Us.
    3.  The main content area of the homepage should contain simple placeholder text and images that establish the "serene and welcoming" visual theme.
    4.  The page layout must be fully responsive, rendering correctly on desktop, tablet, and mobile screen sizes.
    5.  All navigation links must correctly route to their respective pages, even if those pages are placeholders for now.

#### **Story 1.3: Services Page Implementation**
> As a potential follower, I want a Services page that clearly lists and describes all the offerings of the center, with relevant images and links, so that I can understand how to engage.
* **Acceptance Criteria:**
    1.  The page must display all seven services as defined in the Project Brief.
    2.  For each service, the complete, unabridged description from the Project Brief must be displayed.
    3.  The layout of the page must be fully responsive.
    4.  Each service section must include a functional call-to-action button that links to the specified **internal page or external booking link**.
    5.  The "Mahaguru Meetup" and "Gen Alpha Academy" sections must link correctly to their respective detailed pages.
    6.  Each of the seven service sections must display one or more **relevant images** that visually represent the service.
    7.  **Dependency:** The specific images for each service must be provided by the project owner before this story can be marked as complete.

#### **Story 1.4: Book a Meetup Page Implementation**
> As a user seeking guidance, I want a detailed 'Book a Meetup' page so that I can understand the options and book a session with the Mahaguru.
* **Acceptance Criteria:**
    1.  The page must be created and display all six sections as defined in the Project Brief.
    2.  The exact, unabridged text from the Project Brief must be used for all sections, including contribution amounts.
    3.  The page layout must be fully responsive.
    4.  All call-to-action buttons must be present and functional.
    5.  The page must be accessible via the link on the "Services" page.

#### **Story 1.5: Gen Alpha Academy (Basic) Page Implementation**
> As an interested parent or young adult, I want a basic informational page for the Gen Alpha Academy so that I can understand its mission and purpose, with the knowledge that full details will be coming soon.
* **Acceptance Criteria:**
    1.  The page must display the core introductory content from the Project Brief.
    2.  The page must **not** include specific workshop details like the date, duration, price, or registration buttons.
    3.  The page must include a clear message indicating that specific workshop details are "Coming Soon."
    4.  The page layout must be fully responsive.
    5.  The page must be accessible via the link on the "Services" page.

### **Epic 2: Deep Content & Interactive UI**

* **Goal:** Add the detailed Mahaguru and Contact Us pages, and implement the dynamic tabbed interfaces to enhance user engagement.
* **Pages Included:** Mahaguru, Contact Us.

#### **Story 2.1: Mahaguru Page Content Implementation**
> As a visitor, I want to view a Mahaguru page that presents the five stages of his life so that I can understand his journey.
* **Acceptance Criteria:**
    1.  A new "Mahaguru" page must be created.
    2.  The page must display all five sections corresponding to the stages of his life, using the exact, unabridged text from the Project Brief.
    3.  The page layout must be fully responsive.
    4.  For this story, the content should be presented in a simple, scrollable format.

#### **Story 2.2: Mahaguru Page Interactive Tabs**
> As a visitor, I want to navigate the five stages of the Mahaguru's life using an interactive tabbed interface so that I can easily explore the content without scrolling.
* **Acceptance Criteria:**
    1.  The Mahaguru page must display five clickable tabs for the five stages.
    2.  When the page first loads, the content for the first tab must be visible.
    3.  Clicking on a tab must display its content and hide the others.
    4.  Switching between tabs must happen instantly, withouta full page reload.
    5.  The tabbed interface must be responsive.

#### **Story 2.3: Contact Us Page (Volunteer Section)**
> As a supporter, I want a 'Volunteer' section on the Contact Us page with a simple form so that I can express my interest in helping the center.
* **Acceptance Criteria:**
    1.  A new "Contact Us" page must be created.
    2.  The page must display a "Volunteer" section with the text from the Project Brief.
    3.  A simple contact form must be displayed within the Volunteer section.
    4.  The form must include fields for Full Name, Email Address, and a Message.
    5.  The form must have a functional "Submit" button.
    6.  Upon submission, a simple success message must be displayed.
    7.  The section and its form must be fully responsive.

#### **Story 2.4: Contact Us Page (Donation Tabs)**
> As a supporter, I want to use a tabbed interface in the 'Donate' section so that I can easily choose a specific fund to contribute to.
* **Acceptance Criteria:**
    1.  The "Contact Us" page must display a "Donate" section.
    2.  The section must feature three clickable tabs: "Daily Dana," "Poya Day Event," and "Special Projects."
    3.  When a tab is clicked, the specific description and image for that fund must be displayed.
    4.  The content and form must change instantly without a full page reload.
    5.  The donation form must include fields for Donation Amount, Full Name, and Email Address.
    6.  The form must clearly indicate which fund the donation is for.
    7.  Upon submission, a simple success message must be displayed.
    8.  The tabbed interface and its forms must be fully responsive.

### **Epic 3: Dynamic Events System**

* **Goal:** Implement the complete, admin-managed Events system, allowing the center to manage and display recurring, past, and upcoming events automatically.

#### **Story 3.1: Events Backend API Foundation (Revised)**
> As an administrator, I want a basic backend system and API for Events so that I can programmatically create, read, update, and delete event data.
* **Acceptance Criteria:**
    1.  A database table/collection for "Events" must be created.
    2.  The Event data model must include a mandatory **`EventDate`** (datetime) field.
    3.  API endpoints for creating, updating, and deleting events must be functional.
    4.  The API endpoint for reading events (`GET /api/events`) must support **filtering** by past or upcoming.
    5.  The API endpoint for reading a single event must be functional.
    6.  All API endpoints must be verified with automated tests.

#### **Story 3.2: Admin Portal (Create & View Events) (Revised)**
> As an administrator, I want a simple web portal where I can create new events with all required details and view a list of all existing events.
* **Acceptance Criteria:**
    1.  A new, simple, password-protected admin page must be created.
    2.  The page must display a list of all events, showing the Event Name and **Event Date**.
    3.  The page must contain a form for creating a new event.
    4.  The form must include a user-friendly **date and time picker** for the `EventDate`.
    5.  The "Create Event" button must send data to the backend API.
    6.  After creation, the event list must refresh and show the new event.
    7.  The admin portal must be functional on a desktop browser.

#### **Story 3.3: Admin Portal (Update & Delete Events) (Revised)**
> As an administrator, I want to be able to edit the details of existing events and delete them from the admin portal.
* **Acceptance Criteria:**
    1.  Each event in the admin list must have an "Edit" and a "Delete" button.
    2.  Clicking "Edit" must open a form pre-populated with that event's data.
    3.  The "Save Changes" button must send updated data to the API.
    4.  After an update, the list must show the new information.
    5.  Clicking "Delete" must trigger a confirmation prompt.
    6.  If confirmed, the event must be deleted via the API.
    7.  After deletion, the event must disappear from the list.

#### **Story 3.4: Frontend Events Page & Automated Filtering (Final Version)**
> As a visitor, I want to view an Events page and sidebar that automatically show upcoming and past events in the correct sections so that the information is always current and relevant.
* **Acceptance Criteria:**
    1.  A public "Events" page and a reusable "Upcoming Events" sidebar component must be created.
    2.  The components must fetch **dynamic** event data from the API.
    3.  The "Events" page must display a **static "Recurring Events" section**.
    4.  The "Upcoming Events" sidebar must display events with a future date.
    5.  The "Past Events Archive" must display events with a date in the past.
    6.  Each **dynamic** event displayed must show its details including date and time.
    7.  If a section has no dynamic events, a user-friendly message must be shown.
    8.  The page and sidebar must be fully responsive.

### **Epic 4: Dynamic Projects & Donations System**

* **Goal:** Develop the backend portal for managing projects and implement the dynamic donation tracking system on the website.

#### **Story 4.1: Projects Backend API Foundation (Revised)**
> As an administrator, I want a backend system and API for Projects so that I can manage project and donation data.
* **Acceptance Criteria:**
    1.  A database table/collection for "Projects" must be created.
    2.  The Project data model must include all required fields: `ProjectName`, `Description`, `DonationGoalAmount`, `CurrentDonationAmount`, `ProjectType`, `ProjectNature`, `StartDate`, `EndDate`, `donationLinkTarget`, and `photos`.
    3.  The Project data model must support all four specific projects from the Project Brief: "Our Digital Mission", "Arahathmaga Spiritual Center", "The AI Guru", and "Beyond Words".
    4.  All CRUD endpoints (Create, Read, Update, Delete) must be functional.
    5.  All API endpoints must be verified with automated tests.

#### **Story 4.2: Unified Admin Portal - Add Project Management Tab (Revised)**
> As an administrator, I want to manage all project details through the existing admin portal using a new "Projects" tab, so that I can maintain all administrative functions in one unified interface.
* **Acceptance Criteria:**
    1.  The existing admin portal at `/admin` must display a new "Projects" tab alongside the "Events" tab.
    2.  The Projects tab must display a list of all projects with key information and an "Add New Project" button.
    3.  Each project row must show: Project Name, Type, Nature, Current/Goal amounts, and have "Edit" and "Delete" buttons.
    4.  The "Add New Project" and "Edit" buttons must open a comprehensive project form.
    5.  The form must include all project fields with proper validation and the `ProjectNature` field as radio buttons ('Continuous'/'One-time').
    6.  If 'Continuous' is selected, `StartDate` and `EndDate` fields must be **disabled**. If 'One-time' is selected, they must be **enabled**.
    7.  The "Save" button must handle both create and update logic with proper error handling.
    8.  After saving, the list must update automatically and display a success message.
    9.  The Projects tab must use the same authentication and layout as the existing Events tab.
    10. All project management functionality must be responsive and follow the existing admin portal design patterns.

#### **Story 4.3: Frontend Projects Page & Progress Bars (Revised)**
> As a visitor, I want to view a Projects page that displays all the center's initiatives with their progress and easily donate to them, so that I can understand the center's work and contribute to projects that resonate with me.
* **Acceptance Criteria:**
    1.  The public "Projects" page must be created at `/projects` route.
    2.  The page must fetch and display all active projects from the Projects API (Story 4.1).
    3.  Each project section must display: Project Name, Description, Photos (if available), Project Type, and Project Nature.
    4.  Each project must display a visual progress bar showing funding progress.
    5.  The progress bar must accurately represent `CurrentDonationAmount` vs. `DonationGoalAmount` with percentage calculation.
    6.  Raw donation numbers must be displayed (e.g., "LKR 250,000 raised of LKR 750,000 goal").
    7.  Each project must have a prominent "Donate Now" button.
    8.  The "Donate Now" button must link to `/contact?tab=donate&target=[donationLinkTarget]` where `donationLinkTarget` maps to the appropriate donation tab.
    9.  The page must be fully responsive across all device sizes.
    10. Projects must be grouped by `ProjectNature`: "Ongoing Projects" (Continuous) and "Special Initiatives" (One-time).

#### **Story 4.4: Donate Button Redirect Logic (Revised)**
> As a supporter, I want to be seamlessly redirected to the correct donation form when I click "Donate Now" on any project, so that I can immediately contribute to the specific project that inspired me.
* **Acceptance Criteria:**
    1.  Each project on the Projects page must have a "Donate Now" button (implemented in Story 4.3).
    2.  Clicking the button must redirect to `/contact?tab=donate&target=[donationLinkTarget]`.
    3.  The Contact page must detect URL parameters and automatically: Open the "Donate" section, Select the correct donation tab based on `target` parameter, and Scroll to the donation form for optimal UX.
    4.  URL parameter mapping must work as follows: `target=daily-dana` → "Daily Dana" tab, `target=poya-day` → "Poya Day Event" tab, `target=special-projects` → "Special Projects" tab.
    5.  If an invalid `target` parameter is provided, default to "Daily Dana" tab.
    6.  The redirect and auto-selection must work on all devices and browsers.
    7.  The donation form must include a subtle indicator showing which project inspired the donation (e.g., "Inspired by: [Project Name]").

### **Epic 5: Gen Alpha Academy Landing Page**

* **Goal:** To launch a comprehensive, single-page landing page for the Gen Alpha Academy that provides all necessary information and directs users to an external link for registration.

#### **Story 5.1: Gen Alpha Academy Landing Page Implementation (Final Version)**
> As a parent, I want a comprehensive landing page for the Gen Alpha Academy with all workshop details and clear links to an external registration page, so I can easily sign up.
* **Acceptance Criteria:**
    1.  The basic Gen Alpha Academy page from Epic 1 must be replaced with the full landing page.
    2.  The page must contain all sections and unabridged text from the Project Brief.
    3.  There must be at least two "Reserve Now" call-to-action buttons.
    4.  All "Reserve Now" buttons must link to a specified **external registration URL**.
    5.  The "Inquire via WhatsApp" button must link to the specified WhatsApp contact.
    6.  The page layout must be fully responsive.

---


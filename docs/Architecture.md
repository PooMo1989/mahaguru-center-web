# Fullstack Architecture Document: Mahaguru Center

**Date:** September 17, 2025
**Author:** Winston (Architect) & Project Stakeholder
**Version:** 2.0

## 1. High Level Architecture

#### **Technical Summary**
The architecture will be a full-stack, type-safe monorepo based on the T3 Stack. It will use **Next.js** for both the frontend and serverless API routes, **Prisma** for database access, and **Tailwind CSS** for styling. The entire application will be deployed and hosted on the **Vercel** platform, connected to a managed **PostgreSQL** database. This approach maximizes developer productivity and aligns with the project's goal of rapid, high-quality delivery.

#### **Platform and Infrastructure Choice**
* **Platform:** **Vercel**.
* **Database:** A managed **PostgreSQL** service (like Supabase or Neon).

#### **Repository Structure**
We will use a **Monorepo**.

#### **Architectural Patterns**
* **Jamstack**
* **Serverless**
* **Type-Safe API (tRPC)**

---

## 2. Tech Stack

| Category | Technology | Version |
| :--- | :--- | :--- |
| **Framework** | Next.js | 14+ |
| **Language** | TypeScript | 5+ |
| **Styling** | Tailwind CSS | 3+ |
| **API Style** | tRPC | 11+ |
| **Database ORM** | Prisma | 5+ |
| **Database** | PostgreSQL | 15+ |
| **Authentication** | NextAuth.js | 5+ |
| **UI Components** | Radix UI | Latest |
| **Testing** | Vitest | Latest |
| **Deployment** | Vercel | N/A |

---

## 3. Data Models
* **Event Model:** Stores information related to events.
* **Project Model:** Stores details for community projects, including fundraising goals.

---

## 4. Internationalization (i18n) Strategy
To support a future bilingual version of the site, we will use a standard i18n framework. All text will be stored in separate translation files (`en.json`, `si.json`), and the code will use placeholders.

---

## 5. API Specification
The API will be structured into tRPC routers:
* **Event Router:** Handles all operations for Events.
* **Project Router:** Handles all operations for Projects.
* **User Router:** Handles secure login for the admin portal.

---

## 6. System Components
The system is comprised of five primary components: Web Frontend, Backend API, Database, Authentication Service, and the Deployment Platform (Vercel).

graph TD
    subgraph "Browser"
        A[User]
    end
    subgraph "Vercel Platform"
        B[Web Frontend]
        C[Backend API]
        D[Authentication Service]
    end
    subgraph "Database Provider"
        E[PostgreSQL Database]
    end

    A --> B;
    B --> C;
    C --> D;
    C --> E;
    D --> E;

---

## 7. External Service Links
The application uses simple redirects to the following external services:
* **Booking System:** For 'Mahaguru Meetup' scheduling.
* **Registration System:** For 'Gen Alpha Academy' sign-ups.
* **WhatsApp:** For inquiries.

---

## 8. Core Workflows
Sequence diagrams will map critical tasks like Administrator Login and Creating a New Event, showing interactions between the frontend, backend API, and database.

---

## 9. Database Schema

-- Users Table for Admin Portal
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Events Table
CREATE TABLE "Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "eventDate" TIMESTAMP(3) NOT NULL,
    "photos" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Projects Table
CREATE TABLE "Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "photos" TEXT[],
    "donationGoalAmount" DECIMAL(65,30) NOT NULL,
    "currentDonationAmount" DECIMAL(65,30) NOT NULL,
    "projectType" TEXT NOT NULL,
    "projectNature" TEXT NOT NULL,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "donationLinkTarget" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

---

## 10. Source Tree

/
├── prisma/
├── public/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── trpc/
│   │   ├── (pages)/
│   │   ├── admin/
│   │   └── layout.tsx
│   ├── components/
│   ├── lib/
│   └── server/
│       └── api/
│           └── routers/
├── package.json
└── tsconfig.json

---

## 11. Infrastructure and Deployment
The project will use a Git-based CI/CD pipeline hosted on Vercel. Pushing to a feature branch creates a Preview Deployment, merging to `staging` updates the Staging Environment, and merging to `main` deploys to Production. Vercel provides instant rollbacks.

---

## 12. Error Handling Strategy
All backend errors will be logged automatically by the Vercel platform. The API will use a centralized error handler to catch errors and send generic, user-friendly messages to the frontend.

---

## 13. Coding Standards
* **Core:** TypeScript (Strict Mode), ESLint, Prettier.
* **Critical Rules:** Type safety is absolute, all data access must use the Prisma and tRPC layers, and environment variables must be handled securely.

---

## 14. Test Strategy and Standards
The strategy focuses on a pragmatic balance of unit and integration tests using Vitest, with a target of 80% code coverage for critical logic. A small number of End-to-End tests will be written with Playwright for key user flows.

---

## 15. Security
Mandatory security rules include protecting all admin routes with NextAuth.js, performing strict server-side validation on all user input, and managing all secret keys via Vercel environment variables.

---

## 16. Checklist Results Report
* **Final Decision:** The architecture is approved and ready for implementation.
# UI/UX Specification: Mahaguru Center

**Date:** September 10, 2025
**Author:** Sally (UX Expert) & Project Stakeholder
**Version:** 1.0

## 1. Overall UX Goals & Principles

The primary goal is to create a user experience that is serene, intuitive, and welcoming. The design should feel clean, uncluttered, and reflective of the center's mindful ethos.

* **Core Design Principle: Evoke Inspiration and Profundity.** Every element, from powerful imagery to evocative quotes and clean typography, should work together to create an atmosphere of deep insight and spiritual inspiration.

## 2. Information Architecture (IA)

#### **Site Map**

graph TD
    A[Homepage] --> B[Mahaguru]
    A --> C[Services]
    A --> D[Projects]
    A --> E[Events]
    A --> F[Contact Us]

    C --> G[Book a Meetup Page]
    C --> H[Gen Alpha Academy Page]

#### **Global Navigation Elements**
* A link to the "Contact Us" page will be included in the global footer, accessible from all pages.

---

## 3. User Flows

#### **User Flow: Donating to a Specific Project**
* **User Goal:** To be inspired by a project on the "Projects" page and easily make a financial contribution to it.

graph TD
    A[Start on Projects Page] --> B{Finds an inspiring project}
    B --> C[Clicks the Donate button]
    C --> D[Redirected to Contact Us Page]
    D --> E[The Donate tab is automatically active]
    E --> F[The correct project fund is selected]
    F --> G[User fills out the form and submits]
    G --> H[End: Success message is shown]

#### **User Flow: Volunteering**
* **User Goal:** To express interest in volunteering for the center and provide their contact details.

graph TD
    A[Start on any page, e.g., Events] --> B{User decides to volunteer}
    B --> C[Navigates to the Contact Us page]
    C --> D[Locates the Volunteer section]
    D --> E[Fills out the volunteer form]
    E --> F[Clicks Submit]
    F --> G[End: Success message is shown]


#### **User Flow: Booking a Mahaguru Meetup**
* **User Goal:** To understand the different private session options with Mahaguru and successfully book one.

graph TD
    A[Start on Services Page] --> B[Clicks on Mahaguru Meetup]
    B --> C[Lands on dedicated Book a Meetup Page]
    C --> D{Reads options and chooses a type, e.g., Online}
    D --> E[Clicks the Book Online Session button]
    E --> F[Redirected to external booking system]
    F --> G[End: Completes booking on external site]

---

## 4. Wireframes & Mockups (Text-Based)

#### **Homepage Layout**
1.  **Header / Navigation:** Logo on the left; Main navigation links on the right (`Mahaguru | Services | Projects | Events | Contact Us`).
2.  **Hero Section:** Full-width background image with a large, evocative quote and a single call-to-action button.
3.  **Introduction Section:** A short, welcoming paragraph about the center's mission.
4.  **Featured Pages Section:** A grid of four visual cards:
    * Card 1: About Mahaguru (Links to Mahaguru page)
    * Card 2: Our Services (Links to Services page)
    * Card 3: Monthly Dhamma Discussion (Links to Events page)
    * Card 4: Our Community Projects (Links to Projects page)
5.  **Footer:** Simple area with contact info, social links, and utility links.

#### **Services Page Layout**
* **Page Title:** Our Services
* **Structure:** A clean, vertical layout with a series of content blocks, one for each of the seven services.
* **Block Structure:** Each service block will contain a relevant image, the full unabridged description paragraph, and a call-to-action button/link.

---

## 5. Component Library / Design System

* **Decision:** The project will use a **Pre-built Component Library**. This provides a balance of development speed and the ability to customize for a unique feel.

---

## 6. Branding & Style Guide

#### **Color Palette**
* **Primary / Brand Color:** `#183F37` (Deep green for buttons, nav background, etc.)
* **Secondary Color:** `#236661` (Lighter teal/green for tags, icons, hover effects)
* **Background Color:** `#ebf4f5` (Very light, cool gray/blue for main page backgrounds)
* **Text (on Light Background):**
    * *Headings:* `#1A202C` (Strong, dark charcoal gray)
    * *Paragraphs:* `#4A5568` (Softer dark gray)
* **Text (on Dark Background):**
    * *Headings/Links:* `#FFFFFF` (Crisp white)
    * *Sub-text:* `#A0AEC0` (Light, cool gray)

#### **Typography**
* **Headings Font:** `Yaldevi` (Multilingual, supports English & Sinhala)
* **Paragraphs Font:** `Noto Sans Sinhala` (Multilingual, supports English & Sinhala)

---

## 7. Accessibility

* **Note:** Accessibility requirements were deferred by stakeholder request during the PRD phase.

---

## 8. Responsiveness

* **Requirement:** The website must be fully responsive, providing a seamless and high-quality experience on all major devices, including desktops, tablets, and mobile phones.
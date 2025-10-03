"use client";

import { useState, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Navigation, Footer } from "~/components/navigation";
import * as Tabs from "@radix-ui/react-tabs";

// Wrap existing ContactPage in Suspense (Next.js requirement)
export default function ContactPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContactPageContent />
    </Suspense>
  );
}

// Rename existing component and add URL parameter handling
function ContactPageContent() {
  const searchParams = useSearchParams();

  // Initialize main tab state based on URL parameters (AC#8 requirement)
  const [activeTab, setActiveTab] = useState(() => {
    const tab = searchParams.get("tab");
    if (tab === "donate") return "donation";
    if (tab === "participate") return "participate";
    return "contact";
  });

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Donation form state
  const [donationData, setDonationData] = useState({
    amount: "",
    fullName: "",
    email: "",
  });
  const [showDonationSuccess, setShowDonationSuccess] = useState(false);
  const [donationErrors, setDonationErrors] = useState<Record<string, string>>(
    {},
  );

  // Participation form state
  const [participationData, setParticipationData] = useState({
    fullName: "",
    email: "",
    event: "",
    message: "",
  });
  const [showParticipationSuccess, setShowParticipationSuccess] = useState(false);
  const [participationErrors, setParticipationErrors] = useState<Record<string, string>>(
    {},
  );

  // Initialize donation fund based on URL parameters (AC#8 requirement)
  const [activeDonationFund, setActiveDonationFund] = useState(() => {
    const target = searchParams.get("target");
    // Map exactly as corrected by QA review
    if (target === "daily-dana") return "daily-dana";
    if (target === "poya-day-event") return "poya-day-event";
    if (target === "special-projects") return "special-projects";
    return "daily-dana"; // default fallback
  });

  // Extract project name from URL parameters for project context indicator (AC#7)
  const projectName = searchParams.get("project");
  const contextMessage = projectName
    ? `Inspired by: ${decodeURIComponent(projectName)}`
    : "Inspired by your generosity";

  // Extract event name from URL parameters for participation form
  const eventName = searchParams.get("event");
  
  // Set event name when redirected from event page
  useEffect(() => {
    if (eventName) {
      setParticipationData(prev => ({
        ...prev,
        event: decodeURIComponent(eventName),
      }));
    }
  }, [eventName]);

  // Smooth scroll to donation form when redirected from project (AC#3)
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "donate") {
      // Small delay to ensure DOM is rendered
      setTimeout(() => {
        const donationSection = document.querySelector(
          "[data-donation-section]",
        );
        if (donationSection) {
          donationSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    }
  }, [searchParams]);

  const donationFunds = [
    {
      id: "daily-dana",
      title: "Daily Dana",
      content:
        "Your generosity helps keep our physical sanctuary, the Arahathmaga Spiritual Center, open and available to all. Contributions to this fund cover our essential monthly expenses, including staff salaries, utility bills, and daily dhana, ensuring our center remains a welcoming space for contemplation and learning.",
    },
    {
      id: "poya-day-event",
      title: "Poya Day Event",
      content:
        "Support our signature monthly Dhamma Discussion, a cornerstone event held on the full moon Poya day that draws over a hundred seekers. Your donation helps us facilitate this profound session with Mahaguru and continue offering it to our growing community.",
    },
    {
      id: "special-projects",
      title: "Special Projects",
      content:
        "Contribute to our visionary initiatives that extend the Dhamma in new ways. Your support for our special projects helps fund the development of the revolutionary 'AI Guru', the 'Beyond Words' sacred text translation, and our other innovative outreach programs.",
    },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateDonationForm = () => {
    const newErrors: Record<string, string> = {};

    if (!donationData.amount.trim()) {
      newErrors.amount = "Donation amount is required";
    } else if (
      isNaN(Number(donationData.amount)) ||
      Number(donationData.amount) <= 0
    ) {
      newErrors.amount = "Please enter a valid donation amount";
    }

    if (!donationData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!donationData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donationData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    setDonationErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setShowSuccess(true);
      setFormData({ fullName: "", email: "", message: "" });
      setErrors({});

      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    }
  };

  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateDonationForm()) {
      setShowDonationSuccess(true);
      setDonationData({ amount: "", fullName: "", email: "" });
      setDonationErrors({});

      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowDonationSuccess(false);
      }, 5000);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleDonationInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setDonationData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (donationErrors[name]) {
      setDonationErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateParticipationForm = () => {
    const newErrors: Record<string, string> = {};

    if (!participationData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!participationData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(participationData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!participationData.event.trim()) {
      newErrors.event = "Event name is required";
    }

    if (!participationData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setParticipationErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleParticipationSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateParticipationForm()) {
      setShowParticipationSuccess(true);
      setParticipationData({ fullName: "", email: "", event: "", message: "" });
      setParticipationErrors({});

      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowParticipationSuccess(false);
      }, 5000);
    }
  };

  const handleParticipationInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setParticipationData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (participationErrors[name]) {
      setParticipationErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <h1 className="mb-12 text-center text-4xl font-bold text-gray-800 md:text-5xl">
            Contact Us
          </h1>

          {/* Main Tab System */}
          <Tabs.Root
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <Tabs.List className="mb-8 flex flex-wrap justify-center gap-2 border-b border-gray-200 pb-4">
              <Tabs.Trigger
                value="contact"
                className="rounded-md border-2 border-transparent px-6 py-3 text-sm font-medium transition-colors duration-200 hover:bg-gray-50 data-[state=active]:border-blue-500 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
              >
                Volunteer
              </Tabs.Trigger>
              <Tabs.Trigger
                value="participate"
                className="rounded-md border-2 border-transparent px-6 py-3 text-sm font-medium transition-colors duration-200 hover:bg-gray-50 data-[state=active]:border-blue-500 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
              >
                Participate
              </Tabs.Trigger>
              <Tabs.Trigger
                value="donation"
                className="rounded-md border-2 border-transparent px-6 py-3 text-sm font-medium transition-colors duration-200 hover:bg-gray-50 data-[state=active]:border-blue-500 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
              >
                Donate
              </Tabs.Trigger>
            </Tabs.List>

            {/* Contact/Volunteer Tab Content */}
            <Tabs.Content value="contact">
              <section className="rounded-lg bg-white p-8 shadow-lg md:p-12">
                <h2 className="mb-6 text-3xl font-bold text-gray-800">
                  Volunteer
                </h2>
                <p className="mb-8 text-lg leading-relaxed text-gray-600">
                  Become a vital part of our mission by joining our core
                  volunteer team. We welcome your support in organizing events,
                  fundraising, and performing regular maintenance of the
                  Arahathmaga Center. This is a precious opportunity to
                  contribute to the community and deepen your own spiritual
                  practice.
                </p>

                {/* Success Message */}
                {showSuccess && (
                  <div className="mb-6 rounded-md border border-green-400 bg-green-100 p-4 text-green-700">
                    Thank you for your interest in volunteering! We have
                    received your message and will get back to you soon.
                  </div>
                )}

                {/* Volunteer Contact Form */}
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  {/* Full Name Field */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full rounded-md border px-4 py-3 shadow-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                        errors.fullName ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && (
                      <p role="alert" className="mt-1 text-sm text-red-600">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full rounded-md border px-4 py-3 shadow-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter your email address"
                    />
                    {errors.email && (
                      <p role="alert" className="mt-1 text-sm text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`resize-vertical w-full rounded-md border px-4 py-3 shadow-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                        errors.message ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Tell us how you'd like to help and any questions you have"
                    />
                    {errors.message && (
                      <p role="alert" className="mt-1 text-sm text-red-600">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      className="w-full rounded-md bg-blue-600 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </section>
            </Tabs.Content>

            {/* Participate Tab Content */}
            <Tabs.Content value="participate">
              <section className="rounded-lg bg-white p-8 shadow-lg md:p-12">
                <h2 className="mb-6 text-3xl font-bold text-gray-800">
                  Participate in Events
                </h2>
                <p className="mb-8 text-lg leading-relaxed text-gray-600">
                  Join us for our upcoming events and become part of our community.
                  Let us know which event you&apos;d like to participate in, and we&apos;ll
                  get in touch with you with all the details.
                </p>

                {/* Success Message */}
                {showParticipationSuccess && (
                  <div className="mb-6 rounded-md border border-green-400 bg-green-100 p-4 text-green-700">
                    Thank you for your interest! We have received your
                    participation request and will contact you soon with event
                    details.
                  </div>
                )}

                {/* Participation Form */}
                <form
                  onSubmit={handleParticipationSubmit}
                  className="space-y-6"
                  noValidate
                >
                  {/* Full Name Field */}
                  <div>
                    <label
                      htmlFor="participateFullName"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="participateFullName"
                      name="fullName"
                      value={participationData.fullName}
                      onChange={handleParticipationInputChange}
                      className={`w-full rounded-md border px-4 py-3 shadow-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                        participationErrors.fullName
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter your full name"
                    />
                    {participationErrors.fullName && (
                      <p role="alert" className="mt-1 text-sm text-red-600">
                        {participationErrors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="participateEmail"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="participateEmail"
                      name="email"
                      value={participationData.email}
                      onChange={handleParticipationInputChange}
                      className={`w-full rounded-md border px-4 py-3 shadow-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                        participationErrors.email
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter your email address"
                    />
                    {participationErrors.email && (
                      <p role="alert" className="mt-1 text-sm text-red-600">
                        {participationErrors.email}
                      </p>
                    )}
                  </div>

                  {/* Event Field */}
                  <div>
                    <label
                      htmlFor="participateEvent"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Event You Want to Participate *
                    </label>
                    <input
                      type="text"
                      id="participateEvent"
                      name="event"
                      value={participationData.event}
                      onChange={handleParticipationInputChange}
                      className={`w-full rounded-md border px-4 py-3 shadow-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                        participationErrors.event
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter the event name"
                    />
                    {participationErrors.event && (
                      <p role="alert" className="mt-1 text-sm text-red-600">
                        {participationErrors.event}
                      </p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div>
                    <label
                      htmlFor="participateMessage"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Message *
                    </label>
                    <textarea
                      id="participateMessage"
                      name="message"
                      rows={5}
                      value={participationData.message}
                      onChange={handleParticipationInputChange}
                      className={`resize-vertical w-full rounded-md border px-4 py-3 shadow-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                        participationErrors.message
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Tell us about your interest in this event and any questions you have"
                    />
                    {participationErrors.message && (
                      <p role="alert" className="mt-1 text-sm text-red-600">
                        {participationErrors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      className="w-full rounded-md bg-blue-600 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                    >
                      Submit Participation Request
                    </button>
                  </div>
                </form>
              </section>
            </Tabs.Content>

            {/* Donation Tab Content */}
            <Tabs.Content value="donation">
              <section
                className="rounded-lg bg-white p-8 shadow-lg md:p-12"
                data-donation-section
              >
                <h2 className="mb-6 text-3xl font-bold text-gray-800">
                  Donate
                </h2>

                {/* Project Context Indicator - Always show in donation section */}
                <div className="mb-6 rounded-r-md border-l-4 border-blue-400 bg-blue-50 p-3">
                  <p className="text-sm font-medium text-blue-700">
                    {contextMessage}
                  </p>
                </div>

                <Tabs.Root
                  value={activeDonationFund}
                  onValueChange={setActiveDonationFund}
                  className="w-full"
                >
                  <Tabs.List className="mb-8 flex flex-wrap gap-2 border-b border-gray-200 pb-4">
                    {donationFunds.map((fund) => (
                      <Tabs.Trigger
                        key={fund.id}
                        value={fund.id}
                        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 hover:bg-gray-50 hover:text-gray-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none data-[state=active]:border-blue-600 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                      >
                        {fund.title}
                      </Tabs.Trigger>
                    ))}
                  </Tabs.List>

                  {donationFunds.map((fund) => (
                    <Tabs.Content
                      key={fund.id}
                      value={fund.id}
                      className="focus:outline-none"
                    >
                      <div className="mb-8">
                        <p className="mb-8 text-lg leading-relaxed text-gray-600">
                          {fund.content}
                        </p>

                        {/* Success Message */}
                        {showDonationSuccess && (
                          <div className="mb-6 rounded-md border border-green-400 bg-green-100 p-4 text-green-700">
                            Thank you for your generous donation to {fund.title}
                            ! Your contribution will make a meaningful
                            difference in our community.
                          </div>
                        )}

                        {/* Donation Form */}
                        <form
                          onSubmit={handleDonationSubmit}
                          className="space-y-6"
                          noValidate
                        >
                          <div className="mb-4 text-sm text-gray-600">
                            <strong>Donating to:</strong> {fund.title}
                          </div>

                          {/* Donation Amount Field */}
                          <div>
                            <label
                              htmlFor="donationAmount"
                              className="mb-2 block text-sm font-medium text-gray-700"
                            >
                              Donation Amount * ($)
                            </label>
                            <input
                              type="number"
                              id="donationAmount"
                              name="amount"
                              value={donationData.amount}
                              onChange={handleDonationInputChange}
                              min="1"
                              step="0.01"
                              className={`w-full rounded-md border px-4 py-3 shadow-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                                donationErrors.amount
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                              placeholder="Enter donation amount"
                            />
                            {donationErrors.amount && (
                              <p
                                role="alert"
                                className="mt-1 text-sm text-red-600"
                              >
                                {donationErrors.amount}
                              </p>
                            )}
                          </div>

                          {/* Full Name Field */}
                          <div>
                            <label
                              htmlFor="donationFullName"
                              className="mb-2 block text-sm font-medium text-gray-700"
                            >
                              Full Name *
                            </label>
                            <input
                              type="text"
                              id="donationFullName"
                              name="fullName"
                              value={donationData.fullName}
                              onChange={handleDonationInputChange}
                              className={`w-full rounded-md border px-4 py-3 shadow-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                                donationErrors.fullName
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                              placeholder="Enter your full name"
                            />
                            {donationErrors.fullName && (
                              <p
                                role="alert"
                                className="mt-1 text-sm text-red-600"
                              >
                                {donationErrors.fullName}
                              </p>
                            )}
                          </div>

                          {/* Email Field */}
                          <div>
                            <label
                              htmlFor="donationEmail"
                              className="mb-2 block text-sm font-medium text-gray-700"
                            >
                              Email Address *
                            </label>
                            <input
                              type="email"
                              id="donationEmail"
                              name="email"
                              value={donationData.email}
                              onChange={handleDonationInputChange}
                              className={`w-full rounded-md border px-4 py-3 shadow-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                                donationErrors.email
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                              placeholder="Enter your email address"
                            />
                            {donationErrors.email && (
                              <p
                                role="alert"
                                className="mt-1 text-sm text-red-600"
                              >
                                {donationErrors.email}
                              </p>
                            )}
                          </div>

                          {/* Submit Button */}
                          <div>
                            <button
                              type="submit"
                              className="w-full rounded-md bg-green-600 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
                            >
                              Donate to {fund.title}
                            </button>
                          </div>
                        </form>
                      </div>
                    </Tabs.Content>
                  ))}
                </Tabs.Root>
              </section>
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </main>
      <Footer />
    </>
  );
}

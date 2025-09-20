"use client";

import { useState } from "react";
import { Navigation } from "~/components/navigation";
import * as Tabs from "@radix-ui/react-tabs";

export default function ContactPage() {
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
  const [donationErrors, setDonationErrors] = useState<Record<string, string>>({});
  const [activeDonationFund, setActiveDonationFund] = useState("daily-dana");

  const donationFunds = [
    {
      id: "daily-dana",
      title: "Daily Dana",
      content: "Your generosity helps keep our physical sanctuary, the Arahathmaga Spiritual Center, open and available to all. Contributions to this fund cover our essential monthly expenses, including staff salaries, utility bills, and daily dhana, ensuring our center remains a welcoming space for contemplation and learning."
    },
    {
      id: "poya-day-event",
      title: "Poya Day Event",
      content: "Support our signature monthly Dhamma Discussion, a cornerstone event held on the full moon Poya day that draws over a hundred seekers. Your donation helps us facilitate this profound session with Mahaguru and continue offering it to our growing community."
    },
    {
      id: "special-projects",
      title: "Special Projects",
      content: "Contribute to our visionary initiatives that extend the Dhamma in new ways. Your support for our special projects helps fund the development of the revolutionary 'AI Guru', the 'Beyond Words' sacred text translation, and our other innovative outreach programs."
    }
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
    } else if (isNaN(Number(donationData.amount)) || Number(donationData.amount) <= 0) {
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
    e: React.ChangeEvent<HTMLInputElement>
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

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-12 text-center">
            Contact Us
          </h1>

          {/* Volunteer Section */}
          <section className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Volunteer</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Become a vital part of our mission by joining our core volunteer team. 
              We welcome your support in organizing events, fundraising, and performing 
              regular maintenance of the Arahathmaga Center. This is a precious opportunity 
              to contribute to the community and deepen your own spiritual practice.
            </p>

            {/* Success Message */}
            {showSuccess && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
                Thank you for your interest in volunteering! We have received your message 
                and will get back to you soon.
              </div>
            )}

            {/* Volunteer Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Full Name Field */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.fullName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p role="alert" className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <p role="alert" className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Tell us how you'd like to help and any questions you have"
                />
                {errors.message && (
                  <p role="alert" className="mt-1 text-sm text-red-600">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  Submit
                </button>
              </div>
            </form>
          </section>

          {/* Donate Section */}
          <section className="bg-white rounded-lg shadow-lg p-8 md:p-12 mt-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Donate</h2>
            
            <Tabs.Root 
              value={activeDonationFund} 
              onValueChange={setActiveDonationFund}
              className="w-full"
            >
              <Tabs.List className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 pb-4">
                {donationFunds.map((fund) => (
                  <Tabs.Trigger
                    key={fund.id}
                    value={fund.id}
                    className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:border-blue-600 transition-colors duration-200"
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
                    <p className="text-lg text-gray-600 leading-relaxed mb-8">
                      {fund.content}
                    </p>

                    {/* Success Message */}
                    {showDonationSuccess && (
                      <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
                        Thank you for your generous donation to {fund.title}! 
                        Your contribution will make a meaningful difference in our community.
                      </div>
                    )}

                    {/* Donation Form */}
                    <form onSubmit={handleDonationSubmit} className="space-y-6" noValidate>
                      <div className="text-sm text-gray-600 mb-4">
                        <strong>Donating to:</strong> {fund.title}
                      </div>

                      {/* Donation Amount Field */}
                      <div>
                        <label
                          htmlFor="donationAmount"
                          className="block text-sm font-medium text-gray-700 mb-2"
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
                          className={`w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            donationErrors.amount ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="Enter donation amount"
                        />
                        {donationErrors.amount && (
                          <p role="alert" className="mt-1 text-sm text-red-600">{donationErrors.amount}</p>
                        )}
                      </div>

                      {/* Full Name Field */}
                      <div>
                        <label
                          htmlFor="donationFullName"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="donationFullName"
                          name="fullName"
                          value={donationData.fullName}
                          onChange={handleDonationInputChange}
                          className={`w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            donationErrors.fullName ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="Enter your full name"
                        />
                        {donationErrors.fullName && (
                          <p role="alert" className="mt-1 text-sm text-red-600">{donationErrors.fullName}</p>
                        )}
                      </div>

                      {/* Email Field */}
                      <div>
                        <label
                          htmlFor="donationEmail"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="donationEmail"
                          name="email"
                          value={donationData.email}
                          onChange={handleDonationInputChange}
                          className={`w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            donationErrors.email ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="Enter your email address"
                        />
                        {donationErrors.email && (
                          <p role="alert" className="mt-1 text-sm text-red-600">{donationErrors.email}</p>
                        )}
                      </div>

                      {/* Submit Button */}
                      <div>
                        <button
                          type="submit"
                          className="w-full bg-green-600 text-white py-3 px-6 rounded-md font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
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
        </div>
      </main>
    </>
  );
}
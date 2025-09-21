import { Navigation } from "~/components/navigation";

export default function GenAlphaAcademyPage() {
  // Placeholder URLs - to be configured with actual external links
  const REGISTRATION_URL = "#"; // Replace with actual external registration URL
  const WHATSAPP_URL = "https://wa.me/94777100490?text=I%20would%20like%20to%20inquire%20about%20Gen%20Alpha%20Academy%20Workshop%2001";
  const MISSION_URL = "#"; // Replace with actual mission link

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
        {/* Section 1: Header */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Gen Alpha Academy
            </h1>
            <h2 className="text-2xl md:text-3xl text-gray-600 mb-8">
              Cultivating Leaders & Wise Minds for the 21st Century
            </h2>
            <a
              href={REGISTRATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Reserve Now
            </a>
          </div>
        </section>

        {/* Section 2: Workshop Introduction (Left/Right Split Layout) */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-800 mb-6">
                  Fundamentals for Lifelong Transformation
                </h3>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-800 mb-4">
                  Dear Parents and Young Adults,
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  We&apos;re excited to welcome you to something truly special: Gen Alpha Academy workshop 01. 
                  This isn&apos;t your typical workshop. It&apos;s a transformative 5-hour experience filled with energy, 
                  meaningful insights, and practical life tools designed specifically for today&apos;s generation. 
                  Whether you&apos;re exploring who you are, discovering what truly matters to you, or learning how 
                  to face the world with genuine confidence, this program is thoughtfully designed to help you see 
                  your future more clearly and step into it with real purpose.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Four Pillars of Transformation (2x2 Grid Layout) */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 text-center mb-8">
              What makes the program special
            </h3>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              This is the stepping stone to a comprehensive life-preparation journey focused on empowering youth 
              with essential skills for the future. These are the four pillars for transformation.
            </p>
            
            {/* Pillars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <h4 className="text-xl font-bold text-gray-800 mb-4">Self-Realization</h4>
                <p className="text-gray-600">
                  Discover your true self and life purpose. Cultivate personal insight and awareness.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <h4 className="text-xl font-bold text-gray-800 mb-4">Maturity through wisdom</h4>
                <p className="text-gray-600">
                  Sharpen decision-making skills. Apply practical wisdom to daily life.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <h4 className="text-xl font-bold text-gray-800 mb-4">Leadership Training</h4>
                <p className="text-gray-600">
                  Become a role model at home, school, and beyond. Learn to lead and inspire others.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <h4 className="text-xl font-bold text-gray-800 mb-4">Emotional Management</h4>
                <p className="text-gray-600">
                  Understand and regulate your emotions. Build resilience and emotional well-being.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Program Details & Inclusions (Left/Right Split Layout) */}
        <section className="py-12 px-4 bg-blue-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  � Program Details
                </h3>
                <div className="space-y-3 text-gray-700">
                  <p><strong>📅 Date:</strong> August 22nd (Sunday – During School Holidays)</p>
                  <p><strong>⏰ Duration:</strong> 5 Hours</p>
                  <p><strong>🎯 Age Group:</strong> 15–22 Years</p>
                  <p><strong>👥 Capacity:</strong> Limited to 15 Participants Only</p>
                  <p><strong>🗣️ Medium:</strong> Sinhala</p>
                </div>
                <p className="text-gray-700 mt-6 font-medium">
                  Organized by the Mahaguru Center Australia — our very first program in Sri Lanka!
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  � What&apos;s Included?
                </h3>
                <div className="space-y-3 text-gray-700">
                  <p>✓ Comprehensive training materials and handouts</p>
                  <p>✓ Meals for the day</p>
                  <p>✓ Access to follow-up sessions monthly</p>
                  <p>✓ Access to recorded sessions</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Investment & Mission (Left/Right Split Layout) */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Investment in Your Future
                </h3>
                <p className="text-lg font-semibold text-gray-800 mb-4">
                  Program Contribution: LKR 5,000 per participant
                </p>
                <p className="text-gray-700 mb-6">
                  This fee supports high-quality delivery and meaningful engagement. We believe true value is 
                  appreciated when there&apos;s commitment.
                </p>
                <p className="text-sm text-gray-600 italic">
                  *If you are unable to make the payment we can allocate a slot for you free of charge. 
                  Please contact +94777100490
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  What happens to your contribution
                </h3>
                <p className="text-gray-700 mb-6">
                  Your payment is an offering that directly supports the sustainability and growth of the Mahaguru 
                  Center&apos;s activities. It enables us to maintain our physical space, expand our digital resources, 
                  and continue offering guidance to the wider community, ensuring this work remains accessible to all 
                  who seek it.
                </p>
                <a
                  href={MISSION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Learn More About Our Mission →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Why This Program Matters */}
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-gray-700 leading-relaxed">
              In today&apos;s world, young people need skills that support long-term success, leadership abilities 
              to create impact, emotional maturity to handle challenges, and wisdom to guide themselves and others. 
              This program is designed to plant seeds of awareness, leadership, and compassion in every participant.
            </p>
          </div>
        </section>

        {/* Section 7: Final Call to Action */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">
              📝 Register Now – Limited Seats!
            </h3>
            <p className="text-lg text-gray-700 mb-8">
              To ensure deep, personal learning, we are accepting only 15 participants.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Inquire via WhatsApp
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
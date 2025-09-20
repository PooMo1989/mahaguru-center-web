import { Navigation } from "~/components/navigation";
import Link from "next/link";

export default function MahaguruMeetupPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
              Book a Mahaguru Meetup
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-12 max-w-3xl mx-auto">
              Connect directly with Mahaguru for profound guidance and clarity on life&apos;s most pressing matters.
            </p>
          </div>
        </section>

        {/* Content Sections */}
        <section className="pb-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-8 md:gap-12">
              
              {/* Section 1: About Mahaguru */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden" data-testid="section-about-mahaguru">
                <div className="p-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">About Mahaguru</h2>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    A rare human being who has walked a unique spiritual path for over 20 years. He has experienced the science of life and the technology of perfect living in its entirety, with a vision to answer humanity&apos;s most pressing issues with honesty and purity, guiding others toward mental wellbeing and self-actualization.
                  </p>
                </div>
              </div>

              {/* Section 2: What is a Mahaguru Meetup */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden" data-testid="section-what-is-meetup">
                <div className="p-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Moment of Absolute Clarity</h2>
                  <h3 className="text-xl font-semibold text-gray-700 mb-6">What is a Mahaguru Meetup?</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    In a world of endless noise, a Mahaguru Meetup is a space of profound stillness and insight. It is a dedicated, private session designed to help you navigate life&apos;s critical junctures. Whether you face a pivotal career decision, a personal crossroads, or a creative block, Mahaguru provides direct, compassionate guidance to dissolve confusion, illuminate your true purpose, and empower you to take the next step with confidence.
                  </p>
                </div>
              </div>

              {/* Section 3: Booking Options */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden" data-testid="section-booking-options">
                <div className="p-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-8">Booking Options</h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* In-Person Option */}
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">MeetUp In-person</h3>
                      <p className="text-2xl font-bold text-blue-600 mb-6">LKR 5,000 ~ 18 USD</p>
                      <Link 
                        href="#" 
                        className="inline-block w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
                        data-testid="cta-book-in-person"
                      >
                        Book In-Person Session
                      </Link>
                    </div>
                    {/* Online Option */}
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">Meetup Online</h3>
                      <p className="text-2xl font-bold text-blue-600 mb-6">35 USD</p>
                      <Link 
                        href="#" 
                        className="inline-block w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
                        data-testid="cta-book-online"
                      >
                        Book Online Session
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 4: Group & Team Sessions */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden" data-testid="section-group-team-sessions">
                <div className="p-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-8">Group & Team Sessions</h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Corporate */}
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">Corporate</h3>
                      <p className="text-gray-600 mb-6">
                        Enhance team dynamics and achieve higher levels of organizational success with insights into the deeper nature of the human psyche.
                      </p>
                      <Link 
                        href="#" 
                        className="inline-block w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
                        data-testid="cta-inquire-team"
                      >
                        Inquire for Your Team
                      </Link>
                    </div>
                    {/* Education */}
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">Education</h3>
                      <p className="text-gray-600 mb-6">
                        Specialized programs for educational institutions to foster mindfulness and conscious leadership among students and faculty.
                      </p>
                      <Link 
                        href="#" 
                        className="inline-block w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
                        data-testid="cta-inquire-group"
                      >
                        Inquire for Your Group
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 5: Our Mission (Contribution) */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden" data-testid="section-our-mission">
                <div className="p-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission (Contribution)</h2>
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">What happens to your contribution</h3>
                  <p className="text-gray-600 leading-relaxed text-lg mb-6">
                    Your payment is an offering that directly supports the sustainability and growth of the Mahaguru Center&apos;s activities. It enables us to maintain our physical space, expand our digital resources, and continue offering guidance to the wider community, ensuring this work remains accessible to all who seek it. This approach aligns with our model of using paid programs to cover costs and fund our mission.
                  </p>
                  <Link 
                    href="#" 
                    className="inline-block bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                    data-testid="cta-learn-more-mission"
                  >
                    Learn More About Our Mission
                  </Link>
                </div>
              </div>

              {/* Section 6: Free Alternative */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden" data-testid="section-free-alternative">
                <div className="p-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">Experience the Dialogue</h2>
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">Free Alternative</h3>
                  <p className="text-gray-600 leading-relaxed text-lg mb-6">
                    Not sure where to begin? Join our weekly recorded group consultation, free of charge, to see the process in action. You can choose to remain off-camera. If sessions are full, you will be added to our waitlist.
                  </p>
                  <Link 
                    href="#" 
                    className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                    data-testid="cta-register-free"
                  >
                    Register for Free Session
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
    </>
  );
}
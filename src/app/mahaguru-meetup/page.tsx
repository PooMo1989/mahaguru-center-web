import { Navigation, Footer } from "~/components/navigation";
import Link from "next/link";

export default function MahaguruMeetupPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
        {/* Hero Section */}
        <section className="px-4 py-16">
          <div className="mx-auto max-w-6xl text-center">
            <h1 className="mb-8 text-4xl font-bold text-gray-800 md:text-5xl">
              Book a Mahaguru Meetup
            </h1>
            <p className="mx-auto mb-12 max-w-3xl text-lg leading-relaxed text-gray-600">
              Connect directly with Mahaguru for profound guidance and clarity
              on life&apos;s most pressing matters.
            </p>
          </div>
        </section>

        {/* Content Sections */}
        <section className="px-4 pb-16">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 md:gap-12">
              {/* Section 1: About Mahaguru */}
              <div
                className="overflow-hidden rounded-lg bg-white shadow-lg"
                data-testid="section-about-mahaguru"
              >
                <div className="p-8">
                  <h2 className="mb-6 text-3xl font-bold text-gray-800">
                    About Mahaguru
                  </h2>
                  <p className="text-lg leading-relaxed text-gray-600">
                    A rare human being who has walked a unique spiritual path
                    for over 20 years. He has experienced the science of life
                    and the technology of perfect living in its entirety, with a
                    vision to answer humanity&apos;s most pressing issues with
                    honesty and purity, guiding others toward mental wellbeing
                    and self-actualization.
                  </p>
                </div>
              </div>

              {/* Section 2: What is a Mahaguru Meetup */}
              <div
                className="overflow-hidden rounded-lg bg-white shadow-lg"
                data-testid="section-what-is-meetup"
              >
                <div className="p-8">
                  <h2 className="mb-4 text-3xl font-bold text-gray-800">
                    Your Moment of Absolute Clarity
                  </h2>
                  <h3 className="mb-6 text-xl font-semibold text-gray-700">
                    What is a Mahaguru Meetup?
                  </h3>
                  <p className="text-lg leading-relaxed text-gray-600">
                    In a world of endless noise, a Mahaguru Meetup is a space of
                    profound stillness and insight. It is a dedicated, private
                    session designed to help you navigate life&apos;s critical
                    junctures. Whether you face a pivotal career decision, a
                    personal crossroads, or a creative block, Mahaguru provides
                    direct, compassionate guidance to dissolve confusion,
                    illuminate your true purpose, and empower you to take the
                    next step with confidence.
                  </p>
                </div>
              </div>

              {/* Section 3: Booking Options */}
              <div
                className="overflow-hidden rounded-lg bg-white shadow-lg"
                data-testid="section-booking-options"
              >
                <div className="p-8">
                  <h2 className="mb-8 text-3xl font-bold text-gray-800">
                    Booking Options
                  </h2>
                  <div className="grid gap-8 md:grid-cols-2">
                    {/* In-Person Option */}
                    <div className="rounded-lg border border-gray-200 p-6">
                      <h3 className="mb-4 text-xl font-semibold text-gray-800">
                        MeetUp In-person
                      </h3>
                      <p className="mb-6 text-2xl font-bold text-blue-600">
                        LKR 5,000 ~ 18 USD
                      </p>
                      <Link
                        href="#"
                        className="inline-block w-full rounded-lg bg-blue-600 px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-blue-700"
                        data-testid="cta-book-in-person"
                      >
                        Book In-Person Session
                      </Link>
                    </div>
                    {/* Online Option */}
                    <div className="rounded-lg border border-gray-200 p-6">
                      <h3 className="mb-4 text-xl font-semibold text-gray-800">
                        Meetup Online
                      </h3>
                      <p className="mb-6 text-2xl font-bold text-blue-600">
                        35 USD
                      </p>
                      <Link
                        href="#"
                        className="inline-block w-full rounded-lg bg-blue-600 px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-blue-700"
                        data-testid="cta-book-online"
                      >
                        Book Online Session
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 4: Group & Team Sessions */}
              <div
                className="overflow-hidden rounded-lg bg-white shadow-lg"
                data-testid="section-group-team-sessions"
              >
                <div className="p-8">
                  <h2 className="mb-8 text-3xl font-bold text-gray-800">
                    Group & Team Sessions
                  </h2>
                  <div className="grid gap-8 md:grid-cols-2">
                    {/* Corporate */}
                    <div className="rounded-lg border border-gray-200 p-6">
                      <h3 className="mb-4 text-xl font-semibold text-gray-800">
                        Corporate
                      </h3>
                      <p className="mb-6 text-gray-600">
                        Enhance team dynamics and achieve higher levels of
                        organizational success with insights into the deeper
                        nature of the human psyche.
                      </p>
                      <Link
                        href="#"
                        className="inline-block w-full rounded-lg bg-blue-600 px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-blue-700"
                        data-testid="cta-inquire-team"
                      >
                        Inquire for Your Team
                      </Link>
                    </div>
                    {/* Education */}
                    <div className="rounded-lg border border-gray-200 p-6">
                      <h3 className="mb-4 text-xl font-semibold text-gray-800">
                        Education
                      </h3>
                      <p className="mb-6 text-gray-600">
                        Specialized programs for educational institutions to
                        foster mindfulness and conscious leadership among
                        students and faculty.
                      </p>
                      <Link
                        href="#"
                        className="inline-block w-full rounded-lg bg-blue-600 px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-blue-700"
                        data-testid="cta-inquire-group"
                      >
                        Inquire for Your Group
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 5: Our Mission (Contribution) */}
              <div
                className="overflow-hidden rounded-lg bg-white shadow-lg"
                data-testid="section-our-mission"
              >
                <div className="p-8">
                  <h2 className="mb-6 text-3xl font-bold text-gray-800">
                    Our Mission (Contribution)
                  </h2>
                  <h3 className="mb-4 text-xl font-semibold text-gray-700">
                    What happens to your contribution
                  </h3>
                  <p className="mb-6 text-lg leading-relaxed text-gray-600">
                    Your payment is an offering that directly supports the
                    sustainability and growth of the Mahaguru Center&apos;s
                    activities. It enables us to maintain our physical space,
                    expand our digital resources, and continue offering guidance
                    to the wider community, ensuring this work remains
                    accessible to all who seek it. This approach aligns with our
                    model of using paid programs to cover costs and fund our
                    mission.
                  </p>
                  <Link
                    href="#"
                    className="inline-block rounded-lg bg-gray-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-gray-700"
                    data-testid="cta-learn-more-mission"
                  >
                    Learn More About Our Mission
                  </Link>
                </div>
              </div>

              {/* Section 6: Free Alternative */}
              <div
                className="overflow-hidden rounded-lg bg-white shadow-lg"
                data-testid="section-free-alternative"
              >
                <div className="p-8">
                  <h2 className="mb-6 text-3xl font-bold text-gray-800">
                    Experience the Dialogue
                  </h2>
                  <h3 className="mb-4 text-xl font-semibold text-gray-700">
                    Free Alternative
                  </h3>
                  <p className="mb-6 text-lg leading-relaxed text-gray-600">
                    Not sure where to begin? Join our weekly recorded group
                    consultation, free of charge, to see the process in action.
                    You can choose to remain off-camera. If sessions are full,
                    you will be added to our waitlist.
                  </p>
                  <Link
                    href="#"
                    className="inline-block rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-700"
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
      <Footer />
    </>
  );
}

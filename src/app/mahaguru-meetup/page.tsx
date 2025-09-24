import { Navigation, Footer } from "~/components/navigation";
import Link from "next/link";

export default function MahaguruMeetupPage() {
  return (
    <>
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="flex h-[90vh] items-center justify-center bg-cover bg-center text-white" 
                 style={{backgroundImage: "url('/heroImage.webp')"}}>
          <div className="text-center max-w-3xl px-6 bg-black/40 rounded-lg p-8">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
              The Nudge You&apos;ve Been Waiting For
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8">
              The answers to your greatest questions lie within. The Mahaguru Meetup is the catalyst 
              that awakens your inner guide. It&apos;s the single step that allows you to see beyond the horizon.
            </p>
            <a href="#clarity-paths" 
               className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105">
              Book Your Session
            </a>
          </div>
        </section>

        {/* About Mahaguru Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center max-w-6xl">
            <div className="text-center md:text-left">
              <img 
                src="https://i.ibb.co/rKT0446k/Untitled-design-5.png" 
                alt="Mahaguru, a spiritual guide, offering consultation at the Mahaguru Center in Sri Lanka." 
                className="rounded-lg mx-auto md:mx-0 max-w-xs md:max-w-sm w-full md:shadow-xl"
              />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
                About Mahaguru
              </h2>
              <p className="text-gray-600 leading-relaxed text-justify">
                A rare human being who has walked a unique spiritual path for over 20 years. 
                He has experienced the science of life and the technology of perfect living in its entirety, 
                with a vision to answer humanity&apos;s most pressing issues with honesty and purity, 
                guiding others toward mental wellbeing and self-actualization.
              </p>
            </div>
          </div>
        </section>

        {/* What is a Mahaguru Meetup Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                What is a Mahaguru Meetup?
              </h2>
              <p className="text-xl text-gray-600 font-light mb-6">
                Your Moment of Absolute Clarity
              </p>
              <p className="text-gray-600 leading-relaxed">
                In a world of endless noise, a Mahaguru Meetup is a space of profound stillness and insight. 
                It is a dedicated, private session designed to help you navigate life&apos;s critical junctures. 
                Whether you face a pivotal career decision, a personal crossroads, or a creative block, 
                Mahaguru provides direct, compassionate guidance to dissolve confusion, illuminate your true purpose, 
                and empower you to take the next step with confidence.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {/* Flip Cards */}
              <div className="flip-card aspect-square">
                <div className="flip-card-inner">
                  <div className="flip-card-front bg-green-600 text-white">
                    <svg className="w-8 h-8 md:w-12 md:h-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    <h4 className="font-semibold text-sm md:text-lg">Meetup Online</h4>
                  </div>
                  <div className="flip-card-back bg-green-600 text-white">
                    <p className="font-semibold text-sm md:text-lg">For people living abroad</p>
                  </div>
                </div>
              </div>
              <div className="flip-card aspect-square">
                <div className="flip-card-inner">
                  <div className="flip-card-front bg-green-700 text-white">
                    <svg className="w-8 h-8 md:w-12 md:h-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 919.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <h4 className="font-semibold text-sm md:text-lg">Meetup in person</h4>
                  </div>
                  <div className="flip-card-back bg-green-700 text-white">
                    <p className="font-semibold text-sm md:text-lg">For people residing in Sri Lanka</p>
                  </div>
                </div>
              </div>
              <div className="flip-card aspect-square">
                <div className="flip-card-inner">
                  <div className="flip-card-front bg-blue-600 text-white">
                    <svg className="w-8 h-8 md:w-12 md:h-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 00-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 010 7.75"></path>
                    </svg>
                    <h4 className="font-semibold text-sm md:text-lg">Corporate</h4>
                  </div>
                  <div className="flip-card-back bg-blue-600 text-white">
                    <p className="font-semibold text-sm md:text-lg">For Corporate teams</p>
                  </div>
                </div>
              </div>
              <div className="flip-card aspect-square">
                <div className="flip-card-inner">
                  <div className="flip-card-front bg-blue-700 text-white">
                    <svg className="w-8 h-8 md:w-12 md:h-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z"></path>
                    </svg>
                    <h4 className="font-semibold text-sm md:text-lg">Education</h4>
                  </div>
                  <div className="flip-card-back bg-blue-700 text-white">
                    <p className="font-semibold text-sm md:text-lg">For the student groups</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Choose Your Path to Clarity - Booking Section */}
        <section id="clarity-paths" className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Book a session
              </h2>
              <p className="text-gray-600">
                Select the format that fits your need. Your appointment can be scheduled by clicking one of the options below.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  MeetUp In-person
                </h3>
                <p className="text-gray-600 mb-4 flex-grow">
                  A private, one-on-one dialogue at the Mahaguru Center. This session is an opportunity to explore 
                  the landscape of your life, identify your deepest challenges, and chart a clear path toward your 
                  goals directly with Mahaguru&apos;s guidance.
                </p>
                <p className="font-bold text-lg text-gray-800 my-4">
                  Contribution: LKR 5,000 ~ 18 USD
                </p>
                <Link 
                  href="./book-in-person.html" 
                  className="mt-auto w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg">
                  Book In-Person Session
                </Link>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Meetup Online
                </h3>
                <p className="text-gray-600 mb-4 flex-grow">
                  The same profound, personalized guidance, accessible from anywhere in the world. 
                  Connect with Mahaguru via a private video call to gain the insight and perspective you need to move forward.
                </p>
                <p className="font-bold text-lg text-gray-800 my-4">
                  Contribution: 35 USD
                </p>
                <Link 
                  href="./book-online.html" 
                  className="mt-auto w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg">
                  Book Online Session
                </Link>
              </div>
            </div>

            {/* What happens to your contribution */}
            <div className="max-w-3xl mx-auto mt-12 p-6 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg text-center">
              <h4 className="font-bold text-lg text-gray-900 mb-2">
                What happens to your contribution
              </h4>
              <p className="text-gray-700 text-sm">
                Your payment is an offering that directly supports the sustainability and growth of the Mahaguru Center&apos;s activities. 
                It enables us to maintain our physical space, expand our digital resources, and continue offering guidance to the wider community, 
                ensuring this work remains accessible to all who seek it. This approach aligns with our model of using paid programs to cover costs and fund our mission.
              </p>
              <Link 
                href="./what-we-do.html" 
                className="inline-block mt-4 text-blue-600 font-semibold border border-blue-600 rounded-full px-6 py-2 text-sm hover:bg-blue-600 hover:text-white transition-colors">
                Learn More About Our Mission →
              </Link>
            </div>

            {/* Corporate and Education */}
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12">
              <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Corporate
                </h3>
                <p className="text-gray-600 mb-4 flex-grow">
                  An exclusive session for corporate teams and leaders. Align your team&apos;s energy, foster deeper collaboration, 
                  and unlock collective potential by gaining shared clarity on a common vision and purpose.
                </p>
                <a 
                  href="https://wa.me/94777100490?text=Hello,%20I%27m%20interested%20in%20booking%20a%20Corporate%20session%20for%20my%20team." 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="mt-auto w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg">
                  Inquire for Your Team
                </a>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Education
                </h3>
                <p className="text-gray-600 mb-4 flex-grow">
                  Designed for student groups, sports teams, or any collective aspiring to greatness. 
                  This is a powerful motivational and strategic session to ignite passion, build resilience, and sharpen focus on achieving extraordinary goals.
                </p>
                <a 
                  href="https://wa.me/94777100490?text=Hello,%20I%27m%20interested%20in%20booking%20an%20Education%20session%20for%20my%20group." 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="mt-auto w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg">
                  Inquire for Your Group
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Experience the Dialogue - Video Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6 text-center max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Experience the Dialogue
            </h2>
            
            {/* Mobile: Single video */}
            <div className="md:hidden aspect-video rounded-lg overflow-hidden shadow-xl mb-8">
              <iframe 
                className="w-full h-full" 
                src="https://www.youtube.com/embed/l3zSgmQKwsc" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen>
              </iframe>
            </div>

            {/* Desktop: 2x2 grid */}
            <div className="hidden md:grid grid-cols-2 gap-6 mb-8">
              <div className="aspect-video rounded-lg overflow-hidden shadow-xl">
                <iframe 
                  className="w-full h-full" 
                  src="https://www.youtube.com/embed/l3zSgmQKwsc" 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen>
                </iframe>
              </div>
              <div className="aspect-video rounded-lg overflow-hidden shadow-xl">
                <iframe 
                  className="w-full h-full" 
                  src="https://www.youtube.com/embed/t5qCX56UJFQ" 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen>
                </iframe>
              </div>
              <div className="aspect-video rounded-lg overflow-hidden shadow-xl">
                <iframe 
                  className="w-full h-full" 
                  src="https://www.youtube.com/embed/k4SvTvGms1I" 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen>
                </iframe>
              </div>
              <div className="aspect-video rounded-lg overflow-hidden shadow-xl">
                <iframe 
                  className="w-full h-full" 
                  src="https://www.youtube.com/embed/A1S2zAx5vuw" 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen>
                </iframe>
              </div>
            </div>

            <p className="text-gray-600 mb-8">
              Not sure where to begin? Join our weekly recorded group consultation, free of charge, to see the process in action. 
              You can choose to remain off-camera. If sessions are full, you will be added to our waitlist.
            </p>
            <a 
              href="https://wa.me/94777100490?text=Hello%20I%20like%20to%20sit%20for%20a%20free%20session.%20Let%20me%20know%20the%20details" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg">
              Register for Free Session
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
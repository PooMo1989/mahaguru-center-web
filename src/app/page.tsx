import { Navigation, Footer } from "~/components/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {/* Hero Section with Background Image */}
        <section className="relative h-screen flex items-center justify-center">
          <div className="absolute inset-0">
            <Image
              src="/heroImage2.webp"
              alt="Mahaguru Center"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Welcome to Mahaguru Center
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 italic">
              &ldquo;The mind is everything. What you think you become.&rdquo;
            </p>
            <Link href="/services">
              <button className="bg-[#183F37] hover:bg-[#152F2E] text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg hover:shadow-xl">
                Explore Our Offerings
              </button>
            </Link>
          </div>
        </section>

        {/* Section 1: About Mahaguru - Image Right, Content Left */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-slate-100">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
                    About Mahaguru
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    A rare human being who has walked a unique spiritual path for over 20 years.
                    Learn about our spiritual teacher and the wisdom that guides our center.
                  </p>
                </div>
                <Link href="/mahaguru">
                  <button className="bg-[#183F37] hover:bg-[#152F2E] text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
                    Witness
                  </button>
                </Link>
              </div>
              <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden">
                <Image
                  src="/Untitled design (1).jpg"
                  alt="Mahaguru"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Our Services - Image Above, Content Below */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
                <Image
                  src="/Screenshot 2025-08-20 185255.jpg"
                  alt="Our Services"
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Our Services
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto mb-8">
                From Dhamma Talks to Individual meetups we have a wide range of offering to fit anyones spiritual and life needs. 
                We run Arahathmaga Center as our physical sanctuary and Maithribodhi Archive as the treasure trove of Dhamma.
              </p>
              <Link href="/services">
                <button className="bg-[#183F37] hover:bg-[#152F2E] text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
                  Explore
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Section 3: Monthly Dhamma Discussion - Content Left, Image Right */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-slate-100">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 lg:order-1">
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
                    Monthly Dhamma Discussion
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    We had been continuously conducting Monthly Dhamma Discussion on poya day for years now. 
                    However it is only one of the events that we offer to our community. Attend one of our events 
                    and witness the difference for yourself.
                  </p>
                </div>
                <Link href="/events">
                  <button className="bg-[#183F37] hover:bg-[#152F2E] text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
                    View Events
                  </button>
                </Link>
              </div>
              <div className="relative h-96 lg:h-[400px] rounded-2xl overflow-hidden lg:order-2">
                <Image
                  src="/Screenshot 2025-07-29 161148.jpg"
                  alt="Monthly Dhamma Discussion"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Our Projects - Split Layout with Multiple Images */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Our Projects
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
                We have several ongoing physical and digital projects. From frequent publications to running and 
                developing physical spiritual center our projects ranges and scale and impact.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="relative h-80 rounded-2xl overflow-hidden">
                <Image
                  src="/Screenshot 2025-08-20 223553.jpg"
                  alt="Project 1"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-80 rounded-2xl overflow-hidden">
                <Image
                  src="/490061273_1097783239058409_8966922447246500945_n.jpg"
                  alt="Project 2"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            <div className="text-center">
              <Link href="/projects">
                <button className="bg-[#183F37] hover:bg-[#152F2E] text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
                  See Projects
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

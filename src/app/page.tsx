import { Navigation, Footer } from "~/components/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {/* Hero Section with Background Image */}
        <section className="relative flex h-screen items-center justify-center">
          <div className="absolute inset-0">
              <Image
                src="/hero-home-hands.webp"
                alt="Mahaguru Center Hero"
                fill
                className="object-cover"
                priority
              />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
            <h1 className="mb-6 text-5xl leading-tight font-bold text-white md:text-6xl">
              Welcome to Mahaguru Center
            </h1>
            <p className="mb-8 text-xl text-white/90 italic md:text-2xl">
              &ldquo;The mind is everything. What you think you become.&rdquo;
            </p>
            <Link href="/services">
              <button className="rounded-full bg-[#E85D5D] px-8 py-4 text-lg font-semibold text-white shadow-lg transition-colors hover:bg-[#D64C4C] hover:shadow-xl">
                Explore Our Offerings
              </button>
            </Link>
          </div>
        </section>

        {/* Section 1: About Mahaguru - Image Right, Content Left */}
        <section className="bg-[#FCE8D9] py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-4xl font-bold text-[#301020] md:text-5xl">
                    About Mahaguru
                  </h2>
                  <p className="text-lg leading-relaxed text-[#301020]">
                    A rare human being who has walked a unique spiritual path
                    for over 20 years. Learn about our spiritual teacher and the
                    wisdom that guides our center.
                  </p>
                </div>
                <Link href="/mahaguru">
                  <button className="rounded-full bg-[#E85D5D] px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-[#D64C4C]">
                    Witness
                  </button>
                </Link>
              </div>
              <div className="relative h-96 overflow-hidden rounded-2xl lg:h-[500px]">
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
        <section className="bg-[#FFF9F5] py-20">
          <div className="mx-auto max-w-6xl px-4 lg:px-8">
            <div className="mb-12 text-center">
              <div className="relative mb-8 h-64 overflow-hidden rounded-2xl border-2 border-white md:h-80">
                <Image
                  src="/Screenshot 2025-08-20 185255.jpg"
                  alt="Our Services"
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="mb-6 text-4xl font-bold text-[#301020] md:text-5xl">
                Our Services
              </h2>
              <p className="mx-auto mb-8 max-w-4xl text-lg leading-relaxed text-[#301020]">
                From Dhamma Talks to Individual meetups we have a wide range of
                offering to fit anyones spiritual and life needs. We run
                Arahathmaga Center as our physical sanctuary and Maithribodhi
                Archive as the treasure trove of Dhamma.
              </p>
              <Link href="/services">
                <button className="rounded-full bg-[#E85D5D] px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-[#D64C4C]">
                  Explore
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Section 3: Monthly Dhamma Discussion - Content Left, Image Right */}
        <section className="bg-[#FCE8D9] py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="space-y-6 lg:order-1">
                <div className="space-y-4">
                  <h2 className="text-4xl font-bold text-[#301020] md:text-5xl">
                    Monthly Dhamma Discussion
                  </h2>
                  <p className="text-lg leading-relaxed text-[#301020]">
                    We had been continuously conducting Monthly Dhamma
                    Discussion on poya day for years now. However it is only one
                    of the events that we offer to our community. Attend one of
                    our events and witness the difference for yourself.
                  </p>
                </div>
                <Link href="/events">
                  <button className="rounded-full bg-[#E85D5D] px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-[#D64C4C]">
                    View Events
                  </button>
                </Link>
              </div>
              <div className="relative h-96 overflow-hidden rounded-2xl border-2 border-white lg:order-2 lg:h-[400px]">
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
        <section className="bg-[#FFF9F5] py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="mb-6 text-4xl font-bold text-[#301020] md:text-5xl">
                Our Projects
              </h2>
              <p className="mx-auto max-w-4xl text-lg leading-relaxed text-[#301020]">
                We have several ongoing physical and digital projects. From
                frequent publications to running and developing physical
                spiritual center our projects ranges and scale and impact.
              </p>
            </div>

            <div className="mb-12 grid gap-8 md:grid-cols-2">
              <div className="relative h-80 overflow-hidden rounded-2xl border-2 border-white">
                <Image
                  src="/Screenshot 2025-08-20 223553.jpg"
                  alt="Project 1"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-80 overflow-hidden rounded-2xl border-2 border-white">
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
                <button className="rounded-full bg-[#E85D5D] px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-[#D64C4C]">
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

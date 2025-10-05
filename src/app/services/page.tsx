import { Navigation, Footer } from "~/components/navigation";
import Link from "next/link";
import Image from "next/image";
import { AnimatedSVGIcon } from "~/components/AnimatedSVGIcon";

export default function ServicesPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {/* Hero Section with Background Image */}
        <section className="relative flex h-screen items-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/services-background-new.webp"
              alt="Our Services"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          <div className="relative z-10 w-full max-w-7xl mx-auto px-8 lg:px-16">
            <div className="max-w-2xl">
              <h1 className="mb-16 font-bold text-white">
                <div className="text-6xl md:text-7xl lg:text-8xl leading-none">Our Services</div>
              </h1>
              <p className="mb-10 text-xl text-white/90 md:text-2xl">
                Discover the various programs and services we offer for spiritual
                growth and community connection.
              </p>
              <Link href="/mahaguru-meetup">
                <button className="rounded-full bg-[#E85D5D] px-8 py-4 text-lg font-semibold text-white shadow-lg transition-colors hover:bg-[#D64C4C] hover:shadow-xl">
                  Book a Meetup
                </button>
              </Link>
            </div>
          </div>
        </section>
        {/* Service 1: Dhamma Discussion - Hero Style with Carousel */}
        <section className="bg-[#FCE8D9] py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="mb-6 text-4xl font-bold text-[#301020] md:text-5xl">
                Dhamma Discussion
              </h2>
              <p className="mx-auto mb-8 max-w-4xl text-lg leading-relaxed text-[#301020]">
                Our signature monthly <strong>Dhamma Discussion</strong> is a cornerstone event held on the full moon Poya day,
                drawing over a hundred curious seekers of truth. The session begins with a profound talk by Mahaguru, followed
                by co-facilitated breakout discussions with Rev. Bhaddiya and Nevil Guru to explore the teachings more deeply.
                In addition to this monthly gathering, our Arahathmaga center hosts numerous sessions almost daily for advanced
                practitioners seeking to deepen their understanding.
              </p>
              <Link
                href="/events"
                className="inline-block rounded-full bg-[#E85D5D] px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-[#D64C4C] hover:shadow-xl mb-8"
                data-testid="cta-dhamma-discussion"
              >
                Learn More
              </Link>
              
              {/* Image Carousel */}
              <div className="relative mb-8 h-80 overflow-hidden rounded-3xl md:h-96">
                <div className="flex h-full animate-carousel">
                  <div className="relative h-full min-w-full">
                    <Image
                      src="/amc-featured.png"
                      alt="Dhamma Discussion 1"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative h-full min-w-full">
                    <Image
                      src="/car-four.png"
                      alt="Dhamma Discussion 2"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative h-full min-w-full">
                    <Image
                      src="/car-two.png"
                      alt="Dhamma Discussion 3"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service 2: Dhamma Explanation - Redesigned Three-Column Layout */}
        <section className="bg-[#FFF9F5] py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            {/* Centered Title */}
            <div className="mb-16 text-center">
              <h2 className="text-4xl font-bold text-[#301020] md:text-5xl">
                Dhamma Explanation
              </h2>
            </div>

            {/* Three Column Layout - Equal Widths */}
            <div className="grid gap-12 lg:grid-cols-3 items-center">
              {/* Left Column - Individual Sessions */}
              <div className="space-y-6 flex flex-col items-center" data-testid="individual-sessions">
                <h3 className="text-2xl font-bold text-[#301020] md:text-3xl text-center">
                  Individual Sessions
                </h3>
                <p className="text-lg leading-relaxed text-[#301020] text-justify">
                  For those seeking deeper clarity through personalized guidance, our Individual Dhamma Explanation sessions are led by Mahaguru and supported by the venerable Dodangoda Bhaddiya Thero. The profound Dhamma is carefully broken down into digestible segments with extended explanations tailored to your learning pace.
                </p>
                <Link
                  href="#"
                  className="rounded-full bg-[#E85D5D] px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-[#D64C4C]"
                  data-testid="cta-individual-sessions"
                >
                  Book Session
                </Link>
              </div>

              {/* Center Column - Animated SVG Icons */}
              <div className="flex items-center justify-center min-h-[400px]">
                <AnimatedSVGIcon />
              </div>

              {/* Right Column - Group Sessions */}
              <div className="space-y-6 flex flex-col items-center" data-testid="group-sessions">
                <h3 className="text-2xl font-bold text-[#301020] md:text-3xl text-center">
                  Group Sessions
                </h3>
                <p className="text-lg leading-relaxed text-[#301020] text-justify">
                  For those seeking deeper clarity within a community, our Group Dhamma Explanation sessions are run by Mahaguru and facilitated by Ven. Bhaddiya Thero or Nevil Guru as required. The profound Dhamma is carefully broken down into digestible segments with extended explanations accessible to all who wish to learn together.
                </p>
                <Link
                  href="#"
                  className="rounded-full bg-[#E85D5D] px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-[#D64C4C]"
                  data-testid="cta-group-sessions"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Service 3: Meditation Guidance - Asymmetric Layout with Diagonal Split */}
        <section className="bg-[#FCE8D9] py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl bg-[#FFF9F5] p-8 lg:p-16" data-testid="service-meditation-guidance">
              <div className="grid gap-12 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                  <h2 className="text-4xl font-bold text-[#301020] md:text-5xl">
                    Meditation Guidance
                  </h2>
                  <p className="text-lg leading-relaxed text-[#301020]">
                    Advance your spiritual journey with personalized <strong>Meditation Guidance</strong> from Nevil Guru.
                    These on-demand sessions are tailored to provide individualized support for practitioners at all levels.
                    Whether you are a beginner taking your first steps or an advanced practitioner seeking to overcome a specific
                    hurdle, you can book a one-on-one or a group session with Nevil Guru to receive the dedicated guidance you need.
                  </p>
                  <Link
                    href="#"
                    className="inline-block rounded-full bg-[#E85D5D] px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-[#D64C4C]"
                    data-testid="cta-meditation-guidance"
                  >
                    Book Session
                  </Link>
                </div>
                <div className="relative h-80 overflow-hidden rounded-2xl lg:h-auto">
                  <Image
                    src="/services-meditation.png"
                    alt="Meditation Guidance"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service 4: Mahaguru Meetup - Content Right, Image Left */}
        <section className="bg-[#FFF9F5] py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-3">
              <div className="relative h-80 overflow-hidden rounded-2xl lg:order-1 lg:h-[400px] lg:col-span-2 flex items-center justify-center bg-[#FCE8D9]">
                <Image
                  src="/services-meetup-icon.svg"
                  alt="Mahaguru Meetup"
                  width={300}
                  height={300}
                  className="object-contain"
                />
              </div>
              <div className="space-y-6 lg:order-2 lg:col-span-1" data-testid="service-mahaguru-meetup">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-[#301020] md:text-4xl">
                    Mahaguru Meetup
                  </h2>
                  <p className="text-base leading-relaxed text-[#301020]">
                    The <strong>Mahaguru Meetup</strong> offers a rare and unique opportunity to connect directly with Mahaguru,
                    either in person or online. These dedicated sessions are designed for individuals seeking profound clarity on
                    pressing personal matters, career decisions, or pivotal life choices. This offering also extends to corporate
                    teams, providing invaluable insights into the deeper nature of the human psyche to foster collaboration,
                    enhance team dynamics, and achieve higher levels of organizational success.
                  </p>
                </div>
                <Link
                  href="/mahaguru-meetup"
                  className="inline-block rounded-full bg-[#E85D5D] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#D64C4C]"
                  data-testid="cta-mahaguru-meetup"
                >
                  Explore Meetup
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Service 5: Weekly Clarity Q&A - Card Style with Overlapping Elements */}
        <section className="bg-[#FCE8D9] py-20">
          <div className="mx-auto max-w-6xl px-4 lg:px-8">
            <div className="relative" data-testid="service-weekly-qa">
              <div className="grid gap-8 lg:grid-cols-12">
                <div className="relative z-10 lg:col-span-7 space-y-6 rounded-3xl bg-[#FFF9F5] p-8 shadow-2xl lg:p-12">
                  <h2 className="text-4xl font-bold text-[#301020] md:text-5xl">
                    Weekly Clarity Q&A
                  </h2>
                  <p className="text-lg leading-relaxed text-[#301020]">
                    Join our interactive <strong>Weekly Clarity Q&A</strong> session, a supportive space for both new and experienced
                    followers to find answers. Whether you have questions about your personal practice or seek to clarify concepts
                    from our Dhamma discussions, this is your opportunity to engage directly with our facilitators. The session is
                    expertly guided by Rev. Dodangoda Bhaddiya and Nevil Guru, with Mahaguru often in attendance to provide deeper
                    insights where needed. It&apos;s the perfect forum to resolve doubts and gain confidence on your spiritual path.
                  </p>
                  <Link
                    href="#"
                    className="inline-block rounded-full bg-[#E85D5D] px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-[#D64C4C]"
                    data-testid="cta-weekly-qa"
                  >
                    Join Session
                  </Link>
                </div>
                <div className="lg:col-span-5 relative h-80 overflow-hidden rounded-2xl lg:h-auto lg:-ml-8">
                  <Image
                    src="/Screenshot 2025-08-20 193914.jpg"
                    alt="Weekly Clarity Q&A"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service 6: Gen Alpha Academy - Multi-column Layout */}
        <section className="bg-[#FFF9F5] py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="mb-6 text-4xl font-bold text-[#301020] md:text-5xl">
                Gen Alpha Academy
              </h2>
            </div>
            
            <div className="grid gap-8 lg:grid-cols-2" data-testid="service-gen-alpha-academy">
              <div className="relative h-80 overflow-hidden rounded-2xl lg:h-96">
                <Image
                  src="/academy.png"
                  alt="Gen Alpha Academy"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center space-y-6">
                <p className="text-lg leading-relaxed text-[#301020]">
                  The <strong>Gen Alpha Academy</strong> is a visionary non-profit initiative by the Mahaguru Center,
                  dedicated to shaping a better tomorrow by empowering today&apos;s youth. This academy focuses on nurturing
                  a new generation of conscious, capable, and compassionate leaders through specialized programs that
                  instill wisdom and mindfulness from an early age.
                </p>
                <Link
                  href="/gen-alpha-academy"
                  className="inline-block rounded-full bg-[#E85D5D] px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-[#D64C4C] self-start"
                  data-testid="cta-gen-alpha-academy"
                >
                  Discover Academy
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Service 7: Outreach - Full-width Feature with Side Content */}
        <section className="bg-[#FCE8D9] py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#47203B] to-[#7A344E] p-8 lg:p-16" data-testid="service-outreach">
              <div className="grid gap-12 lg:grid-cols-5">
                <div className="lg:col-span-3 space-y-6">
                  <h2 className="text-4xl font-bold text-white md:text-5xl">
                    Outreach
                  </h2>
                  <p className="text-lg leading-relaxed text-white/90">
                    Our commitment to compassion extends beyond the center&apos;s walls through our community <strong>Outreach</strong> programs.
                    We conduct dedicated sessions in prisons, hospitals, and other community spaces where the healing power of deep listening
                    and mindfulness is needed most, offering support and solace to vulnerable populations.
                  </p>
                  <Link
                    href="#"
                    className="inline-block rounded-full bg-white px-8 py-4 text-lg font-semibold text-[#4A1232] transition-colors hover:bg-[#FCE8D9]"
                    data-testid="cta-outreach"
                  >
                    Get Involved
                  </Link>
                </div>
                <div className="lg:col-span-2 relative h-80 overflow-hidden rounded-2xl lg:h-auto flex items-center justify-center bg-white/10">
                  <Image
                    src="/services-icon-outreach.svg"
                    alt="Outreach Programs"
                    width={250}
                    height={250}
                    className="object-contain"
                  />
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

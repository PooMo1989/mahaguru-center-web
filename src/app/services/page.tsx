import { Navigation, Footer } from "~/components/navigation";
import Link from "next/link";

export default function ServicesPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
              Our Services
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-12 max-w-3xl mx-auto">
              Discover the various programs and services we offer for spiritual growth 
              and community connection.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="pb-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-8 md:gap-12">
              
              {/* Service 1: Dhamma Discussion */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden" data-testid="service-dhamma-discussion">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="p-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Dhamma Discussion</h2>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      Our signature monthly <strong>Dhamma Discussion</strong> is a cornerstone event held on the full moon Poya day, drawing over a hundred curious seekers of truth. The session begins with a profound talk by Mahaguru, followed by co-facilitated breakout discussions with Rev. Bhaddiya and Nevil Guru to explore the teachings more deeply. In addition to this monthly gathering, our Arahathmaga center hosts numerous sessions almost daily for advanced practitioners seeking to deepen their understanding.
                    </p>
                    <Link 
                      href="#" 
                      className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                      data-testid="cta-dhamma-discussion"
                    >
                      Learn More
                    </Link>
                  </div>
                  <div className="bg-gray-200 h-64 md:h-auto flex items-center justify-center">
                    <span className="text-gray-500">Dhamma Discussion Image</span>
                  </div>
                </div>
              </div>

              {/* Service 2: Dhamma Explanation */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden" data-testid="service-dhamma-explanation">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-gray-200 h-64 md:h-auto flex items-center justify-center md:order-1">
                    <span className="text-gray-500">Dhamma Explanation Image</span>
                  </div>
                  <div className="p-8 md:order-2">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Dhamma Explanation</h2>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      For those seeking deeper clarity, our <strong>Dhamma Explanation</strong> sessions are led by the venerable Dodangoda Bhaddiya Thero. In these sessions, the profound Dhamma delivered by Mahaguru is carefully broken down into smaller, more digestible segments. Ven. Bhaddiya Thero provides extended explanations and insights, making these deep concepts accessible to all who wish to learn.
                    </p>
                    <Link 
                      href="#" 
                      className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                      data-testid="cta-dhamma-explanation"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>

              {/* Service 3: Meditation Guidance */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden" data-testid="service-meditation-guidance">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="p-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Meditation Guidance</h2>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      Advance your spiritual journey with personalized <strong>Meditation Guidance</strong> from Nevil Guru. These on-demand sessions are tailored to provide individualized support for practitioners at all levels. Whether you are a beginner taking your first steps or an advanced practitioner seeking to overcome a specific hurdle, you can book a one-on-one or a group session with Nevil Guru to receive the dedicated guidance you need.
                    </p>
                    <Link 
                      href="#" 
                      className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                      data-testid="cta-meditation-guidance"
                    >
                      Book Session
                    </Link>
                  </div>
                  <div className="bg-gray-200 h-64 md:h-auto flex items-center justify-center">
                    <span className="text-gray-500">Meditation Guidance Image</span>
                  </div>
                </div>
              </div>

              {/* Service 4: Mahaguru Meetup */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden" data-testid="service-mahaguru-meetup">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-gray-200 h-64 md:h-auto flex items-center justify-center md:order-1">
                    <span className="text-gray-500">Mahaguru Meetup Image</span>
                  </div>
                  <div className="p-8 md:order-2">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Mahaguru Meetup</h2>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      The <strong>Mahaguru Meetup</strong> offers a rare and unique opportunity to connect directly with Mahaguru, either in person or online. These dedicated sessions are designed for individuals seeking profound clarity on pressing personal matters, career decisions, or pivotal life choices. This offering also extends to corporate teams, providing invaluable insights into the deeper nature of the human psyche to foster collaboration, enhance team dynamics, and achieve higher levels of organizational success.
                    </p>
                    <Link 
                      href="/mahaguru-meetup" 
                      className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                      data-testid="cta-mahaguru-meetup"
                    >
                      Explore Meetup
                    </Link>
                  </div>
                </div>
              </div>

              {/* Service 5: Weekly Clarity Q&A */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden" data-testid="service-weekly-qa">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="p-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Weekly Clarity Q&A</h2>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      Join our interactive <strong>Weekly Clarity Q&A</strong> session, a supportive space for both new and experienced followers to find answers. Whether you have questions about your personal practice or seek to clarify concepts from our Dhamma discussions, this is your opportunity to engage directly with our facilitators. The session is expertly guided by Rev. Dodangoda Bhaddiya and Nevil Guru, with Mahaguru often in attendance to provide deeper insights where needed. It&apos;s the perfect forum to resolve doubts and gain confidence on your spiritual path.
                    </p>
                    <Link 
                      href="#" 
                      className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                      data-testid="cta-weekly-qa"
                    >
                      Join Session
                    </Link>
                  </div>
                  <div className="bg-gray-200 h-64 md:h-auto flex items-center justify-center">
                    <span className="text-gray-500">Weekly Q&A Image</span>
                  </div>
                </div>
              </div>

              {/* Service 6: Gen Alpha Academy */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden" data-testid="service-gen-alpha-academy">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-gray-200 h-64 md:h-auto flex items-center justify-center md:order-1">
                    <span className="text-gray-500">Gen Alpha Academy Image</span>
                  </div>
                  <div className="p-8 md:order-2">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Gen Alpha Academy</h2>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      The <strong>Gen Alpha Academy</strong> is a visionary non-profit initiative by the Mahaguru Center, dedicated to shaping a better tomorrow by empowering today&apos;s youth. This academy focuses on nurturing a new generation of conscious, capable, and compassionate leaders through specialized programs that instill wisdom and mindfulness from an early age.
                    </p>
                    <Link 
                      href="/gen-alpha-academy" 
                      className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                      data-testid="cta-gen-alpha-academy"
                    >
                      Discover Academy
                    </Link>
                  </div>
                </div>
              </div>

              {/* Service 7: Outreach */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden" data-testid="service-outreach">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="p-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Outreach</h2>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      Our commitment to compassion extends beyond the center&apos;s walls through our community <strong>Outreach</strong> programs. We conduct dedicated sessions in prisons, hospitals, and other community spaces where the healing power of deep listening and mindfulness is needed most, offering support and solace to vulnerable populations.
                    </p>
                    <Link 
                      href="#" 
                      className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                      data-testid="cta-outreach"
                    >
                      Get Involved
                    </Link>
                  </div>
                  <div className="bg-gray-200 h-64 md:h-auto flex items-center justify-center">
                    <span className="text-gray-500">Outreach Programs Image</span>
                  </div>
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
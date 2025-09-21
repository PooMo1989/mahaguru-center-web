import { Navigation, Footer } from "~/components/navigation";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              Welcome to Mahaguru Center
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 italic">
              &ldquo;The mind is everything. What you think you become.&rdquo;
            </p>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg hover:shadow-xl">
              Explore Our Journey
            </button>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
              A Place of Peace and Learning
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Welcome to Mahaguru Center, a serene sanctuary dedicated to spiritual growth, community connection, 
              and the timeless wisdom of Dhamma teachings. Our center serves as a peaceful haven where individuals 
              from all walks of life can come together to explore mindfulness, participate in meaningful discussions, 
              and contribute to compassionate community projects that make a positive impact in our world.
            </p>
          </div>
        </section>

        {/* Featured Pages Section */}
        <section className="py-16 px-4 bg-white/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
              Discover Our Community
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Card 1: About Mahaguru */}
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🙏</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">About Mahaguru</h3>
                <p className="text-gray-600 mb-4">
                  Learn about our spiritual teacher and the wisdom that guides our center.
                </p>
                <a 
                  href="/mahaguru" 
                  className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Learn More
                </a>
              </div>

              {/* Card 2: Our Services */}
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌱</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Our Services</h3>
                <p className="text-gray-600 mb-4">
                  Discover the various programs and services we offer for spiritual growth.
                </p>
                <a 
                  href="/services" 
                  className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Explore Services
                </a>
              </div>

              {/* Card 3: Monthly Dhamma Discussion */}
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💬</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Monthly Dhamma Discussion</h3>
                <p className="text-gray-600 mb-4">
                  Join our monthly gatherings for meaningful discussions and shared learning.
                </p>
                <a 
                  href="/events" 
                  className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  View Events
                </a>
              </div>

              {/* Card 4: Our Community Projects */}
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Our Community Projects</h3>
                <p className="text-gray-600 mb-4">
                  Explore our compassionate initiatives that serve our community and beyond.
                </p>
                <a 
                  href="/projects" 
                  className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  See Projects
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

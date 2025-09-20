import { Navigation } from "~/components/navigation";

export default function GenAlphaAcademyPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Gen Alpha Academy
            </h1>
            <h2 className="text-2xl md:text-3xl text-gray-600 mb-12">
              Cultivating Leaders & Wise Minds for the 21st Century
            </h2>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              The <strong>Gen Alpha Academy</strong> is a visionary non-profit initiative by the Mahaguru Center, 
              dedicated to shaping a better tomorrow by empowering today&apos;s youth. This academy focuses on nurturing 
              a new generation of conscious, capable, and compassionate leaders through specialized programs that 
              instill wisdom and mindfulness from an early age.
            </p>
          </div>
        </section>

        {/* Four Pillars Section */}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <h4 className="text-xl font-bold text-gray-800 mb-4">Self-Realization</h4>
                <p className="text-gray-600">
                  Discovering your authentic self and understanding your unique purpose and potential.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <h4 className="text-xl font-bold text-gray-800 mb-4">Maturity Through Wisdom</h4>
                <p className="text-gray-600">
                  Developing profound insights and wise decision-making capabilities for life&apos;s challenges.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <h4 className="text-xl font-bold text-gray-800 mb-4">Leadership Training</h4>
                <p className="text-gray-600">
                  Building essential leadership skills to guide others and create positive impact.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <h4 className="text-xl font-bold text-gray-800 mb-4">Emotional Management</h4>
                <p className="text-gray-600">
                  Learning to understand, process, and effectively manage emotions in all situations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Coming Soon Section */}
        <section className="py-16 px-4 bg-blue-50">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">
              🚀 Program Details Coming Soon
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              We&apos;re currently finalizing the specific workshop details including dates, duration, pricing, 
              and registration information. Stay tuned for announcements about our upcoming transformative 
              programs designed specifically for today&apos;s generation.
            </p>
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
              <h4 className="text-xl font-bold text-gray-800 mb-4">
                🌱 Gen Alpha Academy Mission
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Gen Alpha Academy is a non-profit initiative founded by Mahaguru Center Australia focused on 
                raising conscious, capable, and compassionate future leaders. This program reflects our 
                dedication to shaping a better tomorrow by empowering today&apos;s youth.
              </p>
            </div>
          </div>
        </section>

        {/* Program Importance Section */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              🚀 Why This Program Matters
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              In today&apos;s world, young people need skills that support long-term success, leadership abilities 
              to create impact, emotional maturity to handle challenges, and wisdom to guide themselves and others. 
              This program is designed to plant seeds of awareness, leadership, and compassion in every participant.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
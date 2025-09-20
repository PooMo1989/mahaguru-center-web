import { Navigation } from "~/components/navigation";

export default function ProjectsPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
              Our Community Projects
            </h1>
            <div className="prose prose-lg mx-auto">
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Explore our compassionate initiatives that serve our community and beyond. 
                Currently under development.
              </p>
              <p className="text-gray-500">
                Coming soon: Community outreach programs, charitable initiatives, and volunteer opportunities.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
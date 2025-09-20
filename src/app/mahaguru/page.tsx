import { Navigation } from "~/components/navigation";
import * as Tabs from "@radix-ui/react-tabs";

export default function MahaguruPage() {
  const lifeStages = [
    {
      id: "formative-years",
      title: "The Formative Years: An Era of Seeking",
      content: "This section would chronicle the Mahaguru's early life and the initial period of spiritual exploration and quest for truth."
    },
    {
      id: "dawn-of-realization", 
      title: "The Dawn of Realization: An Era of Fulfillment",
      content: "Here, we would detail the pivotal moments of spiritual attainment and profound insight."
    },
    {
      id: "insightful-experimentation",
      title: "Insightful Experimentation: Understanding the Human Mind", 
      content: "A phase dedicated to analyzing human nature and discovering the most effective methods for disseminating the Dhamma."
    },
    {
      id: "framework-for-wisdom",
      title: "A Framework for Wisdom: Systematizing the Teachings",
      content: "Detailing the process of organizing the Dhamma into structured collections, creating personalized paths for individuals based on their unique dispositions."
    },
    {
      id: "enduring-legacy",
      title: "The Enduring Legacy: A System for All Beings",
      content: "Focusing on the creation of a timeless and accessible system, designed for all to rely on the teachings themselves, ensuring a legacy beyond the individual."
    }
  ];

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 text-center mb-16">
            Mahaguru
          </h1>
          
          <Tabs.Root defaultValue="formative-years" className="prose prose-lg max-w-none">
            <Tabs.List className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 pb-4">
              {lifeStages.map((stage) => (
                <Tabs.Trigger
                  key={stage.id}
                  value={stage.id}
                  className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:border-blue-600 transition-colors duration-200"
                >
                  {stage.title}
                </Tabs.Trigger>
              ))}
            </Tabs.List>

            {lifeStages.map((stage) => (
              <Tabs.Content
                key={stage.id}
                value={stage.id}
                className="focus:outline-none"
              >
                <section className="mb-12">
                  <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                    {stage.title}
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {stage.content}
                  </p>
                </section>
              </Tabs.Content>
            ))}
          </Tabs.Root>
        </div>
      </main>
    </>
  );
}
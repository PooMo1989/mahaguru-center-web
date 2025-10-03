import { Navigation, Footer } from "~/components/navigation";
import * as Tabs from "@radix-ui/react-tabs";
import Image from "next/image";

export default function MahaguruPage() {
  const lifeStages = [
    {
      id: "early-age",
      shortTitle: "Early Age",
      title: "Stage 1: The Formative Years",
      subtitle: "An Era of Truth Seeking",
      content:
        "During his early years, Mahaguru embarked on an earnest quest to understand the fundamental nature of existence. This period was marked by deep introspection, extensive study of ancient wisdom traditions, and an unwavering commitment to discovering authentic truth beyond conventional understanding. Through rigorous self-examination and exploration of various spiritual practices, he began to question the very foundations of human experience and consciousness.\n\nThis formative phase laid the groundwork for his extraordinary spiritual journey, as he developed the mental clarity and determination necessary for the profound realizations that would follow. His relentless pursuit of truth during these years demonstrated an exceptional dedication to understanding life's deepest mysteries, setting him apart as a genuine seeker of wisdom.\n\nThe challenges and insights gained during this period shaped his unique approach to spiritual development, emphasizing direct experience over mere theoretical knowledge. His commitment to authenticity and truth-seeking became the cornerstone of his eventual teachings and methodology.",
      image: "/stage 01.png",
      poeticStanza:
        "In youth's earnest quest for truth divine,\nThrough sacred texts and inner shrine,\nA seeker's heart with burning light,\nPursues the dawn beyond the night.",
    },
    {
      id: "dawn-awakening",
      shortTitle: "Dawn",
      title: "Stage 2: The Dawn of Awakening",
      subtitle: "An Era of Fulfillment",
      content:
        "This pivotal phase marked the flowering of Mahaguru's spiritual journey, where years of dedicated seeking culminated in profound moments of awakening. Through sustained meditation, contemplative practices, and an unwavering commitment to truth, he experienced breakthrough insights that fundamentally transformed his understanding of reality and consciousness.\n\nDuring this era of fulfillment, he gained direct realization of the interconnected nature of existence and the illusory boundaries that separate the individual from the universal. These experiences were not merely intellectual understandings but lived truths that permeated every aspect of his being, bringing a deep sense of peace, clarity, and purpose.\n\nThe dawn of awakening established the foundation for all his subsequent teachings and marked his transition from seeker to realized guide. This transformation was characterized by a natural arising of compassion and wisdom, preparing him for his future role as a spiritual teacher and guide for humanity.",
      image: "/stage 02.webp",
      poeticStanza:
        "When morning breaks on consciousness wide,\nAnd truth reveals what dwells inside,\nThe seeker finds what was always there,\nIn silence deep and awareness bare.",
    },
    {
      id: "mind-study",
      shortTitle: "Mind Study",
      title: "Stage 3: Insightful Experimentation",
      subtitle: "Understanding the Human Mind",
      content:
        "With profound realization achieved, Mahaguru entered a phase of systematic exploration and experimentation to understand the intricacies of human consciousness and the most effective methods for transmitting wisdom. This period was characterized by careful observation of how different individuals responded to various teaching methods and spiritual practices.\n\nThrough compassionate engagement with seekers from diverse backgrounds, he developed deep insights into the psychological and spiritual obstacles that prevent people from accessing their innate wisdom. He experimented with different approaches, carefully noting which methods proved most effective for various temperaments and levels of understanding.\n\nThis methodical approach to understanding human nature allowed him to refine his teaching techniques and develop a comprehensive framework for spiritual guidance. His insights during this phase revealed the importance of meeting each individual where they are, rather than applying a one-size-fits-all approach to spiritual development.",
      image: "/stage 03.png",
      poeticStanza:
        "In minds diverse, the teacher sees,\nEach heart's unique path to peace,\nThrough patient study, wisdom grows,\nIn how the light of dharma flows.",
    },
    {
      id: "wisdom-framework",
      shortTitle: "Framework",
      title: "Stage 4: A Framework for Wisdom",
      subtitle: "Systematizing the Teachings",
      content:
        "Drawing upon his deep understanding of both truth and human nature, Mahaguru undertook the monumental task of organizing his insights into a comprehensive and systematic framework. This phase involved creating structured collections of teachings that could serve as reliable guides for spiritual development across different levels of understanding and commitment.\n\nHe carefully categorized various practices, teachings, and approaches based on their effectiveness for different personality types and spiritual maturity levels. This systematization ensured that individuals could find appropriate guidance regardless of their starting point or particular inclinations, making the wisdom accessible to a broader range of seekers.\n\nThe framework he developed was both comprehensive and flexible, allowing for personalized paths while maintaining the integrity of the core teachings. This systematic approach reflected his deep compassion and wisdom, ensuring that no sincere seeker would be left without appropriate guidance on their spiritual journey.",
      image: "/stage 04.png",
      poeticStanza:
        "Like architect of sacred ways,\nHe builds the path through wisdom's maze,\nEach teaching placed with careful thought,\nA map for all who wisdom sought.",
    },
    {
      id: "eternal-legacy",
      shortTitle: "Legacy",
      title: "Stage 5: The Enduring Legacy",
      subtitle: "A System for All Beings",
      content:
        "In his final and most far-reaching contribution, Mahaguru established a complete system designed to transcend the limitations of time and individual presence. Understanding that true spiritual guidance should not depend solely on the availability of a teacher, he created a comprehensive methodology that could serve humanity across generations.\n\nThis enduring legacy encompasses not just the teachings themselves, but also the methods for their transmission, preservation, and adaptation to changing circumstances. He ensured that the system would remain accessible and relevant for future seekers, regardless of cultural shifts or temporal distance from his physical presence.\n\nThe ultimate achievement of this stage was the creation of a self-sustaining framework for spiritual development that empowers individuals to become their own guides while maintaining connection to the timeless wisdom. This legacy represents the culmination of his life's work and his greatest gift to humanity—a path to liberation that remains available to all sincere seekers.",
      image: "/stage 05.png",
      poeticStanza:
        "Beyond the bounds of time and space,\nA gift eternal finds its place,\nIn every heart that seeks the way,\nHis wisdom lives from day to day.",
    },
  ];

  return (
    <>
      <Navigation />
      <main className="relative min-h-screen">
        {/* Hero Section with Background Image */}
        <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
          <Image
            src="/heroImage.webp"
            alt="Spiritual journey background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60"></div>
          <div className="relative z-10 flex h-full items-center justify-center">
            <div className="px-4 text-center text-white">
              <h1 className="mb-4 text-5xl font-bold drop-shadow-lg md:text-7xl">
                Mahaguru
              </h1>
              <p className="mx-auto max-w-2xl text-xl font-light drop-shadow-md md:text-2xl">
                A Journey Through the Five Stages of Spiritual Realization
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-gradient-to-b from-slate-50 to-slate-100 py-16">
          <div className="mx-auto max-w-6xl px-4">
            <Tabs.Root defaultValue="early-age" className="w-full">
              {/* Connected Tab Navigation */}
              <Tabs.List className="mx-auto mb-12 flex max-w-4xl flex-wrap justify-center gap-1 rounded-full bg-white p-2 shadow-lg">
                {lifeStages.map((stage, index) => (
                  <div key={stage.id} className="flex items-center">
                    <Tabs.Trigger
                      value={stage.id}
                      className="rounded-full px-6 py-3 text-sm font-medium text-[#301020] transition-all duration-300 hover:bg-[#FCE8D9] focus:ring-2 focus:ring-[#E85D5D] focus:ring-offset-2 focus:outline-none data-[state=active]:bg-[#E85D5D] data-[state=active]:text-white data-[state=active]:shadow-md"
                    >
                      {stage.shortTitle}
                    </Tabs.Trigger>
                    {index < lifeStages.length - 1 && (
                      <div className="mx-1 hidden h-0.5 w-4 bg-[#236661] sm:block"></div>
                    )}
                  </div>
                ))}
              </Tabs.List>

              {/* Tab Content */}
              {lifeStages.map((stage) => (
                <Tabs.Content
                  key={stage.id}
                  value={stage.id}
                  className="animate-in fade-in-50 duration-300 focus:outline-none"
                >
                  <div className="mx-auto max-w-6xl rounded-2xl bg-white p-8 shadow-xl lg:p-12">
                    <div className="flex flex-col items-start gap-8 lg:flex-row lg:gap-12">
                      {/* Content Section - Left Side */}
                      <div className="flex-1 lg:w-2/3">
                        <div className="mb-6">
                          <h2 className="mb-3 text-3xl font-bold text-[#183F37] lg:text-4xl">
                            {stage.title}
                          </h2>
                          <h3 className="mb-6 text-xl font-semibold text-[#236661]">
                            {stage.subtitle}
                          </h3>
                        </div>

                        <div className="mb-8 space-y-4">
                          {stage.content
                            .split("\n\n")
                            .map((paragraph, index) => (
                              <p
                                key={index}
                                className="text-lg leading-relaxed text-[#301020]"
                              >
                                {paragraph}
                              </p>
                            ))}
                        </div>

                        {/* Poetic Stanza */}
                        <div className="rounded-r-lg border-l-4 border-[#E85D5D] bg-[#FCE8D9] p-6">
                          <div className="leading-relaxed font-medium whitespace-pre-line text-[#183F37] italic">
                            {stage.poeticStanza}
                          </div>
                        </div>
                      </div>

                      {/* Image Section - Right Side */}
                      <div className="flex-shrink-0 lg:w-1/3">
                        <div className="relative h-80 w-full overflow-hidden rounded-lg lg:h-96">
                          <Image
                            src={stage.image}
                            alt={stage.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#183F37]/20 to-transparent"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tabs.Content>
              ))}
            </Tabs.Root>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

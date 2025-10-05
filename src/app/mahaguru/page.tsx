"use client";

import { Navigation, Footer } from "~/components/navigation";
import * as Tabs from "@radix-ui/react-tabs";
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";

export default function MahaguruPage() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      // When video ends, pause at the last frame
      video.pause();
    };

    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  const lifeStages = [
    {
      id: "early-age",
      shortTitle: "Early Age",
      title: "Stage 1: The Formative Years",
      subtitle: "An Era of Truth Seeking",
      content:
        "In the 1981, in a quiet village nestled within the heart of nature, a child was born. His community, seeing a serene spark in his eyes, named him Gothama — a name echoing the lineage of wisdom and truth.\n\nFrom his earliest days, Gothama carried within him a profound sensitivity toward life — questioning existence, observing the harmony of nature, and feeling the deep call of something beyond the ordinary.\n\nThis is the evolution story of that child — Gothama — who, through purity, honesty, and the fire of realization, blossomed into Mahaguru — A Teacher, The Great.\n\nAs a being who once questioned the very nature of life and the reality around him, Gothama's early years were marked by a restless yearning to understand truth in its purest form. Drawn by the essence of purity and honesty, he stepped away from worldly noise and entered the silence of the forests — a sacred space where trees became his companions and stillness his teacher.\n\nHe sat unmoving beneath the canopy of life — silent, observing, dissolving. Through years of solitude and inward exploration, Gothama sought not knowledge, but realization. His aim was simple yet supreme: to know, to awaken, and to liberate. Amidst the whispers of wind and the hum of the living world, the seeker began dissolving all separations — discovering that truth is not found outside, but within the unity of all beings.",
      image: "/stage 01.png",
      poeticStanza:
        "From worldly noise to forest deep,\nWhere trees stand tall and stillness steep,\nYoung Gothama dissolves the veil—\nTruth lies within, not in the tale.",
    },
    {
      id: "dawn-awakening",
      shortTitle: "Dawn",
      title: "Stage 2: The Dawn of Enlightenment",
      subtitle: "An Era of Fulfillment",
      content:
        "After years of deep meditation and luminous introspection, Gothama experienced a profound awakening. In that silent illumination, he perceived the entire mechanism of existence — the cycles of birth and death, the workings of mind and karma, the flow of the universe itself. This realization transformed him. He emerged from the forest reborn — radiant, free, and filled with a deep compassion for all beings.\n\nHis return to the world was not to teach, but to share — carrying within him the jewels of realization, curiosity, and love. This was the dawn of enlightenment — an era of fulfillment where Gothama's being became one with truth, and his life itself became the living Dhamma.",
      image: "/stage 02.webp",
      poeticStanza:
        "In silent dawn, the seeker sees—\nMind, karma, birth, all mysteries,\nReborn he walks with jewels to share,\nHis life becomes the Dhamma's prayer.",
    },
    {
      id: "mind-study",
      shortTitle: "Mind Study",
      title: "Stage 3: Insightful Experimentation",
      subtitle: "Understanding the Right Accordance",
      content:
        "Having realized the essence of Dhamma, Gothama began to reflect on the nature of the present human condition — the minds clouded by defilements, the complexities of cognition, and the changing patterns of society.\n\nHe understood that the Dhamma, to be alive, must move in right accordance with time and beings. Thus began a new phase — one of insightful experimentation — where he explored how ancient wisdom could reach modern hearts.\n\nHe engaged deeply with people's experiences, emotions, and struggles, experimenting with compassionate methods that made truth experiential rather than conceptual. Through this living inquiry, he discovered pathways where Dhamma could meet beings exactly where they are.",
      image: "/stage 03.png",
      poeticStanza:
        "Ancient wisdom meets modern minds,\nThrough trial and grace, the pathway finds,\nWhere Dhamma flows in right accord—\nExperiential, not just word.",
    },
    {
      id: "wisdom-framework",
      shortTitle: "Framework",
      title: "Stage 4: A Framework for Wisdom",
      subtitle: "Systematizing the Teachings",
      content:
        "Realization, he knew, must be lived and shared. Thus, Gothama began to construct and organize the Dhamma into a framework for wisdom — structured yet fluid, guiding yet liberating. He modularized the teachings into clear principles, interweaving them with the realities of human life. Each module became a mirror — reflecting both the nature of suffering and the path to awakening.\n\nThrough this process, the Dhamma evolved into a living ecosystem — one where seekers could grow, reflect, and transform. The teachings became not a doctrine to follow, but an ecology to live within.",
      image: "/stage 04.png",
      poeticStanza:
        "Not doctrine cold, but living earth,\nEach module mirrors suffering's worth,\nAn ecosystem where souls can grow—\nStructured freedom, wisdom's flow.",
    },
    {
      id: "eternal-legacy",
      shortTitle: "Legacy",
      title: "Stage 5: The Enduring Legacy",
      subtitle: "A System for All Beings",
      content:
        "In the culmination of his journey, Gothama envisioned a timeless system — one not bound by name, faith, or tradition, but open to all beings. This system was designed so that every individual could rely on the Dhamma itself — not on the form of the teacher, but on the truth within their own experience. It was at this sacred juncture that Gothama transcended the symbols of monkhood, continuing his life of Dhamma beyond robes and rituals. He entered a new horizon of renunciation — a renunciation of identity — and became a Kalyana Mitra, a noble friend to all seekers. In this natural unfolding, Gothama evolved into Mahaguru — The Teacher, The Great — a living symbol of Nature itself, embodying simplicity, purity, and compassion as the highest form of greatness.\n\nJust as a seed bursts, grows, flowers, and returns to the earth, so too does the Mahaguru embody the eternal cycle of Nature's Dhamma — the truth that all arises, transforms, and flows toward liberation.\n\nThe Living Legacy\n\nThe concept of \"Mahaguru\" that he offered to the world is born from humility, compassion, purity, joy, and ethics. It teaches that greatness is not in elevation, but in simplicity; not in mastery, but in surrender. His life stands as a testament that spirituality is not an escape, but a deep return — to truth, to love, and to the Dhamma that flows through all beings. Today, as Mahaguru walks among us as a teacher and friend, his presence continues to awaken, liberate, and uplift countless lives. This is not merely a story of one man's journey — it is a living reflection of Nature's rhythm, an eternal invitation to awaken to our own inner truth. Mahaguru — The Teacher, The Great — a being of purity, love, and realization — a timeless friend of humanity.",
      image: "/stage 05.png",
      poeticStanza:
        "Beyond the robes, beyond the name,\nA timeless system, Nature's claim,\nKalyana Mitra, friend to all—\nMahaguru answers liberation's call.",
    },
  ];

  return (
    <>
      <Navigation />
      <main className="relative min-h-screen">
        {/* Hero Section with Background Video */}
        <section className="relative flex h-screen items-center overflow-hidden">
          <div className="absolute inset-0">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="h-full w-full object-cover"
            >
              <source src="/mahaguru-hero-video.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          <div className="relative z-10 w-full max-w-7xl mx-auto px-8 lg:px-16">
            <div className="max-w-2xl">
              <h1 className="mb-16 font-bold text-white animate-fade-in-up">
                <div className="text-6xl md:text-7xl lg:text-8xl leading-none">Mahaguru</div>
              </h1>
              <p className="mb-10 text-xl text-white/90 italic md:text-2xl animate-fade-in-up animation-delay-300">
                A Journey Through the Five Stages of Spiritual Realization
              </p>
              <Link href="/mahaguru-meetup" className="inline-block animate-fade-in-up animation-delay-600">
                <button className="rounded-full bg-[#E85D5D] px-8 py-4 text-lg font-semibold text-white shadow-lg transition-colors hover:bg-[#D64C4C] hover:shadow-xl">
                  Book Meetup
                </button>
              </Link>
            </div>
          </div>
        </section>

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

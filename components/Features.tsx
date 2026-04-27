"use client";

import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiZap, FiBarChart2, FiTrendingUp, FiTarget } from "react-icons/fi";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const features = [
  {
    icon: FiZap,
    title: "ScriptLab",
    description:
      "Iterate on your script with clear, actionable feedback before you publish. ScriptLab highlights where your hook drags, where explanations lose clarity, and where your pacing slips. Get concrete suggestions on rewording, reordering, and tightening your script so you can record with confidence—knowing every moment is working to keep viewers watching.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
  },
  {
    icon: FiBarChart2,
    title: "Viewer Drop Off Analysis",
    description:
      "See exactly where and when viewers leave your videos. Interactive retention charts show precise drop-off moments with clickable timestamps to jump to problem areas.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
  },
  {
    icon: FiTrendingUp,
    title: "Keep Doing This",
    description:
      "Identify what's working well in your videos. Get positive feedback on successful moments so you can replicate winning strategies in future content.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
  },
  {
    icon: FiTarget,
    title: "Categories To Improve",
    description:
      "Organized insights into specific areas needing attention. From introductions to transitions, get categorized recommendations to systematically improve your content.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardsRef.current && cardsContainerRef.current && headerRef.current) {
      const cards = cardsRef.current;
      const container = cardsContainerRef.current;
      const header = headerRef.current;

      const cardWidth = cards.children[0]?.clientWidth || 400;
      const gap = 64;
      const totalWidth =
        cardWidth * cards.children.length + gap * (cards.children.length - 1);
      const containerPadding = 64;
      const scrollDistance =
        totalWidth - container.clientWidth + containerPadding;

      gsap.to(cards, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: header,
          start: "top 120px",
          end: () => `+=${scrollDistance + header.offsetHeight}`,
          pin: container,
          scrub: 1,
          anticipatePin: 1,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--subtle-bg)] to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-center text-foreground">
            Powerful Insights,{" "}
            <span className="bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] bg-clip-text text-transparent">
              Beautifully Visualized
            </span>
          </h2>
          <p className="text-lg text-body text-center">
            Go beyond basic metrics. Get the deep engagement data that actually
            drives growth.
          </p>
        </motion.div>

        {/* Horizontal Scroll Container */}
        <div
          ref={cardsContainerRef}
          className="relative h-[350px] lg:h-[400px] overflow-hidden px-4 lg:px-8"
        >
          <div
            ref={cardsRef}
            className="flex gap-12 lg:gap-16 will-change-transform items-start"
            style={{ width: "max-content", paddingTop: "0" }}
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative shrink-0 w-[90vw] sm:w-[600px] lg:w-[700px] h-[320px] lg:h-[370px]"
                >
                  {/* Background Card with Image */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 600px, 700px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--gradient-start)]/20 to-[var(--gradient-end)]/20" />
                    <div
                      className="absolute inset-0 group-hover:opacity-75 transition-opacity duration-500"
                      style={{ backgroundColor: "var(--image-overlay)" }}
                    />
                  </div>

                  {/* Overlay Card - Bottom Left */}
                  <div
                    className="absolute bottom-0 left-0 lg:-left-8 lg:bottom-8 right-0 lg:right-auto lg:w-[75%] rounded-t-2xl lg:rounded-2xl backdrop-blur-md p-6 lg:p-8 shadow-2xl"
                    style={{
                      background: `linear-gradient(135deg, var(--card-glass), var(--card-glass-mid), var(--card-glass))`,
                      border: "1px solid var(--nav-border)",
                    }}
                  >
                    {/* Icon */}
                    <motion.div
                      className="inline-flex p-3 rounded-xl bg-gradient-to-br from-[var(--gradient-start)] to-[var(--gradient-end)] mb-4 w-fit shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-2xl lg:text-3xl font-bold mb-3 font-display text-foreground">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-base lg:text-lg text-body leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

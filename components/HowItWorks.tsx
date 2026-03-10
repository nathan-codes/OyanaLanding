"use client";

import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiLink, FiEye, FiRepeat } from "react-icons/fi";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    number: "01",
    title: "Connect Your Channel",
    description:
      "Link your YouTube channel in seconds. We securely connect via YouTube API—no passwords stored, just instant access to your analytics.",
    icon: FiLink,
  },
  {
    number: "02",
    title: "Get Actionable Recommendations",
    description:
      "Receive timestamped recommendations with specific fixes. Each suggestion shows the exact moment, problem description, and actionable solution—from trimming intros to improving transitions.",
    icon: FiEye,
  },
  {
    number: "03",
    title: "Fix & Improve Your Content",
    description:
      "Use categorized insights to systematically improve. See what's working, identify drop-off moments, and get specific fixes for YouTube Studio—then watch your retention improve.",
    icon: FiRepeat,
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftSideRef = useRef<HTMLDivElement>(null);
  const rightSideRef = useRef<HTMLDivElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !sectionRef.current ||
      !leftSideRef.current ||
      !rightSideRef.current ||
      !stepsContainerRef.current
    ) {
      return;
    }

    const section = sectionRef.current;
    const leftSide = leftSideRef.current;
    const rightSide = rightSideRef.current;
    const stepsContainer = stepsContainerRef.current;

    // Wait for layout to settle
    const timeoutId = setTimeout(() => {
      // Calculate the scroll distance needed
      const containerHeight = rightSide.clientHeight;
      const contentHeight = stepsContainer.scrollHeight;
      const scrollDistance = Math.max(0, contentHeight - containerHeight);

      if (scrollDistance <= 0) return;

      // Create ScrollTrigger to pin the section and scroll the right side
      const scrollTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${scrollDistance + 100}`,
        pin: section,
        anticipatePin: 1,
        scrub: 1,
        onUpdate: (self) => {
          // Scroll the right side content based on scroll progress
          const progress = self.progress;
          const translateY = -progress * scrollDistance;
          gsap.set(stepsContainer, {
            y: translateY,
          });
        },
      });

      // Handle window resize
      const handleResize = () => {
        ScrollTrigger.refresh();
      };
      window.addEventListener("resize", handleResize);

      return () => {
        scrollTrigger.kill();
        window.removeEventListener("resize", handleResize);
      };
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars?.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#009775]/5 to-transparent" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row">
        {/* Left Side - Fixed Title */}
        <div
          ref={leftSideRef}
          className="w-full lg:w-1/2 flex items-center justify-center lg:justify-start py-16 lg:py-0 sticky top-0 h-screen"
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-lg"
          >
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 text-white leading-tight">
              How It Works
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed">
              Three simple steps to transform your watch data into actionable
              growth strategies.
            </p>
          </motion.div>
        </div>

        {/* Right Side - Scrolling Content */}
        <div
          ref={rightSideRef}
          className="w-full lg:w-1/2 relative overflow-hidden h-screen"
        >
          <div
            ref={stepsContainerRef}
            className="py-16 lg:py-32 space-y-32 "
          >
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="max-w-2xl"
                >
                  {/* Step Number */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#009775] to-[#6ac49a] flex items-center justify-center text-white font-bold text-lg">
                      {step.number}
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-[#009775] to-transparent" />
                  </div>

                  {/* Step Title */}
                  <h3 className="text-3xl lg:text-4xl font-bold mb-4 font-display text-white">
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="text-lg text-gray-400 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Icon */}
                  <div className="mt-8">
                    <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-[#009775]/20 to-[#6ac49a]/20 border border-[#009775]/30">
                      <Icon className="w-6 h-6 text-[#6ac49a]" />
                    </div>
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

"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import VideoEmbed, { VideoEmbedRef } from "./VideoEmbed";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<VideoEmbedRef>(null);

  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(
        textRef.current.children,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
        }
      );
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-20 px-4 sm:px-6 lg:px-8"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 gradient-animated opacity-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,151,117,0.1),transparent_50%)]" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,151,117,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,151,117,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            ref={textRef}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            >
              <span className="block text-white">Turn Watch Data</span>
              <span className="block bg-gradient-to-r from-[#009775] via-[#6ac49a] to-[#009775] bg-clip-text text-transparent glow-text">
                Into Real Growth
              </span>
            </motion.h1>

            {/* Description */}
            <motion.div
              variants={itemVariants}
              className="text-base sm:text-lg text-gray-300 leading-relaxed space-y-3"
            >
              <p>
                Deep engagement insights that show{" "}
                <span className="text-[#6ac49a] font-semibold">exactly</span> what keeps viewers
                watching and what loses them.
              </p>
              <ul className="space-y-2 list-none">
                <li className="flex items-start gap-2">
                  <span className="text-[#6ac49a] mt-1">•</span>
                  <span>Timestamped actionable recommendations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#6ac49a] mt-1">•</span>
                  <span>Interactive viewer drop-off analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#6ac49a] mt-1">•</span>
                  <span>Identify what's working & what needs fixing</span>
                </li>
              </ul>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <motion.a
                href="#signup"
                className="group relative px-8 py-4 bg-gradient-to-r from-[#009775] to-[#6ac49a] rounded-lg font-semibold text-white text-lg overflow-hidden flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Get Started</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#007158] to-[#009775]"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>

              <motion.button
                type="button"
                onClick={() => {
                  videoRef.current?.play();
                }}
                className="px-8 py-4 border-2 border-[#009775]/50 rounded-lg font-semibold text-[#6ac49a] text-lg backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all flex items-center justify-center"
                whileHover={{ scale: 1.02, borderColor: "rgba(0, 151, 117, 0.8)" }}
                whileTap={{ scale: 0.98 }}
              >
                Watch Demo
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Side - Video */}
          <motion.div
            id="demo"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <VideoEmbed ref={videoRef} videoId="7VAUDImpqGQ" className="shadow-2xl" />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-[#6ac49a]/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-[#6ac49a] rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  );
}


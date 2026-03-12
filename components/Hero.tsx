"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const demoVideoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [demoOpen, setDemoOpen] = useState(false);

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

  // Ensure video autoplays when loaded (muted by default)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const play = () => video.play().catch(() => {});
    if (video.readyState >= 2) play();
    else video.addEventListener("loadeddata", play);
    return () => video.removeEventListener("loadeddata", play);
  }, []);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !isMuted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted) video.play().catch(() => { video.muted = true; setIsMuted(true); });
  };

  const closeDemoModal = () => {
    demoVideoRef.current?.pause();
    setDemoOpen(false);
  };

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

  const taglines = [
    { line1: "Turn Watch Data", line2: "Into Real Growth" },
    { line1: "Stop Guessing", line2: "Start Growing" },
  ];
  const [taglineIndex, setTaglineIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(
      () => setTaglineIndex((i) => (i + 1) % taglines.length),
      4000
    );
    return () => clearInterval(t);
  }, [taglines.length]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-20 px-4 sm:px-6 lg:px-8"
    >
      {/* Demo video modal */}
      <AnimatePresence>
        {demoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Watch demo video"
          >
            <button
              type="button"
              onClick={closeDemoModal}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
              aria-label="Close modal"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-4xl rounded-2xl overflow-hidden border border-[#009775]/20 bg-[var(--surface-2)] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeDemoModal}
                aria-label="Close"
                className="absolute top-3 right-3 z-10 rounded-full p-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
              <div className="relative aspect-video bg-black">
                <video
                  ref={demoVideoRef}
                  src="/OyanaDemo.mp4"
                  className="w-full h-full object-contain"
                  controls
                  playsInline
                  onEnded={() => demoVideoRef.current?.pause()}
                  aria-label="Oyana demo video"
                />
              </div>
              <div className="flex items-center justify-between gap-3 px-4 py-3 border-t border-white/10 bg-black/30">
                <span className="text-sm text-[var(--text-muted)]">Oyana Demo</span>
                <button
                  type="button"
                  onClick={closeDemoModal}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-white/90 bg-white/10 hover:bg-[#009775]/30 border border-white/10 hover:border-[#009775]/40 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
            {/* Headline - rotating taglines */}
            <motion.div
              variants={itemVariants}
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight min-h-[2.5em] flex flex-col justify-center overflow-hidden"
              aria-live="polite"
            >
              <AnimatePresence mode="wait">
                <motion.h1
                  key={taglineIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col"
                >
                  <span className="block text-white">
                    {taglines[taglineIndex].line1}
                  </span>
                  <span className="block bg-gradient-to-r from-[#009775] via-[#6ac49a] to-[#009775] bg-clip-text text-transparent glow-text">
                    {taglines[taglineIndex].line2}
                  </span>
                </motion.h1>
              </AnimatePresence>
            </motion.div>

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
                className="group relative px-8 py-4 bg-gradient-to-r from-[#009775] to-[#6ac49a] rounded-lg font-semibold text-white text-lg overflow-hidden flex items-center justify-center cursor-pointer"
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
                onClick={() => setDemoOpen(true)}
                className="px-8 cursor-pointer py-4 border-2 border-[#009775]/50 rounded-lg font-semibold text-[#6ac49a] text-lg backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all flex items-center justify-center"
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
            className="relative rounded-xl overflow-hidden shadow-2xl"
          >
            <video
              ref={videoRef}
              src="/OyanaPreviewVideo.mp4"
              className="w-full aspect-video object-cover"
              autoPlay
              muted
              loop
              playsInline
              onLoadedData={(e) => e.currentTarget.play().catch(() => {})}
              aria-label="Oyana preview"
            />
            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute video" : "Mute video"}
              className="absolute bottom-3 left-3 z-10 rounded-lg px-3 py-2 text-sm font-medium flex items-center gap-2 transition-colors bg-black/50 text-white/90 hover:bg-black/70 hover:text-white backdrop-blur-sm cursor-pointer"
            >
              {isMuted ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M16.5 12c0-1.77-.77-3.36-2-4.47v8.94c1.23-1.11 2-2.7 2-4.47zm3.5 0c0 2.89-1.64 5.39-4.03 6.65l-1.2-1.6C16.86 16.04 18 14.14 18 12s-1.14-4.04-3.23-5.05l1.2-1.6C18.36 6.61 20 9.11 20 12zM3 9v6h4l5 5V4L7 9H3z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-.77-3.36-2-4.47v8.94c1.23-1.11 2-2.7 2-4.47zm3.5 0c0 2.89-1.64 5.39-4.03 6.65l-1.2-1.6C16.86 16.04 18 14.14 18 12s-1.14-4.04-3.23-5.05l1.2-1.6C18.36 6.61 20 9.11 20 12z" />
                </svg>
              )}
              <span className="sr-only sm:not-sr-only sm:inline">{isMuted ? "Unmute" : "Mute"}</span>
            </button>
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


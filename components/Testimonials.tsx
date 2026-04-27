"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { FiYoutube } from "react-icons/fi";

type Testimonial = {
  name?: string;
  role: string;
  avatar: string;
  quote: string;
  youtube?: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Ivy Prosper",
    role: "YouTube Creator",
    avatar: "\uD83C\uDFAC",
    quote:
      "The Oyana site was very good at analyzing my videos. It\u2019s amazing how it revealed some of the issues with my video engagement that I had been aware of, even having discussions with my editors on how we can improve the videos. So having a website that uses data was really good. I especially love the details of suggestions at certain time codes. It dives deeper than the YouTube Studio data when it comes to answering questions about audience engagement.",
    youtube: "https://www.youtube.com/c/IvyProsper",
  },
  {
    name: "Tyler",
    role: "Creator",
    avatar: "\uD83C\uDFA5",
    quote:
      "Yes, it is a pretty cool platform! Thank you for creating it!",
  },
  {
    role: "Content & Growth Strategist",
    avatar: "\uD83D\uDCC8",
    quote:
      "I saw a 30% retention increase after I implemented a few of the recommendations from Oyana.",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 10000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--subtle-bg)] to-transparent" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-center text-foreground">
            Trusted by Creators <br /> Who{" "}
            <span className="bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] bg-clip-text text-transparent">
              Actually Grow
            </span>{" "}
          </h2>
          <p className="text-base text-body text-center">
            See how content creators are using Oyana to maximize their watch time and grow their channels.
          </p>
        </motion.div>

        <div
          className="rounded-2xl overflow-hidden"
          style={{
            border: "1px solid var(--card-border)",
            backgroundColor: "var(--card-bg)",
          }}
        >
          {/* Quote area */}
          <div className="relative h-[240px] sm:h-[200px] p-8 sm:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute inset-0 p-8 sm:p-10 flex items-center gap-4"
              >
                <svg
                  className="w-7 h-7 shrink-0 mt-0.5 opacity-40"
                  style={{ color: "var(--primary)" }}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h3.983v10h-9.984z" />
                </svg>
                <p className="text-sm sm:text-base text-body leading-relaxed">
                  {testimonials[current].quote}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Author row */}
          <div className="px-8 sm:px-10 py-5 flex items-center gap-3" style={{ borderTop: "1px solid var(--border-subtle)" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-3 flex-1 min-w-0"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--gradient-start)] to-[var(--gradient-end)] flex items-center justify-center text-lg shrink-0">
                  {testimonials[current].avatar}
                </div>
                <div className="min-w-0">
                  {testimonials[current].name && (
                    <div className="text-foreground font-medium text-sm">
                      {testimonials[current].name}
                    </div>
                  )}
                  <div className="text-muted text-xs">
                    {testimonials[current].role}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            {testimonials.length > 1 && (
              <div className="flex gap-1.5 mx-auto">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setCurrent(i)}
                    className="h-1.5 rounded-full transition-all duration-300 cursor-pointer"
                    style={{
                      width: i === current ? "1.5rem" : "0.75rem",
                      backgroundColor: i === current ? "var(--primary)" : "var(--dot-inactive)",
                    }}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
            )}

            {/* YouTube link */}
            <div className="shrink-0 w-20 flex justify-end">
              <AnimatePresence mode="wait">
                {testimonials[current].youtube && (
                  <motion.a
                    key={current}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    href={testimonials[current].youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-accent-text hover:text-foreground transition-colors"
                  >
                    <FiYoutube className="w-3.5 h-3.5" />
                    <span>YouTube</span>
                  </motion.a>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

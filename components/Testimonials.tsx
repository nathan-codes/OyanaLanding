"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Tech Reviewer, 2.3M subscribers",
    avatar: "👩‍💻",
    quote:
      "Oyana transformed how I understand my audience. The engagement insights showed me exactly where my intros were losing people—I fixed that and saw a 40% increase in average watch time.",
    stat: "+40% watch time",
  },
  {
    name: "Marcus Johnson",
    role: "Gaming Creator, 850K subscribers",
    avatar: "🎮",
    quote:
      "The drop-off insights are incredible. I discovered that my mid-roll ads were killing engagement. After restructuring, my retention improved dramatically.",
    stat: "+65% retention",
  },
  {
    name: "Emma Rodriguez",
    role: "Educational Content, 1.1M subscribers",
    avatar: "📚",
    quote:
      "Finally, analytics that make sense. The visual data helps me explain to my team exactly what's working. Our channel growth has been steady since using Oyana.",
    stat: "+180% growth",
  },
  {
    name: "Alex Kim",
    role: "Lifestyle Vlogger, 450K subscribers",
    avatar: "✨",
    quote:
      "The smart recommendations feature is like having a data scientist on my team. It's helped me optimize thumbnails, hooks, and pacing in ways I never would have thought of.",
    stat: "+55% engagement",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#009775]/5 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-center">
            Trusted by Creators Who{" "}
            <span className="bg-gradient-to-r from-[#009775] to-[#6ac49a] bg-clip-text text-transparent">
              Actually Grow
            </span>
          </h2>
          <p className="text-lg text-gray-400 text-center">
            See how content creators are using Oyana to maximize their watch time and grow their channels.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <div className="overflow-hidden rounded-2xl">
            <motion.div
              className="flex"
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="min-w-full px-4">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-sm border border-[#009775]/20 rounded-2xl p-8 lg:p-12"
                  >
                    {/* Quote */}
                    <div className="mb-8">
                      <svg
                        className="w-12 h-12 text-[#6ac49a]/50 mb-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h3.983v10h-9.984z" />
                      </svg>
                      <p className="text-xl lg:text-2xl text-gray-200 leading-relaxed">
                        {testimonial.quote}
                      </p>
                    </div>

                    {/* Author Info */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#009775] to-[#6ac49a] flex items-center justify-center text-3xl">
                          {testimonial.avatar}
                        </div>
                        <div>
                          <div className="font-semibold text-lg text-white">
                            {testimonial.name}
                          </div>
                          <div className="text-gray-400">{testimonial.role}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold bg-gradient-to-r from-[#009775] to-[#6ac49a] bg-clip-text text-transparent">
                          {testimonial.stat}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <motion.button
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-gray-800/50 border border-[#009775]/20 text-[#6ac49a] hover:bg-[#009775]/20 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiChevronLeft className="w-6 h-6" />
            </motion.button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-[#6ac49a] w-8"
                      : "bg-gray-600 hover:bg-gray-500"
                  }`}
                />
              ))}
            </div>

            <motion.button
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-gray-800/50 border border-[#009775]/20 text-[#6ac49a] hover:bg-[#009775]/20 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}


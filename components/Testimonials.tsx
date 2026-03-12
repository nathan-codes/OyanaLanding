"use client";

import { motion } from "framer-motion";

const testimonial = {
  // Name intentionally omitted; we only describe the creator type
  role: "Content & Growth Strategist for Creators ",
  avatar: "📈",
  quote:
    "I saw a 30% retention increase after I implemented a few of the recommendations from Oyana.",
  stat: "+30% retention",
};

export default function Testimonials() {

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#009775]/5 to-transparent" />

      <div className="max-w-6xl mx-auto">
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

        {/* Single Testimonial Card (Abayomi-style) */}
        <div className="relative">
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

            {/* Creator Info (no personal name) */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#009775] to-[#6ac49a] flex items-center justify-center text-3xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="text-gray-400">
                    {testimonial.role}
                  </div>
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
      </div>
    </section>
  );
}


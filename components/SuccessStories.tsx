"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FiTrendingUp, FiUsers, FiClock } from "react-icons/fi";

const stories = [
  {
    creator: "TechFlow",
    category: "Technology",
    before: { watchTime: "2.1M", subscribers: "125K" },
    after: { watchTime: "5.8M", subscribers: "340K" },
    growth: { watchTime: "+176%", subscribers: "+172%" },
    period: "6 months",
    color: "from-[#009775] to-[#6ac49a]",
  },
  {
    creator: "GamingHub",
    category: "Gaming",
    before: { watchTime: "890K", subscribers: "45K" },
    after: { watchTime: "3.2M", subscribers: "180K" },
    growth: { watchTime: "+260%", subscribers: "+300%" },
    period: "4 months",
    color: "from-[#007158] to-[#009775]",
  },
  {
    creator: "LearnFast",
    category: "Education",
    before: { watchTime: "1.5M", subscribers: "89K" },
    after: { watchTime: "4.9M", subscribers: "245K" },
    growth: { watchTime: "+227%", subscribers: "+175%" },
    period: "8 months",
    color: "from-[#6ac49a] to-[#009775]",
  },
];

function AnimatedNumber({ value, suffix = "" }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <span ref={ref} className="inline-block">
      {isInView && (
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {value}
          {suffix}
        </motion.span>
      )}
    </span>
  );
}

export default function SuccessStories() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#009775]/5 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-center">
            Real Results from{" "}
            <span className="bg-gradient-to-r from-[#009775] to-[#6ac49a] bg-clip-text text-transparent">
              Real Creators
            </span>
          </h2>
          <p className="text-lg text-gray-400 text-center">
            See how creators are using Oyana to achieve remarkable growth in watch time and subscribers.
          </p>
        </motion.div>

        {/* Success Stories Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <motion.div
              key={story.creator}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative p-8 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-sm border border-[#009775]/20 hover:border-[#009775]/40 transition-all h-full">
                {/* Category Badge */}
                <div className="inline-block mb-4 px-3 py-1 rounded-full bg-[#009775]/20 text-[#6ac49a] text-sm font-semibold">
                  {story.category}
                </div>

                {/* Creator Name */}
                <h3 className="text-2xl font-bold mb-6 font-display">{story.creator}</h3>

                {/* Stats Comparison */}
                <div className="space-y-6 mb-6">
                  {/* Watch Time */}
                  <div>
                    <div className="flex items-center gap-2 mb-2 text-gray-400 text-sm">
                      <FiClock className="w-4 h-4" />
                      <span>Watch Time</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-gray-500 line-through text-lg">
                        {story.before.watchTime}
                      </span>
                      <span className="text-2xl font-bold text-white">
                        <AnimatedNumber value={story.after.watchTime} />
                      </span>
                      <span
                        className={`text-sm font-semibold bg-gradient-to-r ${story.color} bg-clip-text text-transparent`}
                      >
                        {story.growth.watchTime}
                      </span>
                    </div>
                  </div>

                  {/* Subscribers */}
                  <div>
                    <div className="flex items-center gap-2 mb-2 text-gray-400 text-sm">
                      <FiUsers className="w-4 h-4" />
                      <span>Subscribers</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-gray-500 line-through text-lg">
                        {story.before.subscribers}
                      </span>
                      <span className="text-2xl font-bold text-white">
                        <AnimatedNumber value={story.after.subscribers} />
                      </span>
                      <span
                        className={`text-sm font-semibold bg-gradient-to-r ${story.color} bg-clip-text text-transparent`}
                      >
                        {story.growth.subscribers}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Period */}
                <div className="pt-6 border-t border-gray-700/50">
                  <div className="flex items-center gap-2 text-gray-400">
                    <FiTrendingUp className="w-4 h-4" />
                    <span className="text-sm">In {story.period}</span>
                  </div>
                </div>

                {/* Hover glow */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${story.color} opacity-0 group-hover:opacity-10 transition-opacity -z-10`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


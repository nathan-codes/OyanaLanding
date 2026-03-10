"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Animated line chart component
function AnimatedLineChart() {
  const svgRef = useRef<SVGSVGElement>(null);
  const isInView = useInView(svgRef, { once: true });

  const data = [
    { x: 0, y: 60 },
    { x: 20, y: 45 },
    { x: 40, y: 70 },
    { x: 60, y: 55 },
    { x: 80, y: 85 },
    { x: 100, y: 75 },
  ];

  const path = data
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${100 - p.y}`)
    .join(" ");

  const areaPath = `${path} L 100 100 L 0 100 Z`;

  return (
    <svg ref={svgRef} viewBox="0 0 100 100" className="w-full h-64">
      <defs>
        <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>

      {/* Area */}
      <motion.path
        d={areaPath}
        fill="url(#areaGradient)"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
      />

      {/* Line */}
      <motion.path
        d={path}
        fill="none"
        stroke="url(#lineGradient)"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      {/* Data points */}
      {data.map((point, i) => (
        <motion.circle
          key={i}
          cx={point.x}
          cy={100 - point.y}
          r="2"
          fill="#6366f1"
          initial={{ scale: 0, opacity: 0 }}
          animate={
            isInView
              ? { scale: 1, opacity: 1 }
              : { scale: 0, opacity: 0 }
          }
          transition={{ delay: i * 0.1 + 0.5, duration: 0.3 }}
        />
      ))}
    </svg>
  );
}

// Animated bar chart
function AnimatedBarChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });

  const bars = [
    { height: 40, label: "Mon" },
    { height: 65, label: "Tue" },
    { height: 50, label: "Wed" },
    { height: 80, label: "Thu" },
    { height: 70, label: "Fri" },
    { height: 90, label: "Sat" },
    { height: 75, label: "Sun" },
  ];

  return (
    <div ref={containerRef} className="flex items-end justify-between h-64 gap-2">
      {bars.map((bar, i) => (
        <div key={i} className="flex-1 flex flex-col items-center">
          <motion.div
            className="w-full bg-gradient-to-t from-purple-600 via-pink-500 to-rose-500 rounded-t"
            initial={{ height: 0 }}
            animate={isInView ? { height: `${bar.height}%` } : { height: 0 }}
            transition={{
              duration: 0.8,
              delay: i * 0.1,
              ease: "easeOut",
            }}
          />
          <span className="mt-2 text-xs text-gray-400">{bar.label}</span>
        </div>
      ))}
    </div>
  );
}

// Circular progress visualization
function CircularProgress({ value, label }: { value: number; label: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const isInView = useInView(svgRef, { once: true });

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg ref={svgRef} width="120" height="120" className="transform -rotate-90">
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="rgba(99, 102, 241, 0.2)"
          strokeWidth="8"
          fill="none"
        />
        <motion.circle
          cx="60"
          cy="60"
          r={radius}
          stroke="url(#progressGradient)"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={
            isInView ? { strokeDashoffset: offset } : { strokeDashoffset: circumference }
          }
          transition={{ duration: 1.5, ease: "easeInOut" }}
          strokeDasharray={circumference}
        />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
      <div className="mt-4 text-center">
        <div className="text-3xl font-bold text-white">{value}%</div>
        <div className="text-sm text-gray-400">{label}</div>
      </div>
    </div>
  );
}

export default function DataVisualizations() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            Data That{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Tells a Story
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Beautiful, interactive visualizations that make complex analytics easy to understand
            and act upon.
          </p>
        </motion.div>

        {/* Visualizations Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Line Chart */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-sm border border-indigo-500/20"
          >
            <h3 className="text-xl font-bold mb-6 font-display">Watch Time Trend</h3>
            <AnimatedLineChart />
          </motion.div>

          {/* Bar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-8 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-sm border border-indigo-500/20"
          >
            <h3 className="text-xl font-bold mb-6 font-display">Weekly Engagement</h3>
            <AnimatedBarChart />
          </motion.div>
        </div>

        {/* Progress Indicators */}
        <div className="grid sm:grid-cols-3 gap-8">
          {[
            { value: 87, label: "Average Retention" },
            { value: 92, label: "Engagement Rate" },
            { value: 78, label: "Watch Time Growth" },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-sm border border-indigo-500/20"
            >
              <CircularProgress value={item.value} label={item.label} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


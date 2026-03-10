"use client";

import { motion } from "framer-motion";
import { FiCheck, FiZap, FiTrendingUp, FiAward } from "react-icons/fi";

const tiers = [
  {
    name: "Annual",
    price: "$399",
    period: "per year",
    icon: FiTrendingUp,
    description: "Best value for long-term creators (after lifetime closes)",
    color: "from-[#007158] to-[#009775]",
    features: [
      "Unlimited video analysis",
      "Top recommendations with timestamped fixes",
      "AI-powered recommendations",
      "Priority support",
      "Exportable reports",
      "Multi-channel tracking",
    ],
    highlight: false,
  },
  {
    name: "Lifetime",
    price: "$399",
    period: "one-time payment",
    icon: FiZap,
    description:
      "Lock in lifetime access before we switch to subscription-only",
    color: "from-[#009775] to-[#6ac49a]",
    features: [
      "Unlimited video analysis",
      "Top recommendations with timestamped fixes",
      "AI-powered recommendations",
      "Priority support",
      "Exportable reports",
      "Multi-channel tracking",
      "All future features included",
    ],
    highlight: true,
    badge: "Limited Availability",
  },
  {
    name: "Monthly",
    price: "$59-$99",
    period: "per month",
    icon: FiAward,
    description: "Flexible monthly subscription for growing creators",
    color: "from-[#6ac49a] to-[#009775]",
    features: [
      "Unlimited video analysis",
      "Top recommendations with timestamped fixes",
      "AI-powered recommendations",
      "Email support",
      "Exportable reports",
      "Single channel tracking",
    ],
    highlight: false,
  },
];

export default function BenefitsMatrix() {
  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#009775]/5 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,151,117,0.05),transparent_70%)]" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-center">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-[#009775] to-[#6ac49a] bg-clip-text text-transparent">
              Growth Path
            </span>
          </h2>
          <p className="text-lg text-gray-400 text-center">
            Flexible plans designed to scale with your channel. Lock in lifetime
            access before we switch to subscription-only.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {tiers.map((tier, index) => {
            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative h-full"
              >
                <div
                  className={`relative p-8 lg:p-10 rounded-2xl bg-gradient-to-br from-gray-900/90 to-gray-800/60 backdrop-blur-sm border transition-all h-full flex flex-col min-h-[520px] ${
                    tier.highlight
                      ? "border-[#009775] shadow-2xl shadow-[#009775]/30"
                      : "border-[#009775]/30 hover:border-[#009775]/60 hover:shadow-xl hover:shadow-[#009775]/10"
                  }`}
                >
                  {/* Highlight Badge */}
                  {tier.highlight && tier.badge && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#009775] to-[#6ac49a] text-white text-xs font-bold uppercase tracking-wide shadow-lg z-10">
                      {tier.badge}
                    </div>
                  )}

                  {/* Tier Name */}
                  <h3 className="text-2xl lg:text-3xl font-bold mb-4 font-display text-white">
                    {tier.name}
                  </h3>

                  {/* Price */}
                  <div className="mb-4">
                    <span className="text-5xl lg:text-6xl font-bold text-white">
                      {tier.price}
                    </span>
                    <span className="text-gray-400 text-sm lg:text-base ml-2 block mt-2">
                      {tier.period}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 mb-8 text-sm lg:text-base leading-relaxed">
                    {tier.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-3.5 flex-1 mb-2">
                    {tier.features.map((feature, featureIndex) => (
                      <motion.li
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: index * 0.1 + featureIndex * 0.05,
                        }}
                        className="flex items-center gap-2.5"
                      >
                        <div
                          className={`flex-shrink-0 w-3.5 h-3.5 rounded-full bg-gradient-to-br ${tier.color} flex items-center justify-center shadow-sm`}
                        >
                          <FiCheck className="w-2 h-2 text-white" />
                        </div>
                        <span className="text-gray-300 text-xs lg:text-sm leading-tight">
                          {feature}
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <motion.a
                    href="#signup"
                    className={`block w-full py-4 rounded-xl font-semibold text-center transition-all ${
                      tier.highlight
                        ? "bg-gradient-to-r from-[#009775] to-[#6ac49a] text-white hover:shadow-lg hover:shadow-[#009775]/50 hover:scale-[1.02]"
                        : "bg-white/10 text-white border border-[#009775]/40 hover:bg-white/20 hover:border-[#009775]/60"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get Started
                  </motion.a>

                  {/* Hover Glow Effect */}
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${tier.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 -z-10`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12 text-gray-400"
        >
          <p className="text-center">
            All plans include a 14-day free trial. No credit card required.{" "}
            <a
              href="#"
              className="text-[#6ac49a] hover:text-[#009775] underline"
            >
              Compare plans
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

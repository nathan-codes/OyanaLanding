"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TeamSection from "@/components/TeamSection";
import RequestInviteModal from "@/components/RequestInviteModal";
import {
  FiMessageSquare,
  FiActivity,
  FiUserCheck,
  FiArrowRight,
} from "react-icons/fi";

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: {
    transition: { staggerChildren: 0.1 },
  },
};

const values = [
  {
    icon: FiActivity,
    title: "Retention Is A Signal",
    description:
      "Retention isn\u2019t a mystery; it\u2019s a signal. Every drop, every skip, every replay tells you something about what your audience felt in that moment. We get to know you and, over time, what resonates with your audience.",
  },
  {
    icon: FiUserCheck,
    title: "Human Support Matters",
    description:
      "Not everything has to be AI and there\u2019s value in human interaction. Oyana Circle, your concierge, is enabled with AI tools to further help you.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <RequestInviteModal />
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 gradient-animated opacity-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(0,151,117,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,151,117,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,151,117,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-8"
          >
            Every creator has a story to tell.
            <span className="bg-gradient-to-r from-[#009775] via-[#6ac49a] to-[#009775] bg-clip-text text-transparent glow-text">
              {" "}Oyana helps you tell it so everyone listens.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-lg md:text-xl text-gray-300 leading-relaxed text-center"
          >
            We built Oyana because creators and agencies told us the same thing:
            they wish they knew{" "}
            <span className="font-extrabold text-[#6ac49a]">
              why viewers left
            </span>
            , not just the numbers.
          </motion.p>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={fadeInUp.initial}
            whileInView={fadeInUp.animate}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-center">
              We{" "}
              <span className="bg-gradient-to-r from-[#009775] to-[#6ac49a] bg-clip-text text-transparent">
                Believe
              </span>
            </h2>
            <p className="text-lg text-gray-400 text-center">
              In our name Oyana, which means to inspire and uplift, we aim to
              be the editor-coach working alongside creators and agencies.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-60px" }}
            className="grid sm:grid-cols-2 gap-6 lg:gap-8"
          >
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  variants={fadeInUp}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group relative rounded-2xl p-8 md:p-10 border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:border-[#009775]/30 transition-all duration-500"
                >
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-[#009775]/[0.04] to-transparent" />

                  <div className="relative">
                    <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-[#009775] to-[#6ac49a] mb-5 shadow-lg">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 font-display">
                      {v.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {v.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Team ── */}
      <TeamSection
        title="Meet The Team"
        subtitle="We have shipped products inside YouTube, Amazon, and Google, designed systems that handle massive scale, created companies, and supported creators across Africa leading to the founding of Oyana."
      />

      {/* ── CTA ── */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 gradient-animated opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,151,117,0.25),transparent_70%)]" />

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-8">
              Ready to See What Your{" "}
              <span className="bg-gradient-to-r from-[#009775] via-[#6ac49a] to-[#009775] bg-clip-text text-transparent glow-text">
                Audience
              </span>{" "}
              Really Thinks?
            </h2>
            <p className="text-lg text-gray-300 mb-10 text-center max-w-2xl mx-auto leading-relaxed">
              <span className="font-bold text-white">Oyana is built for YouTube creators and their teams.</span>{" "}
              We use the YouTube API to securely access your video captions, retention metrics, and audience data to give you{" "}
              <span className="font-bold text-white">timestamped, actionable recommendations</span>{" "}
              to increase your viewership.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                type="button"
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent("open-invite-modal", { detail: {} })
                  )
                }
                className="px-8 py-4 bg-gradient-to-r from-[#009775] to-[#6ac49a] rounded-lg font-semibold text-white text-lg flex items-center gap-2 hover:shadow-lg hover:shadow-[#009775]/50 transition-all cursor-pointer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span>Get Early Access</span>
                <FiArrowRight className="w-5 h-5" />
              </motion.button>

              <Link
                href="mailto:oyana@oyana.ai"
                className="px-8 py-4 border-2 border-[#009775]/50 rounded-lg font-semibold text-[#6ac49a] text-lg backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all inline-flex items-center gap-2"
              >
                <FiMessageSquare className="w-5 h-5" />
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

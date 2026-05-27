"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InviteSuccessContent from "@/components/InviteSuccessContent";

export default function SuccessPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <section className="flex-1 flex items-center justify-center px-4 py-24 md:py-32">
        <div className="absolute inset-0 gradient-animated opacity-10 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,var(--glow-color),transparent_60%)] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-lg rounded-2xl backdrop-blur-xl shadow-2xl"
          style={{
            border: "1px solid var(--nav-border)",
            backgroundColor: "var(--modal-bg)",
            boxShadow: "0 25px 50px -12px var(--glow-color)",
          }}
        >
          <InviteSuccessContent />

          <div className="px-6 pb-8 -mt-4">
            <Link
              href="/"
              className="block w-full py-3.5 rounded-xl bg-linear-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] font-semibold text-white text-sm text-center hover:shadow-lg transition-all"
              style={{ boxShadow: "0 4px 14px var(--glow-color)" }}
            >
              Back to Home
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}

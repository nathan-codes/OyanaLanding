"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export default function WaitlistNewPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14 md:py-20">
        <div className="grid min-h-[70vh] items-center gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 text-zinc-900">
              <div className="h-7 w-7 rounded-md bg-zinc-900/90" />
              <span className="text-2xl font-semibold">Oyana</span>
            </div>

            <h1 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight text-zinc-900 md:text-5xl">
              Turn viewers into fans.
              <span className="block md:inline"> </span>
              <span className="text-emerald-700 underline decoration-4 underline-offset-4 decoration-emerald-600">
                Boost retention with Oyana.
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-base md:text-lg text-zinc-600">
              See where attention drops, why it happens, and exactly how to fix
              it—so more people watch to the end.
            </p>

            <motion.ul
              className="mt-5 grid max-w-xl gap-3 text-zinc-700"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.08 } },
              }}
            >
              {[
                "Second‑by‑second attention heatmaps",
                "Editor‑ready fixes for hooks, pacing and visuals",
                "Impact score tells you what to fix first",
                "Works with your YouTube video + transcript",
              ].map((item) => (
                <motion.li
                  key={item}
                  variants={{
                    hidden: { opacity: 0, y: 8 },
                    show: { opacity: 1, y: 0 },
                  }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-black text-xs">
                    ✓
                  </span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>

            <form onSubmit={handleSubmit} className="mt-7 flex max-w-md gap-2">
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="you@youremail.com"
                className="h-12 bg-white text-zinc-900 placeholder:text-zinc-400"
              />
              <Button
                type="submit"
                className="h-12 bg-primary text-black hover:brightness-105"
              >
                Join the waitlist
              </Button>
            </form>
            {submitted && (
              <div className="mt-3 text-primary">
                Thanks! We will notify you.
              </div>
            )}

            <div className="mt-4 flex items-center gap-4 text-zinc-500">
              <span className="text-sm">Follow us</span>
              <div className="h-5 w-5 rounded-full bg-zinc-200" />
              <div className="h-5 w-5 rounded-full bg-zinc-200" />
            </div>
          </motion.div>

          <motion.div
            className="relative h-full flex items-center"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          >
            <motion.div
              className="h-[78vh] w-[66vw] ml-auto"
              style={{ marginRight: "calc((100vw - 100%)/-2)" }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="h-full rounded-3xl border border-emerald-300 bg-gradient-to-br from-emerald-500 via-emerald-300 to-lime-300 p-6 shadow-[0_30px_80px_-20px_rgba(16,185,129,0.35)] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1200&auto=format&fit=crop"
                  alt="Dashboard preview"
                  width={2000}
                  height={1200}
                  priority
                  className="h-full w-full object-cover rounded-3xl overflow-hidden"
                  style={{ borderRadius: "inherit" }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

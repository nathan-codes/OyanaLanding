"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      variants={fadeUp}
      initial="initial"
      animate={inView ? "animate" : "initial"}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-transparent">
      <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-extrabold text-xl tracking-tight">
          <span className="text-primary">Oyana</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-white/70">
          <a href="#" className="hover:text-white transition-colors">
            About
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Feedback
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Community
          </a>
          <Link href="/waitlist" className="hover:text-white transition-colors">
            Waitlist
          </Link>
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-primary text-black hover:brightness-110">
                Request Invite
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-zinc-950/60 border-primary/30 backdrop-blur-lg rounded-2xl p-0 overflow-hidden">
              <div className="p-6">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-semibold">
                    Join the Oyana Private Beta
                  </DialogTitle>
                  <DialogDescription className="text-white/65">
                    Early access to AI retention insights and editor‑ready
                    action plans.
                  </DialogDescription>
                </DialogHeader>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const fd = new FormData(form);
                    const email = String(fd.get("email") || "");
                    console.log("waitlist:", email);
                    form.reset();
                  }}
                  className="mt-5 flex gap-3"
                >
                  <Input
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="bg-zinc-900 border-white/10 text-white h-12"
                  />
                  <Button
                    type="submit"
                    className="h-12 px-6 bg-primary text-black font-semibold hover:brightness-110"
                  >
                    Get Invite
                  </Button>
                </form>
              </div>
              <div className="h-px w-full bg-white/10" />
              <div className="p-4 text-center text-xs text-white/70">
                Limited invites weekly — secure your spot.
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-black/70 backdrop-blur">
          <div className="px-4 py-3 space-y-2 text-white/80">
            <a href="#" className="block">
              About
            </a>
            <a href="#" className="block">
              Feedback
            </a>
            <a href="#" className="block">
              Community
            </a>
            <Link href="/waitlist" className="block">
              Waitlist
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <div className="relative h-screen overflow-hidden bg-black">
      {/* Soft gradient aura */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(163,230,53,0.18),transparent_60%)]"
      />

      {/* Floating glow orbs */}
      <motion.div
        className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-primary/10 blur-2xl"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-20 right-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col">
        {/* Top spacing due to navbar */}
        <div className="pt-20 px-4 flex-1 flex items-center justify-center">
          <Section className="w-full text-center">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="text-5xl md:text-[64px] font-semibold tracking-tight leading-[1]"
            >
              Stop Losing Viewers. <br />
              <span className="text-primary">Grow Watch Time</span>.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl mx-auto"
            >
              Oyana analyzes your YouTube retention, pinpoints drop‑offs by
              second, and turns data into editor‑ready fixes for pacing,
              visuals, and hooks — so more viewers finish your videos.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className=" my-5 flex items-center justify-center gap-4"
            >
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="rounded-sm bg-primary text-black px-7 py-6 text-base font-semibold hover:brightness-110 shadow-[0_0_0_0_rgba(0,0,0,0)] hover:shadow-[0_8px_40px_-8px_rgba(163,230,53,.5)] transition-shadow">
                    Join Waitlist →
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-zinc-950/40 border-primary/30 backdrop-blur-2xl rounded-2xl p-0 overflow-hidden">
                  <div className="p-6">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-semibold">
                        Join the Oyana Private Beta
                      </DialogTitle>
                      <DialogDescription className="text-white/65">
                        Early access to AI retention insights and editor‑ready
                        action plans.
                      </DialogDescription>
                    </DialogHeader>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const form = e.target as HTMLFormElement;
                        const fd = new FormData(form);
                        const email = String(fd.get("email") || "");
                        console.log("waitlist:", email);
                        form.reset();
                      }}
                      className="mt-5 flex gap-3"
                    >
                      <Input
                        name="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        className="bg-zinc-900 border-white/10 text-white h-12"
                      />
                      <Button
                        type="submit"
                        className="h-12 px-6 bg-primary text-black font-semibold hover:brightness-110"
                      >
                        Get Invite
                      </Button>
                    </form>
                  </div>
                  <div className="h-px w-full bg-white/10" />
                  <div className="p-4 text-center text-xs text-white/70">
                    Limited invites weekly — secure your spot.
                  </div>
                </DialogContent>
              </Dialog>
              <button className="rounded-sm px-12 py-3 text-base bg-white/10 text-white hover:bg-white/15 transition">
                Explore
              </button>
            </motion.div>
          </Section>
        </div>

        {/* Bottom pinned preview */}
        <div className="relative px-4 pb-0">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 140,
              damping: 18,
              delay: 0.2,
            }}
            className="mx-auto w-full max-w-6xl rounded-2xl border border-primary/40 bg-zinc-900/70 backdrop-blur p-2 translate-y-[6vh]"
            style={{ boxShadow: "0 30px 120px -20px rgba(163,230,53,0.25)" }}
          >
            <div className="relative overflow-hidden rounded-xl">
              <img
                src="/images/DashboardPreview.PNG"
                alt="Oyana dashboard preview"
                className="w-full h-[52vh] object-cover object-top"
              />
              {/* Removed dark overlay to make preview brighter and clearer */}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Single-screen design: Sections below removed

// No footer on single-screen layout

export default function OyanaLanding() {
  return (
    <div className="min-h-screen bg-black">
      <Nav />
      <main>
        <Hero />
      </main>
    </div>
  );
}

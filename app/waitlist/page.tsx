"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Image from "next/image";

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!email) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          source: "waitlist",
          type: "waitlist",
        }),
      });

      if (response.ok) {
        toast.success("Welcome to Oyana! 🎉", {
          description: "We'll notify you when we launch.",
        });
        setSubmitted(true);
        setEmail("");
      } else {
        const errorData = await response.json();
        toast.error("Failed to join waitlist", {
          description: errorData.error || "Please try again.",
        });
        setError(errorData.error || "Failed to sign up");
      }
    } catch (err) {
      toast.error("Network error", {
        description: "Please check your connection and try again.",
      });
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="mx-auto max-w-7xl px-4 pt-28 pb-16">
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <Image
            src="/images/OyanaFinalLogo.svg"
            alt="Oyana logo"
            width={200}
            height={48}
            className="h-10 w-auto md:h-12"
            priority
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white">
            Turn Watch Data Into{" "}
            <span className="text-primary">Watch Time</span>.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl">
            Oyana reveals exactly where viewers drop off — and gives you
            editor-ready fixes to keep them hooked.
          </p>
          <div className="mt-8 flex max-w-md gap-2">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="bg-zinc-900 border-white/10 text-white"
            />
            <Button
              onClick={handleSubmit}
              disabled={isLoading || !email.trim()}
              className={`${
                !email.trim() ? "cursor-not-allowed" : ""
              } bg-primary text-black hover:brightness-110`}
            >
              {isLoading ? "Adding you to the waitlist" : "Join Waitlist"}
            </Button>
          </div>
          {submitted && (
            <div className="mt-3 text-primary">
              Thanks! We'll be in touch soon.
            </div>
          )}
          {error && <div className="mt-3 text-red-500">{error}</div>}
          <div className="mt-10">
            <a href="#demo" className="text-white/70 hover:text-white">
              Watch Demo
            </a>
          </div>
        </motion.div>

        <div className="mt-20">
          <h2 className="text-3xl md:text-5xl font-bold">
            Everything You Need to Boost Retention
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              "Pinpoint Drop-Offs",
              "Editor-Ready Fixes",
              "Persona-Based Insights",
              "AI-Powered Recommendations",
              "Seamless Workflow",
            ].map((t) => (
              <div
                key={t}
                className="rounded-2xl border border-white/10 bg-zinc-900 p-6"
              >
                <div className="h-8 w-8 rounded-md bg-primary/20 mb-4" />
                <h3 className="text-xl font-semibold">{t}</h3>
                <p className="mt-2 text-white/70">
                  {t === "Pinpoint Drop-Offs" &&
                    "Instantly see where viewers leave and why — down to the second."}
                  {t === "Editor-Ready Fixes" &&
                    "Specific, time-stamped suggestions for pacing, visuals, audio, and hooks."}
                  {t === "Persona-Based Insights" &&
                    "Understand how different audience types respond to your content."}
                  {t === "AI-Powered Recommendations" &&
                    "Action steps ranked by impact to guide your edits for maximum retention."}
                  {t === "Seamless Workflow" &&
                    "Upload your video & transcript — get a retention playbook in minutes."}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-3xl md:text-5xl font-bold">
            From Video to Retention Blueprint in 3 Steps
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                t: "Upload Your Video + Transcript",
                d: "Drag and drop your YouTube video and transcript into Oyana.",
              },
              {
                t: "Get a Retention Breakdown",
                d: "See heatmaps, drop-off zones, and retention scorecards.",
              },
              {
                t: "Apply Editor-Ready Fixes",
                d: "Implement precise improvements directly in your editing software.",
              },
            ].map((s, i) => (
              <div
                key={s.t}
                className="rounded-2xl border border-white/10 bg-zinc-900 p-6"
              >
                <div className="text-primary text-sm">Step {i + 1}</div>
                <div className="mt-2 text-xl font-semibold">{s.t}</div>
                <div className="mt-2 text-white/70">{s.d}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-2">
          {[
            {
              q: "I cut my average drop-off in half in just two videos.",
              a: "Ambitious African Tech Talent",
            },
            {
              q: "It told me exactly what to fix — timestamps, text styles, even voice pacing.",
              a: "Aspiring Software Engineer",
            },
          ].map((c) => (
            <div
              key={c.q}
              className="rounded-2xl border border-white/10 bg-zinc-900 p-8"
            >
              <p className="text-xl">“{c.q}”</p>
              <div className="mt-4 text-white/60">— {c.a}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

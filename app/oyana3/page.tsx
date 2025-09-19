"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function Oyana3Page() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-6 py-10 md:py-16">
        <div className="grid gap-10 md:grid-cols-2">
          {/* Left column */}
          <div className="pb-10 md:pb-0 md:pr-12 md:border-r border-zinc-200">
            <div className="text-zinc-900">
              <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight">
                All‑in‑one retention intelligence for your videos.
              </h1>
            </div>

            <div className="mt-8 space-y-8">
              <div>
                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-violet-600 text-white text-sm">
                    ✓
                  </span>
                  <div>
                    <div className="font-semibold text-zinc-900">
                      See the right moments, every time.
                    </div>
                    <p className="mt-2 text-zinc-600 text-sm md:text-base max-w-xl">
                      Second‑by‑second attention heatmaps with instant context,
                      so you know exactly where viewers drop and why.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-violet-600 text-white text-sm">
                    ✓
                  </span>
                  <div>
                    <div className="font-semibold text-zinc-900">
                      Ask Oyana what to fix.
                    </div>
                    <p className="mt-2 text-zinc-600 text-sm md:text-base max-w-xl">
                      AI turns your video + transcript into editor‑ready tasks —
                      hooks, pacing, visuals, b‑roll, captions — with
                      timestamps.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-violet-600 text-white text-sm">
                    ✓
                  </span>
                  <div>
                    <div className="font-semibold text-zinc-900">
                      Safe and secure.
                    </div>
                    <p className="mt-2 text-zinc-600 text-sm md:text-base max-w-xl">
                      Your videos and transcripts stay private. Export insights
                      — not raw content — to share with your team.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="md:pl-12 relative">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-900">
              Join our journey and
              <br className="hidden md:block" /> get early access
            </h2>
            <p className="mt-4 text-zinc-600 max-w-md">
              Join the waitlist to get early access to Oyana and turn more views
              into watch time.
            </p>

            {/* Avatars */}
            <div className="mt-6 flex -space-x-3">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div
                  key={i}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full ring-2 ring-white bg-zinc-200 overflow-hidden"
                >
                  <Image
                    src={`https://i.pravatar.cc/80?img=${i}`}
                    alt="avatar"
                    width={40}
                    height={40}
                  />
                </div>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={onSubmit} className="mt-8 space-y-3 max-w-md">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tell us your name..."
                className="h-12 border-violet-300 focus-visible:ring-violet-500"
              />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="h-12"
              />
              <Button
                type="submit"
                className="h-12 w-full bg-violet-600 hover:bg-violet-700"
              >
                Continue
              </Button>
              {submitted && (
                <div className="text-sm text-violet-700">
                  Thanks! We\'ll email you when we launch.
                </div>
              )}
            </form>

            <p className="mt-6 text-xs text-zinc-500 max-w-md">
              By clicking "continue" you agree to our
              <a className="underline decoration-dotted ml-1" href="#">
                Privacy Policy
              </a>
              <span className="mx-1">and</span>
              <a className="underline decoration-dotted" href="#">
                Terms of Use
              </a>
              .
            </p>

            {/* Decorative starburst */}
            <div className="pointer-events-none absolute -bottom-10 -right-6 opacity-60">
              <svg
                width="80"
                height="80"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g stroke="#8b5cf6" strokeWidth="2">
                  {Array.from({ length: 16 }).map((_, idx) => {
                    const angle = (idx * Math.PI) / 8;
                    const x = 50 + Math.cos(angle) * 40;
                    const y = 50 + Math.sin(angle) * 40;
                    return <line key={idx} x1="50" y1="50" x2={x} y2={y} />;
                  })}
                </g>
                <circle cx="50" cy="50" r="3" fill="#8b5cf6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

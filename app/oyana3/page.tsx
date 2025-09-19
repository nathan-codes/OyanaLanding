"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { toast } from "sonner";

export default function Oyana3Page() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setError("");

    // Show processing toast
    toast.loading("Processing your request...", {
      id: "signup-process",
    });

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          source: "oyana3",
          type: "waitlist",
        }),
      });

      if (response.ok) {
        // Simulate processing steps
        setTimeout(() => {
          toast.success("Email validated successfully!", {
            id: "signup-process",
          });
        }, 1000);

        setTimeout(() => {
          toast.success("Adding you to the waitlist...", {
            id: "signup-process",
          });
        }, 2000);

        setTimeout(() => {
          toast.success("Welcome to Oyana! 🎉", {
            id: "signup-process",
            description: "We'll notify you when we launch.",
          });
          setSubmitted(true);
          setEmail("");
          setName("");
        }, 3000);
      } else {
        const errorData = await response.json();
        toast.error("Failed to join waitlist", {
          id: "signup-process",
          description: errorData.error || "Please try again.",
        });
        setError(errorData.error || "Failed to sign up");
      }
    } catch (err) {
      toast.error("Network error", {
        id: "signup-process",
        description: "Please check your connection and try again.",
      });
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header with Oyana branding */}
      <header className="fixed inset-x-0 top-0 z-50 bg-transparent">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <div className="font-extrabold text-xl tracking-tight">
            <span className="text-primary">Oyana</span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-20 md:py-24">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          {/* Left column */}
          <div className="pb-10 md:pb-0 md:pr-8 md:border-r border-white/10">
            <div className="text-white">
              <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight">
                All‑in‑one retention intelligence for your videos.
              </h1>
            </div>

            <div className="mt-8 space-y-8">
              <div>
                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-black text-sm">
                    ✓
                  </span>
                  <div>
                    <div className="font-semibold text-white">
                      See the right moments, every time.
                    </div>
                    <p className="mt-2 text-white/70 text-sm md:text-base max-w-xl">
                      Second‑by‑second attention heatmaps with instant context,
                      so you know exactly where viewers drop and why.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-black text-sm">
                    ✓
                  </span>
                  <div>
                    <div className="font-semibold text-white">
                      Ask Oyana what to fix.
                    </div>
                    <p className="mt-2 text-white/70 text-sm md:text-base max-w-xl">
                      AI turns your video + transcript into editor‑ready tasks —
                      hooks, pacing, visuals, b‑roll, captions — with
                      timestamps.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-black text-sm">
                    ✓
                  </span>
                  <div>
                    <div className="font-semibold text-white">
                      Safe and secure.
                    </div>
                    <p className="mt-2 text-white/70 text-sm md:text-base max-w-xl">
                      Your videos and transcripts stay private. Export insights
                      — not raw content — to share with your team.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="md:pl-8 relative">
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white">
              Join our journey and
              <br className="hidden md:block" /> get early access
            </h2>
            <p className="mt-4 text-white/70 max-w-md">
              Join the waitlist to get early access to Oyana and turn more views
              into watch time.
            </p>

            {/* Avatars */}
            <div className="mt-6 flex -space-x-3">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div
                  key={i}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full ring-2 ring-black bg-zinc-800 overflow-hidden"
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
                className="h-12 border-white/10 focus-visible:ring-primary bg-zinc-900 text-white placeholder:text-white/40"
              />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="h-12 border-white/10 bg-zinc-900 text-white placeholder:text-white/40"
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="h-12 w-full bg-primary text-black hover:brightness-110 disabled:opacity-50"
              >
                {isLoading ? "Joining..." : "Continue"}
              </Button>
              {submitted && (
                <div className="text-sm text-primary">
                  Thanks! We'll email you when we launch.
                </div>
              )}
              {error && <div className="text-sm text-red-500">{error}</div>}
            </form>

            <p className="mt-6 text-xs text-white/50 max-w-md">
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
                <g stroke="#a3e635" strokeWidth="2">
                  {Array.from({ length: 16 }).map((_, idx) => {
                    const angle = (idx * Math.PI) / 8;
                    const x = 50 + Math.cos(angle) * 40;
                    const y = 50 + Math.sin(angle) * 40;
                    return <line key={idx} x1="50" y1="50" x2={x} y2={y} />;
                  })}
                </g>
                <circle cx="50" cy="50" r="3" fill="#a3e635" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

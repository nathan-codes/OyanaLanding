"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { toast } from "sonner";
import TeamSection from "@/components/TeamSection";

export default function Oyana3Page() {
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
    <div className="min-h-screen" style={{ background: "var(--surface)" }}>
      {/* Header with Oyana branding */}
      <header className="relative lg:fixed inset-x-0 top-0 z-50 bg-transparent">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <div className="font-extrabold text-xl tracking-tight">
            <Image
              src="/images/OyanaFinalLogo.svg"
              alt="Oyana logo"
              width={170}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 pt-8 pb-16 md:py-24 min-h-screen flex items-start md:items-center">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16 w-full">
          {/* Left column */}
          <div className="order-2 md:order-1 pb-8 md:pb-0 md:pr-8 md:border-r border-white/10">
            <div className="text-white">
              <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight">
                Meet Oyana and discover hidden patterns in viewer behavior
              </h1>
            </div>

            <div className="mt-8 space-y-8">
              <div>
                <div className="flex items-start gap-3">
                  <span
                    className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full text-black text-sm"
                    style={{ background: "var(--silver-tree)" }}
                  >
                    ✓
                  </span>
                  <div>
                    <div className="font-semibold text-white">
                      Actionable insights
                    </div>
                    <p className="mt-2 text-zinc-300 text-sm md:text-base max-w-xl">
                      Boost retention without sacrificing creativity
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-start gap-3">
                  <span
                    className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full text-black text-sm"
                    style={{ background: "var(--silver-tree)" }}
                  >
                    ✓
                  </span>
                  <div>
                    <div className="font-semibold text-white">
                      Trustworthy partner
                    </div>
                    <p className="mt-2 text-zinc-300 text-sm md:text-base max-w-xl">
                      Combines technical expertise, reliability, and genuine
                      investment in your creative vision
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-start gap-3">
                  <span
                    className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full text-black text-sm"
                    style={{ background: "var(--silver-tree)" }}
                  >
                    ✓
                  </span>
                  <div>
                    <div className="font-semibold text-white">
                      Safe and secure.
                    </div>
                    <p className="mt-2 text-zinc-300 text-sm md:text-base max-w-xl">
                      Your videos and transcripts stay private. Export insights
                      - not raw content - to share with your team.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="order-1 md:order-2 md:pl-8 relative">
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white">
              Join other creators
              <br className="hidden md:block" /> and get early access
            </h2>
            <p className="mt-4 text-zinc-300 max-w-md">
              Join the waitlist to get early access to Oyana and turn more views
              into watch time.
            </p>

            {/* Avatars */}
            <div className="mt-6 flex items-center -space-x-3 md:-space-x-4">
              {[
                "/images/avatars/avatar1.png",
                "/images/avatars/avatar2.png",
                "/images/avatars/avatar3.png",
                "/images/avatars/avatar4.png",
                "/images/avatars/avatar5.png",
                "/images/avatars/avatar6.png",
              ].map((src, i) => (
                <div
                  key={src}
                  className="h-12 w-12 md:h-14 md:w-14 rounded-full overflow-hidden ring-2 ring-black/80 shadow-[0_6px_20px_rgba(0,0,0,0.35)]"
                  style={{ background: "#0f141a" }}
                >
                  <Image
                    src={src}
                    alt="creator avatar"
                    width={56}
                    height={56}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={onSubmit} className="mt-8 space-y-3 max-w-md">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="h-12 input placeholder:text-white/40"
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="h-12 w-full btn btn-primary disabled:opacity-50"
              >
                {isLoading ? "Joining..." : "Join the waitlist"}
              </Button>
              {submitted && (
                <div className="text-sm" style={{ color: "var(--gossamer)" }}>
                  Thanks! We'll email you when we launch.
                </div>
              )}
              {error && <div className="text-sm text-red-500">{error}</div>}
            </form>
          </div>
        </div>
      </div>
      {/* Meet the Team - under the fold */}
      {/* <TeamSection /> */}
    </div>
  );
}

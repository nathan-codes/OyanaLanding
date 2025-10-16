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
  const [emailError, setEmailError] = useState("");

  // Email validation function
  const validateEmail = (email: string): boolean => {
    // More strict email validation
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    return (
      emailRegex.test(email) &&
      email.includes(".") &&
      email.split("@")[1]?.split(".").length >= 2
    );
  };

  // Handle email input change with validation
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    // Clear previous errors
    setEmailError("");
    setError("");

    // Validate email if it's not empty
    if (value && !validateEmail(value)) {
      setEmailError("Please enter a valid email address");
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors
    setError("");
    setEmailError("");

    // Validate email
    if (!email) {
      setEmailError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

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
    <div className="min-h-screen" style={{ background: "var(--surface)" }}>
      <div className="mx-auto max-w-7xl px-4 py-10 md:py-16 min-h-screen flex flex-col justify-center">
        {/* Logo outside the main content, centered above the divider/grid */}
        <div className="flex justify-center mb-10 md:mb-16">
          <Image
            src="/images/OyanaFinalLogo.svg"
            alt="Oyana logo"
            width={200}
            height={48}
            className="h-10 w-auto md:h-12"
            priority
          />
        </div>

        <div className="grid gap-10 md:grid-cols-2 md:gap-16 w-full items-center">
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
              <div>
                <Input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email address..."
                  className={`h-12 input placeholder:text-white/40 ${
                    emailError ? "border-red-500 focus:border-red-500" : ""
                  }`}
                />
                {emailError && (
                  <div className="mt-1 text-red-500 text-sm">{emailError}</div>
                )}
              </div>
              <Button
                type="submit"
                disabled={isLoading || !!emailError || !email.trim()}
                className={`h-12 w-full ${
                  !!emailError || !email.trim() ? "cursor-not-allowed" : ""
                }`}
                style={{
                  backgroundColor: "#973900",
                }}
              >
                {isLoading ? "Adding you to the waitlist" : "Join the waitlist"}
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

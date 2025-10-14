"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { toast } from "sonner";
import TeamSection from "@/components/TeamSection";

export default function Oyana2Page() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !isMuted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
    // Ensure video plays when unmuted
    if (!nextMuted) {
      video.play().catch(() => {
        // If autoplay fails, keep it muted
        video.muted = true;
        setIsMuted(true);
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
          source: "oyana2",
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
      <div className="mx-auto max-w-7xl px-4 py-14 md:py-20">
        <div className="grid min-h-[70vh] items-center gap-12 lg:gap-16 lg:[grid-template-columns:1.35fr_1fr]">
          <motion.div
            className="text-center lg:text-left lg:pr-16 xl:pr-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 text-white justify-center lg:justify-start">
              <Image
                src="/images/OyanaFinalLogo.svg"
                alt="Oyana logo"
                width={220}
                height={56}
                className="h-12 md:h-16 w-auto"
                priority
              />
            </div>

            <h1 className="mt-7 text-3xl font-extrabold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl lg:leading-[1.08] lg:max-w-4xl text-center lg:text-left mb-5 md:mb-6 lg:mb-8">
              Ready to Unlock Your Video's Potential?
              <span className="block md:inline"> </span>
              <br />
              <span
                className="text-gradient underline decoration-4 underline-offset-4"
                style={{ textDecorationColor: "var(--gossamer-600)" }}
              >
                Boost retention with Oyana.
              </span>
            </h1>

            <p className="mt-3 md:mt-4 max-w-xl lg:max-w-3xl text-base md:text-lg lg:text-xl lg:leading-relaxed text-zinc-300 mx-auto lg:mx-0 text-center lg:text-left">
              Stop losing viewers at the 30-second mark. Start creating content
              that hooks them till the end.
            </p>

            <motion.ul
              className="mt-7 grid max-w-xl lg:max-w-3xl gap-4 md:gap-5 text-zinc-200 lg:text-lg mx-auto lg:mx-0"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.08 } },
              }}
            >
              {[
                "Actionable insights for quick edits and long-term retention strategy",
                "Audience feedback from fans and casual viewers",
                "Combines technical skill, reliability, and preserves your creative vision",
              ].map((item) => (
                <motion.li
                  key={item}
                  variants={{
                    hidden: { opacity: 0, y: 8 },
                    show: { opacity: 1, y: 0 },
                  }}
                  className="flex items-start gap-4"
                >
                  <span
                    className="mt-1 inline-flex h-5 w-5 lg:h-6 lg:w-6 shrink-0 items-center justify-center rounded-full text-black text-xs"
                    style={{ background: "var(--gossamer-600)" }}
                  >
                    ✓
                  </span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>

            <form
              onSubmit={handleSubmit}
              className="mt-9 flex max-w-md gap-2 mx-auto lg:mx-0"
            >
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="you@youremail.com"
                className="h-12 input placeholder:text-white/40"
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="h-12 btn btn-primary disabled:opacity-50"
              >
                {isLoading ? "Joining..." : "Join the waitlist"}
              </Button>
            </form>
            {submitted && (
              <div className="mt-3" style={{ color: "var(--gossamer-600)" }}>
                Thanks! We will notify you.
              </div>
            )}
            {error && <div className="mt-3 text-red-500">{error}</div>}
          </motion.div>

          <motion.div
            className="relative h-full flex items-center lg:pl-4"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          >
            <motion.div
              className="h-[78vh] w-[90vw] md:w-[46vw] mx-auto lg:ml-auto lg:[margin-right:calc((100vw-100%)/-4)]"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div
                className="h-full rounded-3xl p-6 overflow-hidden card relative"
                style={{ boxShadow: "0 30px 80px -20px rgba(0,151,117,0.35)" }}
              >
                <video
                  ref={videoRef}
                  src="/OyanaPreviewVideo.mp4"
                  className="h-full w-full object-cover rounded-3xl overflow-hidden"
                  style={{ borderRadius: "inherit" }}
                  autoPlay
                  muted={isMuted}
                  loop
                  playsInline
                />
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                  className="absolute top-5 left-5 z-10 rounded-xl px-3 py-2 text-sm font-medium flex items-center gap-2 transition-colors duration-200"
                  style={{
                    background:
                      "color-mix(in oklab, var(--gossamer-600), transparent 82%)",
                    color: "var(--gossamer-600)",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    {isMuted ? (
                      <path d="M16.5 12c0-1.77-.77-3.36-2-4.47v8.94c1.23-1.11 2-2.7 2-4.47zm3.5 0c0 2.89-1.64 5.39-4.03 6.65l-1.2-1.6C16.86 16.04 18 14.14 18 12s-1.14-4.04-3.23-5.05l1.2-1.6C18.36 6.61 20 9.11 20 12zM3 9v6h4l5 5V4L7 9H3z" />
                    ) : (
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-.77-3.36-2-4.47v8.94c1.23-1.11 2-2.7 2-4.47zm3.5 0c0 2.89-1.64 5.39-4.03 6.65l-1.2-1.6C16.86 16.04 18 14.14 18 12s-1.14-4.04-3.23-5.05l1.2-1.6C18.36 6.61 20 9.11 20 12z" />
                    )}
                  </svg>
                  {isMuted ? "Unmute" : "Mute"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Meet the Team - under the fold */}
      {/* <TeamSection /> */}
    </div>
  );
}

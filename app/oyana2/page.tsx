"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { toast } from "sonner";
import TeamSection from "@/components/TeamSection";

export default function Oyana2Page() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Modal state for YouTube channel collection
  const [showYoutubeModal, setShowYoutubeModal] = useState(false);
  const [youtubeChannel, setYoutubeChannel] = useState("");
  const [isSubmittingYoutube, setIsSubmittingYoutube] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

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

    // Defer sending to Apps Script until modal submit or skip, to avoid double rows
    toast.success("Welcome to Oyana! 🎉", {
      description: "Almost done — optionally add your YouTube channel.",
    });
    setSubmitted(true);
    setSubmittedEmail(email);
    setEmail("");
    setShowYoutubeModal(true);
    setIsLoading(false);
  };

  const handleYoutubeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // If no YouTube channel provided, just close the modal
    if (!youtubeChannel.trim()) {
      setShowYoutubeModal(false);
      return;
    }

    setIsSubmittingYoutube(true);

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbz09xFpFU9FRynZAQ5WI37hsLcAUkYCVEU7_Yrewz1sGRSwOhx3K4maalBPZa4UJv53/exec",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `Email=${encodeURIComponent(
            submittedEmail
          )}&YoutubeChannel=${encodeURIComponent(youtubeChannel)}`,
        }
      );

      if (response.ok) {
        toast.success("Thanks for sharing!", {
          description: "We'll subscribe and support your channel!",
        });
      }
    } catch (err) {
      // Silently fail, not critical
      console.error("Error submitting YouTube channel:", err);
    } finally {
      setIsSubmittingYoutube(false);
      setShowYoutubeModal(false);
      setYoutubeChannel("");
    }
  };

  const handleSkipYoutube = () => {
    // Submit a single row with only Email when user skips
    setIsSubmittingYoutube(true);
    fetch(
      "https://script.google.com/macros/s/AKfycbz09xFpFU9FRynZAQ5WI37hsLcAUkYCVEU7_Yrewz1sGRSwOhx3K4maalBPZa4UJv53/exec",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `Email=${encodeURIComponent(submittedEmail)}&YoutubeChannel=`,
      }
    )
      .then(() => {
        toast.success("You're on the list!", {
          description: "We’ll email you when we launch.",
        });
      })
      .catch(() => {})
      .finally(() => {
        setIsSubmittingYoutube(false);
        setShowYoutubeModal(false);
        setYoutubeChannel("");
      });
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--surface)" }}>
      <div className="mx-auto max-w-7xl px-4 py-14 md:py-20">
        <div className="grid min-h-[70vh] items-center justify-center gap-8 lg:gap-12 lg:grid-cols-2 max-w-7xl mx-auto">
          <motion.div
            className="text-center lg:text-left flex flex-col items-center lg:items-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 text-white justify-center lg:justify-start mb-4 md:mb-6">
              <Image
                src="/images/OyanaFinalLogo.svg"
                alt="Oyana logo"
                width={180}
                height={45}
                className="h-8 md:h-10 w-auto"
                priority
              />
            </div>

            <h1 className="mt-5 text-xl font-extrabold leading-tight tracking-tight text-white md:text-3xl lg:text-4xl lg:leading-[1.08] text-center lg:text-left mb-3 md:mb-4 lg:mb-5">
              Ready to Unlock Your Video's Potential?
              <span className="block md:inline"> </span>
              <br />
              <span
                className="text-gradient  decoration-4 underline-offset-4"
                style={{ textDecorationColor: "var(--gossamer-600)" }}
              >
                Grow with Oyana.
              </span>
            </h1>

            <p className="mt-2 md:mt-3 max-w-xl lg:max-w-3xl text-sm md:text-base lg:text-lg lg:leading-relaxed text-zinc-300 mx-auto lg:mx-0 text-center lg:text-left">
              Stop losing viewers at the 30-second mark. Start creating content
              that hooks them till the end.
            </p>

            <motion.div
              className="mt-6 space-y-5 max-w-xl lg:max-w-3xl mx-auto text-left lg:mx-0"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.08 } },
              }}
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                <div className="flex items-start gap-3">
                  <span
                    className="mt-1 inline-flex h-4 w-4 lg:h-5 lg:w-5 shrink-0 items-center justify-center rounded-full text-black text-xs"
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
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                <div className="flex items-start gap-3">
                  <span
                    className="mt-1 inline-flex h-4 w-4 lg:h-5 lg:w-5 shrink-0 items-center justify-center rounded-full text-black text-xs"
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
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                <div className="flex items-start gap-3">
                  <span
                    className="mt-1 inline-flex h-4 w-4 lg:h-5 lg:w-5 shrink-0 items-center justify-center rounded-full text-black text-xs"
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
              </motion.div>
            </motion.div>

            <form
              onSubmit={handleSubmit}
              className="mt-4 flex flex-col sm:flex-row max-w-md gap-2 mx-auto lg:mx-0"
            >
              <div className="flex-1">
                <Input
                  value={email}
                  onChange={handleEmailChange}
                  type="email"
                  placeholder="you@youremail.com"
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
                className={`h-12 px-12 ${
                  !!emailError || !email.trim() ? "cursor-not-allowed" : ""
                }`}
                style={{
                  backgroundColor: "#973900",
                }}
              >
                {isLoading ? "Adding you to the waitlist" : "Join the waitlist"}
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
            className="relative flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          >
            <motion.div
              className="h-auto w-full max-w-2xl mx-auto"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div
                className="rounded-3xl p-6 overflow-hidden card relative"
                style={{ boxShadow: "0 30px 80px -20px rgba(0,4,151,0.35)" }}
              >
                <video
                  ref={videoRef}
                  src="/OyanaPreviewVideo.mp4"
                  className="w-full h-[40vh] object-cover rounded-3xl overflow-hidden"
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
                      "color-mix(in oklab, var(--silver-tree), transparent 82%)",
                    color: "var(--silver-tree)",
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

      {/* YouTube Channel Collection Modal */}
      <Dialog open={showYoutubeModal} onOpenChange={setShowYoutubeModal}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">
              Help Us Support Your Success! 🚀
            </DialogTitle>
            <DialogDescription className="text-zinc-300 pt-2">
              We'd love to support your creative journey! If you have a YouTube
              channel, share it with us and we'll subscribe to help you grow.
              This is completely optional.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleYoutubeSubmit} className="mt-4 space-y-4">
            <div>
              <Input
                type="text"
                value={youtubeChannel}
                onChange={(e) => setYoutubeChannel(e.target.value)}
                placeholder="https://youtube.com/@yourchannel"
                className="h-12"
                disabled={isSubmittingYoutube}
              />
              <p className="text-xs text-zinc-400 mt-2">
                Paste your YouTube channel URL (optional)
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleSkipYoutube}
                className="flex-1 h-12"
                disabled={isSubmittingYoutube}
              >
                Skip
              </Button>
              <Button
                type="submit"
                className="flex-1 h-12"
                style={{ backgroundColor: "#973900" }}
                disabled={isSubmittingYoutube}
              >
                {isSubmittingYoutube ? "Saving..." : "Submit"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

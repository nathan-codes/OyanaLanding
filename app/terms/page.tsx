"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function TermsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Smooth scroll to top on mount
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--surface)" }}
      ref={containerRef}
    >
      {/* Header with Logo */}
      <motion.header
        className="sticky top-0 z-50 backdrop-blur-md border-b border-white/10"
        style={{
          background:
            "linear-gradient(180deg, rgba(11, 15, 20, 0.95), rgba(11, 15, 20, 0.85))",
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto max-w-7xl px-4 py-4 md:py-6">
          <Link href="/" className="inline-block">
            <Image
              src="/images/OyanaFinalLogo.svg"
              alt="Oyana logo"
              width={180}
              height={45}
              className="h-8 md:h-10 w-auto transition-opacity hover:opacity-80"
              priority
            />
          </Link>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-4 py-8 md:py-16">
        {/* Title Section */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
            Terms of Use
          </h1>
          <div className="flex items-center justify-center gap-2 text-zinc-400">
            <span className="text-sm md:text-base">Effective Date:</span>
            <span
              className="text-sm md:text-base font-semibold"
              style={{ color: "var(--silver-tree)" }}
            >
              January 1, 2026
            </span>
          </div>
        </motion.div>

        {/* Terms Content */}
        <motion.div
          className="space-y-8 md:space-y-12"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Section 1 */}
          <motion.section
            className="card p-6 md:p-8"
            variants={fadeInUp}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <h2
              className="text-2xl md:text-3xl font-bold mb-4 text-white"
              style={{
                background: "linear-gradient(135deg, var(--gossamer), var(--silver-tree))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              1. Acceptance of Terms
            </h2>
            <p className="text-zinc-300 leading-relaxed text-base md:text-lg">
              By accessing or using our video analytics platform ("Service"), you
              agree to be bound by these Terms of Use ("Terms"). If you do not agree
              to these Terms, you may not use our Service.
            </p>
          </motion.section>

          {/* Section 2 */}
          <motion.section
            className="card p-6 md:p-8"
            variants={fadeInUp}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <h2
              className="text-2xl md:text-3xl font-bold mb-4 text-white"
              style={{
                background: "linear-gradient(135deg, var(--gossamer), var(--silver-tree))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              2. Description of Service
            </h2>
            <p className="text-zinc-300 leading-relaxed text-base md:text-lg mb-4">
              Our Service provides video retention analysis, audience insights, and
              actionable recommendations to help content creators improve their own
              viewer engagement. We analyze video performance data, viewer behavior
              patterns, and provide actionable insights to improve retention and
              engagement.
            </p>
            <div className="space-y-3">
              <div className="pl-4 border-l-2" style={{ borderColor: "var(--gossamer)" }}>
                <p className="font-semibold text-white mb-1">Free and Paid Plans:</p>
                <p className="text-zinc-300 text-sm md:text-base">
                  We offer both free and paid subscription tiers. Free accounts have
                  limited features and usage caps. Paid subscriptions provide
                  additional features, higher limits, and priority support. We may
                  change plan features, pricing, or availability with reasonable
                  notice. Subscription fees are non-refundable except as required by
                  law.
                </p>
              </div>
              <div className="pl-4 border-l-2" style={{ borderColor: "var(--silver-tree)" }}>
                <p className="font-semibold text-white mb-1">Disclaimer:</p>
                <p className="text-zinc-300 text-sm md:text-base">
                  The feedback and suggestions are recommendations only. Oyana does
                  not guarantee improved views, engagement, or monetization.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Section 3 */}
          <motion.section
            className="card p-6 md:p-8"
            variants={fadeInUp}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <h2
              className="text-2xl md:text-3xl font-bold mb-4 text-white"
              style={{
                background: "linear-gradient(135deg, var(--gossamer), var(--silver-tree))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              3. Age & Parental Requirements
            </h2>
            <p className="text-zinc-300 leading-relaxed text-base md:text-lg">
              You must be at least 18 years old. We don't knowingly collect data from
              children under 18 years old. If we discover we have, we'll delete it
              immediately. Parents with concerns should contact{" "}
              <a
                href="mailto:oyana@oyana.ai"
                className="font-semibold transition-colors hover:opacity-80"
                style={{ color: "var(--silver-tree)" }}
              >
                oyana@oyana.ai
              </a>
              .
            </p>
          </motion.section>

          {/* Section 4 */}
          <motion.section
            className="card p-6 md:p-8"
            variants={fadeInUp}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <h2
              className="text-2xl md:text-3xl font-bold mb-4 text-white"
              style={{
                background: "linear-gradient(135deg, var(--gossamer), var(--silver-tree))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              4. Video Privacy & Your Consent
            </h2>
            <div className="space-y-4">
              <p className="text-zinc-300 leading-relaxed text-base md:text-lg">
                <span className="font-bold text-white">Important:</span> Federal law
                Video Protection Privacy Act (VPPA) requires your explicit consent
                before we collect video viewing data. By checking the consent box
                during registration, you agree we may collect and analyze:
              </p>
              <ul className="space-y-2 pl-6 list-disc text-zinc-300">
                <li>Video performance metrics and viewer behavior</li>
                <li>Content preferences and viewing patterns</li>
                <li>Technical data (device, browser, connection)</li>
              </ul>
              <p className="text-zinc-300 leading-relaxed text-base md:text-lg">
                You can withdraw consent anytime in your account settings. This won't
                affect prior lawful processing.
              </p>
            </div>
          </motion.section>

          {/* Section 5 */}
          <motion.section
            className="card p-6 md:p-8"
            variants={fadeInUp}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <h2
              className="text-2xl md:text-3xl font-bold mb-4 text-white"
              style={{
                background: "linear-gradient(135deg, var(--gossamer), var(--silver-tree))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              5. Your Privacy Rights General Data Protection Regulation (GDPR)
            </h2>
            <p className="text-zinc-300 leading-relaxed text-base md:text-lg mb-4">
              European Union users have the right to:
            </p>
            <ul className="space-y-2 pl-6 list-disc text-zinc-300 mb-4">
              <li>Access, correct, or delete your data</li>
              <li>Export your data</li>
              <li>Restrict or object to processing</li>
              <li>Withdraw consent anytime</li>
            </ul>
            <p className="text-zinc-300 leading-relaxed text-base md:text-lg">
              Contact{" "}
              <a
                href="mailto:oyana@oyana.ai"
                className="font-semibold transition-colors hover:opacity-80"
                style={{ color: "var(--silver-tree)" }}
              >
                oyana@oyana.ai
              </a>{" "}
              to exercise these rights. We keep data only as long as needed (maximum
              3 years after account closure) and protect it when transferring
              internationally.
            </p>
          </motion.section>

          {/* Section 6 */}
          <motion.section
            className="card p-6 md:p-8"
            variants={fadeInUp}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <h2
              className="text-2xl md:text-3xl font-bold mb-4 text-white"
              style={{
                background: "linear-gradient(135deg, var(--gossamer), var(--silver-tree))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              6. Your Content & Our Rights
            </h2>
            <div className="space-y-4">
              <p className="text-zinc-300 leading-relaxed text-base md:text-lg">
                You own your videos. By uploading content, you grant us a limited
                license to analyze it, generate insights, and provide the Service.
                This license ends when you delete content, except for anonymized
                analytics.
              </p>
              <div>
                <p className="font-semibold text-white mb-2">We will not:</p>
                <ul className="space-y-1 pl-6 list-disc text-zinc-300">
                  <li>Sell, license, or distribute your content to third parties</li>
                  <li>
                    Use your content to train AI models for other users or products
                  </li>
                  <li>Share your content publicly without your permission</li>
                </ul>
              </div>
              <p className="text-zinc-300 leading-relaxed text-base md:text-lg">
                Our platform, software, algorithms, and analytics belong to us. You get
                access to use the Service, not ownership of our technology.
              </p>
              <div>
                <p className="font-semibold text-white mb-2">You promise:</p>
                <ul className="space-y-1 pl-6 list-disc text-zinc-300 mb-4">
                  <li>You own or have rights to upload your content</li>
                  <li>
                    Your content doesn't infringe others' intellectual property or
                    privacy
                  </li>
                  <li>
                    Your content is legal and doesn't violate our policies and those
                    of the connecting account's policies
                  </li>
                </ul>
                <p className="font-semibold text-white mb-2">
                  Prohibited content includes, but not limited to:
                </p>
                <ul className="space-y-1 pl-6 list-disc text-zinc-300">
                  <li>Copyright/trademark violations</li>
                  <li>Illegal, harmful, or abusive material</li>
                  <li>Content violating privacy rights</li>
                  <li>Malware or malicious code</li>
                  <li>
                    Content violating connecting account's policy (ie Google, TikTok,
                    Instagram), including but not limited to clickbait ads
                  </li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Section 7 */}
          <motion.section
            className="card p-6 md:p-8"
            variants={fadeInUp}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <h2
              className="text-2xl md:text-3xl font-bold mb-4 text-white"
              style={{
                background: "linear-gradient(135deg, var(--gossamer), var(--silver-tree))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              7. How We Use & Share Data
            </h2>
            <div className="space-y-4">
              <p className="text-zinc-300 leading-relaxed text-base md:text-lg">
                We use data to: provide analytics, improve features, offer support,
                and develop industry insights.
              </p>
              <div className="pl-4 border-l-2" style={{ borderColor: "var(--gossamer)" }}>
                <p className="font-semibold text-white mb-2">
                  We never sell your personal data or content.
                </p>
                <p className="text-zinc-300 text-sm md:text-base">
                  Your data is used exclusively for your benefit—to provide you with
                  personalized insights and improve your experience with our Service.
                </p>
              </div>
              <div className="pl-4 border-l-2" style={{ borderColor: "var(--silver-tree)" }}>
                <p className="font-semibold text-white mb-2">No AI Training:</p>
                <p className="text-zinc-300 text-sm md:text-base">
                  We do not use your videos, content, or personal data to train
                  artificial intelligence models, machine learning algorithms, or any
                  systems that would benefit other users or third parties. Your data
                  stays yours.
                </p>
              </div>
              <div>
                <p className="font-semibold text-white mb-2">We share only:</p>
                <ul className="space-y-1 pl-6 list-disc text-zinc-300">
                  <li>With your consent</li>
                  <li>
                    With service providers who help us deliver the Service (under
                    strict confidentiality agreements that prohibit them from using
                    your data for their own purposes)
                  </li>
                  <li>When legally required by court order or law enforcement</li>
                  <li>
                    Anonymized, aggregated data that cannot identify you
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <p className="font-semibold text-white">Data Retention:</p>
                <p className="text-zinc-300 text-sm md:text-base">
                  <span className="font-semibold">Personal data & content:</span>{" "}
                  Retained while your account is active and up to 3 years after
                  closure (or as legally required)
                </p>
                <p className="text-zinc-300 text-sm md:text-base">
                  <span className="font-semibold">Anonymized data:</span> May be
                  retained indefinitely for analytics, product improvement, and
                  industry research. This data cannot identify you or your specific
                  content and is never used to train AI models for external purposes.
                </p>
              </div>
              <p className="text-zinc-300 leading-relaxed text-base md:text-lg">
                Third-party integrations (YouTube, Instagram, TikTok, etc.) are subject
                to their own terms.
              </p>
            </div>
          </motion.section>

          {/* Section 8 */}
          <motion.section
            className="card p-6 md:p-8"
            variants={fadeInUp}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <h2
              className="text-2xl md:text-3xl font-bold mb-4 text-white"
              style={{
                background: "linear-gradient(135deg, var(--gossamer), var(--silver-tree))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              8. Your Account Responsibilities
            </h2>
            <ul className="space-y-2 pl-6 list-disc text-zinc-300">
              <li>Keep your login secure</li>
              <li>Provide accurate information</li>
              <li>Follow all applicable laws</li>
              <li>Report unauthorized access immediately</li>
            </ul>
          </motion.section>

          {/* Section 9 */}
          <motion.section
            className="card p-6 md:p-8"
            variants={fadeInUp}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <h2
              className="text-2xl md:text-3xl font-bold mb-4 text-white"
              style={{
                background: "linear-gradient(135deg, var(--gossamer), var(--silver-tree))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              9. Service Availability
            </h2>
            <p className="text-zinc-300 leading-relaxed text-base md:text-lg">
              We may modify, suspend, or discontinue features with reasonable notice.
              We provide the Service "as is" without guarantees of uptime or
              error-free operation.
            </p>
          </motion.section>

          {/* Section 10 */}
          <motion.section
            className="card p-6 md:p-8"
            variants={fadeInUp}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <h2
              className="text-2xl md:text-3xl font-bold mb-4 text-white"
              style={{
                background: "linear-gradient(135deg, var(--gossamer), var(--silver-tree))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              10. Our Liability Limits
            </h2>
            <p className="text-zinc-300 leading-relaxed text-base md:text-lg mb-4">
              To the maximum extent permitted by law:
            </p>
            <ul className="space-y-2 pl-6 list-disc text-zinc-300">
              <li>Our liability is limited to what you paid us in the past 12 months</li>
              <li>We're not liable for indirect or consequential damages</li>
              <li>We don't guarantee uninterrupted service</li>
            </ul>
          </motion.section>

          {/* Section 11 */}
          <motion.section
            className="card p-6 md:p-8"
            variants={fadeInUp}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <h2
              className="text-2xl md:text-3xl font-bold mb-4 text-white"
              style={{
                background: "linear-gradient(135deg, var(--gossamer), var(--silver-tree))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              11. Ending Your Account
            </h2>
            <p className="text-zinc-300 leading-relaxed text-base md:text-lg mb-4">
              You can close your account anytime. We may terminate for Terms violations
              or suspected illegal activity.
            </p>
            <div>
              <p className="font-semibold text-white mb-2">Upon termination:</p>
              <ul className="space-y-2 pl-6 list-disc text-zinc-300">
                <li>Your access ends immediately</li>
                <li>
                  Personal data is deleted within 30 days (except as legally required)
                </li>
                <li>
                  Anonymized, aggregated data may be retained indefinitely for
                  analytics, research, and service improvement
                </li>
                <li>
                  Anonymized data cannot identify you or your specific content and may
                  include industry benchmarks, usage patterns, and performance trends.
                </li>
              </ul>
            </div>
          </motion.section>

          {/* Section 12 */}
          <motion.section
            className="card p-6 md:p-8"
            variants={fadeInUp}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <h2
              className="text-2xl md:text-3xl font-bold mb-4 text-white"
              style={{
                background: "linear-gradient(135deg, var(--gossamer), var(--silver-tree))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              12. Disputes
            </h2>
            <ul className="space-y-2 pl-6 list-disc text-zinc-300">
              <li>
                <span className="font-semibold text-white">Governing law:</span>{" "}
                Washington, USA
              </li>
              <li>
                Disputes go to binding arbitration (except small claims, IP disputes,
                or privacy violations). You waive class action rights.
              </li>
            </ul>
          </motion.section>

          {/* Section 13 */}
          <motion.section
            className="card p-6 md:p-8"
            variants={fadeInUp}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <h2
              className="text-2xl md:text-3xl font-bold mb-4 text-white"
              style={{
                background: "linear-gradient(135deg, var(--gossamer), var(--silver-tree))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              13. Security & Data Protection
            </h2>
            <p className="text-zinc-300 leading-relaxed text-base md:text-lg">
              We implement strong security measures and will notify you of any data
              breaches as required by law.
            </p>
          </motion.section>

          {/* Section 14 */}
          <motion.section
            className="card p-6 md:p-8"
            variants={fadeInUp}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <h2
              className="text-2xl md:text-3xl font-bold mb-4 text-white"
              style={{
                background: "linear-gradient(135deg, var(--gossamer), var(--silver-tree))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              14. Changes to Terms
            </h2>
            <p className="text-zinc-300 leading-relaxed text-base md:text-lg">
              We'll notify you of material changes via email or in-app notice.
              Continued use means you accept the updates.
            </p>
          </motion.section>

          {/* Section 15 */}
          <motion.section
            className="card p-6 md:p-8"
            variants={fadeInUp}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <h2
              className="text-2xl md:text-3xl font-bold mb-4 text-white"
              style={{
                background: "linear-gradient(135deg, var(--gossamer), var(--silver-tree))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              15. Contact Us
            </h2>
            <p className="text-zinc-300 leading-relaxed text-base md:text-lg">
              Please contact{" "}
              <a
                href="mailto:oyana@oyana.ai"
                className="font-semibold transition-colors hover:opacity-80"
                style={{ color: "var(--silver-tree)" }}
              >
                oyana@oyana.ai
              </a>{" "}
              for any questions and concerns.
            </p>
          </motion.section>

          {/* Footer Statement */}
          <motion.div
            className="card p-6 md:p-8 text-center"
            variants={fadeInUp}
            style={{
              background:
                "linear-gradient(135deg, rgba(0, 151, 117, 0.1), rgba(106, 196, 154, 0.1))",
              borderColor: "var(--gossamer)",
            }}
          >
            <p className="text-white text-base md:text-lg font-medium leading-relaxed">
              By using our Service, you acknowledge that you have read, understood, and
              agree to be bound by these Terms of Use.
            </p>
          </motion.div>
        </motion.div>

        {/* Back to Home Link */}
        <motion.div
          className="mt-12 md:mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all hover:scale-105"
            style={{
              background: "linear-gradient(135deg, var(--gossamer), var(--silver-tree))",
              color: "#000",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}


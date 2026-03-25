"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[var(--surface)] text-[var(--foreground)]">
      <div className="mx-auto max-w-5xl px-4 py-10 md:py-16">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6 md:mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm text-[var(--text-muted)] hover:text-white hover:border-[#009775]/60 hover:bg-black/50 transition-colors"
          >
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-xs">
              ←
            </span>
            <span>Back to Home</span>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 md:mb-12 text-center"
        >
          <div className="mb-4 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--surface-2)] px-4 py-1.5 text-xs font-medium text-[var(--text-muted)] border border-white/5">
              <span className="inline-block h-2 w-2 rounded-full bg-[#6ac49a]" />
              <span>Legal Document</span>
            </div>
          </div>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold">
            Oyana Terms of Use <br /> and Privacy Policy
          </h1>
          <p className="mt-3 text-sm md:text-base text-[var(--text-muted)]">
            Effective Date: <span className="font-medium text-white">January 1, 2026</span>
          </p>
        </motion.header>

        <div className="space-y-6 md:space-y-8">
          {/* 1. Acceptance of Terms */}
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.4 }}
            className="rounded-2xl border border-white/5 bg-[var(--surface-2)]/90 px-5 py-6 md:px-7 md:py-7 shadow-xl"
          >
            <h2 className="text-lg md:text-xl font-semibold mb-3">
              1. Acceptance of Terms
            </h2>
            <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed">
              By accessing or using our video analytics platform (&quot;Service&quot;), you agree to be
              bound by these Terms of Use (&quot;Terms&quot;). If you do not agree to these Terms, you
              may not use our Service.
            </p>
            <div className="mt-4 rounded-xl border border-[#009775]/35 bg-[#009775]/10 px-4 py-3 text-sm md:text-base">
              <p className="font-semibold text-white mb-1">
                YouTube API Services
              </p>
              <p className="text-[var(--text-muted)]">
                When you connect your YouTube account, you agree to be bound by the{" "}
                <Link
                  href="https://developers.google.com/youtube/terms/api-services-terms-of-service"
                  target="_blank"
                  className="text-[#6ac49a] underline underline-offset-2 hover:text-[#8adcb3]"
                >
                  YouTube Terms of Service
                </Link>
                .
              </p>
            </div>
          </motion.section>

          {/* 2. Description of Service */}
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.4, delay: 0.05 }}
            className="rounded-2xl border border-white/5 bg-[var(--surface-2)]/90 px-5 py-6 md:px-7 md:py-7 shadow-xl"
          >
            <h2 className="text-lg md:text-xl font-semibold mb-3">
              2. Description of Service
            </h2>
            <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed mb-3">
              Our Service provides video retention analysis, audience insights, and actionable
              recommendations to help content creators improve their own viewer engagement. We
              analyze video performance data, viewer behavior patterns, and provide actionable
              insights to improve retention and engagement.
            </p>
            <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed mb-2">
              <span className="font-semibold text-white">Free and Paid Plans:</span> We offer both
              free and paid subscription tiers. Free accounts have limited features and usage caps.
              Paid subscriptions provide additional features, higher limits, and priority support.
              We may change plan features, pricing, or availability with reasonable notice.
              Subscription fees are non-refundable except as required by law.
            </p>
            <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed">
              <span className="font-semibold text-white">Disclaimer:</span> The feedback and
              suggestions are recommendations only. Oyana does not guarantee improved views,
              engagement, or monetization.
            </p>
          </motion.section>

          {/* 3. Age & Parental Requirements */}
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-2xl border border-white/5 bg-[var(--surface-2)]/90 px-5 py-6 md:px-7 md:py-7 shadow-xl"
          >
            <h2 className="text-lg md:text-xl font-semibold mb-3">
              3. Age &amp; Parental Requirements
            </h2>
            <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed">
              You must be at least 18 years old. We don&apos;t knowingly collect data from children
              under 18 years old. If we discover we have, we&apos;ll delete it immediately. Parents
              with concerns should contact{" "}
              <Link
                href="mailto:oyana@oyana.ai"
                className="text-[#6ac49a] underline underline-offset-2 hover:text-[#8adcb3]"
              >
                oyana@oyana.ai
              </Link>
              .
            </p>
          </motion.section>

          {/* 4. Video Privacy & Your Consent */}
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.4, delay: 0.15 }}
            className="rounded-2xl border border-white/5 bg-[var(--surface-2)]/90 px-5 py-6 md:px-7 md:py-7 shadow-xl"
          >
            <h2 className="text-lg md:text-xl font-semibold mb-3">
              4. Video Privacy &amp; Your Consent
            </h2>
            <div className="mb-4 rounded-xl border border-[#009775]/35 bg-[#009775]/10 px-4 py-3 text-sm md:text-base">
              <p className="font-semibold text-white mb-1">
                Important: Video Protection Privacy Act (VPPA)
              </p>
              <p className="text-[var(--text-muted)]">
                Federal law requires your explicit consent before we collect video viewing data. By
                checking the consent box during registration, you agree we may collect and analyze
                your viewing data as described below.
              </p>
            </div>
            <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed mb-3">
              By checking the consent box during registration, you agree we may collect and analyze:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm md:text-base text-[var(--text-muted)]">
              <li>Video performance metrics and viewer behavior</li>
              <li>Content preferences and viewing patterns</li>
              <li>Technical data (device, browser, connection)</li>
            </ul>
            <p className="mt-3 text-sm md:text-base text-[var(--text-muted)] leading-relaxed">
              You can withdraw consent anytime in your account settings. This won&apos;t affect
              prior lawful processing.
            </p>
          </motion.section>

          {/* 5. GDPR Rights */}
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.4, delay: 0.2 }}
            className="rounded-2xl border border-white/5 bg-[var(--surface-2)]/90 px-5 py-6 md:px-7 md:py-7 shadow-xl"
          >
            <h2 className="text-lg md:text-xl font-semibold mb-3">
              5. Your Privacy Rights – General Data Protection Regulation (GDPR)
            </h2>
            <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed mb-3">
              European Union users have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm md:text-base text-[var(--text-muted)] mb-3">
              <li>Access, correct, or delete your data</li>
              <li>Export your data</li>
              <li>Restrict or object to processing</li>
              <li>Withdraw consent anytime</li>
            </ul>
            <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed">
              Contact{" "}
              <Link
                href="mailto:oyana@oyana.ai"
                className="text-[#6ac49a] underline underline-offset-2 hover:text-[#8adcb3]"
              >
                oyana@oyana.ai
              </Link>{" "}
              to exercise these rights. We keep data only as long as needed (maximum 3 years after
              account closure) and protect it when transferring internationally.
            </p>
          </motion.section>

          {/* 6. Your Content & Our Rights */}
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.4, delay: 0.25 }}
            className="rounded-2xl border border-white/5 bg-[var(--surface-2)]/90 px-5 py-6 md:px-7 md:py-7 shadow-xl"
          >
            <h2 className="text-lg md:text-xl font-semibold mb-3">
              6. Your Content &amp; Our Rights
            </h2>
            <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed mb-3">
              You own your videos. By uploading content, you grant us a limited license to analyze
              it, generate insights, and provide the Service. This license ends when you delete
              content, except for anonymized analytics.
            </p>
            <div className="mb-4 rounded-xl border border-[#009775]/35 bg-[#009775]/10 px-4 py-3 text-sm md:text-base">
              <p className="font-semibold text-white mb-1">We will not:</p>
              <ul className="list-disc pl-5 space-y-1 text-[var(--text-muted)]">
                <li>Sell, license, or distribute your content to third parties</li>
                <li>Use your content to train AI models for other users or products</li>
                <li>Share your content publicly without your permission</li>
              </ul>
            </div>
            <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed mb-3">
              Our platform, software, algorithms, and analytics belong to us. You get access to use
              the Service, not ownership of our technology.
            </p>
            <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed mb-2 font-semibold text-white">
              You promise:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm md:text-base text-[var(--text-muted)] mb-3">
              <li>You own or have rights to upload your content</li>
              <li>Your content doesn&apos;t infringe others&apos; intellectual property or privacy</li>
              <li>
                Your content is legal and doesn&apos;t violate our policies and those of the
                connecting account&apos;s policies
              </li>
            </ul>
            <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed font-semibold mb-2">
              Prohibited content includes, but is not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm md:text-base text-[var(--text-muted)]">
              <li>Copyright/trademark violations</li>
              <li>Illegal, harmful, or abusive material</li>
              <li>Content violating privacy rights</li>
              <li>Malware or malicious code</li>
              <li>
                Content violating a connecting account&apos;s policy (e.g., Google, TikTok,
                Instagram), including but not limited to clickbait ads
              </li>
            </ul>
          </motion.section>

          {/* 7. How We Use & Share Data */}
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.4, delay: 0.3 }}
            className="rounded-2xl border border-white/5 bg-[var(--surface-2)]/90 px-5 py-6 md:px-7 md:py-7 shadow-xl"
          >
            <h2 className="text-lg md:text-xl font-semibold mb-3">
              7. How We Use &amp; Share Data
            </h2>
            <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed mb-3">
              We use data to: provide analytics, improve features, offer support, and develop
              industry insights.
            </p>
            <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed mb-2">
              We never sell your personal data or content. Your data is used exclusively for your
              benefit—to provide you with personalized insights and improve your experience with
              our Service.
            </p>
            <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed mb-3">
              <span className="font-semibold text-white">No AI Training:</span> We do not use your
              videos, content, or personal data to train artificial intelligence models, machine
              learning algorithms, or any systems that would benefit other users or third parties.
              Your data stays yours.
            </p>

            <div className="mt-4 mb-4 rounded-xl border border-[#009775]/35 bg-[#009775]/10 px-4 py-3 text-sm md:text-base">
              <p className="font-semibold text-white mb-1">YouTube API Data</p>
              <p className="text-[var(--text-muted)] mb-2">
                Our Service uses YouTube API Services to access your YouTube analytics data. When
                you connect your YouTube account:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-[var(--text-muted)] mb-2">
                <li>
                  We access and store YouTube API data including video statistics, viewer
                  demographics, and performance metrics.
                </li>
                <li>This data is used solely to provide you with analytics and insights.</li>
                <li>We refresh YouTube data approximately every 24 hours.</li>
                <li>
                  You can revoke our access to your YouTube data at any time via your Google
                  Account security settings.
                </li>
                <li>
                  When you revoke access or delete your account, we delete all stored YouTube API
                  data within 30 days.
                </li>
                <li>
                  Google&apos;s Privacy Policy applies to data accessed through YouTube API and other
                  Google services.
                </li>
              </ul>
            </div>

            <div className="mb-3">
              <p className="font-semibold text-white mb-1 text-sm md:text-base">
                We share data only:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm md:text-base text-[var(--text-muted)]">
                <li>With your consent</li>
                <li>
                  With service providers who help us deliver the Service (under strict
                  confidentiality agreements that prohibit them from using your data for their own
                  purposes)
                </li>
                <li>When legally required by court order or law enforcement</li>
                <li>Anonymized, aggregated data that cannot identify you</li>
              </ul>
            </div>

            <div className="mt-3 mb-3">
              <p className="font-semibold text-white mb-1 text-sm md:text-base">
                Cookies and Tracking
              </p>
              <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed mb-2">
                We use cookies and similar technologies to:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm md:text-base text-[var(--text-muted)] mb-2">
                <li>Maintain your login session</li>
                <li>Remember your preferences</li>
                <li>Analyze Service usage and performance</li>
                <li>Enable third-party integrations (like YouTube)</li>
              </ul>
              <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed">
                You can control cookies through your browser settings. Disabling cookies may limit
                some functionality of the Service.
              </p>
            </div>

            <div className="mt-3">
              <p className="font-semibold text-white mb-1 text-sm md:text-base">
                Data Retention
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm md:text-base text-[var(--text-muted)]">
                <li>
                  <span className="font-semibold text-white">
                    Personal data &amp; content:
                  </span>{" "}
                  Retained while your account is active and up to 3 years after closure (or as
                  legally required).
                </li>
                <li>
                  <span className="font-semibold text-white">YouTube API data:</span> Refreshed
                  regularly and deleted within 30 days of access revocation or account closure.
                </li>
                <li>
                  <span className="font-semibold text-white">Anonymized data:</span> May be
                  retained indefinitely for analytics, product improvement, and industry research.
                  This data cannot identify you or your specific content and is never used to train
                  AI models for external purposes.
                </li>
              </ul>
              <p className="mt-2 text-sm md:text-base text-[var(--text-muted)] leading-relaxed">
                Third-party integrations (YouTube, Instagram, TikTok, etc.) are subject to their
                own terms.
              </p>
            </div>
          </motion.section>

          {/* 8–15 (compact cards) */}
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.4, delay: 0.35 }}
            className="grid gap-6 md:gap-7"
          >
            {/* 8. Account Responsibilities */}
            <div className="rounded-2xl border border-white/5 bg-[var(--surface-2)]/90 px-5 py-6 md:px-7 md:py-7 shadow-xl">
              <h2 className="text-lg md:text-xl font-semibold mb-3">
                8. Your Account Responsibilities
              </h2>
              <ul className="list-disc pl-6 space-y-1 text-sm md:text-base text-[var(--text-muted)]">
                <li>Keep your login secure</li>
                <li>Provide accurate information</li>
                <li>Follow all applicable laws</li>
                <li>Report unauthorized access immediately</li>
              </ul>
            </div>

            {/* 9. Service Availability */}
            <div className="rounded-2xl border border-white/5 bg-[var(--surface-2)]/90 px-5 py-6 md:px-7 md:py-7 shadow-xl">
              <h2 className="text-lg md:text-xl font-semibold mb-3">
                9. Service Availability
              </h2>
              <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed">
                We may modify, suspend, or discontinue features with reasonable notice. We provide
                the Service &quot;as is&quot; without guarantees of uptime or error-free operation.
              </p>
            </div>

            {/* 10. Liability */}
            <div className="rounded-2xl border border-white/5 bg-[var(--surface-2)]/90 px-5 py-6 md:px-7 md:py-7 shadow-xl">
              <h2 className="text-lg md:text-xl font-semibold mb-3">
                10. Our Liability Limits
              </h2>
              <ul className="list-disc pl-6 space-y-1 text-sm md:text-base text-[var(--text-muted)]">
                <li>Our liability is limited to what you paid us in the past 12 months.</li>
                <li>We&apos;re not liable for indirect or consequential damages.</li>
                <li>We don&apos;t guarantee uninterrupted service.</li>
              </ul>
            </div>

            {/* 11. Ending Account */}
            <div className="rounded-2xl border border-white/5 bg-[var(--surface-2)]/90 px-5 py-6 md:px-7 md:py-7 shadow-xl">
              <h2 className="text-lg md:text-xl font-semibold mb-3">
                11. Ending Your Account
              </h2>
              <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed mb-2">
                You can close your account anytime. We may terminate accounts for Terms violations
                or suspected illegal activity.
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm md:text-base text-[var(--text-muted)]">
                <li>Your access ends immediately upon termination.</li>
                <li>Personal data is deleted within 30 days (except as legally required).</li>
                <li>
                  Anonymized, aggregated data may be retained indefinitely for analytics, research,
                  and service improvement.
                </li>
                <li>
                  Anonymized data cannot identify you or your specific content and may include
                  industry benchmarks, usage patterns, and performance trends.
                </li>
              </ul>
            </div>

            {/* 12. Disputes */}
            <div className="rounded-2xl border border-white/5 bg-[var(--surface-2)]/90 px-5 py-6 md:px-7 md:py-7 shadow-xl">
              <h2 className="text-lg md:text-xl font-semibold mb-3">
                12. Disputes
              </h2>
              <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed mb-2">
                Governing law: Washington, USA.
              </p>
              <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed">
                Disputes go to binding arbitration (except small claims, IP disputes, or privacy
                violations). You waive class action rights.
              </p>
            </div>

            {/* 13. Security */}
            <div className="rounded-2xl border border-white/5 bg-[var(--surface-2)]/90 px-5 py-6 md:px-7 md:py-7 shadow-xl">
              <h2 className="text-lg md:text-xl font-semibold mb-3">
                13. Security &amp; Data Protection
              </h2>
              <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed">
                We implement strong security measures and will notify you of any data breaches as
                required by law.
              </p>
            </div>

            {/* 14. Changes to Terms */}
            <div className="rounded-2xl border border-white/5 bg-[var(--surface-2)]/90 px-5 py-6 md:px-7 md:py-7 shadow-xl">
              <h2 className="text-lg md:text-xl font-semibold mb-3">
                14. Changes to Terms
              </h2>
              <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed">
                We&apos;ll notify you of material changes via email or in-app notice. Continued use
                of the Service after changes go into effect means you accept the updated Terms.
              </p>
            </div>

            {/* 15. Contact */}
            <div className="rounded-2xl border border-white/5 bg-[var(--surface-2)]/90 px-5 py-6 md:px-7 md:py-7 shadow-xl">
              <h2 className="text-lg md:text-xl font-semibold mb-3">
                15. Contact Us
              </h2>
              <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed">
                Please contact{" "}
                <Link
                  href="mailto:oyana@oyana.ai"
                  className="text-[#6ac49a] underline underline-offset-2 hover:text-[#8adcb3]"
                >
                  oyana@oyana.ai
                </Link>{" "}
                for any questions or concerns about these Terms.
              </p>
            </div>
          </motion.section>

          {/* Final acknowledgement */}
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.4, delay: 0.4 }}
            className="mt-2 rounded-2xl border border-[#009775]/40 bg-[#009775]/10 px-5 py-5 md:px-7 md:py-6 text-center shadow-xl"
          >
            <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed">
              By using our Service, you acknowledge that you have read, understood, and agree to be
              bound by these Terms of Use.
            </p>
          </motion.section>
        </div>
      </div>
    </main>
  );
}


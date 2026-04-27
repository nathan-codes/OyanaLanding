"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FiLinkedin, FiMail } from "react-icons/fi";

const footerLinks = {
  Product: [
    { name: "Features", href: "/#features" },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "Demo", href: "/#demo" },
  ],
  Company: [
    { name: "About", href: "/about" },
    { name: "Privacy Policy", href: "/privacy-policy", openInNewTab: true },
    { name: "Terms of Use", href: "/terms", openInNewTab: true },
  ],
};

const socialLinks = [
  { icon: FiLinkedin, href: "https://www.linkedin.com/company/oyana26/", label: "LinkedIn", openInNewTab: true },
  { icon: FiMail, href: "mailto:oyana@oyana.ai", label: "Email" },
];

export default function Footer() {
  return (
    <footer
      className="backdrop-blur-sm"
      style={{
        borderTop: "1px solid var(--footer-border)",
        backgroundColor: "var(--footer-bg)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10 md:gap-12 mb-8">
          {/* Logo and Description */}
          <div className="max-w-xs">
            <Image
              src="/images/svg/Black logo - no background.svg"
              alt="Oyana Logo"
              width={120}
              height={24}
              className="h-8 w-auto mb-4 dark:hidden"
            />
            <Image
              src="/OyanaFinalLogo.svg"
              alt="Oyana Logo"
              width={120}
              height={24}
              className="h-8 w-auto mb-4 hidden dark:block"
            />
            <p className="text-body text-sm leading-relaxed">
              Oyana is built for YouTube creators and their teams. We use the YouTube API to securely access your
              video captions, retention metrics, and audience data to give you timestamped,
              actionable recommendations to increase your viewership.
            </p>
          </div>

          {/* Footer Links */}
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-16">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="font-semibold text-foreground mb-4">{category}</h3>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.name}>
                      <motion.a
                        href={link.href}
                        className="text-body text-sm hover:text-accent-text transition-colors inline-block"
                        whileHover={{ x: 4 }}
                        {...("openInNewTab" in link && link.openInNewTab
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        {link.name}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div
          className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTop: "1px solid var(--footer-border)" }}
        >
          <p className="text-body text-sm">
            © {new Date().getFullYear()} Oyana. All rights reserved.
          </p>

          {/* Badges + Social Links */}
          <div className="flex items-center gap-5">
            <div className="bg-white rounded-lg p-2 flex flex-col items-center gap-1.5 w-[80px]">
              <svg width="32" height="23" viewBox="0 0 110 78" role="img">
                <title>YouTube logo</title>
                <rect x="0" y="0" width="110" height="78" rx="18" fill="#FF0000"/>
                <polygon points="42,20 42,58 78,39" fill="white"/>
              </svg>
              <span className="text-center font-bold text-[#0f0f0f] text-[8px] leading-tight">
                Authorized YouTube Integration
              </span>
            </div>
            <div className="rounded-lg overflow-hidden w-[80px]">
              <Image
                src="/Google_API_Compliant_Badge.svg"
                alt="Compliant with Google API Services"
                width={80}
                height={73}
                className="w-full h-auto"
              />
            </div>

            <div className="w-px h-8" style={{ backgroundColor: "var(--border-color)" }} />

            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-body hover:text-accent-text transition-all"
                  style={{
                    backgroundColor: "var(--social-bg)",
                    border: "1px solid var(--social-border)",
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  {...("openInNewTab" in social && social.openInNewTab
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}

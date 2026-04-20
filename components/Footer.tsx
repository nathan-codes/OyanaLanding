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
  // { icon: FiTwitter, href: "#", label: "Twitter" },
  // { icon: FiGithub, href: "#", label: "GitHub" },
  { icon: FiLinkedin, href: "https://www.linkedin.com/company/oyana26/", label: "LinkedIn", openInNewTab: true },
  { icon: FiMail, href: "mailto:oyana@oyana.ai", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-800/50 bg-gray-900/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10 md:gap-12 mb-8">
          {/* Logo and Description */}
          <div className="max-w-xs">
            <Image
              src="/OyanaFinalLogo.svg"
              alt="Oyana Logo"
              width={120}
              height={24}
              className="h-8 w-auto mb-4"
            />
            <p className="text-gray-400 text-sm leading-relaxed">
              Oyana is built for YouTube creators and their teams. We use the YouTube API to securely access your
              video captions, retention metrics, and audience data to give you timestamped,
              actionable recommendations to increase your viewership.
            </p>
          </div>

          {/* Footer Links — far right */}
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-16">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="font-semibold text-white mb-4">{category}</h3>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.name}>
                      <motion.a
                        href={link.href}
                        className="text-gray-400 text-sm hover:text-[#6ac49a] transition-colors inline-block"
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
        <div className="pt-8 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
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

            <div className="w-px h-8 bg-gray-700/50" />

            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-gray-800/50 border border-[#009775]/20 flex items-center justify-center text-gray-400 hover:text-[#6ac49a] hover:border-[#009775]/40 transition-all"
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


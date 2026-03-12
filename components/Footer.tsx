"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FiTwitter, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

const footerLinks = {
  Product: [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Pricing", href: "#pricing" },
    { name: "Demo", href: "#demo" },
  ],
  // Resources: [
  //   { name: "Documentation", href: "#" },
  //   { name: "Blog", href: "#" },
  //   { name: "Case Studies", href: "#" },
  //   { name: "Support", href: "#" },
  // ],
  Company: [
    { name: "About", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Contact", href: "#contact" },
    { name: "Privacy", href: "#" },
  ],
};

const socialLinks = [
  // { icon: FiTwitter, href: "#", label: "Twitter" },
  // { icon: FiGithub, href: "#", label: "GitHub" },
  { icon: FiLinkedin, href: "#", label: "LinkedIn" },
  { icon: FiMail, href: "#", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-800/50 bg-gray-900/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="col-span-2">
            <Image
              src="/OyanaFinalLogo.svg"
              alt="Oyana Logo"
              width={120}
              height={24}
              className="h-8 w-auto mb-4"
            />
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Turn watch data into real growth. The next-generation video analytics platform for
              content creators.
            </p>
          </div>

          {/* Footer Links */}
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
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Oyana. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex gap-4">
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


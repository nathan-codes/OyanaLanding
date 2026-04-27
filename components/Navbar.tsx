"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";

const navLinks = [
  { name: "Features", href: "#features" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "About", href: "/about" },
  { name: "Get Started", href: "#signup" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleHashClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const resolveHref = (href: string) => {
    if (href.startsWith("#") && !isHome) return `/${href}`;
    return href;
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all ${
        isScrolled
          ? "backdrop-blur-md border-b"
          : "bg-transparent"
      }`}
      style={isScrolled ? { backgroundColor: "var(--nav-bg)", borderColor: "var(--nav-border)" } : undefined}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src="/images/svg/Black logo - no background.svg"
                alt="Oyana Logo"
                width={120}
                height={24}
                className="h-8 w-auto dark:hidden"
              />
              <Image
                src="/OyanaFinalLogo.svg"
                alt="Oyana Logo"
                width={120}
                height={24}
                className="h-8 w-auto hidden dark:block"
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isHash = link.href.startsWith("#");
              const isActive =
                !isHash && pathname === link.href;

              if (isHash && isHome) {
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleHashClick(link.href);
                    }}
                    className="text-body hover:text-accent-text transition-colors font-medium"
                    whileHover={{ y: -2 }}
                  >
                    {link.name}
                  </motion.a>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={resolveHref(link.href)}
                  className={`hover:text-accent-text transition-colors font-medium ${
                    isActive ? "text-accent-text" : "text-body"
                  }`}
                >
                  <motion.span whileHover={{ y: -2 }} className="inline-block">
                    {link.name}
                  </motion.span>
                </Link>
              );
            })}
            <motion.button
              type="button"
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent("open-invite-modal", { detail: {} })
                )
              }
              className="px-6 py-2 bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] rounded-full text-white font-semibold hover:shadow-lg transition-all cursor-pointer"
              style={{ boxShadow: "0 4px 14px var(--glow-color)" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Request Invite
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-body hover:text-accent-text transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-4 space-y-4"
          >
            {navLinks.map((link) => {
              const isHash = link.href.startsWith("#");

              if (isHash && isHome) {
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleHashClick(link.href);
                    }}
                    className="block text-body hover:text-accent-text transition-colors font-medium py-2"
                  >
                    {link.name}
                  </a>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={resolveHref(link.href)}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block hover:text-accent-text transition-colors font-medium py-2 ${
                    !isHash && pathname === link.href
                      ? "text-accent-text"
                      : "text-body"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                window.dispatchEvent(
                  new CustomEvent("open-invite-modal", { detail: {} })
                );
              }}
              className="block w-full px-6 py-2 bg-linear-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] rounded-full text-white font-semibold text-center cursor-pointer"
            >
              Request Invite
            </button>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  FiMail,
  FiMapPin,
  FiYoutube,
  FiX,
  FiCheck,
  FiChevronDown,
} from "react-icons/fi";

const COUNTRIES = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda",
  "Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain",
  "Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan",
  "Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria",
  "Burkina Faso","Burundi","Cabo Verde","Cambodia","Cameroon","Canada",
  "Central African Republic","Chad","Chile","China","Colombia","Comoros",
  "Congo (DRC)","Congo (Republic)","Costa Rica","Croatia","Cuba","Cyprus",
  "Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic",
  "Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia",
  "Eswatini","Ethiopia","Fiji","Finland","France","Gabon","Gambia","Georgia",
  "Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau",
  "Guyana","Haiti","Honduras","Hungary","Iceland","India","Indonesia","Iran",
  "Iraq","Ireland","Israel","Italy","Ivory Coast","Jamaica","Japan","Jordan",
  "Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos",
  "Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania",
  "Luxembourg","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta",
  "Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova",
  "Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar","Namibia",
  "Nauru","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria",
  "North Korea","North Macedonia","Norway","Oman","Pakistan","Palau","Palestine",
  "Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland",
  "Portugal","Qatar","Romania","Russia","Rwanda","Saint Kitts and Nevis",
  "Saint Lucia","Saint Vincent and the Grenadines","Samoa","San Marino",
  "Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles",
  "Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia",
  "South Africa","South Korea","South Sudan","Spain","Sri Lanka","Sudan",
  "Suriname","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania",
  "Thailand","Timor-Leste","Togo","Tonga","Trinidad and Tobago","Tunisia",
  "Turkey","Turkmenistan","Tuvalu","Uganda","Ukraine","United Arab Emirates",
  "United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu",
  "Vatican City","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe",
];

const YOUTUBE_URL_REGEX =
  /^https?:\/\/(www\.)?youtube\.com\/(@[\w.-]+|channel\/[\w-]+|c\/[\w.-]+|user\/[\w.-]+)(\/.*)?$/i;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormStatus = "idle" | "loading" | "success" | "error";

export default function RequestInviteModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [countrySearch, setCountrySearch] = useState("");
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = ((e: CustomEvent<{ email?: string }>) => {
      setEmail(e.detail?.email || "");
      setCountry("");
      setYoutubeUrl("");
      setCountrySearch("");
      setIsOpen(true);
      setStatus("idle");
      setErrors({});
    }) as EventListener;

    window.addEventListener("open-invite-modal", handler);
    return () => window.removeEventListener("open-invite-modal", handler);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!countryDropdownOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCountryDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [countryDropdownOpen]);

  useEffect(() => {
    if (countryDropdownOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [countryDropdownOpen]);

  const filteredCountries = COUNTRIES.filter((c) =>
    c.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const validateField = (field: string, value: string) => {
    const newErrors = { ...errors };

    switch (field) {
      case "email":
        if (!value) newErrors.email = "Email is required";
        else if (!EMAIL_REGEX.test(value)) newErrors.email = "Enter a valid email address";
        else delete newErrors.email;
        break;
      case "country":
        if (!value) newErrors.country = "Please select your country";
        else delete newErrors.country;
        break;
      case "youtubeUrl":
        if (!value) newErrors.youtubeUrl = "YouTube channel URL is required";
        else if (!YOUTUBE_URL_REGEX.test(value))
          newErrors.youtubeUrl =
            "Enter a valid YouTube URL (e.g. https://youtube.com/@yourchannel)";
        else delete newErrors.youtubeUrl;
        break;
    }

    setErrors(newErrors);
  };

  const validateAll = () => {
    const newErrors: Record<string, string> = {};

    if (!email) newErrors.email = "Email is required";
    else if (!EMAIL_REGEX.test(email)) newErrors.email = "Enter a valid email address";

    if (!country) newErrors.country = "Please select your country";

    if (!youtubeUrl) newErrors.youtubeUrl = "YouTube channel URL is required";
    else if (!YOUTUBE_URL_REGEX.test(youtubeUrl))
      newErrors.youtubeUrl =
        "Enter a valid YouTube URL (e.g. https://youtube.com/@yourchannel)";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/submit-invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, country, youtubeUrl }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Submission failed");
      }

      setStatus("success");
      setTimeout(() => {
        setIsOpen(false);
        setEmail("");
        setCountry("");
        setYoutubeUrl("");
        setStatus("idle");
      }, 2500);
    } catch {
      setStatus("error");
    }
  };

  const close = () => {
    if (status === "loading") return;
    setIsOpen(false);
    setStatus("idle");
    setErrors({});
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-100 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Request invite"
        >
          <button
            type="button"
            onClick={close}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
            aria-label="Close modal"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg rounded-2xl border border-[#009775]/20 bg-[#0a0f1a]/95 backdrop-blur-xl shadow-2xl shadow-[#009775]/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-2">
              <div>
                <h2 className="text-xl font-bold text-white font-display">
                  Request Early Access
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  Join the waitlist and be first to try Oyana
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                disabled={status === "loading"}
                aria-label="Close"
                className="rounded-full p-2 text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer disabled:opacity-50"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Success state */}
            {status === "success" ? (
              <div className="px-6 py-12 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="mx-auto w-16 h-16 rounded-full bg-[#009775]/20 flex items-center justify-center mb-4"
                >
                  <FiCheck className="w-8 h-8 text-[#6ac49a]" />
                </motion.div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  You&apos;re on the list!
                </h3>
                <p className="text-gray-400 text-sm">
                  We&apos;ll reach out when your invite is ready.
                </p>
              </div>
            ) : (
              /* Form */
              <form onSubmit={handleSubmit} className="px-6 pb-6 pt-4 space-y-5">
                {/* Email */}
                <div>
                  <label
                    htmlFor="invite-email"
                    className="block text-sm font-medium text-gray-300 mb-1.5"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 pointer-events-none" />
                    <input
                      id="invite-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) validateField("email", e.target.value);
                      }}
                      onBlur={() => validateField("email", email)}
                      placeholder="you@example.com"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 transition-all ${
                        errors.email
                          ? "border-red-500/60 focus:ring-red-500/30"
                          : "border-white/10 focus:border-[#6ac49a] focus:ring-[#009775]/30"
                      }`}
                      required
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>
                  )}
                </div>

                {/* Country */}
                <div>
                  <label
                    htmlFor="invite-country"
                    className="block text-sm font-medium text-gray-300 mb-1.5"
                  >
                    Location
                  </label>
                  <div className="relative" ref={dropdownRef}>
                    <button
                      id="invite-country"
                      type="button"
                      onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                      className={`w-full pl-10 pr-10 py-3 rounded-xl bg-white/5 border text-left text-sm focus:outline-none focus:ring-2 transition-all cursor-pointer ${
                        errors.country
                          ? "border-red-500/60 focus:ring-red-500/30"
                          : "border-white/10 focus:border-[#6ac49a] focus:ring-[#009775]/30"
                      } ${country ? "text-white" : "text-gray-500"}`}
                    >
                      {country || "Select your country"}
                    </button>
                    <FiMapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 pointer-events-none" />
                    <FiChevronDown
                      className={`absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 pointer-events-none transition-transform ${
                        countryDropdownOpen ? "rotate-180" : ""
                      }`}
                    />

                    <AnimatePresence>
                      {countryDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.15 }}
                          className="absolute z-20 mt-1.5 w-full rounded-xl border border-white/10 bg-[#0e1525] shadow-xl overflow-hidden"
                        >
                          <div className="p-2 border-b border-white/10">
                            <input
                              ref={searchInputRef}
                              type="text"
                              value={countrySearch}
                              onChange={(e) => setCountrySearch(e.target.value)}
                              placeholder="Search countries..."
                              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#6ac49a]"
                            />
                          </div>
                          <ul className="max-h-48 overflow-y-auto py-1 scrollbar-thin">
                            {filteredCountries.length === 0 ? (
                              <li className="px-4 py-3 text-sm text-gray-500 text-center">
                                No countries found
                              </li>
                            ) : (
                              filteredCountries.map((c) => (
                                <li key={c}>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setCountry(c);
                                      setCountryDropdownOpen(false);
                                      setCountrySearch("");
                                      if (errors.country) validateField("country", c);
                                    }}
                                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors cursor-pointer ${
                                      country === c
                                        ? "bg-[#009775]/20 text-[#6ac49a]"
                                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                                    }`}
                                  >
                                    {c}
                                  </button>
                                </li>
                              ))
                            )}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  {errors.country && (
                    <p className="mt-1.5 text-xs text-red-400">{errors.country}</p>
                  )}
                </div>

                {/* YouTube URL */}
                <div>
                  <label
                    htmlFor="invite-youtube"
                    className="block text-sm font-medium text-gray-300 mb-1.5"
                  >
                    YouTube channel URL
                  </label>
                  <div className="relative">
                    <FiYoutube className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 pointer-events-none" />
                    <input
                      id="invite-youtube"
                      type="url"
                      value={youtubeUrl}
                      onChange={(e) => {
                        setYoutubeUrl(e.target.value);
                        if (errors.youtubeUrl)
                          validateField("youtubeUrl", e.target.value);
                      }}
                      onBlur={() => validateField("youtubeUrl", youtubeUrl)}
                      placeholder="https://youtube.com/@yourchannel"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 transition-all ${
                        errors.youtubeUrl
                          ? "border-red-500/60 focus:ring-red-500/30"
                          : "border-white/10 focus:border-[#6ac49a] focus:ring-[#009775]/30"
                      }`}
                    />
                  </div>
                  {errors.youtubeUrl && (
                    <p className="mt-1.5 text-xs text-red-400">{errors.youtubeUrl}</p>
                  )}
                </div>

                {/* Error banner */}
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400"
                  >
                    Something went wrong. Please try again.
                  </motion.div>
                )}

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-3.5 rounded-xl bg-linear-to-r from-[#009775] to-[#6ac49a] font-semibold text-white text-sm flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#009775]/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                  whileHover={status !== "loading" ? { scale: 1.01 } : undefined}
                  whileTap={status !== "loading" ? { scale: 0.99 } : undefined}
                >
                  {status === "loading" ? (
                    <>
                      <svg
                        className="animate-spin w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <span>Request Invite</span>
                  )}
                </motion.button>

                <p className="text-xs text-gray-500 text-center">
                  By requesting an invite, you agree to our{" "}
                  <a href="/terms" className="text-[#6ac49a] hover:underline">
                    Terms
                  </a>{" "}
                  and{" "}
                  <a href="/privacy-policy" className="text-[#6ac49a] hover:underline">
                    Privacy Policy
                  </a>
                  .
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

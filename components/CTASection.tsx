"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FiMail, FiArrowRight } from "react-icons/fi";

export default function CTASection() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section id="signup" className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 gradient-animated opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,151,117,0.3),transparent_70%)]" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Headline */}
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-center">
            Ready to Transform Your{" "}
            <span className="bg-gradient-to-r from-[#009775] via-[#6ac49a] to-[#009775] bg-clip-text text-transparent glow-text">
              Watch Time?
            </span>
          </h2>
          <p className="text-lg text-gray-300 mb-12 text-center">
            Join thousands of creators who are using data-driven insights to grow their channels. Start your free trial today.
          </p>

          {/* Signup Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-[#009775]/30 text-white placeholder-gray-400 focus:outline-none focus:border-[#6ac49a] focus:ring-2 focus:ring-[#009775]/50 transition-all"
                  required
                />
              </div>
              <motion.button
                type="submit"
                className=" cursor-pointer  px-8 py-4 bg-gradient-to-r from-[#009775] to-[#6ac49a] rounded-full font-semibold text-white flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#009775]/50 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isSubmitted ? (
                  <>
                    <span>✓</span>
                    <span>Signed Up!</span>
                  </>
                ) : (
                  <>
                    <span>Get Started</span>
                    <FiArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </div>
          </motion.form>

         
        </motion.div>
      </div>
    </section>
  );
}


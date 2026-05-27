"use client";

import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";

export default function InviteSuccessContent() {
  return (
    <div className="px-6 py-12 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4"
        style={{ backgroundColor: "var(--subtle-bg)" }}
      >
        <FiCheck className="w-8 h-8 text-accent-text" />
      </motion.div>
      <h1 className="text-lg font-semibold text-foreground mb-2 font-display">
        You&apos;re on the list!
      </h1>
      <p className="text-body text-sm">
        We&apos;ll reach out when your invite is ready.
      </p>
    </div>
  );
}

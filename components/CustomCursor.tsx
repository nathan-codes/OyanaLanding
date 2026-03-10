"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile/touch
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    };
    checkMobile();

    if (isMobile) return;

    // Add CSS to hide default cursor
    const style = document.createElement("style");
    style.textContent = `
      * {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.head.removeChild(style);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
        style={{
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#009775] to-[#6ac49a] border border-[#6ac49a]/50 shadow-lg shadow-[#009775]/30" />
      </motion.div>
  );
}


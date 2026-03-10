"use client";

import { useState, useRef, useEffect, useImperativeHandle, forwardRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface VideoEmbedProps {
  videoId: string;
  className?: string;
}

export interface VideoEmbedRef {
  play: () => void;
}

const VideoEmbed = forwardRef<VideoEmbedRef, VideoEmbedProps>(
  ({ videoId, className = "" }, ref) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      play: () => {
        setIsPlaying(true);
      },
    }));

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0&modestbranding=1`;

  return (
    <motion.div
      ref={containerRef}
      className={`relative overflow-hidden rounded-2xl ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Glow border effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: isHovered
            ? "linear-gradient(135deg, rgba(0, 151, 117, 0.4), rgba(106, 196, 154, 0.4))"
            : "linear-gradient(135deg, rgba(0, 151, 117, 0.2), rgba(106, 196, 154, 0.2))",
        }}
        animate={{
          opacity: isHovered ? 1 : 0.6,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative z-10 aspect-video bg-black rounded-2xl overflow-hidden">
        {!isPlaying ? (
          <div className="relative w-full h-full cursor-pointer" onClick={() => setIsPlaying(true)}>
            <Image
              src={thumbnailUrl}
              alt="Video thumbnail"
              fill
              className="object-cover"
              priority
            />
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-black/30"
              whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
            >
              <motion.div
                className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center backdrop-blur-sm"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  className="w-10 h-10 text-[#009775] ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </motion.div>
            </motion.div>
          </div>
        ) : (
          <iframe
            src={embedUrl}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Oyana Demo Video"
          />
        )}
      </div>
    </motion.div>
  );
});

VideoEmbed.displayName = "VideoEmbed";

export default VideoEmbed;


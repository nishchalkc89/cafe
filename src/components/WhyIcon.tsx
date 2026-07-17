"use client";

import { motion } from "framer-motion";

const pathVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1 },
};

const draw = {
  initial: "hidden" as const,
  whileInView: "visible" as const,
  viewport: { once: true, margin: "-10%" },
};

export default function WhyIcon({ name }: { name: string }) {
  const common = { width: 26, height: 26, viewBox: "0 0 24 24", fill: "none" } as const;

  switch (name) {
    case "plant":
      return (
        <motion.svg
          {...common}
          whileHover={{ scale: 1.12, rotate: -6 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <motion.path
            {...draw}
            variants={pathVariants}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            d="M12 21V10"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <motion.path
            {...draw}
            variants={pathVariants}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            d="M12 12c0-4 3-6.5 7-6.5C19 9.5 16 12 12 12Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <motion.path
            {...draw}
            variants={pathVariants}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            d="M12 15c0-3.5-2.5-6-6-6-.5 4 2 6.5 6 6Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </motion.svg>
      );
    case "sunrise":
      return (
        <motion.svg
          {...common}
          whileHover={{ scale: 1.12, rotate: 6 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <motion.path
            {...draw}
            variants={pathVariants}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            d="M12 3v4"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <motion.path
            {...draw}
            variants={pathVariants}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            d="M4.2 13a7.8 7.8 0 0115.6 0"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <motion.path
            {...draw}
            variants={pathVariants}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            d="M2 17h20"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <motion.path
            {...draw}
            variants={pathVariants}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            d="M2 21h20"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity="0.4"
          />
          <motion.path
            {...draw}
            variants={pathVariants}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            d="M5.5 7.5l2 2M18.5 7.5l-2 2"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </motion.svg>
      );
    case "award":
      return (
        <motion.svg
          {...common}
          whileHover={{ scale: 1.12, rotate: -6 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <motion.circle
            {...draw}
            variants={pathVariants}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            cx="12"
            cy="9"
            r="5"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <motion.path
            {...draw}
            variants={pathVariants}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            d="M8.5 13.2 7 21l5-2.5L17 21l-1.5-7.8"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </motion.svg>
      );
    case "lamp":
      return (
        <motion.svg
          {...common}
          whileHover={{ scale: 1.12, rotate: 6 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <motion.path
            {...draw}
            variants={pathVariants}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            d="M7 4h10l-2.5 6h-5L7 4Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <motion.path
            {...draw}
            variants={pathVariants}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            d="M12 10v7"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <motion.path
            {...draw}
            variants={pathVariants}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            d="M8 21h8"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <motion.path
            {...draw}
            variants={pathVariants}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            d="M9 21c0-1.7 1.3-3 3-3s3 1.3 3 3"
            stroke="currentColor"
            strokeWidth="1.4"
          />
        </motion.svg>
      );
    default:
      return null;
  }
}

import React from "react";
import { motion } from "framer-motion";

interface EventPillProps {
  type: string;
  category: string;
  color: string;
  label: string;
}

export function EventPill({ type, category, color, label }: EventPillProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      transition={{ duration: 0.2 }}
      className="inline-flex items-center gap-2"
    >
      <span
        className="rounded-full px-3 py-1 text-xs font-semibold transition-all duration-200"
        style={{
          backgroundColor: `${color}20`,
          borderWidth: "1px",
          borderColor: `${color}40`,
          color: color,
        }}
      >
        {type}
      </span>
      <span className="text-xs font-medium text-white/70">{label}</span>
    </motion.div>
  );
}

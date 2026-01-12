"use client";
import { motion } from "framer-motion";

export const AudioWaveform = () => {
  return (
    <div className="flex items-end gap-[2px] h-full w-full opacity-90">
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={i}
          animate={{ 
            height: ["10%", "50%", "20%", "90%", "30%"] 
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatType: "mirror",
            delay: i * 0.02,
            ease: "easeInOut"
          }}
          className="w-[2px] bg-white shadow-[0_0_5px_white] rounded-full"
        />
      ))}
    </div>
  );
};
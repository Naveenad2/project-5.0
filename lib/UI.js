"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { IconVolume2, IconVolumeX, IconX, IconSend, ColoursLogo } from "./Icons";

const VIDEO_URL = "/video.mp4"; 

export const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap');
    :root { --font-primary: 'Inter', sans-serif; --color-bg: #EAE7E0; --color-accent: #D4F93C; --color-primary: #5D5FEF; }
    body { font-family: var(--font-primary); margin: 0; padding: 0; background-color: var(--color-bg); -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; overflow-x: hidden; }
    ::selection { background: var(--color-primary); color: white; }
    .text-image-mask { -webkit-background-clip: text; background-clip: text; color: transparent; background-size: cover; background-position: center; background-repeat: no-repeat; }
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: #EAE7E0; }
    ::-webkit-scrollbar-thumb { background: #ccc; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: #888; }
  `}</style>
);

export const ReusableVideoCard = ({ isHero = false, className = "" }) => {
  const [isMuted, setIsMuted] = useState(true); 
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
        videoRef.current.muted = true;
        videoRef.current.play().catch(e => console.log("Autoplay blocked", e));
    }
  }, []);

  const toggleMute = (e) => {
    e.stopPropagation(); 
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div className={`relative bg-black overflow-hidden shadow-2xl group border border-white/10 ${className}`}>
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video ref={videoRef} loop playsInline className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700">
          <source src={VIDEO_URL} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
      </div>
      <motion.button onClick={toggleMute} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="absolute top-6 right-6 z-50 bg-white/10 backdrop-blur-md p-3 rounded-full text-white hover:bg-[#D4F93C] hover:text-black transition-all duration-300 ring-1 ring-white/20 flex items-center gap-2">
        {isMuted ? <><IconVolumeX size={18} /> <span className="text-xs font-bold hidden group-hover:inline">UNMUTE</span></> : <IconVolume2 size={18} />}
      </motion.button>
    </div>
  );
};

export const ProjectModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[300] flex items-center justify-center bg-black/90 backdrop-blur-md p-6" onClick={onClose}>
      <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-white w-full max-w-lg rounded-2xl p-8 text-center relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"><IconX size={24} className="text-black" /></button>
        <h2 className="text-4xl font-black tracking-tighter mb-4 text-black">START A PROJECT</h2>
        <p className="text-gray-600 mb-8 text-lg leading-relaxed">Ready to create something memorable? Let&apos;s bring your vision to life.</p>
        <div className="flex flex-col gap-4">
          <a href="mailto:chantal@coloursbahrain.com" className="w-full py-4 bg-[#D4F93C] text-black font-bold uppercase tracking-widest rounded-xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-3 text-sm md:text-base"><IconSend size={20} /> Email Us</a>
          <button onClick={onClose} className="w-full py-4 bg-gray-100 text-gray-600 font-bold uppercase tracking-widest rounded-xl hover:bg-gray-200 transition-colors text-sm md:text-base">Maybe Later</button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- UPDATED LOADER: DARK VIOLET/BLUE GRADIENT ---
export const Loader = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => { onComplete(); }, 4000); 
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
        className="fixed inset-0 z-[9999] flex items-center justify-center"
        style={{
            background: "linear-gradient(135deg, #090919 0%, #161a3c 50%, #2a1b3d 100%)"
        }}
        initial={{ opacity: 1 }} 
        exit={{ opacity: 0 }} 
        transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="relative w-[80vw] md:w-[60vw] max-w-[800px] flex items-center justify-center p-8">
        {/* LOGO CONTAINER */}
        <motion.div 
            initial={{ scale: 0.8, opacity: 0, filter: "blur(20px)" }} 
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }} 
            exit={{ scale: 1.5, opacity: 0, filter: "blur(10px)" }} 
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-auto relative"
        >
            <ColoursLogo className="w-full h-full drop-shadow-2xl" />
            
            {/* SHIMMER EFFECT */}
            <motion.div 
                initial={{ x: "-150%", opacity: 0 }}
                animate={{ x: "150%", opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut", delay: 0.8 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 pointer-events-none mix-blend-overlay"
            />
        </motion.div>
      </div>
    </motion.div>
  );
};
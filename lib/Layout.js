"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconArrowUpRight } from "./Icons";
import { Loader, GlobalStyles } from "./UI";
import ChatWidget from "./ChatWidget";

// --- CREATIVE FOOTER ---
export const Footer = ({ onNavigate }) => {
    return (
        <footer className="relative bg-black text-white pt-32 pb-12 overflow-hidden border-t border-white/10">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <div className="absolute -top-[20%] right-0 w-[50vw] h-[50vw] bg-[#4F46E5] rounded-full blur-[250px] opacity-[0.1] pointer-events-none" />

            <div className="max-w-[1800px] mx-auto px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
                    <div className="md:col-span-5 flex flex-col justify-between h-full">
                        <div>
                            <h2 className="text-3xl font-black tracking-tighter uppercase mb-8">Colours</h2>
                            <p className="text-xl text-white/60 font-light leading-relaxed max-w-sm">
                                Creating world-class spaces & events that elevate ambitions across the GCC.
                            </p>
                        </div>
                        <div className="mt-12">
                            <h4 className="text-xs font-bold uppercase tracking-widest mb-4 text-[#4F46E5]">Stay Updated</h4>
                            <div className="flex border-b border-white/20 pb-2 group focus-within:border-white transition-colors">
                                <input type="email" placeholder="Enter your email" className="bg-transparent w-full outline-none text-white placeholder:text-white/20" />
                                <button className="text-white/40 hover:text-[#4F46E5] transition-colors"><IconArrowUpRight size={20} /></button>
                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-7 flex flex-wrap gap-12 md:gap-24 justify-start md:justify-end">
                        <div className="flex flex-col gap-4">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-[#4F46E5] mb-2">Explore</h4>
                            {['Home', 'Gallery', 'Services', 'About'].map((item) => (
                                <button key={item} onClick={() => onNavigate && onNavigate(item.toLowerCase())} className="text-2xl md:text-3xl font-light hover:text-[#4F46E5] text-left transition-colors">{item}</button>
                            ))}
                        </div>
                        <div className="flex flex-col gap-4">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-[#4F46E5] mb-2">Follow</h4>
                            {['Instagram', 'Facebook', 'Twitter', 'LinkedIn'].map((social) => (
                                <a key={social} href="#" className="text-lg text-white/60 hover:text-white transition-colors flex items-center gap-2 group">
                                    {social} <IconArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="border-t border-white/10 pt-12 mb-8">
                    <h1 className="text-[14vw] leading-[0.8] font-black text-center tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-transparent pointer-events-none select-none">COLOURS</h1>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center text-xs font-medium uppercase tracking-widest text-white/30 gap-4">
                    <span>© 2025 Colours Bahrain.</span>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

// --- MAIN LAYOUT ---
export const Layout = ({ children }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => { 
      const scriptId = 'tailwind-cdn'; 
      if (!document.getElementById(scriptId)) { 
          const script = document.createElement("script"); 
          script.id = scriptId; 
          script.src = "https://cdn.tailwindcss.com"; 
          script.async = true; 
          document.head.appendChild(script); 
      } 
  }, []);

  return (
    <div className="relative w-full bg-[#EAE7E0] font-sans selection:bg-[#4F46E5] selection:text-white">
      <GlobalStyles />
      <ChatWidget />
      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      {!loading && (<>{children}</>)}
    </div>
  );
};
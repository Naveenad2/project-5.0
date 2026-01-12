"use client";
import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// --- DATA ---
const SLIDES = [
  { id: 0, title: "ROYAL SUMMIT", img: "/insta/image1.png" },
  { id: 1, title: "TECH EXPO", img: "/insta/image2.png" },
  { id: 2, title: "LUXURY RETAIL", img: "/insta/image3.png" },
  { id: 3, title: "F1 GRAND PRIX", img: "/insta/image4.png" },
  { id: 4, title: "ART BAHRAIN", img: "/insta/image5.png" },
];

// --- INTERNAL HEADER (Nav + Logo) ---
const IntegratedHeader = () => (
    <nav className="absolute top-0 left-0 w-full z-50 flex justify-between items-start px-8 py-8">
        {/* Left: Logo Box & Tabs */}
        <div className="flex items-stretch">
            {/* Logo Box */}
            <div className="bg-[#0a0a0a] border border-white/20 px-4 py-2 flex items-center justify-center mr-4">
                 <svg className="w-24 h-auto" viewBox="0 0 471.56 198.94">
                    <path fill="white" d="M356.45,113.18v-9.88c-2.01,3.58-4.89,6.45-8.63,8.63s-8.02,3.27-12.82,3.27c-8.04,0-14.24-2.23-18.6-6.7-4.36-4.47-6.53-10.55-6.53-18.26v-45.4h10.89v43.56c0,4.69,1.37,8.69,4.11,11.98,2.74,3.3,6.73,4.94,11.98,4.94,3.01,0,5.75-.64,8.21-1.92s4.52-2.93,6.2-4.94,2.96-4.27,3.85-6.78,1.34-4.94,1.34-7.29v-39.54h10.89v68.35h-10.89s0-.02,0-.02Z"/>
                    <path fill="white" d="M418.43,56.89c-3.01-2.57-6.31-3.86-9.88-3.86-2.23,0-4.33.59-6.28,1.76-1.96,1.17-3.69,2.77-5.2,4.77-1.51,2.01-2.68,4.33-3.52,6.95-.84,2.63-1.26,5.39-1.26,8.3v38.36h-10.89V44.82h10.89v9.38c1.9-3.35,4.41-6.09,7.54-8.21,3.12-2.12,6.65-3.18,10.56-3.18,2.79,0,5.22.4,7.29,1.17,2.07.78,4.16,2.12,6.28,4.02l-5.53,8.88h0Z"/>
                    <path fill="white" d="M469.65,102.96c-1.27,2.46-2.97,4.58-5.11,6.37-2.15,1.79-4.67,3.18-7.57,4.19s-5.91,1.51-9.04,1.51c-4.58,0-8.96-.73-13.15-2.18s-7.85-3.41-10.97-5.86l5.86-8.38c2.68,2.12,5.64,3.74,8.88,4.86s6.25,1.68,9.05,1.68c1.68,0,3.29-.22,4.86-.67,1.56-.45,2.96-1.12,4.19-2.01s2.2-1.93,2.93-3.1c.72-1.17,1.09-2.54,1.09-4.1,0-1.9-.39-3.49-1.18-4.78-.79-1.28-1.88-2.43-3.28-3.44-1.4-1-3.03-1.87-4.88-2.6-1.85-.72-3.79-1.42-5.8-2.1-2.36-.89-4.77-1.9-7.24-3.01-2.47-1.12-4.66-2.46-6.56-4.02-1.91-1.56-3.48-3.46-4.72-5.69-1.23-2.23-1.85-4.97-1.85-8.21,0-2.79.61-5.36,1.84-7.71,1.23-2.34,2.9-4.3,5.03-5.86,2.12-1.56,4.5-2.79,7.12-3.69,2.62-.89,5.39-1.34,8.29-1.34,3.8,0,7.54.5,11.22,1.51,3.69,1.01,7.26,2.79,10.72,5.36l-5.03,8.38c-2.68-1.9-5.44-3.29-8.29-4.19-2.85-.89-5.72-1.34-8.63-1.34-2.68,0-5.25.67-7.7,2.01-2.46,1.34-3.69,3.52-3.69,6.53s1.28,5.17,3.85,6.79c2.57,1.62,5.97,3.16,10.22,4.61,2.46.9,4.97,1.93,7.54,3.1s4.88,2.6,6.95,4.27c2.07,1.68,3.74,3.74,5.03,6.2,1.28,2.46,1.93,5.42,1.93,8.88,0,2.91-.63,5.59-1.9,8.04h0Z"/>
                    <path fill="white" d="M52.03,110.25c-5.08,3.29-10.86,4.94-17.34,4.94-5.36,0-10.16-.95-14.41-2.85s-7.87-4.47-10.89-7.71-5.34-7.09-6.96-11.56c-1.62-4.47-2.43-9.22-2.43-14.24s.84-9.55,2.51-13.9c1.68-4.36,4.02-8.18,7.03-11.48,3.02-3.29,6.59-5.89,10.72-7.79s8.65-2.85,13.57-2.85c3.91,0,7.4.45,10.47,1.34,3.07.9,5.78,2.04,8.13,3.43,2.35,1.4,4.41,2.93,6.2,4.61s3.29,3.35,4.52,5.02l-8.21,6.37c-2.24-2.9-5-5.39-8.29-7.46-3.3-2.06-7.35-3.1-12.15-3.1-3.58,0-6.79.7-9.63,2.09-2.85,1.39-5.28,3.26-7.29,5.59-2.01,2.34-3.58,5.01-4.69,8.02-1.12,3.01-1.68,6.18-1.68,9.52,0,3.9.58,7.49,1.76,10.77,1.17,3.29,2.77,6.1,4.77,8.43,2.01,2.34,4.44,4.17,7.29,5.51,2.85,1.34,5.95,2.01,9.3,2.01,4.91,0,9.13-1.12,12.65-3.35,3.52-2.23,6.73-5.3,9.63-9.21l7.87,5.87c-3.24,4.69-7.4,8.69-12.48,11.98h.03Z"/>
                    <path fill="white" d="M135.45,93.07c-1.84,4.47-4.36,8.35-7.54,11.64s-6.95,5.86-11.31,7.7c-4.35,1.84-9.05,2.76-14.07,2.76s-9.72-.89-14.08-2.68c-4.35-1.79-8.12-4.27-11.31-7.46s-5.67-7.01-7.46-11.47c-1.79-4.47-2.68-9.38-2.68-14.74,0-5.02.86-9.72,2.6-14.07,1.73-4.36,4.16-8.18,7.29-11.48,3.13-3.29,6.87-5.87,11.22-7.71,4.36-1.84,9.1-2.76,14.24-2.76s9.91.92,14.32,2.76,8.21,4.36,11.39,7.54c3.18,3.18,5.67,6.95,7.45,11.31,1.79,4.36,2.68,9.05,2.68,14.07s-.92,10.11-2.77,14.58h.03ZM125.15,68.31c-1.23-3.17-2.93-5.9-5.11-8.18s-4.77-4.03-7.79-5.26c-3.02-1.23-6.31-1.84-9.89-1.84s-6.84.64-9.8,1.92-5.5,3.09-7.62,5.43-3.77,5.07-4.94,8.18c-1.17,3.12-1.76,6.51-1.76,10.19,0,3.9.59,7.43,1.76,10.61,1.17,3.17,2.82,5.93,4.94,8.27s4.66,4.15,7.62,5.43,6.23,1.92,9.8,1.92c3.79,0,7.23-.67,10.3-2.01,3.07-1.33,5.67-3.17,7.79-5.51s3.74-5.09,4.86-8.27c1.12-3.17,1.68-6.65,1.68-10.44s-.61-7.26-1.84-10.44h0Z"/>
                    <path fill="white" d="M147.43,113.18V17.17h10.89v96.01h-10.89Z"/>
                 </svg>
            </div>

            {/* Nav Tabs */}
            <div className="flex gap-2">
                {['Gallery', 'Services', 'Events'].map((item) => (
                    <Link 
                        key={item} 
                        href={`#${item.toLowerCase()}`}
                        className="bg-[#0a0a0a] border border-white/20 px-6 py-2 text-xs font-bold uppercase tracking-widest text-white/70 hover:text-black hover:bg-white transition-all flex items-center justify-center"
                    >
                        {item}
                    </Link>
                ))}
                <Link 
                    href="#home"
                    className="bg-white border border-white px-6 py-2 text-xs font-bold uppercase tracking-widest text-black flex items-center justify-center"
                >
                    Colours
                </Link>
            </div>
        </div>

        {/* Right: Language/Action */}
        <div className="flex gap-2">
             <button className="bg-[#0a0a0a] border border-white/20 px-6 py-2 text-xs font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all">ENG</button>
             <button className="bg-[#0a0a0a] border border-white/20 px-6 py-2 text-xs font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all">AR</button>
        </div>
    </nav>
);

// --- VISUALS ---
const Waveform = () => (
  <div className="absolute bottom-16 left-0 w-full h-24 z-20 pointer-events-none opacity-80 mix-blend-screen">
    <svg viewBox="0 0 500 100" className="w-full h-full" preserveAspectRatio="none">
      <motion.path
        d="M0,50 Q25,50 50,50 T100,50 T150,50 T200,50 T250,50 T300,50 T350,50 T400,50 T450,50 T500,50"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
        animate={{ d: [
            "M0,50 Q25,40 50,60 T100,40 T150,60 T200,45 T250,55 T300,40 T350,60 T400,45 T450,55 T500,50",
            "M0,50 Q25,60 50,40 T100,60 T150,40 T200,55 T250,45 T300,60 T350,40 T400,55 T450,45 T500,50",
            "M0,50 Q25,40 50,60 T100,40 T150,60 T200,45 T250,55 T300,40 T350,60 T400,45 T450,55 T500,50"
        ] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  </div>
);

const DotGrid = () => (
    <div className="absolute inset-[-50%] w-[200%] h-[200%] z-0 pointer-events-none">
        <div className="w-full h-full opacity-20" style={{ backgroundImage: 'radial-gradient(#555 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
    </div>
);

export const HeroContent = () => {
  const [index, setIndex] = useState(2);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => { setDirection(1); setIndex((prev) => (prev + 1) % SLIDES.length); }, []);
  const prevSlide = useCallback(() => { setDirection(-1); setIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length); }, []);

  return (
    <div className="relative w-full h-screen bg-[#050508] overflow-hidden flex flex-col items-center justify-center text-white perspective-[1200px]">
      
      {/* HEADER INSIDE HERO */}
      <IntegratedHeader />

      <DotGrid />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/80 pointer-events-none z-10" />

      {/* 3D CAROUSEL */}
      <div className="relative w-full max-w-[1400px] h-[60vh] flex items-center justify-center z-20 perspective-[1000px] transform-style-3d mt-[-60px]">
        <AnimatePresence mode="popLayout" custom={direction}>
            {SLIDES.map((slide, i) => {
                let offset = i - index;
                if (offset < -2) offset += SLIDES.length;
                if (offset > 2) offset -= SLIDES.length;
                if (Math.abs(offset) > 2) return null;

                const isActive = offset === 0;

                return (
                    <motion.div
                        key={slide.id}
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ 
                            opacity: isActive ? 1 : 0.5,
                            x: `${offset * 55}%`,
                            z: isActive ? 0 : -300,
                            rotateY: isActive ? 0 : offset * -60,
                            scale: isActive ? 1 : 0.8,
                            filter: isActive ? "brightness(1)" : "brightness(0.3)",
                        }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="absolute w-[350px] md:w-[450px] aspect-square origin-center cursor-pointer select-none"
                        style={{ zIndex: isActive ? 50 : 40 - Math.abs(offset) }}
                        onClick={() => { if (offset < 0) prevSlide(); if (offset > 0) nextSlide(); }}
                    >
                        <div className="relative w-full h-full bg-[#111] overflow-hidden shadow-2xl border border-white/10">
                            <img src={slide.img} alt={slide.title} className="w-full h-full object-cover" />
                            {isActive && (
                                <>
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border border-white/80 flex items-center justify-center transition-transform hover:scale-110">
                                        <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1" />
                                    </div>
                                    <Waveform />
                                    <div className="absolute top-8 left-8 right-8">
                                        <h2 className="text-4xl font-black uppercase leading-none tracking-tight mix-blend-difference">{slide.title}</h2>
                                    </div>
                                </>
                            )}
                        </div>
                    </motion.div>
                );
            })}
        </AnimatePresence>
      </div>

      {/* BOTTOM BAR */}
      <div className="absolute bottom-0 left-0 w-full z-50 bg-black border-t border-white/10">
          <div className="max-w-[1400px] mx-auto h-20 flex justify-between items-center px-8">
              <button onClick={prevSlide} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors">
                  <span>←</span> Previous
              </button>
              <div className="flex items-center gap-2 cursor-pointer group bg-[#111] px-6 py-2 rounded-sm border border-white/10">
                  <span className="text-sm font-bold tracking-tight">{SLIDES[index].title}</span>
                  <span className="text-white/50 text-xs rotate-90 group-hover:rotate-[-90deg] transition-transform">›</span>
              </div>
              <button onClick={nextSlide} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors">
                  Next <span>→</span>
              </button>
          </div>
      </div>
      <style jsx global>{` .transform-style-3d { transform-style: preserve-3d; } `}</style>
    </div>
  );
};
"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { 
    motion, 
    useSpring, 
    PanInfo, 
    useMotionValue, 
    useTransform,
    AnimatePresence 
} from "framer-motion";
import { 
    ChevronLeft, ChevronRight, ArrowUpRight, Zap, Hexagon, Sparkles, 
    Layers, Crosshair, Target, Users, Trophy 
} from "lucide-react";
import Image from "next/image";
import { AudioWaveform } from "@/components/ui/AudioWaveform";

// -- Content Configuration --
const SERVICES = [
  {
    id: 1,
    title: "EVENTS",
    subtitle: "MANAGEMENT",
    desc: "Corporate Experiences",
    color: "#E11D48", // Rose Red
    image: "/insta/image1.png",
  },
  {
    id: 2,
    title: "EXHIBITIONS",
    subtitle: "STAND BUILD",
    desc: "Custom Fabrication",
    color: "#8B5CF6", // Electric Violet
    image: "/insta/image2.png",
  },
  {
    id: 3,
    title: "INTERIORS",
    subtitle: "FIT-OUT",
    desc: "Commercial Spaces",
    color: "#3B82F6", // Electric Blue
    image: "/insta/image3.png",
  },
  {
    id: 4,
    title: "MALL KIOSK",
    subtitle: "RETAIL",
    desc: "Pop-up Displays",
    color: "#10B981", // Neon Emerald
    image: "/insta/image4.png",
  },
  {
    id: 5,
    title: "MEDIA",
    subtitle: "PRODUCTION",
    desc: "Large Format Branding",
    color: "#F97316", // Bright Orange
    image: "/insta/image5.png",
  },
];

const CLIENTS = [
    "Bahrain EDB", "Gulf Air", "DO & CO", "The Avenues", "Seef Mall", "BIC", "Tamkeen", "Marassi", "Edamah", "Bahrain Marina"
];

const ANGLE_STEP = 22; 

// --- 1. MEMOIZED BACKGROUND COMPONENT (Prevents Flicker) ---
const BackgroundLayer = React.memo(({ activeColor }: { activeColor: string }) => {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* A. Static Dot Grid (Never re-renders) */}
            <div className="absolute inset-0 z-0 opacity-30"
                 style={{
                     backgroundImage: 'radial-gradient(#ffffff 1.5px, transparent 1.5px)',
                     backgroundSize: '40px 40px',
                     maskImage: 'radial-gradient(circle at center, black 50%, transparent 100%)', 
                     WebkitMaskImage: 'radial-gradient(circle at center, black 50%, transparent 100%)'
                 }}
            />

            {/* B. Smoothly Animating Neons */}
            {/* Using layoutId or key would cause flicker; animate prop handles interpolation smoothly */}
            <motion.div 
               animate={{ x: [0, 80, 0], scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
               transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
               className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-blue-600 blur-[100px] rounded-full mix-blend-screen will-change-transform"
            />
            <motion.div 
               animate={{ x: [0, -80, 0], scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
               transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
               className="absolute top-[10%] right-[-15%] w-[55vw] h-[55vw] bg-violet-700 blur-[100px] rounded-full mix-blend-screen will-change-transform"
            />
             <motion.div 
               animate={{ y: [0, -60, 0], opacity: [0.2, 0.4, 0.2] }}
               transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
               className="absolute bottom-[-15%] left-[20%] w-[50vw] h-[50vw] bg-emerald-600 blur-[100px] rounded-full mix-blend-screen will-change-transform"
            />

            {/* C. Active Beam (Smooth Color Transition) */}
            <motion.div 
              animate={{ backgroundColor: activeColor }}
              transition={{ duration: 1.5 }} // Smooth 1.5s fade prevents flicker
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.2] blur-[120px] mix-blend-color-dodge will-change-[background-color]"
            />
            
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,#000000_100%)]" />
        </div>
    );
});
BackgroundLayer.displayName = "BackgroundLayer";


// --- MAIN COMPONENT ---
export default function Carousel3D() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const RADIUS = isMobile ? 350 : 750;   
  const CARD_WIDTH = isMobile ? 220 : 280; 

  const rotationSpring = useSpring(0, { stiffness: 40, damping: 25, mass: 1.2 });

  useEffect(() => {
    const unsubscribe = rotationSpring.on("change", (currentRotation) => {
      const index = Math.round(-currentRotation / ANGLE_STEP);
      const wrapped = ((index % SERVICES.length) + SERVICES.length) % SERVICES.length;
      // Only update state if index actually changed to prevent render loops
      if (wrapped !== activeIndex) setActiveIndex(wrapped);
    });
    return () => unsubscribe();
  }, [activeIndex, rotationSpring]);

  const handleDrag = (_: any, info: PanInfo) => {
    const rotateDelta = info.delta.x / (isMobile ? 8 : 14); 
    rotationSpring.set(rotationSpring.get() + rotateDelta);
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    const current = rotationSpring.get();
    const velocity = info.velocity.x / (isMobile ? 5 : 10); 
    const target = current + velocity;
    const snap = Math.round(target / ANGLE_STEP) * ANGLE_STEP;
    rotationSpring.set(snap);
  };

  const next = () => {
    const target = Math.round((rotationSpring.get() - ANGLE_STEP) / ANGLE_STEP) * ANGLE_STEP;
    rotationSpring.set(target);
  };

  const prev = () => {
    const target = Math.round((rotationSpring.get() + ANGLE_STEP) / ANGLE_STEP) * ANGLE_STEP;
    rotationSpring.set(target);
  };

  const activeColor = SERVICES[activeIndex].color;

  return (
    <div ref={containerRef} className="relative w-full h-full flex flex-col items-center justify-center bg-black overflow-hidden group/stage perspective-1000">
      
      {/* 4. BACKGROUND (Memoized) */}
      <BackgroundLayer activeColor={activeColor} />

      {/* 5. 3D CAROUSEL STAGE */}
      <div className="relative w-full h-[65vh] md:h-[75vh] flex items-center justify-center perspective-1200 z-10">
        <motion.div
          className="relative w-full h-full flex items-center justify-center preserve-3d cursor-grab active:cursor-grabbing will-change-transform"
          style={{ 
            rotateY: rotationSpring,
            z: -RADIUS + (isMobile ? 150 : 300) 
          }}
          drag="x"
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
        >
          {SERVICES.map((item, i) => (
            <CarouselItem 
              key={item.id} 
              item={item} 
              index={i} 
              isActive={i === activeIndex}
              cardWidth={CARD_WIDTH}
              radius={RADIUS}
              angleStep={ANGLE_STEP}
            />
          ))}
        </motion.div>
      </div>

      {/* 6. HUD UI */}
      <div className="absolute bottom-0 w-full z-50 pointer-events-none">
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-black via-black/90 to-transparent z-[-1]" />

        <div className="max-w-[1800px] mx-auto px-6 md:px-12 pb-8 md:pb-12 flex flex-col gap-6">
            
            <div className="flex items-end justify-between w-full">
                
                <div className="hidden md:flex flex-col pointer-events-auto">
                    <div className="flex items-center gap-2 mb-2 pl-1">
                        <Layers size={10} className="text-white/80" />
                        <span className="text-[9px] text-white/80 uppercase tracking-[0.2em]">Project Index</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-mono text-white tracking-tighter drop-shadow-lg">0{activeIndex + 1}</span>
                        <div className="h-[2px] w-8 bg-white/60" />
                        <span className="text-sm font-mono text-white/60">0{SERVICES.length}</span>
                    </div>
                </div>

                <div className="pointer-events-auto flex items-center gap-4 md:gap-8 mx-auto md:mx-0">
                    <button 
                        onClick={prev}
                        className="group w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                    >
                        <ChevronLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
                    </button>

                    <div className="h-10 md:h-12 px-6 md:px-8 border border-white/20 bg-white/5 backdrop-blur-xl rounded-full flex items-center justify-center min-w-[180px] md:min-w-[240px] shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden group cursor-pointer transition-all hover:border-white/40">
                        <div className="flex flex-col items-center relative z-10">
                            <motion.span 
                                key={activeIndex}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-[8px] md:text-[9px] uppercase tracking-widest font-bold mb-0.5"
                                style={{ color: activeColor, textShadow: `0 0 15px ${activeColor}` }}
                            >
                                {SERVICES[activeIndex].subtitle}
                            </motion.span>
                            <motion.span 
                                key={activeIndex + "_t"}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-xs md:text-sm font-black uppercase tracking-[0.2em] text-white group-hover:scale-105 transition-transform duration-500"
                            >
                                {SERVICES[activeIndex].title}
                            </motion.span>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </div>

                    <button 
                        onClick={next}
                        className="group w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                    >
                        <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                    </button>
                </div>

                <div className="hidden md:flex pointer-events-auto flex-col items-end opacity-80">
                    <Hexagon size={28} strokeWidth={1} className="animate-spin-slow text-white drop-shadow-lg" />
                </div>
            </div>

            <div className="w-full border-t border-white/20 pt-4 flex items-center gap-6 overflow-hidden pointer-events-auto relative">
                <div className="hidden md:flex items-center gap-2 pr-6 border-r border-white/20 z-10 bg-black">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/80 whitespace-nowrap">Trusted Partners</span>
                </div>
                <div className="flex-1 overflow-hidden relative mask-linear-fade">
                     <motion.div 
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                        className="flex items-center gap-12 whitespace-nowrap will-change-transform"
                     >
                        {[...CLIENTS, ...CLIENTS, ...CLIENTS].map((client, i) => (
                            <div key={i} className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity cursor-default group">
                                <Zap size={10} className="text-white/60 group-hover:text-emerald-400 transition-colors" />
                                <span className="text-xs font-bold uppercase tracking-widest text-white/90 group-hover:text-white transition-colors">{client}</span>
                            </div>
                        ))}
                     </motion.div>
                     <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-black to-transparent" />
                     <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-black to-transparent" />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

// -- MEMOIZED CARD ITEM (Important for Performance) --
const CarouselItem = React.memo(({ item, index, isActive, cardWidth, radius, angleStep }: any) => {
    const angle = index * angleStep;

    return (
        <motion.div
            className="absolute top-1/2 left-1/2 will-change-transform preserve-3d"
            style={{
                width: cardWidth,
                height: cardWidth * 1.6, 
                marginLeft: -cardWidth / 2,
                marginTop: -(cardWidth * 1.6) / 2,
                transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
            }}
        >
            <div 
                className={`
                    relative w-full h-full bg-[#050505] overflow-hidden transition-all duration-500 ease-out 
                    border backdrop-blur-xl preserve-3d rounded-sm
                    ${isActive ? 'border-white/60 shadow-[0_0_60px_rgba(255,255,255,0.15)] scale-[1.02] opacity-100' : 'border-white/10 opacity-30 grayscale scale-100'}
                `}
                style={{ transformStyle: 'preserve-3d' }}
            >
                
                {/* 1. HEADER */}
                <div 
                    className="absolute top-0 left-0 right-0 z-30 p-5 bg-gradient-to-b from-black/90 to-transparent flex justify-between items-start"
                    style={{ transform: "translateZ(30px)" }}
                >
                    <div className="flex flex-col">
                        <span className="text-[9px] font-mono text-white/60 mb-1">ID // 0{index + 1}</span>
                        <div className="flex items-center gap-1.5">
                            <div className="w-1 h-1 bg-white rounded-full" />
                            <span className="text-[10px] font-bold text-white uppercase tracking-widest">{item.subtitle}</span>
                        </div>
                    </div>
                    {isActive && <Crosshair size={14} className="text-white/60 animate-spin-slow" />}
                </div>

                {/* 2. IMAGE */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 220px, 280px"
                        priority={isActive}
                        className="object-cover"
                        draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/5 mix-blend-overlay pointer-events-none z-10" />
                    <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-20" />
                </div>
                
                {/* 3. BORDER GLOW */}
                {isActive && (
                    <motion.div 
                        layoutId="activeGlow"
                        className="absolute inset-0 border-[1px] z-30 pointer-events-none rounded-sm"
                        style={{ borderColor: item.color, boxShadow: `inset 0 0 20px ${item.color}20, 0 0 20px ${item.color}40` }}
                    />
                )}

                {/* 4. FOOTER */}
                <div 
                    className="absolute bottom-0 left-0 right-0 p-5 z-30 flex flex-col justify-end h-full"
                    style={{ transform: "translateZ(40px)" }}
                >
                    <div className="flex flex-col items-start transform transition-transform duration-500">
                        {isActive && (
                            <div className="flex items-center gap-2 mb-3 opacity-80">
                                <AudioWaveform />
                                <span className="text-[8px] font-mono text-white/70 uppercase">Interactive</span>
                            </div>
                        )}

                        <h2 className="text-3xl font-black text-white leading-[0.85] tracking-tighter uppercase mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                            {item.title}
                        </h2>
                        
                        <div className={`
                            group flex items-center gap-3 px-4 py-2 border border-white/20 bg-white/5 backdrop-blur-md rounded-sm cursor-pointer transition-all duration-300
                            ${isActive ? 'opacity-100 translate-y-0 hover:bg-white hover:border-white' : 'opacity-0 translate-y-4'}
                        `}>
                            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white group-hover:text-black transition-colors">
                                View Case
                            </span>
                            <ArrowUpRight size={12} className="text-white group-hover:text-black transition-colors" />
                        </div>
                    </div>
                </div>

                {/* 5. CORNERS */}
                <div className="absolute inset-4 pointer-events-none z-20 opacity-0 group-hover:opacity-60 transition-opacity">
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white" />
                </div>

            </div>
        </motion.div>
    );
});
CarouselItem.displayName = "CarouselItem";
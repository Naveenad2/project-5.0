"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  useVelocity, 
  useMotionValue, 
  useAnimationFrame,
  AnimatePresence 
} from "framer-motion";

// --- ASSETS & ICONS ---
const IconInstagram = ({ size = 20, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);
const IconPlay = ({ size = 24, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}><path d="M8 5v14l11-7z" /></svg>
);
const IconX = ({ size = 24, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6L6 18M6 6l12 12" /></svg>
);
const IconArrowDown = ({ size = 24, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 5v14" /><path d="m19 12-7 7-7-7" /></svg>
);

// --- MOCK DATA ---
const generateMockPosts = () => {
  return Array.from({ length: 24 }).map((_, i) => ({
    id: i,
    type: i % 3 === 0 ? 'video' : 'image',
    // Using architecture/abstract images for luxury feel
    url: `https://picsum.photos/seed/${i + 950}/900/${i % 2 === 0 ? 1200 : 1000}`, 
    videoUrl: "https://videos.pexels.com/video-files/3196238/3196238-uhd_2560_1440_25fps.mp4", 
    caption: `Colours Bahrain Production #${i + 1} // The Art of Experience.`
  }));
};

// --- COMPONENTS ---

// 1. FILM GRAIN OVERLAY
const GrainOverlay = () => (
    <div className="fixed inset-0 pointer-events-none z-[50] opacity-20 mix-blend-overlay">
        <svg className='w-full h-full'>
            <filter id='noise'>
                <feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch' />
            </filter>
            <rect width='100%' height='100%' filter='url(#noise)' />
        </svg>
    </div>
);

// 2. CUSTOM CURSOR
const CustomCursor = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);
  
    useEffect(() => {
      const moveCursor = (e) => {
        cursorX.set(e.clientX - 16);
        cursorY.set(e.clientY - 16);
      };
      window.addEventListener("mousemove", moveCursor);
      return () => window.removeEventListener("mousemove", moveCursor);
    }, [cursorX, cursorY]);
  
    return (
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 bg-[#D4F93C] rounded-full pointer-events-none z-[100] mix-blend-difference hidden md:block"
        style={{ x: cursorXSpring, y: cursorYSpring }}
      />
    );
};

// 3. PARALLAX IMAGE CARD WITH VELOCITY SKEW
const GalleryCard = ({ item, onClick }) => {
    const videoRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    // Play video on hover
    useEffect(() => {
        if (item.type === 'video' && videoRef.current) {
            isHovered ? videoRef.current.play().catch(() => {}) : videoRef.current.pause();
        }
    }, [isHovered, item.type]);

    return (
        <motion.div
            className="relative mb-12 w-full cursor-pointer group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => onClick(item)}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="relative overflow-hidden rounded-lg bg-[#1a1a1a]">
                {/* Image Scale Effect */}
                <motion.div 
                    className="w-full h-full"
                    animate={{ scale: isHovered ? 1.05 : 1 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                >
                    {item.type === 'video' ? (
                         <div className="aspect-[3/4] relative">
                            <img src={item.url} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`} alt="" />
                            <video ref={videoRef} src={item.videoUrl} muted loop playsInline className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
                            <div className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-full text-white">
                                <IconPlay size={12} />
                            </div>
                         </div>
                    ) : (
                        <img src={item.url} alt="Gallery" className="w-full aspect-[3/4] object-cover" />
                    )}
                </motion.div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-between p-6">
                    <div className="flex justify-end">
                        <IconInstagram className="text-white opacity-0 group-hover:opacity-100 transition-opacity delay-100 duration-500" />
                    </div>
                    <div>
                        <p className="text-[#D4F93C] text-xs font-bold tracking-widest uppercase transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                            Instagram
                        </p>
                        <p className="text-white font-medium text-sm mt-2 line-clamp-2 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                            {item.caption}
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// 4. PARALLAX COLUMN
const ParallaxColumn = ({ items, yOffset = 0, speed = 1, setSelectedItem }) => {
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    
    // The Skew Effect (Velocity based)
    const skew = useSpring(useTransform(scrollVelocity, [-2000, 2000], [10, -10]), {
        mass: 0.1,
        stiffness: 400,
        damping: 30
    });

    // The Parallax Effect
    const y = useTransform(scrollY, [0, 4000], [0, yOffset * speed * -1]);

    return (
        <motion.div style={{ y, skewY: skew }} className="flex flex-col w-full">
            {items.map((item) => (
                <GalleryCard key={item.id} item={item} onClick={setSelectedItem} />
            ))}
        </motion.div>
    );
};

// 5. LIGHTBOX
const Lightbox = ({ item, onClose }) => {
    if (!item) return null;
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-[#050505]/98 backdrop-blur-2xl flex items-center justify-center p-4"
            onClick={onClose}
        >
             <CustomCursor /> 
            <button className="absolute top-8 right-8 text-white/50 hover:text-[#D4F93C] transition-colors z-[1000]">
                <IconX size={40} />
            </button>

            <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative max-w-7xl w-full h-[85vh] flex flex-col md:flex-row rounded-xl overflow-hidden shadow-2xl bg-black border border-white/5"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex-1 relative bg-black flex items-center justify-center">
                    {item.type === 'video' ? (
                        <video src={item.videoUrl} controls autoPlay className="max-w-full max-h-full object-contain" />
                    ) : (
                        <img src={item.url} alt="" className="max-w-full max-h-full object-contain" />
                    )}
                </div>
                <div className="w-full md:w-96 bg-[#111] p-10 flex flex-col justify-between border-l border-white/5">
                    <div>
                        <div className="flex items-center gap-4 mb-8">
                             <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#D4F93C] to-blue-500 p-[2px]">
                                <div className="w-full h-full rounded-full bg-black" />
                             </div>
                             <div>
                                <h3 className="text-white font-bold tracking-wide">colours.bahrain</h3>
                                <p className="text-white/40 text-xs uppercase tracking-widest">Official Feed</p>
                             </div>
                        </div>
                        <p className="text-white/80 leading-relaxed font-light text-lg">{item.caption}</p>
                    </div>
                    <a href="https://instagram.com" target="_blank" className="w-full py-4 mt-8 border border-white/20 text-white hover:bg-[#D4F93C] hover:text-black hover:border-[#D4F93C] transition-all uppercase font-bold tracking-widest text-xs flex items-center justify-center gap-3">
                        View on Instagram <IconArrowDown className="-rotate-90" />
                    </a>
                </div>
            </motion.div>
        </motion.div>
    );
};

// --- MAIN PAGE ---
export default function GallerySection({ onClose }) {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Simulating Data Load
    setItems(generateMockPosts());
  }, []);

  // Split items into 3 columns for desktop, 2 for tablet, 1 for mobile (css handles hiding)
  const col1 = items.filter((_, i) => i % 3 === 0);
  const col2 = items.filter((_, i) => i % 3 === 1);
  const col3 = items.filter((_, i) => i % 3 === 2);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#050505] text-white overflow-hidden selection:bg-[#D4F93C] selection:text-black">
        <GrainOverlay />
        <CustomCursor />
        
        <AnimatePresence>
            {selectedItem && <Lightbox item={selectedItem} onClose={() => setSelectedItem(null)} />}
        </AnimatePresence>

        {/* --- HEADER --- */}
        <div className="relative z-10 pt-32 pb-20 px-6 md:px-20 max-w-[1800px] mx-auto">
             <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
             >
                <div className="flex items-center gap-4 mb-4">
                    <div className="h-[1px] w-12 bg-[#D4F93C]" />
                    <span className="text-[#D4F93C] uppercase tracking-[0.3em] text-xs font-bold">The Archive</span>
                </div>
                <h1 className="text-[12vw] md:text-[8vw] font-black tracking-tighter leading-[0.85] mix-blend-difference text-white">
                    VISUAL <br/> <span className="italic text-[#333]">DIARY</span>
                </h1>
             </motion.div>
        </div>

        {/* --- PARALLAX GRID --- */}
        <div className="relative z-10 px-4 md:px-12 max-w-[1800px] mx-auto pb-40">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                
                {/* Column 1 - Slow */}
                <div className="flex flex-col gap-12 pt-0">
                    <ParallaxColumn items={col1} speed={0.5} yOffset={200} setSelectedItem={setSelectedItem} />
                </div>

                {/* Column 2 - Fast (Parallax) - Hidden on Mobile */}
                <div className="hidden md:flex flex-col gap-12 -mt-20 lg:-mt-40">
                    <ParallaxColumn items={col2} speed={1.2} yOffset={400} setSelectedItem={setSelectedItem} />
                </div>

                 {/* Column 3 - Normal - Hidden on Tablet */}
                 <div className="hidden lg:flex flex-col gap-12 pt-20">
                    <ParallaxColumn items={col3} speed={0.8} yOffset={100} setSelectedItem={setSelectedItem} />
                </div>

            </div>

            {/* Load More Trigger */}
            <div className="flex justify-center mt-32">
                <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative w-32 h-32 rounded-full border border-[#333] flex items-center justify-center hover:border-[#D4F93C] transition-colors bg-[#050505]"
                >
                    <span className="text-xs font-bold uppercase tracking-widest group-hover:text-[#D4F93C] transition-colors z-10">Load More</span>
                    <div className="absolute inset-0 bg-[#D4F93C] rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 opacity-10" />
                </motion.button>
            </div>
        </div>

        {/* --- BACKGROUND DECORATION --- */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
            <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-[#D4F93C]/5 rounded-full blur-[150px]" />
        </div>
    </div>
  );
}
"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useVelocity, useInView } from "framer-motion";
import { IconArrowUpRight } from "./Icons"; 

// --- LOCAL DATA CONFIGURATION ---
// Ensure your images are saved as image1.png, image2.png... inside public/insta/
const INSTA_POSTS = [
    // --- Column 1 ---
    { 
        id: 1, 
        type: "reel", 
        img: "/insta/image1.png", // <--- Updated to local path
        caption: "Concert Stage Design 🎵", 
        likes: "1.2k", 
        ratio: "aspect-[3/4]" 
    },
    { 
        id: 2, 
        type: "post", 
        img: "/insta/image2.png", 
        caption: "VIP Lounge Setup ✨", 
        likes: "890", 
        ratio: "aspect-[4/3]" // Wide photo
    },
    { 
        id: 3, 
        type: "reel", 
        img: "/insta/image3.png", 
        caption: "Royal Summit Opening", 
        likes: "2.5k", 
        ratio: "aspect-[9/16]" // Tall Reel
    },
    
    // --- Column 2 ---
    { 
        id: 4, 
        type: "post", 
        img: "/insta/image4.png", 
        caption: "Tech Conference Hall", 
        likes: "645", 
        ratio: "aspect-[1/1]" // Square
    },
    { 
        id: 5, 
        type: "post", 
        img: "/insta/image5.png", 
        caption: "Award Night Gala 🏆", 
        likes: "1.1k", 
        ratio: "aspect-[4/5]" 
    },
    { 
        id: 6, 
        type: "reel", 
        img: "/insta/image6.png", 
        caption: "Festival Crowd Energy", 
        likes: "3.2k", 
        ratio: "aspect-[3/4]" 
    },
    
    // --- Column 3 ---
    { 
        id: 7, 
        type: "post", 
        img: "/insta/image7.png", 
        caption: "Luxury Mall Kiosk", 
        likes: "720", 
        ratio: "aspect-[4/3]" 
    },
    { 
        id: 8, 
        type: "post", 
        img: "/insta/image8.png", 
        caption: "Modern Office Fitout", 
        likes: "950", 
        ratio: "aspect-[1/1]" 
    },
    { 
        id: 9, 
        type: "reel", 
        img: "/insta/image9.png", 
        caption: "Live Event Production", 
        likes: "4.1k", 
        ratio: "aspect-[9/16]" 
    },
];

// --- CARD COMPONENT (Full Color & Liquid Motion) ---
const InstaCard = ({ post, index }) => {
    const isReel = post.type === "reel";
    
    return (
        <motion.a
            href="https://www.instagram.com/colours.bahrain/" 
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block w-full mb-8 overflow-hidden rounded-[24px] bg-[#111]"
            // Springy Entrance Animation
            initial={{ opacity: 0, y: 120, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ 
                type: "spring", 
                stiffness: 70, 
                damping: 20, 
                delay: index * 0.05 
            }}
            whileHover={{ y: -10, scale: 1.02 }}
        >
            {/* Image Wrapper - Matches aspect ratio */}
            <div className={`relative w-full overflow-hidden ${post.ratio}`}>
                 <motion.img 
                    src={post.img} 
                    alt={post.caption}
                    // Full Color by default, subtle zoom on hover
                    className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
                />
                
                {/* Holographic Border Glow (Appears on Hover) */}
                <div className="absolute inset-0 border-2 border-[#4F46E5]/0 group-hover:border-[#4F46E5]/80 transition-colors duration-500 rounded-[24px] z-20 pointer-events-none" />
                
                {/* Gradient Overlay (Appears on Hover for text) */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#4F46E5]/90 via-[#050508]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                
                {/* Content Reveal (Liquid Slide Up) */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end z-20 overflow-hidden">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="opacity-0 group-hover:opacity-100"
                    >
                        {/* Reel/Post Tag */}
                        <span className="inline-flex items-center justify-center px-3 py-1 mb-3 text-[9px] font-bold uppercase tracking-widest text-white border border-white/20 bg-black/30 backdrop-blur-md rounded-full">
                            {isReel ? "Reel" : "Post"}
                        </span>

                        {/* Caption */}
                        <p className="text-white text-lg font-medium leading-tight mb-4 drop-shadow-md line-clamp-2">
                            {post.caption}
                        </p>
                        
                        {/* Likes & Arrow */}
                        <div className="flex items-center justify-between border-t border-white/20 pt-3">
                            <span className="text-white/90 text-xs font-mono">{post.likes} Likes</span>
                            <div className="w-6 h-6 rounded-full bg-white text-[#4F46E5] flex items-center justify-center">
                                <IconArrowUpRight size={12} />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.a>
    );
};

// --- MAIN FEED SECTION ---
const InstagramFeed = () => {
    const containerRef = useRef(null);
    const { scrollY } = useScroll();
    
    // 1. Physics-based Skew (Velocity)
    const scrollVelocity = useVelocity(scrollY);
    const skewVelocity = useTransform(scrollVelocity, [-1000, 1000], [2, -2]); 
    const skewVelocitySpring = useSpring(skewVelocity, { stiffness: 200, damping: 30 });

    // 2. Parallax Columns
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]); // Middle moves opposite
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -200]);

    // Split data
    const col1 = INSTA_POSTS.slice(0, 3);
    const col2 = INSTA_POSTS.slice(3, 6);
    const col3 = INSTA_POSTS.slice(6, 9);

    return (
        <section ref={containerRef} className="relative w-full py-32 bg-[#050508] overflow-hidden border-t border-white/5">
            
            {/* Background: Ambient Glows (Indigo/Violet) */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 -left-[10%] w-[50vw] h-[50vw] bg-[#4F46E5] rounded-full blur-[250px] opacity-[0.06]" />
                <div className="absolute bottom-0 -right-[10%] w-[60vw] h-[60vw] bg-violet-900 rounded-full blur-[200px] opacity-[0.08]" />
            </div>

            <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
                
                {/* Header */}
                <div className="flex flex-col lg:flex-row justify-between items-end mb-24">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Huge Background Text */}
                        <h2 className="text-[12vw] lg:text-[8rem] leading-[0.8] font-black text-transparent bg-clip-text bg-gradient-to-b from-[#1a1a1a] to-transparent uppercase tracking-tighter select-none absolute -top-10 -left-4 -z-10 pointer-events-none">
                            Social
                        </h2>
                        {/* Foreground Title */}
                        <h2 className="text-5xl md:text-7xl font-light text-white tracking-tight ml-2">
                            Curated <span className="italic font-serif text-[#4F46E5]">Vibes.</span>
                        </h2>
                    </motion.div>

                    {/* View Profile Button */}
                    <motion.a 
                        href="https://www.instagram.com/colours.bahrain/" 
                        target="_blank"
                        className="hidden lg:flex group items-center gap-4 text-white hover:text-[#4F46E5] transition-colors cursor-pointer mb-4"
                        whileHover={{ x: 10 }}
                    >
                        <span className="text-sm font-bold uppercase tracking-[0.2em]">View Profile</span>
                        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#4F46E5] group-hover:bg-[#4F46E5] group-hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(79,70,229,0.3)]">
                            <IconArrowUpRight size={18} />
                        </div>
                    </motion.a>
                </div>

                {/* Parallax Grid */}
                <motion.div 
                    style={{ skewY: skewVelocitySpring }} 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {/* Column 1 (Fast) */}
                    <motion.div style={{ y: y1 }} className="flex flex-col gap-0">
                        {col1.map((post, i) => <InstaCard key={post.id} post={post} index={i} />)}
                    </motion.div>

                    {/* Column 2 (Slow / Opposite) */}
                    <motion.div style={{ y: y2 }} className="flex flex-col gap-0 md:pt-32">
                        {col2.map((post, i) => <InstaCard key={post.id} post={post} index={i+3} />)}
                    </motion.div>

                    {/* Column 3 (Fastest) */}
                    <motion.div style={{ y: y3 }} className="flex flex-col gap-0 md:pt-16">
                        {col3.map((post, i) => <InstaCard key={post.id} post={post} index={i+6} />)}
                    </motion.div>

                </motion.div>

                {/* Mobile Button */}
                <div className="lg:hidden mt-20 flex justify-center">
                    <a 
                        href="https://www.instagram.com/colours.bahrain/" 
                        className="px-8 py-4 bg-[#4F46E5] rounded-full text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-[0_0_30px_rgba(79,70,229,0.4)]"
                    >
                        View All Posts
                    </a>
                </div>

            </div>
        </section>
    );
};

export default InstagramFeed;
"use client";

import { useRef, useState } from "react";
import { 
    motion, 
    useScroll, 
    useTransform, 
    useSpring, 
    AnimatePresence,
    useMotionValue,
    useMotionTemplate
} from "framer-motion";
import { 
    ArrowLeft, Target, Users, Trophy, Zap, 
    Hexagon, Sparkles, Aperture, MousePointer2, Globe, 
    Layers, Fingerprint, X, Mail, Copy, Check, Phone,
    Facebook, Instagram, Monitor, Box, ArrowUpRight, MapPin,
    CornerDownRight
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ColoursLogoHeader } from "@/components/ui/ColoursLogoHeader";

// --- DATA CONFIGURATION ---
const STATS = [
    { label: "Legacy Established", value: "2000", icon: Zap, color: "text-rose-500", suffix: "" },
    { label: "GCC Projects", value: "500", icon: Target, color: "text-blue-500", suffix: "+" },
    { label: "In-House Experts", value: "50", icon: Users, color: "text-emerald-500", suffix: "+" },
    { label: "Industry Awards", value: "18", icon: Trophy, color: "text-yellow-500", suffix: "" },
];

const CAPABILITIES = [
    { title: "Exhibition Fabrication", icon: Box, desc: "Custom stands & pavilions" },
    { title: "Event Management", icon: Sparkles, desc: "End-to-end execution" },
    { title: "Interior Fit-Out", icon: Aperture, desc: "Commercial spaces" },
    { title: "Brand Activation", icon: Fingerprint, desc: "Digital & physical" }
];

const GALLERY_IMAGES = [
    "/insta/image1.png", "/insta/image2.png", "/insta/image3.png",
    "/insta/image4.png", "/insta/image5.png", "/insta/image6.png",
    "/insta/image7.png", "/insta/image8.png", "/insta/image9.png"
];

const CONTACT_INFO = {
    phone: "+973 17295917",
    address: "Unit 07, Building 2568, Road 4450, Block 744, A'ali, Bahrain",
    email: "info@coloursbahrain.com",
    instagram: "https://www.instagram.com/colours.bahrain/?hl=en",
    facebook: "https://www.facebook.com/ColoursEventsBahrain?_rdc=1&_rdr"
};

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showContact, setShowContact] = useState(false);
  
  const { scrollYProgress } = useScroll({
    container: containerRef, 
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  const yHero = useTransform(smoothProgress, [0, 0.2], [0, -200]);
  const opacityHero = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const bgTextY = useTransform(smoothProgress, [0, 1], [0, 400]);

  return (
    <div ref={containerRef} className="bg-[#020204] h-screen w-full relative overflow-y-auto overflow-x-hidden text-white selection:bg-emerald-500/30 font-sans perspective-1000 scroll-smooth">
      
      {/* 1. NEON GALAXY ATMOSPHERE */}
      <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 z-0 opacity-20"
               style={{
                   backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
                   backgroundSize: '100px 100px',
                   maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)', 
               }}
          />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04]" />

          <motion.div 
             animate={{ x: [0, 100, 0], scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
             className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] bg-blue-900/40 blur-[150px] rounded-full mix-blend-screen"
          />
          <motion.div 
             animate={{ x: [0, -100, 0], scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
             transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
             className="absolute top-[10%] right-[-20%] w-[70vw] h-[70vw] bg-violet-900/40 blur-[150px] rounded-full mix-blend-screen"
          />
           <motion.div 
             animate={{ y: [0, -100, 0], opacity: [0.2, 0.4, 0.2] }}
             transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
             className="absolute bottom-[-20%] left-[10%] w-[60vw] h-[60vw] bg-emerald-900/30 blur-[150px] rounded-full mix-blend-screen"
          />

          <motion.div 
            style={{ y: bgTextY }}
            className="absolute top-0 left-0 w-full flex flex-col items-center justify-center opacity-[0.02] select-none pointer-events-none"
          >
              <h1 className="text-[20vw] font-black leading-[0.8] tracking-tighter">COLOURS</h1>
              <h1 className="text-[20vw] font-black leading-[0.8] tracking-tighter ml-48">BAHRAIN</h1>
          </motion.div>
      </div>

      {/* 2. HUD NAVIGATION */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-start mix-blend-difference pointer-events-none">
        <Link href="/" className="pointer-events-auto group flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity">
            <div className="w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                <ArrowLeft size={18} />
            </div>
            <div className="hidden sm:flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] leading-none mb-1 text-white">Return</span>
                <span className="text-[8px] font-mono text-white/50 leading-none">MAIN_GRID</span>
            </div>
        </Link>
        <div className="pointer-events-auto w-32 opacity-100 drop-shadow-2xl">
            <ColoursLogoHeader className="w-full h-auto fill-white" />
        </div>
      </nav>

      {/* 3. HERO SECTION */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-24 z-10">
        <motion.div style={{ y: yHero, opacity: opacityHero }} className="max-w-[1800px] mx-auto w-full pt-32">
            <div className="flex items-center gap-4 mb-12">
                <div className="px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center gap-3 shadow-lg">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[10px] font-mono text-emerald-300 uppercase tracking-widest">Est. 2000 // Bahrain</span>
                </div>
                <div className="h-[1px] w-16 bg-gradient-to-r from-white/40 to-transparent" />
                <span className="text-[10px] font-mono text-white/40 tracking-wider">GCC_OPERATIONS_ACTIVE</span>
            </div>
            
            <div className="relative z-20">
                <h1 className="text-7xl md:text-[11rem] font-black tracking-tighter leading-[0.85] mb-8 uppercase text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                    Architects of <br /> 
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-white to-blue-300 animate-gradient-x">Memory.</span>
                </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-16 items-start">
                <div className="relative">
                    <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-emerald-500 to-blue-500" />
                    <p className="text-xl md:text-3xl font-light text-white/90 leading-relaxed pl-8">
                        A dynamic, full-service event management agency based in <span className="text-white font-medium">Bahrain</span>. 
                        From fabrication to execution, we deliver end-to-end brand experiences across the <span className="text-emerald-400">GCC</span>.
                    </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    {CAPABILITIES.map((cap, i) => (
                        <div key={i} className="group relative overflow-hidden p-6 border border-white/10 bg-white/5 rounded-xl hover:border-white/30 transition-all duration-500 hover:-translate-y-1">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <cap.icon size={24} className="text-white/60 group-hover:text-emerald-400 transition-colors mb-4" />
                            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-1">{cap.title}</h3>
                            <p className="text-[10px] text-white/40 uppercase tracking-wide">{cap.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="absolute bottom-12 left-6 md:left-24 flex items-center gap-4 opacity-60 mix-blend-difference">
                <MousePointer2 size={16} className="animate-bounce" />
                <span className="text-[10px] font-mono uppercase tracking-widest">Scroll to Explore</span>
            </div>
        </motion.div>
      </section>

      {/* 4. STATS SECTION */}
      <section className="relative z-20 border-y border-white/10 bg-black/60 backdrop-blur-xl">
          <div className="max-w-[1800px] mx-auto px-6 md:px-24">
              <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
                  {STATS.map((stat, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.8 }}
                        className="py-16 md:py-24 px-8 group cursor-default relative overflow-hidden"
                      >
                          <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                              <ArrowUpRight size={16} className="text-white/40" />
                          </div>
                          
                          <div className="flex items-center gap-3 mb-4 opacity-60 group-hover:opacity-100 transition-opacity relative z-10">
                              <stat.icon size={16} className={stat.color} />
                              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/80">{stat.label}</span>
                          </div>
                          <div className="flex items-baseline relative z-10">
                              <span className="text-6xl md:text-7xl font-medium tracking-tighter text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-white/40 transition-all duration-500">
                                  {stat.value}
                              </span>
                              <span className="text-3xl text-emerald-500/80 font-mono ml-1">{stat.suffix}</span>
                          </div>
                      </motion.div>
                  ))}
              </div>
          </div>
      </section>

      {/* 5. QUANTUM GALLERY SECTION */}
      <GallerySection />

      {/* 6. GLOBAL NETWORK */}
      <section className="relative py-32 md:py-48 px-6 md:px-24 z-10 border-t border-white/10 bg-gradient-to-b from-black to-[#05050a] overflow-hidden">
         <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-20">
            
            <div className="flex flex-col justify-between h-full">
                <div>
                    <span className="text-[9px] font-mono text-emerald-500 mb-6 block">03 // GLOBAL_UPLINK</span>
                    <h2 className="text-5xl md:text-7xl font-medium tracking-tight mb-16">Headquarters</h2>
                    
                    <div className="space-y-12">
                        <div className="group">
                            <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-2 block">Secure Line</span>
                            <div className="flex items-center gap-6">
                                <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-emerald-500/20 group-hover:border-emerald-500/50 transition-all duration-500">
                                    <Phone size={24} className="text-white/80 group-hover:text-emerald-400 transition-colors" />
                                </div>
                                <p className="text-3xl md:text-4xl text-white font-light tracking-tight">{CONTACT_INFO.phone}</p>
                            </div>
                        </div>

                        <div className="group">
                            <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-2 block">Physical Coordinates</span>
                            <div className="flex items-start gap-6">
                                <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:border-blue-500/50 transition-all duration-500 shrink-0">
                                    <MapPin size={24} className="text-white/80 group-hover:text-blue-400 transition-colors" />
                                </div>
                                <p className="text-xl md:text-2xl text-white/80 font-light leading-snug w-3/4">
                                    {CONTACT_INFO.address}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-4 mt-20">
                    <SocialButton href={CONTACT_INFO.instagram} icon={Instagram} label="Instagram" />
                    <SocialButton href={CONTACT_INFO.facebook} icon={Facebook} label="Facebook" />
                </div>
            </div>

            {/* Abstract Network Visualizer */}
            <div className="relative h-[600px] w-full flex items-center justify-center perspective-1000">
                {[1, 2, 3].map((i) => (
                    <motion.div
                        key={i}
                        animate={{ rotate: 360, rotateX: [0, 45, 0], rotateY: [0, 45, 0] }}
                        transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
                        className="absolute rounded-full border border-white/10"
                        style={{ 
                            width: `${400 + i * 100}px`, 
                            height: `${400 + i * 100}px`,
                            borderWidth: '1px',
                            borderColor: `rgba(255,255,255,${0.1 - i * 0.02})`
                        }}
                    />
                ))}
                
                <div className="relative z-10 w-64 h-64 bg-black/80 backdrop-blur-xl border border-white/20 rounded-full flex flex-col items-center justify-center shadow-[0_0_100px_rgba(16,185,129,0.2)]">
                    <Hexagon size={64} strokeWidth={0.5} className="text-white/60 mb-4 animate-spin-slow" />
                    <span className="text-xs font-bold uppercase tracking-widest text-white">Bahrain HQ</span>
                    <span className="text-[9px] font-mono text-emerald-400 mt-1">ONLINE</span>
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[800px] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-45" />
                    <div className="w-[800px] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent -rotate-45" />
                </div>
            </div>

         </div>
      </section>

      {/* 7. FOOTER CTA */}
      <section className="relative py-40 border-t border-white/10 bg-black z-20 text-center overflow-hidden">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
         
         <div className="relative z-10 max-w-4xl mx-auto px-6">
             <h2 className="text-5xl md:text-9xl font-medium tracking-tighter mb-12 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
                 Ready to deploy?
             </h2>
             
             <button 
                onClick={() => setShowContact(true)}
                className="group relative inline-flex items-center gap-6 px-16 py-8 bg-white text-black rounded-full hover:scale-105 transition-transform duration-500 shadow-[0_0_80px_rgba(255,255,255,0.3)] overflow-hidden"
             >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-white to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10 text-sm font-black uppercase tracking-[0.25em]">Initiate Project</span>
                <CornerDownRight size={20} className="relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
             </button>
         </div>
      </section>

      {/* 8. CONTACT MODAL */}
      <ContactModal isOpen={showContact} onClose={() => setShowContact(false)} />

    </div>
  );
}

// --- NEW: 3D TILT GALLERY SECTION ---
function GallerySection() {
    return (
        <section className="relative py-40 px-4 md:px-12 z-10 bg-black">
            <div className="flex flex-col items-center text-center mb-32">
                <span className="text-[10px] font-mono text-blue-500 mb-4 tracking-[0.3em]">VISUAL_ARCHIVE_V.2</span>
                <h2 className="text-5xl md:text-8xl font-medium tracking-tighter text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                    The Exhibition
                </h2>
            </div>

            {/* Cinematic Masonry Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1800px] mx-auto perspective-1000">
                {GALLERY_IMAGES.map((src, i) => (
                    <GalleryItem key={i} src={src} index={i} />
                ))}
            </div>
        </section>
    );
}

function GalleryItem({ src, index }: { src: string, index: number }) {
    // Scroll Parallax
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const yParallax = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    // 3D Tilt Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

    function handleMouseMove({ currentTarget, clientX, clientY }: any) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const xPos = clientX - left - width / 2;
        const yPos = clientY - top - height / 2;
        x.set(xPos);
        y.set(yPos);
    }

    const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
    const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);
    const sheenX = useTransform(mouseX, [-300, 300], ["0%", "100%"]);

    return (
        <motion.div 
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true }}
            style={{ perspective: 1000 }}
            className="group relative h-[500px] md:h-[600px] w-full"
        >
            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="relative w-full h-full overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-2xl transition-shadow duration-500 group-hover:shadow-[0_0_50px_rgba(255,255,255,0.1)]"
            >
                {/* Parallax Image Container */}
                <div className="absolute inset-0 w-full h-full overflow-hidden rounded-xl">
                    <motion.div style={{ y: yParallax, height: "120%" }} className="relative w-full">
                        <Image 
                            src={src} 
                            alt={`Gallery ${index}`} 
                            fill 
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105 will-change-transform"
                        />
                        {/* Film Grain & Gradient */}
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.1] mix-blend-overlay pointer-events-none" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                    </motion.div>
                </div>

                {/* Dynamic Sheen Effect */}
                <motion.div
                    style={{
                        background: useMotionTemplate`linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 45%, rgba(255,255,255,0.0) 50%)`,
                        left: sheenX,
                        opacity: 0.5
                    }}
                    className="absolute inset-0 z-20 pointer-events-none w-[200%] -ml-[50%] h-full"
                />
            
                {/* Holographic Metadata Overlay */}
                <div className="absolute inset-0 z-30 flex flex-col justify-end p-8 pointer-events-none">
                    <div className="translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out flex items-end justify-between border-t border-white/20 pt-6 backdrop-blur-md bg-black/20 p-6 rounded-lg border-x border-b">
                        <div>
                            <span className="text-[9px] font-mono text-emerald-400 mb-1 block">IMG_REF_0{index + 1}</span>
                            <h3 className="text-xl font-bold uppercase text-white tracking-widest drop-shadow-md">
                                Project View
                            </h3>
                        </div>
                        <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center bg-white text-black shadow-lg">
                            <ArrowUpRight size={18} />
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// --- SOCIAL BUTTON ---
function SocialButton({ href, icon: Icon, label }: any) {
    return (
        <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-4 px-8 py-4 rounded-full border border-white/10 bg-white/5 hover:bg-white hover:text-black hover:border-white transition-all duration-300 group"
        >
            <Icon size={18} />
            <span className="text-xs font-bold uppercase tracking-widest">{label}</span>
            <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity -ml-2 group-hover:ml-0" />
        </a>
    );
}

// --- CONTACT MODAL ---
function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [copied, setCopied] = useState(false);
    const email = CONTACT_INFO.email;

    const handleCopy = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
                    />
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 10 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-xl bg-[#05050a] border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(255,255,255,0.1)]"
                    >
                        <div className="flex items-center justify-between p-8 border-b border-white/10 bg-white/5">
                            <div className="flex items-center gap-3">
                                <Monitor size={18} className="text-emerald-400 animate-pulse" />
                                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/80">Secure Uplink // Active</span>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                <X size={20} className="text-white/60" />
                            </button>
                        </div>
                        <div className="p-10 md:p-14">
                            <h3 className="text-4xl font-bold text-white mb-3 tracking-tight">Start a Dialogue.</h3>
                            <p className="text-white/50 text-sm mb-10 font-light leading-relaxed">
                                Our team is ready to engineer your next experience. <br/>
                                Copy the secure uplink below to initialize contact.
                            </p>
                            <div onClick={handleCopy} className="group relative h-24 bg-black border border-white/20 rounded-2xl flex items-center justify-between px-8 cursor-pointer hover:border-emerald-500/50 transition-all duration-300 shadow-lg hover:shadow-emerald-900/20">
                                <div className="flex items-center gap-5">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${copied ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-white'}`}>
                                        {copied ? <Check size={20} /> : <Mail size={20} />}
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[9px] font-mono text-white/40 uppercase tracking-wider">Official Inquiries</span>
                                        <span className="text-xl font-mono text-white">{email}</span>
                                    </div>
                                </div>
                                <div className="hidden md:flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-[10px] font-bold uppercase text-emerald-400 tracking-widest">{copied ? "COPIED" : "COPY LINK"}</span>
                                    <Copy size={16} className="text-emerald-400" />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none animate-scan-fast opacity-0 group-hover:opacity-100" />
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-500 via-blue-500 to-rose-500" />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
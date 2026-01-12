"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Building2, Globe, Plane, ShoppingBag, Trophy, Briefcase, Anchor, Layers, Star } from "lucide-react";
import Link from "next/link";
import { ColoursLogoHeader } from "@/components/ui/ColoursLogoHeader";

// -- Data --
const CLIENTS = [
  { id: "01", name: "Bahrain EDB", category: "Government", icon: Briefcase, color: "from-red-500 to-rose-600" },
  { id: "02", name: "Gulf Air", category: "Aviation", icon: Plane, color: "from-amber-400 to-orange-500" },
  { id: "03", name: "DO & CO", category: "Hospitality", icon: Star, color: "from-blue-500 to-indigo-600" },
  { id: "04", name: "The Avenues", category: "Retail", icon: ShoppingBag, color: "from-green-400 to-emerald-600" },
  { id: "05", name: "Seef Mall", category: "Real Estate", icon: Building2, color: "from-purple-500 to-violet-600" },
  { id: "06", name: "BIC", category: "Motorsport", icon: Trophy, color: "from-red-600 to-red-800" },
  { id: "07", name: "Tamkeen", category: "Government", icon: Layers, color: "from-cyan-400 to-blue-500" },
  { id: "08", name: "Marassi", category: "Lifestyle", icon: Globe, color: "from-teal-400 to-teal-600" },
  { id: "09", name: "Edamah", category: "Development", icon: Building2, color: "from-pink-500 to-rose-500" },
  { id: "10", name: "Bahrain Marina", category: "Waterfront", icon: Anchor, color: "from-blue-400 to-cyan-500" },
];

export default function ClientsPage() {
  return (
    <div className="relative w-full h-screen bg-[#050508] text-white overflow-hidden flex flex-col">
      
      {/* 1. Vibrant Background Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-indigo-600/30 blur-[150px] rounded-full mix-blend-screen animate-pulse" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-violet-600/30 blur-[150px] rounded-full mix-blend-screen animate-pulse delay-1000" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]" />
      </div>

      {/* 2. ADVANCED HEADER (Floating Command Capsule) */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="fixed top-0 left-0 w-full z-50 flex justify-center pt-6 px-4 pointer-events-none"
      >
        <div className="pointer-events-auto flex items-center justify-between w-full max-w-[95%] xl:max-w-[1400px] p-2 pl-3 rounded-full border border-white/10 bg-black/40 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] ring-1 ring-white/5">
            
            {/* Left: The "Return" Action */}
            <Link href="/" className="group flex items-center gap-4 px-4 py-2 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                <div className="relative w-6 h-6 flex items-center justify-center">
                    <ArrowLeft size={16} className="absolute transition-all duration-300 group-hover:-translate-x-1" />
                </div>
                <div className="hidden sm:flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/90">Return</span>
                    <span className="text-[8px] font-mono text-white/30">Main Menu</span>
                </div>
            </Link>

            {/* Center Decoration (Optional Tech Lines) */}
            <div className="hidden md:flex items-center gap-4 opacity-20">
                <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent" />
                <div className="w-1 h-1 rounded-full bg-white" />
                <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent" />
            </div>

            {/* Right: Brand Identity */}
            <div className="flex items-center gap-6 px-6 border-l border-white/5">
                {/* Live Indicator */}
                <div className="hidden sm:flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-[9px] font-mono text-white/30 tracking-tight">SYSTEM ONLINE</span>
                </div>

                {/* Logo */}
                <div className="w-24 opacity-90 hover:opacity-100 transition-opacity cursor-pointer">
                    <ColoursLogoHeader className="w-full h-auto fill-white" />
                </div>
            </div>

        </div>
      </motion.nav>

      {/* 3. Main Content Area */}
      <div className="flex-1 relative z-10 flex flex-col xl:flex-row h-full overflow-hidden pt-24"> {/* Added pt-24 to account for floating header */}
        
        {/* Left Panel: Title & Info */}
        <div className="w-full xl:w-1/3 p-8 xl:p-12 flex flex-col justify-center xl:border-r border-white/5 bg-gradient-to-b from-transparent to-black/20">
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 mb-6">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.8)]" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-300">Trusted Partners</span>
                </div>
                
                <h1 className="text-5xl xl:text-7xl font-medium tracking-tight leading-[0.9] mb-6">
                    Strategic <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-violet-300">Alliance.</span>
                </h1>
                
                <p className="text-white/40 text-sm leading-relaxed max-w-md border-l-2 border-white/10 pl-4">
                    Collaborating with the Kingdom's visionaries. <br/>
                    Select a partner to view details.
                </p>
            </motion.div>
        </div>

        {/* Right Panel: The Grid */}
        <div className="w-full xl:w-2/3 h-full overflow-y-auto xl:overflow-hidden p-6 xl:p-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 h-full content-center pb-24 xl:pb-0">
                {CLIENTS.map((client, i) => (
                    <CompactCard key={client.id} data={client} index={i} />
                ))}
                
                {/* "Join Us" Card */}
                <Link href="/contact" className="group relative flex flex-col items-center justify-center p-6 rounded-xl border border-dashed border-white/20 hover:border-white/50 hover:bg-white/5 transition-all">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                        <ArrowUpRight size={18} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest">Join List</span>
                </Link>
            </div>
        </div>

      </div>
    </div>
  );
}

// --- Component: Compact Hover Card ---
function CompactCard({ data, index }: { data: any, index: number }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: any) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    const Icon = data.icon;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            onMouseMove={handleMouseMove}
            className="group relative h-32 xl:h-40 bg-white/[0.03] backdrop-blur-md rounded-xl border border-white/10 overflow-hidden hover:border-white/30 transition-all duration-300"
        >
            {/* Hover Spotlight */}
            <motion.div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                        250px circle at ${mouseX}px ${mouseY}px,
                        rgba(255, 255, 255, 0.1),
                        transparent 80%
                        )
                    `,
                }}
            />

            {/* Content */}
            <div className="relative h-full p-5 flex flex-col justify-between z-10">
                <div className="flex justify-between items-start">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${data.color} bg-opacity-10`}>
                        <Icon size={16} className="text-white mix-blend-overlay" />
                    </div>
                    <span className="text-[9px] font-mono text-white/30">0{index + 1}</span>
                </div>

                <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1 group-hover:translate-x-1 transition-transform">
                        {data.name}
                    </h3>
                    <p className="text-[10px] text-white/40 truncate">
                        {data.category}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
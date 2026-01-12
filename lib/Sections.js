"use client";
import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { IconInstagram, IconFacebook, IconX } from "./Icons";

// --- LOCAL IMAGES ---
const IMAGES = {
    identity: "/insta/image1.png",
    events: "/insta/image2.png",
    exhibitions: "/insta/image3.png",
    interiors: "/insta/image4.png",
    media: "/insta/image5.png",
    kiosk: "/insta/image6.png" 
};

// --- 1. IDENTITY SECTION ---
export const IdentitySection = () => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({ target: container, offset: ["start end", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);

    return (
        <section ref={container} className="relative w-full py-32 px-6 md:px-12 bg-[#050508] text-white overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E")' }} />

            <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center relative z-10">
                <div>
                    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex items-center gap-4 mb-8">
                        <span className="w-2 h-2 bg-[#4F46E5] rounded-full" />
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/50">Who We Are</span>
                    </motion.div>
                    
                    <h2 className="text-5xl md:text-7xl font-medium tracking-tight leading-[1.1] mb-10">
                        Crafting <span className="italic font-serif text-[#4F46E5]">Legacies</span> <br />
                        Beyond the Event.
                    </h2>

                    <div className="space-y-8 text-lg font-light text-white/70 max-w-xl leading-relaxed">
                        <p>Born in Manama, Colours Bahrain has evolved into a GCC powerhouse. We don't just build stages; we engineer moments that resonate emotionally and amplify brand narratives through precision and creativity.</p>
                        <p>From royal summits to intimate luxury retail activations, our methodology merges architectural precision with theatrical storytelling to create environments that matter.</p>
                    </div>

                    <div className="mt-12 pt-8 border-t border-white/10 flex gap-12">
                        <div><h4 className="text-3xl font-bold text-white mb-1">15+</h4><span className="text-xs uppercase tracking-widest text-white/40">Years Exp.</span></div>
                        <div><h4 className="text-3xl font-bold text-white mb-1">500+</h4><span className="text-xs uppercase tracking-widest text-white/40">Projects</span></div>
                        <div><h4 className="text-3xl font-bold text-white mb-1">GCC</h4><span className="text-xs uppercase tracking-widest text-white/40">Region Wide</span></div>
                    </div>
                </div>

                <div className="relative h-[60vh] lg:h-[80vh] w-full overflow-hidden rounded-[2px]">
                    <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
                        <img src={IMAGES.identity} alt="Identity" className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700" />
                    </motion.div>
                    <div className="absolute bottom-8 left-8 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-sm">
                        <div className="w-16 h-16"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// --- 2. SERVICES SECTION ---
const servicesData = [
    { id: "01", title: "Events", desc: "End-to-end management for royal ceremonies, festivals, and corporate summits.", tags: ["Production", "Logistics"], img: IMAGES.events, bg: "#FFFFFF", text: "#000000" },
    { id: "02", title: "Exhibitions", desc: "Architectural pavilions and modular stands designed to dominate trade show floors.", tags: ["Pavilions", "Fabrication"], img: IMAGES.exhibitions, bg: "#F5F3FF", text: "#000000" },
    { id: "03", title: "Interiors", desc: "Commercial fit-outs and retail spaces where aesthetics meet functional precision.", tags: ["Fit-out", "Design"], img: IMAGES.interiors, bg: "#E0E7FF", text: "#000000" },
    { id: "04", title: "Media", desc: "Broadcasting, live coverage, and sponsorship management for high-stakes sports.", tags: ["Live Coverage", "Sponsorship"], img: IMAGES.media, bg: "#1E1B4B", text: "#FFFFFF" },
    { id: "05", title: "Mall Kiosks", desc: "Custom fabrication and installation to maximize your footprint in premium malls.", tags: ["Retail", "Installation"], img: IMAGES.kiosk, bg: "#4F46E5", text: "#FFFFFF" }
];

const ServiceCard = ({ data, index, progress, range, targetScale }) => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({ target: container, offset: ['start end', 'start start'] });
    const imageScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
    const scale = useTransform(progress, range, [1, targetScale]);

    return (
        <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
            <motion.div style={{ scale, backgroundColor: data.bg, top: `calc(-5vh + ${index * 25}px)` }} className="relative w-full max-w-[1400px] h-[75vh] md:h-[80vh] rounded-[32px] md:rounded-[48px] overflow-hidden shadow-2xl border border-black/5 origin-top flex flex-col md:flex-row">
                <div className="flex-1 p-8 md:p-16 flex flex-col justify-between" style={{ color: data.text }}>
                    <div className="flex justify-between items-start">
                        <span className="text-5xl font-mono font-light opacity-30">{data.id}</span>
                        <div className="w-12 h-12 rounded-full border border-current flex items-center justify-center opacity-50"></div>
                    </div>
                    <div>
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-none mb-8">{data.title}</h2>
                        <p className="text-lg md:text-xl opacity-80 max-w-md font-light leading-relaxed mb-8">{data.desc}</p>
                        <div className="flex flex-wrap gap-3">{data.tags.map((tag, i) => (<span key={i} className="px-4 py-2 border border-current rounded-full text-xs font-bold uppercase tracking-widest opacity-60">{tag}</span>))}</div>
                    </div>
                    <div className="h-px w-full bg-current opacity-20 mt-8" />
                </div>
                <div className="flex-1 relative h-1/2 md:h-full overflow-hidden">
                    <motion.div style={{ scale: imageScale }} className="w-full h-full"><img src={data.img} alt={data.title} className="w-full h-full object-cover" /></motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export const ServicesSection = () => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({ target: container, offset: ['start start', 'end end'] });
    return (
        <div ref={container} className="relative bg-[#050508]">
            <div className="py-32 px-6 md:px-12 text-center text-white">
                <span className="text-[#4F46E5] font-bold uppercase tracking-[0.3em] text-xs">Our Expertise</span>
                <h2 className="text-4xl md:text-5xl font-medium mt-6">Capabilities & Services</h2>
            </div>
            <div className="pb-32 px-4 md:px-8">
                {servicesData.map((service, i) => {
                    const targetScale = 1 - ((servicesData.length - i) * 0.05);
                    return <ServiceCard key={i} data={service} index={i} progress={scrollYProgress} range={[i * 0.25, 1]} targetScale={targetScale} />;
                })}
            </div>
        </div>
    );
};

// --- 3. CREATIVE CONTACT SECTION (Redesigned) ---
export const ContactSection = () => {
    const [activeTag, setActiveTag] = useState(null);
    const formTags = ["Events", "Interiors", "Exhibitions", "Media", "Other"];

    return (
        <section className="relative w-full min-h-screen bg-[#020204] text-white py-32 border-t border-white/5 overflow-hidden">
            
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-[#4F46E5] rounded-full blur-[250px] opacity-[0.05] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-violet-900 rounded-full blur-[200px] opacity-[0.05] pointer-events-none" />

            <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                    
                    {/* LEFT: Info & Details */}
                    <div className="lg:col-span-5 flex flex-col justify-between h-full">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                            <span className="text-[#4F46E5] font-bold uppercase tracking-[0.3em] text-xs mb-6 block">Get in Touch</span>
                            <h2 className="text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[0.9] mb-8">
                                Let's build <br /> <span className="text-white/30 font-serif italic">history.</span>
                            </h2>
                            <p className="text-xl text-white/60 font-light max-w-sm leading-relaxed">
                                Have a project in mind? We'd love to hear about it. Let's create something extraordinary together.
                            </p>
                        </motion.div>

                        <div className="mt-16 space-y-12">
                            {/* Address Block */}
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }} 
                                whileInView={{ opacity: 1, x: 0 }} 
                                viewport={{ once: true }} 
                                transition={{ delay: 0.2 }}
                                className="group"
                            >
                                <h3 className="text-xs font-bold uppercase tracking-widest text-[#4F46E5] mb-4 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-[#4F46E5] animate-pulse"/> Visit HQ
                                </h3>
                                <p className="text-2xl text-white font-light group-hover:text-[#4F46E5] transition-colors cursor-pointer">
                                    Unit 07, Building 2568 <br/> Road 4450, Block 744 <br/> A'ali, Bahrain
                                </p>
                                <a href="https://maps.google.com" target="_blank" className="inline-flex items-center gap-2 mt-4 text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors">
                                    View on Map
                                </a>
                            </motion.div>

                            {/* Contact Block */}
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }} 
                                whileInView={{ opacity: 1, x: 0 }} 
                                viewport={{ once: true }} 
                                transition={{ delay: 0.3 }}
                            >
                                <h3 className="text-xs font-bold uppercase tracking-widest text-[#4F46E5] mb-4">Direct Line</h3>
                                <a href="mailto:info@coloursbahrain.com" className="block text-2xl text-white font-light hover:text-[#4F46E5] transition-colors mb-2">info@coloursbahrain.com</a>
                                <a href="tel:+97317295917" className="block text-2xl text-white font-light hover:text-[#4F46E5] transition-colors">+973 1729 5917</a>
                            </motion.div>

                            {/* Socials */}
                            
                        </div>
                    </div>

                    {/* RIGHT: Creative Form */}
                    <div className="lg:col-span-7 bg-[#0a0a0c] p-8 md:p-12 rounded-[32px] border border-white/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#4F46E5] blur-[100px] opacity-20 pointer-events-none" />
                        
                        <form className="relative z-10 space-y-12">
                            {/* Name & Email Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <InputGroup label="Your Name" placeholder="John Doe" delay={0.1} />
                                <InputGroup label="Email Address" placeholder="john@example.com" delay={0.2} />
                            </div>

                            {/* Tag Selection */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }} 
                                whileInView={{ opacity: 1, y: 0 }} 
                                viewport={{ once: true }} 
                                transition={{ delay: 0.3 }}
                            >
                                <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-6">I'm interested in...</label>
                                <div className="flex flex-wrap gap-4">
                                    {formTags.map((tag) => (
                                        <button
                                            key={tag}
                                            type="button"
                                            onClick={() => setActiveTag(tag)}
                                            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 border ${
                                                activeTag === tag 
                                                ? "bg-[#4F46E5] border-[#4F46E5] text-white shadow-[0_0_20px_rgba(79,70,229,0.4)]" 
                                                : "bg-transparent border-white/10 text-white/60 hover:border-white/40 hover:text-white"
                                            }`}
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Message Area */}
                            <InputGroup label="About Project" placeholder="Tell us about your timeline and goals..." isArea delay={0.4} />

                            {/* Submit Button */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }} 
                                whileInView={{ opacity: 1, y: 0 }} 
                                viewport={{ once: true }} 
                                transition={{ delay: 0.5 }}
                                className="pt-8"
                            >
                                <button className="group relative w-full py-6 bg-white text-black rounded-xl overflow-hidden font-bold uppercase tracking-widest text-sm hover:scale-[1.01] transition-transform duration-300">
                                    <span className="absolute inset-0 bg-gradient-to-r from-[#4F46E5] to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <span className="relative z-10 group-hover:text-white flex items-center justify-center gap-3 transition-colors">
                                        Send Message 
                                    </span>
                                </button>
                            </motion.div>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
};

// Helper Component for Form Inputs
const InputGroup = ({ label, placeholder, isArea, delay }) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }} 
        transition={{ delay }}
        className="relative group"
    >
        <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-3 group-focus-within:text-[#4F46E5] transition-colors">{label}</label>
        {isArea ? (
            <textarea 
                placeholder={placeholder} 
                rows="4" 
                className="w-full bg-transparent border-b border-white/10 py-4 text-xl font-light outline-none text-white placeholder:text-white/20 focus:border-[#4F46E5] transition-all resize-none" 
            />
        ) : (
            <input 
                type="text" 
                placeholder={placeholder} 
                className="w-full bg-transparent border-b border-white/10 py-4 text-xl font-light outline-none text-white placeholder:text-white/20 focus:border-[#4F46E5] transition-all" 
            />
        )}
    </motion.div>
);
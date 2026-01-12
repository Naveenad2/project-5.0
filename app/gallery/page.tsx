"use client";

import Link from "next/link";
import GallerySection from "@/components/GallerySection"; // Ensure this path matches your file structure
import { motion } from "framer-motion";
import { IconX } from "@/components/Icons"; // Or import from your icon file

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-[#EAE7E0]">
      {/* Navigation Bar for Gallery */}
      <nav className="fixed top-0 left-0 w-full px-6 py-6 flex justify-between items-center z-50 pointer-events-none">
        <div className="pointer-events-auto">
          <Link 
            href="/"
            className="group flex items-center gap-2 px-5 py-2.5 bg-white border border-black/10 rounded-full hover:bg-black hover:text-white transition-colors shadow-sm"
          >
            <span className="text-xs font-bold tracking-widest uppercase">Back to Home</span>
          </Link>
        </div>
        
        <div className="pointer-events-auto">
          <Link href="/" className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md hover:scale-105 transition-transform">
            <IconX size={20} className="text-black" />
          </Link>
        </div>
      </nav>

      {/* The Gallery Content */}
      <div className="pt-24 pb-12">
        <GallerySection />
      </div>
    </main>
  );
}
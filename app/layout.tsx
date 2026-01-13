"use client"; // Required for hooks

import { useEffect } from "react";
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  useEffect(() => {
    // 1. Check if user is already signed in
   console.log("");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

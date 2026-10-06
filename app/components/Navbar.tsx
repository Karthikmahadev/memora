"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Home", href: "/", img: "/img/home.avif" },
  { label: "About", href: "/about", img: "/img/about.avif" },
  { label: "Gallery", href: "/gallery", img: "/img/gallery.avif" },
  { label: "Contact", href: "/contact", img: "/img/contact.avif" },
];

function NavPill({
  menuOpen,
  setMenuOpen,
  activeNav,
  menuRef,
}: {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeNav: string;
  menuRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div ref={menuRef} style={{ position: "relative", width: "min(340px, 92vw)" }}>
      {/* ── Main Pill ── */}
      <motion.div
        layout
        initial={false}
        style={{
          background: "#fff",
          borderRadius: 22,
          padding: "10px 20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          border: "1px solid rgba(0,0,0,0.05)",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
      >
        {/* Top Header Bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 40 }}>
          <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 20, letterSpacing: "-0.5px", color: "#111" }}>
            Tilt
          </span>

          <AnimatePresence mode="wait">
            {!menuOpen && (
              <motion.span
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                style={{ fontSize: 14, fontWeight: 500, color: "#666" }}
              >
                {activeNav}
              </motion.span>
            )}
          </AnimatePresence>
<button
  onClick={() => setMenuOpen(!menuOpen)}
  aria-label="Toggle menu"
  style={{ 
    background: "none", 
    border: "none", 
    cursor: "pointer", 
    width: 40, 
    height: 40, 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center", 
    position: "relative" 
  }}
>
  <div style={{ width: 22, height: 14, position: "relative" }}>
    {/* Left Leg of the 'M' */}
    <motion.span 
      animate={{ 
        rotate: menuOpen ? 45 : 0, 
        // When open, stay at top. When closed, stay at top.
        y: menuOpen ? 0 : 0, 
        width: menuOpen ? "15.5px" : "22px",
      }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      style={{ 
        position: "absolute", 
        top: 0, 
        left: 0, 
        height: 2, 
        background: "#111", 
        borderRadius: 2, 
        transformOrigin: "left center" 
      }} 
    />
    
    {/* Middle Bar - Dissolves and slides */}
    <motion.span 
      animate={{ 
        opacity: menuOpen ? 0 : 1,
        x: menuOpen ? -10 : 0
      }}
      transition={{ duration: 0.2 }}
      style={{ position: "absolute", top: 6, left: 0, width: "100%", height: 2, background: "#111", borderRadius: 2 }} 
    />
    
    {/* Right Leg of the 'M' */}
    <motion.span 
      animate={{ 
        rotate: menuOpen ? -45 : 0, 
        // When open, move UP from the bottom (12px) to the top (0px)
        y: menuOpen ? 0 : 12, 
        width: menuOpen ? "15.5px" : "22px",
      }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      style={{ 
        position: "absolute", 
        top: 0, 
        right: 0, 
        height: 2, 
        background: "#111", 
        borderRadius: 2, 
        transformOrigin: "right center" 
      }} 
    />
  </div>
</button>
        </div>

        {/* ── Dropdown Content (Animated Height) ── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div style={{ paddingTop: 20, paddingBottom: 10 }}>
                <div style={{ fontSize: 10, color: "#bbb", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
                  Navigate
                </div>
                {NAV_ITEMS.map((item) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => {
  e.preventDefault();
  setMenuOpen(false);
  setTimeout(() => {
    window.location.href = item.href;
  }, 300); // match animation duration
}}
                    whileHover={{ x: 6 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 15,
                      padding: "10px 0",
                      textDecoration: "none",
                      color: item.label === activeNav ? "#5E5683" : "#111",
                    }}
                  >
                    <div style={{ width: 44, height: 32, borderRadius: 8, overflow: "hidden", background: "#eee", flexShrink: 0 }}>
                      <img src={item.img} alt={item.label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <span style={{ fontSize: 18, fontWeight: item.label === activeNav ? 600 : 400 }}>
                      {item.label}
                    </span>
                    {item.label === activeNav && (
                      <motion.div layoutId="dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#5E5683" }} />
                    )}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
const pathname = usePathname();

const activeNav =
  NAV_ITEMS.find((item) => item.href === pathname)?.label || "Home";
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    if (menuOpen) document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, [menuOpen]);

  return (
    <div style={{ position: "fixed", top: 24, left: "50%", transform: "translateX(-50%)", zIndex: 100 }}>
      <NavPill 
        menuOpen={menuOpen} 
        setMenuOpen={setMenuOpen} 
        activeNav={activeNav}  
        menuRef={menuRef} 
      />
    </div>
  );
}
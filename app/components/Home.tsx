
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Footer from "./Footer";
import BrandsSection from "./BrandsSection";
import MadeToMatter from "./Madetomatter";
import MarqueeBanner from "./Marqueebanner";


// ─── Animation Variants ──────────────────────────────────────────────────────
const letterVariant = {
  initial: { y: 100, opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1, 
    transition: { 
      duration: 1, 
      ease: [0.16, 1, 0.3, 1] as const  // ✅ FIX
    } 
  },
};

const containerVariant = {
  animate: {
    transition: {
      staggerChildren: 0.02, // This creates the "wave" effect
      delayChildren: 0.2,
    },
  },
};

// ─── Helper Component ────────────────────────────────────────────────────────
function AnimatedText({ text, color = "#fff" }: { text: string; color?: string }) {
  return (
    <motion.span
      variants={containerVariant}
      initial="initial"
      animate="animate"
      style={{ display: "inline-block", color, whiteSpace: "pre" }}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={letterVariant}
          style={{ display: "inline-block" }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

// ─── Refactored Hero Section ─────────────────────────────────────────────────
function HeroSection({ heroRef, videoY, heroOpacity }: any) {
  return (
    <section
      ref={heroRef}
      style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden", background: "#000" }}
    >
      {/* Parallax Video */}
      <motion.div style={{ y: videoY, opacity: heroOpacity, height: "100%" }}>
        <video autoPlay muted loop playsInline style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.6 }}>
          <source src="/backgroundvideo.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Overlay Gradient */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.9) 100%)", pointerEvents: "none" }} />

      {/* Text Content */}
      <div style={{ position: "absolute", bottom: "18%", left: "6%", zIndex: 10 }}>
        <h1
          style={{
            fontWeight: 800,
            fontSize: "clamp(52px, 9vw, 130px)",
            lineHeight: 0.95,
            color: "#fff",
            margin: 0,
            letterSpacing: "-0.05em",
            perspective: "1000px", // Adds 3D depth to the letters
          }}
        >
          {/* First Line */}
          <div style={{ overflow: "hidden", marginBottom: "0.1em" }}>
            <AnimatedText text="Timeless Stories." />
          </div>

          {/* Second Line */}
          <div style={{ overflow: "hidden" }}>
            <AnimatedText text="Perfectly Framed." color="#5E5683" />
          </div>
        </h1>

        {/* Optional: Add a small animated tagline below */}
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          style={{ 
            color: "rgba(255,255,255,0.5)", 
            fontSize: 18, 
            marginTop: 30, 
            maxWidth: 500,
            fontWeight: 400
          }}
        >
          Revolutionizing visual storytelling through engineered  <br/>
          precision and cinematic grit.
          
        </motion.p>
      </div>
    </section>
  );
}

// ─── Constants ────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    id: "wedding",
    title: "Wedding Shoots",
    description: "We craft cinematic wedding stories — from intimate elopements to grand celebrations. Every glance, every tear, every laugh preserved with editorial precision.",
    img: "/img/services/wedding.avif",
    gradient: "linear-gradient(160deg,#f0e6d8 0%,#dfc8b0 60%,#c8a898 100%)",
  },
  {
    id: "products",
    title: "Product Shoots",
    description: "Studio-grade product photography engineered for e-commerce, print, and brand campaigns. Clean backgrounds, dramatic lighting, styled flatlays — we do it all.",
    img: "/img/services/products.avif",
    gradient: "linear-gradient(160deg,#dce9f5 0%,#b8d0e8 60%,#8ab0d0 100%)",
  },
  {
    id: "marketing",
    title: "Marketing",
    description: "From campaign shoots to social-media assets, we produce scroll-stopping creative that drives real results — on-brand, on-brief, always on time.",
    img: "/img/services/marketing.jpg",
    gradient: "linear-gradient(160deg,#e8e0f5 0%,#cdb8e8 60%,#a890d0 100%)",
  },
  {
    id: "influencer",
    title: "Influencer Shoots",
    description: "Creator-ready shoots for Instagram, YouTube, TikTok and beyond. We understand the algorithm, the aesthetic, and the audience.",
    img: "/img/services/influencer.avif",
    gradient: "linear-gradient(160deg,#d8f5e8 0%,#a8e0c4 60%,#78c8a0 100%)",
  },
];

// ─── Animation Variants ──────────────────────────────────────────────────────
const fadeInUp = {
  hidden: { y: 60, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const
    }
  }
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } }
};

// ─── Main Component ──────────────────────────────────────────────────────────
export default function Home() {
  const [active, setActive] = useState(0);
  const [imgErr, setImgErr] = useState<Record<string, boolean>>({});
  
  // Hero Parallax Logic
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const cur = SERVICES[active];

  return (
    <main style={{ background: "#fff", fontFamily: "'Poppins', sans-serif" }}>
      
      {/* ══════ HERO SECTION ══════ */}
      {/* <section
        ref={heroRef}
        style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden", background: "#000" }}
      >
        <motion.div style={{ y: videoY, opacity: heroOpacity, height: "100%" }}>
          <video autoPlay muted loop playsInline style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.7 }}>
            <source src="/backgroundvideo.mp4" type="video/mp4" />
          </video>
        </motion.div>

        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.8) 100%)" }} />

        <div style={{ position: "absolute", bottom: "20%", left: "6%", zIndex: 10 }}>
          <motion.h1
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontWeight: 700, fontSize: "clamp(48px, 8vw, 110px)", lineHeight: 1, color: "#fff", margin: 0, letterSpacing: "-0.04em" }}
          >
            Built to think.<br />
            <span style={{ color: "#e8194b" }}>Born to shoot.</span>
          </motion.h1>
        </div>
      </section> */}

      <HeroSection   heroRef={heroRef} 
  videoY={videoY} 
  heroOpacity={heroOpacity} />

      {/* ══════ SERVICES SECTION ══════ */}
      <section id="services" style={{ padding: "140px 0", background: "#fff" }}>
        <div style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 5%",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr)",
          gap: "clamp(40px, 8vw, 100px)",
          alignItems: "start"
        }}>
          
          {/* LEFT: Sticky Image Display */}
          <div style={{ position: "sticky", top: "12vh" }}>
            <div style={{ 
              borderRadius: 32, 
              overflow: "hidden", 
              aspectRatio: "5/5", 
              background: "#f7f7f7", 
              position: "relative",
              boxShadow: "0 20px 80px rgba(0,0,0,0.08)"
            }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={cur.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  style={{ width: "100%", height: "100%", position: "absolute" }}
                >
                  {!imgErr[cur.id] ? (
                    <img 
                      src={cur.img} 
                      alt={cur.title} 
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      onError={() => setImgErr(p => ({ ...p, [cur.id]: true }))}
                    />
                  ) : (
                    <div style={{ width: "100%", height: "100%", background: cur.gradient }} />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT: Text Content & Accordion */}
          <motion.div 
            variants={staggerContainer} 
            initial="initial" 
            whileInView="whileInView" 
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2 variants={fadeInUp} style={{ fontWeight: 700, fontSize: "clamp(38px, 4.5vw, 68px)", lineHeight: 1.1, color: "#111", marginBottom: 30 }}>
              Unlocking scale <br/> in the real world.
            </motion.h2>
            
            <motion.p variants={fadeInUp} style={{ color: "#777", fontSize: 18, lineHeight: 1.6, marginBottom: 60, maxWidth: 420 }}>
              We deliver a product that&apos;s faster, safer, and more scalable, unlocking the true potential of cinematic storytelling.
            </motion.p>

            <div style={{ display: "flex", flexDirection: "column" }}>
              {SERVICES.map((svc, idx) => (
                <ServiceItem 
                  key={svc.id} 
                  svc={svc} 
                  isActive={active === idx} 
                  onClick={() => setActive(idx)} 
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <BrandsSection />
      <MarqueeBanner />
      <MadeToMatter />
      <style jsx global>{`
        body { margin: 0; padding: 0; background: #fff; }
        * { box-sizing: border-box; }
      `}</style>
    </main>
  );
}

// ─── Accordion Item Sub-Component ───────────────────────────────────────────
function ServiceItem({ svc, isActive, onClick }: { svc: any; isActive: boolean; onClick: () => void }) {
  return (
    <motion.div 
      onClick={onClick}
      style={{ 
        borderTop: "1px solid #eee", 
        padding: "32px 0", 
        cursor: "pointer",
        position: "relative" 
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <motion.h3 
          animate={{ 
            color: isActive ? "#111" : "#bbb",
            x: isActive ? 10 : 0
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontSize: "clamp(24px, 3vw, 42px)", fontWeight: 600, margin: 0 }}
        >
          {svc.title}
        </motion.h3>
        
        {/* Animated Arrow Icon */}
        <motion.span
          animate={{ rotate: isActive ? 90 : 0, opacity: isActive ? 1 : 0.3 }}
          style={{ fontSize: 24 }}
        >
          →
        </motion.span>
      </div>
      
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p style={{ color: "#666", paddingTop: 20, fontSize: 16, maxWidth: 440, lineHeight: 1.7 }}>
              {svc.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
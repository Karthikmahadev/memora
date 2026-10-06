"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
  animate,
} from "framer-motion";
import BrandsSection from "./BrandsSection";
import MadeToMatter from "./Madetomatter";
import MarqueeBanner from "./Marqueebanner";

const EASE = [0.16, 1, 0.3, 1] as const;
const AUTOPLAY_MS = 6000;

// ─── Hero animation variants ─────────────────────────────────────────────────
const letterVariant = {
  initial: { y: 100, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 1, ease: EASE },
  },
};

const containerVariant = {
  animate: {
    transition: {
      staggerChildren: 0.02,
      delayChildren: 0.2,
    },
  },
};

// ─── Hero helper ─────────────────────────────────────────────────────────────
function AnimatedText({ text, color = "#fff" }: { text: string; color?: string }) {
  return (
    <motion.span
      variants={containerVariant}
      initial="initial"
      animate="animate"
      style={{ display: "inline-block", color, whiteSpace: "pre" }}
    >
      {text.split("").map((char, i) => (
        <motion.span key={i} variants={letterVariant} style={{ display: "inline-block" }}>
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

// ─── Hero Section ────────────────────────────────────────────────────────────
function HeroSection({ heroRef, videoY, heroOpacity }: any) {
  return (
    <section
      ref={heroRef}
      style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden", background: "#000" }}
    >
      {/* Parallax Video */}
      <motion.div style={{ y: videoY, opacity: heroOpacity, height: "100%" }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.6 }}
        >
          <source src="/backgroundvideo.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Overlay Gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.9) 100%)",
          pointerEvents: "none",
        }}
      />

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
            perspective: "1000px",
          }}
        >
          <div style={{ overflow: "hidden", marginBottom: "0.1em" }}>
            <AnimatedText text="Timeless Stories." />
          </div>
          <div style={{ overflow: "hidden" }}>
            <AnimatedText text="Perfectly Framed." color="#5E5683" />
          </div>
        </h1>

        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: 18,
            marginTop: 30,
            maxWidth: 500,
            fontWeight: 400,
          }}
        >
          Revolutionizing visual storytelling through engineered <br />
          precision and cinematic grit.
        </motion.p>
      </div>
    </section>
  );
}

// ─── Services Data ───────────────────────────────────────────────────────────
const SERVICES = [
  {
    id: "wedding",
    title: "Wedding Shoots",
    description:
      "We craft cinematic wedding stories — from intimate elopements to grand celebrations. Every glance, every tear, every laugh preserved with editorial precision.",
    tags: ["Cinematic Films", "Drone Coverage", "Same-Day Edits", "Destination Ready"],
    img: "/img/services/wedding.avif",
    gradient: "linear-gradient(160deg,#f0e6d8 0%,#dfc8b0 60%,#c8a898 100%)",
  },
  {
    id: "products",
    title: "Product Shoots",
    description:
      "Studio-grade product photography engineered for e-commerce, print, and brand campaigns. Clean backgrounds, dramatic lighting, styled flatlays — we do it all.",
    tags: ["E-commerce Ready", "360° Captures", "Brand Lookbooks", "Color Match Fidelity"],
    img: "/img/services/products.avif",
    gradient: "linear-gradient(160deg,#dce9f5 0%,#b8d0e8 60%,#8ab0d0 100%)",
  },
  {
    id: "marketing",
    title: "Marketing",
    description:
      "From campaign shoots to social-media assets, we produce scroll-stopping creative that drives real results — on-brand, on-brief, always on time.",
    tags: ["Campaign Shoots", "Social Assets", "Ad Creatives", "Brand Story"],
    img: "/img/services/marketing.jpg",
    gradient: "linear-gradient(160deg,#e8e0f5 0%,#cdb8e8 60%,#a890d0 100%)",
  },
  {
    id: "influencer",
    title: "Influencer Shoots",
    description:
      "Creator-ready shoots for Instagram, YouTube, TikTok and beyond. We understand the algorithm, the aesthetic, and the audience.",
    tags: ["Reels & Shorts", "Creator Kits", "UGC Style", "Fast Turnaround"],
    img: "/img/services/influencer.avif",
    gradient: "linear-gradient(160deg,#d8f5e8 0%,#a8e0c4 60%,#78c8a0 100%)",
  },
];

// ─── Small helpers ───────────────────────────────────────────────────────────
function ArrowIcon({ dir = "right", color = "currentColor" }: { dir?: "right" | "down"; color?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: dir === "down" ? "rotate(90deg)" : "none", transition: "transform .3s" }}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

// ─── Tilt Card (image card with caption) ─────────────────────────────────────
function TiltCard({
  service,
  index,
  total,
  imgErr,
  setImgErr,
  paused,
}: {
  service: (typeof SERVICES)[number];
  index: number;
  total: number;
  imgErr: Record<string, boolean>;
  setImgErr: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  paused: boolean;
}) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 15 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 120, damping: 15 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
        background: "#fff",
        borderRadius: 28,
        padding: 12,
        boxShadow: "0 30px 80px -20px rgba(30,30,60,0.15), 0 0 0 1px rgba(0,0,0,0.04)",
      }}
    >
      <div
        style={{
          position: "relative",
          borderRadius: 20,
          overflow: "hidden",
          aspectRatio: "1 / 1.05",
          background: "#eee",
        }}
      >
        <AnimatePresence mode="popLayout">
          <motion.div
            key={service.id}
            initial={{ clipPath: "inset(0 0 100% 0)", scale: 1.18 }}
            animate={{ clipPath: "inset(0 0 0% 0)", scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
            style={{ position: "absolute", inset: 0 }}
          >
            {!imgErr[service.id] ? (
              <img
                src={service.img}
                alt={service.title}
                onError={() => setImgErr((p) => ({ ...p, [service.id]: true }))}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <div style={{ width: "100%", height: "100%", background: service.gradient }} />
            )}
          </motion.div>
        </AnimatePresence>

        {/* autoplay progress line */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 3,
            background: "rgba(255,255,255,0.25)",
            zIndex: 2,
          }}
        >
          <motion.div
            key={service.id + String(paused)}
            initial={{ width: "0%" }}
            animate={{ width: paused ? "0%" : "100%" }}
            transition={{ duration: paused ? 0 : AUTOPLAY_MS / 1000, ease: "linear" }}
            style={{ height: "100%", background: "#fff" }}
          />
        </div>
      </div>

      {/* caption row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "14px 8px 4px",
          fontSize: 11,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 500 }}>
          <motion.span
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ width: 5, height: 5, borderRadius: "50%", background: "#111", display: "inline-block" }}
          />
          <AnimatePresence mode="wait">
            <motion.span
              key={service.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              style={{ color: "#111" }}
            >
              Active Focus: <span style={{ color: "#2563eb" }}>{service.title}</span>
            </motion.span>
          </AnimatePresence>
        </div>

        <div style={{ color: "#9aa0b4", fontVariantNumeric: "tabular-nums", display: "flex", overflow: "hidden" }}>
          <AnimatePresence mode="wait">
            <motion.span
              key={index}
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -14, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {String(index + 1).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
          <span>&nbsp;//&nbsp;{String(total).padStart(2, "0")}</span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Accordion Row ───────────────────────────────────────────────────────────
function DisciplineRow({
  svc,
  isActive,
  onClick,
}: {
  svc: (typeof SERVICES)[number];
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <div onClick={onClick} style={{ borderTop: "1px solid #e6e7ee", padding: "26px 0", cursor: "pointer" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <motion.h3
          animate={{ color: isActive ? "#0d0d12" : "#9ba0b3", x: isActive ? 6 : 0 }}
          whileHover={{ color: isActive ? "#0d0d12" : "#5b6075", x: 6 }}
          transition={{ duration: 0.35, ease: EASE }}
          style={{
            margin: 0,
            fontWeight: 700,
            letterSpacing: "-0.035em",
            fontSize: "clamp(28px, 3.4vw, 46px)",
            lineHeight: 1.1,
          }}
        >
          {svc.title}
        </motion.h3>

        <motion.span
          animate={{
            backgroundColor: isActive ? "#0d0d12" : "rgba(13,13,18,0)",
            color: isActive ? "#ffffff" : "#9ba0b3",
            scale: isActive ? 1 : 0.9,
          }}
          whileHover={{ scale: 1.12 }}
          transition={{ duration: 0.3 }}
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ArrowIcon dir={isActive ? "down" : "right"} />
        </motion.span>
      </div>

      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
            style={{ overflow: "hidden" }}
          >
            <motion.p
              initial={{ y: 16 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              style={{ color: "#5b6075", fontSize: 15, lineHeight: 1.65, maxWidth: 440, margin: "16px 0 18px" }}
            >
              {svc.description}
            </motion.p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, paddingBottom: 4 }}>
              {svc.tags.map((t, i) => (
                <motion.span
                  key={t}
                  initial={{ opacity: 0, y: 12, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.5, ease: EASE }}
                  whileHover={{ y: -2, backgroundColor: "#0d0d12", color: "#ffffff" }}
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    color: "#555a6e",
                    background: "#f1f1f6",
                    border: "1px solid #e4e5ed",
                    padding: "6px 12px",
                    borderRadius: 999,
                    cursor: "default",
                  }}
                >
                  {t}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Services Section ────────────────────────────────────────────────────────
function ServicesSection() {
  const [active, setActive] = useState(1); // Product Shoots, like the screenshot
  const [paused, setPaused] = useState(false);
  const [imgErr, setImgErr] = useState<Record<string, boolean>>({});

  // autoplay
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % SERVICES.length), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [active, paused]);

  const cur = SERVICES[active];

  const reveal = {
    hidden: { opacity: 0, y: 50 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: EASE, delay: i * 0.1 },
    }),
  };

  return (
    <section
      id="services"
      style={{
        fontFamily: "'Inter', 'Poppins', sans-serif",
        position: "relative",
        overflow: "hidden",
        background:
          "radial-gradient(1200px 500px at 85% 0%, #f1efff 0%, rgba(255,255,255,0) 60%), radial-gradient(900px 500px at 0% 100%, #eef4ff 0%, rgba(255,255,255,0) 60%), #fff",
      }}
    >
      <style>{`
        .svc-wrap{max-width:1200px;margin:0 auto;padding:0 5%}
        .svc-intro{display:grid;grid-template-columns:minmax(0,0.9fr) minmax(0,1.1fr);gap:clamp(32px,6vw,90px);align-items:center;padding:120px 0 100px}
        .svc-head{display:flex;justify-content:space-between;align-items:flex-end;gap:40px;margin-bottom:56px}
        .svc-grid{display:grid;grid-template-columns:minmax(0,0.85fr) minmax(0,1.15fr);gap:clamp(32px,6vw,80px);align-items:start;padding-bottom:140px}
        @media (max-width: 860px){
          .svc-intro,.svc-grid{grid-template-columns:1fr}
          .svc-head{flex-direction:column;align-items:flex-start}
          .svc-sticky{position:relative !important;top:0 !important}
        }
      `}</style>

      {/* ═════ PART 1 — Intro ═════ */}
      <div className="svc-wrap">
        <div className="svc-intro">
          {/* Image card */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: EASE }}
            style={{
              position: "relative",
              borderRadius: 28,
              overflow: "hidden",
              aspectRatio: "1 / 1.12",
              boxShadow: "0 30px 80px -20px rgba(30,30,60,0.25)",
            }}
          >
            <motion.img
              src="/img/services/wedding.avif"
              alt="Cinematic production"
              initial={{ scale: 1.2 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: EASE }}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            {/* glass caption pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.7, ease: EASE }}
              style={{
                position: "absolute",
                left: 14,
                bottom: 14,
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "7px 12px",
                borderRadius: 999,
                fontSize: 10,
                color: "#fff",
                background: "rgba(20,20,25,0.45)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                style={{ width: 6, height: 6, borderRadius: "50%", background: "#34d399" }}
              />
              Cinematic Production Series • Dolomites
            </motion.div>
          </motion.div>

          {/* Text */}
          <div>
            <motion.h2
              custom={0}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              style={{
                margin: 0,
                fontWeight: 800,
                color: "#0d0d12",
                fontSize: "clamp(40px, 5.2vw, 72px)",
                lineHeight: 1.0,
                letterSpacing: "-0.045em",
              }}
            >
              Unlocking scale <br /> in the real world.
            </motion.h2>

            <motion.p
              custom={1}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              style={{ color: "#5b6075", fontSize: 15, lineHeight: 1.6, maxWidth: 400, margin: "28px 0 34px" }}
            >
              We deliver a product that&apos;s faster, safer, and more scalable, unlocking the true potential of
              cinematic storytelling.
            </motion.p>

            <motion.div
              custom={2}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              style={{ display: "flex", alignItems: "center", gap: 28, flexWrap: "wrap" }}
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "#0d0d12",
                  color: "#fff",
                  padding: "14px 24px",
                  borderRadius: 999,
                  fontSize: 13,
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Explore Projects
                <motion.span whileHover={{ x: 4 }} style={{ display: "flex" }}>
                  <ArrowIcon />
                </motion.span>
              </motion.a>

              <motion.button
                whileHover="hover"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#333",
                  padding: 0,
                }}
              >
                <motion.span
                  variants={{ hover: { scale: 1.15, backgroundColor: "#0d0d12", color: "#ffffff" } }}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    background: "#fff",
                    border: "1px solid #e1e2ea",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 4l14 8-14 8z" />
                  </svg>
                </motion.span>
                Watch Showreel
              </motion.button>
            </motion.div>

            {/* proof row */}
            <motion.div
              custom={3}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              style={{
                marginTop: 56,
                paddingTop: 22,
                borderTop: "1px solid #ececf2",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div style={{ display: "flex" }}>
                {["4K", "RAW"].map((l, i) => (
                  <span
                    key={l}
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: "50%",
                      marginLeft: i ? -8 : 0,
                      background: i ? "#111" : "#e5e7ef",
                      color: i ? "#fff" : "#333",
                      border: "2px solid #fff",
                      fontSize: 7,
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {l}
                  </span>
                ))}
              </div>
              <span style={{ fontSize: 11, color: "#6b7180" }}>
                Over{" "}
                <b style={{ color: "#2563eb", fontWeight: 600 }}>
                  <CountUp to={240} suffix="+" />
                </b>{" "}
                commercial and bespoke captures delivered globally
              </span>
            </motion.div>
          </div>
        </div>

        {/* ═════ PART 2 — Core Disciplines ═════ */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="svc-head"
        >
          <div>
            <p style={{ margin: "0 0 10px", fontSize: 10, letterSpacing: "0.14em", fontWeight: 600, color: "#8a8fa3" }}>
              CORE DISCIPLINES
            </p>
            <h2
              style={{
                margin: 0,
                fontSize: "clamp(22px, 2.4vw, 30px)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: "#0d0d12",
              }}
            >
              Engineered studio shoots &amp; productions
            </h2>
          </div>
          <p style={{ margin: 0, maxWidth: 300, fontSize: 12, lineHeight: 1.6, color: "#8a8fa3" }}>
            Tailored visual direction spanning high-volume product catalogs to experiential on-location cinema.
          </p>
        </motion.div>

        <div className="svc-grid" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className="svc-sticky" style={{ position: "sticky", top: "12vh" }}>
            <TiltCard
              service={cur}
              index={active}
              total={SERVICES.length}
              imgErr={imgErr}
              setImgErr={setImgErr}
              paused={paused}
            />
          </div>

          <div style={{ borderBottom: "1px solid #e6e7ee" }}>
            {SERVICES.map((svc, idx) => (
              <DisciplineRow key={svc.id} svc={svc} isActive={active === idx} onClick={() => setActive(idx)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main style={{ background: "#fff", fontFamily: "'Poppins', sans-serif" }}>
      <HeroSection heroRef={heroRef} videoY={videoY} heroOpacity={heroOpacity} />
      <ServicesSection />
      <BrandsSection />
      <MarqueeBanner />
      <MadeToMatter />
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          background: #fff;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </main>
  );
}
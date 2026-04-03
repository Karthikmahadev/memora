"use client";

import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";

// ─── Grain texture (inline SVG, zero extra deps) ──────────────────────────────
function GrainTexture() {
  return (
    <svg
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100%", height: "100%",
        pointerEvents: "none",
        zIndex: 9999,
        opacity: 0.055,
        mixBlendMode: "overlay",
      }}
    >
      <filter id="grain-f">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.72"
          numOctaves="4"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain-f)" />
    </svg>
  );
}

// ─── Animated percentage counter ──────────────────────────────────────────────
function Counter({ onComplete }: { onComplete: () => void }) {
  const count = useMotionValue(0);
  const [display, setDisplay] = useState("00");

  useEffect(() => {
    const controls = animate(count, 100, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(String(Math.round(v)).padStart(2, "0")),
      onComplete,
    });
    return controls.stop;
  }, []);

  return <span style={{ fontVariantNumeric: "tabular-nums" }}>{display}</span>;
}

// ─── Letter-by-letter brand name reveal ───────────────────────────────────────
function BrandReveal({ text }: { text: string }) {
  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.065, delayChildren: 0.1 },
    },
  };

  const letterVariant = {
  hidden: { y: "110%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      style={{ display: "flex", overflow: "hidden" }}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={letterVariant}
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
}

// ─── Main Loader component ────────────────────────────────────────────────────
interface LoaderProps {
  onFinish?: () => void;
  brandName?: string;
}

export default function Loader({ onFinish, brandName = "MEMORA" }: LoaderProps) {
  const [counterDone, setCounterDone] = useState(false);
  const [exiting, setExiting] = useState(false);

  // Lock body scroll while loader is active
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Start exit sequence shortly after counter finishes
  useEffect(() => {
    if (!counterDone) return;
    const t = setTimeout(() => setExiting(true), 300);
    return () => clearTimeout(t);
  }, [counterDone]);

  // Notify parent once exit animation fully completes
  const handleExitComplete = () => onFinish?.();

  // 4 staggered vertical wipe panels
  const panels = [0, 1, 2, 3];

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {!exiting && (
        <>
          {/* ── Wipe panels ── */}
          {panels.map((i) => (
            <motion.div
              key={`panel-${i}`}
              initial={{ scaleY: 1 }}
              exit={{
                scaleY: 0,
                transition: {
                  duration: 0.85,
                  ease: [0.76, 0, 0.24, 1],
                  delay: i * 0.07,
                },
              }}
              style={{
                position: "fixed",
                top: 0,
                left: `${i * 25}%`,
                width: "25%",
                height: "100%",
                background: "#0a0a0a",
                zIndex: 9000 + i,
                transformOrigin: "top",
              }}
            />
          ))}

          {/* ── Loader UI ── */}
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25, delay: 0.1 } }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9100,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            <GrainTexture />

            {/* Brand name */}
            <div
              style={{
                fontFamily: "'Cormorant Garamond', 'Garamond', Georgia, serif",
                fontSize: "clamp(2.8rem, 8vw, 6.5rem)",
                fontWeight: 300,
                fontStyle: "italic",
                letterSpacing: "0.35em",
                color: "#f0ede8",
                lineHeight: 1,
                marginBottom: "3.5rem",
              }}
            >
              <BrandReveal text={brandName} />
            </div>

            {/* Progress track + counter */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1.5rem",
                width: "min(420px, 72vw)",
              }}
            >
              {/* Track */}
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  background: "rgba(240,237,232,0.12)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Fill */}
                <motion.div
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(90deg, rgba(240,237,232,0.4) 0%, #f0ede8 100%)",
                    transformOrigin: "left",
                  }}
                />
              </div>

              {/* Percentage */}
              <div
                style={{
                  fontFamily: "'DM Mono', 'Courier New', monospace",
                  fontSize: "clamp(0.65rem, 1.5vw, 0.75rem)",
                  letterSpacing: "0.15em",
                  color: "rgba(240,237,232,0.45)",
                  width: "2.6em",
                  textAlign: "right",
                  flexShrink: 0,
                }}
              >
                <Counter onComplete={() => setCounterDone(true)} />
              </div>
            </div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.9, ease: "easeOut" }}
              style={{
                fontFamily: "'DM Mono', 'Courier New', monospace",
                fontSize: "clamp(0.55rem, 1.2vw, 0.65rem)",
                letterSpacing: "0.28em",
                color: "rgba(240,237,232,0.22)",
                textTransform: "uppercase",
                marginTop: "2.4rem",
              }}
            >
              Visual Stories · Est. 2024
            </motion.p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
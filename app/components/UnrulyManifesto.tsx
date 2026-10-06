"use client";
import { motion, useReducedMotion } from "framer-motion";
import { Syne, Caveat, Space_Mono } from "next/font/google";
import type { ReactNode } from "react";

// ── Fonts ─────────────────────────────────────────────────────────────────────
// Syne 800 = the wide, heavy display face. Caveat = the "red pen" handwriting.
const display = Syne({ subsets: ["latin"], weight: ["800"] });
const hand = Caveat({ subsets: ["latin"], weight: ["600"] });
const mono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"] });

const RED = "#e8372c";
const BLUE = "#2f55f5";
const INK = "#0a0a0a";

// ── Markup marks (SVG strokes that "draw" themselves) ─────────────────────────
// Each mark is one motion.path. pathLength 0 → 1 = pen stroke being drawn.
// vectorEffect="non-scaling-stroke" keeps the line thickness constant even
// though the SVG is stretched (preserveAspectRatio="none") to fit the word.

function useDraw(delay: number, duration = 0.7) {
  const reduce = useReducedMotion();
  return {
    initial: { pathLength: reduce ? 1 : 0 },
    animate: { pathLength: 1 },
    transition: { delay: reduce ? 0 : delay, duration: reduce ? 0 : duration, ease: [0.65, 0, 0.35, 1] as [number, number, number, number] },
  };
}

/** Hand-drawn red loop around a phrase + a tiny note above it */
function Circled({ children, note, delay }: { children: ReactNode; note?: string; delay: number }) {
  const draw = useDraw(delay, 0.9);
  return (
    <span style={{ position: "relative", display: "inline-block", padding: "0 0.12em" }}>
      {children}
      <svg
        viewBox="0 0 250 100"
        preserveAspectRatio="none"
        aria-hidden
        style={{ position: "absolute", left: "-6%", top: "-14%", width: "112%", height: "128%", overflow: "visible", pointerEvents: "none" }}
      >
        <motion.path
          d="M 12 52 C 6 20, 70 4, 142 5 C 216 6, 252 24, 244 52 C 236 84, 168 97, 98 94 C 38 91, 0 74, 12 42 C 18 26, 44 14, 78 10"
          fill="none"
          stroke={RED}
          strokeWidth={4}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          {...draw}
        />
      </svg>
      {note && (
        <span
          className={hand.className}
          style={{ position: "absolute", top: "-0.55em", left: "-0.3em", fontSize: 18, color: RED, transform: "rotate(-8deg)", letterSpacing: 0, fontWeight: 600, whiteSpace: "nowrap" }}
        >
          {note}
        </span>
      )}
    </span>
  );
}

/** Blue underline under a word / phrase */
function Underlined({ children, delay }: { children: ReactNode; delay: number }) {
  const draw = useDraw(delay, 0.6);
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      {children}
      <svg
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
        aria-hidden
        style={{ position: "absolute", left: "-1%", bottom: "-0.06em", width: "102%", height: "0.16em", overflow: "visible", pointerEvents: "none" }}
      >
        <motion.path
          d="M 0 6 C 18 3, 38 8, 58 5 S 88 4, 100 6"
          fill="none"
          stroke={BLUE}
          strokeWidth={3}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          {...draw}
        />
      </svg>
    </span>
  );
}

/** Red strike-through with a replacement word written above */
function StruckOut({ children, replacement, delay }: { children: ReactNode; replacement: string; delay: number }) {
  const draw = useDraw(delay, 0.5);
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      {children}
      <svg
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
        aria-hidden
        style={{ position: "absolute", left: "-3%", top: "52%", width: "106%", height: "0.14em", overflow: "visible", pointerEvents: "none" }}
      >
        <motion.path d="M 0 7 L 100 3" fill="none" stroke={RED} strokeWidth={4} strokeLinecap="round" vectorEffect="non-scaling-stroke" {...draw} />
      </svg>
      <motion.span
        className={hand.className}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.45, duration: 0.3 }}
        style={{ position: "absolute", top: "-0.15em", left: "50%", transform: "translateX(-35%) rotate(-6deg)", fontSize: 18, color: RED, letterSpacing: 0, fontWeight: 600 }}
      >
        {replacement}
      </motion.span>
    </span>
  );
}

// ── Small UI bits ─────────────────────────────────────────────────────────────
const tagBase: React.CSSProperties = {
  fontSize: 9,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  padding: "5px 9px",
  borderRadius: 3,
  border: "1px solid #dcdcdc",
  background: "#f3f3f3",
  color: "#555",
  whiteSpace: "nowrap",
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function UnrulyManifesto() {
  return (
    <section
      style={{
        position: "relative",
        background: "#fff",
        color: INK,
        overflow: "hidden",
        padding: "clamp(64px,8vw,120px) clamp(20px,6%,80px) clamp(56px,6vw,96px)",
        textAlign: "center",
        // faint graph-paper grid
        backgroundImage:
          "linear-gradient(to right, rgba(0,0,0,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.045) 1px, transparent 1px)",
        backgroundSize: "44px 44px",
      }}
    >
      {/* Status tags */}
      {/* <div className={mono.className} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, marginBottom: "clamp(40px,6vw,72px)" }}>
        <span style={{ ...tagBase, display: "inline-flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#22c55e" }} />
          Available Q3/Q4 projects
        </span>
        <span style={tagBase}>Est. 2026 // Editorial markup ver. 0.04</span>
        <span style={{ ...tagBase, color: RED, borderColor: "#f5b3ad", background: "#fdecea" }}>[Proof / Final pass]</span>
      </div> */}

      {/* Top-right margin note */}
      <motion.span
        className={hand.className}
        initial={{ opacity: 0, rotate: -2 }}
        animate={{ opacity: 1, rotate: -4 }}
        transition={{ delay: 2.6, duration: 0.4 }}
        style={{ position: "absolute", top: "clamp(14px,2vw,28px)", right: "clamp(16px,4%,56px)", fontSize: 22, color: RED, fontWeight: 600 }}
      >
        keep it completely raw ↓
      </motion.span>

      {/* Manifesto */}
      <h1
        className={display.className}
        style={{
          fontWeight: 800,
          fontSize: "clamp(30px,3.5vw,76px)",
          lineHeight: 1.08,
          letterSpacing: "-0.01em",
         
          margin: "0 auto",
        }}
      >
        <Circled delay={0.3} note="grammatical↓">An unruly</Circled> group of creatives who strive to provide what{" "}
        <Underlined delay={1.2}>truly matters</Underlined> without any{" "}
        <Underlined delay={1.6}>bullshit.</Underlined>
        <br />
        We are what we are, doing things{" "}
        <StruckOut replacement="driving" delay={2.0}>things by</StruckOut>{" "}
        <Underlined delay={2.4}>sheer innovation.</Underlined>
      </h1>

      {/* Supporting copy */}
      <p
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: "clamp(12px,1vw,14px)",
          lineHeight: 1.7,
          color: "#555",
          maxWidth: 440,
          margin: "clamp(40px,5vw,64px) auto 0",
        }}
      >
        We reject the bloated agency machine. No buzzwords, no deck padding, no empty promises. Just relentless brand design, bleeding-edge
        digital engineering, and culture-defining art direction.
      </p>
    </section>
  );
}
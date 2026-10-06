"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, MotionValue } from "framer-motion";

// ── Collage layout ────────────────────────────────────────────────────────────
// Coordinates were measured from the reference at an 880 x 720 stage, then are
// converted to % so the whole collage scales fluidly with the viewport.
const STAGE_W = 880;
const STAGE_H = 520;

// x, y, w, h in stage px · speed = how far (px) the photo drifts while scrolling
const PHOTOS = [
  { id: 1, src: "/img/about/collage-1.avif", x: 54, y: 48, w: 246, h: 164, speed: 14 },
  { id: 2, src: "/img/about/collage-2.avif", x: 315, y: 66, w: 182, h: 296, speed: 30 },
  { id: 3, src: "/img/about/collage-3.avif", x: 488, y: 82, w: 96, h: 147, speed: 8 },
  { id: 4, src: "/img/about/collage-4.avif", x: 635, y: 64, w: 148, h: 66, speed: 22 },
  { id: 5, src: "/img/about/collage-5.avif", x: 594, y: 149, w: 243, h: 133, speed: 12 },
  { id: 6, src: "/img/about/collage-6.avif", x: 39, y: 234, w: 130, h: 222, speed: 26 },
  { id: 7, src: "/img/about/collage-7.avif", x: 173, y: 250, w: 140, h: 82, speed: 10 },
  { id: 8, src: "/img/about/collage-8.avif", x: 502, y: 230, w: 132, h: 140, speed: 18 },
  { id: 9, src: "/img/about/collage-9.avif", x: 570, y: 330, w: 278, h: 186, speed: 28 },
  { id: 10, src: "/img/about/collage-10.avif", x: 201, y: 364, w: 250, h: 140, speed: 16 },
  
];

function Photo({ p, progress, enabled }: { p: (typeof PHOTOS)[number]; progress: MotionValue<number>; enabled: boolean }) {
  // each photo drifts at its own speed → the collage feels loosely "floating"
  const y = useTransform(progress, [0, 1], enabled ? [p.speed, -p.speed] : [0, 0]);
  return (
    <motion.div
      style={{
        position: "absolute",
        left: `${(p.x / STAGE_W) * 100}%`,
        top: `${(p.y / STAGE_H) * 100}%`,
        width: `${(p.w / STAGE_W) * 100}%`,
        height: `${(p.h / STAGE_H) * 100}%`,
        overflow: "hidden",
        background: "#1a1a1a",
        y,
      }}
    >
      <img src={p.src} alt="" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
    </motion.div>
  );
}

export default function MissionCollage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ["start end", "end start"] });

  return (
    <section  style={{ background: "#fff", color: "#000" }}>
      {/* Mission */}
      <div style={{  padding: "clamp(14px,1.6vw,22px) clamp(20px,3.4%,40px) clamp(22px,2.4vw,32px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 10, fontWeight: 500, textTransform: "uppercase", marginBottom: 12 }}>
          <span style={{ width: 6, height: 6, background: "#000", display: "inline-block" }} />
          Our mission
        </div>
        <p style={{ margin: 0, fontSize: "clamp(18px,2.1vw,26px)", fontWeight: 500, lineHeight: 1.3, maxWidth: "62ch" }}>
          To blur the lines between reality and imagination to craft otherwise impossible stories.<sup style={{ fontSize: "0.55em" }}>®</sup>
        </p>
      </div>

      {/* Collage */}
      <div style={{ background: "#000", padding: "clamp(24px,5vw,64px) 0" }}>
        <div
          ref={stageRef}
          style={{ position: "relative", width: "100%", maxWidth: 1400, margin: "0 auto", aspectRatio: `${STAGE_W} / ${STAGE_H}` }}
        >
          {PHOTOS.map((p) => (
            <Photo key={p.id} p={p} progress={scrollYProgress} enabled={!reduce} />
          ))}
        </div>
      </div>
    </section>
  );
}
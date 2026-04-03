"use client";

import React from "react";
import { motion } from "framer-motion";

// ─── Animated ImgBox ──────────────────────────────────────────────────────────
function ImgBox({ src, alt, style, delay }: { src: string; alt: string; style: React.CSSProperties; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 1.1 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.8, 
        delay, 
        ease: [0.16, 1, 0.3, 1] // Custom "Awwwards" easing
      }}
      style={{
        ...style,
        overflow: "hidden",
        boxShadow: "0 10px 40px rgba(0,0,0,0.06)",
        background: "#f0f0f0",
        minHeight: 0,
      }}
    >
      <motion.img
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.6 }}
        src={src}
        alt={alt}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        onError={(e) => { e.currentTarget.style.opacity = "0"; }}
      />
    </motion.div>
  );
}

export default function MadeToMatter() {
  return (
    <section
      style={{
        background: "#fff",
        padding: "clamp(26px, 3vw, 120px) clamp(24px, 5%, 80px)",
        fontFamily: "'Poppins', sans-serif",
        boxSizing: "border-box",
        overflow: "hidden"
      }}
    >
      {/* ── Grid Container ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "28% 17% 31% 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: "clamp(10px, 1.5vw, 20px)",
          height: "clamp(400px, 55vw, 650px)",
        }}
      >
        <ImgBox
          src="/img/gallery/img1.avif"
          alt="Architecture"
          delay={0.1}
          style={{ gridColumn: "1", gridRow: "1 / 3", borderRadius: 24 }}
        />
        <ImgBox
          src="/img/gallery/img2.avif"
          alt="Waterfall"
          delay={0.2}
          style={{ gridColumn: "2", gridRow: "1 / 3", borderRadius: 24 }}
        />
        <ImgBox
          src="/img/gallery/img3.avif"
          alt="Festival"
          delay={0.3}
          style={{ gridColumn: "3", gridRow: "1", borderRadius: 24 }}
        />
        <ImgBox
          src="/img/gallery/img5.avif"
          alt="Desert"
          delay={0.4}
          style={{ gridColumn: "3", gridRow: "2", borderRadius: 24 }}
        />
        <ImgBox
          src="/img/gallery/img4.avif"
          alt="Flower"
          delay={0.5}
          style={{ gridColumn: "4", gridRow: "1 / 3", borderRadius: 24 }}
        />
      </div>

      {/* ── Bottom Content ── */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 24,
          marginTop: "clamp(40px, 5vw, 80px)",
        }}
      >
        {/* Heading with "Mask" reveal effect */}
        <div style={{ overflow: "hidden" }}>
          <motion.h2
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            style={{
              fontWeight: 900,
              fontSize: "clamp(40px, 8.5vw, 120px)",
              color: "#111",
              margin: 0,
              lineHeight: 0.9,
              letterSpacing: "-0.04em",
              textTransform: "uppercase"
            }}
          >
            Made to matter
          </motion.h2>
        </div>

        {/* Subtext reveal */}
        <motion.p
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            fontSize: "clamp(13px, 1.1vw, 16px)",
            color: "#666",
            margin: 0,
            lineHeight: 1.6,
            maxWidth: 240,
            flexShrink: 0,
            paddingBottom: 10,
          }}
        >
          Contemporary engineered stonework solutions. Built for everyday
          living, from the ground up.
        </motion.p>
      </div>

      {/* Responsive adjustments for mobile */}
      <style jsx>{`
        @media (max-width: 768px) {
          h2 { letter-spacing: -1px !important; }
          section { padding-top: 40px !important; }
        }
      `}</style>
    </section>
  );
}
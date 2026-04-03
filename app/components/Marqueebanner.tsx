"use client";

import React from "react";

// ── Items: alternate text + circular image ────────────────────────────────────
// Repeat the pattern so the marquee feels continuous
const ITEMS = [
  { type: "text", content: "Discover experiences" },
  { type: "img",  src: "/img/marquee/city.avif", alt: "City" },
  { type: "text", content: "Discover experiences" },
  { type: "img",  src: "/img/marquee/city.avif", alt: "City" },
  { type: "text", content: "Discover experiences" },
  { type: "img",  src: "/img/marquee/city.avif", alt: "City" },
  { type: "text", content: "Discover experiences" },
  { type: "img",  src: "/img/marquee/city.avif", alt: "City" },
];

export default function MarqueeBanner() {
  return (
    <div
      style={{
        // background: "#f0e8da",   // warm cream — matches screenshot
        overflow: "hidden",
        width: "100%",
        padding: "31px 0", 
        userSelect: "none",
      }}
    >
      {/* Outer wrapper — clips overflow */}
      <div style={{ display: "flex", width: "100%" }}>
        {/* Track — two identical sets for seamless loop */}
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1}
            style={{
              display: "flex",
              alignItems: "center",
              flexShrink: 0,
              animation: "marquee 42s linear infinite",
              willChange: "transform",
            }}
          >
            {ITEMS.map((item, idx) =>
              item.type === "text" ? (
                <span
                  key={idx}
                  style={{
                    fontWeight: "bold",
                    fontSize: "clamp(50px, 7vw, 92px)",
                    color: "#111",
                    letterSpacing: "-1.5px",
                    lineHeight: 1,
                    whiteSpace: "nowrap",
                    padding: "0 clamp(24px, 3vw, 48px)",
                  }}
                >
                  {item.content}
                </span>
              ) : (
                <div
                  key={idx}
                  style={{
                    width: "clamp(80px, 10vw, 130px)",
                    height: "clamp(80px, 10vw, 130px)",
                    borderRadius: "50%",
                    overflow: "hidden",
                    flexShrink: 0,
                    // subtle shadow + border like screenshot
                    boxShadow: "0 2px 20px rgba(0,0,0,0.12)",
                    border: "3px solid rgba(255,255,255,0.7)",
                    margin: "0 clamp(16px, 2vw, 32px)",
                    background: "#ddd",
                  }}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    onError={(e) => { e.currentTarget.style.opacity = "0"; }}
                  />
                </div>
              )
            )}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
}
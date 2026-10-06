"use client";

import { useState, useRef, useEffect } from "react";

const BRANDS = [
  { id: "htm",    name: "HTM",                  logo: "/img/brands/uefa.jpg" },
  { id: "inai",  name: "Inai",                 logo: "/img/brands/pfizer.jpg" },
  { id: "bramma",   name: "Bramma",                  logo: "/img/brands/fedex.png" },
  { id: "localalites",  name: "Localites",              logo: "/img/brands/centrient.jpg" },
  { id: "corden",  name: "Corden Pharma",          logo: "/img/brands/cordenpharma.png" },
  { id: "radisys", name: "Radisys",                logo: "/img/brands/radisys.png" },
  { id: "nl",      name: "NL",                     logo: "/img/brands/nl.png" },
  { id: "ypo",     name: "YPO",                    logo: "/img/brands/ypo.png" },
  { id: "menzies", name: "Menzies",                logo: "/img/brands/menzies.png" },
];

export default function BrandsSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  // logoOffsetY = pixels from top of the sticky panel where logo should sit
  const [logoOffsetY, setLogoOffsetY] = useState(0);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stickyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const TARGET = window.innerHeight * 0.4; // 40% from top of viewport

      let best = 0;
      let bestDist = Infinity;

      rowRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        const dist = Math.abs(mid - TARGET);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });

      setActiveIdx(best);

      // Calculate logo Y relative to the sticky panel top
      const activeEl = rowRefs.current[best];
      const stickyEl = stickyRef.current;
      if (activeEl && stickyEl) {
        const activeRect = activeEl.getBoundingClientRect();
        const stickyRect = stickyEl.getBoundingClientRect();
        // center of active row relative to sticky panel
        const rowMidInSticky =
          (activeRect.top + activeRect.height / 2) - stickyRect.top;
        // offset so logo is vertically centered on the row
        const LOGO_H = 80;
        const offset = Math.max(0, Math.min(
          window.innerHeight - LOGO_H,
          rowMidInSticky - LOGO_H / 2
        ));
        setLogoOffsetY(offset);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    const t = setTimeout(onScroll, 80);
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(t);
    };
  }, []);

  return (
    <section
      id="brands"
      style={{
        background: "#181818",
        fontFamily: "'Poppins', sans-serif",
        position: "relative",       // ← logo is scoped inside this
        overflow: "hidden",
      }}
    >
      {/* ══════════════════════════════════════
          STICKY PANEL — label + logo
          position:sticky so it scrolls with section
          but stays visible within it
      ══════════════════════════════════════ */}
      <div
        ref={stickyRef}
        style={{
          position: "sticky",
          top: 0,
          height: "70vh",
          width: "100%",
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        {/* Left — sticky label, vertically centered */}
        <div
          style={{
            position: "absolute",
            left: "7%",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <p style={{
            fontSize: 14,
            fontWeight: 400,
            color: "rgba(255,255,255,0.45)",
            margin: 0,
            lineHeight: 1.7,
          }}>
            We are proud to have
            <br />
            worked with
          </p>
        </div>

        {/* Right — logo tracks active row via absolute top offset */}
        <div
          style={{
            position: "absolute",
            right: "4%",
            top: logoOffsetY,
            width: 160,
            height: 80,
            transition: "top 0.28s ease",
            // logo crossfade container
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          {BRANDS.map((brand, idx) => (
            <img
              key={brand.id}
              src={brand.logo}
              alt={brand.name}
              style={{
                position: "absolute",
                right: 0,
                maxWidth: 160,
                maxHeight: 80,
                width: "auto",
                height: "auto",
                objectFit: "contain",
                // mixBlendMode removes white bg from JPGs on dark bg
                mixBlendMode: "screen",
                opacity: idx === activeIdx ? 1 : 0,
                transition: "opacity 0.25s ease",
              }}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
          SCROLLABLE brand list
          Pulled up behind sticky with -100vh margin
      ══════════════════════════════════════ */}
      <div
        style={{
          position: "relative",
          zIndex: 20,
          marginTop: "-100vh",
          pointerEvents: "none",
        }}
      >
        {/* Spacer — first brand enters active zone at 40% */}
        <div style={{ height: "40vh" }} />

        {BRANDS.map((brand, idx) => {
          const isActive = idx === activeIdx;
          return (
            <div
              key={brand.id}
              ref={(el) => { rowRefs.current[idx] = el; }}
              style={{
                pointerEvents: "auto",
                paddingLeft: "40%",
                paddingRight: "20%",
                paddingTop: "clamp(2px, 0.5vw, 8px)",
                paddingBottom: "clamp(2px, 0.5vw, 8px)",
                userSelect: "none",
              }}
            >
              <span
                style={{
                  display: "block",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(34px, 5.5vw, 80px)",
                  letterSpacing: "-2px",
                  lineHeight: 1.12,
                  color: isActive ? "#b8f000" : "rgba(255,255,255,0.22)",
                  transition: "color 0.22s ease",
                  whiteSpace: "nowrap",
                }}
              >
                {brand.name}
              </span>
            </div>
          );
        })}

        {/* Spacer — last brand can reach 40% target */}
        <div style={{ height: "20vh" }} />
      </div>
    </section>
  );
}
"use client";

import { useRef, useEffect, useState } from "react";

const galleryItems = [
  {
    id: 1,
    label: "LEO CANNONE",
    category: "PHOTOGRAPHY",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    aspect: "portrait",
  },
  {
    id: 2,
    label: "LA MER",
    category: "CGI · 3D",
    src: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=80",
    aspect: "landscape",
  },
  {
    id: 3,
    label: "ARNAUD",
    category: "AI · FILM",
    src: "https://images.unsplash.com/photo-1770027217960-a0a09e423b77?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    aspect: "portrait",
  },
  {
    id: 4,
    label: "MARSEILLE",
    category: "PRINT",
    src: "https://images.unsplash.com/photo-1772211506039-8bd23fcc060a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    aspect: "landscape",
  },
  {
    id: 5,
    label: "NINA RICCI",
    category: "CGI · AI",
    src: "https://plus.unsplash.com/premium_photo-1772490550401-f633cf78d2f7?q=80&w=326&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    aspect: "portrait",
  },
  {
    id: 6,
    label: "SOLARIS",
    category: "FILM",
    src: "https://images.unsplash.com/photo-1770387795112-e2b476b15f71?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    aspect: "landscape",
  },
  {
    id: 7,
    label: "VOGUE",
    category: "PHOTOGRAPHY",
    src: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&q=80",
    aspect: "portrait",
  },
    {
    id: 8,
    label: "LA MER",
    category: "CGI · 3D",
    src: "https://images.unsplash.com/photo-1765871320786-e478d7ac5777?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    aspect: "landscape",
  },
   {
    id: 9,
    label: "NINA RICCI",
    category: "CGI · AI",
    src: "https://images.unsplash.com/photo-1767627651257-f7ed7a0d8146?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    aspect: "portrait",
  },
  {
    id: 10,
    label: "SOLARIS",
    category: "FILM",
    src: "https://images.unsplash.com/photo-1767321159624-cbb3d662d1af?q=80&w=775&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    aspect: "landscape",
  },
  {
    id: 11,
    label: "VOGUE",
    category: "PHOTOGRAPHY",
    src: "https://images.unsplash.com/photo-1766394609400-0e7b1548cd30?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    aspect: "portrait",
  },
];

export default function HorizontalGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

useEffect(() => {
  const section = sectionRef.current;
  const track = trackRef.current;
  if (!section || !track) return;

  const update = () => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const scrollY = window.scrollY;

    const scrollable = sectionHeight - window.innerHeight;
    if (scrollable <= 0) return; // 🔥 prevent NaN / freeze

    const scrolled = scrollY - sectionTop;
    const p = Math.max(0, Math.min(1, scrolled / scrollable));

    setProgress(p);

    const maxTranslate = track.scrollWidth - window.innerWidth;

    if (maxTranslate > 0) {
      track.style.transform = `translateX(${-maxTranslate * p}px)`;
    }

    const idx = Math.round(p * (galleryItems.length - 1));
    setActiveIndex(idx);
  };

  // 🔥 IMPORTANT: wait for layout
  const handleLoad = () => update();

  window.addEventListener("scroll", update);
  window.addEventListener("resize", update);
  window.addEventListener("load", handleLoad);

  // also run once AFTER render
  setTimeout(update, 100);

  return () => {
    window.removeEventListener("scroll", update);
    window.removeEventListener("resize", update);
    window.removeEventListener("load", handleLoad);
  };
}, []);

  return (
    <>
      {/* HERO */}
      <section
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "4rem 3rem",
          background: "#f5f3ee",
          borderBottom: "1px solid #d8d4cc",
        }}
      >
        <p
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#888",
            marginBottom: "1.2rem",
          }}
        >
          AI Production House — Paris
        </p>

        <h1
          style={{
            fontSize: "clamp(6rem,14vw,14rem)",
            lineHeight: 0.9,
            color: "#0e0e0e",
            marginBottom: "2rem",

          }}
        >
          CRAFTING <br /> CULTURE
        </h1>

        <p
          style={{
            fontSize: "0.85rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#555",
            maxWidth: 420,
            lineHeight: 1.8,
          }}
        >
          Print & Film. AI. 3D. CGI.
          <br />
          Crafting culture for luxury brands.
        </p>
      </section>

      {/* GALLERY */}
      <div
        ref={sectionRef}
        style={{
          position: "relative",
          height: `${galleryItems.length * 120}vh`,
        }}
      >
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden",
            background: "#0e0e0e",
          }}
        >
          {/* Header */}
          <div
            style={{
              position: "absolute",
              top: "2.5rem",
              left: "3rem",
              zIndex: 10,
              display: "flex",
              gap: "3rem",
              color: "#fff",
            }}
          >
            <span style={{ opacity: 0.4, letterSpacing: "0.2em" }}>
              Selected Works
            </span>

            <span style={{ fontSize: "0.7rem", opacity: 0.3 }}>
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(galleryItems.length).padStart(2, "0")}
            </span>
          </div>

          {/* Progress */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              height: "2px",
              background: "#fff",
              width: `${progress * 100}%`,
            }}
          />

          {/* Track */}
          <div
            ref={trackRef}
            style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              padding: "0 6vw",
              gap: "2vw",
              flexShrink: 0,
              willChange: "transform",
            }}
          >
            {galleryItems.map((item, i) => {
              const isPortrait = item.aspect === "portrait";

              return (
                <div
                  key={item.id}
                  style={{
                    flexShrink: 0,
                    position: "relative",
                    overflow: "hidden",
                    background: "#1a1a1a",
                    cursor: "pointer",
                    width: isPortrait ? "22vw" : "38vw",
                    height: isPortrait ? "75vh" : "55vh",
                    alignSelf: isPortrait ? "center" : "flex-end",
                    marginBottom: isPortrait ? 0 : "8vh",
                  }}
                >
                  <img
                    src={item.src}
                    alt={item.label}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      filter: "grayscale(20%)",
                      transition: "all 0.6s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.filter = "grayscale(0%)";
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.filter = "grayscale(20%)";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  />

                  {/* Overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                      opacity: 0,
                      transition: "0.4s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.opacity = "1")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.opacity = "0")
                    }
                  />

                  {/* Info */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      padding: "1.5rem",
                      color: "#fff",
                    }}
                  >
                    <p style={{ fontSize: "0.6rem", opacity: 0.6 }}>
                      {item.category}
                    </p>
                    <p style={{ fontSize: "1.4rem" }}>{item.label}</p>
                  </div>

                  {/* Number */}
                  <span
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "-1.5rem",
                      transform: "rotate(90deg)",
                      fontSize: "0.6rem",
                      opacity: 0.2,
                      color: "#fff",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* AFTER */}
      <section
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          padding: "6rem 3rem",
          background: "#f5f3ee",
          borderTop: "1px solid #d8d4cc",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(3rem,6vw,7rem)",
            lineHeight: 0.95,
           
          }}
        >
          EVERY FRAME <br />
          <span style={{ color: "#bbb" }}>TELLS A</span> <br />
          STORY.
        </h2>
      </section>
    </>
  );
}
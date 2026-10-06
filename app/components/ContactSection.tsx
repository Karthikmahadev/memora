"use client";

import { motion } from "framer-motion";

interface ContactSectionProps {
  backgroundImage?: string;
  contactLink?: string;
}

export default function ContactSection({
  backgroundImage = "/img/contact-interior.jpg",
  contactLink = "/contact",
}: ContactSectionProps) {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "620px",
        overflow: "hidden",
        background: "#d6c4a2",
      }}
    >
      {/* =====================================================
          BACKGROUND IMAGE
      ===================================================== */}

      <motion.div
        initial={{
          scale: 1.08,
        }}
        whileInView={{
          scale: 1,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 1.8,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("${backgroundImage}")`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      />

      {/* =====================================================
          WARM IMAGE OVERLAY
      ===================================================== */}

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(55,40,25,0.08), rgba(55,40,25,0.18))",
          pointerEvents: "none",
        }}
      />

      {/* =====================================================
          CONTACT CARD
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 80,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          margin: "-100px",
        }}
        transition={{
          duration: 1.1,
          delay: 0.15,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          position: "absolute",
          right: "3.5%",
          bottom: "7%",
          width: "47%",
          minHeight: "250px",
          background: "#F7F1E8",
          padding: "32px",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          zIndex: 2,
        }}
      >
        <h2
          style={{
            margin: 0,
            color: "#111111",
            fontWeight: 500,
            fontSize: "clamp(30px, 3.4vw, 48px)",
            lineHeight: 1.02,
            letterSpacing: "-0.055em",
            maxWidth: "650px",
          }}
        >
          If you’re looking to build an exceptional space,{" "}
          <a
            href={contactLink}
            style={{
              color: "inherit",
              textDecoration: "underline",
              textDecorationThickness: "1.5px",
              textUnderlineOffset: "4px",
              transition: "opacity 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.5";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
            }}
          >
            let’s talk.
          </a>
        </h2>
      </motion.div>

      {/* =====================================================
          MOBILE CARD
      ===================================================== */}

      <style jsx>{`
        @media (max-width: 768px) {
          section {
            height: 520px !important;
          }
        }
      `}</style>
    </section>
  );
}
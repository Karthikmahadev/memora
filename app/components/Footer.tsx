"use client";

import React from "react";
import { motion } from "framer-motion";

const FOOTER_LINKS = ["Home", "About", "Gallery", "Contact"];

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

const wordmarkVariant = {
  hidden: { y: "60%" },
  show: {
    y: "0%",
    transition: {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1] as const
    }
  }
};

export default function Footer() {
  return (
    <footer
      style={{
        position: "relative",
        width: "100%",
        minHeight: "50vh",
        overflow: "hidden",
        background: "#111", // Sleeker dark
        fontFamily: "'Poppins', sans-serif",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "80px 5% 35px",
        boxSizing: "border-box",
      }}
    >
      {/* ══════════════════════════════════
          TOP ROW
      ══════════════════════════════════ */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "flex-start",
          gap: 24,
        }}
      >
        {/* LEFT — headline */}
        <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={{ once: true }}>
          <h2
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(32px, 4vw, 56px)",
              lineHeight: 1,
              color: "#fff",
              margin: "0 0 40px",
              letterSpacing: "-0.03em",
            }}
          >
            We're just<br />
            <span style={{ color: "#5E5683" }}>getting started</span>
          </h2>

          <div style={{ overflow: "hidden" }}>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginBottom: 12 }}>
              Follow along or reach out directly at
            </p>
            <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
              <motion.div
                key="location"
                whileHover={{ x: 5 }}   // subtle hover motion like emails
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}
              >
                {/* Location Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  style={{ color: "#5E5683" }}
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                </svg>

                {/* Address text */}
                <span style={{ fontSize: 15, color: "#fff", fontWeight: 500 }}>
                  CheranMaNagar, Coimbatore
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT — social icons with Magnetic effect */}
        <div style={{ display: "flex", gap: 16, justifyContent: "flex-end" }}>
          <SocialIcon href="https://www.instagram.com/the.memora/" icon="instagram" />
          <SocialIcon href="/" icon="whatsapp" />
        </div>
      </div>

      {/* ══════════════════════════════════
          BOTTOM ROW
      ══════════════════════════════════ */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        {/* Bottom-left: copyright + privacy */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ paddingBottom: 40 }}
        >
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", margin: "0 0 8px" }}>
            © 2026 Tilt. All Rights Reserved.
          </p>
        </motion.div>

        {/* Bottom-right: giant "tilt" wordmark */}
        <div style={{ overflow: "hidden", marginBottom: -20 }}>
          <motion.div
            variants={wordmarkVariant}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(80px, 18vw, 320px)",
              color: "#fff",
              lineHeight: 0.8,
              letterSpacing: "-0.05em",
              userSelect: "none",
              opacity: 0.9,
            }}
          >
            memora
          </motion.div>
        </div>
      </div>
    </footer>
  );
}

// ─── Sub-Component for Magnetic Social Buttons ──────────────────────────────
function SocialIcon({ href, icon }: { href: string; icon: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1, backgroundColor: "#5E5683" }}
      whileTap={{ scale: 0.9 }}
      style={{
        width: 54,
        height: 54,
        borderRadius: "50%",
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background-color 0.3s ease"
      }}
    >
      {/* Dynamic SVG mapping based on icon string */}
      {icon === "instagram" && (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.054 1.97.24 2.432.403a4.9 4.9 0 0 1 1.76 1.01 4.9 4.9 0 0 1 1.01 1.76c.163.462.35 1.262.403 2.432.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.97-.403 2.432a4.9 4.9 0 0 1-1.01 1.76 4.9 4.9 0 0 1-1.76 1.01c-.462.163-1.262.35-2.432.403-1.266.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.24-2.432-.403a4.9 4.9 0 0 1-1.76-1.01 4.9 4.9 0 0 1-1.01-1.76c-.163-.462-.35-1.262-.403-2.432C2.212 15.584 2.2 15.2 2.2 12s.012-3.584.07-4.85c.054-1.17.24-1.97.403-2.432a4.9 4.9 0 0 1 1.01-1.76 4.9 4.9 0 0 1 1.76-1.01c.462-.163 1.262-.35 2.432-.403C8.416 2.212 8.8 2.2 12 2.2zm0 1.8c-3.14 0-3.51.012-4.75.07-1.037.046-1.597.21-1.97.35a3.1 3.1 0 0 0-1.12.728 3.1 3.1 0 0 0-.728 1.12c-.14.373-.304.933-.35 1.97-.058 1.24-.07 1.61-.07 4.75s.012 3.51.07 4.75c.046 1.037.21 1.597.35 1.97.17.398.404.736.728 1.12.384.324.722.558 1.12.728.373.14.933.304 1.97.35 1.24.058 1.61.07 4.75.07s3.51-.012 4.75-.07c1.037-.046 1.597-.21 1.97-.35a3.1 3.1 0 0 0 1.12-.728 3.1 3.1 0 0 0 .728-1.12c.14-.373.304-.933.35-1.97.058-1.24.07-1.61.07-4.75s-.012-3.51-.07-4.75c-.046-1.037-.21-1.597-.35-1.97a3.1 3.1 0 0 0-.728-1.12 3.1 3.1 0 0 0-1.12-.728c-.373-.14-.933-.304-1.97-.35-1.24-.058-1.61-.07-4.75-.07zm0 4.6a5.2 5.2 0 1 1 0 10.4 5.2 5.2 0 0 1 0-10.4zm0 1.8a3.4 3.4 0 1 0 0 6.8 3.4 3.4 0 0 0 0-6.8zm5.2-3.6a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z" />
        </svg>
      )}
      {icon === "whatsapp" && (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.004 2C6.486 2 2 6.486 2 12c0 2.123.564 4.105 1.547 5.816L2 22l4.34-1.417A9.949 9.949 0 0 0 12.004 22c5.518 0 10.004-4.486 10.004-10S17.522 2 12.004 2zm5.273 13.233c-.248.696-1.432 1.342-1.983 1.43-.52.087-1.156.123-2.72-.463-3.06-.975-5.063-4.111-5.22-4.303-.157-.192-1.287-1.633-1.287-3.111 0-1.477.766-2.198 1.036-2.495.27-.296.589-.37.788-.37.197 0 .392.002.563.003.182.002.427-.07.668.504.248.597.843 2.068.918 2.22.074.151.123.328.002.528-.12.198-.176.324-.346.505-.173.182-.367.407-.523.544-.174.152-.355.317-.153.625.202.308.898 1.472 1.927 2.375 1.33 1.198 2.408 1.576 2.73 1.758.322.182.51.152.696-.09.186-.242.795-.892.99-1.197.197-.305.395-.26.658-.157.262.103 1.649.777 1.936.919.288.142.48.213.548.335.07.122.07.708-.178 1.403z" />
        </svg>
      )}
    </motion.a>
  );
}
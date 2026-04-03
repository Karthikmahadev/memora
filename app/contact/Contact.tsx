"use client";

import React from "react";
import { motion } from "framer-motion";

// ─── Animation Variants ──────────────────────────────────────────────────────
const transition = {
  duration: 1,
  ease: [0.16, 1, 0.3, 1] as const,
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.15,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition },
};
const maskReveal = {
  hidden: { y: "100%" },
  visible: {
    y: 0,
    transition: {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1] as const, // ✅ FIX HERE
    },
  },
};

// ─── Component ───────────────────────────────────────────────────────────────
const Contact = () => {
  return (
    <main
      style={{
       backgroundColor: "#0a0a0a",// Your brand Midnight Navy
        color: "#D9CAB3",           // Your brand Bone Cream
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "100px 5%",
        fontFamily: "'Poppins', sans-serif",
        overflow: "hidden",
      }}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        style={{ maxWidth: "1000px", width: "100%" }}
      >
        {/* Top Label */}
        <motion.p
          variants={fadeInUp}
          style={{
            fontSize: "12px",
            color: "rgba(217, 202, 179, 0.5)", // Faded Bone Cream
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: "24px",
          }}
        >
          ( Ready to start? )
        </motion.p>

        {/* Main Headline with Masking fix for 'g' and 'y' */}
        <div style={{ overflow: "hidden", paddingBottom: "0.2em", marginBottom: "80px" }}>
          <motion.h1
            variants={maskReveal}
            style={{
              fontSize: "clamp(48px, 8vw, 110px)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              margin: 0,
              textTransform: "uppercase",
              color: "#D9CAB3",
            }}
          >
            Don’t wait. <br />
            <span style={{ color: "#5E5683" }}>Let’s talk.</span>
          </motion.h1>
        </div>

        {/* Contact Grid */}
        <div
          style={{
            display: "flex",
            justifyContent:"center",
            
            gap: "60px",
            textAlign: "left",
            borderTop: "1px solid rgba(217, 202, 179, 0.15)",
            paddingTop: "60px",
          }}
        >
          {/* General Inquiries */}
          <motion.div variants={fadeInUp}>
            <h3
              style={{
                fontSize: "11px",
                textAlign:"center",
                fontWeight: 700,
                letterSpacing: "0.15em",
                color: "rgba(217, 202, 179, 0.4)",
                textTransform: "uppercase",
                marginBottom: "20px",
              }}
            >
              General Inquiries
            </h3>
            <motion.a
              href="mailto:info@memora.ai"
              whileHover={{ x: 8, color: "#fff" }}
              transition={{ duration: 0.3 }}
              style={{
                textAlign:"center",
                fontSize: "22px",
                fontWeight: 500,
                color: "#D9CAB3",
                textDecoration: "none",
                display: "inline-block",
                borderBottom: "1px solid rgba(217, 202, 179, 0.3)",
                paddingBottom: "4px",
                marginBottom: "12px",
              }}
            >
              info@memora.ai
            </motion.a>
            <p style={{ textAlign:"center",margin: 0, opacity: 0.7, fontSize: "16px" }}>
              (438) 317-0385
            </p>
          </motion.div>

         
        </div>
      </motion.div>
    </main>
  );
};

export default Contact;
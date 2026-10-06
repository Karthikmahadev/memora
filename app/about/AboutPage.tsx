"use client";
import { motion } from "framer-motion";
import ContactSection from "../components/ContactSection";
import UnrulyManifesto from "../components/UnrulyManifesto";
import CoreValues from "../components/Corevalues";
import MissionCollage from "../components/Missioncollage";

// ── Data ──────────────────────────────────────────────────────────────────────
const WORK_ITEMS = [
  { id: "w1", brand: "T3 MICRO", title: "Aire IQ: The Making of a Hero Product", img: "/img/about/work1.avif" },
  { id: "w2", brand: "LAURA MERCIER", title: "A Social Refresh for a Heritage Brand", img: "/img/about/work2.avif" },
  { id: "w3", brand: "D.S. & DURGA", title: "A Breakout Fragrance Launch - Their Most Successful to Date", img: "/img/about/work3.avif" },
];

const PRINCIPLES = [
  { num: "01", title: "A Higher Standard", body: "We are results oriented, goal driven, and always raising the bar. We believe in Kaizen — the art of perfection and continuous improvement." },
  { num: "02", title: "Beauty at the Core", body: "Beauty is not surface. It's our lens, our language, and the foundation of everything we create." },
  { num: "03", title: "Always Leading, Never Following", body: "We don't just know what's happening — we're setting it. Our team lives at the intersection of culture and craft." },
  { num: "04", title: "Relationships Driven", body: "From clients to influencers to makeup artists — relationships are our currency and care is our competitive edge." },
];

const TEAM = [
  { id: "hari", name: "Hari", role: "Co-Founder & Creative Director", bio: "Hari brings a decade of visual storytelling to every frame. His instinct for light, composition, and narrative transforms ordinary moments into timeless imagery.", img: "/img/about/hari.avif", initials: "H" },
  { id: "jeyanth", name: "Jeyanth", role: "Co-Founder & Strategy Lead", bio: "Jeyanth operates at the intersection of brand strategy and creative production. He ensures every project is both visually stunning and commercially effective.", img: "/img/about/jeyanth.avif", initials: "J" },
];

// ── Animation Variants ────────────────────────────────────────────────────────
const transition = {
  duration: 1,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number] // ✅ cast the array
};

const fadeInUp = {
  initial: { y: 40, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } // ✅ cast
};
const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } }
};

const maskReveal = {
  initial: { y: "100%" },
  whileInView: { y: 0 },
  viewport: { once: true },
  transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
};

const BG = "#eee8e0";

export default function AboutPage() {
  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", background: BG, color: "#1a1a1a", overflowX: "hidden" }}>

      {/* 1. HERO */}
      {/* <section style={{ padding: "clamp(60px,8vw,120px) clamp(32px,6%,80px)", display: "grid", gridTemplateColumns: "1fr clamp(260px,35%,420px)", gap: "clamp(40px,6vw,80px)", alignItems: "center", minHeight: "80vh" }}>
        <motion.div initial="initial" whileInView="whileInView" variants={staggerContainer} viewport={{ once: true }}>
          <motion.div variants={fadeInUp} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", color: "#888", textTransform: "uppercase" }}>(About Us)</span>
            <h1 style={{ fontWeight: 700, fontSize: "clamp(32px,4.5vw,64px)", margin: 0, letterSpacing: "-0.5px", lineHeight: 1.1 }}>Made For Prestige Beauty</h1>
          </motion.div>
          <motion.div variants={fadeInUp} style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 520 }}>
            <p style={{ fontSize: "clamp(14px,1.1vw,16px)", lineHeight: 1.85, color: "#333" }}>We were founded with a clear mission: to build a creative studio for prestige photography that empowers brands to thrive in a visual-first world.</p>
            <p style={{ fontSize: "clamp(14px,1.1vw,16px)", lineHeight: 1.85, color: "#333" }}>Strategic partners and creative visionaries who understand that how it looks and how it performs are inseparable.</p>
          </motion.div>
        </motion.div>

        <motion.div initial={{ scale: 1.1, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }} viewport={{ once: true }}
          style={{ borderRadius: 4, overflow: "hidden", aspectRatio: "3/4", background: "#d8cfc4", boxShadow: "0 20px 60px rgba(0,0,0,0.12)" }}>
          <img src="/img/about/hero-product.avif" alt="Studio hero" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </motion.div>
      </section> */}


      <UnrulyManifesto />

      {/* 2. SELECTED WORK */}
      <section style={{ background: "#f5f0eb", padding: "clamp(48px,6vw,96px) clamp(32px,6%,80px)" }}>
        <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 36 }}>
          <h2 style={{ fontWeight: 700, fontSize: "clamp(22px,2.5vw,36px)", margin: 0 }}>Selected Work</h2>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", color: "#888", textTransform: "uppercase" }}>Our Projects</span>
        </motion.div>

        <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true }} style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(16px,2vw,28px)" }}>
          {WORK_ITEMS.map((item) => (
            <motion.div key={item.id} variants={fadeInUp} whileHover={{ y: -10 }} style={{ cursor: "pointer" }}>
              <div style={{ borderRadius: 6, overflow: "hidden", aspectRatio: "3/2", background: "#d5cdc4", marginBottom: 16 }}>
                <motion.img whileHover={{ scale: 1.05 }} transition={{ duration: 0.6 }} src={item.img} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", color: "#888", textAlign: "center", textTransform: "uppercase" }}>{item.brand}</p>
              <h3 style={{ fontWeight: 400, fontSize: "clamp(16px,1.5vw,22px)", textAlign: "center", lineHeight: 1.35 }}>{item.title}</h3>
            </motion.div>
          ))}
        </motion.div>
      </section>


<MissionCollage />
<CoreValues />

      {/* 5. TEAM */}
      <section style={{ background: BG, padding: "clamp(80px,8vw,120px) clamp(32px,6%,80px)" }}>
        <motion.div {...fadeInUp} style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 64 }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", color: "#888", textTransform: "uppercase" }}>(The Team)</span>
          <h2 style={{ fontWeight: 700, fontSize: "clamp(28px,3.5vw,52px)", margin: 0 }}>The People Behind the Lens</h2>
        </motion.div>
        <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true }} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px,5vw,72px)" }}>
          {TEAM.map((member) => (
            <motion.div key={member.id} variants={fadeInUp}>
              <div style={{ borderRadius: 6, overflow: "hidden", aspectRatio: "3/4", background: "#d8cfc4", marginBottom: 24 }}>
                <motion.img whileHover={{ scale: 1.05 }} transition={{ duration: 1 }} src={member.img} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <h3 style={{ fontWeight: 700, fontSize: "clamp(22px,2.2vw,32px)", margin: "0 0 4px" }}>{member.name}</h3>
              <p style={{ fontSize: 11, fontWeight: 600, color: "#888", textTransform: "uppercase", marginBottom: 16 }}>{member.role}</p>
              <p style={{ fontSize: "clamp(13px,1vw,15px)", lineHeight: 1.8, color: "#444", maxWidth: 400 }}>{member.bio}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 6. BOTTOM CTA */}
      {/* <section style={{ background: "#1a1a1a", padding: "clamp(100px,12vw,160px) 5%", textAlign: "center" }}>
        <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={transition}>
          <h2 style={{ fontWeight: 700, fontSize: "clamp(32px,5vw,72px)", color: "#fff", lineHeight: 1.1, marginBottom: 40 }}>Ready to create something <br/> extraordinary?</h2>
          <motion.a href="#contact" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            style={{ display: "inline-block", background: "#fff", color: "#1a1a1a", fontWeight: 700, fontSize: 13, textTransform: "uppercase", padding: "20px 50px", textDecoration: "none", letterSpacing: "0.1em" }}>
            Get In Touch
          </motion.a>
        </motion.div>
      </section> */}


      <ContactSection
        backgroundImage="/img/contact-interior.jpg"
        contactLink="/contact"
      />

    </div>
  );
}
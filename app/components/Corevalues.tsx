"use client";
import { Hanken_Grotesk, Newsreader, Space_Mono } from "next/font/google";

const sans = Hanken_Grotesk({ subsets: ["latin"], weight: ["500", "700"] });
const serif = Newsreader({ subsets: ["latin"], weight: ["400"] });
const mono = Space_Mono({ subsets: ["latin"], weight: ["400"] });

const WHITE = "#fff";
const BLACK = "#000000";
const INK = "#26181f";
const RULE = "#c9b9c4";

const VALUES = [
  { id: "v1", title: "A Higher Standard", body: "We are results oriented, goal driven, and always raising the bar. We believe in Kaizen — the art of perfection and continuous improvement." },
  { id: "v2", title: "Beauty at the Core", body: "Beauty is not surface. It's our lens, our language, and the foundation of everything we create." },
  { id: "v3", title: "Always Leading, Never Following", body: "We don't just know what's happening — we're setting it. Our team lives at the intersection of culture and craft." },
  { id: "v4", title: "Relationships Driven", body: "From clients to influencers to makeup artists — relationships are our currency and care is our competitive edge." },
];

export default function CoreValues() {
  return (
    <section
      className={sans.className}
      style={{ background: WHITE, color: INK, padding: "clamp(24px,3vw,40px) clamp(20px,3.6%,48px) clamp(40px,5vw,72px)" }}
    >
      <p className={mono.className} style={{ margin: 0, fontSize: 13, letterSpacing: "0.22em", textTransform: "uppercase" }}>
        Our core values
      </p>

      <h2
        style={{
          margin: "8px 0 0",
          color: BLACK,
          fontWeight: 500,
          fontSize: "clamp(40px,6.4vw,92px)",
          lineHeight: 1,
          letterSpacing: "-0.04em",
          maxWidth: "11em",
        }}
      >
        Four values. Lived here every day.
      </h2>

      <ul style={{ listStyle: "none", margin: "clamp(48px,8vw,110px) 0 0", padding: 0, borderBottom: `1px solid ${RULE}` }}>
        {VALUES.map((v) => (
          <li
            key={v.id}
            className="value-row"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(16px,4vw,56px)",
              alignItems: "start",
              padding: "clamp(28px,3.6vw,48px) 0",
              borderTop: `1px solid ${RULE}`,
            }}
          >
            <h3
              className={serif.className}
              style={{ margin: 0, fontWeight: 400, fontSize: "clamp(26px,3.2vw,46px)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
            >
              {v.title}
            </h3>
            <p style={{ margin: 0, fontWeight: 700, fontSize: "clamp(16px,1.5vw,21px)", lineHeight: 1.4, letterSpacing: "-0.01em", maxWidth: "34em" }}>
              {v.body}
            </p>
          </li>
        ))}
      </ul>

      {/* stack to one column on phones */}
      <style>{`
        @media (max-width: 700px) {
          .value-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
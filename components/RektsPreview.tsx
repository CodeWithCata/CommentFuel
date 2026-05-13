"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Icons } from "./icons";

interface RektsPreviewProps {
  setPage: (page: string) => void;
}

export function RektsPreview({ setPage }: RektsPreviewProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const sampleRekts = [
    "bro really thought they ate with this one 💀",
    "this is giving 2016 vibes and not in a good way",
    "the confidence is crazy for this mid content",
    "somebody come get their uncle from the comments",
  ];

  return (
    <section ref={ref} style={{ padding: "100px 24px", background: "linear-gradient(180deg, transparent, rgba(239,68,68,0.04), transparent)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          <span className="badge" style={{ marginBottom: 16, background: "rgba(239,68,68,0.12)", color: "#fca5a5", border: "1px solid rgba(239,68,68,0.25)" }}>
            🔥 NEW
          </span>
          <h2 style={{ fontFamily: "var(--font-head)", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 16 }}>
            Generate Savage <span className="glow-text">Rekts</span>
          </h2>
          <p style={{ color: "var(--muted)", fontSize: 16, maxWidth: 600, margin: "0 auto 32px" }}>
            Destroy the comments section with AI-powered roasts, comebacks, and viral replies.
          </p>
          
          {/* Sample rekts */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 500, margin: "0 auto 32px" }}>
            {sampleRekts.map((rekt, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                style={{
                  background: "var(--card)", border: "1px solid rgba(239,68,68,0.15)", borderRadius: 12,
                  padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center",
                }}
              >
                <span style={{ fontSize: 14 }}>{rekt}</span>
                <Icons.Copy />
              </motion.div>
            ))}
          </div>

          <button className="btn-primary" onClick={() => setPage("rekts")} style={{ fontSize: 16, padding: "14px 28px", background: "linear-gradient(135deg, #ef4444, #dc2626)" }}>
            Try Rekts Now <Icons.ArrowRight />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
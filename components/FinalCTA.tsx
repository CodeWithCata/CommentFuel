"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Icons } from "./icons";

interface FinalCTAProps {
  setPage: (page: string) => void;
}

export function FinalCTA({ setPage }: FinalCTAProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  
  return (
    <section ref={ref} style={{ padding:"120px 24px", textAlign:"center", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.12) 0%, transparent 70%)", pointerEvents:"none" }} />
      <motion.div 
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ maxWidth:600, margin:"0 auto" }}
      >
        <h2 style={{ fontFamily:"var(--font-head)", fontSize:"clamp(2rem,5vw,3.2rem)", fontWeight:800, letterSpacing:"-0.03em", marginBottom:20 }}>
          Start generating<br /><span className="glow-text">viral comments today.</span>
        </h2>
        <p style={{ color:"var(--muted)", fontSize:16, marginBottom:36, lineHeight:1.7 }}>
          Join 12,000+ creators already using Replyfy to grow their engagement.
        </p>
        <button className="btn-primary" style={{ fontSize:17, padding:"16px 36px" }} onClick={() => setPage("dashboard")}>
          Try Replyfy Free <Icons.ArrowRight />
        </button>
      </motion.div>
    </section>
  );
}
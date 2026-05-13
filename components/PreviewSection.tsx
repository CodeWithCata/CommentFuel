"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Icons } from "./icons";

const PREVIEW_COMMENTS = [
  "bro unlocked sigma mode 💀",
  "main character energy fr",
  "villain arc loading… ⚡",
  "confidence +1000 no cap",
  "bro thinks he's batman 🦇",
  "POV: gym is the new personality",
];

interface CommentCardProps {
  text: string;
  delay?: number;
}

function CommentCard({ text, delay = 0 }: CommentCardProps) {
  const [copied, setCopied] = useState(false);
  
  const copy = () => { 
    setCopied(true); 
    setTimeout(() => setCopied(false), 1800); 
  };
  
  return (
    <div style={{
      background:"var(--card)", border:"1px solid var(--border)", borderRadius:12,
      padding:"14px 18px", display:"flex", justifyContent:"space-between", alignItems:"center",
      gap:12, transition:"all 0.2s", cursor:"default", animation:`slideIn 0.4s ease ${delay}s both`,
    }}
    onMouseEnter={(e) => { 
      (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.3)"; 
      (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.05)"; 
    }}
    onMouseLeave={(e) => { 
      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"; 
      (e.currentTarget as HTMLElement).style.background = "var(--card)"; 
    }}>
      <span style={{ fontSize:14 }}>{text}</span>
      <button onClick={copy} style={{ background:"none", border:"none", cursor:"pointer", color: copied?"var(--green)":"var(--muted)", transition:"color 0.2s", flexShrink:0 }}>
        {copied ? <Icons.Check /> : <Icons.Copy />}
      </button>
    </div>
  );
}

export function PreviewSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  
  return (
    <section style={{ padding:"100px 24px" }} ref={ref}>
      <div style={{ maxWidth:800, margin:"0 auto" }}>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign:"center", marginBottom:48 }}
        >
          <div className="section-label">Live Preview</div>
          <h2 style={{ fontFamily:"var(--font-head)", fontSize:"clamp(1.8rem,3.5vw,2.8rem)", fontWeight:800, letterSpacing:"-0.02em" }}>
            See Replyfy in action
          </h2>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:20, padding:24, marginBottom:16 }}>
            <div style={{ fontSize:12, color:"var(--muted)", marginBottom:8, fontWeight:500 }}>Input post</div>
            <div style={{ background:"rgba(255,255,255,0.03)", borderRadius:10, padding:"12px 16px", fontSize:14, border:"1px solid rgba(255,255,255,0.05)" }}>
              POV: you started gym 2 weeks ago 💪
            </div>
            <div style={{ display:"flex", gap:8, marginTop:12 }}>
              <span style={{ background:"rgba(124,58,237,0.15)", color:"#a78bfa", borderRadius:100, padding:"4px 12px", fontSize:11, fontWeight:600 }}>Gen Z</span>
              <span style={{ background:"rgba(16,185,129,0.1)", color:"#10b981", borderRadius:100, padding:"4px 12px", fontSize:11, fontWeight:600 }}>✓ Generated</span>
            </div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {PREVIEW_COMMENTS.map((c, i) => (
              <CommentCard key={i} text={c} delay={inView ? i * 0.08 : 0} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
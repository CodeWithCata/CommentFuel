"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Icons } from "./icons";

export function Pricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  
  return (
    <section id="pricing" ref={ref} style={{ padding:"100px 24px" }}>
      <div style={{ maxWidth:800, margin:"0 auto" }}>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign:"center", marginBottom:64 }}
        >
          <div className="section-label">Pricing</div>
          <h2 style={{ fontFamily:"var(--font-head)", fontSize:"clamp(1.8rem,3.5vw,2.8rem)", fontWeight:800, letterSpacing:"-0.02em" }}>
            Simple, honest pricing
          </h2>
        </motion.div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:24 }}>
          {/* Free */}
          <motion.div 
            className="card"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div style={{ marginBottom:24 }}>
              <h3 style={{ fontFamily:"var(--font-head)", fontSize:22, fontWeight:700, marginBottom:6 }}>Free</h3>
              <div style={{ fontSize:36, fontFamily:"var(--font-head)", fontWeight:800 }}>$0<span style={{ fontSize:16, fontWeight:400, color:"var(--muted)" }}>/month</span></div>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:28 }}>
              {["10 generations/day","Basic tones","TikTok comments","Community support"].map(f => (
                <div key={f} style={{ display:"flex", gap:10, alignItems:"center", fontSize:14 }}>
                  <span style={{ color:"var(--green)" }}><Icons.Check /></span>
                  <span style={{ color:"var(--muted)" }}>{f}</span>
                </div>
              ))}
            </div>
            <button className="btn-ghost" style={{ width:"100%", justifyContent:"center" }}>Get started</button>
          </motion.div>
          {/* Pro */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              background: "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(99,102,241,0.08))",
              border:"1px solid rgba(124,58,237,0.4)", borderRadius:16, padding:24, position:"relative", overflow:"hidden",
            }}
          >
            <div style={{ position:"absolute", top:16, right:16, background:"linear-gradient(135deg,var(--accent),var(--accent2))", color:"white", borderRadius:100, padding:"3px 10px", fontSize:11, fontWeight:700 }}>POPULAR</div>
            <div style={{ marginBottom:24 }}>
              <h3 style={{ fontFamily:"var(--font-head)", fontSize:22, fontWeight:700, marginBottom:6 }}>Pro</h3>
              <div style={{ fontSize:36, fontFamily:"var(--font-head)", fontWeight:800 }}>$9<span style={{ fontSize:16, fontWeight:400, color:"var(--muted)" }}>/month</span></div>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:28 }}>
              {["Unlimited generations","All tones unlocked","Creator replies","Saved history","Premium AI outputs","Priority support"].map(f => (
                <div key={f} style={{ display:"flex", gap:10, alignItems:"center", fontSize:14 }}>
                  <span style={{ color:"#a78bfa" }}><Icons.Check /></span>
                  <span>{f}</span>
                </div>
              ))}
            </div>
            <button className="btn-primary" style={{ width:"100%", justifyContent:"center" }}>
              Start Pro — $9/mo
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
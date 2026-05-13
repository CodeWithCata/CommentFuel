import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  
  const steps = [
    { num:"01", title:"Paste a post", desc:"Drop in any TikTok caption, YouTube title, Instagram post, or video transcript.", icon:"📋" },
    { num:"02", title:"Select a tone", desc:"Choose from Funny, Savage, Gen Z, Viral, NPC, Flirty, and more.", icon:"🎭" },
    { num:"03", title:"Generate & post", desc:"Instantly get 5–10 viral comments. Copy and post in one click.", icon:"🚀" },
  ];
  
  return (
    <section style={{ padding:"100px 24px", background:"linear-gradient(180deg, transparent, rgba(124,58,237,0.04), transparent)" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }} ref={ref}>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign:"center", marginBottom:64 }}
        >
          <div className="section-label">How it works</div>
          <h2 style={{ fontFamily:"var(--font-head)", fontSize:"clamp(1.8rem,3.5vw,2.8rem)", fontWeight:800, letterSpacing:"-0.02em" }}>
            Three steps to go viral
          </h2>
        </motion.div>
        
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:20 }}>
          {steps.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              style={{
                textAlign:"center", padding:32,
                background: "var(--card)", border:"1px solid var(--border)", borderRadius:16,
                position:"relative",
              }}
            >
              <div style={{ fontSize:40, marginBottom:16 }}>{s.icon}</div>
              <div style={{ fontFamily:"var(--font-head)", fontSize:12, color:"var(--accent)", fontWeight:700, letterSpacing:"0.1em", marginBottom:8 }}>{s.num}</div>
              <h3 style={{ fontFamily:"var(--font-head)", fontSize:20, fontWeight:700, marginBottom:10 }}>{s.title}</h3>
              <p style={{ color:"var(--muted)", lineHeight:1.6, fontSize:14 }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
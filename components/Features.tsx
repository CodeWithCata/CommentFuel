import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Icons } from "./icons";

export function Features() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  
  const cards = [
    { Icon: Icons.MessageCircle, title:"Viral Comment Generator", desc:"Generate funny, engaging, and high-performing comments instantly. Trained on millions of viral posts.", color:"#7c3aed" },
    { Icon: Icons.Sparkles, title:"Platform Optimized", desc:"Built specifically for TikTok, Instagram, and YouTube audiences. Each platform has its own style and culture.", color:"#6366f1" },
    { Icon: Icons.Zap, title:"Instant Copy & Post", desc:"One-click copy for ultra-fast engagement. Hop on trends before they die with lightning-fast generation.", color:"#10b981" },
  ];

  return (
    <section id="features" ref={ref} style={{ padding:"100px 24px" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign:"center", marginBottom:64 }}
        >
          <div className="section-label">Features</div>
          <h2 style={{ fontFamily:"var(--font-head)", fontSize:"clamp(1.8rem,3.5vw,2.8rem)", fontWeight:800, letterSpacing:"-0.02em" }}>
            Everything you need to go viral
          </h2>
        </motion.div>
        
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:20 }}>
          {cards.map((c, i) => (
            <motion.div 
              key={i} 
              className="card"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              style={{
                background: `linear-gradient(135deg, rgba(${c.color==='#7c3aed'?'124,58,237':c.color==='#6366f1'?'99,102,241':'16,185,129'},0.05), var(--card))`,
                position: "relative", overflow: "hidden",
              }}
            >
              <div style={{ width:48, height:48, borderRadius:12, background:`rgba(${c.color==='#7c3aed'?'124,58,237':c.color==='#6366f1'?'99,102,241':'16,185,129'},0.15)`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:20, color:c.color }}>
                <c.Icon />
              </div>
              <h3 style={{ fontFamily:"var(--font-head)", fontSize:18, fontWeight:700, marginBottom:10 }}>{c.title}</h3>
              <p style={{ color:"var(--muted)", lineHeight:1.6, fontSize:14 }}>{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
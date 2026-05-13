import { useState, useEffect } from "react";
import { Icons } from "./icons";
import { DEMO_COMMENTS } from "../data/samples";

interface HeroProps {
  setPage: (page: string) => void;
}

function HeroCard() {
  const [visible, setVisible] = useState<number[]>([]);
  const [typing, setTyping] = useState(true);
  
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      if (i < DEMO_COMMENTS.length) { 
        setVisible((v: number[]) => [...v, i]); 
        i++; 
      } else { 
        clearInterval(id); 
        setTyping(false); 
      }
    }, 700);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="float" style={{
      background: "var(--card)", border: "1px solid var(--border)",
      borderRadius: 20, padding: 24, width: "100%", maxWidth: 380,
      boxShadow: "0 24px 64px rgba(0,0,0,0.4), 0 0 0 1px rgba(139,92,246,0.1)",
    }}>
      <div style={{ display:"flex", gap:8, marginBottom:16, alignItems:"center" }}>
        <div style={{ width:10, height:10, borderRadius:"50%", background:"#ef4444" }} />
        <div style={{ width:10, height:10, borderRadius:"50%", background:"#f59e0b" }} />
        <div style={{ width:10, height:10, borderRadius:"50%", background:"#10b981" }} />
        <span style={{ marginLeft:8, fontSize:12, color:"var(--muted)" }}>AI generating comments…</span>
      </div>
      <div style={{ background:"rgba(255,255,255,0.03)", borderRadius:10, padding:"10px 14px", marginBottom:16, fontSize:13, color:"var(--muted)", border:"1px solid var(--border)" }}>
        <span style={{ color:"var(--text)" }}>POV: you started gym 2 weeks ago 💪</span>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
        {DEMO_COMMENTS.map((c, i) => (
          <div key={i} style={{
            opacity: visible.includes(i) ? 1 : 0,
            transform: visible.includes(i) ? "translateX(0)" : "translateX(-10px)",
            transition: "all 0.4s ease",
            background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.15)",
            borderRadius: 10, padding: "10px 14px", fontSize: 13,
            display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8,
          }}>
            <span>{c.text}</span>
            <div style={{ color:"var(--muted)", cursor:"pointer", flexShrink:0 }}><Icons.Copy /></div>
          </div>
        ))}
        {typing && (
          <div style={{ padding:"10px 14px", borderRadius:10, border:"1px dashed rgba(255,255,255,0.1)", fontSize:13, color:"var(--muted)" }}>
            <span style={{ animation:"blink 1s infinite" }}>▋</span>
          </div>
        )}
      </div>
      <div style={{ marginTop:16, display:"flex", gap:6 }}>
        {["Funny","Gen Z","Viral"].map(t => (
          <span key={t} style={{ background:"rgba(99,102,241,0.12)", color:"#818cf8", border:"1px solid rgba(99,102,241,0.2)", borderRadius:100, padding:"3px 10px", fontSize:11, fontWeight:600 }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

export function Hero({ setPage }: HeroProps) {
  return (
    <section style={{ minHeight:"100vh", display:"flex", alignItems:"center", padding:"120px 24px 80px", position:"relative", overflow:"hidden" }}>
      {/* BG orbs */}
      <div style={{ position:"absolute", top:"10%", left:"5%", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"10%", right:"5%", width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)", pointerEvents:"none" }} />
      <div style={{ maxWidth:1200, margin:"0 auto", width:"100%", display:"flex", alignItems:"center", gap:60, flexWrap:"wrap" }}>
        <div style={{ flex:1, minWidth:300, animation:"fadeUp 0.7s ease both" }}>
          <span className="badge" style={{ marginBottom:20, display:"inline-flex" }}>
            <Icons.Sparkles />
            AI-Powered Creator Tool
          </span>
          <h1 style={{ fontFamily:"var(--font-head)", fontSize:"clamp(2.4rem,5vw,4rem)", fontWeight:800, lineHeight:1.1, letterSpacing:"-0.03em", marginBottom:20 }}>
            Generate comments<br />
            <span className="glow-text">people actually reply to.</span>
          </h1>
          <p style={{ fontSize:"clamp(1rem,2vw,1.15rem)", color:"var(--muted)", lineHeight:1.7, marginBottom:36, maxWidth:480 }}>
            Create viral TikTok, Instagram, and YouTube comments in seconds using AI. Go from zero to engagement in one click.
          </p>
          <div style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
            <button className="btn-primary" style={{ fontSize:16, padding:"14px 28px" }} onClick={() => setPage("dashboard")}>
              Start Free <Icons.ArrowRight />
            </button>
            <button className="btn-ghost" style={{ fontSize:16, padding:"14px 28px" }}>
              Watch Demo
            </button>
          </div>
          <div style={{ marginTop:32, display:"flex", gap:24, alignItems:"center", flexWrap:"wrap" }}>
            {[["12k+","Creators"],["2M+","Comments generated"],["4.9★","Rating"]].map(([n,l]) => (
              <div key={l}>
                <div style={{ fontFamily:"var(--font-head)", fontSize:20, fontWeight:700 }}>{n}</div>
                <div style={{ fontSize:12, color:"var(--muted)" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex:1, minWidth:300, display:"flex", justifyContent:"center", animation:"fadeUp 0.9s ease 0.2s both" }}>
          <HeroCard />
        </div>
      </div>
    </section>
  );
}
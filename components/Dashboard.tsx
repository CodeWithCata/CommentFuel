"use client";

import { useState } from "react";
import { Icons } from "./icons";

const TONES = ["Funny","Savage","Gen Z","NPC","Flirty","Viral","Smart"];

const PLATFORMS = [
  { id:"tiktok", label:"TikTok", Icon: Icons.TikTok },
  { id:"instagram", label:"Instagram", Icon: Icons.Instagram },
  { id:"youtube", label:"YouTube", Icon: Icons.YouTube },
];

const SAMPLE_OUTPUTS: Record<string, string[]> = {
  Funny: [
    "bro turned into a gym rat overnight 💀",
    "the villain arc has officially begun",
    "lmao the transformation speedrun",
    "sir this is a wendy's",
    "POV: becoming the person you googled",
    "gym membership + protein powder = new personality",
    "the character development is REAL",
  ],
  Savage: [
    "two weeks and already posting… relax",
    "let me know when it's been two years",
    "the overconfidence is kinda iconic tho",
    "gym beginner starter pack 😭",
    "bro just wait until day 3",
    "first week motivation vs month 2 reality",
  ],
  "Gen Z": [
    "no bc this is a whole vibe shift",
    "the lore is developing rn",
    "slay the villain era is giving",
    "ngl this lowkey hit different",
    "bestie entered their main character era",
    "ok but the drip is immaculate",
  ],
  NPC: [
    "gym detected. initiating gains protocol.",
    "01001000 01000101 01001100 01001100 01001111",
    "new quest unlocked: become jacked",
    "muscle.exe is loading…",
    "stats updated: +10 discipline",
    "ACHIEVEMENT UNLOCKED: touched a barbell",
  ],
  Flirty: [
    "ok but can I get a gym buddy tho 👀",
    "the dedication is actually kinda hot ngl",
    "calling dibs right now be right back",
    "sir I have a few questions about your schedule",
    "the way this had me double-tapping immediately",
  ],
  Viral: [
    "nah this deserves way more views",
    "this needs to be on everyone's fyp",
    "drop the routine I'm begging",
    "the algorithm SLEPT on this",
    "screenshotting for motivation fr",
    "ok I'm unironically inspired rn",
  ],
  Smart: [
    "consistency compounds. this is day one of a new you.",
    "two weeks is exactly when most quit. keep going.",
    "building a habit takes 21 days. you're ahead of most people.",
    "the discipline will show up everywhere else too.",
    "the hardest part is starting. you did it.",
  ],
};

function Skeleton() {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
      {[1,2,3,4,5].map(i => (
        <div key={i} style={{
          height:52, borderRadius:12, overflow:"hidden", position:"relative",
          background:"var(--card)", border:"1px solid var(--border)",
        }}>
          <div style={{
            position:"absolute", inset:0,
            background:"linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)",
            backgroundSize:"200% 100%",
            animation:"shimmer 1.5s infinite",
          }} />
        </div>
      ))}
    </div>
  );
}

interface DashboardOutputCardProps {
  text: string;
  idx: number;
}

function DashboardOutputCard({ text, idx }: DashboardOutputCardProps) {
  const [copied, setCopied] = useState(false);
  const copy = () => { setCopied(true); setTimeout(() => setCopied(false), 1800); };
  
  return (
    <div style={{
      background:"var(--card)", border:"1px solid var(--border)", borderRadius:12,
      padding:"14px 18px", display:"flex", justifyContent:"space-between", alignItems:"center",
      gap:12, animation:`slideIn 0.35s ease ${idx*0.07}s both`, cursor:"default",
      transition:"all 0.2s",
    }}
    onMouseEnter={(e) => { 
      (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.35)"; 
      (e.currentTarget as HTMLElement).style.transform = "translateX(4px)"; 
      (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.25)"; 
    }}
    onMouseLeave={(e) => { 
      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"; 
      (e.currentTarget as HTMLElement).style.transform = "none"; 
      (e.currentTarget as HTMLElement).style.boxShadow = "none"; 
    }}>
      <span style={{ fontSize:14 }}>{text}</span>
      <div style={{ display:"flex", gap:8, flexShrink:0 }}>
        <button onClick={copy} title="Copy" style={{ background:"none", border:"none", cursor:"pointer", color:copied?"var(--green)":"var(--muted)", transition:"color 0.2s", padding:4 }}>
          {copied ? <Icons.Check /> : <Icons.Copy />}
        </button>
      </div>
    </div>
  );
}

export function Dashboard() {
  const [platform, setPlatform] = useState("tiktok");
  const [tone, setTone] = useState("Gen Z");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [generated, setGenerated] = useState(false);
  const [error, setError] = useState("");

const generate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setGenerated(false);
    setError("");
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          platform,
          tone,
          post: input,
        }),
      });

      // Check if response is OK before trying to parse JSON
      if (!response.ok) {
        const text = await response.text();
        console.error('Server error:', text);
        throw new Error('Server error');
      }

      // Check content type to ensure we're getting JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Expected JSON but got:', text.substring(0, 100));
        throw new Error('Invalid response format');
      }

      const data = await response.json();
      console.log('Received data:', data);
      
      if (data.comments && data.comments.length > 0) {
        setResults(data.comments);
        setGenerated(true);
        if (data.error) {
          setError(data.error);
        }
      } else {
        throw new Error('No comments generated');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Using backup comments');
      // Fallback to sample data
      const pool = SAMPLE_OUTPUTS[tone] || SAMPLE_OUTPUTS["Funny"];
      const shuffled = [...pool].sort(() => Math.random() - 0.5);
      setResults(shuffled.slice(0, 6));
      setGenerated(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight:"100vh", paddingTop:80 }}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"40px 24px" }}>
        <div style={{ marginBottom:40 }}>
          <span className="badge" style={{ marginBottom:12 }}>Dashboard</span>
          <h1 style={{ fontFamily:"var(--font-head)", fontSize:"clamp(1.8rem,3.5vw,2.4rem)", fontWeight:800, letterSpacing:"-0.02em" }}>
            Generate viral comments
          </h1>
          <p style={{ color:"var(--muted)", marginTop:8 }}>Paste a caption, pick a tone, and watch the AI work.</p>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24 }}>
          {/* LEFT PANEL */}
          <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
            <div className="card">
              <div style={{ fontSize:12, color:"var(--muted)", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:14 }}>Platform</div>
              <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                {PLATFORMS.map(({ id, label, Icon: PIcon }) => (
                  <button key={id} onClick={() => setPlatform(id)} style={{
                    display:"flex", alignItems:"center", gap:8, padding:"9px 16px",
                    borderRadius:10, border:`1px solid ${platform===id?"rgba(124,58,237,0.5)":"var(--border)"}`,
                    background: platform===id ? "rgba(124,58,237,0.12)" : "transparent",
                    color: platform===id ? "#a78bfa" : "var(--muted)",
                    cursor:"pointer", fontSize:14, fontWeight:500, transition:"all 0.2s",
                    fontFamily:"var(--font-body)",
                  }}>
                    <PIcon /> {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="card">
              <div style={{ fontSize:12, color:"var(--muted)", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:14 }}>Tone</div>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                {TONES.map(t => (
                  <button key={t} onClick={() => setTone(t)} style={{
                    padding:"7px 14px", borderRadius:8, border:`1px solid ${tone===t?"rgba(124,58,237,0.5)":"var(--border)"}`,
                    background: tone===t ? "rgba(124,58,237,0.12)" : "transparent",
                    color: tone===t ? "#a78bfa" : "var(--muted)",
                    cursor:"pointer", fontSize:13, fontWeight:500, transition:"all 0.2s", fontFamily:"var(--font-body)",
                  }}>{t}</button>
                ))}
              </div>
            </div>

            <div className="card" style={{ flex:1 }}>
              <div style={{ fontSize:12, color:"var(--muted)", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:14 }}>Your Post</div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste a caption, topic, or transcript…"
                style={{
                  width:"100%", minHeight:140, resize:"vertical",
                  background:"rgba(255,255,255,0.03)", border:"1px solid var(--border)",
                  borderRadius:10, padding:"14px 16px", fontSize:14, lineHeight:1.6,
                  color:"var(--text)", fontFamily:"var(--font-body)",
                }}
              />
              <div style={{ marginTop:8, fontSize:12, color:"var(--muted)", textAlign:"right" }}>{input.length} chars</div>
            </div>

            <button
              className="btn-primary"
              onClick={generate}
              disabled={loading || !input.trim()}
              style={{
                justifyContent:"center", fontSize:16, padding:"16px",
                opacity: (!input.trim() || loading) ? 0.6 : 1,
                cursor: (!input.trim() || loading) ? "not-allowed" : "pointer",
                animation: input.trim() && !loading ? "pulse-glow 2.5s ease infinite" : "none",
              }}>
              {loading ? (
                <><span style={{ display:"inline-block", width:18, height:18, border:"2px solid rgba(255,255,255,0.4)", borderTopColor:"white", borderRadius:"50%", animation:"spin 0.7s linear infinite" }} /> Generating…</>
              ) : (
                <><Icons.Sparkles /> Generate Comments</>
              )}
            </button>
          </div>

          {/* RIGHT PANEL */}
          <div className="card" style={{ minHeight:500 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
              <div>
                <div style={{ fontSize:12, color:"var(--muted)", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase" }}>Generated Comments</div>
                {generated && <div style={{ fontSize:12, color:"var(--green)", marginTop:4 }}>✓ {results.length} comments ready</div>}
              </div>
              {generated && (
                <button onClick={generate} style={{ background:"none", border:"none", cursor:"pointer", color:"var(--muted)", display:"flex", alignItems:"center", gap:6, fontSize:13, transition:"color 0.2s", fontFamily:"var(--font-body)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--muted)"; }}>
                  <Icons.RefreshCw /> Regenerate
                </button>
              )}
            </div>

            {loading && <Skeleton />}

            {!loading && !generated && (
              <div style={{ height:360, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", color:"var(--muted)", textAlign:"center", gap:16 }}>
                <div style={{ fontSize:48 }}>💬</div>
                <div>
                  <div style={{ fontWeight:600, marginBottom:6 }}>No comments yet</div>
                  <div style={{ fontSize:13 }}>Paste your content and hit generate</div>
                </div>
              </div>
            )}

            {!loading && generated && (
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {results.map((r, i) => (
                  <DashboardOutputCard key={i} text={r} idx={i} />
                ))}
                <div style={{ marginTop:8, padding:"12px 16px", background:"rgba(124,58,237,0.06)", border:"1px dashed rgba(124,58,237,0.2)", borderRadius:10, fontSize:13, color:"var(--muted)", textAlign:"center" }}>
                  Not happy? Click <strong style={{ color:"#a78bfa" }}>Regenerate</strong> for fresh outputs
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
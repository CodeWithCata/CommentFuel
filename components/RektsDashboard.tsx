"use client";

import { useState } from "react";
import { Icons } from "./icons";
import { Skeleton } from "./Skeleton";

const TONES = ["Funny", "Savage", "Gen Z", "NPC", "Flirty", "Viral", "Smart"];
const REKTS_TONES = ["Savage", "Witty", "Gen Z", "Comeback King", "NPC Roast", "Viral Roast", "Intellectual Burn"];

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "ro", label: "Română", flag: "🇷🇴" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "pt", label: "Português", flag: "🇵🇹" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
  { code: "hi", label: "हिन्दी", flag: "🇮🇳" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "ko", label: "한국어", flag: "🇰🇷" },
  { code: "tr", label: "Türkçe", flag: "🇹🇷" },
];

const PLATFORMS = [
  { id: "tiktok", label: "TikTok", Icon: Icons.TikTok },
  { id: "instagram", label: "Instagram", Icon: Icons.Instagram },
  { id: "youtube", label: "YouTube", Icon: Icons.YouTube },
];

const SAMPLE_REKTS: Record<string, Record<string, string[]>> = {
  en: {
    "Savage": [
      "bro thought they ate but left crumbs everywhere 💀",
      "this take is colder than my ex's heart",
      "the audacity paired with the mediocrity is wild",
      "somebody check if this take has a license",
      "the way this flopped should be studied",
      "respectfully, this ain't it chief",
    ],
    "Witty": [
      "I'd agree with you but then we'd both be wrong",
      "this is like a software update - nobody asked for it",
      "your secrets are safe with me. I never listen anyway",
      "I'm not a mirror but I can see myself not caring",
      "you bring everyone so much joy - when you leave",
      "I'd explain it to you but I left my crayons at home",
    ],
  },
  ro: {
    "Savage": [
      "frate credea că a spart ceva dar a lăsat doar firimituri 💀",
      "părerea asta e mai rece decât inima fostei",
      "tupeul combinat cu mediocritatea e incredibil",
      "cineva să verifice dacă părerea asta are permis",
      "modul în care a eșuat asta ar trebui studiat",
      "cu respect, nu e ce trebuie șefule",
    ],
  },
};

export function RektsDashboard() {
  const [platform, setPlatform] = useState("tiktok");
  const [tone, setTone] = useState("Savage");
  const [language, setLanguage] = useState("en");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [generated, setGenerated] = useState(false);
  const [error, setError] = useState("");

  const generateRekts = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setGenerated(false);
    setError("");
    
    try {
      const response = await fetch('/api/generate/rekts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          platform, 
          tone, 
          post: input,
          language,
        }),
      });

      const data = await response.json();
      
      if (data.rekts && data.rekts.length > 0) {
        setResults(data.rekts);
        setGenerated(true);
      } else {
        throw new Error('No rekts generated');
      }
    } catch (err) {
      console.error('Error:', err);
      setError(`Using sample rekts`);
      const langSamples = SAMPLE_REKTS[language] || SAMPLE_REKTS["en"];
      const pool = langSamples[tone] || langSamples["Savage"] || Object.values(langSamples)[0];
      const shuffled = [...pool].sort(() => Math.random() - 0.5);
      setResults(shuffled.slice(0, 6));
      setGenerated(true);
    } finally {
      setLoading(false);
    }
  };

  const getPlaceholder = () => {
    const placeholders: Record<string, string> = {
      en: "Paste the post you want to roast…",
      ro: "Lipește postarea pe care vrei s-o faci praf…",
      es: "Pega la publicación que quieres destrozar…",
      fr: "Collez le post que vous voulez détruire…",
      de: "Füge den Beitrag ein, den du roasten willst…",
      it: "Incolla il post che vuoi distruggere…",
      pt: "Cole o post que você quer detonar…",
      ar: "الصق المنشور الذي تريد السخرية منه…",
      hi: "वह पोस्ट पेस्ट करें जिसे आप रोस्ट करना चाहते हैं…",
      ja: " roastingしたい投稿を貼り付けてください…",
      ko: "조롱하고 싶은 게시물을 붙여넣으세요…",
      tr: "Roastlamak istediğin gönderiyi yapıştır…",
    };
    return placeholders[language] || placeholders["en"];
  };

  return (
    <div style={{ minHeight: "100vh", paddingTop: 80, background: "linear-gradient(135deg, #1a0a2e 0%, #0d1117 100%)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px" }}>
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <span className="badge" style={{ marginBottom: 12, background: "rgba(239,68,68,0.12)", color: "#fca5a5", border: "1px solid rgba(239,68,68,0.25)" }}>
            🔥 Rekts
          </span>
          <h1 style={{ fontFamily: "var(--font-head)", fontSize: "clamp(1.8rem,3.5vw,2.4rem)", fontWeight: 800, letterSpacing: "-0.02em" }}>
            Generate savage roasts in any language
          </h1>
          <p style={{ color: "var(--muted)", marginTop: 8 }}>Drop a post, pick your language, and destroy the comments section worldwide.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {/* Left Panel */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Language selector */}
            <div className="card">
              <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>Language</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {LANGUAGES.map(({ code, label, flag }) => (
                  <button key={code} onClick={() => setLanguage(code)} style={{
                    display: "flex", alignItems: "center", gap: 6, padding: "9px 14px",
                    borderRadius: 10, border: `1px solid ${language === code ? "rgba(239,68,68,0.5)" : "var(--border)"}`,
                    background: language === code ? "rgba(239,68,68,0.12)" : "transparent",
                    color: language === code ? "#fca5a5" : "var(--muted)",
                    cursor: "pointer", fontSize: 14, fontWeight: 500, transition: "all 0.2s",
                    fontFamily: "var(--font-body)",
                  }}>
                    <span style={{ fontSize: 16 }}>{flag}</span> {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Platform selector */}
            <div className="card">
              <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>Platform</div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {PLATFORMS.map(({ id, label, Icon: PIcon }) => (
                  <button key={id} onClick={() => setPlatform(id)} style={{
                    display: "flex", alignItems: "center", gap: 8, padding: "9px 16px",
                    borderRadius: 10, border: `1px solid ${platform === id ? "rgba(239,68,68,0.5)" : "var(--border)"}`,
                    background: platform === id ? "rgba(239,68,68,0.12)" : "transparent",
                    color: platform === id ? "#fca5a5" : "var(--muted)",
                    cursor: "pointer", fontSize: 14, fontWeight: 500, transition: "all 0.2s",
                    fontFamily: "var(--font-body)",
                  }}>
                    <PIcon /> {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tone selector */}
            <div className="card">
              <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>Roast Style</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {REKTS_TONES.map(t => (
                  <button key={t} onClick={() => setTone(t)} style={{
                    padding: "7px 14px", borderRadius: 8, border: `1px solid ${tone === t ? "rgba(239,68,68,0.5)" : "var(--border)"}`,
                    background: tone === t ? "rgba(239,68,68,0.12)" : "transparent",
                    color: tone === t ? "#fca5a5" : "var(--muted)",
                    cursor: "pointer", fontSize: 13, fontWeight: 500, transition: "all 0.2s", fontFamily: "var(--font-body)",
                  }}>{t}</button>
                ))}
              </div>
            </div>

            {/* Textarea */}
            <div className="card" style={{ flex: 1 }}>
              <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>Post to Roast</div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={getPlaceholder()}
                style={{
                  width: "100%", minHeight: 140, resize: "vertical",
                  background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)",
                  borderRadius: 10, padding: "14px 16px", fontSize: 14, lineHeight: 1.6,
                  color: "var(--text)", fontFamily: "var(--font-body)",
                }}
              />
              <div style={{ marginTop: 8, fontSize: 12, color: "var(--muted)", textAlign: "right" }}>{input.length} chars</div>
            </div>

            {/* Generate button */}
            <button
              className="btn-primary"
              onClick={generateRekts}
              disabled={loading || !input.trim()}
              style={{
                justifyContent: "center", fontSize: 16, padding: "16px",
                opacity: (!input.trim() || loading) ? 0.6 : 1,
                cursor: (!input.trim() || loading) ? "not-allowed" : "pointer",
                background: "linear-gradient(135deg, #ef4444, #dc2626)",
              }}>
              {loading ? (
                <><span style={{ display: "inline-block", width: 18, height: 18, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "white", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} /> Generating Roasts…</>
              ) : (
                <><Icons.Zap /> Generate Roasts</>
              )}
            </button>
          </div>

          {/* Right Panel */}
          <div className="card" style={{ minHeight: 500, border: "1px solid rgba(239,68,68,0.2)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Your Roasts 🔥</div>
                {generated && <div style={{ fontSize: 12, color: "#ef4444", marginTop: 4 }}>✓ {results.length} roasts ready</div>}
              </div>
              {generated && (
                <button onClick={generateRekts} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted)", display: "flex", alignItems: "center", gap: 6, fontSize: 13, transition: "color 0.2s", fontFamily: "var(--font-body)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--muted)"; }}>
                  <Icons.RefreshCw /> Regenerate
                </button>
              )}
            </div>

            {loading && <Skeleton />}

            {!loading && !generated && (
              <div style={{ height: 360, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "var(--muted)", textAlign: "center", gap: 16 }}>
                <div style={{ fontSize: 48 }}>🔥</div>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 6 }}>Ready to roast</div>
                  <div style={{ fontSize: 13 }}>Paste a post, pick a language, and generate savage replies</div>
                </div>
              </div>
            )}

            {!loading && generated && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {results.map((r, i) => (
                  <div key={i} style={{
                    background: "var(--card)", border: "1px solid rgba(239,68,68,0.15)", borderRadius: 12,
                    padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center",
                    gap: 12, animation: `slideIn 0.35s ease ${i * 0.07}s both`,
                    transition: "all 0.2s",
                  }}>
                    <span style={{ fontSize: 14 }}>{r}</span>
                    <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted)", padding: 4 }}>
                      <Icons.Copy />
                    </button>
                  </div>
                ))}
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
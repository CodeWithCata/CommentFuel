import { useState, useEffect } from "react";
import { Icons } from "./icons";

interface NavbarProps {
  page: string;
  setPage: (page: string) => void;
}

export function Navbar({ page, setPage }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  
  const handleNavClick = (item: string) => {
    setOpen(false);
    switch(item) {
      case "Dashboard":
        setPage("dashboard");
        break;
      case "Rekts":
        setPage("rekts");
        break;
      case "Features":
      case "Pricing":
        setPage("landing");
        setTimeout(() => {
          document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        break;
    }
  };
  
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(8,11,18,0.85)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      transition: "all 0.3s",
      padding: "0 24px",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button onClick={() => setPage("landing")} style={{ display:"flex", alignItems:"center", gap:10, background:"none", border:"none", cursor:"pointer" }}>
          <Icons.Logo />
          <span style={{ fontFamily: "var(--font-head)", fontSize:18, fontWeight:700, color:"var(--text)", letterSpacing:"-0.01em" }}>CommentFuel</span>
        </button>
        
        {/* Desktop nav */}
        <div style={{ display:"flex", alignItems:"center", gap:32 }} className="nav-desktop">
          {["Features","Pricing"].map(item => (
            <a key={item} 
              href={`#${item.toLowerCase()}`}
              onClick={(e) => {
                if (page !== "landing") {
                  e.preventDefault();
                  handleNavClick(item);
                }
              }}
              style={{ color:"var(--muted)", fontSize:14, fontWeight:500, textDecoration:"none", transition:"color 0.2s", cursor:"pointer" }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "var(--text)"; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "var(--muted)"; }}
            >{item}</a>
          ))}
          <button onClick={() => setPage("dashboard")}
            style={{ 
              color: page === "dashboard" ? "var(--text)" : "var(--muted)", 
              fontSize:14, fontWeight:500, background:"none", border:"none", cursor:"pointer", transition:"color 0.2s" 
            }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "var(--text)"; }}
            onMouseLeave={(e) => { 
              if (page !== "dashboard") {
                (e.target as HTMLElement).style.color = "var(--muted)"; 
              }
            }}
          >Comments</button>
          <button onClick={() => setPage("rekts")}
            style={{ 
              color: page === "rekts" ? "#fca5a5" : "var(--muted)", 
              fontSize:14, fontWeight:600, background:"none", border:"none", cursor:"pointer", transition:"color 0.2s" 
            }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "#fca5a5"; }}
            onMouseLeave={(e) => { 
              if (page !== "rekts") {
                (e.target as HTMLElement).style.color = "var(--muted)"; 
              }
            }}
          >🔥 Rekts</button>
        </div>
        
        <div style={{ display:"flex", gap:10, alignItems:"center" }}>
        
          <button className="btn-primary" style={{ padding:"8px 18px", fontSize:14 }} onClick={() => setPage("dashboard")}>Start Free</button>
          <button style={{ display:"none", background:"none", border:"none", color:"var(--text)", cursor:"pointer" }} onClick={() => setOpen(!open)} id="mob-menu-btn">
            {open ? <Icons.X /> : <Icons.Menu />}
          </button>
        </div>
      </div>
      
      {open && (
        <div style={{ background:"var(--surface)", borderBottom:"1px solid var(--border)", padding:"16px 24px", display:"flex", flexDirection:"column", gap:16 }}>
          {["Features","Pricing","Comments","🔥 Rekts"].map(item => (
            <button 
              key={item} 
              onClick={() => handleNavClick(item === "Comments" ? "Dashboard" : item)}
              style={{ 
                background:"none", 
                border:"none", 
                color: item === "🔥 Rekts" && page === "rekts" ? "#fca5a5" : "var(--text)", 
                fontSize:16, 
                textAlign:"left", 
                cursor:"pointer", 
                padding:"4px 0",
                fontWeight: item === "🔥 Rekts" ? 600 : 400
              }}
            >
              {item}
            </button>
          ))}
        </div>
      )}
      
      <style>{`
        @media (max-width: 640px) {
          .nav-desktop { display:none !important; }
          #mob-menu-btn { display:block !important; }
        }
      `}</style>
    </nav>
  );
}
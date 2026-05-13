"use client";

import { Icons } from "./icons";

export function Footer() {
  const socialLinks = [
    { 
      icon: Icons.GitHub, 
      href: "https://github.com/CodeWithCata/CommentFuel",
      label: "GitHub",
      hoverColor: "#a78bfa"
    },
    { 
      icon: Icons.Twitter, 
      href: "#",
      label: "Twitter",
      hoverColor: "#1d9bf0"
    },
  ];

  const footerLinks = [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Terms", href: "#" },
    { label: "Privacy", href: "#" },
  ];

  return (
    <footer style={{ 
      borderTop: "1px solid var(--border)", 
      padding: "60px 24px 30px", 
      background: "linear-gradient(180deg, rgba(0,0,0,0.3), rgba(124,58,237,0.03))" 
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Top Section */}
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "flex-start", 
          flexWrap: "wrap", 
          gap: 40,
          marginBottom: 40 
        }}>
          {/* Brand Column */}
          <div style={{ minWidth: 200 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <Icons.Logo />
              <span style={{ 
                fontFamily: "var(--font-head)", 
                fontSize: 20, 
                fontWeight: 700,
                letterSpacing: "-0.02em"
              }}>
                CommentFuel
              </span>
            </div>
            <p style={{ 
              color: "var(--muted)", 
              fontSize: 14, 
              lineHeight: 1.6,
              maxWidth: 280,
              marginBottom: 20
            }}>
              AI-powered comment & roast generator. Go viral, destroy comments sections, and fuel your engagement.
            </p>
            
            {/* Social Links */}
            <div style={{ display: "flex", gap: 12 }}>
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    border: "1px solid var(--border)",
                    color: "var(--muted)",
                    transition: "all 0.2s",
                    background: "rgba(255,255,255,0.02)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = social.hoverColor;
                    (e.currentTarget as HTMLElement).style.borderColor = social.hoverColor;
                    (e.currentTarget as HTMLElement).style.background = `${social.hoverColor}15`;
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "var(--muted)";
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div style={{ display: "flex", gap: 60, flexWrap: "wrap" }}>
            {/* Product Links */}
            <div>
              <h4 style={{ 
                fontFamily: "var(--font-body)", 
                fontSize: 13, 
                fontWeight: 600, 
                color: "var(--text)",
                marginBottom: 16,
                letterSpacing: "0.05em",
                textTransform: "uppercase"
              }}>
                Product
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {["Comments Generator", "Rekts Roaster", "Dashboard", "Pricing"].map(link => (
                  <a
                    key={link}
                    href="#"
                    style={{
                      color: "var(--muted)",
                      fontSize: 14,
                      textDecoration: "none",
                      transition: "color 0.2s, transform 0.2s",
                      display: "inline-block",
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.color = "#a78bfa";
                      (e.target as HTMLElement).style.transform = "translateX(4px)";
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.color = "var(--muted)";
                      (e.target as HTMLElement).style.transform = "translateX(0)";
                    }}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h4 style={{ 
                fontFamily: "var(--font-body)", 
                fontSize: 13, 
                fontWeight: 600, 
                color: "var(--text)",
                marginBottom: 16,
                letterSpacing: "0.05em",
                textTransform: "uppercase"
              }}>
                Company
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {["About", "Blog", "Twitter", "GitHub"].map(link => (
                  <a
                    key={link}
                    href="#"
                    style={{
                      color: "var(--muted)",
                      fontSize: 14,
                      textDecoration: "none",
                      transition: "color 0.2s, transform 0.2s",
                      display: "inline-block",
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.color = "#a78bfa";
                      (e.target as HTMLElement).style.transform = "translateX(4px)";
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.color = "var(--muted)";
                      (e.target as HTMLElement).style.transform = "translateX(0)";
                    }}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>

            {/* Legal Links */}
            <div>
              <h4 style={{ 
                fontFamily: "var(--font-body)", 
                fontSize: 13, 
                fontWeight: 600, 
                color: "var(--text)",
                marginBottom: 16,
                letterSpacing: "0.05em",
                textTransform: "uppercase"
              }}>
                Legal
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {["Terms of Service", "Privacy Policy", "Cookies"].map(link => (
                  <a
                    key={link}
                    href="#"
                    style={{
                      color: "var(--muted)",
                      fontSize: 14,
                      textDecoration: "none",
                      transition: "color 0.2s, transform 0.2s",
                      display: "inline-block",
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.color = "#a78bfa";
                      (e.target as HTMLElement).style.transform = "translateX(4px)";
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.color = "var(--muted)";
                      (e.target as HTMLElement).style.transform = "translateX(0)";
                    }}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ 
          borderTop: "1px solid var(--border)", 
          paddingTop: 24,
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          flexWrap: "wrap", 
          gap: 12 
        }}>
          <div style={{ color: "var(--muted)", fontSize: 13, display: "flex", alignItems: "center", gap: 8 }}>
            <span>© 2025 CommentFuel. All rights reserved.</span>
            <span style={{ color: "var(--border)" }}>•</span>
            <span>Made with by </span>
            <a
              href="https://github.com/CodeWithCata"
              target="_blank"
              rel="noopener noreferrer"
              style={{ 
                color: "#a78bfa", 
                textDecoration: "none", 
                fontWeight: 600,
                transition: "color 0.2s" 
              }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "#c4b5fd"; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "#a78bfa"; }}
            >
              CWcata
            </a>
          </div>
          
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ color: "var(--muted)", fontSize: 12 }}>Powered by</span>
            <a
              href="https://github.com/CodeWithCata/CommentFuel"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                color: "var(--muted)",
                textDecoration: "none",
                fontSize: 13,
                fontWeight: 500,
                padding: "4px 12px",
                borderRadius: 6,
                border: "1px solid var(--border)",
                background: "rgba(255,255,255,0.02)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--text)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)";
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--muted)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)";
              }}
            >
              <Icons.GitHub />
              <span>Open Source</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
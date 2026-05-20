"use client";

/*
  🦶 FOOTER — Ganda Gula (compact)
  ==================================
  Teaching note: compact two-column footer.
  LEFT:  logo + tagline
  CENTER: "Voltar ao Topo" button centered
  RIGHT: nav links + social icons + copyright

  The "Reservas" nav link has a glowing pulse animation —
  CSS keyframes create the intermittent halo effect.
  This draws the eye to the main call to action without
  being too aggressive. Pure CSS, no JavaScript needed.
*/

import Image from "next/image";
import { useTheme } from "../../context/ThemeProvider";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

const navLinks = [
  { label: "🍽️ Menu", target: "menu", cta: false },
  { label: "📅 Reservas", target: "reservas", cta: true },
  { label: "👨‍🍳 El Chef", target: "chef", cta: false },
  { label: "📍 Mapa", target: "mapa", cta: false },
];

const socialLinks = [
  {
    label: "Facebook",
    url: "https://facebook.com",
    icon: <FaFacebook size={22} />,
    color: "#1877F2",
  },
  {
    label: "Instagram",
    url: "https://instagram.com",
    icon: <FaInstagram size={22} />,
    color: "#E1306C",
  },
  {
    label: "WhatsApp",
    url: "https://wa.me/351000000000",
    icon: <FaWhatsapp size={22} />,
    color: "#25D366",
  },
];

export default function Footer() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const bg = isLight ? "var(--gg-bg-card)" : "#030D14";
  const borderColor = isLight ? "var(--gg-bg-border)" : "#0A3050";
  const textMuted = isLight ? "var(--gg-text-muted)" : "#4A80A8";
  const linkColor = isLight ? "var(--gg-text-secondary)" : "#7BBDE8";

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      style={{
        backgroundColor: bg,
        borderTop: `1px solid ${borderColor}`,
        padding: "1.5rem 1.5rem 1rem",
      }}
    >
      {/*
        Teaching note: the @keyframes pulse-ring animation creates
        an expanding ring that fades out — like a sonar ping.
        box-shadow with spread-radius animates outward.
        animation-iteration-count: infinite keeps it looping.
        We use a <style> tag here because this animation only
        exists in the footer — no need to put it in globals.css.
      */}
      <style>{`
      @keyframes pulse-ring {
          0%   { box-shadow: 0 0 0 0px rgba(255, 215, 0, 0.7); }
          70%  { box-shadow: 0 0 0 10px rgba(255, 215, 0, 0); }
          100% { box-shadow: 0 0 0 0px rgba(255, 215, 0, 0); }
        }
        .cta-pulse {
          animation: pulse-ring 2s ease-out infinite;
          border-radius: 20px;
        }
      `}</style>

      <div className="max-w-6xl mx-auto">
        {/* ── MAIN ROW — logo | nav+social ─────────────────── */}
        <div
          className="flex flex-col md:grid items-center gap-4"
          style={{ gridTemplateColumns: "auto 1fr" }}
        >
          {/* LEFT — logo + tagline */}
          <a href="#home" style={{ textDecoration: "none" }}>
            <Image
              src="/images/logo-ganda-gula.png"
              alt="Ganda Gula"
              width={100}
              height={50}
              className="h-10 w-auto"
            />
            <p
              style={{
                color: textMuted,
                fontSize: "0.8rem",
                fontStyle: "italic",
                fontFamily: "Georgia, serif",
                marginTop: "4px",
              }}
            >
              O melhor bacalhau de Chaves.
            </p>
          </a>

          {/* RIGHT — nav links + social + copyright */}
          <div className="flex flex-col gap-3 md:items-end items-center">
            {/* Nav links */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 items-center justify-end">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={`#${link.target}`}
                  className={link.cta ? "cta-pulse" : ""}
                  style={{
                    backgroundColor: "transparent",
                    padding: link.cta ? "4px 14px" : "0",
                    borderRadius: link.cta ? "20px" : "0",
                    border: link.cta ? "1.5px solid #FFD700" : "none",
                    textDecoration: "none",
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    color: linkColor,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (!link.cta)
                      e.currentTarget.style.color = "var(--gg-accent)";
                  }}
                  onMouseLeave={(e) => {
                    if (!link.cta) e.currentTarget.style.color = linkColor;
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Social icons + copyright */}
            <div className="flex items-center gap-4">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="transition hover:scale-110"
                  style={{ color: s.color }}
                >
                  {s.icon}
                </a>
              ))}
              <div
                style={{
                  width: "1px",
                  height: "18px",
                  backgroundColor: borderColor,
                }}
              />
              <p style={{ color: textMuted, fontSize: "0.8rem" }}>
                © {new Date().getFullYear()} Ganda Gula
              </p>
            </div>
          </div>
        </div>

        {/* ── BACK TO TOP — centered ────────────────────────── */}
        <div
          style={{
            textAlign: "center",
            marginTop: "1.25rem",
            paddingTop: "1rem",
            borderTop: `1px solid ${borderColor}`,
          }}
        >
          <button
            onClick={scrollToTop}
            style={{
              backgroundColor: "var(--gg-accent)",
              color: "#fff",
              border: "none",
              padding: "8px 28px",
              borderRadius: "20px",
              fontSize: "0.9rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--gg-accent-hover)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--gg-accent)")
            }
          >
            ↑ Voltar ao Topo
          </button>
        </div>
      </div>
    </footer>
  );
}

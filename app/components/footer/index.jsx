"use client";

/*
  🦶 FOOTER — DataSpectacles
  ===========================
  Teaching note: the footer has four jobs:
  1. Brand reminder — logo/name at the bottom
  2. Quick navigation — mirrors the navbar links
  3. Social links — opens in new tab with security best practices
  4. Mission button — tucked here so it doesn't clutter the main nav
     but is findable by anyone who wants to know more about the project

  Theme support: reads isLight from useTheme() and switches all
  colours automatically — same pattern as every other component.
*/

import { useTheme } from "../../context/ThemeProvider";
import { FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

/* ============================================================
   Nav links — keep in sync with navbar/index.tsx
   Teaching note: defined outside the component so this array
   is created once, not on every re-render.
   ============================================================ */
const navLinks = [
  { label: "Stories", target: "stories" },
  { label: "World", target: "globe" },
  { label: "Watch", target: "video" },
  { label: "Contact", target: "contact" },
];

/* ============================================================
   Social links
   Teaching note: storing the icon as JSX and color as a string
   lets us map over this array cleanly instead of repeating
   the same <a> block five times.
   ============================================================ */
const socialLinks = [
  {
    label: "Instagram",
    url: "https://instagram.com",
    icon: <FaInstagram size={22} />,
    color: "#E1306C",
  },
  {
    label: "Facebook",
    url: "https://facebook.com",
    icon: <FaFacebook size={22} />,
    color: "#1877F2",
  },
  {
    label: "YouTube",
    url: "https://www.youtube.com/@dataspectacles",
    icon: <FaYoutube size={22} />,
    color: "#FF0000",
  },
  {
    label: "X",
    url: "https://x.com",
    icon: <FaXTwitter size={22} />,
    color: "#ffffff",
  },
];

export default function Footer() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  /*
    Teaching note: all theme-dependent values defined here
    at the top — not scattered through the JSX. One place
    to look when adjusting light/dark colours.
  */
  const bg = isLight ? "#E2D0B8" : "#0A0705";
  const borderColor = isLight ? "#C4A882" : "#3D3530";
  const textPrimary = isLight ? "#2C1810" : "#F0E6D3";
  const textMuted = isLight ? "#8B6340" : "#8A7A6A";
  const linkColor = isLight ? "#5A3A22" : "#C4B49A";

  return (
    <footer className="px-6 py-14" style={{ backgroundColor: bg }}>
      <div className="max-w-6xl mx-auto">
        {/* ── TOP ROW — brand + nav links ──────────────────── */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-10">
          {/* Brand block */}
          <div>
            <p
              className="text-xl font-bold mb-1"
              style={{
                color: textPrimary,
                fontFamily: "Georgia, serif",
                letterSpacing: "-0.01em",
              }}
            >
              DataSpectacles
            </p>
            <p
              className="text-sm italic"
              style={{ color: textMuted, fontFamily: "Georgia, serif" }}
            >
              New stories, told with data.
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={`#${link.target}`}
                className="transition hover:opacity-75"
                style={{ color: linkColor, textDecoration: "none" }}
              >
                {link.label}
              </a>
            ))}

            {/* ── Mission button ──────────────────────────────
                Teaching note: this is a ghost button — transparent
                background, just a border. It sits in the footer
                rather than the main nav so it doesn't compete
                with the primary CTAs, but is easy to find for
                anyone curious about the project's purpose. */}

            <a
              href="#mission"
              className="transition hover:opacity-75 ds-btn-secondary"
              style={{
                color: "var(--ds-accent)",
                borderColor: "var(--ds-accent)",
                padding: "2px 12px",
                borderRadius: "20px",
                fontSize: "0.8rem",
                fontWeight: 600,
                textDecoration: "none",
                letterSpacing: "0.02em",
              }}
            >
              Our Mission
            </a>
          </div>
        </div>

        {/* ── SOCIAL ICONS ─────────────────────────────────── */}
        {/*
          Teaching note: target="_blank" opens in a new tab.
          rel="noopener noreferrer" is a security best practice —
          without it, the new tab can access your page via
          window.opener which is a security vulnerability.
        */}
        <div className="flex gap-5 mb-10">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="transition hover:scale-125"
              style={{ color: social.color }}
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* ── DIVIDER ──────────────────────────────────────── */}
        <hr style={{ borderColor: borderColor, marginBottom: "1.5rem" }} />

        {/* ── BOTTOM ROW — tagline + copyright ─────────────── */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <p
            className="text-sm italic"
            style={{ color: textMuted, fontFamily: "Georgia, serif" }}
          >
            "Data is just the beginning of the story."
          </p>

          {/*
            Teaching note: new Date().getFullYear() always returns
            the current year — copyright never goes stale.
          */}
          <p className="text-xs" style={{ color: textMuted }}>
            © {new Date().getFullYear()} DataSpectacles. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

"use client";

/*
  🧭 NAVBAR — DataSpectacles
  ===========================
  Teaching note: the Navbar is "fixed" — it stays at the top
  as the user scrolls. It has four responsibilities:
  1. Show the DataSpectacles logo (links to #home)
  2. Navigation links to page sections
  3. Language switcher (same 5 languages as before)
  4. Dark/light theme toggle

  We reuse the same FlagIcon and language logic from Estamos a Pensar
  — the i18n infrastructure is identical, only the nav links change.
*/

import { useState } from "react";
import { useTheme } from "../../context/ThemeProvider";
import { Sun, Moon, Menu, X, Home } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

/* ============================================================
   Nav links — updated for DataSpectacles sections.
   Teaching note: each object maps a display label to a
   section id on the page. The href="#target" scrolls to that
   section. "home-icon" is a special case that renders the
   🏠 icon instead of text.
   ============================================================ */
const navLinks = [
  { label: "home-icon", target: "home" }, // home icon → hero
  { label: "Stories", target: "stories" }, // story grid
  { label: "World", target: "globe" }, // globe / map section
  { label: "Watch", target: "video" }, // video section
  { label: "Contact", target: "contact" }, // contact section
];

const languages = [
  { code: "pt", label: "🇵🇹" },
  { code: "en", label: "🇬🇧" },
  { code: "es", label: "🇪🇸" },
  { code: "gl", label: null }, // uses custom flag image
  { code: "mwl", label: null }, // Mirandês — custom flag image
];

/* ============================================================
   FlagIcon — renders either an emoji flag or a custom image.
   Teaching note: Galician and Mirandês don't have emoji flags
   (they're not sovereign nations) so we use custom .png files
   stored in /public/. All other languages use emoji flags.
   ============================================================ */
function FlagIcon({ code, size = 24 }: { code: string; size?: number }) {
  if (code === "gl" || code === "mwl") {
    return (
      <span
        style={{
          width: size,
          height: size,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          src={code === "gl" ? "/flag-gl.png" : "/flag-mwl.png"}
          alt={code === "gl" ? "Galician" : "Mirandês"}
          width={size}
          height={size}
          style={{ width: size, height: size, objectFit: "cover" }}
          className="rounded-sm"
        />
      </span>
    );
  }
  const lang = languages.find((l) => l.code === code);
  return (
    <span
      style={{
        width: size,
        height: size,
        fontSize: size,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {lang?.label}
    </span>
  );
}

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const currentLocale = pathname.split("/")[1] || "en";
  const isLight = theme === "light";

  /*
    Teaching note: to switch language we just replace the first
    segment of the URL path. e.g. /en/stories → /pt/stories.
    Next.js re-renders with the new locale automatically.
  */
  const switchLanguage = (code: string) => {
    const segments = pathname.split("/");
    segments[1] = code;
    router.push(segments.join("/"));
    setLangOpen(false);
  };

  /* Colours change based on theme — defined once here and
     reused throughout so we only change them in one place */
  const navBg = isLight ? "#F5EDE0" : "#0E0B09";
  const navBorder = isLight ? "#D4C4A8" : "#3D3530";
  const textColor = isLight ? "#2C1810" : "#F0E6D3";
  const mutedColor = isLight ? "#6B4423" : "#A89880";

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: navBg,
        borderBottom: `1px solid ${navBorder}`,
        backdropFilter: "blur(8px)", // frosted glass effect on scroll
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* ── Logo ─────────────────────────────────────────────
            Teaching note: we use next/image for all images.
            It automatically optimises size, format (webp) and
            lazy loading. width/height are the intrinsic size —
            the actual display size is controlled by className. */}
        <a href="#home" className="flex items-center">
          <Image
            src="/images/DataSpectacles.png"
            alt="DataSpectacles"
            width={160}
            height={40}
            className="h-8 w-auto"
            priority // load immediately — it's above the fold
            style={{
              /* In light mode invert the logo if it's white-on-transparent.
                 Teaching note: CSS filter invert(1) flips all colours.
                 Only apply this if your logo is white — remove if it
                 already works on light backgrounds. */
              filter: isLight ? "invert(1) brightness(0.3)" : "none",
            }}
          />
        </a>

        {/* ── Desktop nav links ────────────────────────────── */}
        <div className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => (
            <a
              key={link.target}
              href={`#${link.target}`}
              className="transition font-medium"
              style={{
                color: mutedColor,
                fontSize: "0.9rem",
                letterSpacing: "0.02em",
                textDecoration: "none",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--ds-accent)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.color = mutedColor)}
            >
              {link.label === "home-icon" ? <Home size={18} /> : link.label}
            </a>
          ))}

          {/* Divider */}
          <div
            style={{
              width: "1px",
              height: "20px",
              backgroundColor: navBorder,
            }}
          />

          {/* ── Language switcher ──────────────────────────── */}
          <div className="relative">
            <button
              onClick={() => setLangOpen((prev) => !prev)}
              className="hover:opacity-75 transition flex items-center gap-1"
              aria-label="Switch language"
            >
              <FlagIcon code={currentLocale} size={22} />
            </button>

            {/* Dropdown */}
            {langOpen && (
              <div
                className="absolute right-0 mt-2 rounded-lg overflow-hidden shadow-xl"
                style={{
                  backgroundColor: isLight ? "#F5EDE0" : "#1C1713",
                  border: `1px solid ${navBorder}`,
                  minWidth: "48px",
                }}
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => switchLanguage(lang.code)}
                    className="flex items-center justify-center w-full px-3 py-2 transition hover:opacity-75"
                    style={{
                      opacity: currentLocale === lang.code ? 0.4 : 1,
                    }}
                  >
                    <FlagIcon code={lang.code} size={20} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Dark/light toggle ─────────────────────────── */}
          <button
            onClick={toggleTheme}
            className="hover:opacity-75 transition"
            style={{ color: mutedColor }}
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>

        {/* ── Hamburger — mobile only ──────────────────────── */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          style={{ color: textColor }}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ── Mobile menu ───────────────────────────────────────
          Teaching note: this only renders when menuOpen is true.
          In React, {condition && <Component />} is the standard
          pattern for conditional rendering. */}
      {menuOpen && (
        <div
          className="md:hidden flex flex-col gap-4 px-6 pb-6"
          style={{ backgroundColor: navBg }}
        >
          {navLinks.map((link) => (
            <a
              key={link.target}
              href={`#${link.target}`}
              className="transition font-medium"
              style={{ color: textColor, textDecoration: "none" }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label === "home-icon" ? <Home size={20} /> : link.label}
            </a>
          ))}

          {/* Language row — mobile */}
          <div className="flex gap-3 items-center pt-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => switchLanguage(lang.code)}
                style={{ opacity: currentLocale === lang.code ? 0.4 : 1 }}
                className="transition hover:opacity-75"
              >
                <FlagIcon code={lang.code} size={24} />
              </button>
            ))}
          </div>

          {/* Theme toggle — mobile */}
          <button
            onClick={toggleTheme}
            className="text-left hover:opacity-75 transition flex items-center gap-2"
            style={{ color: textColor }}
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            <span style={{ fontSize: "0.9rem" }}>
              {theme === "light" ? "Dark mode" : "Light mode"}
            </span>
          </button>
        </div>
      )}
    </nav>
  );
}

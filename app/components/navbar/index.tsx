"use client";

/*
  🧭 NAVBAR — Ganda Gula Restaurant (updated layout)
  ====================================================
  Teaching note: we restructured the three-column layout:
  - LEFT:   social media icons (Facebook, Instagram, WhatsApp)
  - CENTER: logo (clickable, goes to #home)
  - RIGHT:  nav links + language switcher + theme toggle

  This mirrors how upscale restaurant sites present themselves —
  social media is prominent because restaurants live on Instagram,
  and the nav links are clean and minimal on the right.
*/

import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeProvider";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

/* ============================================================
   Nav links — all on the RIGHT side now.
   Teaching note: we merged left and right links into one array
   since social icons now occupy the left side entirely.
   ============================================================ */
const navLinks = [
  { label: "🍽️ Menu", target: "menu" },
  { label: "📅 Reservas", target: "reservas" },
  { label: "👨‍🍳 El Chef", target: "chef" },
  { label: "📍 Mapa", target: "mapa" },
];

const languages = [
  { code: "pt", label: "🇵🇹" },
  { code: "en", label: "🇬🇧" },
  { code: "es", label: "🇪🇸" },
  { code: "gl", label: null },
  { code: "mwl", label: null },
];

/*
  Teaching note: social links are now in the navbar LEFT side.
  Restaurants live on Instagram and WhatsApp — putting these
  icons front and center increases follows and reservations.
  target="_blank" opens in new tab.
  rel="noopener noreferrer" prevents security vulnerability
  where the new tab could access the opener via window.opener.
*/
const socialLinks = [
  {
    label: "Facebook",
    url: "https://facebook.com",
    icon: <FaFacebook size={20} />,
    color: "#1877F2",
  },
  {
    label: "Instagram",
    url: "https://instagram.com",
    icon: <FaInstagram size={20} />,
    color: "#E1306C",
  },
  {
    label: "WhatsApp",
    url: "https://wa.me/351000000000",
    icon: <FaWhatsapp size={20} />,
    color: "#25D366",
  },
];

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
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const currentLocale = pathname.split("/")[1] || "pt";
  const isLight = theme === "light";

  /*
    Teaching note: scroll listener — same pattern as before.
    scrolled=true when user has scrolled more than 50px.
    This triggers the transparent/frosted glass navbar effect.
    Always clean up event listeners in the return function
    to prevent memory leaks when the component unmounts.
  */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const switchLanguage = (code: string) => {
    const segments = pathname.split("/");
    segments[1] = code;
    router.push(segments.join("/"));
    setLangOpen(false);
  };

  /*
    Teaching note: two visual states based on scroll position.
    AT TOP: solid background, clearly visible.
    SCROLLED: transparent + blur so hero image shows through.
    text-shadow on scrolled state keeps text readable on any
    photo colour — without it, light photos make text invisible.
  */
  const navBg = scrolled ? "transparent" : isLight ? "#F0F8FF" : "#051520";
  const navBorder = scrolled ? "transparent" : isLight ? "#B8D4E8" : "#0A3050";
  const mutedColor = isLight ? "#2A6090" : "#7BBDE8";
  const textColor = isLight ? "#0A3050" : "#E0F0FF";
  const textShadow = scrolled ? "0 1px 4px rgba(0,0,0,0.7)" : "none";

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: navBg,
        borderBottom: `1px solid ${navBorder}`,
        backdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      {/*
        Teaching note: CSS grid with three columns:
        - 1fr left  → social icons, grows to fill available space
        - auto center → logo, only as wide as the image
        - 1fr right → nav links, grows to fill available space
        This guarantees the logo is always perfectly centered
        regardless of how many items are on left or right.
      */}
      <div
        className="max-w-7xl mx-auto px-6 py-4"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          gap: "16px",
        }}
      >
        {/* ── LEFT — social icons ───────────────────────────── */}
        <div className="hidden md:flex gap-4 items-center justify-start">
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="transition hover:scale-110"
              style={{ color: s.color, textShadow }}
            >
              {s.icon}
            </a>
          ))}
        </div>

        {/* ── CENTER — logo ─────────────────────────────────── */}
        <a href="#home" className="flex items-center justify-center">
          <Image
            src="/images/logo-ganda-gula.png"
            alt="Ganda Gula"
            width={120}
            height={60}
            className="h-12 w-auto"
            priority
          />
        </a>

        {/* ── RIGHT — nav links + language + theme ──────────── */}
        <div className="hidden md:flex gap-5 items-center justify-end">
          {navLinks.map((link) => (
            <a
              key={link.target}
              href={`#${link.target}`}
              className="transition font-medium"
              style={{
                color: mutedColor,
                fontSize: "0.88rem",
                letterSpacing: "0.02em",
                textDecoration: "none",
                textShadow,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--gg-accent)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.color = mutedColor)}
            >
              {link.label}
            </a>
          ))}

          {/* Divider */}
          <div
            style={{ width: "1px", height: "20px", backgroundColor: navBorder }}
          />

          {/* Language switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen((prev) => !prev)}
              className="hover:opacity-75 transition"
              aria-label="Switch language"
            >
              <FlagIcon code={currentLocale} size={22} />
            </button>
            {langOpen && (
              <div
                className="absolute right-0 mt-2 rounded-lg overflow-hidden shadow-xl"
                style={{
                  backgroundColor: isLight ? "#F0F8FF" : "#051520",
                  border: `1px solid ${navBorder}`,
                  minWidth: "48px",
                }}
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => switchLanguage(lang.code)}
                    className="flex items-center justify-center w-full px-3 py-2 transition hover:opacity-75"
                    style={{ opacity: currentLocale === lang.code ? 0.4 : 1 }}
                  >
                    <FlagIcon code={lang.code} size={20} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="hover:opacity-75 transition"
            style={{ color: mutedColor, textShadow }}
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>

        {/* ── Hamburger — mobile only ──────────────────────── */}
        <button
          className="md:hidden col-start-3 justify-self-end"
          onClick={() => setMenuOpen((prev) => !prev)}
          style={{ color: textColor }}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ── Mobile menu ──────────────────────────────────────── */}
      {menuOpen && (
        <div
          className="md:hidden flex flex-col gap-4 px-6 pb-6"
          style={{
            backgroundColor: isLight ? "#F0F8FF" : "#051520",
            borderTop: `1px solid ${navBorder}`,
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.target}
              href={`#${link.target}`}
              className="transition font-medium"
              style={{ color: textColor, textDecoration: "none" }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}

          {/* Social icons mobile */}
          <div className="flex gap-4 pt-2">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                style={{ color: s.color }}
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* Language row mobile */}
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

          {/* Theme toggle mobile */}
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

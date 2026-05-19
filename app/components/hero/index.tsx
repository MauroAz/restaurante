"use client";

/*
  🦸 HERO — DataSpectacles
  =========================
  Teaching note: the Hero is the first thing visitors see.
  Its job is to:
  1. Show the DataSpectacles logo prominently
  2. Communicate what the site is about in one line
  3. Give two clear actions — "Breaking News" (scroll down)
     and "Pitch Us a Story" (scroll to contact)

  We keep the dark/light theme support from Estamos a Pensar
  using the same useTheme() hook — only the colours and
  content change.

  The animated background uses the same noise texture SVG
  trick as before — it adds subtle grain that makes flat
  colour backgrounds feel more editorial and less digital.
*/

import Image from "next/image";
import { useTheme } from "../../context/ThemeProvider";

export default function Hero() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  /*
    Teaching note: we define all theme-dependent values here
    at the top of the component, not scattered through the JSX.
    This makes it easy to see both themes at a glance and
    change them without hunting through markup.
  */
  const bg = isLight ? "#F0E6D3" : "#0E0B09";
  const vignette = isLight
    ? "radial-gradient(ellipse at center, transparent 40%, rgba(180,140,90,0.35) 100%)"
    : "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)";
  const taglineColor = isLight ? "#6B4423" : "#A89880";
  const borderColor = isLight ? "#C4A882" : "#3D3530";

  /*
    Teaching note: the noise texture is an inline SVG encoded
    as a data URL. feTurbulence generates Perlin noise;
    feColorMatrix desaturates it to grey. We overlay it at
    low opacity for a subtle grain effect — it makes the
    background feel printed rather than flat digital colour.
  */
  const noiseOpacity = isLight ? "0.2" : "0.12";
  const noiseBg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='5' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='${noiseOpacity}'/%3E%3C/svg%3E")`;

  return (
    <section
      className="relative flex items-center justify-center px-6 overflow-hidden"
      style={{
        minHeight: "90vh",
        backgroundColor: bg,
        backgroundImage: noiseBg,
        /* Navbar is fixed at ~65px tall — paddingTop prevents
           hero content from hiding behind it */
        paddingTop: "80px",
        paddingBottom: "60px",
      }}
    >
      {/* Vignette overlay — darkens edges for depth and focus */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: vignette }}
      />

      {/* ── Main content ─────────────────────────────────────── */}
      <div className="relative flex flex-col items-center text-center z-10 max-w-3xl w-full gap-6">
        {/* ── Logo ─────────────────────────────────────────────
            Teaching note: next/image handles optimisation.
            priority=true tells Next.js to preload this image
            since it's the largest above-the-fold element.
            We set a max width via className — the image scales
            down on smaller screens automatically. */}
        <div className="w-full max-w-lg">
          <Image
            src="/images/DataSpectacles.png"
            alt="DataSpectacles — Data stories worth reading"
            width={600}
            height={200}
            className="w-full h-auto"
            priority
            style={{
              /* Light mode: invert if logo is white-on-transparent.
                 Remove this filter if your logo already works on
                 light backgrounds without inversion. */
              filter: isLight ? "invert(1) brightness(0.25)" : "none",
            }}
          />
        </div>

        {/* ── Tagline ──────────────────────────────────────────
            Teaching note: one sentence, no jargon.
            Tells visitors exactly what DataSpectacles is. */}
        <p
          className="text-lg md:text-xl italic"
          style={{
            color: taglineColor,
            fontFamily: "Georgia, serif",
            lineHeight: 1.6,
            maxWidth: "480px",
          }}
        >
          New stories, told with data — in five languages.
        </p>

        {/* ── CTA buttons ──────────────────────────────────────
            Teaching note: two buttons — one primary (filled,
            accent colour), one secondary (outline). This is a
            standard conversion pattern: primary action is the
            one you most want the visitor to take.

            "Breaking News" scrolls to #stories (the grid).
            "Pitch Us a Story" scrolls to #contact. */}
        <div className="flex gap-4 flex-wrap justify-center mt-2">
          <a
            href="#stories"
            className="ds-btn-primary"
            style={{ fontSize: "0.95rem", padding: "12px 28px" }}
          >
            Breaking News
          </a>
          <a
            href="#contact"
            className="ds-btn-secondary"
            style={{
              fontSize: "0.95rem",
              padding: "12px 28px",
              borderColor: borderColor,
              color: isLight ? "#2C1810" : "#F0E6D3",
            }}
          >
            Pitch Us a Story
          </a>
        </div>

        {/* ── Scroll indicator ─────────────────────────────────
            Teaching note: a subtle animated chevron gives
            visitors a visual cue that there is content below.
            The animation is pure CSS — no JavaScript needed. */}
        <div className="mt-8" style={{ color: taglineColor, opacity: 0.5 }}>
          <style>{`
            @keyframes bounce-slow {
              0%, 100% { transform: translateY(0); }
              50%       { transform: translateY(6px); }
            }
            .bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
          `}</style>
          <div className="bounce-slow" style={{ fontSize: "1.5rem" }}>
            ↓
          </div>
        </div>
      </div>
    </section>
  );
}

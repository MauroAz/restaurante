"use client";

/*
  🦸 HERO — Ganda Gula Restaurant
  =================================
  Teaching note: this Hero is significantly different from
  DataSpectacles and Estamos a Pensar. Instead of a static
  background it has a full-screen IMAGE CAROUSEL — three
  photos that transition automatically every 5 seconds.

  New concepts introduced here:
  1. Carousel state — tracking which slide is active
  2. useEffect with setInterval — running code on a timer
  3. CSS transitions on opacity — smooth crossfade between images
  4. Scroll dots — bottom-left indicators the user can click
  5. Transparent navbar compensation — hero fills 100vh so
     the image goes edge-to-edge behind the see-through navbar

  The aquatic colour theme:
  - Light mode: white/ice blue — clean, fresh, ocean surface
  - Dark mode: deep navy/teal — ocean depth, not pitch black
*/

import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeProvider";
import Image from "next/image";

/* ============================================================
   Carousel slides data.
   Teaching note: keeping content in a data array (not hardcoded
   in JSX) makes it trivial to add/remove slides — just edit
   this array. The JSX below renders whatever is in here.

   Each slide has:
   - src:     image path in /public/images/
   - alt:     accessibility description (screen readers read this)
   - heading: large text overlaid on the image
   - sub:     smaller subtitle text
   ============================================================ */
const slides = [
  {
    src: "/images/hero-cod-1.jpg",
    alt: "Bacalhau à Ganda Gula — prato principal",
    heading: "O Melhor Bacalhau de Chaves",
    sub: "Uma tradição transmontana, reinventada.",
  },
  {
    src: "/images/hero-cod-2.jpg",
    alt: "Bacalhau grelhado com azeite e alho",
    heading: "Receitas de Família",
    sub: "Cada prato conta uma história.",
  },
  {
    src: "/images/hero-cod-3.jpg",
    alt: "Interior do restaurante Ganda Gula",
    heading: "Bem-vindo à Mesa",
    sub: "Reserve já a sua experiência.",
  },
];

const SLIDE_DURATION = 5000; // milliseconds between auto-advance

export default function Hero() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  /*
    Teaching note: activeSlide is an index (0, 1, or 2) pointing
    to whichever slide is currently visible. useState(0) means
    we start on the first slide.
  */
  const [activeSlide, setActiveSlide] = useState(0);

  /*
    Teaching note: this useEffect sets up an interval that fires
    every SLIDE_DURATION milliseconds and advances the slide.

    The modulo operator (%) wraps back to 0 after the last slide:
    0 → 1 → 2 → 0 → 1 → 2 ...

    The return function clears the interval when the component
    unmounts — always clean up intervals to avoid memory leaks.

    The empty dependency array [] means this effect runs once
    on mount and never re-runs (the interval handles its own
    repeated execution).
  */
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, []);

  /*
    Theme colours — aquatic palette.
    Light: ice blue / ocean surface feel
    Dark: deep navy / underwater feel (not pitch black)
  */
  const overlayColor = isLight
    ? "rgba(0, 30, 60, 0.35)" // light: subtle dark blue tint
    : "rgba(0, 10, 30, 0.55)"; // dark: deeper overlay for contrast

  const headingColor = "#FFFFFF"; // always white — sits on dark overlay
  const subColor = isLight ? "#B8E0FF" : "#7BBDE8"; // light blue tint
  const accentColor = "var(--gg-accent)";

  return (
    <section
      className="relative overflow-hidden"
      style={{
        /*
          Teaching note: 100dvh = 100% of the dynamic viewport height.
          This is better than 100vh on mobile because it accounts for
          the browser's address bar appearing/disappearing. The hero
          fills the entire screen on all devices.
        */
        height: "100dvh",
        minHeight: "600px",
      }}
    >
      {/* ── CAROUSEL SLIDES ────────────────────────────────────
          Teaching note: all three slides are stacked on top of
          each other using position:absolute. Only the active one
          is visible — we toggle opacity between 0 and 1.
          CSS transition handles the smooth crossfade automatically.
          This is more performant than moving elements in/out of
          the DOM because the browser can pre-load all images. */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: index === activeSlide ? 1 : 0 }}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill // fills the parent container
            className="object-cover object-center"
            priority={index === 0} // only preload the first slide
            sizes="100vw" // hint to browser: this image is full width
          />
        </div>
      ))}

      {/* ── OVERLAY ────────────────────────────────────────────
          Teaching note: this semi-transparent div sits on top of
          the images and makes the white text readable against
          any photo. Without it, light-coloured photos would make
          the text invisible. pointer-events-none means clicks
          pass through to elements underneath. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: overlayColor }}
      />

      {/* ── HERO CONTENT ───────────────────────────────────────
          Teaching note: z-10 puts this above the images and overlay.
          We use the slide data to drive the heading and subtitle
          so they update automatically with the carousel. */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-6"
        style={{ paddingTop: "80px" }} // compensate for fixed navbar
      >
        {/* Logo */}
        <div className="mb-6">
          <Image
            src="/images/logo-ganda-gula.png"
            alt="Ganda Gula"
            width={200}
            height={100}
            className="h-20 w-auto mx-auto"
            priority
          />
        </div>

        {/* Slide heading — updates with carousel */}
        <h1
          className="text-4xl md:text-6xl font-bold mb-4"
          style={{
            color: headingColor,
            fontFamily: "Georgia, serif",
            lineHeight: 1.2,
            textShadow: "0 2px 12px rgba(0,0,0,0.5)",
            /*
              Teaching note: transition on the heading creates a
              subtle fade when slide text changes. The opacity
              trick isn't needed here because the whole slide
              div fades — but textShadow gives depth against photos.
            */
          }}
        >
          {slides[activeSlide].heading}
        </h1>

        {/* Slide subtitle */}
        <p
          className="text-lg md:text-xl italic mb-8"
          style={{
            color: subColor,
            fontFamily: "Georgia, serif",
            textShadow: "0 1px 6px rgba(0,0,0,0.5)",
            maxWidth: "500px",
          }}
        >
          {slides[activeSlide].sub}
        </p>

        {/* CTA buttons */}
        <div className="flex gap-4 flex-wrap justify-center">
          <a
            href="#reservas"
            style={{
              background: accentColor,
              color: "#fff",
              padding: "12px 28px",
              borderRadius: "24px",
              fontSize: "0.95rem",
              fontWeight: 600,
              textDecoration: "none",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            📅 Reservar Mesa
          </a>
          <a
            href="#menu"
            style={{
              background: "transparent",
              color: "#fff",
              padding: "12px 28px",
              borderRadius: "24px",
              fontSize: "0.95rem",
              fontWeight: 600,
              textDecoration: "none",
              border: "2px solid rgba(255,255,255,0.6)",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = "rgba(255,255,255,1)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)")
            }
          >
            🍽️ Ver Menu
          </a>
        </div>
      </div>

      {/* ── CAROUSEL DOTS ──────────────────────────────────────
          Teaching note: positioned bottom-left, these dots let
          the user jump to any slide manually. The active dot is
          filled with the accent colour; inactive dots are white
          and semi-transparent.

          onClick calls setActiveSlide with the dot's index —
          this also resets the auto-advance timer because the
          interval keeps running from its last tick, not from
          the moment of the click. For a perfect reset on click
          you'd need to clear and restart the interval — that's
          a future enhancement.
      */}
      <div className="absolute bottom-8 left-8 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            style={{
              width: index === activeSlide ? "24px" : "10px",
              height: "10px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              /*
                Teaching note: the active dot is wider (24px vs 10px)
                and uses the accent colour. The width transition creates
                a satisfying "pill stretch" animation on the active dot.
                This is a common modern carousel dot pattern.
              */
              backgroundColor:
                index === activeSlide
                  ? "var(--gg-accent)"
                  : "rgba(255,255,255,0.6)",
            }}
          />
        ))}
      </div>

      {/* ── SCROLL INDICATOR ───────────────────────────────────
          Teaching note: same bouncing arrow as other sites —
          tells users there is content below the hero.
          Positioned bottom-center, above the dots. */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.5rem" }}
      >
        <style>{`
          @keyframes bounce-slow {
            0%, 100% { transform: translateX(-50%) translateY(0); }
            50%       { transform: translateX(-50%) translateY(6px); }
          }
          .bounce-hero {
            animation: bounce-slow 2s ease-in-out infinite;
            position: absolute;
            left: 50%;
          }
        `}</style>
        <div className="bounce-hero">↓</div>
      </div>
    </section>
  );
}

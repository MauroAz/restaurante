"use client";

/*
  🏠 DATASPECTACLES — Homepage (app/[locale]/page.tsx)
  =====================================================
  Teaching note: this is the entry point for every page visit.
  Next.js looks for page.tsx inside [locale] because our app
  supports multiple languages — the [locale] folder catches
  routes like /en, /pt, /es, /gl, /mwl automatically.

  This file just stitches section components together in order.
  Keeping it thin like this makes it easy to read the page
  structure at a glance — the real logic lives inside each
  component.

  Page structure (top → bottom):
  1. Navbar
  2. Hero          — logo + tagline + 2 CTAs
  3. StoriesGrid   — filterable story cards
  4. GlobePlaceholder — decorative map (interactive globe later)
  5. VideoSection  — YouTube embed
  6. Contact
  7. Footer        — with Mission link
*/

import Navbar from "../components/navbar";
import ScrollDots from "../components/scrolldots";
import Hero from "../components/hero";
import Contact from "../components/contact";
import Footer from "../components/footer";
import ThemeProvider from "../context/ThemeProvider";
import StoriesGrid from "../components/stories/StoriesGrid";

export default function Home() {
  return (
    <ThemeProvider>
      {/* Outer wrapper uses our CSS variable for page background.
          Teaching note: setting bg here means every section inherits
          the dark base unless it overrides with its own bg colour. */}
      <div style={{ backgroundColor: "var(--ds-bg-page)" }}>
        <Navbar />
        <ScrollDots />

        {/* Each id= here is what ScrollDots uses to highlight the
            correct dot as the user scrolls down the page */}
        <div id="home">
          <Hero />
        </div>

        <div id="stories">
          <StoriesGrid />
        </div>

        <div id="globe">
          <GlobePlaceholder />
        </div>

        <div id="video">
          <VideoSection />
        </div>

        <div id="contact">
          <Contact />
        </div>

        <Footer />
      </div>
    </ThemeProvider>
  );
}

/* ============================================================
   🌍 GLOBE PLACEHOLDER
   Teaching note: this is a visual stand-in for the interactive
   3D globe we'll build later using react-globe.gl.
   The real globe will have story dots per location and act as
   a map-based filter. For now this communicates the idea visually.
   When ready, we just swap this component — nothing else changes.
   ============================================================ */
function GlobePlaceholder() {
  return (
    <section
      className="py-20 px-6 text-center"
      style={{ backgroundColor: "var(--ds-bg-card)" }}
    >
      {/* Section label — italic subtitle above bold title.
          This two-line header pattern is used consistently
          across all DataSpectacles sections. */}
      <p
        className="text-base italic mb-1"
        style={{
          color: "var(--ds-text-muted)",
          fontFamily: "var(--ds-font-serif)",
        }}
      >
        Stories from everywhere
      </p>
      <h2
        className="text-3xl font-bold mb-4"
        style={{
          color: "var(--ds-text-primary)",
          fontFamily: "var(--ds-font-serif)",
        }}
      >
        The World of Data
      </h2>
      <p
        className="text-base mb-10 max-w-lg mx-auto"
        style={{
          color: "var(--ds-text-secondary)",
          lineHeight: "1.75",
        }}
      >
        Every story is pinned to a place. Soon you will be able to spin this
        globe and discover stories by location.
      </p>

      {/* Placeholder globe visual — radial gradient gives a sphere feel.
          Teaching note: we use inline styles here because this is a
          one-off decorative element, not a reusable pattern. */}
      <div
        className="max-w-2xl mx-auto rounded-2xl"
        style={{
          height: "360px",
          background:
            "radial-gradient(ellipse at center, #1A2E3D 0%, #0E0B09 70%)",
          border: "1px solid var(--ds-bg-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <div style={{ fontSize: "4rem" }}>🌍</div>
        <p
          style={{
            color: "var(--ds-text-muted)",
            fontSize: "0.85rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Interactive globe — coming soon
        </p>
      </div>
    </section>
  );
}

/* ============================================================
   🎬 VIDEO SECTION
   Teaching note: the YouTube embed uses the "padding-bottom hack"
   for a responsive 16:9 ratio. Here is how it works:
   - The outer div has position:relative and padding-bottom:56.25%
     (56.25% = 9 ÷ 16 × 100 — the height as a % of the width)
   - The iframe is position:absolute, filling that space exactly
   - Result: the video scales perfectly on any screen width
     with zero JavaScript needed.
   ============================================================ */
function VideoSection() {
  return (
    <section
      className="py-20 px-6 text-center"
      style={{ backgroundColor: "var(--ds-bg-page)" }}
    >
      <p
        className="text-base italic mb-1"
        style={{
          color: "var(--ds-text-muted)",
          fontFamily: "var(--ds-font-serif)",
        }}
      >
        See what data storytelling looks like
      </p>
      <h2
        className="text-3xl font-bold mb-10"
        style={{
          color: "var(--ds-text-primary)",
          fontFamily: "var(--ds-font-serif)",
        }}
      >
        Watch
      </h2>

      <div
        className="max-w-3xl mx-auto rounded-xl overflow-hidden"
        style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.6)" }}
      >
        {/* 16:9 responsive wrapper */}
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/fKv1Mixv0Hk"
            title="DataSpectacles — Data Storytelling"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}

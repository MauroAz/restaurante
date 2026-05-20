"use client";

/*
  🍽️ MENU SECTION — Ganda Gula
  ==============================
  Teaching note: two tall portrait images of the menu,
  side by side. Clicking either opens a lightbox — a
  full-screen overlay that zooms the image to center.

  New concept: LIGHTBOX pattern.
  - All slides sit in the DOM always (position:absolute)
  - Only the active one has opacity:1
  - Clicking backdrop closes it (e.target === e.currentTarget)
*/

import { useState } from "react";
import Image from "next/image";
import { useTheme } from "../../context/ThemeProvider";

const menuCards = [
  { id: 1, src: "/images/menu-1.jpg", alt: "Menu Ganda Gula — página 1" },
  { id: 2, src: "/images/menu-2.jpg", alt: "Menu Ganda Gula — página 2" },
];

export default function MenuSection() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [zoomed, setZoomed] = useState(null);

  return (
    <section
      className="py-20 px-6 scroll-mt-24"
      style={{ backgroundColor: "var(--gg-bg-page)" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <p
            className="text-base italic mb-1"
            style={{
              color: "var(--gg-text-muted)",
              fontFamily: "Georgia, serif",
            }}
          >
            O que temos para si
          </p>
          <h2
            className="text-3xl font-bold"
            style={{
              color: "var(--gg-text-primary)",
              fontFamily: "Georgia, serif",
            }}
          >
            🍽️ Menu
          </h2>
          <p className="mt-3 text-sm" style={{ color: "var(--gg-text-muted)" }}>
            Clique numa página para ampliar
          </p>
        </div>

        {/* Two menu cards */}
        <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
          {menuCards.map((card) => (
            <div
              key={card.id}
              onClick={() => setZoomed(card.id)}
              className="cursor-pointer transition-transform hover:scale-105"
              style={{
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid var(--gg-bg-border)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
              }}
            >
              <div style={{ position: "relative", aspectRatio: "2/3" }}>
                <Image
                  src={card.src}
                  alt={card.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 400px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox overlay
          Teaching note: only renders when zoomed !== null.
          Clicking the dark backdrop (not the image) closes it —
          e.target === e.currentTarget checks the click was on
          the backdrop div itself, not a child element. */}
      {zoomed !== null && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setZoomed(null);
          }}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.85)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          <button
            onClick={() => setZoomed(null)}
            style={{
              position: "absolute",
              top: "1.5rem",
              right: "1.5rem",
              background: "rgba(255,255,255,0.15)",
              border: "none",
              color: "#fff",
              fontSize: "1.5rem",
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
          <div
            style={{
              position: "relative",
              width: "min(90vw, 500px)",
              aspectRatio: "2/3",
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            <Image
              src={menuCards.find((c) => c.id === zoomed).src}
              alt="Menu ampliado"
              fill
              className="object-contain"
              sizes="500px"
            />
          </div>
        </div>
      )}
    </section>
  );
}

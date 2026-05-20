"use client";

/*
  ⭐ CLIENTES SECTION — Ganda Gula
  ===================================
  Teaching note: auto-rotating review carousel.
  Same setInterval pattern as the Hero image carousel —
  we're just cycling through text reviews instead of images.

  Key concepts:
  - active: index of currently shown review
  - setInterval advances it every 4 seconds
  - clicking a dot jumps to that review manually
  - the "pill stretch" dot animation is pure CSS transition
    on the width property — no JavaScript needed for the animation
*/

import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeProvider";

const reviews = [
  {
    text: "O melhor bacalhau que já comi na vida. O Senhor Domingos é um génio da cozinha transmontana. Voltamos sempre!",
    author: "Maria & João S.",
    rating: 5,
    location: "Porto",
  },
  {
    text: "Ambiente acolhedor, serviço impecável e o bacalhau à brás estava simplesmente divinal. Uma experiência inesquecível.",
    author: "Carlos M.",
    rating: 5,
    location: "Lisboa",
  },
  {
    text: "Passámos por Chaves e entrámos por acaso. Foi a melhor decisão da viagem. Já recomendámos a toda a família.",
    author: "Ana & Pedro F.",
    rating: 5,
    location: "Espanha",
  },
  {
    text: "O ambiente é muito acolhedor e a comida é autêntica. O prato de bacalhau com broa é para repetir.",
    author: "Sophie L.",
    rating: 5,
    location: "França",
  },
  {
    text: "Reservei para o aniversário da minha mãe e foi perfeito. Atenção ao detalhe e sabores que ficam na memória.",
    author: "Ricardo A.",
    rating: 5,
    location: "Chaves",
  },
];

export default function ClientesSection() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [active, setActive] = useState(0);

  /*
    Teaching note: useEffect with setInterval — same pattern
    as the Hero carousel. The cleanup function (return) clears
    the interval when the component unmounts to prevent memory
    leaks. Always clean up timers in React effects.
  */
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const review = reviews[active];

  return (
    <section
      className="py-20 px-6 scroll-mt-24 text-center"
      style={{ backgroundColor: "var(--gg-bg-page)" }}
    >
      <p
        className="text-base italic mb-1"
        style={{ color: "var(--gg-text-muted)", fontFamily: "Georgia, serif" }}
      >
        O que dizem os nossos clientes
      </p>
      <h2
        className="text-3xl font-bold mb-12"
        style={{
          color: "var(--gg-text-primary)",
          fontFamily: "Georgia, serif",
        }}
      >
        ⭐ Clientes
      </h2>

      <div className="max-w-2xl mx-auto">
        {/* Review card
            Teaching note: minHeight prevents the card from
            jumping in size as reviews change length.
            transition on the card gives a subtle feel when
            content updates — even though we're not animating
            opacity here, the card itself feels responsive. */}
        <div
          style={{
            backgroundColor: "var(--gg-bg-card)",
            borderRadius: "16px",
            padding: "2.5rem",
            border: "1px solid var(--gg-bg-border)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
            minHeight: "240px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Star rating
              Teaching note: "★".repeat(n) creates a string of
              n star characters — clean and no library needed. */}
          <div
            style={{
              color: "#FFB800",
              fontSize: "1.3rem",
              marginBottom: "1rem",
            }}
          >
            {"★".repeat(review.rating)}
          </div>

          {/* Review text */}
          <p
            style={{
              color: "var(--gg-text-secondary)",
              fontFamily: "Georgia, serif",
              fontSize: "1.05rem",
              lineHeight: 1.8,
              fontStyle: "italic",
              marginBottom: "1.5rem",
              flex: 1,
            }}
          >
            "{review.text}"
          </p>

          {/* Author */}
          <div>
            <p
              style={{
                color: "var(--gg-text-primary)",
                fontWeight: 600,
                fontSize: "0.95rem",
              }}
            >
              {review.author}
            </p>
            <p style={{ color: "var(--gg-text-muted)", fontSize: "0.8rem" }}>
              {review.location}
            </p>
          </div>
        </div>

        {/* Dot indicators
            Teaching note: active dot stretches wider (24px vs 8px)
            using CSS transition on width — this "pill stretch"
            effect is a modern carousel pattern that shows which
            dot is active more clearly than just a colour change. */}
        <div className="flex justify-center gap-2 mt-6">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Review ${i + 1}`}
              style={{
                width: i === active ? "24px" : "8px",
                height: "8px",
                borderRadius: "4px",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                backgroundColor:
                  i === active ? "var(--gg-accent)" : "var(--gg-bg-border)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

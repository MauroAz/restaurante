"use client";

/*
  👨‍🍳 CHEF SECTION — Ganda Gula
  ================================
  Teaching note: classic two-column editorial layout.
  Left: text (name, bio, quote, award).
  Right: portrait photo.

  On mobile, flex-col stacks them vertically.
  On desktop, flex-row places them side by side.
  This is the most common "meet the team" pattern.
*/

import Image from "next/image";
import { useTheme } from "../../context/ThemeProvider";

export default function ChefSection() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <section
      className="py-20 px-6 scroll-mt-24"
      style={{ backgroundColor: "var(--gg-bg-card)" }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* LEFT — text */}
          <div className="flex-1">
            <p
              className="text-base italic mb-1"
              style={{
                color: "var(--gg-text-muted)",
                fontFamily: "Georgia, serif",
              }}
            >
              A pessoa por trás dos pratos
            </p>
            <h2
              className="text-3xl font-bold mb-6"
              style={{
                color: "var(--gg-text-primary)",
                fontFamily: "Georgia, serif",
              }}
            >
              👨‍🍳 Senhor Domingos
            </h2>

            <div className="space-y-4">
              <p style={{ color: "var(--gg-text-secondary)", lineHeight: 1.8 }}>
                Nascido em Chaves, o Senhor Domingos cresceu entre o aroma do
                bacalhau e as receitas transmontanas da sua avó. Com mais de 30
                anos de cozinha, transformou tradição em arte.
              </p>
              <p style={{ color: "var(--gg-text-secondary)", lineHeight: 1.8 }}>
                A sua filosofia é simples: ingredientes locais, técnica honesta
                e amor pelo que faz. Cada prato no Ganda Gula é uma carta de
                amor à cozinha portuguesa.
              </p>

              {/* Pull quote — visually distinct from body text */}
              <blockquote
                style={{
                  borderLeft: "3px solid var(--gg-accent)",
                  paddingLeft: "1rem",
                  fontStyle: "italic",
                  color: "var(--gg-text-primary)",
                  fontFamily: "Georgia, serif",
                  fontSize: "1.05rem",
                  lineHeight: 1.7,
                }}
              >
                "O bacalhau tem mil formas de chegar à mesa. A minha missão é
                encontrar a mais memorável."
              </blockquote>
            </div>

            {/* Award line */}
            <div
              className="mt-8 pt-6"
              style={{ borderTop: "1px solid var(--gg-bg-border)" }}
            >
              <p
                className="text-sm font-semibold"
                style={{ color: "var(--gg-accent)", letterSpacing: "0.05em" }}
              >
                🏆 Chef do Ano, Trás-os-Montes 2022
              </p>
            </div>
          </div>

          {/* RIGHT — chef photo
              Teaching note: we wrap the Image in a div with
              a fixed aspect ratio so the photo always looks
              like a portrait regardless of the image dimensions.
              border with accent colour frames the photo nicely. */}
          <div
            className="flex-shrink-0"
            style={{ width: "300px", maxWidth: "100%" }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "3/4",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 8px 40px rgba(0,0,0,0.2)",
                border: "3px solid var(--gg-accent)",
              }}
            >
              <Image
                src="/images/chef.jpg"
                alt="Senhor Domingos — Chef do Ganda Gula"
                fill
                className="object-cover object-top"
                sizes="300px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

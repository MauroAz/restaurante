"use client";

/*
  📍 MAPA SECTION — Ganda Gula (compact layout)
  ===============================================
  Teaching note: this section uses a two-tier grid layout.

  TIER 1 (top): two columns side by side
  - Left:  two exterior photos + parking note
  - Right: Google Maps embed (tall)

  TIER 2 (bottom): three equal columns
  - Horário | Morada | Contactos

  Teaching note on CSS Grid:
  grid-template-columns: repeat(3, 1fr) creates three equal
  columns. 1fr means "one fraction of available space" —
  each column gets exactly one third of the width.
*/

import Image from "next/image";
import { useTheme } from "../../context/ThemeProvider";
import { FaWhatsapp, FaPhone, FaFacebook, FaInstagram } from "react-icons/fa";

const mapsUrl =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022!2d-7.4667!3d41.7333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDQ0JzAwLjAiTiA3wrAyOCcwMC4wIlc!5e0!3m2!1spt!2spt!4v1700000000000!5m2!1spt!2spt";
const directionsUrl = "https://maps.google.com/?q=Chaves,Portugal";

const hours = [
  { day: "Terça a Sábado", time: "10h–23h" },
  { day: "Domingo", time: "10h–16h" },
  { day: "Segunda", time: "Encerrado" },
];

export default function MapaSection() {
  useTheme(); // keep hook call for future theme support

  /*
    Teaching note: cardStyle is defined once as a JS object
    and reused via the spread operator {...cardStyle} on each
    card div. This keeps styles DRY (Don't Repeat Yourself)
    and makes global card changes a one-line edit.
  */
  const cardStyle = {
    backgroundColor: "var(--gg-bg-elevated)",
    borderRadius: "10px",
    padding: "1.25rem",
    border: "1px solid var(--gg-bg-border)",
    height: "100%",
  };

  return (
    <section
      className="py-20 px-6 scroll-mt-24"
      style={{ backgroundColor: "var(--gg-bg-card)" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10">
          <p
            className="text-base italic mb-1"
            style={{
              color: "var(--gg-text-muted)",
              fontFamily: "Georgia, serif",
            }}
          >
            Venha visitar-nos
          </p>
          <h2
            className="text-3xl font-bold"
            style={{
              color: "var(--gg-text-primary)",
              fontFamily: "Georgia, serif",
            }}
          >
            📍 Como Chegar
          </h2>
        </div>

        {/* ── TIER 1: photos left, map right ─────────────────── */}
        <div
          className="flex flex-col md:flex-row gap-6 mb-6"
          style={{ alignItems: "stretch" }}
        >
          {/* LEFT — two photos stacked + parking note */}
          <div className="flex-1 flex flex-col gap-3">
            {/* Two photos side by side */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
              }}
            >
              <div
                style={{
                  position: "relative",
                  aspectRatio: "4/3",
                  borderRadius: "10px",
                  overflow: "hidden",
                  border: "1px solid var(--gg-bg-border)",
                }}
              >
                <Image
                  src="/images/exterior-1.jpg"
                  alt="Exterior do Restaurante Ganda Gula"
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
              <div
                style={{
                  position: "relative",
                  aspectRatio: "4/3",
                  borderRadius: "10px",
                  overflow: "hidden",
                  border: "1px solid var(--gg-bg-border)",
                }}
              >
                <Image
                  src="/images/exterior-2.jpg"
                  alt="Estacionamento Ganda Gula"
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
            </div>

            {/* Parking note */}
            <div
              style={{
                ...cardStyle,
                height: "auto",
                display: "flex",
                alignItems: "flex-start",
                gap: "10px",
              }}
            >
              <span style={{ fontSize: "1.3rem" }}>🅿️</span>
              <div>
                <p
                  style={{
                    color: "var(--gg-text-primary)",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    marginBottom: "2px",
                  }}
                >
                  Estacionamento gratuito
                </p>
                <p
                  style={{
                    color: "var(--gg-text-muted)",
                    fontSize: "0.85rem",
                    lineHeight: 1.6,
                  }}
                >
                  Amplo parque junto ao restaurante, sem limite de tempo. Ideal
                  para grupos e famílias.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT — Google Maps */}
          <div className="flex-1" style={{ minHeight: "320px" }}>
            <div
              style={{
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid var(--gg-bg-border)",
                height: "100%",
                minHeight: "320px",
              }}
            >
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "320px", display: "block" }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={mapsUrl}
              />
            </div>
          </div>
        </div>

        {/* ── TIER 2: three info columns ──────────────────────── */}
        {/*
          Teaching note: on mobile (flex-col) these stack vertically.
          On desktop (grid) they sit side by side in equal thirds.
          We use CSS grid here instead of flex because we want
          strict equal column widths — grid handles this better.
        */}
        <div
          className="flex flex-col md:grid gap-4"
          style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
        >
          {/* COL 1 — Horário */}
          <div style={cardStyle}>
            <p
              style={{
                color: "var(--gg-text-primary)",
                fontWeight: 700,
                fontSize: "1rem",
                marginBottom: "0.75rem",
              }}
            >
              🕐 Horário
            </p>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              {hours.map((row) => (
                <div key={row.day}>
                  <p
                    style={{
                      color: "var(--gg-text-secondary)",
                      fontSize: "0.9rem",
                    }}
                  >
                    {row.day}
                  </p>
                  <p
                    style={{
                      color: "var(--gg-text-primary)",
                      fontSize: "0.95rem",
                      fontWeight: 700,
                    }}
                  >
                    {row.time}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* COL 2 — Morada + Direções */}
          <div style={cardStyle}>
            <p
              style={{
                color: "var(--gg-text-primary)",
                fontWeight: 700,
                fontSize: "1rem",
                marginBottom: "0.75rem",
              }}
            >
              📍 Morada
            </p>
            <p
              style={{
                color: "var(--gg-text-secondary)",
                fontSize: "0.95rem",
                lineHeight: 1.7,
                marginBottom: "1rem",
              }}
            >
              Rua Principal
              <br />
              Chaves, Trás-os-Montes
              <br />
              Portugal
            </p>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                backgroundColor: "var(--gg-accent)",
                color: "#fff",
                padding: "8px 20px",
                borderRadius: "20px",
                fontSize: "0.9rem",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              🗺️ Obter Direções
            </a>
          </div>

          {/* COL 3 — Contactos */}
          <div style={cardStyle}>
            <p
              style={{
                color: "var(--gg-text-primary)",
                fontWeight: 700,
                fontSize: "1rem",
                marginBottom: "0.75rem",
              }}
            >
              📞 Contactos
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginBottom: "1rem",
              }}
            >
              <a
                href="tel:+351000000000"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "var(--gg-text-primary)",
                  textDecoration: "none",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                }}
              >
                <FaPhone
                  size={16}
                  style={{ color: "var(--gg-accent)", flexShrink: 0 }}
                />
                +351 000 000 000
              </a>
              <a
                href="https://wa.me/351000000000"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#25D366",
                  textDecoration: "none",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                }}
              >
                <FaWhatsapp size={16} style={{ flexShrink: 0 }} />
                WhatsApp
              </a>
              <a
                href="mailto:geral@gandagula.pt"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "var(--gg-text-primary)",
                  textDecoration: "none",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                }}
              >
                <span style={{ flexShrink: 0 }}>✉️</span>
                geral@gandagula.pt
              </a>
            </div>

            {/* Social icons */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                paddingTop: "0.75rem",
                borderTop: "1px solid var(--gg-bg-border)",
              }}
            >
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                style={{ color: "#1877F2" }}
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                style={{ color: "#E1306C" }}
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://wa.me/351000000000"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                style={{ color: "#25D366" }}
              >
                <FaWhatsapp size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

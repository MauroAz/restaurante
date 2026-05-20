"use client";

/*
  🏠 GANDA GULA — Homepage (app/[locale]/page.tsx)
  ==================================================
  Teaching note: this file is longer than DataSpectacles
  because a restaurant page has more distinct sections.
  Each section is its own function component defined below
  the main Home component — this keeps the page structure
  readable at a glance while keeping all related code in
  one file for now.

  As the site grows, each section can be moved to its own
  file in /components/ — the same way StoriesGrid lives in
  its own file in DataSpectacles.

  Page structure (top → bottom):
  1. Navbar
  2. Hero — carousel (done ✅)
  3. Menu — two menu card images, click to zoom
  4. El Chef — two column: text left, image right
  5. Clientes — auto-rotating review carousel
  6. Reservas — WhatsApp + phone + simple form
  7. Mapa — two exterior photos left, Google Maps right
  8. Footer
*/

import { useState, useEffect, useRef } from "react";
import Navbar from "../components/navbar";
import ScrollDots from "../components/scrolldots";
import Hero from "../components/hero";
import Contact from "../components/contact";
import Footer from "../components/footer";
import ThemeProvider from "../context/ThemeProvider";
import { useTheme } from "../context/ThemeProvider";
import Image from "next/image";
import { FaWhatsapp, FaPhone } from "react-icons/fa";

export default function Home() {
  return (
    <ThemeProvider>
      <div style={{ backgroundColor: "var(--gg-bg-page)" }}>
        <Navbar />
        <ScrollDots />

        <div id="home"><Hero /></div>
        <div id="menu"><MenuSection /></div>
        <div id="chef"><ChefSection /></div>
        <div id="clientes"><ClientesSection /></div>
        <div id="reservas"><ReservasSection /></div>
        <div id="mapa"><MapaSection /></div>
        <div id="contact"><Contact /></div>

        <Footer />
      </div>
    </ThemeProvider>
  );
}

/* ============================================================
   🍽️ MENU SECTION
   Teaching note: two tall menu card images side by side.
   Clicking either one triggers a "lightbox" — a full-screen
   overlay that zooms the image to center.

   State used:
   - zoomed: which image is zoomed (null = none, 1 or 2)

   The overlay uses position:fixed to cover the whole screen.
   Clicking the overlay or the X button closes it.
   ============================================================ */
function MenuSection() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [zoomed, setZoomed] = useState<number | null>(null);

  const menuCards = [
    { id: 1, src: "/images/menu-1.jpg", alt: "Menu Ganda Gula — página 1" },
    { id: 2, src: "/images/menu-2.jpg", alt: "Menu Ganda Gula — página 2" },
  ];

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
            style={{ color: "var(--gg-text-muted)", fontFamily: "Georgia, serif" }}
          >
            O que temos para si
          </p>
          <h2
            className="text-3xl font-bold"
            style={{ color: "var(--gg-text-primary)", fontFamily: "Georgia, serif" }}
          >
            🍽️ Menu
          </h2>
          <p
            className="mt-3 text-sm"
            style={{ color: "var(--gg-text-muted)" }}
          >
            Clique numa página para ampliar
          </p>
        </div>

        {/* Two menu cards side by side */}
        <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
          {menuCards.map((card) => (
            <div
              key={card.id}
              onClick={() => setZoomed(card.id)}
              className="cursor-pointer transition-transform hover:scale-105"
              style={{
                borderRadius: "12px",
                overflow: "hidden",
                border: `1px solid var(--gg-bg-border)`,
                boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
              }}
            >
              {/*
                Teaching note: aspect-ratio keeps the card tall
                (portrait orientation) regardless of screen width.
                object-cover fills the space without distortion.
              */}
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

      {/* ── LIGHTBOX OVERLAY ─────────────────────────────────
          Teaching note: position:fixed covers the full viewport.
          z-index:100 puts it above everything including the navbar.
          We render it only when zoomed !== null using &&.
          Clicking the backdrop (not the image) closes it —
          we check e.target === e.currentTarget to distinguish
          clicks on the backdrop vs clicks on the image inside. */}
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
          {/* Close button */}
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
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✕
          </button>

          {/* Zoomed image */}
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
              src={menuCards.find((c) => c.id === zoomed)!.src}
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

/* ============================================================
   👨‍🍳 EL CHEF SECTION
   Teaching note: classic two-column editorial layout.
   Left: text (name, bio, philosophy).
   Right: portrait photo of the chef.
   On mobile, columns stack vertically (flex-col → md:flex-row).
   ============================================================ */
function ChefSection() {
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
              style={{ color: "var(--gg-text-muted)", fontFamily: "Georgia, serif" }}
            >
              A pessoa por trás dos pratos
            </p>
            <h2
              className="text-3xl font-bold mb-6"
              style={{ color: "var(--gg-text-primary)", fontFamily: "Georgia, serif" }}
            >
              👨‍🍳 Senhor Domingos
            </h2>

            {/*
              Teaching note: each paragraph is a separate <p> tag.
              The space-y-4 class adds vertical spacing between them.
              This is placeholder text — replace with the real bio.
            */}
            <div className="space-y-4">
              <p style={{ color: "var(--gg-text-secondary)", lineHeight: 1.8 }}>
                Nascido em Chaves, o Senhor Domingos cresceu entre o aroma do
                bacalhau e as receitas transmontanas da sua avó. Com mais de
                30 anos de cozinha, transformou tradição em arte.
              </p>
              <p style={{ color: "var(--gg-text-secondary)", lineHeight: 1.8 }}>
                A sua filosofia é simples: ingredientes locais, técnica
                honesta e amor pelo que faz. Cada prato no Ganda Gula
                é uma carta de amor à cozinha portuguesa.
              </p>
              <p style={{ color: "var(--gg-text-secondary)", lineHeight: 1.8 }}>
                "O bacalhau tem mil formas de chegar à mesa. A minha missão
                é encontrar a mais memorável."
              </p>
            </div>

            {/* Accent line */}
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

          {/* RIGHT — chef photo */}
          <div
            className="flex-shrink-0"
            style={{ width: "320px", maxWidth: "100%" }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "3/4",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 8px 40px rgba(0,0,0,0.2)",
                border: `3px solid var(--gg-accent)`,
              }}
            >
              <Image
                src="/images/chef.jpg"
                alt="Senhor Domingos — Chef do Ganda Gula"
                fill
                className="object-cover object-top"
                sizes="320px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   ⭐ CLIENTES SECTION — review carousel
   Teaching note: this is a manual carousel — no external
   library needed. We use a timer (setInterval) to auto-advance,
   exactly like the Hero image carousel. The difference here is
   we're cycling through text reviews instead of images.

   Each review has: text, author name, rating (1-5 stars).
   Stars are rendered by repeating "★" rating times.
   ============================================================ */
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

function ClientesSection() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [active, setActive] = useState(0);

  /*
    Teaching note: same auto-advance pattern as the hero carousel.
    5 reviews × 4 seconds = full cycle in 20 seconds.
    The modulo (%) wraps back to 0 after the last review.
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
        style={{ color: "var(--gg-text-primary)", fontFamily: "Georgia, serif" }}
      >
        ⭐ Clientes
      </h2>

      {/* Review card */}
      <div className="max-w-2xl mx-auto">
        <div
          style={{
            backgroundColor: "var(--gg-bg-card)",
            borderRadius: "16px",
            padding: "2.5rem",
            border: "1px solid var(--gg-bg-border)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
            minHeight: "220px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            transition: "all 0.4s ease",
          }}
        >
          {/* Stars */}
          <div style={{ color: "#FFB800", fontSize: "1.3rem", marginBottom: "1rem" }}>
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

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Review ${i + 1}`}
              style={{
                width:           i === active ? "24px" : "8px",
                height:          "8px",
                borderRadius:    "4px",
                border:          "none",
                cursor:          "pointer",
                transition:      "all 0.3s ease",
                backgroundColor: i === active
                  ? "var(--gg-accent)"
                  : "var(--gg-bg-border)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   📅 RESERVAS SECTION
   Teaching note: three ways to reserve — WhatsApp (fastest),
   phone call, and a simple form. We give all three options
   because different customers prefer different channels.
   The form uses controlled inputs — each input has a value
   from state and an onChange that updates that state.
   ============================================================ */
function ReservasSection() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  /*
    Teaching note: one state object holds all form fields.
    This is cleaner than having useState for each field
    when fields are related (they're all part of one form).
  */
  const [form, setForm] = useState({
    nome: "",
    pessoas: "2",
    data: "",
    hora: "",
    notas: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "8px",
    border: `1px solid var(--gg-bg-border)`,
    backgroundColor: "var(--gg-bg-elevated)",
    color: "var(--gg-text-primary)",
    fontSize: "0.9rem",
    outline: "none",
  };

  return (
    <section
      className="py-20 px-6 scroll-mt-24"
      style={{ backgroundColor: "var(--gg-bg-card)" }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p
            className="text-base italic mb-1"
            style={{ color: "var(--gg-text-muted)", fontFamily: "Georgia, serif" }}
          >
            Garanta a sua mesa
          </p>
          <h2
            className="text-3xl font-bold"
            style={{ color: "var(--gg-text-primary)", fontFamily: "Georgia, serif" }}
          >
            📅 Reservas
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-10">

          {/* LEFT — quick contact options */}
          <div className="flex-1 flex flex-col gap-4 justify-center">
            <p
              style={{
                color: "var(--gg-text-secondary)",
                lineHeight: 1.8,
                marginBottom: "1rem",
              }}
            >
              Prefere contacto directo? Estamos disponíveis via WhatsApp
              ou telefone todos os dias das 12h às 22h.
            </p>

            {/* WhatsApp button */}
            
              href="https://wa.me/351000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="gg-btn-primary flex items-center gap-3 justify-center"
              style={{ backgroundColor: "#25D366" }}
            <a
              <FaWhatsapp size={20} />
              Reservar via WhatsApp
            </a>

            {/* Phone button */}
            <a
              href="tel:+351000000000"
              className="gg-btn-secondary flex items-center gap-3 justify-center"
            >
              <FaPhone size={16} />
              +351 000 000 000
            </a>

            {/* Hours note */}
            <p
              style={{
                color: "var(--gg-text-muted)",
                fontSize: "0.8rem",
                textAlign: "center",
                marginTop: "0.5rem",
              }}
            >
              🕐 Segunda a Domingo — 12h00 às 15h00 e 19h00 às 22h30
            </p>
          </div>

          {/* Divider */}
          <div
            style={{
              width: "1px",
              backgroundColor: "var(--gg-bg-border)",
              alignSelf: "stretch",
            }}
            className="hidden md:block"
          />

          {/* RIGHT — reservation form */}
          <div className="flex-1">
            <p
              style={{
                color: "var(--gg-text-muted)",
                fontSize: "0.85rem",
                marginBottom: "1.5rem",
              }}
            >
              Ou preencha o formulário e entraremos em contacto para confirmar:
            </p>

            <div className="flex flex-col gap-4">
              <input
                name="nome"
                placeholder="O seu nome"
                value={form.nome}
                onChange={handleChange}
                style={inputStyle}
              />

              <div className="flex gap-3">
                <select
                  name="pessoas"
                  value={form.pessoas}
                  onChange={handleChange}
                  style={{ ...inputStyle, flex: 1 }}
                >
                  {[1,2,3,4,5,6,7,8].map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? "pessoa" : "pessoas"}</option>
                  ))}
                </select>

                <input
                  name="data"
                  type="date"
                  value={form.data}
                  onChange={handleChange}
                  style={{ ...inputStyle, flex: 2 }}
                />

                <input
                  name="hora"
                  type="time"
                  value={form.hora}
                  onChange={handleChange}
                  style={{ ...inputStyle, flex: 1 }}
                />
              </div>

              <textarea
                name="notas"
                placeholder="Notas especiais (alergias, ocasião especial...)"
                value={form.notas}
                onChange={(e) => setForm((prev) => ({ ...prev, notas: e.target.value }))}
                rows={3}
                style={{ ...inputStyle, resize: "vertical" }}
              />

              <button
                className="gg-btn-primary"
                onClick={() => alert("Pedido enviado! Entraremos em contacto em breve.")}
              >
                Enviar Pedido de Reserva
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   📍 MAPA SECTION
   Teaching note: two-column layout.
   LEFT: two exterior photos stacked + parking note.
   RIGHT: Google Maps embed with a "Get Directions" link.

   Google Maps embed is the most proven way to show location —
   it loads fast, works on all devices, and lets users click
   "View larger map" to get full directions in Google Maps.
   The directions link uses the maps.google.com URL with
   the destination address pre-filled.
   ============================================================ */
function MapaSection() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const mapsUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022!2d-7.4667!3d41.7333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDQ0JzAwLjAiTiA3wrAyOCcwMC4wIlc!5e0!3m2!1spt!2spt!4v1700000000000!5m2!1spt!2spt";
  const directionsUrl = "https://maps.google.com/?q=Chaves,Portugal";

  return (
    <section
      className="py-20 px-6 scroll-mt-24"
      style={{ backgroundColor: "var(--gg-bg-page)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p
            className="text-base italic mb-1"
            style={{ color: "var(--gg-text-muted)", fontFamily: "Georgia, serif" }}
          >
            Venha visitar-nos
          </p>
          <h2
            className="text-3xl font-bold"
            style={{ color: "var(--gg-text-primary)", fontFamily: "Georgia, serif" }}
          >
            📍 Como Chegar
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-stretch">

          {/* LEFT — exterior photos + parking info */}
          <div className="flex-1 flex flex-col gap-4">

            {/* Two exterior photos stacked */}
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "16/9",
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid var(--gg-bg-border)",
              }}
            >
              <Image
                src="/images/exterior-1.jpg"
                alt="Exterior do Restaurante Ganda Gula"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "16/9",
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid var(--gg-bg-border)",
              }}
            >
              <Image
                src="/images/exterior-2.jpg"
                alt="Parque de estacionamento do Ganda Gula"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Parking note */}
            <div
              style={{
                backgroundColor: "var(--gg-bg-card)",
                borderRadius: "10px",
                padding: "1rem 1.25rem",
                border: "1px solid var(--gg-bg-border)",
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
                    fontSize: "0.9rem",
                    marginBottom: "2px",
                  }}
                >
                  Estacionamento gratuito
                </p>
                <p style={{ color: "var(--gg-text-muted)", fontSize: "0.8rem" }}>
                  Amplo parque de estacionamento junto ao restaurante,
                  sem limitação de tempo. Ideal para grupos e famílias.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT — Google Maps + address + directions */}
          <div className="flex-1 flex flex-col gap-4">

            {/* Google Maps embed
                Teaching note: the iframe src is a Google Maps embed URL.
                To get the exact URL for your address:
                1. Go to maps.google.com
                2. Search the restaurant address
                3. Click Share → Embed a map
                4. Copy the src URL from the iframe code
                Replace the src below with that URL. */}
            <div
              style={{
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid var(--gg-bg-border)",
                flex: 1,
                minHeight: "300px",
              }}
            >
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "300px" }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={mapsUrl}
              />
            </div>

            {/* Address card */}
            <div
              style={{
                backgroundColor: "var(--gg-bg-card)",
                borderRadius: "10px",
                padding: "1.25rem",
                border: "1px solid var(--gg-bg-border)",
              }}
            >
              <p
                style={{
                  color: "var(--gg-text-primary)",
                  fontWeight: 600,
                  marginBottom: "4px",
                }}
              >
                📍 Restaurante Ganda Gula
              </p>
              <p style={{ color: "var(--gg-text-muted)", fontSize: "0.9rem", marginBottom: "12px" }}>
                Rua Principal, Chaves<br />
                Trás-os-Montes, Portugal
              </p>

              {/* Directions link — opens Google Maps with directions */}
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="gg-btn-primary"
                style={{ fontSize: "0.85rem", padding: "8px 20px" }}
              >
                🗺️ Obter Direções
              </a>
            </div>

            {/* Contact quick info */}
            <div
              style={{
                backgroundColor: "var(--gg-bg-card)",
                borderRadius: "10px",
                padding: "1rem 1.25rem",
                border: "1px solid var(--gg-bg-border)",
                display: "flex",
                gap: "1.5rem",
                flexWrap: "wrap",
              }}
            >
              <div>
                <p style={{ color: "var(--gg-text-muted)", fontSize: "0.75rem", marginBottom: "2px" }}>
                  TELEFONE
                </p>
                <a
                  href="tel:+351000000000"
                  style={{ color: "var(--gg-accent)", fontWeight: 600, fontSize: "0.9rem" }}
                >
                  +351 000 000 000
                </a>
              </div>
              <div>
                <p style={{ color: "var(--gg-text-muted)", fontSize: "0.75rem", marginBottom: "2px" }}>
                  WHATSAPP
                </p>
                <a
                  href="https://wa.me/351000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#25D366", fontWeight: 600, fontSize: "0.9rem" }}
                >
                  Enviar mensagem
                </a>
              </div>
              <div>
                <p style={{ color: "var(--gg-text-muted)", fontSize: "0.75rem", marginBottom: "2px" }}>
                  HORÁRIO
                </p>
                <p style={{ color: "var(--gg-text-primary)", fontWeight: 600, fontSize: "0.9rem" }}>
                  12h–15h | 19h–22h30
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
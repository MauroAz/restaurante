"use client";

import { useState } from "react";
import { useTheme } from "../../../context/ThemeProvider";
import { formacaoDetails } from "../../../data/projects";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  Mail,
  Clock,
  Users,
  Globe,
  Package,
  Sun,
  Moon,
} from "lucide-react";
import {
  FaFacebook,
  FaYoutube,
  FaInstagram,
  FaVimeo,
  FaLinkedin,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiRumble } from "react-icons/si";

// Language definitions — same as navbar
// Teaching note 🎓: defined outside component so array isn't recreated on every render
const languages = [
  { code: "pt", label: "🇵🇹" },
  { code: "en", label: "🇬🇧" },
  { code: "es", label: "🇪🇸" },
  { code: "gl", label: null },
  { code: "mwl", label: null },
];

// Teaching note 🎓: FlagIcon is a small reusable component defined in this file
// For languages with no emoji flag, we use a custom image from /public
function FlagIcon({ code, size = 22 }) {
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
          alt={code}
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

export default function FormacaoDetail() {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";
  const params = useParams();
  const router = useRouter();

  // useParams reads [slug] and [locale] from the URL
  // e.g. /pt/formacoes/blackout-poetry-digital → slug = "blackout-poetry-digital", locale = "pt"
  const slug = params?.slug;
  const locale = params?.locale || "pt";
  const formacao = formacaoDetails[slug];

  // Track which image is shown in the carousel
  const [currentImage, setCurrentImage] = useState(0);

  // Track language dropdown open/closed
  const [langOpen, setLangOpen] = useState(false);

  // Switch language while staying on the same detail page
  // Teaching note 🎓: we replace the locale segment in the URL path
  // /pt/formacoes/blackout → /en/formacoes/blackout
  const switchLanguage = (code) => {
    router.push(`/${code}/formacoes/${slug}`);
    setLangOpen(false);
  };

  // If no matching workshop found show a friendly error with back button
  if (!formacao) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center"
        style={{ backgroundColor: isLight ? "#FDF6E3" : "#1a1208" }}
      >
        <p
          className="text-xl italic"
          style={{
            color: isLight ? "#3B1F0A" : "#D4B896",
            fontFamily: "Georgia, serif",
          }}
        >
          Formação não encontrada.
        </p>
        <button
          onClick={() => router.back()}
          className="mt-6 px-6 py-3 rounded-full transition hover:opacity-80"
          style={{
            backgroundColor: "#8B3A2A",
            color: "#FDF6E3",
            fontFamily: "Georgia, serif",
          }}
        >
          ← Voltar
        </button>
      </div>
    );
  }

  // Build mailto link with pre-filled subject
  // encodeURIComponent makes special chars URL-safe (spaces → %20 etc)
  const mailtoLink = `mailto:geral@estamosapensar.pt?subject=Pedido%20de%20informação%20-%20${encodeURIComponent(formacao.title)}`;

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: isLight ? "#FDF6E3" : "#1a1208" }}
    >
      {/* ── STICKY TOP BAR ── */}
      {/* Teaching note 🎓: sticky top-0 keeps this bar visible while scrolling
          z-40 ensures it sits above all page content */}
      <div
        className="sticky top-0 z-40 px-6 py-4 flex items-center justify-between"
        style={{
          backgroundColor: isLight ? "#8B6340" : "#1a1208",
          borderBottom: `1px solid ${isLight ? "#6B4423" : "#3a2a10"}`,
        }}
      >
        {/* LEFT — prominent Voltar button */}
        {/* Styled as a filled pill so it's immediately obvious */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition hover:opacity-80"
          style={{
            backgroundColor: "#8B3A2A",
            color: "#FDF6E3",
            fontFamily: "Georgia, serif",
            fontSize: "0.95rem",
          }}
        >
          <ArrowLeft size={16} />
          Voltar
        </button>

        {/* CENTER — breadcrumb showing current location */}
        <span
          className="hidden md:block text-sm italic"
          style={{
            color: isLight ? "#FDF6E3" : "#C4A882",
            fontFamily: "Georgia, serif",
          }}
        >
          {formacao.category} / {formacao.title}
        </span>

        {/* RIGHT — language switcher + dark/light toggle */}
        {/* Teaching note 🎓: these are the same controls as the main navbar
            but self-contained here since this page has its own layout */}
        <div className="flex items-center gap-4">
          {/* Language dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangOpen((prev) => !prev)}
              className="hover:opacity-75 transition flex items-center"
            >
              <FlagIcon code={locale} size={22} />
            </button>
            {langOpen && (
              <div
                className="absolute right-0 mt-2 shadow-lg rounded-md overflow-hidden z-50"
                style={{ backgroundColor: isLight ? "#8B6340" : "#2a1f0e" }}
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => switchLanguage(lang.code)}
                    className={`flex items-center gap-2 w-full px-4 py-2 transition ${
                      locale === lang.code ? "opacity-50" : "hover:opacity-75"
                    }`}
                  >
                    <FlagIcon code={lang.code} size={18} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dark/light toggle */}
          <button
            onClick={toggleTheme}
            className="hover:opacity-75 transition"
            style={{ color: isLight ? "#FDF6E3" : "#C4A882" }}
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* ── HERO — title block + image carousel ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-14 items-start">
          {/* Left — title and info pills */}
          <div>
            <p
              className="text-sm uppercase tracking-widest mb-2"
              style={{
                color: isLight ? "#8B3A2A" : "#D4845A",
                fontFamily: "Georgia, serif",
              }}
            >
              {formacao.category}
            </p>
            <h1
              className="text-4xl font-bold mb-4 leading-tight"
              style={{
                color: isLight ? "#2C1810" : "#D4B896",
                fontFamily: "Georgia, serif",
              }}
            >
              {formacao.title}
            </h1>
            <p
              className="text-lg italic mb-8"
              style={{
                color: isLight ? "#6B4423" : "#C4A882",
                fontFamily: "Georgia, serif",
              }}
            >
              "{formacao.tagline}"
            </p>

            {/* Info pills — icon + label for each detail */}
            <div className="space-y-3">
              {[
                { icon: <Clock size={16} />, label: formacao.duration },
                { icon: <Users size={16} />, label: formacao.participants },
                { icon: <Globe size={16} />, label: formacao.audience },
                { icon: <Package size={16} />, label: formacao.materials },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-4 py-2 rounded-xl text-sm"
                  style={{
                    backgroundColor: isLight ? "#EDD9B0" : "#2a1f0e",
                    color: isLight ? "#3B1F0A" : "#C4A882",
                    fontFamily: "Georgia, serif",
                  }}
                >
                  <span style={{ color: "#8B3A2A" }}>{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          {/* Right — image carousel */}
          <div>
            {/* Main image */}
            <div
              className="relative w-full rounded-2xl overflow-hidden shadow-xl"
              style={{ height: "300px" }}
            >
              <Image
                src={formacao.images[currentImage]}
                alt={formacao.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Dot indicators — filled = active image */}
            {formacao.images.length > 1 && (
              <div className="flex justify-center gap-3 mt-4">
                {formacao.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className="w-3 h-3 rounded-full transition hover:scale-125"
                    style={{
                      backgroundColor:
                        i === currentImage
                          ? "#8B3A2A"
                          : isLight
                            ? "#C4A882"
                            : "#5a3f20",
                    }}
                  />
                ))}
              </div>
            )}

            {/* Thumbnail strip — click to jump to that image */}
            <div className="flex gap-3 mt-4">
              {formacao.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className="relative rounded-lg overflow-hidden transition hover:opacity-90"
                  style={{
                    width: "80px",
                    height: "60px",
                    border:
                      i === currentImage
                        ? "2px solid #8B3A2A"
                        : "2px solid transparent",
                  }}
                >
                  <Image
                    src={img}
                    alt={`Imagem ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── DESCRIPTION ── */}
        <div className="mb-12">
          <h2
            className="text-2xl font-bold mb-6"
            style={{
              color: isLight ? "#2C1810" : "#D4B896",
              fontFamily: "Georgia, serif",
            }}
          >
            Sobre esta formação
          </h2>
          <div className="space-y-4">
            {formacao.description.map((para, i) => (
              <p
                key={i}
                className="text-base leading-relaxed"
                style={{
                  color: isLight ? "#3B1F0A" : "#C4A882",
                  fontFamily: "Georgia, serif",
                }}
              >
                {para}
              </p>
            ))}
          </div>
        </div>

        {/* ── WHAT YOU LEARN + WHAT TO BRING ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          <div
            className="p-6 rounded-2xl"
            style={{ backgroundColor: isLight ? "#EDD9B0" : "#2a1f0e" }}
          >
            <h3
              className="text-xl font-bold mb-4"
              style={{
                color: isLight ? "#2C1810" : "#D4B896",
                fontFamily: "Georgia, serif",
              }}
            >
              O que vais aprender
            </h3>
            <ul className="space-y-3">
              {formacao.whatYouLearn.map((item, i) => (
                <li
                  key={i}
                  className="text-sm"
                  style={{
                    color: isLight ? "#3B1F0A" : "#C4A882",
                    fontFamily: "Georgia, serif",
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="p-6 rounded-2xl"
            style={{ backgroundColor: isLight ? "#EDD9B0" : "#2a1f0e" }}
          >
            <h3
              className="text-xl font-bold mb-4"
              style={{
                color: isLight ? "#2C1810" : "#D4B896",
                fontFamily: "Georgia, serif",
              }}
            >
              O que trazer
            </h3>
            <ul className="space-y-3">
              {formacao.whatToBring.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm"
                  style={{
                    color: isLight ? "#3B1F0A" : "#C4A882",
                    fontFamily: "Georgia, serif",
                  }}
                >
                  <span style={{ color: "#8B3A2A" }}>→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── CTA — email enquiry + back button ── */}
        <div
          className="p-8 rounded-2xl text-center"
          style={{
            backgroundColor: isLight ? "#C4A882" : "#2a1f0e",
            border: `1px solid ${isLight ? "#8B6340" : "#5a3f20"}`,
          }}
        >
          <h3
            className="text-2xl font-bold mb-2"
            style={{
              color: isLight ? "#2C1810" : "#D4B896",
              fontFamily: "Georgia, serif",
            }}
          >
            Tens interesse nesta formação?
          </h3>
          <p
            className="text-sm italic mb-6"
            style={{
              color: isLight ? "#5C3D1E" : "#C4A882",
              fontFamily: "Georgia, serif",
            }}
          >
            Entra em contacto connosco e ficamos a par de tudo.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Email CTA — opens mail client with pre-filled subject line */}
            <a
              href={mailtoLink}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold transition hover:opacity-80"
              style={{
                backgroundColor: "#8B3A2A",
                color: "#FDF6E3",
                fontFamily: "Georgia, serif",
              }}
            >
              <Mail size={18} />
              Pedir Informações
            </a>

            {/* Back button — router.back() returns to previous page in history */}
            <button
              onClick={() => router.back()}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold border-2 transition hover:opacity-80"
              style={{
                borderColor: isLight ? "#3B1F0A" : "#C4A882",
                color: isLight ? "#3B1F0A" : "#C4A882",
                fontFamily: "Georgia, serif",
              }}
            >
              <ArrowLeft size={18} />
              Ver outras formações
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

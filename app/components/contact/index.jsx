"use client";

import { useTheme } from "../../context/ThemeProvider";
import { useState } from "react";

// Brand icons from react-icons
// Teaching note 🎓: we import from three different icon sets because
// not all brands are in the same package — fa=Font Awesome, fa6=Font Awesome 6, si=Simple Icons
import {
  FaFacebook,
  FaYoutube,
  FaInstagram,
  FaVimeo,
  FaLinkedin,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiRumble } from "react-icons/si";

export default function Contact() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  // useState tracks form field values
  // Each field has its own state variable and setter function
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [newsletter, setNewsletter] = useState("");

  // Track submission status for user feedback
  const [contactSent, setContactSent] = useState(false);
  const [newsletterSent, setNewsletterSent] = useState(false);

  // Shared style objects — defined once, reused across inputs
  // This keeps Tailwind classes DRY (Don't Repeat Yourself)
  const inputStyle = {
    backgroundColor: isLight ? "#FDF6E3" : "#2a1f0e",
    color: isLight ? "#2C1810" : "#D4B896",
    border: `1px solid ${isLight ? "#8B6340" : "#5a3f20"}`,
    borderRadius: "0.5rem",
    padding: "0.6rem 1rem",
    width: "100%",
    fontFamily: "Georgia, serif",
    outline: "none",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "0.4rem",
    fontSize: "0.9rem",
    color: isLight ? "#5C3D1E" : "#C4A882",
    fontFamily: "Georgia, serif",
  };

  // Handler for contact form submission
  // preventDefault stops the page from reloading (default form behavior)
  const handleContact = (e) => {
    e.preventDefault();
    // 🔧 Wire up to a real email service here later (e.g. EmailJS, Formspree)
    console.log({ name, email, message });
    setContactSent(true);
    setName("");
    setEmail("");
    setMessage("");
  };

  // Handler for newsletter subscription
  const handleNewsletter = (e) => {
    e.preventDefault();
    // 🔧 Wire up to Mailchimp, Brevo, or similar service later
    console.log({ newsletter });
    setNewsletterSent(true);
    setNewsletter("");
  };

  return (
    <section
      id="contact"
      className="scroll-mt-24 py-20 px-6"
      style={{ backgroundColor: isLight ? "#C4A882" : "#1a1208" }}
    >
      {/* Section heading */}
      <div className="text-center mb-14">
        <h2
          className="text-lg italic mb-1"
          style={{
            color: isLight ? "#5C3D1E" : "#C4A882",
            fontFamily: "Georgia, serif",
          }}
        >
          Fala connosco
        </h2>
        <h3
          className="text-3xl font-bold"
          style={{
            color: isLight ? "#2C1810" : "#D4B896",
            fontFamily: "Georgia, serif",
          }}
        >
          Contacto
        </h3>
      </div>

      {/* Two column layout — stacks on mobile, side by side on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* ── LEFT — Contact info + form ── */}
        <div>
          {/* Contact info card */}
          <div
            className="mb-8 p-6 rounded-2xl"
            style={{ backgroundColor: isLight ? "#EDD9B0" : "#2a1f0e" }}
          >
            <p
              className="text-lg mb-3 italic"
              style={{
                color: isLight ? "#3B1F0A" : "#D4B896",
                fontFamily: "Georgia, serif",
              }}
            >
              "Cada história começa com um encontro."
            </p>

            {/* Contact details — replace with real info */}
            <div className="space-y-2 mt-4">
              <p style={{ color: isLight ? "#5C3D1E" : "#C4A882" }}>
                📍 Portugal
              </p>
              <p style={{ color: isLight ? "#5C3D1E" : "#C4A882" }}>
                ✉️ geral@estamosapensar.pt
              </p>
              <p style={{ color: isLight ? "#5C3D1E" : "#C4A882" }}>
                📱 +351 000 000 000
              </p>
            </div>

            {/* Social icons — brand colors for instant recognition */}
            {/* Teaching note 🎓: aria-label is important for accessibility —
                screen readers use it to describe icon-only links */}
            <div className="flex gap-5 mt-6">
              {[
                {
                  label: "Instagram",
                  url: "https://instagram.com",
                  icon: <FaInstagram size={22} />,
                  color: "#E1306C",
                },
                {
                  label: "Facebook",
                  url: "https://facebook.com",
                  icon: <FaFacebook size={22} />,
                  color: "#1877F2",
                },
                {
                  label: "YouTube",
                  url: "https://youtube.com",
                  icon: <FaYoutube size={22} />,
                  color: "#FF0000",
                },
                {
                  label: "Vimeo",
                  url: "https://vimeo.com",
                  icon: <FaVimeo size={22} />,
                  color: "#1AB7EA",
                },
                {
                  label: "Rumble",
                  url: "https://rumble.com",
                  icon: <SiRumble size={22} />,
                  color: "#85C742",
                },
                {
                  label: "LinkedIn",
                  url: "https://linkedin.com",
                  icon: <FaLinkedin size={22} />,
                  color: "#0A66C2",
                },
                {
                  label: "X",
                  url: "https://x.com",
                  icon: <FaXTwitter size={22} />,
                  color: isLight ? "#000000" : "#ffffff",
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="transition hover:scale-125 hover:opacity-90"
                  style={{ color: social.color }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          {/* end contact info card */}

          {/* Contact form */}
          {/* onSubmit fires handleContact when the form is submitted */}
          <form onSubmit={handleContact} className="space-y-4">
            <div>
              <label style={labelStyle}>Nome</label>
              <input
                type="text"
                value={name}
                // onChange updates state every time the user types
                onChange={(e) => setName(e.target.value)}
                placeholder="O teu nome"
                style={inputStyle}
                required
              />
            </div>
            <div>
              <label style={labelStyle}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="O teu email"
                style={inputStyle}
                required
              />
            </div>
            <div>
              <label style={labelStyle}>Mensagem</label>
              {/* textarea for multi-line input — rows sets initial height */}
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="A tua mensagem..."
                rows={4}
                style={inputStyle}
                required
              />
            </div>

            {/* Show success message after submission, hide submit button */}
            {contactSent ? (
              <p
                className="text-center font-medium italic"
                style={{ color: "#5C6B3A", fontFamily: "Georgia, serif" }}
              >
                ✅ Mensagem enviada! Obrigado pelo contacto.
              </p>
            ) : (
              <button
                type="submit"
                className="w-full py-3 rounded-full font-semibold transition hover:opacity-80"
                style={{
                  backgroundColor: "#8B3A2A",
                  color: "#FDF6E3",
                  fontFamily: "Georgia, serif",
                }}
              >
                Enviar Mensagem ✉️
              </button>
            )}
          </form>
        </div>
        {/* end left column */}

        {/* ── RIGHT — Newsletter ── */}
        <div
          className="p-8 rounded-2xl flex flex-col justify-between"
          style={{ backgroundColor: isLight ? "#EDD9B0" : "#2a1f0e" }}
        >
          <div>
            <h4
              className="text-2xl font-bold mb-3"
              style={{
                color: isLight ? "#2C1810" : "#D4B896",
                fontFamily: "Georgia, serif",
              }}
            >
              📜 Fica a par das nossas histórias
            </h4>
            <p
              className="text-sm leading-relaxed mb-6"
              style={{
                color: isLight ? "#5C3D1E" : "#C4A882",
                fontFamily: "Georgia, serif",
              }}
            >
              Subscreve a nossa newsletter e recebe novidades sobre workshops,
              sessões de contos, formações e projectos especiais directamente no
              teu email.
            </p>

            {/* Benefits list — gives people a reason to subscribe */}
            <ul className="space-y-2 mb-8">
              {[
                "🎭 Novidades sobre espectáculos e sessões",
                "📚 Recursos e inspiração sobre storytelling",
                "🎓 Informação sobre formações creditadas",
                "🎲 Novidades sobre jogos e oficinas lúdicas",
              ].map((item) => (
                <li
                  key={item}
                  className="text-sm"
                  style={{
                    color: isLight ? "#5C3D1E" : "#C4A882",
                    fontFamily: "Georgia, serif",
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter form */}
          <form onSubmit={handleNewsletter} className="space-y-4">
            <div>
              <label style={labelStyle}>O teu email</label>
              <input
                type="email"
                value={newsletter}
                onChange={(e) => setNewsletter(e.target.value)}
                placeholder="email@exemplo.pt"
                style={inputStyle}
                required
              />
            </div>

            {/* Show success message after subscription */}
            {newsletterSent ? (
              <p
                className="text-center font-medium italic"
                style={{ color: "#5C6B3A", fontFamily: "Georgia, serif" }}
              >
                ✅ Subscrito! Bem-vindo/a à nossa comunidade.
              </p>
            ) : (
              <button
                type="submit"
                className="w-full py-3 rounded-full font-semibold transition hover:opacity-80"
                style={{
                  backgroundColor: "#5C6B3A",
                  color: "#FDF6E3",
                  fontFamily: "Georgia, serif",
                }}
              >
                Subscrever Newsletter 📜
              </button>
            )}
          </form>
        </div>
        {/* end right column */}
      </div>
      {/* end grid */}
    </section>
  );
}

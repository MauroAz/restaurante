"use client";

/*
  📬 CONTACT SECTION — Ganda Gula
  =================================
  Teaching note: simpler than the Estamos a Pensar contact —
  a restaurant contact section just needs a message form and
  key info (phone, WhatsApp, email). No newsletter needed here.

  Font sizes are slightly larger throughout — the demographic
  for this region skews older, so we prioritise readability.
*/

import { useState } from "react";
import { useTheme } from "../../context/ThemeProvider";
import { FaWhatsapp, FaPhone, FaFacebook, FaInstagram } from "react-icons/fa";

export default function Contact() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const [form, setForm] = useState({ nome: "", email: "", mensagem: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    setSent(true);
    setForm({ nome: "", email: "", mensagem: "" });
  };

  const bg = isLight ? "var(--gg-bg-card)" : "var(--gg-bg-card)";
  const inputStyle = {
    width: "100%",
    padding: "12px 16px", // bigger padding = easier to tap
    borderRadius: "8px",
    border: "1px solid var(--gg-bg-border)",
    backgroundColor: "var(--gg-bg-elevated)",
    color: "var(--gg-text-primary)",
    fontSize: "1rem", // larger than default for readability
    outline: "none",
    fontFamily: "Georgia, serif",
  };

  return (
    <section
      id="contact"
      className="py-20 px-6 scroll-mt-24"
      style={{ backgroundColor: "var(--gg-bg-page)" }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p
            className="text-base italic mb-1"
            style={{
              color: "var(--gg-text-muted)",
              fontFamily: "Georgia, serif",
            }}
          >
            Fale connosco
          </p>
          <h2
            className="text-3xl font-bold"
            style={{
              color: "var(--gg-text-primary)",
              fontFamily: "Georgia, serif",
            }}
          >
            Contacto
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          {/* LEFT — contact info */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Info card */}
            <div
              style={{
                backgroundColor: "var(--gg-bg-card)",
                borderRadius: "12px",
                padding: "1.5rem",
                border: "1px solid var(--gg-bg-border)",
              }}
            >
              {/* Larger font size for older demographic */}
              <div className="flex flex-col gap-4">
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <FaPhone
                    size={20}
                    style={{ color: "var(--gg-accent)", flexShrink: 0 }}
                  />
                  <div>
                    <p
                      style={{
                        color: "var(--gg-text-muted)",
                        fontSize: "0.8rem",
                      }}
                    >
                      Telefone
                    </p>
                    <a
                      href="tel:+351000000000"
                      style={{
                        color: "var(--gg-text-primary)",
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        textDecoration: "none",
                      }}
                    >
                      +351 000 000 000
                    </a>
                  </div>
                </div>

                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <FaWhatsapp
                    size={20}
                    style={{ color: "#25D366", flexShrink: 0 }}
                  />
                  <div>
                    <p
                      style={{
                        color: "var(--gg-text-muted)",
                        fontSize: "0.8rem",
                      }}
                    >
                      WhatsApp
                    </p>
                    <a
                      href="https://wa.me/351000000000"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#25D366",
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        textDecoration: "none",
                      }}
                    >
                      Enviar mensagem
                    </a>
                  </div>
                </div>

                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <span style={{ fontSize: "1.2rem", flexShrink: 0 }}>✉️</span>
                  <div>
                    <p
                      style={{
                        color: "var(--gg-text-muted)",
                        fontSize: "0.8rem",
                      }}
                    >
                      Email
                    </p>
                    <a
                      href="mailto:geral@gandagula.pt"
                      style={{
                        color: "var(--gg-text-primary)",
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        textDecoration: "none",
                      }}
                    >
                      geral@gandagula.pt
                    </a>
                  </div>
                </div>

                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <span style={{ fontSize: "1.2rem", flexShrink: 0 }}>📍</span>
                  <div>
                    <p
                      style={{
                        color: "var(--gg-text-muted)",
                        fontSize: "0.8rem",
                      }}
                    >
                      Morada
                    </p>
                    <p
                      style={{
                        color: "var(--gg-text-primary)",
                        fontSize: "1rem",
                        fontWeight: 600,
                      }}
                    >
                      Rua Principal, Chaves
                      <br />
                      Trás-os-Montes, Portugal
                    </p>
                  </div>
                </div>
              </div>

              {/* Social icons */}
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  marginTop: "1.5rem",
                  paddingTop: "1.5rem",
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
                  <FaFacebook size={26} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  style={{ color: "#E1306C" }}
                >
                  <FaInstagram size={26} />
                </a>
                <a
                  href="https://wa.me/351000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  style={{ color: "#25D366" }}
                >
                  <FaWhatsapp size={26} />
                </a>
              </div>
            </div>

            {/* Hours card */}
            <div
              style={{
                backgroundColor: "var(--gg-bg-card)",
                borderRadius: "12px",
                padding: "1.5rem",
                border: "1px solid var(--gg-bg-border)",
              }}
            >
              <p
                style={{
                  color: "var(--gg-text-primary)",
                  fontWeight: 700,
                  fontSize: "1rem",
                  marginBottom: "0.75rem",
                }}
              >
                🕐 Horário de Funcionamento
              </p>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                {[
                  {
                    day: "Segunda a Sexta",
                    hours: "12h00–15h00 | 19h00–22h30",
                  },
                  { day: "Sábado", hours: "12h00–15h30 | 19h00–23h00" },
                  { day: "Domingo", hours: "12h00–15h30" },
                ].map((row) => (
                  <div
                    key={row.day}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "1rem",
                    }}
                  >
                    <p
                      style={{
                        color: "var(--gg-text-muted)",
                        fontSize: "0.95rem",
                      }}
                    >
                      {row.day}
                    </p>
                    <p
                      style={{
                        color: "var(--gg-text-primary)",
                        fontSize: "0.95rem",
                        fontWeight: 600,
                      }}
                    >
                      {row.hours}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — message form */}
          <div className="flex-1">
            <p
              style={{
                color: "var(--gg-text-muted)",
                fontSize: "1rem",
                marginBottom: "1.5rem",
                lineHeight: 1.7,
              }}
            >
              Deixe-nos uma mensagem e responderemos o mais brevemente possível.
            </p>

            {sent ? (
              <div
                style={{
                  backgroundColor: "var(--gg-bg-card)",
                  borderRadius: "12px",
                  padding: "2rem",
                  textAlign: "center",
                  border: "1px solid var(--gg-bg-border)",
                }}
              >
                <p style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>✅</p>
                <p
                  style={{
                    color: "var(--gg-text-primary)",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                  }}
                >
                  Mensagem enviada!
                </p>
                <p
                  style={{
                    color: "var(--gg-text-muted)",
                    fontSize: "0.95rem",
                    marginTop: "0.5rem",
                  }}
                >
                  Obrigado pelo contacto. Responderemos em breve.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <input
                  name="nome"
                  placeholder="O seu nome"
                  value={form.nome}
                  onChange={handleChange}
                  style={inputStyle}
                />
                <input
                  name="email"
                  type="email"
                  placeholder="O seu email"
                  value={form.email}
                  onChange={handleChange}
                  style={inputStyle}
                />
                <textarea
                  name="mensagem"
                  placeholder="A sua mensagem..."
                  value={form.mensagem}
                  onChange={handleChange}
                  rows={5}
                  style={{ ...inputStyle, resize: "vertical" }}
                />
                <button
                  onClick={handleSubmit}
                  style={{
                    backgroundColor: "var(--gg-accent)",
                    color: "#fff",
                    border: "none",
                    padding: "14px 24px",
                    borderRadius: "24px",
                    fontWeight: 700,
                    fontSize: "1rem",
                    cursor: "pointer",
                    fontFamily: "Georgia, serif",
                  }}
                >
                  Enviar Mensagem ✉️
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

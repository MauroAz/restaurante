"use client";

import { useState } from "react";
import { useTheme } from "../../context/ThemeProvider";
import { FaWhatsapp, FaPhone } from "react-icons/fa";

const YEAR = new Date().getFullYear();
const MONTH = new Date().getMonth();
const MONTHS = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];
const DAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDay(year, month) {
  return new Date(year, month, 1).getDay();
}

const SOLD_OUT = { lunch: [3, 8, 15, 22], dinner: [5, 12, 19, 20, 26] };
const ALMOST = { lunch: [10, 17, 24], dinner: [3, 10, 17] };

export default function ReservasSection() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const [meal, setMeal] = useState("dinner");
  const [selectedDay, setSelectedDay] = useState(null);
  const [calMonth, setCalMonth] = useState(MONTH);
  const [calYear, setCalYear] = useState(YEAR);
  const [form, setForm] = useState({ nome: "", pessoas: "2", notas: "" });
  const [sent, setSent] = useState(false);

  const daysInMonth = getDaysInMonth(calYear, calMonth);
  const firstDay = getFirstDay(calYear, calMonth);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const prevMonth = () => {
    if (calMonth === 0) {
      setCalMonth(11);
      setCalYear((y) => y - 1);
    } else setCalMonth((m) => m - 1);
    setSelectedDay(null);
  };

  const nextMonth = () => {
    if (calMonth === 11) {
      setCalMonth(0);
      setCalYear((y) => y + 1);
    } else setCalMonth((m) => m + 1);
    setSelectedDay(null);
  };

  const getStatus = (day) => {
    if (SOLD_OUT[meal].includes(day)) return "soldout";
    if (ALMOST[meal].includes(day)) return "almost";
    return "available";
  };

  const today = new Date();
  const isPast = (day) => {
    if (calYear < today.getFullYear()) return true;
    if (calYear === today.getFullYear() && calMonth < today.getMonth())
      return true;
    if (
      calYear === today.getFullYear() &&
      calMonth === today.getMonth() &&
      day < today.getDate()
    )
      return true;
    return false;
  };

  const inp = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid var(--gg-bg-border)",
    backgroundColor: "var(--gg-bg-elevated)",
    color: "var(--gg-text-primary)",
    fontSize: "1rem",
    outline: "none",
  };

  return (
    <section
      className="py-20 px-6 scroll-mt-24"
      style={{ backgroundColor: "var(--gg-bg-page)" }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p
            className="text-base italic mb-1"
            style={{
              color: "var(--gg-text-muted)",
              fontFamily: "Georgia, serif",
            }}
          >
            Garanta a sua mesa
          </p>
          <style>{`
            @keyframes beacon {
              0%   { box-shadow: 0 0 0 0px rgba(255, 215, 0, 0.6); }
              70%  { box-shadow: 0 0 0 16px rgba(255, 215, 0, 0); }
              100% { box-shadow: 0 0 0 0px rgba(255, 215, 0, 0); }
            }
            .beacon-pulse {
              animation: beacon 2.5s ease-out infinite;
              border-radius: 12px;
              display: inline-block;
              padding: 4px 16px;
              border: 1.5px solid #FFD700;
            }
          `}</style>
          <h2
            className="text-3xl font-bold beacon-pulse"
            style={{
              color: "var(--gg-text-primary)",
              fontFamily: "Georgia, serif",
            }}
          >
            📅 Reservas
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 flex flex-col gap-4">
            <div
              style={{
                backgroundColor: "var(--gg-bg-card)",
                borderRadius: "12px",
                padding: "1.25rem",
                border: "1px solid var(--gg-bg-border)",
              }}
            >
              <div
                style={{ display: "flex", gap: "8px", marginBottom: "1rem" }}
              >
                {["lunch", "dinner"].map((m) => (
                  <button
                    key={m}
                    onClick={() => {
                      setMeal(m);
                      setSelectedDay(null);
                    }}
                    style={{
                      flex: 1,
                      padding: "8px",
                      borderRadius: "8px",
                      border: "none",
                      cursor: "pointer",
                      fontWeight: 600,
                      fontSize: "0.95rem",
                      backgroundColor:
                        meal === m ? "#4A3800" : "var(--gg-bg-elevated)",
                      color:
                        meal === m ? "#FFD700" : "var(--gg-text-secondary)",
                    }}
                  >
                    {m === "lunch" ? "🍽️ Almoço" : "🌙 Jantar"}
                  </button>
                ))}
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "0.75rem",
                }}
              >
                <button
                  onClick={prevMonth}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--gg-text-secondary)",
                    fontSize: "1.2rem",
                  }}
                >
                  ‹
                </button>
                <p
                  style={{
                    color: "var(--gg-text-primary)",
                    fontWeight: 700,
                    fontSize: "1rem",
                  }}
                >
                  {MONTHS[calMonth]} {calYear}
                </p>
                <button
                  onClick={nextMonth}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--gg-text-secondary)",
                    fontSize: "1.2rem",
                  }}
                >
                  ›
                </button>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7, 1fr)",
                  gap: "4px",
                  marginBottom: "6px",
                }}
              >
                {DAYS.map((d) => (
                  <div
                    key={d}
                    style={{
                      textAlign: "center",
                      fontSize: "0.72rem",
                      color: "var(--gg-text-muted)",
                      fontWeight: 700,
                      padding: "4px 0",
                    }}
                  >
                    {d}
                  </div>
                ))}
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7, 1fr)",
                  gap: "4px",
                }}
              >
                {Array.from({ length: firstDay }).map((_, i) => (
                  <div key={"empty-" + i} />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const past = isPast(day);
                  const status = past ? "past" : getStatus(day);
                  const isSelected = selectedDay === day;

                  const bg = isSelected
                    ? "#1A3D00"
                    : status === "soldout"
                      ? "#3D0000"
                      : status === "almost"
                        ? "#3D3200"
                        : status === "past"
                          ? "transparent"
                          : "#1A3D00";

                  const color = isSelected
                    ? "#4ADE80"
                    : status === "soldout"
                      ? "#FF6B6B"
                      : status === "almost"
                        ? "#FFD700"
                        : status === "past"
                          ? "var(--gg-text-muted)"
                          : "#4ADE80";

                  return (
                    <button
                      key={day}
                      disabled={status === "soldout" || status === "past"}
                      onClick={() => setSelectedDay(day)}
                      style={{
                        padding: "6px 2px",
                        borderRadius: "6px",
                        border: "none",
                        cursor:
                          status === "soldout" || status === "past"
                            ? "not-allowed"
                            : "pointer",
                        backgroundColor: bg,
                        color,
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        opacity: status === "past" ? 0.35 : 1,
                        textDecoration:
                          status === "soldout" ? "line-through" : "none",
                        transition: "all 0.15s",
                      }}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  marginTop: "0.75rem",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                {[
                  { dotColor: "#4ADE80", label: "Disponível" },
                  { dotColor: "#FFD700", label: "Vagas Limitadas" },
                  { dotColor: "#FF6B6B", label: "Lotado/Esgotado" },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <div
                      style={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "3px",
                        backgroundColor: item.dotColor,
                        border: "1px solid var(--gg-bg-border)",
                      }}
                    />
                    <span style={{ fontSize: "0.75rem", color: item.dotColor }}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              {selectedDay && (
                <p
                  style={{
                    marginTop: "0.75rem",
                    color: "var(--gg-accent)",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                  }}
                >
                  ✅ Selecionado: {selectedDay} de {MONTHS[calMonth]} —{" "}
                  {meal === "lunch" ? "Almoço" : "Jantar"}
                </p>
              )}
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <a
                href="https://wa.me/351000000000"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  backgroundColor: "#25D366",
                  color: "#fff",
                  padding: "12px 24px",
                  borderRadius: "24px",
                  fontWeight: 600,
                  textDecoration: "none",
                  fontSize: "0.95rem",
                }}
              >
                <FaWhatsapp size={20} />
                Reservar via WhatsApp
              </a>
              <a
                href="tel:+351000000000"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  background: "transparent",
                  color: "var(--gg-text-primary)",
                  padding: "12px 24px",
                  borderRadius: "24px",
                  fontWeight: 600,
                  textDecoration: "none",
                  fontSize: "0.95rem",
                  border: "1px solid var(--gg-bg-border)",
                }}
              >
                <FaPhone size={16} />
                +351 000 000 000
              </a>
              <p
                style={{
                  color: "var(--gg-text-muted)",
                  fontSize: "0.85rem",
                  textAlign: "center",
                }}
              >
                Segunda a Domingo — 12h00–15h00 e 19h00–22h30
              </p>
            </div>
          </div>

          <div className="flex-1">
            <p
              style={{
                color: "var(--gg-text-muted)",
                fontSize: "0.95rem",
                marginBottom: "1.5rem",
                lineHeight: 1.7,
              }}
            >
              {selectedDay
                ? `A reservar para ${selectedDay} de ${MONTHS[calMonth]} — ${meal === "lunch" ? "Almoço" : "Jantar"}. Preencha os seus dados:`
                : "Selecione um dia no calendário ou preencha os dados e entraremos em contacto:"}
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
                  Pedido enviado!
                </p>
                <p
                  style={{
                    color: "var(--gg-text-muted)",
                    fontSize: "0.95rem",
                    marginTop: "0.5rem",
                  }}
                >
                  Confirmaremos a sua reserva em breve.
                </p>
                <button
                  onClick={() => {
                    setSent(false);
                    setSelectedDay(null);
                  }}
                  style={{
                    marginTop: "1rem",
                    backgroundColor: "var(--gg-accent)",
                    color: "#fff",
                    border: "none",
                    padding: "8px 20px",
                    borderRadius: "20px",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  Nova Reserva
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <input
                  name="nome"
                  placeholder="O seu nome"
                  value={form.nome}
                  onChange={handleChange}
                  style={inp}
                />
                <select
                  name="pessoas"
                  value={form.pessoas}
                  onChange={handleChange}
                  style={inp}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "pessoa" : "pessoas"}
                    </option>
                  ))}
                </select>
                <textarea
                  name="notas"
                  placeholder="Notas especiais (alergias, ocasião especial...)"
                  value={form.notas}
                  onChange={handleChange}
                  rows={4}
                  style={{ ...inp, resize: "vertical" }}
                />
                <button
                  onClick={() => {
                    if (form.nome) setSent(true);
                    else alert("Por favor indique o seu nome.");
                  }}
                  style={{
                    backgroundColor: "var(--gg-accent)",
                    color: "#fff",
                    border: "none",
                    padding: "14px 24px",
                    borderRadius: "24px",
                    fontWeight: 700,
                    fontSize: "1rem",
                    cursor: "pointer",
                  }}
                >
                  {selectedDay
                    ? `Reservar — ${selectedDay} ${MONTHS[calMonth]}`
                    : "Enviar Pedido de Reserva"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

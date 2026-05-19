"use client";

import { useTheme } from "../../context/ThemeProvider";

const manualSkills = [
  {
    emoji: "📖",
    name: "Narração Oral",
    desc: "Contar histórias ao vivo com voz, corpo e presença",
  },
  {
    emoji: "✂️",
    name: "Construção de Livros",
    desc: "Encadernação artesanal e criação de livros únicos",
  },
  {
    emoji: "🎭",
    name: "Teatro e Marionetas",
    desc: "Formas animadas e teatro de objetos",
  },
  {
    emoji: "🎲",
    name: "Jogos de Mesa",
    desc: "Design e facilitação de jogos narrativos",
  },
  {
    emoji: "🖊️",
    name: "Blackout Poetry",
    desc: "Poesia criada a partir do apagamento de texto",
  },
  {
    emoji: "🎵",
    name: "Música e Voz",
    desc: "Songwriting, spoken word e performance sonora",
  },
];

const digitalSkills = [
  {
    emoji: "💻",
    name: "Digital Storytelling",
    desc: "Narrativas multimédia com ferramentas digitais",
  },
  {
    emoji: "🤖",
    name: "Bot Poets & IA",
    desc: "Escrita criativa com inteligência artificial",
  },
  {
    emoji: "🎧",
    name: "Field Recording",
    desc: "Som como matéria narrativa e criativa",
  },
  {
    emoji: "✍️",
    name: "Erasure Poetry Digital",
    desc: "Blackout poetry em ambiente digital",
  },
  {
    emoji: "🎨",
    name: "Tipografia Animada",
    desc: "Palavras que ganham vida através da animação",
  },
  {
    emoji: "🖼️",
    name: "ReCreating the Past",
    desc: "Arte e código para reinterpretar a história",
  },
];

export default function SkillsExperience() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <section
      id="skills"
      className="scroll-mt-24 py-20 px-6"
      style={{ backgroundColor: isLight ? "#EDD9B0" : "#150f05" }}
    >
      {/* Section heading */}
      <div className="text-center mb-14">
        <h2
          className="text-lg italic mb-1"
          style={{
            color: isLight ? "#6B4423" : "#C4A882",
            fontFamily: "Georgia, serif",
          }}
        >
          Como trabalhamos
        </h2>
        <h3
          className="text-3xl font-bold"
          style={{
            color: isLight ? "#3B1F0A" : "#D4B896",
            fontFamily: "Georgia, serif",
          }}
        >
          Manual & Digital
        </h3>
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* LEFT — Manual */}
        <div>
          <h4
            className="text-xl font-bold mb-6 text-center pb-2 border-b-2"
            style={{
              color: isLight ? "#3B1F0A" : "#D4B896",
              borderColor: "#8B3A2A",
              fontFamily: "Georgia, serif",
            }}
          >
            🖐 Técnicas Manuais
          </h4>
          <div className="space-y-4">
            {manualSkills.map((skill) => (
              <div
                key={skill.name}
                className="flex items-start gap-4 p-4 rounded-xl transition hover:scale-105"
                style={{
                  backgroundColor: isLight ? "#C4A882" : "#2a1f0e",
                }}
              >
                <span className="text-2xl">{skill.emoji}</span>
                <div className="text-left">
                  <p
                    className="font-semibold"
                    style={{
                      color: isLight ? "#3B1F0A" : "#D4B896",
                      fontFamily: "Georgia, serif",
                    }}
                  >
                    {skill.name}
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: isLight ? "#5C3D1E" : "#A08060" }}
                  >
                    {skill.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Digital */}
        <div>
          <h4
            className="text-xl font-bold mb-6 text-center pb-2 border-b-2"
            style={{
              color: isLight ? "#3B1F0A" : "#D4B896",
              borderColor: "#5C6B3A",
              fontFamily: "Georgia, serif",
            }}
          >
            💻 Técnicas Digitais
          </h4>
          <div className="space-y-4">
            {digitalSkills.map((skill) => (
              <div
                key={skill.name}
                className="flex items-start gap-4 p-4 rounded-xl transition hover:scale-105"
                style={{
                  backgroundColor: isLight ? "#C4A882" : "#2a1f0e",
                }}
              >
                <span className="text-2xl">{skill.emoji}</span>
                <div className="text-left">
                  <p
                    className="font-semibold"
                    style={{
                      color: isLight ? "#3B1F0A" : "#D4B896",
                      fontFamily: "Georgia, serif",
                    }}
                  >
                    {skill.name}
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: isLight ? "#5C3D1E" : "#A08060" }}
                  >
                    {skill.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

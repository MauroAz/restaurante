"use client";

import { useState } from "react";
import { formacoes, formacaoTypes } from "../../data/projects";
import ProjectCard from "./ProjectCard";
import { useTheme } from "../../context/ThemeProvider";

export default function FormacaoSection() {
  const [selectedType, setSelectedType] = useState("Todos");
  const { theme } = useTheme();
  const isLight = theme === "light";

  const filtered =
    selectedType === "Todos"
      ? formacoes
      : formacoes.filter((f) => f.type === selectedType);

  return (
    <section
      id="formacoes"
      className="scroll-mt-24 px-4 text-center py-20"
      style={{ backgroundColor: isLight ? "#F0E6D0" : "#120d06" }}
    >
      {/* Section headings */}
      <h2
        className="text-lg italic mb-1"
        style={{
          color: isLight ? "#6B4423" : "#C4A882",
          fontFamily: "Georgia, serif",
        }}
      >
        O que fazemos
      </h2>
      <h3
        className="text-3xl font-bold mb-8"
        style={{
          color: isLight ? "#3B1F0A" : "#D4B896",
          fontFamily: "Georgia, serif",
        }}
      >
        Formações
      </h3>

      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 justify-center mb-12">
        {formacaoTypes.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className="px-4 py-2 rounded-full border text-sm font-medium transition"
            style={{
              backgroundColor:
                selectedType === type ? "#8B3A2A" : "transparent",
              color:
                selectedType === type
                  ? "#FDF6E3"
                  : isLight
                    ? "#6B4423"
                    : "#C4A882",
              borderColor:
                selectedType === type
                  ? "#8B3A2A"
                  : isLight
                    ? "#6B4423"
                    : "#C4A882",
              fontFamily: "Georgia, serif",
            }}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {filtered.map((formacao) => (
          <ProjectCard key={formacao.title} project={formacao} />
        ))}
      </div>
    </section>
  );
}

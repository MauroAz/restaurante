"use client";

/*
  🔘 SCROLLDOTS — Ganda Gula
  ===========================
  Teaching note: only the sections array changes between sites.
  The rest of the component is identical — this is the benefit
  of keeping logic separate from content.

  Sections must match the id="" values in page.tsx exactly.
*/

import { useTheme } from "../../context/ThemeProvider";

const sections = [
  "home", // hero carousel
  "menu", // menu cards
  "chef", // el chef
  "clientes", // reviews
  "reservas", // reservations
  "mapa", // map
];

export default function ScrollDots() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const dotColor = isLight ? "#2A6090" : "#7BBDE8";

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50">
      {sections.map((section) => (
        <a
          key={section}
          href={`#${section}`}
          aria-label={`Scroll to ${section}`}
          className="w-3 h-3 rounded-full transition-all hover:scale-125"
          style={{
            backgroundColor: dotColor,
            opacity: 0.5,
            display: "block",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "1";
            e.currentTarget.style.backgroundColor = "var(--gg-accent)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "0.5";
            e.currentTarget.style.backgroundColor = dotColor;
          }}
        />
      ))}
    </div>
  );
}

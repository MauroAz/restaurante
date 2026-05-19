"use client";

/*
  🔘 SCROLLDOTS — DataSpectacles
  ================================
  Teaching note: ScrollDots renders a vertical column of small
  clickable dots on the right side of the screen. Each dot is
  an anchor link to a section on the page.

  The sections array must match the id="" values on the
  section divs in page.tsx exactly — if they don't match,
  clicking a dot won't scroll anywhere.

  To add a new section:
  1. Add id="your-section" to the div in page.tsx
  2. Add "your-section" to the array below
  That's it — the dots render automatically.
*/

import { useTheme } from "../../context/ThemeProvider";

/* ============================================================
   Teaching note: this array is the only thing that needs
   updating when sections are added or removed.
   Order here = order of dots top to bottom.
   ============================================================ */
const sections = [
  "home", // hero
  "stories", // story grid
  "globe", // world map placeholder
  "video", // youtube embed
  "contact", // contact form
];

export default function ScrollDots() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  /*
    Teaching note: dot colour uses our CSS variables indirectly
    — we read isLight and pick the right value. We could use
    CSS variables directly but inline styles on SVG/HTML elements
    don't always inherit CSS variables reliably in all browsers,
    so explicit values are safer here.
  */
  const dotColor = isLight ? "#8B6340" : "#C4B49A";
  const hoverColor = "var(--ds-accent)"; // burnt orange on hover

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50">
      {sections.map((section) => (
        <a
          key={section}
          href={`#${section}`}
          aria-label={`Scroll to ${section}`} // accessibility — screen readers announce this
          className="w-3 h-3 rounded-full transition-all hover:scale-125"
          style={{
            backgroundColor: dotColor,
            opacity: 0.5,
            display: "block",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "1";
            e.currentTarget.style.backgroundColor = "var(--ds-accent)";
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

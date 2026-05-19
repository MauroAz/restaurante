"use client";

import { useTheme } from "../../context/ThemeProvider";
import { useParams, useRouter } from "next/navigation";
import { formacaoDetails } from "../../data/projects";

// ProjectCard receives a single project object as a prop
// All project data (image, title, description, type) comes from projects.js
// Teaching note 🎓: we check if a detail page exists for this card
// by looking up its slug in formacaoDetails — if it exists, the card is clickable
export default function ProjectCard({ project }) {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const router = useRouter();
  const params = useParams();

  // Get current locale from URL (e.g. "pt", "en")
  // Teaching note 🎓: useParams() reads dynamic segments from the URL
  // [locale] gives us "pt", "en" etc so we can build the correct detail page URL
  const locale = params?.locale || "pt";

  // Convert title to URL-friendly slug
  // Teaching note 🎓: this must match the keys in formacaoDetails exactly
  // "Blackout Poetry Digital" → "blackout-poetry-digital"
  const slug = project.title
    .toLowerCase()
    .normalize("NFD") // decompose accented chars
    .replace(/[\u0300-\u036f]/g, "") // remove accent marks
    .replace(/[^a-z0-9\s-]/g, "") // remove special chars
    .trim()
    .replace(/\s+/g, "-"); // spaces to hyphens

  // Check if this workshop has a detail page
  const hasDetailPage = !!formacaoDetails[slug];

  // Navigate to detail page when card is clicked
  const handleClick = () => {
    if (hasDetailPage) {
      router.push(`/${locale}/formacoes/${slug}`);
    }
  };

  return (
    // overflow-hidden prevents image from breaking out of rounded corners
    // cursor-pointer and hover effects only apply if a detail page exists
    <div
      onClick={handleClick}
      className="rounded-2xl shadow-md overflow-hidden transition"
      style={{
        backgroundColor: isLight ? "#EDD9B0" : "#2a1f0e",
        border: `1px solid ${isLight ? "#C4A882" : "#5a3f20"}`,
        // Show pointer cursor only if card is clickable
        cursor: hasDetailPage ? "pointer" : "default",
        transform: "scale(1)",
        // Teaching note 🎓: inline transition on hover via onMouseEnter/Leave
        // because Tailwind hover: classes don't work well with dynamic styles
      }}
      onMouseEnter={(e) => {
        if (hasDetailPage) e.currentTarget.style.transform = "scale(1.02)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      {/* ── IMAGE AREA ── relative so the type badge can sit on top */}
      <div className="relative">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover"
        />

        {/* Type badge — absolute positions it over the image */}
        <span
          className="absolute top-2 right-2 text-xs font-semibold px-3 py-1 rounded-full"
          style={{
            backgroundColor: "#8B3A2A",
            color: "#FDF6E3",
            fontFamily: "Georgia, serif",
          }}
        >
          {project.type}
        </span>

        {/* "Ver mais" indicator — only shown if card has a detail page */}
        {/* Teaching note 🎓: the && operator renders the element only when
            hasDetailPage is true — common React pattern for conditional rendering */}
        {hasDetailPage && (
          <div
            className="absolute bottom-2 right-2 text-xs px-3 py-1 rounded-full"
            style={{
              backgroundColor: "rgba(0,0,0,0.6)",
              color: "#FDF6E3",
              fontFamily: "Georgia, serif",
            }}
          >
            Ver mais →
          </div>
        )}
      </div>

      {/* ── TEXT AREA ── title and description below the image */}
      <div className="p-4 text-left">
        <h4
          className="text-lg font-bold mb-2"
          style={{
            color: isLight ? "#2C1810" : "#D4B896",
            fontFamily: "Georgia, serif",
          }}
        >
          {project.title}
        </h4>
        <p
          className="text-sm mt-1"
          style={{
            color: isLight ? "#5C3D1E" : "#A08060",
            fontFamily: "Georgia, serif",
          }}
        >
          {project.description}
        </p>
      </div>
    </div>
  );
}

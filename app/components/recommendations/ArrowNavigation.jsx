import { ChevronLeft, ChevronRight } from "lucide-react";

// ── ArrowButton ──────────────────────────────────────────────────────────────
// Internal sub-component — only used inside this file, never exported
// Keeps button styling in one place (DRY principle)
// onClick: the function to run when pressed
// children: the icon passed between the opening and closing tags
const ArrowButton = ({ onClick, children }) => (
  <button
    onClick={onClick}
    // Blue outline by default — fills solid blue on hover
    // rounded-full makes it a circle since padding is equal on all sides
    className="p-3 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition"
  >
    {children}
  </button>
);

// ── ArrowNavigation ──────────────────────────────────────────────────────────
// Renders two navigation buttons for the testimonial carousel
// onPrev / onNext: functions passed down from Recommendations parent
// This component has no state — it only triggers changes in the parent
// This is called "lifting state up" — a common React pattern
export default function ArrowNavigation({ onPrev, onNext }) {
  return (
    // justify-center centers the buttons horizontally
    // gap-4 adds spacing between them
    <div className="flex justify-center gap-4 mt-6">
      {/* Previous — moves carousel backward */}
      <ArrowButton onClick={onPrev}>
        <ChevronLeft size={20} />
      </ArrowButton>

      {/* Next — moves carousel forward */}
      <ArrowButton onClick={onNext}>
        <ChevronRight size={20} />
      </ArrowButton>
    </div>
  );
}

"use client";

/*
  📰 StoriesGrid — DataSpectacles
  =================================
  Teaching note: this component does two things:
  1. Renders filter chips (All, Words & Language, Sports, etc.)
  2. Renders a responsive grid of story cards

  State: `activeCategory` tracks which filter is selected.
  When it changes, the displayed stories re-filter automatically.
  This is a classic React "controlled filter" pattern.

  Data flows like this:
  stories.js → StoriesGrid (filters) → StoryCard (renders each)
*/

import { useState } from "react";
import { stories, CATEGORIES } from "../../data/stories";

export default function StoriesGrid() {
  /*
    Teaching note: useState returns [currentValue, setterFunction].
    "all" is the initial value — show everything on first load.
  */
  const [activeCategory, setActiveCategory] = useState("all");

  /* Filter: if "all" is active return everything, otherwise
     only return stories whose category matches the active filter */
  const filtered =
    activeCategory === "all"
      ? stories
      : stories.filter((s) => s.category === activeCategory);

  return (
    <section
      id="stories"
      className="py-20 px-6 scroll-mt-24"
      style={{ backgroundColor: "var(--ds-bg-page)" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* --- Section header --- */}
        <p
          className="text-base italic mb-1"
          style={{
            color: "var(--ds-text-muted)",
            fontFamily: "var(--ds-font-serif)",
          }}
        >
          Data stories worth reading
        </p>
        <h2
          className="text-3xl font-bold mb-8"
          style={{
            color: "var(--ds-text-primary)",
            fontFamily: "var(--ds-font-serif)",
          }}
        >
          Latest Stories
        </h2>

        {/* --- Filter chips ---
            Teaching note: Object.entries() converts the CATEGORIES object
            into an array of [key, value] pairs so we can map over it.
            Each chip updates activeCategory on click. */}
        <div className="flex flex-wrap gap-2 mb-10">
          {Object.entries(CATEGORIES).map(([key, cat]) => {
            const isActive = activeCategory === key;
            return (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                style={{
                  padding: "6px 16px",
                  borderRadius: "20px",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  border: isActive
                    ? "1px solid var(--ds-accent)"
                    : "1px solid var(--ds-bg-border)",
                  background: isActive ? "var(--ds-accent)" : "transparent",
                  color: isActive ? "#fff" : "var(--ds-text-secondary)",
                  transition: "all 0.2s ease",
                  letterSpacing: "0.02em",
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* --- Story grid ---
            Teaching note: CSS Grid with auto-fit + minmax makes this
            responsive without any media queries. Cards are at least
            300px wide; the browser fits as many columns as it can. */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {filtered.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>

        {/* Empty state — shown if a filter returns no results */}
        {filtered.length === 0 && (
          <p
            className="text-center py-20"
            style={{ color: "var(--ds-text-muted)" }}
          >
            No stories in this category yet. Coming soon.
          </p>
        )}
      </div>
    </section>
  );
}

/* ============================================================
   🃏 STORY CARD
   Teaching note: a "dumb" component — it just receives a story
   object as a prop and renders it. No state, no logic.
   Keeping display components dumb makes them easy to reuse.
   ============================================================ */
function StoryCard({ story }) {
  const category = CATEGORIES[story.category];

  return (
    <article
      style={{
        backgroundColor: "var(--ds-bg-card)",
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid var(--ds-bg-border)",
        transition: "border-color 0.2s ease, transform 0.2s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--ds-accent)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--ds-bg-border)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Cover image area — uses coverColor as bg until real images exist */}
      <div
        style={{
          height: "200px",
          backgroundColor: story.coverColor || "var(--ds-bg-elevated)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Story number badge — top left */}
        <span
          style={{
            position: "absolute",
            top: "12px",
            left: "12px",
            background: "rgba(0,0,0,0.5)",
            color: "var(--ds-text-secondary)",
            fontSize: "0.75rem",
            fontWeight: 700,
            padding: "3px 8px",
            borderRadius: "20px",
            letterSpacing: "0.05em",
          }}
        >
          {story.number}
        </span>

        {/* "Updating" live badge — top right, only when isUpdating=true */}
        {story.isUpdating && (
          <span
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              background: "var(--ds-cat-updating-bg)",
              color: "var(--ds-cat-updating-text)",
              fontSize: "0.7rem",
              fontWeight: 700,
              padding: "3px 8px",
              borderRadius: "20px",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            {/* Pulsing dot for live feel */}
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "var(--ds-cat-updating-text)",
                display: "inline-block",
              }}
            />
            Updating
          </span>
        )}

        {/* Placeholder emoji when no image yet */}
        {!story.image && (
          <span style={{ fontSize: "3rem", opacity: 0.4 }}>
            {story.category === "words" && "🔤"}
            {story.category === "culture" && "🎭"}
            {story.category === "sports" && "⚽"}
            {story.category === "curious" && "📊"}
            {story.category === "odd" && "🔗"}
            {story.category === "updating" && "📡"}
          </span>
        )}
      </div>

      {/* Card body */}
      <div style={{ padding: "16px 20px 20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <span
            style={{
              fontSize: "0.75rem",
              color: "var(--ds-text-muted)",
              letterSpacing: "0.05em",
            }}
          >
            {story.date}
          </span>
          {category && (
            <span className={`ds-chip ${category.chip}`}>{category.label}</span>
          )}
        </div>

        <h3
          style={{
            fontSize: "1.1rem",
            fontWeight: 700,
            color: "var(--ds-text-primary)",
            fontFamily: "var(--ds-font-serif)",
            lineHeight: 1.35,
            marginBottom: "8px",
          }}
        >
          {story.title}
        </h3>

        <p
          style={{
            fontSize: "0.9rem",
            color: "var(--ds-text-secondary)",
            lineHeight: 1.75,
            margin: 0,
          }}
        >
          {story.description}
        </p>
      </div>
    </article>
  );
}

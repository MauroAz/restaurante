// ExperienceItem receives title, company, and years as props
// Each instance represents one job/role on the timeline
export default function ExperienceItem({ title, company, years }) {
  return (
    // relative — needed so the bullet dot can be absolutely positioned
    // pl-4 — pushes content right, making room for the dot
    <div className="relative pl-4">
      {/* Timeline bullet dot — blue circle positioned to the left */}
      {/* -left-3 pulls it outside the container onto the blue line */}
      <div className="absolute -left-3 top-2 w-3 h-3 rounded-full bg-blue-500" />

      {/* Experience details */}
      <h5 className="text-lg font-semibold text-gray-800 dark:text-white">
        {title}
      </h5>

      <p className="text-sm text-gray-600 dark:text-gray-400">{company}</p>

      <p className="text-sm text-gray-500 dark:text-gray-500">{years}</p>
    </div>
  );
}

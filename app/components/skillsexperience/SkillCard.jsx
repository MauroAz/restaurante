// SkillCard receives two props:
// icon — a JSX element (the react-icons component)
// name — the skill name string
export default function SkillCard({ icon, name }) {
  return (
    // Vertical stack, centered
    <div className="flex flex-col items-center text-center">
      {/* Icon container — text-4xl controls icon size */}
      <div className="text-4xl mb-2">{icon}</div>

      {/* Skill name below the icon */}
      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {name}
      </p>
    </div>
  );
}

// Displays a single testimonial — photo, quote, name, role
// testimonial prop contains: image, text, name, position, company
export default function TestimonialCard({ testimonial }) {
  return (
    // flex-col on mobile, flex-row on small screens and above
    // max-w-2xl centers and constrains the card width
    <div className="flex flex-col sm:flex-row items-center bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-md p-6 text-left max-w-2xl mx-auto mb-6 sm:mb-0 transition">
      {/* Profile image — circular with blue border */}
      {/* sm:mr-6 adds right margin on larger screens to space from text */}
      <img
        src={testimonial.image}
        alt={testimonial.name}
        width={80}
        height={80}
        className="w-20 h-20 rounded-full object-cover mb-4 sm:mb-0 sm:mr-6 border-2 border-blue-500 dark:border-blue-400"
      />

      {/* Text content */}
      <div>
        {/* The testimonial quote */}
        <p className="text-gray-700 dark:text-gray-200 text-base leading-relaxed mb-3">
          {testimonial.text}
        </p>

        {/* Person's name — bold and prominent */}
        <p className="font-bold text-lg text-gray-900 dark:text-white">
          {testimonial.name}
        </p>

        {/* Position and company — smaller and muted */}
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {testimonial.position} at {testimonial.company}
        </p>
      </div>
    </div>
  );
}

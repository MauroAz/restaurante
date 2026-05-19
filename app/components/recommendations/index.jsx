"use client";

import { useState } from "react";
import { testimonials } from "../../data/testimonials";
import { companyLogos } from "../../data/companies";
import TestimonialCard from "./TestimonialCard";
import ArrowNavigation from "./ArrowNavigation";
import CompanyLogo from "./CompanyLogo";

export default function Recommendations() {
  // tracks which testimonial is currently visible
  const [activeIndex, setActiveIndex] = useState(0);

  // testimonial holds the currently visible testimonial object
  // updates automatically when activeIndex changes
  const testimonial = testimonials[activeIndex];

  // wrap around — going past last goes to first, before first goes to last
  const handlePrev = () =>
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));

  const handleNext = () =>
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));

  return (
    <section className="min-h-screen scroll-mt-24 px-4 text-center bg-gray-50 dark:bg-gray-900 py-20">
      {/* Section headings */}
      <h2 className="text-lg text-gray-400">Testimonials</h2>
      <h3 className="text-4xl font-bold text-blue-500 mb-12">
        What People Say
      </h3>

      {/* Show only the active testimonial — indexed by activeIndex */}
      <div className="max-w-3xl mx-auto">
        {/* Pass the full testimonial object — card destructures what it needs */}
        <TestimonialCard testimonial={testimonial} />
      </div>

      {/* Arrow buttons — pass handler functions as props */}
      <ArrowNavigation onPrev={handlePrev} onNext={handleNext} />

      {/* Company logos row */}
      <div className="flex flex-wrap justify-center gap-8 mt-16 items-center">
        {companyLogos.map((logo, idx) => (
          // idx used as key — safe here since the array order never changes
          <CompanyLogo key={idx} logo={logo} idx={idx} />
        ))}
      </div>
    </section>
  );
}

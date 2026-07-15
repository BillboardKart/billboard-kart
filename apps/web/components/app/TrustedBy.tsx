"use client";

const brands = [
  "Whole Foods",
  "Marks & Spencer",
  "Carrefour",
  "Aldi",
  "Waitrose",
  "Pepsico",
  "Amazon Fresh",
  "Ocado",
  "HelloFresh",
  "Gousto",
];

// NOTE: REMOVE THIS FILE AS NOT USED

const TrustedBy = () => {
  return (
    <section className="py-16">
      <p className="mb-8 text-center font-body text-[0.65rem] font-medium uppercase tracking-[0.15em] text-text-tertiary">
        Trusted by leading brands & distributors
      </p>
      <div className="overflow-hidden">
        <div className="animate-marquee flex w-max items-center gap-12">
          {[...brands, ...brands].map((brand, i) => (
            <span
              key={i}
              className="whitespace-nowrap font-body text-sm font-light text-text-tertiary opacity-40 transition-opacity hover:opacity-70"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;

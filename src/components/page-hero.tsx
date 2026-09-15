export function PageHero({
  kicker,
  title,
  lede,
  image,
}: {
  kicker?: string;
  title: string;
  lede?: string;
  image?: string;
}) {
  return (
    <section className="relative bg-navy text-cream overflow-hidden">
      {image ? (
        <img
          src={image}
          alt=""
          className="absolute inset-0 size-full object-cover opacity-40"
        />
      ) : null}
      <div className="absolute inset-0 bg-linear-to-t from-navy via-navy/70 to-navy/40" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
        {kicker ? (
          <p className="text-xs uppercase tracking-[0.22em] text-foam mb-3">
            {kicker}
          </p>
        ) : null}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl max-w-3xl">
          {title}
        </h1>
        {lede ? (
          <p className="mt-4 max-w-2xl text-foam/90 text-base sm:text-lg leading-relaxed">
            {lede}
          </p>
        ) : null}
      </div>
    </section>
  );
}

interface SectionTitleProps {
  eyebrow: string;
  title: string;
  description: string;
}

export function SectionTitle({ eyebrow, title, description }: SectionTitleProps) {
  return (
    <div className="mb-8 flex flex-col gap-3 md:mb-10 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-sm uppercase text-cyanx/80">{eyebrow}</p>
        <h2 className="mt-2 text-3xl font-semibold text-white md:text-4xl">{title}</h2>
      </div>
      <p className="max-w-xl text-sm leading-7 text-white/56 md:text-base">{description}</p>
    </div>
  );
}

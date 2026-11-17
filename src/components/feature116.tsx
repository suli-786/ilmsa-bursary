import { ArrowRightIcon, type LucideIcon } from "lucide-react";
import { cn } from "cn";

// shadcnblocks feature116 ("Image bento with gradient hover overlays"), adapted
// for the ILM-SA home page:
//   • demo copy removed; the section's lead paragraph and the tile labels come
//     from the page (client copy is verbatim — no headings or blurbs invented)
//   • tiles use icons instead of photos (user's instruction): white card,
//     coloured icon tile (teal or orange), label, arrow — the whole card is
//     one link; hover lifts the border/tint, arrow nudge only with motion allowed
//   • no pill shapes (user preference); /give's dark 2px focus outline
//   • sits on a light teal band; content width aligned with the site header

type Tone = "teal" | "orange";

interface Tile {
  label: string;
  href: string;
  icon: LucideIcon;
  tone: Tone;
}

interface Feature116Props {
  description: string;
  tiles: Tile[];
  className?: string;
}

const iconTile: Record<Tone, string> = {
  teal: "bg-[var(--brand-primary)] text-white",
  orange: "bg-[var(--brand-secondary)] text-[#0b1d2a]",
};

const Feature116 = ({ description, tiles, className }: Feature116Props) => {
  return (
    <section
      className={cn(
        "border-y border-[color-mix(in_srgb,var(--brand-primary)_28%,white)] bg-[color-mix(in_srgb,var(--brand-primary)_9%,white)] py-14 md:py-20",
        className,
      )}
    >
      <div className="mx-auto max-w-6xl px-4">
        <p className="max-w-3xl border-l-4 border-[var(--brand-secondary)] pl-5 text-lg leading-8 text-pretty text-[#0b1d2a] md:text-xl md:leading-9">
          {description}
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 md:gap-8">
          {tiles.map((tile) => {
            const Icon = tile.icon;
            return (
              <a
                key={tile.href}
                href={tile.href}
                className="group flex items-center gap-5 rounded-2xl border border-[color-mix(in_srgb,var(--brand-primary)_28%,white)] bg-white p-6 shadow-[0_1px_2px_rgba(11,29,42,0.06)] transition-colors hover:border-[var(--brand-primary)] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#0b1d2a] focus-visible:outline-solid md:p-8"
              >
                <span
                  aria-hidden="true"
                  className={cn("flex size-14 shrink-0 items-center justify-center rounded-2xl md:size-16", iconTile[tile.tone])}
                >
                  <Icon className="size-7 md:size-8" />
                </span>
                <span className="flex-1 [font-family:var(--font-heading)] text-2xl leading-tight font-bold text-[#0b1d2a] lg:text-3xl">
                  {tile.label}
                </span>
                <ArrowRightIcon
                  aria-hidden="true"
                  className="size-6 shrink-0 text-[#0b1d2a] motion-safe:transition-transform motion-safe:group-hover:translate-x-1"
                />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export { Feature116 };

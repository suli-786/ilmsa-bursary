import type { LucideIcon } from "lucide-react";
import { cn } from "cn";

// shadcnblocks feature382 ("Split copy and photo collage"), adapted for the
// ILM-SA home page:
//   • demo copy and the badge / CTA buttons removed — all copy comes from the
//     page as props (client copy is verbatim; nothing is invented here)
//   • heading is the page's <h1>; an optional leading part renders in brand
//     teal (bold ≥ 24px, so 3.84:1 passes AA for large text)
//   • items render as icon rows with dividers (same pattern as /apply's rows);
//     icon tiles alternate teal / orange and are decorative
//   • 7/5 column split; on large screens the collage stretches to the text
//     column's height so it doesn't float in white space
//   • collage photos are decorative (alt="") — the list beside them already
//     says what they show
//   • content width aligned with the site header (max-w-6xl px-4)

interface CollageImage {
  src: string;
  alt: string;
  /** Grid placement of the cell, e.g. "row-span-2" or "col-span-2". */
  className?: string;
  /** Classes for the <img> itself, e.g. an object-position. */
  imgClassName?: string;
}

interface Item {
  text: string;
  icon: LucideIcon;
}

interface Feature382Props {
  /** Optional leading part of the heading, shown in brand teal. */
  headingAccent?: string;
  heading: string;
  description: string;
  /** Phrases in `description` that must not break across lines,
   *  e.g. "(065-012-NPO)" — browsers otherwise break after a hyphen. */
  keepTogether?: string[];
  items: Item[];
  /** Collage, 2 columns × 3 rows: [tall left, top right, middle right, wide bottom]. */
  images: CollageImage[];
  className?: string;
}

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Wraps each `keep` phrase in a no-wrap span; the text itself is unchanged. */
const withKeptPhrases = (text: string, keep: string[] = []) => {
  if (keep.length === 0) return text;
  const pattern = new RegExp(`(${keep.map(escapeRegExp).join("|")})`);
  return text.split(pattern).map((part, i) =>
    keep.includes(part) ? (
      <span key={i} className="whitespace-nowrap">
        {part}
      </span>
    ) : (
      part
    ),
  );
};

const tileTone = [
  { bg: "bg-[var(--brand-primary)]", icon: "text-white" },
  { bg: "bg-[var(--brand-secondary)]", icon: "text-[#0b1d2a]" },
];

const divider = "border-[color-mix(in_srgb,var(--brand-primary)_28%,white)]";

const Feature382 = ({
  headingAccent,
  heading,
  description,
  keepTogether,
  items,
  images,
  className,
}: Feature382Props) => {
  return (
    <section className={cn("py-12 md:py-16 lg:py-20", className)}>
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="flex flex-col gap-6 lg:col-span-7">
            <h1 className="[font-family:var(--font-heading)] text-3xl leading-[1.15] font-bold tracking-tight text-balance text-[#0b1d2a] sm:text-4xl lg:text-[2.5rem]">
              {headingAccent && (
                <>
                  <span className="text-[var(--brand-primary)]">{headingAccent}</span>{" "}
                </>
              )}
              {heading}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-pretty text-slate-700">
              {withKeptPhrases(description, keepTogether)}
            </p>
            {/* role="list": Safari drops list semantics when list-style is none */}
            <ul role="list" className={cn("max-w-2xl divide-y border-y", divider, "divide-[color-mix(in_srgb,var(--brand-primary)_28%,white)]")}>
              {items.map((item, i) => {
                const Icon = item.icon;
                const tone = tileTone[i % 2];
                return (
                  <li key={item.text} className="flex items-start gap-4 py-4">
                    <span
                      aria-hidden="true"
                      className={cn("flex size-10 shrink-0 items-center justify-center rounded-xl", tone.bg)}
                    >
                      <Icon className={cn("size-5", tone.icon)} />
                    </span>
                    <span className="pt-1.5 text-base leading-7 text-[#0b1d2a] md:text-[1.0625rem]">
                      {item.text}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="grid h-[460px] grid-cols-2 grid-rows-3 gap-3 sm:h-[560px] lg:col-span-5 lg:h-full lg:min-h-[560px]">
            {images.map((image) => (
              <div
                key={image.src}
                className={cn(
                  "relative overflow-hidden rounded-2xl bg-slate-100",
                  image.className,
                )}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  decoding="async"
                  className={cn(
                    "absolute inset-0 size-full object-cover",
                    image.imgClassName,
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature382 };

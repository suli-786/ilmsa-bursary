import { CheckIcon, type LucideIcon } from "lucide-react";
import { cn } from "cn";
import { CtaLink } from "@/components/cta-link";

// shadcnblocks services3 ("Minimal service rows"), adapted for the ILM-SA site:
//   • demo rows removed — rows (and their copy) come from the page
//   • each row: icon + title on the left; a paragraph and/or a ticked list on
//     the right, separated by thin dividers (stacks on small screens)
//   • row titles are <h2> (the page's <h1> sits in the hero above)
//   • /give styling: Poppins uppercase titles, ink text, teal dividers, icon
//     tiles alternating teal / orange; icons are decorative
//   • optional CtaLink after the last row, aligned with the content column
//   • content width aligned with the site header (max-w-6xl px-4)

type Tone = "teal" | "orange";

interface Row {
  title: string;
  description?: string;
  items?: string[];
  icon: LucideIcon;
  tone: Tone;
}

interface Services3Props {
  rows: Row[];
  /** Optional call-to-action after the last row. */
  cta?: { text: string; href: string };
  className?: string;
}

const tile: Record<Tone, { bg: string; icon: string }> = {
  teal: { bg: "bg-[var(--brand-primary)]", icon: "text-white" },
  orange: { bg: "bg-[var(--brand-secondary)]", icon: "text-[#0b1d2a]" },
};

const divider = "border-[color-mix(in_srgb,var(--brand-primary)_28%,white)]";

const Services3 = ({ rows, cta, className }: Services3Props) => {
  return (
    <section className={cn("py-12 md:py-16", className)}>
      <div className="mx-auto max-w-6xl px-4">
        <div className={cn("border-b", divider)}>
          {rows.map((row) => {
            const Icon = row.icon;
            return (
              <div
                key={row.title}
                className={cn(
                  "grid gap-4 border-t py-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-12 md:py-10",
                  divider,
                )}
              >
                <div className="flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className={cn("flex size-10 shrink-0 items-center justify-center rounded-xl", tile[row.tone].bg)}
                  >
                    <Icon className={cn("size-5", tile[row.tone].icon)} />
                  </span>
                  <h2 className="pt-1.5 [font-family:var(--font-heading)] text-xl leading-tight font-bold tracking-[0.04em] text-balance text-[#0b1d2a] uppercase md:text-[1.375rem]">
                    {row.title}
                  </h2>
                </div>
                <div className="flex flex-col gap-4 md:pt-1">
                  {row.description && (
                    <p className="text-base leading-7 text-[#0b1d2a] md:text-lg md:leading-8">
                      {row.description}
                    </p>
                  )}
                  {row.items && row.items.length > 0 && (
                    // role="list": Safari drops list semantics when list-style is none
                    <ul role="list" className="flex flex-col gap-3">
                      {row.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-base leading-7 text-[#0b1d2a] md:text-lg md:leading-8"
                        >
                          <CheckIcon
                            aria-hidden="true"
                            className="mt-1.5 size-4 shrink-0 text-[var(--brand-primary)] md:mt-2"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {cta && (
          <div className="pt-10 md:grid md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-12">
            <CtaLink text={cta.text} href={cta.href} className="md:col-start-2 md:justify-self-start" />
          </div>
        )}
      </div>
    </section>
  );
};

export { Services3 };

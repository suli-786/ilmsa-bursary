import { cn } from "cn";
import { CtaLink } from "@/components/cta-link";

// shadcnblocks hero185 ("Split hero with bento photo grid"), adapted for the
// ILM-SA site:
//   • demo copy removed — all copy comes from the page; the original pair of
//     buttons is replaced by one optional CtaLink (rectangular, no pill)
//   • label is an overline (teal rule + ink uppercase text — no pill, per the
//     user; white on teal would fail AA at this size); Poppins heading
//   • content width aligned with the site header (max-w-6xl px-4)
//   • photos are decorative by default (alt="") — pass alt text if a photo
//     carries information the copy doesn't

interface HeroImage {
  src: string;
  alt: string;
  /** Classes for the <img>, e.g. an object-position. */
  className?: string;
}

interface Hero185Props {
  label?: string;
  heading: string;
  description: string;
  /** Optional call-to-action under the description. */
  cta?: { text: string; href: string };
  /** [tall left tile, top-right tile, bottom-right tile] */
  images: [HeroImage, HeroImage, HeroImage];
  className?: string;
}

const tile = "overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--brand-primary)_28%,white)] bg-slate-100";

const Hero185 = ({ label, heading, description, cta, images, className }: Hero185Props) => {
  const [tall, top, bottom] = images;
  return (
    <section className={cn("py-12 md:py-16 lg:py-20", className)}>
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-6">
            {label && (
              <p className="flex items-center gap-3 text-[0.8125rem] font-semibold tracking-[0.22em] text-[#0b1d2a] uppercase">
                <span aria-hidden="true" className="h-0.5 w-8 bg-[var(--brand-primary)]" />
                {label}
              </p>
            )}
            <h1 className="[font-family:var(--font-heading)] text-3xl leading-tight font-bold tracking-tight text-balance text-[#0b1d2a] sm:text-4xl lg:text-[2.625rem]">
              {heading}
            </h1>
            <p className="max-w-xl text-lg leading-8 text-pretty text-slate-700">
              {description}
            </p>
            {cta && <CtaLink text={cta.text} href={cta.href} className="self-start" />}
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className={cn("row-span-2", tile)}>
              <img
                src={tall.src}
                alt={tall.alt}
                decoding="async"
                className={cn(
                  "size-full min-h-64 object-cover object-center sm:min-h-80 lg:h-full lg:min-h-0",
                  tall.className,
                )}
              />
            </div>
            <div className={cn("aspect-4/3", tile)}>
              <img
                src={top.src}
                alt={top.alt}
                decoding="async"
                className={cn("size-full object-cover object-center", top.className)}
              />
            </div>
            <div className={cn("aspect-4/3", tile)}>
              <img
                src={bottom.src}
                alt={bottom.alt}
                decoding="async"
                className={cn("size-full object-cover object-center", bottom.className)}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero185 };

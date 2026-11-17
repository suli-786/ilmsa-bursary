import { ArrowUpRightIcon } from "lucide-react";
import { cn } from "cn";

// Primary call-to-action link used by the adapted shadcnblocks blocks.
//   • rectangular (rounded-lg) — no pill shapes (user preference)
//   • brand orange with ink text: ≈ 9:1 contrast (white on orange would be 2.3:1)
//   • /give's dark 2px focus outline
//   • the ↗ icon signals the link leaves the site (e.g. the JotForm application);
//     it is decorative — the visible text is the accessible name

interface CtaLinkProps {
  text: string;
  href: string;
  className?: string;
}

const CtaLink = ({ text, href, className }: CtaLinkProps) => (
  <a
    href={href}
    className={cn(
      "group inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[var(--brand-secondary)] px-6 py-3 text-base font-semibold text-[#0b1d2a] shadow-[0_1px_2px_rgba(11,29,42,0.12)] transition-colors hover:bg-[color-mix(in_srgb,var(--brand-secondary)_85%,black)] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#0b1d2a] focus-visible:outline-solid",
      className,
    )}
  >
    {text}
    <ArrowUpRightIcon
      aria-hidden="true"
      className="size-5 shrink-0 motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
    />
  </a>
);

export { CtaLink };

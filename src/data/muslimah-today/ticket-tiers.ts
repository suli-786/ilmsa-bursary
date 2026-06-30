/**
 * ticket-tiers.ts — ticket pricing (build-docs/01-content.md §2). The Tickets
 * section is the scannable centrepiece: price + early-bird deadline must read at a
 * glance, so the featured card carries the big number and the rest are rows.
 * `variant` selects featured card vs list row.
 *
 * All figures/dates are VERBATIM. The booking/sponsored URLs, the WhatsApp number
 * and the sales-close date live in event.ts (single source). `earlyBirdVerbatim`
 * preserves the brief's exact early-bird wording for the inclusions caption.
 */

export interface TicketTier {
  id: string;
  variant: "featured" | "row";
  label: string;
  /** Price glance-target, e.g. "R250"; empty for the apply-only sponsored tier. */
  price: string;
  /** Featured: early-bird deadline, e.g. "until 31 July". */
  priceNote?: string;
  /** Featured: post-deadline price, e.g. "then R320". */
  secondary?: string;
  /** Featured: what the ticket includes. */
  inclusions?: string[];
  /** Row sub-line (verbatim fine print where the brief specifies it). */
  note?: string;
  /** Row action → wired in B6 (kind drives WhatsApp vs the MTSP2026 apply link). */
  action?: { kind: "whatsapp" | "apply"; label: string };
}

export const ticketTiers: TicketTier[] = [
  {
    id: "early-bird",
    variant: "featured",
    label: "Early bird",
    price: "R250",
    priceNote: "until 31 July",
    secondary: "then R320",
    inclusions: ["lunch", "refreshments", "goodie bag"],
  },
  {
    id: "standard",
    variant: "row",
    label: "Standard",
    price: "R320",
    note: "from 1 Aug",
  },
  {
    id: "pensioner-student",
    variant: "row",
    label: "Pensioners & students",
    price: "R220",
    action: { kind: "whatsapp", label: "WhatsApp 083 271 4500" },
    note: "documents proving eligibility will be required",
  },
  {
    id: "sponsored",
    variant: "row",
    label: "Sponsored",
    price: "",
    action: { kind: "apply", label: "apply" },
    note: "Sponsored ticket applications close on the 11th of August or until we reach our quota of 100 (whichever occurs first).",
  },
];

/** Brief's exact early-bird wording — used as the featured card's inclusions caption. */
export const earlyBirdVerbatim =
  "R250 until the 31st of July; thereafter R320 (includes lunch, refreshments and a goodie bag).";

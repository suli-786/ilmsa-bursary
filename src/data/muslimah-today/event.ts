/**
 * event.ts — single-instance Muslimah Today facts & links (date, venue, socials,
 * attribution, booking URLs). Copy is VERBATIM from build-docs/01-content.md
 * §1/§2/§6 — one source for these facts, no duplicated strings or URLs.
 *
 * The Quicket booking page and the sponsored-ticket Google Form are LIVE
 * (direct URLs supplied by the client 2026-07-07; the former ilmsa.co.za/MT2026
 * and /MTSP2026 wrapper links were never activated).
 */

export interface Social {
  platform: "Facebook" | "Instagram" | "WhatsApp";
  handle: string;
  url: string;
  /** Optional display text shown instead of the handle (e.g. a call to action). */
  label?: string;
}

export const event = {
  name: "Muslimah Today",
  edition: "2026",
  /** Hero title — verbatim (rendered uppercase via CSS). */
  title: "13th ANNUAL WOMEN'S CONFERENCE",
  /** Tagline words — verbatim 3-word version (NOT the flyer's 4); joined with " · " in the UI. */
  tagline: ["Sisterhood", "Inspiration", "Spiritual Upliftment"],

  /** Date / time — verbatim, including the spelling "in sha Allah". */
  date: "Saturday, 29th August 2026",
  time: "9am to 4.30pm",
  inshaAllah: "in sha Allah",
  dateTimeFull: "Saturday, 29th August 2026, 9am to 4.30pm in sha Allah",

  venue: "NMJ Islamic Centre, Durban",
  mapsUrl: "https://maps.app.goo.gl/GhgJAQSFquFEftqX9",

  /** Lowest advertised price — for the hero "Tickets from R250 ›" link. */
  ticketsFrom: "R250",
  /** Ticket sales close — verbatim. */
  salesClose: "Wednesday 26th August",

  links: {
    /** Book → Quicket event page (live, client-supplied 2026-07-07). */
    book: { url: "https://www.quicket.co.za/events/384264-muslimah-today-2026/", live: true as boolean },
    /** Sponsored-ticket application form (live, client-supplied 2026-07-07). */
    sponsored: { url: "https://forms.gle/Zbk4cY7K5FA9rv5f9", live: true as boolean },
    /** Pensioner/student booking via WhatsApp. */
    whatsappBooking: { display: "083 271 4500", url: "https://wa.me/27832714500" },
  },

  socials: [
    { platform: "Facebook", handle: "ILM.SouthAfrica", url: "https://www.facebook.com/ILM.SouthAfrica" },
    { platform: "Instagram", handle: "ilmsouthafrica", url: "https://www.instagram.com/ilmsouthafrica" },
    { platform: "WhatsApp", handle: "ilmsa.co.za/WA", url: "https://www.ilmsa.co.za/WA", label: "Join our WhatsApp group" },
  ] satisfies Social[],

  /** Footer "brought to you by" attribution — verbatim §6 (logos rendered by the component). */
  attribution: {
    lead: "Muslimah Today is brought to you by",
    division: "a division of",
    conjunction: "In conjunction with:",
    org: "ILM for Women",
    parent: "ILM-SA",
  },
} as const;

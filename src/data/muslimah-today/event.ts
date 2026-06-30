/**
 * event.ts — single-instance Muslimah Today facts & links (hero, footer, CTAs).
 * Copy is VERBATIM from build-docs/01-content.md §1/§2/§6. [OURS] central module so
 * every section/CTA reads one source (no duplicated strings or URLs). Repeated
 * content (speakers, testimonials, sponsors, tickets, gallery) lives in its own
 * module per design/03 §3.
 *
 * M5: the Quicket "Book" page (MT2026) and the sponsored-ticket form (MTSP2026)
 * are not created yet → `live: false`; CTAs render disabled ("Booking opens soon")
 * with the URL wired so they activate when Raeesah links them (B6).
 */

export interface Social {
  platform: "Facebook" | "Instagram" | "WhatsApp";
  handle: string;
  url: string;
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
    /** Book → Quicket page (M5: not live yet). */
    book: { url: "https://www.ilmsa.co.za/MT2026", live: false as boolean },
    /** Sponsored-ticket application form (M5: not live yet). */
    sponsored: { url: "https://www.ilmsa.co.za/MTSP2026", live: false as boolean },
    /** Pensioner/student booking via WhatsApp. */
    whatsappBooking: { display: "083 271 4500", url: "https://wa.me/27832714500" },
  },

  socials: [
    { platform: "Facebook", handle: "ILM.SouthAfrica", url: "https://www.facebook.com/ILM.SouthAfrica" },
    { platform: "Instagram", handle: "ilmsouthafrica", url: "https://www.instagram.com/ilmsouthafrica" },
    { platform: "WhatsApp", handle: "ilmsa.co.za/WA", url: "https://www.ilmsa.co.za/WA" },
  ] satisfies Social[],

  /** Footer "brought to you by" attribution — verbatim §6 (logos rendered by the component). */
  attribution: {
    lead: "Muslimah Today is brought to you by",
    division: "a division of",
    org: "ILM for Women",
    parent: "ILM-SA",
  },
} as const;

export type Event = typeof event;

/**
 * sponsors.ts — sponsors in 3 tiers (build-docs/01-content.md §6, do NOT model the
 * flyer layout). `logo` = filename in src/assets/muslimah-today/logos/ (glob-
 * resolved into a white chip by SponsorChip).
 *
 * - Primary: Polygon (largest, own centred row).
 * - Media Partners: Tabloid · The Weekly Gazette · Radio Al-Ansaar — display names
 *   are [OPEN] (not finalised by the client); shown as listed meanwhile.
 * - Sponsors: the rest. ⚠ +2 more may be added (client-pending) → they drop into
 *   the array with zero layout change; no redesign.
 */

export interface Sponsor {
  name: string;
  logo: string;
  /** Display name pending final client confirmation (media partners — [OPEN]). */
  displayNameOpen?: boolean;
}

/** Primary sponsor — top tier, rendered largest. */
export const primarySponsor: Sponsor = {
  name: "Polygon",
  logo: "sponsor-polygon.png",
};

/** Media partners — display names [OPEN] (to confirm). */
export const mediaPartners: Sponsor[] = [
  { name: "Tabloid", logo: "media-tabloid.png", displayNameOpen: true },
  { name: "The Weekly Gazette", logo: "media-weekly-gazette.png", displayNameOpen: true },
  { name: "Radio Al-Ansaar", logo: "media-radio-al-ansaar.png", displayNameOpen: true },
];

/** Sponsors — extensible list (+2 client-pending). */
export const sponsors: Sponsor[] = [
  { name: "Osmans Taj Mahal", logo: "sponsor-osmans.png" },
  { name: "Impress", logo: "sponsor-impress.png" },
  { name: "RVBD", logo: "sponsor-rvbd.png" },
  { name: "SASOL", logo: "sponsor-sasol.png" },
  { name: "Arctic Amanzi", logo: "sponsor-arctic.png" },
  { name: "NMJ", logo: "sponsor-nmj.png" },
  { name: "Pastry Shack", logo: "sponsor-pastry-shack.png" },
  { name: "TLB", logo: "sponsor-tlb.png" },
  { name: "Luxe", logo: "sponsor-luxe.png" },
  { name: "GQ Tissue", logo: "sponsor-gq-tissue.png" },
  { name: "Willowton Group", logo: "sponsor-willowton-group.png" },
  { name: "Cellular Citi", logo: "sponsor-cellular-citi.png" },
];

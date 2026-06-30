/**
 * about.ts — the single About paragraph (design/03 §3), VERBATIM from
 * 01-content.md §3. Not a repeated block, but kept in data (not inlined in the
 * component) so all MT copy lives in src/data/muslimah-today/* and is proofed in one
 * place. Includes the past-speakers sentence — Naledi Pandor (twice), Dr Imtiaz
 * Sooliman, Na'ima B. Robert, Amina Kathree Jamal — and `ILM-SA` in straight quotes
 * exactly as the source. `eyebrow`/`heading` are structural section labels (not copy
 * from §3; a section title, per design/03 §3 "About Muslimah Today").
 */
export const about = {
  eyebrow: "About",
  heading: "About Muslimah Today",
  body: `Muslimah Today is an annual conference hosted by ILM for Women, a division of the Durban-based charity, Institute for Learning and Motivation - South Africa (better known as "ILM-SA"). Now in its thirteenth year, it is an eagerly anticipated event on the Durban calendar, attracting a broad spectrum of women who come together for a day of sisterhood, inspiration, motivation and education. Income generation is not an objective of the event and attendees purchase tickets for a nominal fee, or are given sponsored tickets if they cannot afford to purchase, making this a non-elitist event with a strong focus on strengthening the ties of sisterhood within the community. Past speakers have included: Naledi Pandor (twice), Dr Imtiaz Sooliman, Na'ima B. Robert, Amina Kathree Jamal and numerous others.`,
} as const;

export type About = typeof about;

/**
 * gallery.ts — curated past-event photos (A4; design/03 §6). Photos only —
 * NO flyers, NO video. `image` = filename in src/assets/muslimah-today/past-events/
 * (glob-resolved; Astro <Image> with responsive srcset + lazy-load in the section).
 *
 * `alt` is descriptive (accessibility), not marketing copy. Captions are
 * intentionally OMITTED — 01-content.md provides none and we do not invent copy
 * ([OPEN] captions: none in source).
 */

export interface GalleryImage {
  image: string;
  alt: string;
}

export const gallery: GalleryImage[] = [
  { image: "gallery-welcome-arch.jpg", alt: "Guests arriving beneath the welcome arch at a past Muslimah Today conference" },
  { image: "gallery-audience.jpg", alt: "Delegates seated in the audience at a past Muslimah Today conference" },
  { image: "gallery-speaker.jpg", alt: "A speaker addressing the audience at a past Muslimah Today conference" },
  { image: "gallery-embrace.jpg", alt: "Two attendees embracing at a past Muslimah Today conference" },
  { image: "gallery-group-vibrant.jpg", alt: "Attendees gathered together at a past Muslimah Today conference" },
  { image: "gallery-venue.jpg", alt: "The conference venue set up for a past Muslimah Today event" },
  { image: "gallery-goodie-bag.jpg", alt: "Goodie bag and gifts from a past Muslimah Today conference" },
  { image: "gallery-group-elegant.jpg", alt: "A group of delegates at a past Muslimah Today conference" },
];

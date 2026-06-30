/**
 * testimonials.ts — the 5 text testimonials.
 * Copy VERBATIM from build-docs/01-content.md §5 (the surrounding quotation marks
 * are supplied by the card's quote-glyph, so the quote text is stored unwrapped;
 * en-dashes and apostrophes are kept exactly). Clare's 2022/2023 references are
 * kept as-is; testimonial "Fathima" is a DIFFERENT person/spelling from speaker
 * "Fatima Asmal".
 *
 * Naledi's is lightly featured (design/03 §5) with an optional companion portrait
 * (`image` = filename in src/assets/muslimah-today/past-events/, glob-resolved).
 */

export interface Testimonial {
  quote: string;
  author: string;
  /** Attribution note, e.g. "2025 Speaker". */
  note?: string;
  featured?: boolean;
  image?: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "I think it was very well organised. All the speakers were excellent. There were so many educational contributions – a lot of learning about the ummah, the Qur'an, our own understanding of our faith so I found it valuable. What I thought was very important was that women had a voice in this space and they felt comfortable to speak up and that was really wonderful because often women don't get that public space, so I loved that about this conference and I congratulate the team for putting together an illustrious set of speakers – entertaining, educational, amusing. It had all the ingredients.",
    author: "Naledi Pandor",
    note: "2025 Speaker",
    featured: true,
    image: "past-event-naledi.jpg",
  },
  {
    quote:
      "As a new revert, due to Muslimah Today, I have found a sense of belonging in Islam, I have found my path, I found good friends, I felt inspired, I was touched by the experience of such motivational speakers – to this day, their words have been cemented in my mind. I'm grateful for the opportunity of having attended in 2022 and I can't wait to see what 2023 holds! Because of such a motivational event, I was inspired to join ILM-SA as a volunteer and I'm so thankful for this opportunity that Allah has blessed me with.",
    author: "Clare",
  },
  {
    quote:
      "I have to say what a classy event – kudos to the organisers who pulled off this remarkable function. Loved the presentations – the food was wow, and the lovely gifts as well. The speakers were fantastic. We take back a lot from women empowering women.",
    author: "Zee",
  },
  {
    quote:
      "What a wonderful conference. All the speakers were brilliant. Muslimah Today is always the highlight of the year.",
    author: "Fahmida",
  },
  {
    quote:
      "Incredible – I felt truly revived and spiritually uplifted by the inspiring talks and warm atmosphere. All the speakers were fantastic. I have been attending Muslimah Today every year and each time, I leave feeling enlightened and eager to return. Thank you once again for an unforgettable experience.",
    author: "Fathima",
  },
];

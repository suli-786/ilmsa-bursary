/**
 * speakers.ts — speaker line-up + the joint session.
 * Copy VERBATIM from build-docs/01-content.md §4. Display order is D4/D24:
 * Ebrahim Rasool → Rosieda Shabodien → [joint session block] → Fatima Asmal →
 * Adam Deane → Aisha Kilumbilo → Shubnum Khan → Zohra Sooliman.
 *
 * `variant` selects the frame (design/02 + design/03 §4): the two headliners use
 * the arch "niche"; everyone else the circular speaker card. One component loops
 * this array (the joint band is inserted after the two niche speakers).
 *
 * `image` is the processed tile's filename in src/assets/muslimah-today/speakers/
 * (A2/A2b — subject on the D26 gradient; the circle/arch mask + ring are applied
 * in CSS at build). The component resolves it via import.meta.glob.
 */

export interface Speaker {
  name: string;
  topic: string;
  bio: string;
  variant: "niche" | "circle";
  image: string;
  /** Also appears in the joint interactive session. */
  jointSession?: boolean;
}

export const speakers: Speaker[] = [
  {
    name: "Ebrahim Rasool",
    topic: "Standing Firm: When your convictions cost you everything",
    bio: "Ebrahim holds an arts degree from the University of Cape Town, Honorary Doctorates from Roosevelt and Chatham Universities, and is a Senior Fellow at Georgetown and Rutgers Universities. A veteran of the anti-apartheid struggle, his convictions cost him his job, imprisonment, and years living underground. He worked alongside Nelson Mandela during South Africa's transition to democracy, engaging religious communities and laying groundwork for negotiations. He later served as Premier of the Western Cape and twice as South Africa's Ambassador to the USA — the second time ending when the Trump administration declared him persona non grata for condemning supremacist policies.",
    variant: "niche",
    image: "speaker-ebrahim-rasool.jpg",
    jointSession: true,
  },
  {
    name: "Rosieda Shabodien",
    topic: "Knowing your value as a Muslim woman",
    bio: "Rosieda is a human rights advocate, gender activist and life coach who has spent decades working at the intersection of women's empowerment and social justice. Born in the Cape Flats during apartheid, she began her activism at fourteen and went on to play a pivotal role in developing gender equality legislation in South Africa. She has held leadership roles across human rights and women's advocacy organisations, including serving as head of the Commission for Gender Equality. The CEO of Actualize and Success Lab, Rosieda holds a Master's in Management Coaching from Stellenbosch University and is the author of What Women Want Coaches to Know.",
    variant: "niche",
    image: "speaker-rosieda-shabodien.jpg",
    jointSession: true,
  },
  {
    name: "Fatima Asmal",
    topic: "The greatest love of all",
    bio: "Fatima is the founder of the Institute for Learning and Motivation - South Africa (ILM-SA), a Durban-based charity engaged in numerous socio-economic upliftment and educational projects. As a freelance journalist, she wrote articles for amongst others, the Mail & Guardian, as well as presented various radio and television programs on community-based platforms. In her early twenties, she founded two Islamic publications - An-Nisaa and The Straight Path. A single mum, Fatima is passionate about studying Islam and has attended numerous Islamic studies seminars. She is currently a Qur'anic Arabic student.",
    variant: "circle",
    image: "speaker-fatima-asmal.jpg",
  },
  {
    name: "Adam Deane",
    topic: "Be prepared: Personal safety for women",
    bio: "Adam is a Human Behaviour and Capability Strategist with over 20 years of experience in strategy, communication, security and community leadership. A PSIRA-registered security professional and active community policing member, Adam and his partner Ridhwaan run Aegis Elite which specialises in defensive firearm and fitness training for civilians. Recognised as a pioneer of Calisthenics in South Africa, he is a passionate advocate for physical capability and real-world resilience. As a father and community leader, he brings a unique, grounded perspective on human behaviour, personal safety, and building stronger, more resilient communities through discipline, purpose and service.",
    variant: "circle",
    image: "speaker-adam-deane.jpg",
  },
  {
    name: "Aisha Kilumbilo",
    topic: "Words of Inspiration: Spoken word poetry",
    bio: "Aisha is a multi-disciplinary professional and creative who blends strategy with heart. Armed with a BTech in Human Resources and a BCom Honours in Marketing, she spent a decade in the corporate world before transitioning into freelance and advocacy work. She channels her skillset into community, art and cultural empowerment as a member of the Palestine House management team, a board member for the Nanda Sooben Art and Education Foundation, and a director of Wage Peace International. A mum of two daughters and a passionate poet, Aisha is also part of the planning committee for the The Tha'alabah Sisterhood and a co-writer and editor of the Womandla women's writing collection.",
    variant: "circle",
    image: "speaker-aisha-kilumbilo.jpg",
  },
  {
    name: "Shubnum Khan",
    topic: "Blood, sweat and tears: My journey as a writer",
    bio: "Shubnum is a South African author and artist. Her latest novel, The Lost Love of Akbar Manzil is a USA Today bestseller, a New York Times Editor's Choice and was named Best Books Of 2024 by NPR. She is the first Indian woman to win South Africa's most prestigious literary award, the Sunday Times Literary Award for fiction and she has also won the University of Johannesburg Main Prize and the HSS Award for Best Novel. She is a board member at Imbiza Journal for African Writing and a mentor at Led By Foundation which focuses on developing Muslim women's career skills in India. Her writing has appeared in The New York Times, McSweeney's Quarterly Concern, HuffPost, O the Oprah Magazine amongst others.",
    variant: "circle",
    image: "speaker-shubnum-khan.jpg",
  },
  {
    name: "Zohra Sooliman",
    topic: "Trauma interventions for the children of Gaza",
    bio: "Zohra is the co-founder of Gift of the Givers Foundation. A Counselling Psychologist with a Master's degree from the University of KwaZulu-Natal, she established the Gift of the Givers Careline — a counselling service supporting individuals and communities through various challenges — in 1997. Her work spans trauma support, community capacity building and psychological intervention. A recipient of numerous awards, including the Living Legends Award from the Ethekwini Municipality and Office of the Premier, and the Congress of Business and Economics Women's Excellence in Leadership Award (2025), Zohra is a mother of five and grandmother of ten.",
    variant: "circle",
    image: "speaker-zohra-sooliman.jpg",
  },
];

/**
 * Joint interactive session — Ebrahim & Rosieda. Featured band placed immediately
 * after the two headliners, before Fatima (D24). `title` keeps the brief's doubled
 * quotes verbatim.
 */
export const jointSession = {
  eyebrow: "JOINT · INTERACTIVE SESSION",
  title: '"Love, Deen and Life: an honest conversation about marriage and family"',
  speakers: ["Ebrahim Rasool", "Rosieda Shabodien"],
} as const;

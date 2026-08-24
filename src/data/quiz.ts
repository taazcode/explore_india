/**
 * The question bank behind the Quests page.
 *
 * Hand-written cultural questions live in `BANK`; capital-city and phrase
 * questions are generated from data/allStates.ts and data/phrases.ts so those
 * packs stay in sync with the rest of the app automatically.
 */
import { allStates } from "./allStates";
import { languages, SLOT_LABELS } from "./phrases";

export type Category =
  | "food"
  | "festival"
  | "dance"
  | "places"
  | "language"
  | "nature"
  | "craft";

export type Question = {
  id: string;
  prompt: string;
  options: string[];
  /** Index into `options`. */
  answer: number;
  explain: string;
  category: Category;
  /** Which state pack this belongs to, if any. */
  state?: string;
};

export const CATEGORY_LABEL: Record<Category, string> = {
  food: "Food",
  festival: "Festivals",
  dance: "Dance & music",
  places: "Places",
  language: "Languages",
  nature: "Nature",
  craft: "Crafts",
};

const BANK: Question[] = [
  { id: "q1", category: "food", state: "Rajasthan", prompt: "Which dish is the signature plate of Rajasthan?", options: ["Dal Baati Churma", "Masor Tenga", "Appam & stew", "Litti Chokha"], answer: 0, explain: "Baked wheat baatis cracked open over ghee, with dal and sweet churma — the classic Rajasthani thali." },
  { id: "q2", category: "dance", state: "Rajasthan", prompt: "Ghoomar, danced in wide spinning skirts, comes from which state?", options: ["Gujarat", "Rajasthan", "Punjab", "Odisha"], answer: 1, explain: "Ghoomar takes its name from ghoomna, to twirl — the skirt's flare is the whole point of the dance." },
  { id: "q3", category: "festival", state: "Assam", prompt: "Rongali Bihu marks the new year in which state?", options: ["Tripura", "West Bengal", "Assam", "Manipur"], answer: 2, explain: "Rongali (or Bohag) Bihu arrives in mid-April with husori singing, dhol and a week of feasting." },
  { id: "q4", category: "nature", state: "Assam", prompt: "Kaziranga National Park is best known for protecting which animal?", options: ["Asiatic lion", "One-horned rhinoceros", "Snow leopard", "Nilgiri tahr"], answer: 1, explain: "Kaziranga holds roughly two-thirds of the world's wild one-horned rhinos." },
  { id: "q5", category: "places", state: "Rajasthan", prompt: "The honeycomb façade of Hawa Mahal stands in which city?", options: ["Jodhpur", "Udaipur", "Bikaner", "Jaipur"], answer: 3, explain: "953 latticed windows let royal women watch the street below unseen — and kept the palace cool." },
  { id: "q6", category: "places", state: "Tripura", prompt: "The Unakoti rock-cut carvings are found in which state?", options: ["Tripura", "Odisha", "Karnataka", "Bihar"], answer: 0, explain: "A hillside of giant Shiva faces carved straight into the rock, wrapped in waterfalls and forest." },
  { id: "q7", category: "nature", state: "Assam", prompt: "Majuli, among the world's largest river islands, sits on which river?", options: ["Ganga", "Brahmaputra", "Godavari", "Teesta"], answer: 1, explain: "Majuli's satras — Vaishnavite monasteries — have shaped Assamese art and dance for 500 years." },
  { id: "q8", category: "festival", state: "Rajasthan", prompt: "Which Rajasthan fair fills a desert town with camels, folk music and pilgrims?", options: ["Sonepur Mela", "Pushkar Fair", "Surajkund Mela", "Hemis Festival"], answer: 1, explain: "The Pushkar Fair pairs a livestock market with a sacred lake bathing pilgrimage each Kartik month." },
  { id: "q9", category: "dance", prompt: "Kathakali, with its towering green make-up, is the classical dance of which state?", options: ["Tamil Nadu", "Karnataka", "Kerala", "Andhra Pradesh"], answer: 2, explain: "A single Kathakali face can take four hours to paint before the performer steps on stage." },
  { id: "q10", category: "places", prompt: "The Golden Temple stands in which city?", options: ["Amritsar", "Ludhiana", "Patiala", "Jalandhar"], answer: 0, explain: "Its langar kitchen serves free meals to tens of thousands of visitors every single day." },
  { id: "q11", category: "places", prompt: "Which state is called the Land of Five Rivers?", options: ["Haryana", "Punjab", "Uttarakhand", "Bihar"], answer: 1, explain: "Panj-aab: the Jhelum, Chenab, Ravi, Beas and Sutlej." },
  { id: "q12", category: "dance", state: "Assam", prompt: "Which state gave India the Sattriya classical dance?", options: ["Manipur", "Assam", "Odisha", "Sikkim"], answer: 1, explain: "Created by the saint Srimanta Sankardev inside Assam's satras, and recognised as classical in 2000." },
  { id: "q13", category: "places", state: "Tripura", prompt: "Neermahal, a palace built in the middle of a lake, is in which state?", options: ["Rajasthan", "Kerala", "Tripura", "Madhya Pradesh"], answer: 2, explain: "Tripura's royal summer palace sits in Rudrasagar Lake, reached only by boat." },
  { id: "q14", category: "food", prompt: "Which city is most famous for its layered dum biryani?", options: ["Lucknow", "Hyderabad", "Kolkata", "Bhopal"], answer: 1, explain: "Hyderabadi dum biryani seals rice and marinated meat under dough and cooks them together." },
  { id: "q15", category: "places", prompt: "The Konark Sun Temple, shaped like a chariot, is in which state?", options: ["Odisha", "West Bengal", "Bihar", "Jharkhand"], answer: 0, explain: "Twenty-four carved stone wheels double as sundials that still tell the time." },
  { id: "q16", category: "festival", prompt: "Which state hosts the Hornbill Festival every December?", options: ["Mizoram", "Nagaland", "Meghalaya", "Arunachal Pradesh"], answer: 1, explain: "Sixteen Naga tribes gather at Kisama for a week of music, wrestling and shared food." },
  { id: "q17", category: "nature", prompt: "Living root bridges, grown from rubber-tree roots, are found in which state?", options: ["Sikkim", "Meghalaya", "Kerala", "Manipur"], answer: 1, explain: "Khasi and Jaintia communities train the roots across streams over 15–30 years." },
  { id: "q18", category: "craft", state: "Assam", prompt: "Muga, a naturally golden silk, is woven only in which state?", options: ["West Bengal", "Assam", "Karnataka", "Bihar"], answer: 1, explain: "Muga's golden sheen deepens with every wash, which is why it is passed down generations." },
  { id: "q19", category: "craft", state: "Rajasthan", prompt: "Bandhani is which kind of craft?", options: ["Tie-dye", "Wood carving", "Metal inlay", "Palm-leaf writing"], answer: 0, explain: "Thousands of tiny knots are tied by hand before dyeing, leaving a field of dots." },
  { id: "q20", category: "craft", state: "Rajasthan", prompt: "Blue Pottery, glazed and fired without clay, is a craft of which city?", options: ["Jaipur", "Khurja", "Kutch", "Kolkata"], answer: 0, explain: "It uses quartz powder rather than clay — the cobalt blue came to Jaipur via Persia." },
  { id: "q21", category: "dance", prompt: "Cheraw, danced between clapping bamboo poles, belongs to which state?", options: ["Mizoram", "Tripura", "Nagaland", "Manipur"], answer: 0, explain: "Dancers step between poles struck in rhythm — a slip is the whole thrill of watching it." },
  { id: "q22", category: "dance", prompt: "Bharatanatyam originates in which state?", options: ["Kerala", "Karnataka", "Tamil Nadu", "Telangana"], answer: 2, explain: "Its geometry — bent knees, square shoulders — echoes the temple sculpture it grew beside." },
  { id: "q23", category: "language", state: "Rajasthan", prompt: "What does the Rajasthani greeting 'Khamma Ghani' express?", options: ["Good night", "A respectful hello and blessing", "Safe travels", "Thank you for the food"], answer: 1, explain: "Literally 'many pardons' — it works as hello, respect and blessing all at once." },
  { id: "q24", category: "language", state: "Assam", prompt: "'Nomoskar' would greet someone in which language?", options: ["Tamil", "Assamese", "Gujarati", "Kannada"], answer: 1, explain: "Assamese and Bengali share this greeting, and share a script too." },
  { id: "q25", category: "food", state: "Rajasthan", prompt: "Laal Maas is a fiery meat curry from which state?", options: ["Punjab", "Rajasthan", "Kashmir", "Telangana"], answer: 1, explain: "Its heat and colour come from Mathania chillies, tempered with plenty of yoghurt." },
  { id: "q26", category: "food", state: "Assam", prompt: "Masor Tenga, a tangy fish curry, belongs to which cuisine?", options: ["Assamese", "Odia", "Konkani", "Bengali"], answer: 0, explain: "Soured with tomato, elephant apple or lemon — light enough for a hot Assam afternoon." },
  { id: "q27", category: "food", state: "Tripura", prompt: "Mui Borok is the traditional cuisine of which state?", options: ["Manipur", "Tripura", "Meghalaya", "Sikkim"], answer: 1, explain: "Built around berma, a fermented fish that gives Tripuri food its depth." },
  { id: "q28", category: "places", state: "Rajasthan", prompt: "Which Rajasthan fort is known as the Golden Fort?", options: ["Mehrangarh", "Amber Fort", "Jaisalmer Fort", "Chittorgarh"], answer: 2, explain: "Its yellow sandstone glows at sunset — and thousands of people still live inside it." },
  { id: "q29", category: "places", state: "Assam", prompt: "The Kamakhya Temple overlooks which city?", options: ["Dibrugarh", "Guwahati", "Silchar", "Jorhat"], answer: 1, explain: "Perched on Nilachal Hill, it draws lakhs of pilgrims during the Ambubachi Mela." },
  { id: "q30", category: "food", state: "Rajasthan", prompt: "The honeycomb sweet Ghevar is most associated with which festival?", options: ["Teej", "Onam", "Pongal", "Lohri"], answer: 0, explain: "Monsoon Teej in Rajasthan is unthinkable without a plate of syrup-soaked ghevar." },
  { id: "q31", category: "craft", state: "Assam", prompt: "What is a 'japi'?", options: ["A bamboo sun hat", "A brass water pot", "A woven shawl", "A river boat"], answer: 0, explain: "Once a farmer's sunshade, the decorated japi is now Assam's welcome symbol." },
  { id: "q32", category: "craft", state: "Rajasthan", prompt: "Kathputli refers to which Rajasthani art form?", options: ["Mirror embroidery", "String puppetry", "Miniature painting", "Marble inlay"], answer: 1, explain: "Puppeteers voice their characters through a bamboo reed held in the cheek." },
  { id: "q33", category: "places", state: "Rajasthan", prompt: "Which Rajasthani city is called the City of Lakes?", options: ["Udaipur", "Bikaner", "Ajmer", "Kota"], answer: 0, explain: "Lake Pichola, Fateh Sagar and their neighbours were all built as water stores." },
  { id: "q34", category: "dance", state: "Tripura", prompt: "Hojagiri dancers balance on which object?", options: ["A brass plate", "An earthen pitcher", "A bamboo pole", "A wooden stool"], answer: 1, explain: "Reang women dance on a pitcher with a bottle and lamp balanced on the head." },
  { id: "q35", category: "language", prompt: "How many languages are listed in the Eighth Schedule of India's Constitution?", options: ["14", "18", "22", "28"], answer: 2, explain: "Twenty-two scheduled languages — with hundreds more spoken every day across the country." },
  { id: "q36", category: "language", prompt: "Punjabi is written in which script?", options: ["Devanagari", "Gurmukhi", "Modi", "Sharada"], answer: 1, explain: "Gurmukhi means 'from the Guru's mouth', standardised to write the Sikh scriptures." },
  { id: "q37", category: "language", prompt: "Malayalam is the main language of which state?", options: ["Karnataka", "Tamil Nadu", "Kerala", "Goa"], answer: 2, explain: "The name is a palindrome, and the script has some of India's most intricate ligatures." },
  { id: "q38", category: "places", prompt: "Gangtok is the capital of which state?", options: ["Sikkim", "Arunachal Pradesh", "Nagaland", "Mizoram"], answer: 0, explain: "A hill capital with Kanchenjunga, the world's third-highest peak, on the skyline." },
  { id: "q39", category: "nature", prompt: "The white salt desert of the Rann is in which state?", options: ["Rajasthan", "Gujarat", "Haryana", "Maharashtra"], answer: 1, explain: "The Rann of Kutch floods each monsoon and dries to a blinding salt crust by winter." },
  { id: "q40", category: "places", prompt: "Who commissioned the Taj Mahal at Agra?", options: ["Akbar", "Shah Jahan", "Aurangzeb", "Humayun"], answer: 1, explain: "Built for Mumtaz Mahal; the marble shifts colour with the light through the day." },
  { id: "q41", category: "festival", prompt: "Onam is the harvest festival of which state?", options: ["Kerala", "Tamil Nadu", "Karnataka", "Andhra Pradesh"], answer: 0, explain: "Ten days of flower carpets, boat races and a sadhya served on a banana leaf." },
  { id: "q42", category: "festival", prompt: "Durga Puja is the biggest annual festival of which state?", options: ["Odisha", "Bihar", "West Bengal", "Jharkhand"], answer: 2, explain: "Kolkata's pandals are recognised by UNESCO as intangible cultural heritage." },
  { id: "q43", category: "places", prompt: "Shillong, the 'Scotland of the East', is the capital of which state?", options: ["Meghalaya", "Manipur", "Tripura", "Assam"], answer: 0, explain: "Rolling pine hills, a strong choral tradition, and rain almost year-round." },
  { id: "q44", category: "craft", prompt: "Warli painting, made of white triangles and circles, comes from which state?", options: ["Maharashtra", "Chhattisgarh", "Odisha", "Gujarat"], answer: 0, explain: "Painted on mud walls with rice paste — every figure is built from two triangles." },
  { id: "q45", category: "festival", state: "Assam", prompt: "The Jonbeel Mela is unusual because it still features what?", options: ["A barter market", "A camel race", "A kite battle", "A lantern release"], answer: 0, explain: "Tribes from the hills and plains trade goods without money — one of the last such fairs." },
  { id: "q46", category: "nature", state: "Rajasthan", prompt: "Ranthambore National Park is best known for spotting which animal?", options: ["Tiger", "Rhino", "Elephant", "Snow leopard"], answer: 0, explain: "Its tigers famously patrol around a 10th-century fort inside the park." },
  { id: "q47", category: "food", prompt: "A 'sadhya' is a feast served on what?", options: ["A brass thali", "A banana leaf", "A clay platter", "A wooden board"], answer: 1, explain: "Two dozen dishes in a fixed order on a banana leaf, eaten with the hands." },
  { id: "q48", category: "places", state: "Rajasthan", prompt: "Chittorgarh holds which record?", options: ["India's largest fort", "India's oldest temple", "India's highest palace", "India's longest wall"], answer: 0, explain: "Almost 700 acres on a hilltop, with its own lakes, palaces and towers of victory." },
];

/* ------------------------------------------------------------ generators */

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/** "Which state's capital is X?" built from the full state directory. */
function capitalQuestions(): Question[] {
  return allStates
    .filter((entry) => entry.kind === "State")
    .map((entry) => {
      const distractors = shuffle(
        allStates.filter((other) => other.name !== entry.name).map((other) => other.name),
      ).slice(0, 3);
      const options = shuffle([entry.name, ...distractors]);
      return {
        id: `cap-${entry.code}`,
        category: "places" as Category,
        prompt: `${entry.capital} is the capital of which state?`,
        options,
        answer: options.indexOf(entry.name),
        explain: `${entry.name} — known for ${entry.knownFor.charAt(0).toLowerCase()}${entry.knownFor.slice(1)}.`,
      };
    });
}

/** "How would you say X in <language>?" built from the phrasebook. */
function phraseQuestions(): Question[] {
  const out: Question[] = [];
  for (const language of languages) {
    for (const slot of ["hello", "thanks", "water"] as const) {
      const [native, roman] = language.phrases[slot];
      const distractors = shuffle(
        languages
          .filter((other) => other.id !== language.id)
          .map((other) => other.phrases[slot][1]),
      )
        .filter((value, index, list) => list.indexOf(value) === index && value !== roman)
        .slice(0, 3);
      if (distractors.length < 3) continue;
      const options = shuffle([roman, ...distractors]);
      out.push({
        id: `ph-${language.id}-${slot}`,
        category: "language",
        prompt: `How do you say "${SLOT_LABELS[slot]}" in ${language.name}?`,
        options,
        answer: options.indexOf(roman),
        explain: `${native} — "${roman}". ${language.note}`,
      });
    }
  }
  return out;
}

export type Pack = {
  id: string;
  label: string;
  blurb: string;
  face: string;
  accent: string;
  pool: () => Question[];
};

export const PACKS: Pack[] = [
  {
    id: "mixed",
    label: "India Mix",
    blurb: "A little of everything — food, dance, forts and festivals.",
    face: "\u{1F1EE}\u{1F1F3}",
    accent: "#c2571c",
    pool: () => [...BANK, ...phraseQuestions().slice(0, 8), ...capitalQuestions().slice(0, 8)],
  },
  {
    id: "rajasthan",
    label: "Rajasthan",
    blurb: "Forts, ghoomar, laal maas and the desert's own courtesies.",
    face: "\u{1F3F0}",
    accent: "#c96927",
    pool: () => BANK.filter((question) => question.state === "Rajasthan"),
  },
  {
    id: "assam",
    label: "Assam",
    blurb: "Bihu, tea gardens, rhinos and the Brahmaputra.",
    face: "\u{1F343}",
    accent: "#55783b",
    pool: () => BANK.filter((question) => question.state === "Assam"),
  },
  {
    id: "tripura",
    label: "Tripura",
    blurb: "Palaces, rock carvings and Hojagiri balance.",
    face: "\u{1F3AD}",
    accent: "#76508b",
    pool: () => BANK.filter((question) => question.state === "Tripura"),
  },
  {
    id: "food",
    label: "Taste Test",
    blurb: "Can you place a dish on the map by taste alone?",
    face: "\u{1F35B}",
    accent: "#b8842a",
    pool: () => BANK.filter((question) => question.category === "food"),
  },
  {
    id: "festival",
    label: "Festival Season",
    blurb: "Which state is celebrating, and what for?",
    face: "\u{1F387}",
    accent: "#a8471b",
    pool: () => BANK.filter((question) => question.category === "festival"),
  },
  {
    id: "capitals",
    label: "Capital Sprint",
    blurb: "Every state capital, one after another.",
    face: "\u{1F5FA}\u{FE0F}",
    accent: "#3f7a6b",
    pool: capitalQuestions,
  },
  {
    id: "phrases",
    label: "Say It Right",
    blurb: "Match the greeting to the language it belongs to.",
    face: "\u{1F5E3}\u{FE0F}",
    accent: "#7a4b63",
    pool: phraseQuestions,
  },
];

export const packsById: Record<string, Pack> = Object.fromEntries(
  PACKS.map((pack) => [pack.id, pack]),
);

/** Draws a fresh, shuffled round. Falls back to the mixed pool if a pack is thin. */
export function drawRound(packId: string, count = 8): Question[] {
  const pack = packsById[packId] ?? packsById.mixed;
  let pool = pack.pool();
  if (pool.length < count) {
    const filler = BANK.filter((question) => !pool.some((item) => item.id === question.id));
    pool = [...pool, ...shuffle(filler)];
  }
  return shuffle(pool)
    .slice(0, count)
    .map((question) => {
      // Re-shuffle the options too, so replaying a pack never has the same
      // answer sitting in the same slot.
      const correct = question.options[question.answer];
      const options = shuffle(question.options);
      return { ...question, options, answer: options.indexOf(correct) };
    });
}

/** Pairs used by the tap-to-match mini game: greeting ⇄ language. */
export function matchPairs(count = 6) {
  return shuffle(languages)
    .slice(0, count)
    .map((language) => ({
      id: language.id,
      left: language.phrases.hello[1],
      leftNative: language.phrases.hello[0],
      right: language.name,
      accent: language.accent,
    }));
}

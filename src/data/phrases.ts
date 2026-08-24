/**
 * The phrasebook behind the Languages page.
 *
 * Every entry carries the native script, a plain-English transliteration and
 * the meaning, plus a BCP-47 tag so the browser's speech synthesis reads it in
 * the right language rather than mangling it as English.
 *
 * `id` is stable (`<language>-<slot>`) because the progress store records
 * learned phrases by id.
 */

export type Phrase = {
  id: string;
  slot: PhraseSlot;
  english: string;
  native: string;
  roman: string;
};

export type PhraseSlot =
  | "hello"
  | "thanks"
  | "howareyou"
  | "yourname"
  | "myname"
  | "yes"
  | "no"
  | "please"
  | "sorry"
  | "howmuch"
  | "water"
  | "tasty"
  | "bye";

export const SLOT_LABELS: Record<PhraseSlot, string> = {
  hello: "Hello",
  thanks: "Thank you",
  howareyou: "How are you?",
  yourname: "What is your name?",
  myname: "My name is…",
  yes: "Yes",
  no: "No",
  please: "Please",
  sorry: "Sorry / excuse me",
  howmuch: "How much is this?",
  water: "Water",
  tasty: "Very tasty!",
  bye: "Goodbye",
};

export const SLOT_ORDER: PhraseSlot[] = [
  "hello",
  "thanks",
  "howareyou",
  "yourname",
  "myname",
  "yes",
  "no",
  "please",
  "sorry",
  "howmuch",
  "water",
  "tasty",
  "bye",
];

export type LanguageEntry = {
  id: string;
  name: string;
  native: string;
  /** Writing system, shown as a chip. */
  script: string;
  /** Rough number of first-language speakers, for the stat line. */
  speakers: string;
  /** States where it is an official or majority language. */
  states: string[];
  family: "Indo-Aryan" | "Dravidian" | "Tibeto-Burman";
  /** BCP-47 tag handed to speechSynthesis. */
  speechLang: string;
  accent: string;
  /** A short, true piece of colour about the language. */
  note: string;
  phrases: Record<PhraseSlot, [native: string, roman: string]>;
};

export const languages: LanguageEntry[] = [
  {
    id: "hindi",
    name: "Hindi",
    native: "हिन्दी",
    script: "Devanagari",
    speakers: "~528 million",
    states: ["Uttar Pradesh", "Rajasthan", "Madhya Pradesh", "Bihar", "Delhi"],
    family: "Indo-Aryan",
    speechLang: "hi-IN",
    accent: "#c2571c",
    note: "Written in Devanagari, where the horizontal shirorekha line strings the letters of a word together like beads.",
    phrases: {
      hello: ["नमस्ते", "Namaste"],
      thanks: ["धन्यवाद", "Dhanyavaad"],
      howareyou: ["आप कैसे हैं?", "Aap kaise hain?"],
      yourname: ["आपका नाम क्या है?", "Aapka naam kya hai?"],
      myname: ["मेरा नाम … है", "Mera naam … hai"],
      yes: ["हाँ", "Haan"],
      no: ["नहीं", "Nahin"],
      please: ["कृपया", "Kripaya"],
      sorry: ["माफ़ कीजिए", "Maaf kijiye"],
      howmuch: ["यह कितने का है?", "Yeh kitne ka hai?"],
      water: ["पानी", "Paani"],
      tasty: ["बहुत स्वादिष्ट!", "Bahut swadisht!"],
      bye: ["फिर मिलेंगे", "Phir milenge"],
    },
  },
  {
    id: "bengali",
    name: "Bengali",
    native: "বাংলা",
    script: "Bengali–Assamese",
    speakers: "~97 million in India",
    states: ["West Bengal", "Tripura", "Assam"],
    family: "Indo-Aryan",
    speechLang: "bn-IN",
    accent: "#a8471b",
    note: "The language of Rabindranath Tagore, whose songs became the national anthems of two countries.",
    phrases: {
      hello: ["নমস্কার", "Nomoskar"],
      thanks: ["ধন্যবাদ", "Dhonnobad"],
      howareyou: ["আপনি কেমন আছেন?", "Apni kemon achhen?"],
      yourname: ["আপনার নাম কী?", "Apnar naam ki?"],
      myname: ["আমার নাম …", "Amar naam …"],
      yes: ["হ্যাঁ", "Hyaan"],
      no: ["না", "Na"],
      please: ["দয়া করে", "Doya kore"],
      sorry: ["দুঃখিত", "Dukkhito"],
      howmuch: ["এটার দাম কত?", "Etar daam koto?"],
      water: ["জল", "Jol"],
      tasty: ["খুব সুস্বাদু!", "Khub sushadu!"],
      bye: ["আবার দেখা হবে", "Abar dekha hobe"],
    },
  },
  {
    id: "assamese",
    name: "Assamese",
    native: "অসমীয়া",
    script: "Bengali–Assamese",
    speakers: "~15 million",
    states: ["Assam"],
    family: "Indo-Aryan",
    speechLang: "bn-IN",
    accent: "#55783b",
    note: "The easternmost Indo-Aryan language, carried down the Brahmaputra valley and sung every spring at Bihu.",
    phrases: {
      hello: ["নমস্কাৰ", "Nomoskar"],
      thanks: ["ধন্যবাদ", "Dhonyobad"],
      howareyou: ["আপুনি কেনে আছে?", "Apuni kene ase?"],
      yourname: ["আপোনাৰ নাম কি?", "Aponar naam ki?"],
      myname: ["মোৰ নাম …", "Mor naam …"],
      yes: ["হয়", "Hoi"],
      no: ["নহয়", "Nohoi"],
      please: ["অনুগ্ৰহ কৰি", "Onugroho kori"],
      sorry: ["ক্ষমা কৰিব", "Khyoma koribo"],
      howmuch: ["ইয়াৰ দাম কিমান?", "Iyar daam kiman?"],
      water: ["পানী", "Paani"],
      tasty: ["অতি সুস্বাদু!", "Oti susadu!"],
      bye: ["আকৌ লগ পাম", "Akou log pam"],
    },
  },
  {
    id: "rajasthani",
    name: "Rajasthani",
    native: "राजस्थानी",
    script: "Devanagari",
    speakers: "~26 million",
    states: ["Rajasthan"],
    family: "Indo-Aryan",
    speechLang: "hi-IN",
    accent: "#b8842a",
    note: "Marwari and its cousins carry the desert's courtesy — Khamma Ghani is a greeting and a blessing at once.",
    phrases: {
      hello: ["खम्मा घणी", "Khamma Ghani"],
      thanks: ["घणी खम्मा", "Ghani Khamma"],
      howareyou: ["कीयां हो?", "Kiyaan ho?"],
      yourname: ["थारो नाम कांई है?", "Tharo naam kaain hai?"],
      myname: ["म्हारो नाम … है", "Mharo naam … hai"],
      yes: ["हाँ", "Haan"],
      no: ["कोनी", "Koni"],
      please: ["किरपा कर", "Kirpa kar"],
      sorry: ["माफ करो", "Maaf karo"],
      howmuch: ["आ कितरे की है?", "Aa kitre ki hai?"],
      water: ["पाणी", "Paani"],
      tasty: ["घणो सवादिष्ट!", "Ghano swadisht!"],
      bye: ["राम राम सा", "Raam Raam sa"],
    },
  },
  {
    id: "tamil",
    name: "Tamil",
    native: "தமிழ்",
    script: "Tamil",
    speakers: "~69 million",
    states: ["Tamil Nadu", "Puducherry"],
    family: "Dravidian",
    speechLang: "ta-IN",
    accent: "#7a4b63",
    note: "One of the world's oldest continuously spoken languages, with a literary record stretching back over two millennia.",
    phrases: {
      hello: ["வணக்கம்", "Vanakkam"],
      thanks: ["நன்றி", "Nandri"],
      howareyou: ["நீங்கள் எப்படி இருக்கிறீர்கள்?", "Neenga eppadi irukeenga?"],
      yourname: ["உங்கள் பெயர் என்ன?", "Ungal peyar enna?"],
      myname: ["என் பெயர் …", "En peyar …"],
      yes: ["ஆம்", "Aam"],
      no: ["இல்லை", "Illai"],
      please: ["தயவுசெய்து", "Thayavu seydhu"],
      sorry: ["மன்னிக்கவும்", "Mannikkavum"],
      howmuch: ["இது எவ்வளவு?", "Idhu evvalavu?"],
      water: ["தண்ணீர்", "Thanneer"],
      tasty: ["மிகவும் சுவையாக இருக்கிறது!", "Migavum suvaiyaga irukkirathu!"],
      bye: ["போய் வருகிறேன்", "Poi varugiren"],
    },
  },
  {
    id: "telugu",
    name: "Telugu",
    native: "తెలుగు",
    script: "Telugu",
    speakers: "~83 million",
    states: ["Andhra Pradesh", "Telangana"],
    family: "Dravidian",
    speechLang: "te-IN",
    accent: "#5c7f63",
    note: "Nicknamed the Italian of the East for the way almost every word ends on a vowel.",
    phrases: {
      hello: ["నమస్కారం", "Namaskaram"],
      thanks: ["ధన్యవాదాలు", "Dhanyavaadalu"],
      howareyou: ["మీరు ఎలా ఉన్నారు?", "Meeru elaa unnaaru?"],
      yourname: ["మీ పేరు ఏమిటి?", "Mee peru emiti?"],
      myname: ["నా పేరు …", "Naa peru …"],
      yes: ["అవును", "Avunu"],
      no: ["కాదు", "Kaadu"],
      please: ["దయచేసి", "Dayachesi"],
      sorry: ["క్షమించండి", "Kshaminchandi"],
      howmuch: ["ఇది ఎంత?", "Idi enta?"],
      water: ["నీళ్ళు", "Neellu"],
      tasty: ["చాలా రుచిగా ఉంది!", "Chaala ruchigaa undi!"],
      bye: ["వెళ్ళొస్తాను", "Vellostanu"],
    },
  },
  {
    id: "kannada",
    name: "Kannada",
    native: "ಕನ್ನಡ",
    script: "Kannada",
    speakers: "~44 million",
    states: ["Karnataka"],
    family: "Dravidian",
    speechLang: "kn-IN",
    accent: "#98400f",
    note: "Its rounded letterforms come from centuries of writing on palm leaves, where straight strokes would split the leaf.",
    phrases: {
      hello: ["ನಮಸ್ಕಾರ", "Namaskara"],
      thanks: ["ಧನ್ಯವಾದಗಳು", "Dhanyavaadagalu"],
      howareyou: ["ನೀವು ಹೇಗಿದ್ದೀರಿ?", "Neevu hegiddeeri?"],
      yourname: ["ನಿಮ್ಮ ಹೆಸರೇನು?", "Nimma hesarenu?"],
      myname: ["ನನ್ನ ಹೆಸರು …", "Nanna hesaru …"],
      yes: ["ಹೌದು", "Haudu"],
      no: ["ಇಲ್ಲ", "Illa"],
      please: ["ದಯವಿಟ್ಟು", "Dayavittu"],
      sorry: ["ಕ್ಷಮಿಸಿ", "Kshamisi"],
      howmuch: ["ಇದು ಎಷ್ಟು?", "Idu eshtu?"],
      water: ["ನೀರು", "Neeru"],
      tasty: ["ತುಂಬಾ ರುಚಿಯಾಗಿದೆ!", "Tumba ruchiyagide!"],
      bye: ["ಹೋಗಿ ಬರುತ್ತೇನೆ", "Hogi barutteene"],
    },
  },
  {
    id: "malayalam",
    name: "Malayalam",
    native: "മലയാളം",
    script: "Malayalam",
    speakers: "~35 million",
    states: ["Kerala", "Lakshadweep"],
    family: "Dravidian",
    speechLang: "ml-IN",
    accent: "#3f7a6b",
    note: "The name is a palindrome, and the script packs some of the most intricate ligatures in India.",
    phrases: {
      hello: ["നമസ്കാരം", "Namaskaram"],
      thanks: ["നന്ദി", "Nandi"],
      howareyou: ["സുഖമാണോ?", "Sukhamaano?"],
      yourname: ["നിങ്ങളുടെ പേര് എന്താണ്?", "Ningalude peru enthaanu?"],
      myname: ["എന്റെ പേര് …", "Ente peru …"],
      yes: ["അതെ", "Athe"],
      no: ["അല്ല", "Alla"],
      please: ["ദയവായി", "Dayavaayi"],
      sorry: ["ക്ഷമിക്കണം", "Kshamikkanam"],
      howmuch: ["ഇതിന് എത്ര?", "Ithinu ethra?"],
      water: ["വെള്ളം", "Vellam"],
      tasty: ["വളരെ രുചികരം!", "Valare ruchikaram!"],
      bye: ["പിന്നെ കാണാം", "Pinne kaanaam"],
    },
  },
  {
    id: "marathi",
    name: "Marathi",
    native: "मराठी",
    script: "Devanagari",
    speakers: "~83 million",
    states: ["Maharashtra", "Goa"],
    family: "Indo-Aryan",
    speechLang: "mr-IN",
    accent: "#c96927",
    note: "The language of the Warkari poet-saints, whose abhangas are still sung on the walk to Pandharpur.",
    phrases: {
      hello: ["नमस्कार", "Namaskar"],
      thanks: ["धन्यवाद", "Dhanyavaad"],
      howareyou: ["तुम्ही कसे आहात?", "Tumhi kase aahat?"],
      yourname: ["तुमचं नाव काय आहे?", "Tumcha naav kaay aahe?"],
      myname: ["माझं नाव … आहे", "Maajha naav … aahe"],
      yes: ["होय", "Hoy"],
      no: ["नाही", "Naahi"],
      please: ["कृपया", "Krupaya"],
      sorry: ["माफ करा", "Maaf kara"],
      howmuch: ["हे किती रुपयांना?", "He kiti rupayanna?"],
      water: ["पाणी", "Paani"],
      tasty: ["खूप चविष्ट!", "Khoop chavisht!"],
      bye: ["पुन्हा भेटू", "Punha bhetu"],
    },
  },
  {
    id: "gujarati",
    name: "Gujarati",
    native: "ગુજરાતી",
    script: "Gujarati",
    speakers: "~55 million",
    states: ["Gujarat", "Dadra & Nagar Haveli"],
    family: "Indo-Aryan",
    speechLang: "gu-IN",
    accent: "#b8842a",
    note: "Devanagari without the headline — the shirorekha was dropped centuries ago to speed up merchants' handwriting.",
    phrases: {
      hello: ["નમસ્તે", "Namaste"],
      thanks: ["આભાર", "Aabhaar"],
      howareyou: ["તમે કેમ છો?", "Tame kem chho?"],
      yourname: ["તમારું નામ શું છે?", "Tamaru naam shu chhe?"],
      myname: ["મારું નામ … છે", "Maru naam … chhe"],
      yes: ["હા", "Haa"],
      no: ["ના", "Naa"],
      please: ["મહેરબાની કરીને", "Meherbani karine"],
      sorry: ["માફ કરશો", "Maaf karsho"],
      howmuch: ["આ કેટલાનું છે?", "Aa ketlanu chhe?"],
      water: ["પાણી", "Paani"],
      tasty: ["બહુ સ્વાદિષ્ટ!", "Bahu swadisht!"],
      bye: ["આવજો", "Aavjo"],
    },
  },
  {
    id: "punjabi",
    name: "Punjabi",
    native: "ਪੰਜਾਬੀ",
    script: "Gurmukhi",
    speakers: "~33 million in India",
    states: ["Punjab", "Chandigarh", "Haryana"],
    family: "Indo-Aryan",
    speechLang: "pa-IN",
    accent: "#e8632c",
    note: "Gurmukhi means 'from the Guru's mouth' — the script was standardised to write the Sikh scriptures.",
    phrases: {
      hello: ["ਸਤ ਸ੍ਰੀ ਅਕਾਲ", "Sat Sri Akaal"],
      thanks: ["ਧੰਨਵਾਦ", "Dhanvaad"],
      howareyou: ["ਤੁਸੀਂ ਕਿਵੇਂ ਹੋ?", "Tusi kiven ho?"],
      yourname: ["ਤੁਹਾਡਾ ਨਾਂ ਕੀ ਹੈ?", "Tuhada naa ki hai?"],
      myname: ["ਮੇਰਾ ਨਾਂ … ਹੈ", "Mera naa … hai"],
      yes: ["ਹਾਂ", "Haan"],
      no: ["ਨਹੀਂ", "Nahin"],
      please: ["ਕਿਰਪਾ ਕਰਕੇ", "Kirpa karke"],
      sorry: ["ਮਾਫ਼ ਕਰਨਾ", "Maaf karna"],
      howmuch: ["ਇਹ ਕਿੰਨੇ ਦਾ ਹੈ?", "Eh kinne da hai?"],
      water: ["ਪਾਣੀ", "Paani"],
      tasty: ["ਬਹੁਤ ਸੁਆਦੀ!", "Bahut suaadi!"],
      bye: ["ਫਿਰ ਮਿਲਾਂਗੇ", "Phir milange"],
    },
  },
  {
    id: "odia",
    name: "Odia",
    native: "ଓଡ଼ିଆ",
    script: "Odia",
    speakers: "~38 million",
    states: ["Odisha"],
    family: "Indo-Aryan",
    speechLang: "or-IN",
    accent: "#76508b",
    note: "One of India's six classical languages, and the one whose letters curve like the umbrellas of Puri.",
    phrases: {
      hello: ["ନମସ୍କାର", "Namaskar"],
      thanks: ["ଧନ୍ୟବାଦ", "Dhanyabad"],
      howareyou: ["ଆପଣ କେମିତି ଅଛନ୍ତି?", "Apana kemiti achhanti?"],
      yourname: ["ଆପଣଙ୍କ ନାମ କଣ?", "Apananka naam kana?"],
      myname: ["ମୋ ନାମ …", "Mo naam …"],
      yes: ["ହଁ", "Han"],
      no: ["ନାହିଁ", "Nahin"],
      please: ["ଦୟାକରି", "Dayakari"],
      sorry: ["କ୍ଷମା କରନ୍ତୁ", "Kshama karantu"],
      howmuch: ["ଏହା କେତେ?", "Eha kete?"],
      water: ["ପାଣି", "Pani"],
      tasty: ["ବହୁତ ସୁଆଦିଆ!", "Bahut suadia!"],
      bye: ["ପୁଣି ଦେଖା ହେବ", "Puni dekha heba"],
    },
  },
];

export const languagesById: Record<string, LanguageEntry> = Object.fromEntries(
  languages.map((entry) => [entry.id, entry]),
);

/** Flattens one language into the Phrase[] the UI renders. */
export function phrasesOf(entry: LanguageEntry): Phrase[] {
  return SLOT_ORDER.map((slot) => {
    const [native, roman] = entry.phrases[slot];
    return { id: `${entry.id}-${slot}`, slot, english: SLOT_LABELS[slot], native, roman };
  });
}

/**
 * Speaks a phrase in its own language. Uses the browser's synthesis directly
 * (not the guide's neural voice) because only the platform voices have the
 * Indic language packs — and picks the best-matching voice for the tag.
 */
export function speakPhrase(text: string, lang: string) {
  if (typeof window === "undefined" || !window.speechSynthesis) return false;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  const base = lang.split("-")[0];
  const voices = window.speechSynthesis.getVoices();
  const exact = voices.find((voice) => voice.lang.toLowerCase() === lang.toLowerCase());
  const loose = voices.find((voice) => voice.lang.toLowerCase().startsWith(base));
  const voice = exact ?? loose;
  if (voice) utterance.voice = voice;
  utterance.rate = 0.82;
  utterance.pitch = 1.02;
  window.speechSynthesis.speak(utterance);
  return true;
}

/** True when the platform ships a voice that can actually read `lang`. */
export function hasVoiceFor(lang: string) {
  if (typeof window === "undefined" || !window.speechSynthesis) return false;
  const base = lang.split("-")[0];
  return window.speechSynthesis
    .getVoices()
    .some((voice) => voice.lang.toLowerCase().startsWith(base));
}

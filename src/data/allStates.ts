/**
 * Every state and union territory on the map, with just enough metadata to
 * search, group and preview them. The Explore page search reads from here, so
 * a traveller can find and open *any* region — the three with a live AI guide
 * open their full experience, the rest fall through to the "coming soon" card.
 *
 * `code` matches the SVG path ids in data/indiaPaths.ts.
 */
export type Region =
  | "North"
  | "South"
  | "East"
  | "West"
  | "Central"
  | "Northeast"
  | "Islands";

export type StateEntry = {
  code: string;
  name: string;
  capital: string;
  kind: "State" | "Union Territory";
  region: Region;
  /** One-line hook shown on the search result card. */
  knownFor: string;
  languages: string;
  /** Extra search terms — nicknames, big cities, alternate spellings. */
  aka: string[];
};

export const allStates: StateEntry[] = [
  { code: "AP", name: "Andhra Pradesh", capital: "Amaravati", kind: "State", region: "South", knownFor: "Kuchipudi dance, spicy Andhra thalis and the Tirupati temple", languages: "Telugu, Urdu", aka: ["Vizag", "Visakhapatnam", "Tirupati", "AP"] },
  { code: "AR", name: "Arunachal Pradesh", capital: "Itanagar", kind: "State", region: "Northeast", knownFor: "Sunrise land of monasteries, Tawang and 26 major tribes", languages: "Nyishi, Adi, English", aka: ["Tawang", "Land of the Rising Sun"] },
  { code: "AS", name: "Assam", capital: "Dispur", kind: "State", region: "Northeast", knownFor: "Tea gardens, Bihu, Kaziranga rhinos and the Brahmaputra", languages: "Assamese, Bodo, Bengali", aka: ["Guwahati", "Kaziranga", "Majuli"] },
  { code: "BR", name: "Bihar", capital: "Patna", kind: "State", region: "East", knownFor: "Bodh Gaya, Nalanda and the Madhubani painting tradition", languages: "Hindi, Maithili, Bhojpuri", aka: ["Bodh Gaya", "Nalanda", "Madhubani"] },
  { code: "CT", name: "Chhattisgarh", capital: "Raipur", kind: "State", region: "Central", knownFor: "Bastar tribal art, dense sal forests and Chitrakote falls", languages: "Hindi, Chhattisgarhi", aka: ["Bastar", "Chitrakote"] },
  { code: "GA", name: "Goa", capital: "Panaji", kind: "State", region: "West", knownFor: "Beaches, Indo-Portuguese churches, xacuti and susegad afternoons", languages: "Konkani, Marathi", aka: ["Panjim", "Anjuna", "beach"] },
  { code: "GJ", name: "Gujarat", capital: "Gandhinagar", kind: "State", region: "West", knownFor: "Garba nights, the white Rann of Kutch and Gir lions", languages: "Gujarati, Hindi", aka: ["Ahmedabad", "Kutch", "Rann", "Gir"] },
  { code: "HR", name: "Haryana", capital: "Chandigarh", kind: "State", region: "North", knownFor: "Kurukshetra battlefields, akharas and hearty rustic food", languages: "Haryanvi, Hindi", aka: ["Gurugram", "Kurukshetra"] },
  { code: "HP", name: "Himachal Pradesh", capital: "Shimla", kind: "State", region: "North", knownFor: "Himalayan valleys, wooden temples and apple orchards", languages: "Hindi, Pahari", aka: ["Manali", "Shimla", "Spiti", "Dharamshala"] },
  { code: "JH", name: "Jharkhand", capital: "Ranchi", kind: "State", region: "East", knownFor: "Sohrai wall painting, waterfalls and Chhau dance", languages: "Hindi, Santali, Nagpuri", aka: ["Ranchi", "Chhau", "Sohrai"] },
  { code: "KA", name: "Karnataka", capital: "Bengaluru", kind: "State", region: "South", knownFor: "Hampi ruins, Mysuru palaces, filter coffee and Yakshagana", languages: "Kannada, Tulu", aka: ["Bangalore", "Hampi", "Mysore", "Coorg"] },
  { code: "KL", name: "Kerala", capital: "Thiruvananthapuram", kind: "State", region: "South", knownFor: "Backwaters, Kathakali, Onam sadhya and Ayurveda", languages: "Malayalam", aka: ["Kochi", "Alleppey", "Munnar", "Onam"] },
  { code: "MP", name: "Madhya Pradesh", capital: "Bhopal", kind: "State", region: "Central", knownFor: "Khajuraho carvings, Sanchi stupa and tiger reserves", languages: "Hindi, Bundeli", aka: ["Khajuraho", "Sanchi", "Bandhavgarh", "Indore"] },
  { code: "MH", name: "Maharashtra", capital: "Mumbai", kind: "State", region: "West", knownFor: "Ajanta and Ellora caves, Lavani, vada pav and Ganeshotsav", languages: "Marathi, Hindi", aka: ["Bombay", "Pune", "Ajanta", "Ellora"] },
  { code: "MN", name: "Manipur", capital: "Imphal", kind: "State", region: "Northeast", knownFor: "Manipuri Raas Leela, Loktak floating islands and polo's home", languages: "Meiteilon, English", aka: ["Imphal", "Loktak", "Raas"] },
  { code: "ML", name: "Meghalaya", capital: "Shillong", kind: "State", region: "Northeast", knownFor: "Living root bridges, wettest villages and Khasi music", languages: "Khasi, Garo, English", aka: ["Shillong", "Cherrapunji", "Mawlynnong"] },
  { code: "MZ", name: "Mizoram", capital: "Aizawl", kind: "State", region: "Northeast", knownFor: "Cheraw bamboo dance, blue hills and close-knit village life", languages: "Mizo, English", aka: ["Aizawl", "Cheraw"] },
  { code: "NL", name: "Nagaland", capital: "Kohima", kind: "State", region: "Northeast", knownFor: "Hornbill Festival, 16 tribes and striking woven shawls", languages: "Nagamese, English", aka: ["Kohima", "Hornbill"] },
  { code: "OR", name: "Odisha", capital: "Bhubaneswar", kind: "State", region: "East", knownFor: "Odissi dance, the Sun Temple at Konark and Puri Rath Yatra", languages: "Odia", aka: ["Orissa", "Puri", "Konark", "Odissi"] },
  { code: "PB", name: "Punjab", capital: "Chandigarh", kind: "State", region: "North", knownFor: "Golden Temple, bhangra, sarson da saag and open-hearted langars", languages: "Punjabi", aka: ["Amritsar", "Golden Temple", "Bhangra"] },
  { code: "RJ", name: "Rajasthan", capital: "Jaipur", kind: "State", region: "North", knownFor: "Desert forts, ghoomar, block prints and royal thalis", languages: "Hindi, Marwari", aka: ["Jaipur", "Udaipur", "Jaisalmer", "Jodhpur", "Pink City"] },
  { code: "SK", name: "Sikkim", capital: "Gangtok", kind: "State", region: "Northeast", knownFor: "Kanchenjunga views, Buddhist monasteries and organic farming", languages: "Nepali, Bhutia, Lepcha", aka: ["Gangtok", "Kanchenjunga"] },
  { code: "TN", name: "Tamil Nadu", capital: "Chennai", kind: "State", region: "South", knownFor: "Bharatanatyam, towering gopurams, Chettinad food and Carnatic music", languages: "Tamil", aka: ["Madras", "Madurai", "Chennai", "Thanjavur"] },
  { code: "TG", name: "Telangana", capital: "Hyderabad", kind: "State", region: "South", knownFor: "Charminar, Hyderabadi biryani, pearls and Bathukamma", languages: "Telugu, Urdu", aka: ["Hyderabad", "Charminar", "biryani"] },
  { code: "TR", name: "Tripura", capital: "Agartala", kind: "State", region: "Northeast", knownFor: "Ujjayanta Palace, Unakoti rock carvings and bamboo craft", languages: "Bengali, Kokborok", aka: ["Agartala", "Unakoti", "Neermahal"] },
  { code: "UP", name: "Uttar Pradesh", capital: "Lucknow", kind: "State", region: "North", knownFor: "The Taj Mahal, Varanasi ghats, Awadhi kebabs and chikankari", languages: "Hindi, Urdu, Awadhi", aka: ["Agra", "Taj Mahal", "Varanasi", "Banaras", "Lucknow"] },
  { code: "UT", name: "Uttarakhand", capital: "Dehradun", kind: "State", region: "North", knownFor: "Himalayan pilgrimages, Rishikesh and the valley of flowers", languages: "Hindi, Garhwali, Kumaoni", aka: ["Rishikesh", "Haridwar", "Nainital", "Uttaranchal"] },
  { code: "WB", name: "West Bengal", capital: "Kolkata", kind: "State", region: "East", knownFor: "Durga Puja, Rabindra Sangeet, mishti and Darjeeling tea", languages: "Bengali", aka: ["Calcutta", "Kolkata", "Darjeeling", "Durga Puja"] },

  { code: "AN", name: "Andaman & Nicobar", capital: "Sri Vijaya Puram", kind: "Union Territory", region: "Islands", knownFor: "Coral reefs, Cellular Jail history and rainforest islands", languages: "Hindi, Bengali, English", aka: ["Port Blair", "Havelock", "islands"] },
  { code: "CH", name: "Chandigarh", capital: "Chandigarh", kind: "Union Territory", region: "North", knownFor: "Le Corbusier's planned city and the Rock Garden", languages: "Hindi, Punjabi, English", aka: ["Rock Garden", "Corbusier"] },
  { code: "DD", name: "Dadra & Nagar Haveli", capital: "Silvassa", kind: "Union Territory", region: "West", knownFor: "Warli painting country and quiet riverside forests", languages: "Gujarati, Marathi, Warli", aka: ["Silvassa", "Warli"] },
  { code: "DN", name: "Daman & Diu", capital: "Daman", kind: "Union Territory", region: "West", knownFor: "Portuguese forts, sea breezes and quiet fishing towns", languages: "Gujarati, Portuguese-influenced", aka: ["Daman", "Diu"] },
  { code: "DL", name: "Delhi", capital: "New Delhi", kind: "Union Territory", region: "North", knownFor: "Mughal monuments, chaat lanes and seven historic cities in one", languages: "Hindi, Punjabi, Urdu, English", aka: ["New Delhi", "Red Fort", "Chandni Chowk"] },
  { code: "JK", name: "Jammu & Kashmir", capital: "Srinagar", kind: "Union Territory", region: "North", knownFor: "Dal Lake shikaras, pashmina weaving and wazwan feasts", languages: "Kashmiri, Dogri, Urdu", aka: ["Srinagar", "Jammu", "Dal Lake", "Kashmir"] },
  { code: "LA", name: "Ladakh", capital: "Leh", kind: "Union Territory", region: "North", knownFor: "High-desert monasteries, Pangong lake and Losar festivities", languages: "Ladakhi, Hindi", aka: ["Leh", "Pangong", "Nubra"] },
  { code: "LD", name: "Lakshadweep", capital: "Kavaratti", kind: "Union Territory", region: "Islands", knownFor: "Lagoon atolls, coral life and a gentle island rhythm", languages: "Malayalam, Mahl", aka: ["Kavaratti", "Agatti", "islands"] },
  { code: "PY", name: "Puducherry", capital: "Puducherry", kind: "Union Territory", region: "South", knownFor: "French quarter streets, Auroville and seaside promenades", languages: "Tamil, French, English", aka: ["Pondicherry", "Pondy", "Auroville"] },
];

export const statesByCode: Record<string, StateEntry> = Object.fromEntries(
  allStates.map((entry) => [entry.code, entry]),
);

export const statesByName: Record<string, StateEntry> = Object.fromEntries(
  allStates.map((entry) => [entry.name, entry]),
);

export const REGIONS: Region[] = [
  "North",
  "South",
  "East",
  "West",
  "Central",
  "Northeast",
  "Islands",
];

/**
 * Ranked substring search across name, capital, region, languages, the hook
 * line and the alias list — so "pink city", "bombay" and "backwaters" all
 * land on the right region. An empty query returns everything, which is what
 * lets the search box double as a full directory.
 */
export function searchStates(query: string): StateEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return allStates;
  const scored = allStates
    .map((entry) => {
      const name = entry.name.toLowerCase();
      let score = 0;
      if (name === q) score = 100;
      else if (name.startsWith(q)) score = 80;
      else if (name.includes(q)) score = 60;
      else if (entry.aka.some((alias) => alias.toLowerCase().startsWith(q))) score = 50;
      else if (entry.capital.toLowerCase().includes(q)) score = 40;
      else if (entry.aka.some((alias) => alias.toLowerCase().includes(q))) score = 30;
      else if (entry.region.toLowerCase().includes(q)) score = 20;
      else if (entry.languages.toLowerCase().includes(q)) score = 15;
      else if (entry.knownFor.toLowerCase().includes(q)) score = 10;
      return { entry, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.entry.name.localeCompare(b.entry.name));
  return scored.map((item) => item.entry);
}

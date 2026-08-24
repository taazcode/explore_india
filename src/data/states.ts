export type StateInfo = {
  name: string;
  capital: string;
  guide: string;
  role: string;
  greeting: string;
  languages: string;
  culture: string;
  food: string;
  traditions: string;
  festivals: string;
  folklore: string;
  places: string[];
  bestTime: string;
  duration: string;
  weather: string;
  transport: string;
  etiquette: string;
  costs: { label: string; value: string }[];
  accent: string;
};

export const activeStates: Record<string, StateInfo> = {
  Rajasthan: {
    name: 'Rajasthan', capital: 'Jaipur', guide: 'Aarav', role: 'Your royal cultural companion',
    greeting: 'Khamma Ghani', languages: 'Hindi, Marwari, English',
    culture: 'Rajasthan is a land of royal forts, desert artistry, colourful textiles and warm hospitality.',
    food: 'Try dal baati churma, laal maas, ghevar and a thali served with a story.',
    traditions: 'Folk music, puppetry, block printing and the graceful ghoomar dance are woven into daily life.',
    festivals: 'Pushkar Fair, Desert Festival and Teej fill the cities with music, colour and celebration.',
    folklore: 'Hear tales of brave Rajput heroes, desert caravans and the love story of Dhola Maru.',
    places: ['Amber Fort', 'Jaisalmer Fort', 'Pushkar', 'Udaipur lakes'],
    bestTime: 'October to March', duration: '6–8 days', weather: 'Sunny winter days; cool evenings in the desert.',
    transport: 'Fly into Jaipur, then connect by train, bus or car between cities.', etiquette: 'Ask before photographing people and dress modestly at temples.',
    costs: [{ label: 'Stay', value: '₹5,000–₹11,000' }, { label: 'Food', value: '₹2,500–₹4,500' }, { label: 'Local travel', value: '₹3,000–₹7,000' }, { label: 'Experiences', value: '₹2,000–₹5,000' }], accent: '#c96927'
  },
  Assam: {
    name: 'Assam', capital: 'Dispur', guide: 'Maya', role: 'Your gentle guide to the northeast',
    greeting: 'Nomoskar', languages: 'Assamese, Bodo, Bengali, English',
    culture: 'Assam welcomes you with tea gardens, river islands, silk weaving and a deep respect for nature.',
    food: 'Explore khar, masor tenga, pitha and fragrant Assamese tea from the source.',
    traditions: 'Bihu dance, handwoven mekhela chador and the music of the pepa celebrate the rhythm of life.',
    festivals: 'Rongali Bihu in spring is a joyful season of dance, feasts and new beginnings.',
    folklore: 'Discover stories of the Brahmaputra, Kamakhya and the one-horned rhino of Kaziranga.',
    places: ['Kaziranga', 'Majuli Island', 'Sivasagar', 'Kamakhya Temple'],
    bestTime: 'November to April', duration: '5–7 days', weather: 'Pleasant winters; monsoon brings lush landscapes and strong rain.',
    transport: 'Guwahati is the gateway; use trains, ferries and local cars for the region.', etiquette: 'Keep nature visits quiet and follow local temple customs.',
    costs: [{ label: 'Stay', value: '₹4,000–₹9,000' }, { label: 'Food', value: '₹2,000–₹4,000' }, { label: 'Local travel', value: '₹3,000–₹8,000' }, { label: 'Experiences', value: '₹1,500–₹4,000' }], accent: '#3f8066'
  },
  Tripura: {
    name: 'Tripura', capital: 'Agartala', guide: 'Riya', role: 'Your warm companion to the hills',
    greeting: 'Kwlai', languages: 'Bengali, Kokborok, English',
    culture: 'Tripura brings together royal history, forested hills, bamboo craft and the living heritage of many communities.',
    food: 'Taste mui borok, bamboo shoot dishes, chakhwi and sweet local fruits.',
    traditions: 'Hojagiri dance, handloom weaving and bamboo craft are treasured expressions of Tripuri identity.',
    festivals: 'Kharchi Puja and Garia Puja offer a beautiful window into Tripura’s spiritual traditions.',
    folklore: 'Listen for legends surrounding Unakoti’s rock carvings and the palace at Neermahal.',
    places: ['Ujjayanta Palace', 'Neermahal', 'Unakoti', 'Sepahijala'],
    bestTime: 'October to March', duration: '4–5 days', weather: 'Comfortable winter weather with green hills and clear sightseeing days.',
    transport: 'Reach Agartala by air or train, then explore by local car and shared transport.', etiquette: 'Support local artisans and ask permission before entering community spaces.',
    costs: [{ label: 'Stay', value: '₹4,000–₹8,000' }, { label: 'Food', value: '₹2,500–₹4,000' }, { label: 'Local travel', value: '₹1,500–₹3,000' }, { label: 'Experiences', value: '₹1,000–₹2,500' }], accent: '#aa5a43'
  }
};

export const allStates = ['Jammu & Kashmir', 'Himachal Pradesh', 'Punjab', 'Uttarakhand', 'Haryana', 'Rajasthan', 'Uttar Pradesh', 'Sikkim', 'Arunachal Pradesh', 'Nagaland', 'Assam', 'Bihar', 'Madhya Pradesh', 'Gujarat', 'West Bengal', 'Jharkhand', 'Tripura', 'Mizoram', 'Chhattisgarh', 'Odisha', 'Maharashtra', 'Telangana', 'Goa', 'Karnataka', 'Andhra Pradesh', 'Tamil Nadu', 'Kerala'];

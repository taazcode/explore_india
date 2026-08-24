// Rich per-state content behind the Culture / Places / Traditions / Food /
// Travel Plan tabs of the state experience.
//
// Photography lives in src/assets/explore/<state>/<key>.jpg — every file is a
// freely-licensed Wikimedia Commons image, pre-cropped to a uniform 640x480 so
// no card can ever break its grid row. They're pulled in with a glob rather
// than ~70 import lines; `eager` keeps them in the normal asset graph so Vite
// still hashes and optimises them at build time.
const exploreImages = import.meta.glob("../assets/explore/*/*.jpg", {
  eager: true,
  import: "default",
}) as Record<string, string>;

export function exploreImage(state: string, key: string): string | undefined {
  return exploreImages[`../assets/explore/${state.toLowerCase()}/${key}.jpg`];
}

export type Highlight = {
  /** Image file stem under assets/explore/<state>/ */
  key: string;
  name: string;
  /** Where/when — rendered under the name. */
  meta: string;
  blurb: string;
  /** Small pill over the photo. */
  tag: string;
};

export type DayPlan = { title: string; detail: string };

export type ReachOption = { mode: "air" | "rail" | "road"; label: string; detail: string };

/**
 * Per-person, per-day rupee ranges used by the live budget estimator.
 * `stay` is per room (two travellers share one), `transport` is per group,
 * `food` and `experiences` are per traveller — the same way a real trip costs out.
 */
export type BudgetModel = {
  stay: [number, number];
  food: [number, number];
  transport: [number, number];
  experiences: [number, number];
};

export type StateGuide = {
  tagline: string;
  places: Highlight[];
  culture: Highlight[];
  traditions: Highlight[];
  food: Highlight[];
  plan: {
    intro: string;
    itinerary: DayPlan[];
    reach: ReachOption[];
    budget: BudgetModel;
    packing: string[];
    tips: string[];
  };
};

export const stateGuides: Record<string, StateGuide> = {
  Rajasthan: {
    tagline: "Forts, dunes and a thousand years of colour",
    places: [
      {
        key: "place-amber",
        name: "Amber Fort",
        meta: "Amer · 11 km from Jaipur",
        tag: "UNESCO",
        blurb:
          "Yellow sandstone ramparts above Maota Lake. Save time for Sheesh Mahal, the mirrored hall that lights up from a single flame.",
      },
      {
        key: "place-hawamahal",
        name: "Hawa Mahal",
        meta: "Old City, Jaipur",
        tag: "Icon",
        blurb:
          "953 latticed windows, built so royal women could watch street processions unseen. The facade catches its best light just after sunrise.",
      },
      {
        key: "place-mehrangarh",
        name: "Mehrangarh Fort",
        meta: "Jodhpur",
        tag: "Fort",
        blurb:
          "A 15th-century fort standing 122 m above the blue houses of Jodhpur, holding one of the finest palace museums in India.",
      },
      {
        key: "place-pichola",
        name: "City Palace & Lake Pichola",
        meta: "Udaipur",
        tag: "Lakes",
        blurb:
          "Mirrored courtyards above a lake studded with island palaces. Take the sunset boat from Rameshwar Ghat.",
      },
      {
        key: "place-jaisalmer",
        name: "Jaisalmer Fort",
        meta: "Jaisalmer",
        tag: "UNESCO",
        blurb:
          "A living fort — around 3,000 people still live inside the golden sandstone walls. Pair it with a night out in the Sam dunes.",
      },
      {
        key: "place-pushkar",
        name: "Pushkar Lake",
        meta: "Ajmer district",
        tag: "Sacred",
        blurb:
          "52 bathing ghats around a sacred lake, beside one of the very few Brahma temples anywhere. The town is strictly vegetarian.",
      },
      {
        key: "place-ranthambore",
        name: "Ranthambore National Park",
        meta: "Sawai Madhopur",
        tag: "Wildlife",
        blurb:
          "The best odds in India of seeing a wild tiger, among ruined pavilions and a 10th-century hilltop fort.",
      },
      {
        key: "place-chittorgarh",
        name: "Chittorgarh Fort",
        meta: "Chittorgarh",
        tag: "UNESCO",
        blurb:
          "India's largest fort by area — 700 acres of gateways, palaces and the nine-storey Vijay Stambh victory tower.",
      },
    ],
    culture: [
      {
        key: "culture-ghoomar",
        name: "Ghoomar",
        meta: "Folk dance",
        tag: "Dance",
        blurb:
          "A swirling dance of Bhil origin adopted by Rajput courts, performed in a wide ghagra with veiled, circling turns.",
      },
      {
        key: "culture-kathputli",
        name: "Kathputli puppetry",
        meta: "Storytelling",
        tag: "Craft",
        blurb:
          "String puppets carved from mango wood have carried Rajasthan's ballads village to village for over a thousand years.",
      },
      {
        key: "culture-bluepottery",
        name: "Blue pottery",
        meta: "Jaipur",
        tag: "Craft",
        blurb:
          "Persian in origin and fired at low heat — the only pottery tradition in India that uses ground quartz instead of clay.",
      },
      {
        key: "culture-manganiyar",
        name: "Manganiyar & Langa music",
        meta: "Thar desert",
        tag: "Music",
        blurb:
          "Hereditary musician communities who sing on kamaicha and khartal for the same patron families across generations.",
      },
      {
        key: "culture-bandhani",
        name: "Bandhani",
        meta: "Textile",
        tag: "Textile",
        blurb:
          "Tie-dye made by tying thousands of tiny knots by hand. The pattern only reveals itself when the cloth is finally opened.",
      },
      {
        key: "culture-miniature",
        name: "Miniature painting",
        meta: "Mewar · Bundi · Kishangarh",
        tag: "Art",
        blurb:
          "Courts, monsoons and Krishna legends painted in squirrel-hair brushstrokes finer than a pencil line.",
      },
    ],
    traditions: [
      {
        key: "tradition-pushkarfair",
        name: "Pushkar Camel Fair",
        meta: "Kartik Purnima · November",
        tag: "Fair",
        blurb:
          "Thousands of camels, horses and traders gather for a week of livestock trading, races and desert music.",
      },
      {
        key: "tradition-gangaur",
        name: "Gangaur",
        meta: "Chaitra · March–April",
        tag: "Festival",
        blurb:
          "Eighteen days honouring Gauri, closing with processions of decorated idols carried down to the water.",
      },
      {
        key: "tradition-teej",
        name: "Teej",
        meta: "Shravan · July–August",
        tag: "Festival",
        blurb:
          "Women welcome the monsoon dressed in green, with swings hung from trees and a royal procession through Jaipur.",
      },
      {
        key: "tradition-desertfest",
        name: "Desert Festival",
        meta: "Magh · February",
        tag: "Festival",
        blurb:
          "Jaisalmer's dunes fill with camel races, turban-tying contests and folk performances under the full moon.",
      },
      {
        key: "tradition-safa",
        name: "Safa & pagri",
        meta: "Everyday dress",
        tag: "Custom",
        blurb:
          "Turban colour and tying style signal region, community and occasion — saffron for valour, pink for celebration.",
      },
      {
        key: "tradition-mehndi",
        name: "Bridal mehndi",
        meta: "Weddings",
        tag: "Custom",
        blurb:
          "Henna applied the night before a wedding. Tradition says the darker the stain sets, the deeper the bond.",
      },
    ],
    food: [
      {
        key: "food-dalbaati",
        name: "Dal Baati Churma",
        meta: "The signature plate",
        tag: "Veg",
        blurb:
          "Baked wheat balls cracked open and drowned in ghee, served with spiced dal and sweet crushed churma.",
      },
      {
        key: "food-laalmaas",
        name: "Laal Maas",
        meta: "Jodhpur & Udaipur",
        tag: "Non-veg",
        blurb:
          "Mutton slow-cooked in Mathania red chillies and yoghurt. A Rajput hunting dish — genuinely fiery.",
      },
      {
        key: "food-gatte",
        name: "Gatte ki Sabzi",
        meta: "Everyday classic",
        tag: "Veg",
        blurb:
          "Gram-flour dumplings simmered in tangy yoghurt gravy — desert cooking that needs no fresh vegetables at all.",
      },
      {
        key: "food-kersangri",
        name: "Ker Sangri",
        meta: "Marwar",
        tag: "Veg",
        blurb:
          "Wild berries and beans foraged from the Thar, sun-dried and cooked with chillies. The definitive Marwari dish.",
      },
      {
        key: "food-ghevar",
        name: "Ghevar",
        meta: "Teej & Raksha Bandhan",
        tag: "Sweet",
        blurb:
          "A honeycomb-textured disc of flour fried in ghee, soaked in syrup and crowned with thick rabri.",
      },
      {
        key: "food-kachori",
        name: "Pyaaz Kachori",
        meta: "Jodhpur street food",
        tag: "Snack",
        blurb:
          "A flaky onion-stuffed pastry, best eaten hot with tamarind chutney at a corner sweet shop.",
      },
    ],
    plan: {
      intro:
        "A comfortable first loop through Rajasthan runs Jaipur → Jodhpur → Jaisalmer → Udaipur. Winter is the season; the desert is punishing from May onward.",
      itinerary: [
        { title: "Arrive in Jaipur", detail: "Settle in, walk the Pink City bazaars and eat your first Rajasthani thali." },
        { title: "Jaipur forts", detail: "Amber Fort in the morning, Jantar Mantar and Hawa Mahal after lunch." },
        { title: "Jaipur to Jodhpur", detail: "Morning train or car. Evening at the Clock Tower market for pyaaz kachori." },
        { title: "Mehrangarh & the blue city", detail: "Fort museum, Jaswant Thada, then the stepwell at Toorji ka Jhalra." },
        { title: "On to Jaisalmer", detail: "Long drive across the Thar. Sunset from the golden fort walls." },
        { title: "Sam sand dunes", detail: "Camel ride, folk music around a fire and a night under desert sky." },
        { title: "Udaipur", detail: "Fly or drive in. City Palace, then the sunset boat across Lake Pichola." },
        { title: "Slow morning", detail: "Shop for miniature paintings and block print, then head home." },
      ],
      reach: [
        { mode: "air", label: "By air", detail: "Jaipur (JAI) is the main gateway; Udaipur and Jodhpur both take direct flights from Delhi and Mumbai." },
        { mode: "rail", label: "By train", detail: "Delhi–Jaipur takes about 4.5 hours on the Vande Bharat. Overnight trains link Jodhpur and Jaisalmer." },
        { mode: "road", label: "By road", detail: "Highways between cities are excellent. A hired car with driver runs roughly ₹12–16 per km." },
      ],
      budget: { stay: [1400, 3200], food: [500, 1000], transport: [700, 1600], experiences: [400, 1100] },
      packing: ["Layers — desert nights get cold", "Sunscreen and a scarf for dust", "Comfortable shoes for fort climbs", "Modest clothing for temples"],
      tips: [
        "Ask before photographing people, especially at fairs.",
        "Fix the auto-rickshaw fare before you get in.",
        "Buy handicrafts from government emporiums or the artisan directly.",
        "Pushkar is vegetarian and alcohol-free — respect it.",
      ],
    },
  },

  Assam: {
    tagline: "Tea gardens, river islands and the great Brahmaputra",
    places: [
      {
        key: "place-kaziranga",
        name: "Kaziranga National Park",
        meta: "Golaghat & Nagaon",
        tag: "UNESCO",
        blurb:
          "Two-thirds of the world's greater one-horned rhinos live here. Jeep and elephant safaris run November to April.",
      },
      {
        key: "place-majuli",
        name: "Majuli",
        meta: "Jorhat district",
        tag: "River island",
        blurb:
          "The world's largest river island and the heart of Assam's Vaishnavite satras. Reach it by ferry from Nimati Ghat.",
      },
      {
        key: "place-kamakhya",
        name: "Kamakhya Temple",
        meta: "Nilachal Hill, Guwahati",
        tag: "Sacred",
        blurb:
          "One of the most revered Shakti Peethas, known for its beehive shikhara and the vast Ambubachi gathering each June.",
      },
      {
        key: "place-sivasagar",
        name: "Rang Ghar",
        meta: "Sivasagar",
        tag: "Heritage",
        blurb:
          "Asia's oldest surviving amphitheatre, built by the Ahom kings in 1744 to watch games and buffalo fights.",
      },
      {
        key: "place-umananda",
        name: "Umananda Island",
        meta: "Brahmaputra, Guwahati",
        tag: "Day trip",
        blurb:
          "The smallest inhabited river island in the world — a short ferry to a Shiva temple and a troop of golden langurs.",
      },
      {
        key: "place-manas",
        name: "Manas National Park",
        meta: "Bodoland",
        tag: "UNESCO",
        blurb:
          "A tiger reserve and biosphere on the Bhutan border, home to the rare pygmy hog and the golden langur.",
      },
      {
        key: "place-teagarden",
        name: "Tea gardens",
        meta: "Jorhat & Dibrugarh",
        tag: "Signature",
        blurb:
          "Colonial-era estates where you can walk the bushes at dawn and taste second-flush Assam right at the source.",
      },
      {
        key: "place-gibbon",
        name: "Hoollongapar Gibbon Sanctuary",
        meta: "Jorhat",
        tag: "Wildlife",
        blurb:
          "Home to the western hoolock gibbon — the only ape found anywhere in India — swinging through evergreen canopy.",
      },
    ],
    culture: [
      {
        key: "culture-bihu",
        name: "Bihu dance",
        meta: "Folk dance",
        tag: "Dance",
        blurb:
          "Fast, joyful footwork danced in open fields to welcome spring, in mekhela chador and dhoti with brass jewellery.",
      },
      {
        key: "culture-sattriya",
        name: "Sattriya",
        meta: "Classical dance",
        tag: "Dance",
        blurb:
          "Born in the 15th-century satra monasteries of Srimanta Sankardeva, and recognised as a classical form in 2000.",
      },
      {
        key: "culture-muga",
        name: "Muga silk",
        meta: "Sualkuchi",
        tag: "Textile",
        blurb:
          "A golden silk produced nowhere else on earth. It outlasts the wearer and grows glossier with every wash.",
      },
      {
        key: "culture-handloom",
        name: "Handloom weaving",
        meta: "Village craft",
        tag: "Craft",
        blurb:
          "Assam has more handlooms than any other Indian state — a loom in the courtyard is still ordinary here.",
      },
      {
        key: "culture-japi",
        name: "Japi",
        meta: "Bamboo craft",
        tag: "Craft",
        blurb:
          "A conical bamboo-and-palm sunhat, plain for the fields and richly decorated as a mark of welcome and respect.",
      },
      {
        key: "culture-dhol",
        name: "Dhol, pepa & taal",
        meta: "Bihu instruments",
        tag: "Music",
        blurb:
          "The drum, the buffalo-horn pipe and the cymbals — the three sounds that mean Bihu has arrived.",
      },
    ],
    traditions: [
      {
        key: "tradition-rongali",
        name: "Rongali Bihu",
        meta: "Mid-April",
        tag: "Festival",
        blurb:
          "The Assamese new year and spring festival — seven days of dance, feasting and new beginnings.",
      },
      {
        key: "tradition-meji",
        name: "Magh Bihu & the Meji",
        meta: "Mid-January",
        tag: "Festival",
        blurb:
          "The harvest feast. Communities build bamboo-and-thatch mejis and burn them at dawn after a night of eating.",
      },
      {
        key: "tradition-ambubachi",
        name: "Ambubachi Mela",
        meta: "June",
        tag: "Gathering",
        blurb:
          "Lakhs of pilgrims and sadhus converge on Kamakhya for four days when the temple closes, then reopens.",
      },
      {
        key: "tradition-raas",
        name: "Raas Mahotsav",
        meta: "November",
        tag: "Festival",
        blurb:
          "Majuli's satras stage the life of Krishna over several nights with masks, music and hundreds of performers.",
      },
      {
        key: "tradition-namghar",
        name: "Namghar",
        meta: "Year-round",
        tag: "Custom",
        blurb:
          "Every village has one — a prayer hall with no idol that doubles as the community's meeting place.",
      },
      {
        key: "tradition-jonbeel",
        name: "Jonbeel Mela",
        meta: "January",
        tag: "Fair",
        blurb:
          "One of the last barter fairs on earth: hill and plains communities still trade goods without money changing hands.",
      },
    ],
    food: [
      {
        key: "food-masortenga",
        name: "Masor Tenga",
        meta: "The signature plate",
        tag: "Non-veg",
        blurb:
          "A light, sour fish curry soured with tomato, elephant apple or lemon — eaten with rice on hot afternoons.",
      },
      {
        key: "food-khar",
        name: "Khar",
        meta: "First course",
        tag: "Traditional",
        blurb:
          "Named for its alkali, filtered from burnt banana peel. Traditionally the first dish of an Assamese meal.",
      },
      {
        key: "food-pitha",
        name: "Pitha",
        meta: "Bihu sweet",
        tag: "Sweet",
        blurb:
          "Rice cakes made at Bihu — til pitha rolled with sesame and jaggery, ghila pitha fried until crisp.",
      },
      {
        key: "food-tea",
        name: "Assam tea",
        meta: "Straight from the estate",
        tag: "Drink",
        blurb:
          "Malty, full-bodied and grown in the Brahmaputra valley. Second flush, picked in June, is the prized one.",
      },
      {
        key: "food-thali",
        name: "Assamese thali",
        meta: "Full meal",
        tag: "Veg & non-veg",
        blurb:
          "Rice at the centre with khar, dal, pitika, a herb bhaji and fish — eaten in a set order, bitter to sour.",
      },
      {
        key: "food-pitika",
        name: "Aloo Pitika",
        meta: "Comfort food",
        tag: "Veg",
        blurb:
          "Potatoes mashed with mustard oil, raw onion and coriander. Simple, sharp and on almost every plate.",
      },
    ],
    plan: {
      intro:
        "Guwahati is the gateway. A relaxed week covers Kaziranga, a tea estate and Majuli without ever feeling rushed.",
      itinerary: [
        { title: "Arrive in Guwahati", detail: "Evening cruise on the Brahmaputra and dinner by the river." },
        { title: "Kamakhya & Umananda", detail: "Morning at the temple, then the ferry across to Peacock Island." },
        { title: "Drive to Kaziranga", detail: "About five hours east. Settle into a lodge on the park edge." },
        { title: "Kaziranga safari", detail: "Dawn jeep safari for rhino, then the Central Range in the afternoon." },
        { title: "Tea country", detail: "On to Jorhat. Estate walk, factory tour and a proper tasting." },
        { title: "Majuli island", detail: "Ferry from Nimati Ghat. Visit the satras and the mask-makers of Samaguri." },
        { title: "Sivasagar", detail: "Rang Ghar, Talatal Ghar and the Ahom temples around the tank." },
        { title: "Back to Guwahati", detail: "Return drive or a short flight, with time for silk shopping in Sualkuchi." },
      ],
      reach: [
        { mode: "air", label: "By air", detail: "Guwahati (GAU) connects to all metros. Jorhat and Dibrugarh are handy for the tea belt." },
        { mode: "rail", label: "By train", detail: "Guwahati is the northeast's rail hub. Rajdhani services run from Delhi and Kolkata." },
        { mode: "road", label: "By road", detail: "NH-27 links the main towns. Hire a car with driver — self-drive is not worth the trouble here." },
      ],
      budget: { stay: [1200, 2800], food: [400, 850], transport: [800, 1800], experiences: [500, 1400] },
      packing: ["Rain shell — showers arrive without warning", "Insect repellent for the parks", "Neutral colours for safaris", "A light jumper for winter mornings"],
      tips: [
        "Book Kaziranga safaris ahead; slots sell out in season.",
        "The park closes mid-May to October for the monsoon.",
        "Remove shoes before entering a namghar.",
        "Buy muga and pat silk in Sualkuchi rather than at city shops.",
      ],
    },
  },

  Tripura: {
    tagline: "Palaces, rock-cut hills and a living tribal heritage",
    places: [
      {
        key: "place-ujjayanta",
        name: "Ujjayanta Palace",
        meta: "Agartala",
        tag: "Heritage",
        blurb:
          "The Manikya kings' 1901 palace, set behind Mughal gardens and reflecting pools, now the state museum.",
      },
      {
        key: "place-neermahal",
        name: "Neermahal",
        meta: "Rudrasagar Lake, Melaghar",
        tag: "Icon",
        blurb:
          "A water palace built in the middle of a lake in 1930, blending Hindu and Mughal design. Reached only by boat.",
      },
      {
        key: "place-unakoti",
        name: "Unakoti",
        meta: "Kailashahar",
        tag: "Ancient",
        blurb:
          "Enormous Shaiva figures carved straight into a hillside, some over 30 feet tall, dating to the 7th–9th century.",
      },
      {
        key: "place-sundari",
        name: "Tripura Sundari Temple",
        meta: "Udaipur, Gomati",
        tag: "Sacred",
        blurb:
          "A 1501 Shakti Peetha shaped like a tortoise back, and among the most visited temples in the northeast.",
      },
      {
        key: "place-sepahijala",
        name: "Sepahijala Sanctuary",
        meta: "Bishalgarh",
        tag: "Wildlife",
        blurb:
          "Clouded leopards, spectacled langurs and a boating lake, all within an easy morning of the capital.",
      },
      {
        key: "place-dumboor",
        name: "Dumboor Lake",
        meta: "Gandacherra",
        tag: "Nature",
        blurb:
          "A wide lake scattered with 48 islands, fed by the Gomati and ringed by forest. Best explored by country boat.",
      },
      {
        key: "place-jampui",
        name: "Jampui Hills",
        meta: "North Tripura",
        tag: "Hills",
        blurb:
          "The state's highest range — orange orchards, Mizo villages and a sea of cloud below the ridge at sunrise.",
      },
      {
        key: "place-agartala",
        name: "Agartala",
        meta: "Capital",
        tag: "City",
        blurb:
          "A compact, walkable capital of colonial buildings and temple lanes, sitting just 2 km from the Bangladesh border.",
      },
    ],
    culture: [
      {
        key: "culture-hojagiri",
        name: "Hojagiri",
        meta: "Reang community",
        tag: "Dance",
        blurb:
          "Danced balancing on an earthen pitcher with a bottle and lamp on the head — the lower body still, the rest moving.",
      },
      {
        key: "culture-risa",
        name: "Risa & rignai",
        meta: "Tripuri dress",
        tag: "Textile",
        blurb:
          "The rignai is wrapped below, the risa above. A girl receives her first risa in a ceremony at around twelve.",
      },
      {
        key: "culture-manipuri",
        name: "Manipuri Raas",
        meta: "Classical dance",
        tag: "Dance",
        blurb:
          "Brought by the Manikya court and still performed here — devotional, gentle, with no sharp lines in the movement.",
      },
      {
        key: "culture-handloom",
        name: "Loin-loom weaving",
        meta: "Village craft",
        tag: "Craft",
        blurb:
          "Woven on a backstrap loom tied to the weaver's own waist, with clan patterns passed mother to daughter.",
      },
    ],
    traditions: [
      {
        key: "tradition-kharchi",
        name: "Kharchi Puja",
        meta: "July",
        tag: "Festival",
        blurb:
          "Fourteen deities are carried to the Howrah river and bathed — the state's biggest festival, drawing lakhs.",
      },
      {
        key: "tradition-garia",
        name: "Garia Puja",
        meta: "April",
        tag: "Festival",
        blurb:
          "Tripuri communities honour Garia, the god of livestock and harvest, with a bamboo pole shrine and seven days of dance.",
      },
      {
        key: "tradition-durga",
        name: "Durga Puja",
        meta: "October",
        tag: "Festival",
        blurb:
          "Agartala's pandals rival Kolkata's, ending with immersion processions along the lakes and rivers.",
      },
      {
        key: "tradition-mela",
        name: "Temple melas",
        meta: "Through the year",
        tag: "Fair",
        blurb:
          "Fairgrounds spring up beside the big temples — food stalls, wooden rides and folk theatre running past midnight.",
      },
    ],
    food: [
      {
        key: "food-muiborok",
        name: "Mui Borok",
        meta: "The Tripuri table",
        tag: "Traditional",
        blurb:
          "The native cuisine — cooked with almost no oil, and built around berma, a fermented dried fish used like salt.",
      },
      {
        key: "food-gudok",
        name: "Gudok",
        meta: "Slow-cooked",
        tag: "Non-veg",
        blurb:
          "Vegetables and berma sealed inside a bamboo tube and cooked over embers until everything softens together.",
      },
      {
        key: "food-chakhwi",
        name: "Chakhwi",
        meta: "Everyday curry",
        tag: "Non-veg",
        blurb:
          "Bamboo shoot simmered with pork or fish and a handful of herbs. Sour, light and eaten with plenty of rice.",
      },
      {
        key: "food-mosdeng",
        name: "Wahan Mosdeng",
        meta: "Side dish",
        tag: "Non-veg",
        blurb:
          "A sharp pork salad tossed raw with chilli, coriander and onion — the closest thing here to a chutney.",
      },
    ],
    plan: {
      intro:
        "Tripura is small and easy to cover. Four or five days out of Agartala reaches almost everything worth seeing.",
      itinerary: [
        { title: "Arrive in Agartala", detail: "Ujjayanta Palace, the Jagannath temple and an evening in the bazaar." },
        { title: "Neermahal & Sepahijala", detail: "Boat out to the water palace, then the sanctuary on the way back." },
        { title: "Udaipur", detail: "Tripura Sundari Temple, the Bhuvaneswari temple and the old lakes." },
        { title: "Unakoti", detail: "Long drive north to the rock carvings. Go early — the light is better before noon." },
        { title: "Jampui Hills", detail: "Ridge villages, orange orchards and sunrise above the cloud line." },
        { title: "Return to Agartala", detail: "Drive back with a stop for cane and bamboo craft on the way." },
      ],
      reach: [
        { mode: "air", label: "By air", detail: "Agartala (IXA) is India's second-busiest northeast airport, with direct flights from Kolkata, Delhi and Guwahati." },
        { mode: "rail", label: "By train", detail: "Agartala is on the broad-gauge network, with direct trains from Kolkata and Delhi." },
        { mode: "road", label: "By road", detail: "NH-8 runs the length of the state. Shared sumos serve the hill districts." },
      ],
      budget: { stay: [1000, 2200], food: [350, 750], transport: [600, 1300], experiences: [300, 800] },
      packing: ["Light cottons plus a rain layer", "Sturdy shoes for the Unakoti steps", "Cash — cards are patchy outside Agartala", "A torch for hill villages"],
      tips: [
        "Carry ID: parts of the state sit close to the international border.",
        "Ask before photographing at tribal festivals.",
        "Unakoti involves a steep descent and climb back — allow two hours.",
        "Try mui borok at a Tripuri-run kitchen, not a hotel restaurant.",
      ],
    },
  },
};

/** Rupee ranges for a whole trip, derived from the per-day model. */
export function estimateBudget(model: BudgetModel, days: number, travellers: number) {
  const nights = Math.max(1, days - 1);
  const rooms = Math.ceil(travellers / 2);
  const line = (range: [number, number], units: number, span: number) =>
    [range[0] * units * span, range[1] * units * span] as [number, number];

  const lines = [
    { label: "Stay", note: `${rooms} room${rooms > 1 ? "s" : ""} · ${nights} night${nights > 1 ? "s" : ""}`, range: line(model.stay, rooms, nights) },
    { label: "Food", note: `${travellers} traveller${travellers > 1 ? "s" : ""} · ${days} days`, range: line(model.food, travellers, days) },
    { label: "Local travel", note: `Shared across the group · ${days} days`, range: line(model.transport, 1, days) },
    { label: "Experiences", note: `Entries, safaris, guides · ${days} days`, range: line(model.experiences, travellers, days) },
  ];
  const total = lines.reduce<[number, number]>(
    (sum, l) => [sum[0] + l.range[0], sum[1] + l.range[1]],
    [0, 0],
  );
  return { lines, total, perPerson: [total[0] / travellers, total[1] / travellers] as [number, number] };
}

/** Rounded to the nearest ₹100 — these are estimates, not quotes. */
export const formatRupees = (value: number) =>
  "₹" + (Math.round(value / 100) * 100).toLocaleString("en-IN");

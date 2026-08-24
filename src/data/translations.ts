export type Language = "English" | "Hindi" | "Bengali" | "Assamese" | "Rajasthani";

type TranslationMap = Record<string, string>;

const english: TranslationMap = {
  Home: "Home", Explore: "Explore States", Culture: "Culture", Languages: "Languages", Quests: "Quests", "About Us": "About Us",
  "My Journey": "My Journey", Profile: "Profile", Journey: "Journey",
  "Explore India. Connect with Culture.": "Explore India. Connect with Culture.",
  "A living atlas of India": "A living atlas of India", "Discover India,": "Discover India,", "One State at a Time": "One State at a Time",
  "Your AI cultural companion to explore India's rich heritage, languages, food, festivals, stories & more.": "Your AI cultural companion to explore India's rich heritage, languages, food, festivals, stories & more.",
  "Start Exploring": "Start Exploring", "Meet Your AI Guide": "Meet Your AI Guide", "States": "States", "UTs": "UTs", "Cultures": "Cultures",
  "Explore the Essence of India": "Explore the Essence of India", "Culture & Traditions": "Culture & Traditions", "Taste of India": "Taste of India",
  "Must-Visit Places": "Must-Visit Places", "Festivals & Fairs": "Festivals & Fairs", "Stories & Folklore": "Stories & Folklore", "Local Languages": "Local Languages",
  "Discover art, dance, music and traditions of every state.": "Discover art, dance, music and traditions of every state.",
  "Explore traditional dishes and local delicacies from every corner.": "Explore traditional dishes and local delicacies from every corner.",
  "Explore iconic destinations and hidden gems across India.": "Explore iconic destinations and hidden gems across India.",
  "Experience the vibrant festivals and fairs of India.": "Experience the vibrant festivals and fairs of India.",
  "Listen to fascinating stories, legends and folklore.": "Listen to fascinating stories, legends and folklore.",
  "Learn greetings and common words in local languages.": "Learn greetings and common words in local languages.",
  "Begin your journey": "Begin your journey", "Select Your State": "Select Your State", "Click a state on the map": "Click a state on the map", "View All States": "View All States",
  "Every state, a new friend": "Every state, a new friend", "Meet Your AI Guides": "Meet Your AI Guides", "Learn, explore & earn": "Learn, explore & earn", "Continue Your Journey": "Continue Your Journey",
  "Explore 5 States": "Explore 5 States", "Learn 10 Greetings": "Learn 10 Greetings", "Take a Quiz": "Take a Quiz", "Culture Points": "Culture Points",
  "Your interactive atlas": "Your interactive atlas", "Choose a state,": "Choose a state,", "meet its culture.": "meet its culture.",
  "Hover over the map to discover India. Select Rajasthan, Assam or Tripura to start a guided cultural journey.": "Hover over the map to discover India. Select Rajasthan, Assam or Tripura to start a guided cultural journey.",
  "Search a state...": "Search a state...", "India, in many beautiful stories": "India, in many beautiful stories", "Tap any region to learn more": "Tap any region to learn more",
  "Active guides": "Active guides", "Coming soon": "Coming soon", "Start here": "Start here", "Guides ready to meet you": "Guides ready to meet you", "More stories are coming": "More stories are coming",
  "Every state is part of the atlas. New cultural guides are being prepared.": "Every state is part of the atlas. New cultural guides are being prepared.",
  "Your cultural guide": "Your cultural guide", "Welcome to": "Welcome to", "Capital:": "Capital:", "Plan with ease": "Plan with ease", "Best time to visit": "Best time to visit",
  "Best months": "Best months", "Recommended stay": "Recommended stay", Weather: "Weather", "Estimated cost": "Estimated cost", "Travel budget": "Travel budget",
  "Actual prices may vary. Live pricing is not included.": "Actual prices may vary. Live pricing is not included.", "Make it yours": "Make it yours", "Plan My Journey": "Plan My Journey",
  Travellers: "Travellers", Days: "Days", "Travel style": "Travel style", Comfort: "Comfort", Budget: "Budget", Premium: "Premium", "Create plan": "Create plan",
  "Check bus options": "Check bus options", "Check local rides": "Check local rides", "Check trains": "Check trains", "Check flights": "Check flights",
  "Chat with": "Chat with", "Demo cultural guide · always learning": "Demo cultural guide · always learning", "Send message": "Send message",
  "Best places": "Best places", "Best time": "Best time", "How to reach": "How to reach", "Travel cost": "Travel cost", Hotels: "Hotels", Food: "Food", "Local transport": "Local transport", "Plan my trip": "Plan my trip",
  "Where should I go?": "Where should I go?", "When is the best time to visit?": "When is the best time to visit?", "How should I travel?": "How should I travel?", "How much money should I carry?": "How much money should I carry?", "Where should I stay?": "Where should I stay?", "What food should I try?": "What food should I try?", "What is local transport like?": "What is local transport like?", "Can you make me a trip plan?": "Can you make me a trip plan?",
  Places: "Places", Traditions: "Traditions", "Culture & traditions": "Culture & traditions", "Stories & folklore": "Stories & folklore", "Taste of": "Taste of",
};

const hindi: TranslationMap = {
  ...english, Home:"होम", Explore:"राज्य देखें", Culture:"संस्कृति", Languages:"भाषाएँ", Quests:"क्विज़", "About Us":"हमारे बारे में", "My Journey":"मेरी यात्रा", Profile:"प्रोफ़ाइल", Journey:"यात्रा",
  "Explore India. Connect with Culture.":"भारत को जानें। संस्कृति से जुड़ें।", "A living atlas of India":"भारत का जीवंत सांस्कृतिक मानचित्र", "Discover India,":"भारत की खोज करें,", "One State at a Time":"एक बार में एक राज्य", "Start Exploring":"खोजना शुरू करें", "Meet Your AI Guide":"अपने AI गाइड से मिलें",
  "Explore the Essence of India":"भारत की आत्मा को जानें", "Culture & Traditions":"संस्कृति और परंपराएँ", "Taste of India":"भारत का स्वाद", "Must-Visit Places":"ज़रूर देखने लायक स्थान", "Festivals & Fairs":"त्योहार और मेले", "Stories & Folklore":"कहानियाँ और लोककथाएँ", "Local Languages":"स्थानीय भाषाएँ",
  "Select Your State":"अपना राज्य चुनें", "View All States":"सभी राज्य देखें", "Meet Your AI Guides":"अपने AI गाइड से मिलें", "Continue Your Journey":"अपनी यात्रा जारी रखें", "Explore 5 States":"5 राज्य देखें", "Learn 10 Greetings":"10 अभिवादन सीखें", "Take a Quiz":"क्विज़ लें", "Culture Points":"संस्कृति अंक",
  "Your interactive atlas":"आपका इंटरैक्टिव मानचित्र", "Choose a state,":"एक राज्य चुनें,", "meet its culture.":"उसकी संस्कृति से मिलें।", "Search a state...":"राज्य खोजें...", "Coming soon":"जल्द आ रहा है", "Start here":"यहाँ से शुरू करें", "Guides ready to meet you":"आपसे मिलने के लिए गाइड तैयार हैं",
  "Your cultural guide":"आपका सांस्कृतिक गाइड", "Welcome to":"स्वागत है", "Best time to visit":"घूमने का सबसे अच्छा समय", "Best months":"सबसे अच्छे महीने", "Recommended stay":"अनुशंसित ठहराव", Weather:"मौसम", "Estimated cost":"अनुमानित खर्च", "Travel budget":"यात्रा बजट", "Plan My Journey":"मेरी यात्रा की योजना", Travellers:"यात्री", Days:"दिन", "Travel style":"यात्रा शैली", "Create plan":"योजना बनाएँ", Comfort:"आरामदायक", Budget:"बजट", Premium:"प्रीमियम",
  "Check bus options":"बस विकल्प देखें", "Check local rides":"स्थानीय सवारी देखें", "Check trains":"ट्रेन देखें", "Check flights":"उड़ानें देखें", "Chat with":"बात करें", "Best places":"बेहतरीन स्थान", "Best time":"सबसे अच्छा समय", "How to reach":"कैसे पहुँचें", "Travel cost":"यात्रा खर्च", Hotels:"होटल", Food:"खाना", "Local transport":"स्थानीय परिवहन", "Plan my trip":"मेरी यात्रा बनाएँ",
  "Where should I go?":"मुझे कहाँ जाना चाहिए?", "When is the best time to visit?":"घूमने का सबसे अच्छा समय कब है?", "How should I travel?":"मुझे कैसे यात्रा करनी चाहिए?", "How much money should I carry?":"मुझे कितना पैसा रखना चाहिए?", "Where should I stay?":"मुझे कहाँ ठहरना चाहिए?", "What food should I try?":"मुझे कौन-सा खाना आज़माना चाहिए?", "What is local transport like?":"स्थानीय परिवहन कैसा है?", "Can you make me a trip plan?":"क्या आप मेरी यात्रा की योजना बना सकते हैं?",
};

const bengali: TranslationMap = {
  ...english, Home:"হোম", Explore:"রাজ্য অন্বেষণ", Culture:"সংস্কৃতি", Languages:"ভাষা", Quests:"কুইজ", "About Us":"আমাদের সম্পর্কে", "My Journey":"আমার যাত্রা", Profile:"প্রোফাইল", Journey:"যাত্রা",
  "Explore India. Connect with Culture.":"ভারতকে জানুন। সংস্কৃতির সঙ্গে যুক্ত হন।", "A living atlas of India":"ভারতের জীবন্ত সাংস্কৃতিক মানচিত্র", "Discover India,":"ভারতকে আবিষ্কার করুন,", "One State at a Time":"একবারে একটি রাজ্য", "Start Exploring":"অন্বেষণ শুরু করুন", "Meet Your AI Guide":"আপনার AI গাইডের সঙ্গে দেখা করুন",
  "Explore the Essence of India":"ভারতের সংস্কৃতির সারাংশ আবিষ্কার করুন", "Culture & Traditions":"সংস্কৃতি ও ঐতিহ্য", "Taste of India":"ভারতের স্বাদ", "Must-Visit Places":"অবশ্যই দেখার স্থান", "Festivals & Fairs":"উৎসব ও মেলা", "Stories & Folklore":"গল্প ও লোককথা", "Local Languages":"স্থানীয় ভাষা", "Select Your State":"আপনার রাজ্য বেছে নিন", "View All States":"সব রাজ্য দেখুন", "Meet Your AI Guides":"আপনার AI গাইডদের সঙ্গে দেখা করুন", "Continue Your Journey":"আপনার যাত্রা চালিয়ে যান", "Culture Points":"সংস্কৃতি পয়েন্ট",
  "Your interactive atlas":"আপনার ইন্টার‌্যাক্টিভ মানচিত্র", "Choose a state,":"একটি রাজ্য বেছে নিন,", "meet its culture.":"তার সংস্কৃতির সঙ্গে পরিচিত হন।", "Search a state...":"রাজ্য খুঁজুন...", "Coming soon":"শীঘ্রই আসছে", "Start here":"এখান থেকে শুরু করুন", "Guides ready to meet you":"গাইডরা আপনার সঙ্গে দেখা করতে প্রস্তুত",
  "Your cultural guide":"আপনার সাংস্কৃতিক গাইড", "Welcome to":"স্বাগতম", "Best time to visit":"ভ্রমণের সেরা সময়", "Estimated cost":"আনুমানিক খরচ", "Travel budget":"ভ্রমণ বাজেট", "Plan My Journey":"আমার যাত্রার পরিকল্পনা", Travellers:"ভ্রমণকারী", Days:"দিন", "Travel style":"ভ্রমণের ধরন", "Create plan":"পরিকল্পনা তৈরি করুন", Comfort:"আরামদায়ক", Budget:"বাজেট", Premium:"প্রিমিয়াম", "Check bus options":"বাসের বিকল্প দেখুন", "Check local rides":"স্থানীয় রাইড দেখুন", "Check trains":"ট্রেন দেখুন", "Check flights":"ফ্লাইট দেখুন", "Chat with":"কথা বলুন",
  "Best places":"সেরা স্থান", "Best time":"সেরা সময়", "How to reach":"কীভাবে পৌঁছাবেন", "Travel cost":"ভ্রমণ খরচ", Hotels:"হোটেল", Food:"খাবার", "Local transport":"স্থানীয় পরিবহন", "Plan my trip":"আমার ভ্রমণের পরিকল্পনা করুন", "Where should I go?":"আমার কোথায় যাওয়া উচিত?", "When is the best time to visit?":"ভ্রমণের সেরা সময় কখন?", "How should I travel?":"আমার কীভাবে ভ্রমণ করা উচিত?", "Where should I stay?":"আমার কোথায় থাকা উচিত?", "What food should I try?":"আমার কী খাবার চেষ্টা করা উচিত?", "What is local transport like?":"স্থানীয় পরিবহন কেমন?", "Can you make me a trip plan?":"আপনি কি আমার ভ্রমণের পরিকল্পনা করতে পারেন?",
};

const assamese: TranslationMap = {
  ...english, Home:"হোম", Explore:"ৰাজ্যসমূহ অন্বেষণ", Culture:"সংস্কৃতি", Languages:"ভাষাসমূহ", Quests:"কুইজ", "About Us":"আমাৰ বিষয়ে", "My Journey":"মোৰ যাত্ৰা", Profile:"প্ৰফাইল", Journey:"যাত্ৰা",
  "Explore India. Connect with Culture.":"ভাৰতক জানক। সংস্কৃতিৰ সৈতে সংযোগ স্থাপন কৰক।", "A living atlas of India":"ভাৰতৰ জীৱন্ত সাংস্কৃতিক মানচিত্ৰ", "Discover India,":"ভাৰতক আৱিষ্কাৰ কৰক,", "One State at a Time":"এটা সময়ত এটা ৰাজ্য", "Start Exploring":"অন্বেষণ আৰম্ভ কৰক", "Meet Your AI Guide":"আপোনাৰ AI গাইডক লগ কৰক",
  "Explore the Essence of India":"ভাৰতৰ সংস্কৃতিৰ সাৰাংশ আৱিষ্কাৰ কৰক", "Culture & Traditions":"সংস্কৃতি আৰু পৰম্পৰা", "Taste of India":"ভাৰতৰ সোৱাদ", "Must-Visit Places":"অৱশ্যেই চাবলগীয়া ঠাই", "Festivals & Fairs":"উৎসৱ আৰু মেলা", "Stories & Folklore":"কাহিনী আৰু লোককথা", "Local Languages":"স্থানীয় ভাষা", "Select Your State":"আপোনাৰ ৰাজ্য বাছনি কৰক", "View All States":"সকলো ৰাজ্য চাওক", "Meet Your AI Guides":"আপোনাৰ AI গাইডসকলক লগ কৰক", "Continue Your Journey":"আপোনাৰ যাত্ৰা অব্যাহত ৰাখক", "Culture Points":"সংস্কৃতি পইণ্ট",
  "Your interactive atlas":"আপোনাৰ ইণ্টাৰেক্টিভ মানচিত্ৰ", "Choose a state,":"এটা ৰাজ্য বাছনি কৰক,", "meet its culture.":"ইয়াৰ সংস্কৃতিৰ সৈতে পৰিচিত হওক।", "Search a state...":"ৰাজ্য বিচাৰক...", "Coming soon":"শীঘ্ৰেই আহিব", "Start here":"ইয়াৰ পৰা আৰম্ভ কৰক", "Guides ready to meet you":"গাইডসকল আপোনাক লগ কৰিবলৈ সাজু",
  "Your cultural guide":"আপোনাৰ সাংস্কৃতিক গাইড", "Welcome to":"স্বাগতম", "Best time to visit":"ভ্ৰমণৰ সৰ্বোত্তম সময়", "Estimated cost":"আনুমানিক খৰচ", "Travel budget":"ভ্ৰমণ বাজেট", "Plan My Journey":"মোৰ যাত্ৰাৰ পৰিকল্পনা", Travellers:"ভ্ৰমণকাৰী", Days:"দিন", "Travel style":"ভ্ৰমণৰ ধৰণ", "Create plan":"পৰিকল্পনা তৈয়াৰ কৰক", Comfort:"আৰামদায়ক", Budget:"বাজেট", Premium:"প্ৰিমিয়াম", "Check bus options":"বাছৰ বিকল্প চাওক", "Check local rides":"স্থানীয় ৰাইড চাওক", "Check trains":"ৰেল চাওক", "Check flights":"বিমান চাওক", "Chat with":"কথা পাতক",
  "Best places":"শ্ৰেষ্ঠ ঠাই", "Best time":"সৰ্বোত্তম সময়", "How to reach":"কেনেকৈ যাব", "Travel cost":"ভ্ৰমণ খৰচ", Hotels:"হোটেল", Food:"খাদ্য", "Local transport":"স্থানীয় পৰিবহণ", "Plan my trip":"মোৰ ভ্ৰমণৰ পৰিকল্পনা কৰক", "Where should I go?":"মই ক'লৈ যাব লাগে?", "When is the best time to visit?":"ভ্ৰমণৰ সৰ্বোত্তম সময় কেতিয়া?", "How should I travel?":"মই কেনেকৈ ভ্ৰমণ কৰিব লাগে?", "Where should I stay?":"মই ক'ত থাকিব লাগে?", "What food should I try?":"মই কি খাদ্য চেষ্টা কৰিব লাগে?", "What is local transport like?":"স্থানীয় পৰিবহণ কেনেকুৱা?", "Can you make me a trip plan?":"আপুনি মোৰ ভ্ৰমণৰ পৰিকল্পনা কৰিব পাৰিবনে?",
};

const rajasthani: TranslationMap = {
  ...english, Home:"घर", Explore:"राज्य देखो", Culture:"संस्कृति", Languages:"भाषा", Quests:"क्विज़", "About Us":"हमारे बारे में", "My Journey":"म्हारी यात्रा", Profile:"प्रोफ़ाइल", Journey:"यात्रा",
  "Explore India. Connect with Culture.":"भारत ने जाणो। संस्कृति सूं जुड़ो।", "A living atlas of India":"भारत रो जीवंत सांस्कृतिक नक्शो", "Discover India,":"भारत ने खोजो,", "One State at a Time":"एक बखत में एक राज्य", "Start Exploring":"खोज शुरू करो", "Meet Your AI Guide":"आपणो AI गाइड मिलो",
  "Explore the Essence of India":"भारत री संस्कृति ने जाणो", "Culture & Traditions":"संस्कृति अर परंपरा", "Taste of India":"भारत रो स्वाद", "Must-Visit Places":"जरूर देखण लायक जगह", "Festivals & Fairs":"त्योहार अर मेळा", "Stories & Folklore":"किस्सा अर लोककथा", "Local Languages":"स्थानीय बोलियां", "Select Your State":"आपणो राज्य चुनो", "View All States":"सगळा राज्य देखो", "Meet Your AI Guides":"आपणा AI गाइडां सूं मिलो", "Continue Your Journey":"आपणी यात्रा चालू राखो", "Culture Points":"संस्कृति अंक",
  "Your interactive atlas":"आपणो इंटरैक्टिव नक्शो", "Choose a state,":"एक राज्य चुनो,", "meet its culture.":"अर उणी संस्कृति ने जाणो।", "Search a state...":"राज्य खोजो...", "Coming soon":"जल्द आवेगा", "Start here":"इण ठौर सूं शुरू करो", "Guides ready to meet you":"गाइड आपसे मिलण ने तैयार हैं",
  "Your cultural guide":"आपणो सांस्कृतिक गाइड", "Welcome to":"पधारो", "Best time to visit":"घूमण रो सगळो समय", "Estimated cost":"अंदाजित खर्च", "Travel budget":"यात्रा बजट", "Plan My Journey":"म्हारी यात्रा री योजना", Travellers:"यात्री", Days:"दिन", "Travel style":"यात्रा री शैली", "Create plan":"योजना बनाओ", Comfort:"आरामदायक", Budget:"बजट", Premium:"प्रीमियम", "Check bus options":"बस विकल्प देखो", "Check local rides":"स्थानीय सवारी देखो", "Check trains":"ट्रेन देखो", "Check flights":"फ्लाइट देखो", "Chat with":"बात करो",
  "Best places":"सगळा बढ़िया जगह", "Best time":"सगळो समय", "How to reach":"कुण रीते पहुंचो", "Travel cost":"यात्रा खर्च", Hotels:"होटल", Food:"खाणो", "Local transport":"स्थानीय सवारी", "Plan my trip":"म्हारी यात्रा बनाओ", "Where should I go?":"म्हैं कठे जाऊं?", "When is the best time to visit?":"घूमण रो सगळो समय कठे है?", "How should I travel?":"म्हैं कुण रीते जाऊं?", "Where should I stay?":"म्हैं कठे ठहरूं?", "What food should I try?":"म्हैं कूणसूं खाणो चखूं?", "What is local transport like?":"स्थानीय सवारी किण री है?", "Can you make me a trip plan?":"थां म्हारी यात्रा री योजना बना सको?",
};

/**
 * Short, ambiguous UI words that machine translation reliably gets wrong out
 * of context — "States" came back as "United States", "Round" as a shape.
 * Pinning them here stops the live translator from ever being asked.
 */
const pinned: Record<Exclude<Language, "English">, TranslationMap> = {
  Hindi: {
    States: "राज्य", UTs: "केंद्र शासित प्रदेश", Cultures: "संस्कृतियाँ", Places: "स्थान",
    Round: "दौर", Score: "स्कोर", Level: "स्तर", Best: "सर्वश्रेष्ठ", New: "नया",
    Learn: "सीखें", Learned: "सीख लिया", learned: "सीखे", Missed: "छूटे", region: "क्षेत्र",
    regions: "क्षेत्र", matching: "से मेल खाते", Badges: "बैज", "Day streak": "लगातार दिन",
    North: "उत्तर", South: "दक्षिण", East: "पूर्व", West: "पश्चिम", Central: "मध्य",
    Northeast: "पूर्वोत्तर", Islands: "द्वीप समूह", Phrases: "वाक्यांश", phrases: "वाक्यांश",
    Capital: "राजधानी", Region: "क्षेत्र", stamped: "अंकित",
  },
  Bengali: {
    States: "রাজ্য", UTs: "কেন্দ্রশাসিত অঞ্চল", Cultures: "সংস্কৃতি", Places: "স্থান",
    Round: "রাউন্ড", Score: "স্কোর", Level: "স্তর", Best: "সেরা", New: "নতুন",
    Learn: "শিখুন", Learned: "শেখা হয়েছে", learned: "শেখা", Missed: "বাদ পড়েছে", region: "অঞ্চল",
    regions: "অঞ্চল", matching: "মিলছে", Badges: "ব্যাজ", "Day streak": "টানা দিন",
    North: "উত্তর", South: "দক্ষিণ", East: "পূর্ব", West: "পশ্চিম", Central: "মধ্য",
    Northeast: "উত্তর-পূর্ব", Islands: "দ্বীপপুঞ্জ", Phrases: "বাক্যাংশ", phrases: "বাক্যাংশ",
    Capital: "রাজধানী", Region: "অঞ্চল", stamped: "ছাপ পড়েছে",
  },
  Assamese: {
    States: "ৰাজ্য", UTs: "কেন্দ্ৰীয় শাসিত অঞ্চল", Cultures: "সংস্কৃতি", Places: "ঠাই",
    Round: "ৰাউণ্ড", Score: "স্কোৰ", Level: "স্তৰ", Best: "শ্ৰেষ্ঠ", New: "নতুন",
    Learn: "শিকক", Learned: "শিকা হ'ল", learned: "শিকা", Missed: "বাদ পৰিল", region: "অঞ্চল",
    regions: "অঞ্চল", matching: "মিলা", Badges: "বেজ", "Day streak": "একেৰাহে দিন",
    North: "উত্তৰ", South: "দক্ষিণ", East: "পূব", West: "পশ্চিম", Central: "মধ্য",
    Northeast: "উত্তৰ-পূব", Islands: "দ্বীপপুঞ্জ", Phrases: "বাক্যাংশ", phrases: "বাক্যাংশ",
    Capital: "ৰাজধানী", Region: "অঞ্চল", stamped: "ছাব পৰিল",
  },
  Rajasthani: {
    States: "राज्य", UTs: "केंद्र शासित प्रदेश", Cultures: "संस्कृतियां", Places: "ठौर",
    Round: "दौर", Score: "स्कोर", Level: "स्तर", Best: "सगळो बढ़िया", New: "नयो",
    Learn: "सीखो", Learned: "सीख लियो", learned: "सीख्या", Missed: "छूट्या", region: "इलाको",
    regions: "इलाका", matching: "सूं मिलता", Badges: "बैज", "Day streak": "लगातार दिन",
    North: "उत्तर", South: "दक्षिण", East: "पूरब", West: "पश्चिम", Central: "मध्य",
    Northeast: "पूर्वोत्तर", Islands: "टापू", Phrases: "बोल", phrases: "बोल",
    Capital: "राजधानी", Region: "इलाको", stamped: "छाप लाग्यो",
  },
};

export const translations: Record<Language, TranslationMap> = {
  English: english,
  Hindi: { ...hindi, ...pinned.Hindi },
  Bengali: { ...bengali, ...pinned.Bengali },
  Assamese: { ...assamese, ...pinned.Assamese },
  Rajasthani: { ...rajasthani, ...pinned.Rajasthani },
};

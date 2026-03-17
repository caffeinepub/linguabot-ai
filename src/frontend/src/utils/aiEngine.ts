// LinguaBot AI Engine - Local Knowledge Base & Response System

export type Language = {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
};

export const LANGUAGES: Language[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷" },
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦" },
  { code: "zh", name: "Chinese", nativeName: "中文", flag: "🇨🇳" },
  { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵" },
  { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪" },
  { code: "pt", name: "Portuguese", nativeName: "Português", flag: "🇧🇷" },
  { code: "ru", name: "Russian", nativeName: "Русский", flag: "🇷🇺" },
];

type KnowledgeEntry = {
  topic: string;
  patterns: string[];
  responses: Partial<Record<string, string>>;
};

const knowledgeBase: KnowledgeEntry[] = [
  {
    topic: "greeting",
    patterns: [
      "hello",
      "hi",
      "hey",
      "namaste",
      "नमस्ते",
      "hola",
      "bonjour",
      "你好",
      "こんにちは",
      "hallo",
      "olá",
      "привет",
      "مرحبا",
      "salut",
      "greet",
    ],
    responses: {
      en: "Hello! I'm LinguaBot, your multilingual AI assistant. I can help you with questions, translations, science facts, history, math, and much more. What would you like to explore today?",
      hi: "नमस्ते! मैं LinguaBot हूँ, आपका बहुभाषी AI सहायक। मैं आपको सवालों के जवाब, अनुवाद, विज्ञान, इतिहास, गणित और बहुत कुछ में मदद कर सकता हूँ। आज आप क्या जानना चाहते हैं?",
      es: "¡Hola! Soy LinguaBot, tu asistente de IA multilingüe. Puedo ayudarte con preguntas, traducciones, ciencia, historia, matemáticas y mucho más. ¿Qué te gustaría explorar hoy?",
      fr: "Bonjour! Je suis LinguaBot, votre assistant IA multilingue. Je peux vous aider avec des questions, des traductions, la science, l'histoire, les mathématiques et bien plus encore.",
      ar: "مرحباً! أنا LinguaBot، مساعدك الذكي متعدد اللغات. يمكنني مساعدتك في الأسئلة والترجمات والعلوم والتاريخ والرياضيات وأكثر من ذلك بكثير.",
      zh: "你好！我是LinguaBot，您的多语言AI助手。我可以帮助您解答问题、翻译、科学、历史、数学等等。",
      ja: "こんにちは！私はLinguaBotです。多言語対応のAIアシスタントです。質問への回答、翻訳、科学、歴史、数学など、様々なことをお手伝いします。",
      de: "Hallo! Ich bin LinguaBot, Ihr mehrsprachiger KI-Assistent. Ich kann Ihnen bei Fragen, Übersetzungen, Wissenschaft, Geschichte, Mathematik und vielem mehr helfen.",
      pt: "Olá! Sou LinguaBot, seu assistente de IA multilíngue. Posso ajudá-lo com perguntas, traduções, ciência, história, matemática e muito mais.",
      ru: "Привет! Я LinguaBot, ваш многоязычный AI-помощник. Я могу помочь вам с вопросами, переводами, наукой, историей, математикой и многим другим.",
    },
  },
  {
    topic: "how_are_you",
    patterns: [
      "how are you",
      "how do you do",
      "what's up",
      "kaise ho",
      "कैसे हो",
      "comment vas-tu",
      "¿cómo estás",
      "wie geht es",
      "come stai",
    ],
    responses: {
      en: "I'm doing great, thank you for asking! As an AI, I'm always ready to help, learn, and explore new topics with you. My circuits are buzzing with knowledge! How can I assist you today?",
      hi: "मैं बिल्कुल ठीक हूँ, पूछने के लिए धन्यवाद! एक AI के रूप में, मैं हमेशा आपकी मदद करने और नए विषयों को explore करने के लिए तैयार हूँ। आज आपकी कैसे सहायता करूँ?",
      es: "¡Estoy muy bien, gracias por preguntar! Como IA, siempre estoy listo para ayudar y explorar nuevos temas contigo. ¿Cómo puedo ayudarte hoy?",
      fr: "Je vais très bien, merci de demander! En tant qu'IA, je suis toujours prêt à aider et explorer de nouveaux sujets avec vous.",
      zh: "我很好，谢谢你的询问！作为AI，我随时准备帮助您探索新话题。今天我能为您做什么？",
      ja: "元気です、聞いてくれてありがとう！AIとして、常に新しいトピックを探求する準備ができています。今日はどのようにお手伝いできますか？",
      de: "Mir geht es sehr gut, danke der Nachfrage! Als KI bin ich immer bereit zu helfen. Wie kann ich Ihnen heute helfen?",
      ru: "Я в порядке, спасибо за вопрос! Как ИИ, я всегда готов помочь. Чем могу помочь сегодня?",
    },
  },
  {
    topic: "earth_science",
    patterns: [
      "earth",
      "planet",
      "solar system",
      "sun",
      "moon",
      "पृथ्वी",
      "ग्रह",
      "सूरज",
      "चाँद",
      "universe",
      "galaxy",
      "space",
    ],
    responses: {
      en: "🌍 **Earth & Space Facts:**\n\n• **Earth** is approximately 4.5 billion years old and the only known planet harboring life.\n• The **Sun** is 109 times larger than Earth and accounts for 99.86% of the Solar System's total mass.\n• Our **Milky Way** galaxy contains over 200 billion stars.\n• The **Moon** stabilizes Earth's axial tilt and creates ocean tides.\n• **Mars** has the tallest volcano in the Solar System — Olympus Mons at 21 km high.\n\nWould you like to know more about any specific celestial body?",
      hi: "🌍 **पृथ्वी और अंतरिक्ष के तथ्य:**\n\n• **पृथ्वी** लगभग 4.5 अरब साल पुरानी है और एकमात्र ज्ञात ग्रह है जहाँ जीवन है।\n• **सूर्य** पृथ्वी से 109 गुना बड़ा है।\n• **आकाशगंगा** में 200 अरब से अधिक तारे हैं।\n• **मंगल** पर सौरमंडल का सबसे ऊंचा ज्वालामुखी है - ओलंपस मॉन्स।\n\nकिसी विशेष खगोलीय पिंड के बारे में और जानना चाहते हैं?",
    },
  },
  {
    topic: "artificial_intelligence",
    patterns: [
      "ai",
      "artificial intelligence",
      "machine learning",
      "deep learning",
      "neural network",
      "robot",
      "automation",
      "कृत्रिम बुद्धिमत्ता",
      "एआई",
    ],
    responses: {
      en: "🤖 **Artificial Intelligence:**\n\nAI is the simulation of human intelligence in machines. Key branches include:\n\n• **Machine Learning** — Systems that learn from data\n• **Deep Learning** — Neural networks inspired by the human brain\n• **Natural Language Processing** — Understanding human language\n• **Computer Vision** — Interpreting visual information\n\nAI is revolutionizing healthcare, transportation, education, and creativity. The global AI market is expected to reach $1.8 trillion by 2030.",
      hi: "🤖 **कृत्रिम बुद्धिमत्ता (AI):**\n\nAI मशीनों में मानव बुद्धि का अनुकरण है। मुख्य शाखाएँ:\n\n• **मशीन लर्निंग** — डेटा से सीखने वाले सिस्टम\n• **डीप लर्निंग** — मानव मस्तिष्क से प्रेरित न्यूरल नेटवर्क\n• **NLP** — मानव भाषा को समझना\n\nAI स्वास्थ्य, शिक्षा और तकनीक में क्रांति ला रहा है।",
      zh: "🤖 **人工智能：**\n\nAI是在机器中模拟人类智能。主要分支包括机器学习、深度学习、自然语言处理和计算机视觉。AI正在革命性地改变医疗、交通、教育和创造力领域。",
    },
  },
  {
    topic: "history",
    patterns: [
      "history",
      "ancient",
      "war",
      "civilization",
      "egypt",
      "rome",
      "india",
      "china",
      "इतिहास",
      "प्राचीन",
      "युद्ध",
      "सभ्यता",
    ],
    responses: {
      en: "📜 **World History Highlights:**\n\n• **Ancient Egypt** (3100–30 BC) — One of the earliest civilizations, builders of the pyramids.\n• **The Roman Empire** — Dominated Europe and the Mediterranean for 500+ years.\n• **Indus Valley Civilization** (3300–1300 BC) — Advanced urban planning in modern-day Pakistan/India.\n• **The Renaissance** (14th–17th century) — Rebirth of art, science, and culture in Europe.\n• **World War II** (1939–1945) — The deadliest conflict in human history involving 30+ nations.\n\nWhich era or civilization interests you most?",
      hi: "📜 **विश्व इतिहास:**\n\n• **प्राचीन मिस्र** (3100–30 ईसा पूर्व) — पिरामिड बनाने वाली महान सभ्यता।\n• **रोमन साम्राज्य** — 500+ वर्षों तक यूरोप पर शासन।\n• **सिंधु घाटी सभ्यता** (3300–1300 ईसा पूर्व) — उन्नत नगर योजना वाली सभ्यता।\n• **द्वितीय विश्व युद्ध** (1939–1945) — मानव इतिहास का सबसे घातक संघर्ष।",
    },
  },
  {
    topic: "time_date",
    patterns: [
      "time",
      "date",
      "today",
      "what day",
      "what time",
      "समय",
      "तारीख",
      "आज",
      "quelle heure",
      "fecha",
    ],
    responses: {
      en: "__DYNAMIC_TIME__",
      hi: "__DYNAMIC_TIME_HI__",
      es: "__DYNAMIC_TIME_ES__",
      fr: "__DYNAMIC_TIME_FR__",
      zh: "__DYNAMIC_TIME_ZH__",
    },
  },
  {
    topic: "health",
    patterns: [
      "health",
      "fitness",
      "exercise",
      "diet",
      "nutrition",
      "sleep",
      "mental health",
      "स्वास्थ्य",
      "व्यायाम",
      "नींद",
      "salud",
      "santé",
    ],
    responses: {
      en: "💪 **Health & Wellness Tips:**\n\n• **Exercise** — Aim for 150 minutes of moderate exercise per week. Even 30-minute walks make a difference!\n• **Nutrition** — Fill half your plate with fruits and vegetables. Stay hydrated with 8 glasses of water daily.\n• **Sleep** — Adults need 7–9 hours of quality sleep. Consistent sleep schedules improve mental sharpness.\n• **Mental Health** — Practice mindfulness or meditation for 10 minutes daily. Social connections are vital for wellbeing.\n• **Stress Management** — Deep breathing, yoga, and time in nature significantly reduce stress hormones.\n\nSmall daily habits compound into extraordinary health over time! 🌱",
      hi: "💪 **स्वास्थ्य और फिटनेस टिप्स:**\n\n• **व्यायाम** — प्रति सप्ताह 150 मिनट का मध्यम व्यायाम करें।\n• **पोषण** — अपनी थाली का आधा हिस्सा फल और सब्जियों से भरें।\n• **नींद** — वयस्कों को 7-9 घंटे की गुणवत्तापूर्ण नींद चाहिए।\n• **मानसिक स्वास्थ्य** — प्रतिदिन 10 मिनट ध्यान का अभ्यास करें।\n\nछोटी-छोटी आदतें मिलकर असाधारण स्वास्थ्य बनाती हैं! 🌱",
    },
  },
  {
    topic: "technology",
    patterns: [
      "technology",
      "computer",
      "internet",
      "programming",
      "software",
      "hardware",
      "blockchain",
      "crypto",
      "web",
      "app",
      "तकनीक",
      "कंप्यूटर",
    ],
    responses: {
      en: "💻 **Technology Insights:**\n\n• **The Internet** connects 5.4 billion people worldwide (67% of the global population).\n• **Moore's Law** — Computer processing power doubles approximately every 2 years.\n• **Quantum Computing** promises to solve problems classical computers can't in millions of years.\n• **The cloud** stores approximately 100 zettabytes of data globally.\n• **5G networks** are 100x faster than 4G, enabling IoT, autonomous vehicles, and remote surgery.\n• **Blockchain** enables trustless, decentralized transactions without intermediaries.\n\nTechnology is evolving faster than ever — exciting times ahead! 🚀",
      hi: "💻 **तकनीक की जानकारी:**\n\n• **इंटरनेट** दुनिया भर के 5.4 अरब लोगों को जोड़ता है।\n• **क्वांटम कंप्यूटिंग** ऐसी समस्याओं को हल करेगी जो शास्त्रीय कंप्यूटर नहीं कर सकते।\n• **5G नेटवर्क** 4G से 100 गुना तेज है।\n• **ब्लॉकचेन** विकेंद्रीकृत लेनदेन को सक्षम बनाता है।",
    },
  },
  {
    topic: "science",
    patterns: [
      "science",
      "physics",
      "chemistry",
      "biology",
      "experiment",
      "atom",
      "molecule",
      "विज्ञान",
      "भौतिकी",
      "रसायन",
      "जीव विज्ञान",
    ],
    responses: {
      en: "🔬 **Science Wonders:**\n\n• **Physics**: E = mc² — Energy equals mass times the speed of light squared. Einstein's most famous equation.\n• **Chemistry**: Water (H₂O) is the only substance that naturally occurs as solid, liquid, and gas on Earth's surface.\n• **Biology**: The human body contains approximately 37 trillion cells, each with a complete copy of your DNA.\n• **Quantum Physics**: Particles can exist in multiple states simultaneously (superposition) until observed.\n• **Neuroscience**: The human brain has ~86 billion neurons forming 100 trillion connections.\n\nScience is humanity's greatest adventure! 🧪",
      hi: "🔬 **विज्ञान के चमत्कार:**\n\n• **भौतिकी**: E = mc² — ऊर्जा, द्रव्यमान और प्रकाश की गति के वर्ग के बराबर होती है।\n• **रसायन**: पानी (H₂O) एकमात्र पदार्थ है जो पृथ्वी पर ठोस, तरल और गैस के रूप में पाया जाता है।\n• **जीव विज्ञान**: मानव शरीर में लगभग 37 लाख करोड़ कोशिकाएँ हैं।\n• **क्वांटम भौतिकी**: कण एक साथ कई अवस्थाओं में मौजूद हो सकते हैं।",
    },
  },
  {
    topic: "jokes",
    patterns: [
      "joke",
      "funny",
      "laugh",
      "humor",
      "जोक",
      "मज़ाक",
      "हँसाओ",
      "chiste",
      "blague",
    ],
    responses: {
      en: "😄 Here are some fun jokes!\n\n🤖 **Tech Joke:** Why do programmers prefer dark mode?\nBecause light attracts bugs! 🐛\n\n🧪 **Science Joke:** Why can't you trust an atom?\nBecause they make up everything!\n\n📚 **Dad Joke:** I told my computer I needed a break...\nNow it won't stop sending me Kit-Kat ads! 🍫\n\n⚡ **Quick one:** What did the ocean say to the beach?\nNothing, it just waved! 🌊\n\nHope that brought a smile to your face! Want more? 😊",
      hi: "😄 कुछ मज़ेदार जोक्स!\n\n🤖 **टेक जोक:** प्रोग्रामर डार्क मोड क्यों पसंद करते हैं?\nक्योंकि रोशनी से कीड़े (bugs) आते हैं! 🐛\n\n🧪 **साइंस जोक:** परमाणु पर भरोसा क्यों नहीं?\nक्योंकि वो सब कुछ बना देते हैं (make up)!\n\nआशा है आप मुस्कुराए! और चाहिए? 😊",
    },
  },
  {
    topic: "motivation",
    patterns: [
      "motivate",
      "inspire",
      "quote",
      "success",
      "motivation",
      "encourage",
      "प्रेरणा",
      "सफलता",
      "उत्साह",
      "motivacion",
    ],
    responses: {
      en: '✨ **Motivational Wisdom:**\n\n💫 *"The only way to do great work is to love what you do."* — Steve Jobs\n\n🌟 *"Success is not final, failure is not fatal: It is the courage to continue that counts."* — Winston Churchill\n\n🚀 *"In the middle of every difficulty lies opportunity."* — Albert Einstein\n\n🔥 *"Believe you can and you\'re halfway there."* — Theodore Roosevelt\n\n🌱 *"The secret of getting ahead is getting started."* — Mark Twain\n\nYou have the potential for greatness within you. Keep going! 💪',
      hi: '✨ **प्रेरक विचार:**\n\n💫 *"महान काम करने का एकमात्र तरीका यह है कि आप जो करते हैं उसे प्यार करें।"* — स्टीव जॉब्स\n\n🌟 *"सफलता अंतिम नहीं है, असफलता घातक नहीं है: जारी रखने का साहस ही मायने रखता है।"* — विंस्टन चर्चिल\n\n🚀 *"हर कठिनाई के बीच में एक अवसर छुपा होता है।"* — अल्बर्ट आइंस्टीन\n\nआपके अंदर महानता की क्षमता है। आगे बढ़ते रहें! 💪',
    },
  },
  {
    topic: "geography",
    patterns: [
      "country",
      "capital",
      "continent",
      "ocean",
      "mountain",
      "river",
      "देश",
      "राजधानी",
      "महाद्वीप",
      "पहाड़",
      "नदी",
    ],
    responses: {
      en: "🌍 **Geography Facts:**\n\n• **Largest country**: Russia (17.1 million km²)\n• **Smallest country**: Vatican City (0.44 km²)\n• **Longest river**: Nile River at 6,650 km\n• **Highest mountain**: Mt. Everest at 8,849 m above sea level\n• **Deepest ocean point**: Mariana Trench at 10,935 m\n• **Most populated country**: India (1.44 billion people as of 2024)\n• **7 Continents**: Asia, Africa, North America, South America, Europe, Australia, Antarctica\n\nOur planet is truly magnificent! 🗺️",
      hi: "🌍 **भूगोल के तथ्य:**\n\n• **सबसे बड़ा देश**: रूस (17.1 मिलियन वर्ग किमी)\n• **सबसे लंबी नदी**: नील नदी (6,650 किमी)\n• **सबसे ऊंचा पर्वत**: माउंट एवरेस्ट (8,849 मीटर)\n• **सबसे गहरा समुद्री बिंदु**: मारियाना ट्रेंच (10,935 मीटर)\n• **सर्वाधिक जनसंख्या वाला देश**: भारत (1.44 अरब लोग)",
    },
  },
  {
    topic: "food",
    patterns: [
      "food",
      "recipe",
      "cook",
      "eat",
      "cuisine",
      "restaurant",
      "खाना",
      "रेसिपी",
      "पकाना",
      "comida",
      "nourriture",
    ],
    responses: {
      en: "🍽️ **World Cuisine Highlights:**\n\n🇮🇳 **Indian**: Rich in spices — turmeric, cumin, cardamom. Butter Chicken, Biryani, Samosas are globally loved.\n🇮🇹 **Italian**: Pizza originated in Naples (1889). Pasta comes in 350+ shapes.\n🇯🇵 **Japanese**: Sushi was originally a preservation method for fish. Japan has the most Michelin-starred restaurants.\n🇲🇽 **Mexican**: Chocolate was first consumed by Aztecs. Mexico is home to 59 varieties of chili.\n🇫🇷 **French**: Baguette is an iconic cultural symbol. France produces 1,600+ types of cheese.\n\nFood is the universal language of love! 🌮",
      hi: "🍽️ **विश्व व्यंजन:**\n\n🇮🇳 **भारतीय**: हल्दी, जीरा, इलायची जैसे मसालों से भरपूर। बटर चिकन, बिरयानी, समोसे दुनिया भर में पसंद किए जाते हैं।\n🇯🇵 **जापानी**: सुशी मूल रूप से मछली संरक्षण की एक विधि थी।\n🇲🇽 **मैक्सिकन**: चॉकलेट पहली बार एज़्टेक लोगों ने खाया था।",
    },
  },
  {
    topic: "language",
    patterns: [
      "language",
      "translate",
      "speak",
      "word",
      "भाषा",
      "अनुवाद",
      "बोलना",
      "traduction",
      "traducir",
      "sprache",
    ],
    responses: {
      en: "🗣️ **Languages of the World:**\n\n• There are approximately **7,100 languages** spoken worldwide.\n• **Mandarin Chinese** is the most spoken language with 1.1 billion speakers.\n• **English** is the official language of 67 countries.\n• **Arabic** is written right-to-left and has 30+ dialects.\n• **Sanskrit** is considered the mother of many Indo-European languages.\n• The **most complex** language in terms of grammar is often considered Tuyuca (Amazon).\n• **50%** of the world's languages are at risk of extinction.\n\nI can respond in 10 languages — just change the language selector! 🌐",
      hi: "🗣️ **दुनिया की भाषाएँ:**\n\n• दुनिया में लगभग **7,100 भाषाएँ** बोली जाती हैं।\n• **मंदारिन चीनी** सबसे अधिक बोली जाने वाली भाषा है (1.1 अरब वक्ता)।\n• **संस्कृत** को कई इंडो-यूरोपीय भाषाओं की जननी माना जाता है।\n• **50%** दुनिया की भाषाएँ विलुप्त होने के खतरे में हैं।\n\nमैं 10 भाषाओं में जवाब दे सकता हूँ — बस भाषा चुनिए! 🌐",
    },
  },
  {
    topic: "mathematics",
    patterns: [
      "math",
      "calculate",
      "number",
      "equation",
      "algebra",
      "geometry",
      "statistics",
      "गणित",
      "हिसाब",
      "नंबर",
      "calcul",
    ],
    responses: {
      en: "🔢 **Mathematics Fundamentals:**\n\n• **Pi (π)** ≈ 3.14159 — The ratio of a circle's circumference to its diameter. Infinite digits!\n• **Fibonacci Sequence**: 0, 1, 1, 2, 3, 5, 8, 13... Each number is the sum of the two before it.\n• **Euler's Identity**: e^(iπ) + 1 = 0 — Called the most beautiful equation in mathematics.\n• **Prime Numbers** are infinite — there's no largest prime number.\n• **Googol** = 10^100 (1 followed by 100 zeros).\n\n💡 **Tip**: Ask me to calculate something! E.g., \"What is 15 × 24?\" and I'll compute it for you!",
      hi: '🔢 **गणित के मूल सिद्धांत:**\n\n• **पाई (π)** ≈ 3.14159 — वृत्त की परिधि और व्यास का अनुपात।\n• **फिबोनाची अनुक्रम**: 0, 1, 1, 2, 3, 5, 8, 13...\n• **यूलर की पहचान**: e^(iπ) + 1 = 0 — गणित का सबसे सुंदर समीकरण।\n\n💡 **टिप**: मुझसे कुछ गणना करवाएं! जैसे "15 × 24 क्या है?" और मैं आपको जवाब दूंगा!',
    },
  },
  {
    topic: "environment",
    patterns: [
      "environment",
      "climate",
      "global warming",
      "pollution",
      "nature",
      "green",
      "पर्यावरण",
      "जलवायु",
      "प्रदूषण",
      "प्रकृति",
    ],
    responses: {
      en: "🌿 **Environment & Climate:**\n\n• **CO₂ levels** have risen to 420 ppm — the highest in 3 million years.\n• **Deforestation** destroys about 15 billion trees per year.\n• **Renewable energy** (solar, wind) now accounts for 30% of global electricity.\n• The **Great Pacific Garbage Patch** is twice the size of Texas.\n• **Electric vehicles** have grown 10x in the last 5 years.\n\n🌱 **What you can do:**\nReduce, reuse, recycle. Choose public transport. Eat less meat. Plant trees!\n\nEvery action counts for our planet's future! 🌍",
      hi: "🌿 **पर्यावरण और जलवायु:**\n\n• **CO₂ का स्तर** 420 ppm तक पहुँच गया है — 30 लाख वर्षों में सबसे अधिक।\n• हर साल लगभग **15 अरब पेड़** काटे जाते हैं।\n• **नवीकरणीय ऊर्जा** अब वैश्विक बिजली का 30% है।\n\n🌱 **आप क्या कर सकते हैं:**\nकम करें, पुनः उपयोग करें, रीसायकल करें। पेड़ लगाएं! हमारे ग्रह के भविष्य के लिए हर कदम मायने रखता है!",
    },
  },
  {
    topic: "music",
    patterns: [
      "music",
      "song",
      "singer",
      "artist",
      "band",
      "concert",
      "संगीत",
      "गाना",
      "गायक",
      "musique",
      "música",
    ],
    responses: {
      en: "🎵 **Music Around the World:**\n\n• **Classical** — Beethoven, Mozart, Bach shaped Western music for centuries.\n• **Jazz** — Born in New Orleans in the early 20th century, the 'American art form.'\n• **Bollywood** — India's film music industry produces 1,000+ songs per year.\n• **K-Pop** — South Korean pop has conquered global charts with BTS, BLACKPINK.\n• **Music therapy** can reduce anxiety by 65%, pain by 21%.\n• Listening to music releases **dopamine**, improving mood.\n\n🎶 What genre of music do you enjoy most?",
      hi: "🎵 **दुनिया का संगीत:**\n\n• **शास्त्रीय संगीत** — बीथोवेन, मोज़ार्ट ने पश्चिमी संगीत को सदियों तक आकार दिया।\n• **बॉलीवुड** — भारत का फिल्म संगीत उद्योग हर साल 1000+ गाने बनाता है।\n• **म्यूजिक थेरेपी** चिंता को 65% तक कम कर सकती है।\n• संगीत सुनने से **डोपामिन** निकलता है जो मूड को बेहतर बनाता है।",
    },
  },
  {
    topic: "thank_you",
    patterns: [
      "thank",
      "thanks",
      "thank you",
      "धन्यवाद",
      "शुक्रिया",
      "gracias",
      "merci",
      "danke",
      "obrigado",
      "спасибо",
    ],
    responses: {
      en: "You're very welcome! 😊 It's my pleasure to assist you. LinguaBot is here whenever you need help — whether it's knowledge, translation, or just a friendly conversation. Is there anything else I can help you with?",
      hi: "आपका बहुत स्वागत है! 😊 आपकी सहायता करना मेरा सौभाग्य है। LinguaBot हमेशा यहाँ है — चाहे ज्ञान हो, अनुवाद हो, या बस एक दोस्ताना बातचीत। क्या कुछ और मदद कर सकता हूँ?",
      es: "¡De nada! 😊 Es un placer ayudarte. LinguaBot siempre está aquí cuando necesites ayuda.",
      fr: "De rien! 😊 C'est mon plaisir de vous aider. LinguaBot est toujours là quand vous avez besoin d'aide.",
      de: "Gern geschehen! 😊 Es ist mir ein Vergnügen zu helfen. LinguaBot ist immer für Sie da.",
      ru: "Пожалуйста! 😊 Я рад помочь вам. LinguaBot всегда здесь, когда вам нужна помощь.",
    },
  },
  {
    topic: "weather",
    patterns: [
      "weather",
      "rain",
      "snow",
      "temperature",
      "climate forecast",
      "मौसम",
      "बारिश",
      "बर्फ",
      "तापमान",
    ],
    responses: {
      en: "🌤️ I don't have access to real-time weather data, but here are some interesting weather facts!\n\n• **Lightning** strikes Earth about 100 times per second.\n• The **hottest temperature** ever recorded was 56.7°C (134°F) in Death Valley, California.\n• The **coldest** was -89.2°C (-128.6°F) in Vostok, Antarctica.\n• A **hurricane** can release energy equivalent to 10,000 nuclear bombs.\n• **Raindrops** fall at about 9 meters per second.\n\nFor real-time weather, I recommend checking weather.com or your local weather service! 🌍",
      hi: "🌤️ मेरे पास रियल-टाइम मौसम डेटा नहीं है, लेकिन यहाँ कुछ रोचक तथ्य हैं!\n\n• **बिजली** प्रति सेकंड लगभग 100 बार पृथ्वी पर गिरती है।\n• अब तक दर्ज सबसे **गर्म तापमान** 56.7°C था।\n• **तूफान** 10,000 परमाणु बमों के बराबर ऊर्जा छोड़ सकता है।\n\nवास्तविक समय के मौसम के लिए, weather.com देखें! 🌍",
    },
  },
  {
    topic: "sports",
    patterns: [
      "sport",
      "football",
      "cricket",
      "basketball",
      "tennis",
      "olympics",
      "खेल",
      "क्रिकेट",
      "फुटबॉल",
      "deporte",
    ],
    responses: {
      en: "⚽ **World of Sports:**\n\n• **Football (Soccer)** — 4 billion fans worldwide, the most popular sport globally.\n• **Cricket** — 2.5 billion fans, dominant in South Asia, UK, and Australia.\n• **Basketball** — Created in 1891 by James Naismith. NBA is the top professional league.\n• **Olympics** — First held in 776 BC in ancient Greece. Modern Olympics since 1896.\n• **Tennis** — 4 Grand Slams: Australian Open, French Open, Wimbledon, US Open.\n\n🏆 Sports teach teamwork, discipline, and perseverance! What's your favorite sport?",
      hi: "⚽ **खेलों की दुनिया:**\n\n• **फुटबॉल** — 4 अरब प्रशंसकों के साथ दुनिया का सबसे लोकप्रिय खेल।\n• **क्रिकेट** — 2.5 अरब प्रशंसक, दक्षिण एशिया में प्रमुख।\n• **ओलंपिक** — पहली बार 776 ईसा पूर्व में प्राचीन ग्रीस में आयोजित हुए।\n\n🏆 खेल टीमवर्क, अनुशासन और दृढ़ता सिखाते हैं! आपका पसंदीदा खेल कौन सा है?",
    },
  },
];

// Math evaluator
function evaluateMath(input: string): string | null {
  const mathPattern = /(\d+(?:\.\d+)?)\s*([+\-*/×÷x])\s*(\d+(?:\.\d+)?)/;
  const match = input.match(mathPattern);
  if (!match) return null;

  const a = Number.parseFloat(match[1]);
  const op = match[2];
  const b = Number.parseFloat(match[3]);
  let result: number;

  if (op === "+") result = a + b;
  else if (op === "-") result = a - b;
  else if (op === "*" || op === "×" || op === "x") result = a * b;
  else if (op === "/" || op === "÷") {
    if (b === 0) return "Division by zero is undefined! 🚫";
    result = a / b;
  } else return null;

  return `🔢 **${a} ${op} ${b} = ${result}**\n\nMath done! Want me to calculate something else?`;
}

function getDynamicTime(lang: string): string {
  const now = new Date();
  const timeStr = now.toLocaleTimeString(lang === "hi" ? "hi-IN" : "en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const dateStr = now.toLocaleDateString(
    lang === "hi"
      ? "hi-IN"
      : lang === "es"
        ? "es-ES"
        : lang === "fr"
          ? "fr-FR"
          : "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  const responses: Record<string, string> = {
    en: `🕐 **Current Date & Time:**\n\nDate: **${dateStr}**\nTime: **${timeStr}**\n\nI'm always up-to-date with the current time! ⏰`,
    hi: `🕐 **वर्तमान दिनांक और समय:**\n\nतारीख: **${dateStr}**\nसमय: **${timeStr}**\n\nमैं हमेशा वर्तमान समय के साथ अप-टू-डेट हूँ! ⏰`,
    es: `🕐 **Fecha y Hora Actual:**\n\nFecha: **${dateStr}**\nHora: **${timeStr}** ⏰`,
    fr: `🕐 **Date et Heure Actuelles:**\n\nDate: **${dateStr}**\nHeure: **${timeStr}** ⏰`,
    zh: `🕐 **当前日期和时间：**\n\n日期：**${dateStr}**\n时间：**${timeStr}** ⏰`,
  };

  return responses[lang] || responses.en;
}

export function getAIResponse(userMessage: string, language: string): string {
  const msg = userMessage.toLowerCase().trim();

  // Math calculation
  const mathResult = evaluateMath(msg);
  if (mathResult) return mathResult;

  // Check knowledge base
  for (const entry of knowledgeBase) {
    const matched = entry.patterns.some((p) => msg.includes(p.toLowerCase()));
    if (matched) {
      // Handle dynamic time
      if (entry.topic === "time_date") {
        return getDynamicTime(language);
      }

      const response = entry.responses[language] || entry.responses.en;
      if (response) return response;
    }
  }

  // Fallback responses by language
  const fallbacks: Record<string, string[]> = {
    en: [
      "That's a fascinating question! 🤔 While I'm still learning, I can tell you that it's a complex topic worth exploring. Could you give me more context or ask in a different way?",
      "Interesting! I'd love to help with that. Could you be more specific about what you'd like to know? I can discuss science, history, technology, health, mathematics, languages, and much more!",
      "Great question! 💡 I'm a multilingual AI and I'm here to help. Try asking me about science facts, historical events, math calculations, health tips, jokes, or motivational quotes!",
    ],
    hi: [
      "यह बहुत रोचक सवाल है! 🤔 मैं अभी भी सीख रहा हूँ। क्या आप थोड़ा और विस्तार से बता सकते हैं? मैं विज्ञान, इतिहास, तकनीक, स्वास्थ्य, गणित के बारे में बात कर सकता हूँ!",
      "बहुत अच्छा सवाल! 💡 मैं एक बहुभाषी AI हूँ। विज्ञान, इतिहास, गणित, स्वास्थ्य, जोक्स या प्रेरक उद्धरणों के बारे में पूछें!",
      "मैं समझ गया! इस विषय में मुझे और जानकारी चाहिए। कृपया अपना प्रश्न थोड़ा अलग तरीके से पूछें।",
    ],
    es: [
      "¡Pregunta fascinante! 🤔 Aunque sigo aprendiendo, me encantaría ayudarte. ¿Podrías dar más contexto?",
      "¡Interesante! Puedo hablar sobre ciencia, historia, tecnología, salud, matemáticas y mucho más!",
    ],
    fr: [
      "Question fascinante! 🤔 Je suis en train d'apprendre. Pourriez-vous donner plus de contexte?",
      "Intéressant! Je peux parler de science, d'histoire, de technologie, de santé, de mathématiques!",
    ],
    ar: [
      "سؤال رائع! 🤔 أنا لا أزال أتعلم. هل يمكنك تقديم المزيد من السياق؟",
      "مثير للاهتمام! يمكنني التحدث عن العلوم والتاريخ والتكنولوجيا والصحة والرياضيات!",
    ],
    zh: [
      "很有趣的问题！🤔 我还在学习中。您能提供更多背景信息吗？",
      "有意思！我可以谈论科学、历史、技术、健康、数学等话题！",
    ],
    ja: [
      "面白い質問ですね！🤔 まだ学習中ですが、もう少し詳しく教えていただけますか？",
      "興味深いです！科学、歴史、技術、健康、数学について話すことができます！",
    ],
    de: [
      "Faszinierende Frage! 🤔 Ich lerne noch. Könnten Sie mehr Kontext geben?",
      "Interessant! Ich kann über Wissenschaft, Geschichte, Technologie, Gesundheit und Mathematik sprechen!",
    ],
    pt: [
      "Pergunta fascinante! 🤔 Ainda estou aprendendo. Você poderia dar mais contexto?",
      "Interessante! Posso falar sobre ciência, história, tecnologia, saúde, matemática e muito mais!",
    ],
    ru: [
      "Захватывающий вопрос! 🤔 Я всё ещё учусь. Не могли бы вы дать больше контекста?",
      "Интересно! Я могу говорить о науке, истории, технологиях, здоровье и математике!",
    ],
  };

  const langFallbacks = fallbacks[language] || fallbacks.en;
  return langFallbacks[Math.floor(Math.random() * langFallbacks.length)];
}

export function translatePhrase(phrase: string, targetLang: string): string {
  const commonPhrases: Record<string, Record<string, string>> = {
    hello: {
      hi: "नमस्ते",
      es: "Hola",
      fr: "Bonjour",
      ar: "مرحبا",
      zh: "你好",
      ja: "こんにちは",
      de: "Hallo",
      pt: "Olá",
      ru: "Привет",
    },
    "thank you": {
      hi: "धन्यवाद",
      es: "Gracias",
      fr: "Merci",
      ar: "شكرا",
      zh: "谢谢",
      ja: "ありがとう",
      de: "Danke",
      pt: "Obrigado",
      ru: "Спасибо",
    },
    "good morning": {
      hi: "शुभ प्रभात",
      es: "Buenos días",
      fr: "Bonjour",
      ar: "صباح الخير",
      zh: "早上好",
      ja: "おはようございます",
      de: "Guten Morgen",
      pt: "Bom dia",
      ru: "Доброе утро",
    },
    "good night": {
      hi: "शुभ रात्रि",
      es: "Buenas noches",
      fr: "Bonne nuit",
      ar: "تصبح على خير",
      zh: "晚安",
      ja: "おやすみなさい",
      de: "Gute Nacht",
      pt: "Boa noite",
      ru: "Спокойной ночи",
    },
    yes: {
      hi: "हाँ",
      es: "Sí",
      fr: "Oui",
      ar: "نعم",
      zh: "是",
      ja: "はい",
      de: "Ja",
      pt: "Sim",
      ru: "Да",
    },
    no: {
      hi: "नहीं",
      es: "No",
      fr: "Non",
      ar: "لا",
      zh: "不",
      ja: "いいえ",
      de: "Nein",
      pt: "Não",
      ru: "Нет",
    },
    please: {
      hi: "कृपया",
      es: "Por favor",
      fr: "S'il vous plaît",
      ar: "من فضلك",
      zh: "请",
      ja: "お願いします",
      de: "Bitte",
      pt: "Por favor",
      ru: "Пожалуйста",
    },
    love: {
      hi: "प्यार",
      es: "Amor",
      fr: "Amour",
      ar: "حب",
      zh: "爱",
      ja: "愛",
      de: "Liebe",
      pt: "Amor",
      ru: "Любовь",
    },
    friend: {
      hi: "दोस्त",
      es: "Amigo",
      fr: "Ami",
      ar: "صديق",
      zh: "朋友",
      ja: "友達",
      de: "Freund",
      pt: "Amigo",
      ru: "Друг",
    },
    water: {
      hi: "पानी",
      es: "Agua",
      fr: "Eau",
      ar: "ماء",
      zh: "水",
      ja: "水",
      de: "Wasser",
      pt: "Água",
      ru: "Вода",
    },
  };

  const lowerPhrase = phrase.toLowerCase().trim();
  if (commonPhrases[lowerPhrase]?.[targetLang]) {
    const translation = commonPhrases[lowerPhrase][targetLang];
    const langName =
      LANGUAGES.find((l) => l.code === targetLang)?.name || targetLang;
    return `🌐 Translation to ${langName}:\n\n**"${phrase}"** → **"${translation}"**\n\nWould you like to translate more phrases?`;
  }

  return `🌐 I can translate common phrases! Try: "translate hello to Spanish" or "translate thank you to Japanese". Currently I have translations for: hello, thank you, good morning, good night, yes, no, please, love, friend, water.`;
}

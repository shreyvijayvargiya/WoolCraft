export const GOOGLE_FONTS_HREF =
	"https://fonts.googleapis.com/css2?family=Rozha+One&family=Yatra+One&family=Mukta:wght@300;400;600;700&family=Tiro+Devanagari+Hindi:ital@0;1&display=swap";

/** +91 9413732541 — E.164 digits only for wa.me */
export const WHATSAPP_ORDER_NUMBER = "919413732541";

export const GLOBAL_CSS = `
  * { box-sizing: border-box; }
  body { font-family: 'Mukta', sans-serif; background: #F7EDD8; margin: 0; }
  .font-rozha { font-family: 'Comic Sans', serif; }
  .font-yatra { font-family: 'Yatra One', cursive; }
  .font-hindi { font-family: 'Tiro Devanagari Hindi', serif; }
  .font-mukta { font-family: 'Mukta', sans-serif; }
  ::-webkit-scrollbar { width: 6px; height: 4px; }
  ::-webkit-scrollbar-track { background: #EDD8B0; }
  ::-webkit-scrollbar-thumb { background: rgb(240, 192, 64); border-radius: 3px; }
  .rangoli-border {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='24'%3E%3Cpath d='M0 12 L10 4 L20 12 L30 4 L40 12 L50 4 L60 12 L70 4 L80 12' stroke='%23E8620A' stroke-width='1.5' fill='none'/%3E%3Cpath d='M0 12 L10 20 L20 12 L30 20 L40 12 L50 20 L60 12 L70 20 L80 12' stroke='%23E8620A' stroke-width='1.5' fill='none'/%3E%3Ccircle cx='10' cy='4' r='2' fill='%23D4A017'/%3E%3Ccircle cx='30' cy='4' r='2' fill='%23D4A017'/%3E%3Ccircle cx='50' cy='4' r='2' fill='%23D4A017'/%3E%3Ccircle cx='70' cy='4' r='2' fill='%23D4A017'/%3E%3Ccircle cx='10' cy='20' r='2' fill='%230F7B6C'/%3E%3Ccircle cx='30' cy='20' r='2' fill='%230F7B6C'/%3E%3Ccircle cx='50' cy='20' r='2' fill='%230F7B6C'/%3E%3Ccircle cx='70' cy='20' r='2' fill='%230F7B6C'/%3E%3Ccircle cx='20' cy='12' r='3' fill='%23E8620A'/%3E%3Ccircle cx='40' cy='12' r='3' fill='%23E8620A'/%3E%3Ccircle cx='60' cy='12' r='3' fill='%23E8620A'/%3E%3C/svg%3E");
    background-repeat: repeat-x;
    background-position: center;
    height: 24px;
    width: 100%;
  }
  .rangoli-border-teal {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='24'%3E%3Cpath d='M0 12 L10 4 L20 12 L30 4 L40 12 L50 4 L60 12 L70 4 L80 12' stroke='%230F7B6C' stroke-width='1.5' fill='none'/%3E%3Cpath d='M0 12 L10 20 L20 12 L30 20 L40 12 L50 20 L60 12 L70 20 L80 12' stroke='%230F7B6C' stroke-width='1.5' fill='none'/%3E%3Ccircle cx='20' cy='12' r='3' fill='%230F7B6C'/%3E%3Ccircle cx='40' cy='12' r='3' fill='%230F7B6C'/%3E%3Ccircle cx='60' cy='12' r='3' fill='%230F7B6C'/%3E%3Ccircle cx='10' cy='4' r='2' fill='%23D4A017'/%3E%3Ccircle cx='50' cy='4' r='2' fill='%23D4A017'/%3E%3Ccircle cx='30' cy='20' r='2' fill='%23E8620A'/%3E%3Ccircle cx='70' cy='20' r='2' fill='%23E8620A'/%3E%3C/svg%3E");
    background-repeat: repeat-x;
    background-position: center;
    height: 24px;
    width: 100%;
  }
  .paisley-bg {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cellipse cx='60' cy='40' rx='16' ry='28' fill='none' stroke='rgba(247,237,216,0.07)' stroke-width='1.5'/%3E%3Cellipse cx='60' cy='36' rx='10' ry='18' fill='none' stroke='rgba(247,237,216,0.05)' stroke-width='1'/%3E%3Ccircle cx='60' cy='40' r='3' fill='rgba(247,237,216,0.06)'/%3E%3C/svg%3E");
    background-size: 120px 120px;
  }
  .card-hover { transition: all 0.25s ease; }
  .card-hover:hover { transform: translateY(-6px); }
  .stamp-rotate { transform: rotate(12deg); }
  .modal-scroll { overflow-y: auto; max-height: 90vh; }
  .gallery-scroll { overflow-x: auto; scrollbar-width: thin; scrollbar-color: rgb(240, 192, 64) #EDD8B0; }
  .gallery-item { scroll-snap-align: start; scroll-margin-left: 14px; }
  @media (max-width: 640px) {
    .gallery-scroll {
      -webkit-overflow-scrolling: touch;
      scroll-snap-type: x mandatory;
      padding-inline: 14px;
      margin-inline: -14px;
      gap: 10px !important;
    }
  }
`;

export const T = {
	en: {
		langbar: "🇮🇳 woolcraft — हाथ से बनी ऊन कला, Kota",
		nav: ["Products", "Our Story", "Gallery", "FAQ", "🛍 Order Now"],
		heroTag: "Handmade in Kota, Rajasthan 🇮🇳",
		heroTitle: "Wool Art,\nMade with Love.",
		heroHindi: "ऊन की कला, हाथों की मेहनत",
		heroSub:
			"Sunflowers, roses, petals, leaves, gift boxes — every piece shaped from pure wool, one stitch at a time. No factory, no machine. Just one artisan's hands in Kota.",
		heroCta1: "देखें Collection ↓",
		heroCta2: "Order Karo →",
		trust: [
			"100% Handmade",
			"Pure Wool",
			"Ships Across India",
			"Custom Orders",
			"500+ Happy Customers",
		],
		prodTag: "हमारा संग्रह · Our Collection",
		prodTitle: "Handcrafted with Every Stitch",
		prodHindi: "हर कृति, हाथ से बनाई गई",
		prodSub:
			"Six wool creations — flowers, leaves, petals and boxes. Click any piece to see full details and place your order.",
		storyTag: "हमारी कहानी · The Story",
		storyTitle: "One Home, One Artisan.",
		storyHindi: "एक घर, एक कारीगर",
		storySub:
			"Every piece is made by a single pair of hands — not a factory, not a machine. Just patience, pure wool, and a craft tradition passed down through generations in Kota, Rajasthan.",
		features: [
			{
				icon: "scissors",
				title: "Completely Handcrafted",
				desc: "No two pieces are identical. Each shaped, layered and finished entirely by hand.",
			},
			{
				icon: "leaf",
				title: "Pure Wool, No Synthetics",
				desc: "Soft, high-quality wool in rich lasting colours. No plastic, no shortcuts.",
			},
			{
				icon: "palette",
				title: "Custom Orders Welcome",
				desc: "Specific colour, size, occasion? We love custom requests from all over India.",
			},
			{
				icon: "package",
				title: "Ships Pan-India",
				desc: "Carefully packed and dispatched within 3–5 days to your doorstep.",
			},
		],
		galleryTag: "कार्यशाला · Workshop",
		galleryTitle: "Made with Quiet Dedication",
		galleryHindi: "घर में बनाई, दिल से",
		gallerySub:
			"Every piece is a small world of texture and colour — created at home, one afternoon at a time.",
		orderTag: "ऑर्डर करें · Place Order",
		orderTitle: "Ghar Le Jao Ek Piece 🏠",
		orderHindi: "एक कृति अपने घर ले जाएँ",
		orderSub:
			"Order karo aur hum WhatsApp pe confirm karenge — your preferences, size, and delivery, all sorted personally.",
		orderCta: "Order via WhatsApp",
		orderNote: "📞 +91 9413732541 · सोम–शनि · Mon–Sat 10am–7pm IST",
		faqTag: "सवाल-जवाब · FAQ",
		faqTitle: "Common Questions, Answered",
		faqHindi: "आम सवाल, जवाब के साथ",
		faqSub: "Everything you need to know before ordering.",
		faqs: [
			{
				q: "How long does each piece take?",
				a: "Depending on complexity, 2 to 8 hours of careful handwork. Bouquets and gift boxes take longer — which is why every piece feels truly special.",
			},
			{
				q: "Can I request custom colours or design?",
				a: "Bilkul! Custom orders are our favourite. Share your colour preferences, occasion, or reference image and we'll craft it exactly as you imagine.",
			},
			{
				q: "How are products packed and shipped?",
				a: "Each piece is wrapped in tissue and placed in a protective box. We ship via reliable couriers pan-India. Tracking shared once dispatched.",
			},
			{
				q: "How to care for wool craft?",
				a: "Keep away from moisture and sunlight. Gently dust with a soft brush. These decorative pieces last years with minimal care.",
			},
			{
				q: "Shaadi / bulk orders accepted?",
				a: "Haan! Shaadi, corporate gifting, festivals — all welcome. Please contact at least 2–3 weeks in advance for bulk orders.",
			},
			{
				q: "Payment kaise karte hain?",
				a: "UPI (GPay, PhonePe, Paytm), bank transfer aur select locations pe Cash on Delivery. Custom orders need 50% advance.",
			},
		],
		orderModal: {
			title: "Apna Order Dijiye 🛍",
			sub: "Fill details — hum WhatsApp pe confirm karenge.",
			nameLbl: "Aapka Naam *",
			phoneLbl: "WhatsApp Number *",
			selectLbl: "Product Chuniye *",
			selectPlaceholder: "-- Product chuniye --",
			chipsLbl: "Ya seedhe chuniye:",
			addressLbl: "Delivery address",
			addressLine1Lbl: "Street, flat / house no.",
			addressLine2Lbl: "Area, landmark (optional)",
			cityLbl: "City / town",
			stateLbl: "State",
			postalLbl: "PIN code",
			countryLbl: "Country",
			noteLbl: "Koi Khas Farmaish?",
			notePlaceholder: "Rang, size, occasion…",
			submit: "📱 WhatsApp pe bhejo →",
			product: "Product",
			price: "Daam",
			delivery: "Delivery",
			deliveryVal: "Confirm pe",
			total: "Total (approx)",
			toastOrderTitle: "Continue on WhatsApp",
			toastOrderDesc:
				"Send the prefilled message in the tab that opened — we'll reply there to confirm your order.",
		},
		pmBuyNow: "Kharido →",
		pmCustom: "Custom Order",
		viewArrow: "View →",
		from: "from",
		productPage: {
			tag: "ऊन कला · Wool craft",
			orderNow: "Order now",
			share: "Share",
			copyLink: "Copy link",
			copied: "Link copied!",
			shareNative: "Share…",
			similar: "You may also like",
			allProducts: "← All products",
		},
	},
	hi: {
		langbar: "🇮🇳 ऊन फूल — Handmade Wool Art, Kota, Rajasthan, 324008",
		nav: ["उत्पाद", "हमारी कहानी", "गैलरी", "सवाल-जवाब", "🛍 ऑर्डर करें"],
		heroTag: "कोटा, राजस्थान में हाथ से बना 🇮🇳",
		heroTitle: "ऊन कला,\nप्यार से बनी।",
		heroHindi: "Wool Art, Made by Hand",
		heroSub:
			"सूरजमुखी, गुलाब, पंखुड़ियाँ, पत्तियाँ, उपहार बॉक्स — हर कृति शुद्ध ऊन से, एक-एक टाँके से बनाई। कोई कारखाना नहीं, कोई मशीन नहीं। बस एक कारीगर के हाथ।",
		heroCta1: "↓ संग्रह देखें",
		heroCta2: "→ ऑर्डर करें",
		trust: [
			"100% हस्तनिर्मित",
			"शुद्ध ऊन",
			"पूरे भारत में डिलीवरी",
			"कस्टम ऑर्डर",
			"500+ खुश ग्राहक",
		],
		prodTag: "Our Collection · हमारा संग्रह",
		prodTitle: "हर टाँके में बुनी कला",
		prodHindi: "Every piece, made by hand",
		prodSub:
			"छह ऊनी कृतियाँ — फूल, पत्तियाँ, पंखुड़ियाँ और डिब्बे। विवरण और कीमत के लिए क्लिक करें।",
		storyTag: "The Story · हमारी कहानी",
		storyTitle: "एक घर, एक कारीगर।",
		storyHindi: "One Home, One Artisan",
		storySub:
			"हर कृति एक ही जोड़ी हाथों से बनाई जाती है — न कारखाने में, न मशीन से। बस धैर्य, शुद्ध ऊन, और जयपुर की पीढ़ियों की शिल्प परंपरा।",
		features: [
			{
				icon: "scissors",
				title: "पूरी तरह हस्तनिर्मित",
				desc: "कोई भी दो कृतियाँ एक जैसी नहीं। हर एक हाथ से आकार और फिनिश।",
			},
			{
				icon: "leaf",
				title: "शुद्ध ऊन, कोई कृत्रिम नहीं",
				desc: "मुलायम, उच्च गुणवत्ता वाली ऊन। कोई प्लास्टिक नहीं।",
			},
			{
				icon: "palette",
				title: "कस्टम ऑर्डर का स्वागत",
				desc: "खास रंग, आकार, अवसर? पूरे भारत से कस्टम ऑर्डर का स्वागत।",
			},
			{
				icon: "package",
				title: "पूरे भारत में डिलीवरी",
				desc: "3–5 दिनों में ध्यान से पैक करके आपके दरवाजे तक।",
			},
		],
		galleryTag: "Workshop · कार्यशाला",
		galleryTitle: "शांत समर्पण से बनाई",
		galleryHindi: "Made at home, from the heart",
		gallerySub:
			"हर कृति रंग और बनावट की एक छोटी दुनिया है — घर में, एक-एक दोपहर बनाई गई।",
		orderTag: "Place Order · ऑर्डर करें",
		orderTitle: "एक Piece घर ले जाएं 🏠",
		orderHindi: "Bring one home today",
		orderSub:
			"ऑर्डर करें और हम WhatsApp पर पुष्टि करेंगे — आपकी पसंद, आकार और डिलीवरी, सब व्यक्तिगत रूप से।",
		orderCta: "WhatsApp पर ऑर्डर करें",
		orderNote: "📞 +91 9413732541 · Mon–Sat · सोम–शनि 10am–7pm",
		faqTag: "FAQ · सवाल-जवाब",
		faqTitle: "अक्सर पूछे जाने वाले सवाल",
		faqHindi: "Common questions with answers",
		faqSub: "ऑर्डर करने से पहले जो जानना ज़रूरी है।",
		faqs: [
			{
				q: "हर कृति बनाने में कितना समय लगता है?",
				a: "जटिलता के आधार पर 2 से 8 घंटे। गुलदस्ते और उपहार बॉक्स में अधिक समय लगता है।",
			},
			{
				q: "क्या कस्टम रंग या डिज़ाइन मांग सकते हैं?",
				a: "बिल्कुल! कस्टम ऑर्डर हमें पसंद हैं। अपनी रंग प्राथमिकताएँ या अवसर बताएं।",
			},
			{
				q: "उत्पाद कैसे पैक और भेजे जाते हैं?",
				a: "हर कृति टिशू में लपेटकर सुरक्षात्मक बॉक्स में भेजी जाती है। पूरे भारत में विश्वसनीय कूरियर।",
			},
			{
				q: "ऊनी कृति की देखभाल कैसे करें?",
				a: "नमी और सीधी धूप से दूर रखें। नरम ब्रश से धूल साफ करें।",
			},
			{
				q: "शादी / बल्क ऑर्डर स्वीकार हैं?",
				a: "हाँ! शादी, कॉर्पोरेट गिफ्टिंग, त्योहार — सब स्वागत है। बल्क के लिए 2–3 सप्ताह पहले संपर्क करें।",
			},
			{
				q: "भुगतान कैसे करें?",
				a: "UPI (GPay, PhonePe, Paytm), बैंक ट्रांसफर और चुनिंदा जगहों पर COD।",
			},
		],
		orderModal: {
			title: "अपना ऑर्डर दीजिए 🛍",
			sub: "विवरण भरें — हम जल्द WhatsApp पर पुष्टि करेंगे।",
			nameLbl: "आपका नाम *",
			phoneLbl: "WhatsApp नंबर *",
			selectLbl: "उत्पाद चुनें *",
			selectPlaceholder: "-- उत्पाद चुनें --",
			chipsLbl: "या सीधे चुनें:",
			addressLbl: "डिलीवरी पता",
			addressLine1Lbl: "गली, मकान / फ्लैट नंबर",
			addressLine2Lbl: "इलाका, निशान (वैकल्पिक)",
			cityLbl: "शहर",
			stateLbl: "राज्य",
			postalLbl: "पिन कोड",
			countryLbl: "देश",
			noteLbl: "कोई खास फरमाइश?",
			notePlaceholder: "रंग, आकार, अवसर…",
			submit: "📱 WhatsApp पर भेजें →",
			product: "उत्पाद",
			price: "कीमत",
			delivery: "शिपिंग",
			deliveryVal: "पुष्टि पर",
			total: "अनुमानित कुल",
			toastOrderTitle: "WhatsApp पर बात जारी रखें",
			toastOrderDesc:
				"खुले टैब में तैयार संदेश भेज दें — हम वहीं जवाब देकर ऑर्डर कन्फर्म करेंगे।",
		},
		pmBuyNow: "खरीदो →",
		pmCustom: "कस्टम ऑर्डर",
		viewArrow: "देखें →",
		from: "से",
		productPage: {
			tag: "हस्तनिर्मित · Handmade",
			orderNow: "अभी ऑर्डर करें",
			share: "शेयर",
			copyLink: "लिंक कॉपी करें",
			copied: "लिंक कॉपी हो गया!",
			shareNative: "शेयर करें…",
			similar: "और पसंद आ सकते हैं",
			allProducts: "← सभी उत्पाद",
		},
	},
};

export const PRODUCTS = [
	{
		id: 0,
		slug: "woolwork-sunflower",
		image: "/products/sunflower.JPG",
		emoji: "🌻",
		badge: { en: "Best\nSeller", hi: "सबसे\nलोकप्रिय" },
		name: { en: "Woolwork Sunflower", hi: "ऊनी सूरजमुखी" },
		desc: {
			en: "Warm zinc wool, hand-shaped petal by petal. Wall art or centrepiece.",
			hi: "गर्म पीली ऊन, हाथ से बनाई। दीवार या मेज की सजावट।",
		},
		fullDesc: {
			en: "A cheerful, vibrant sunflower crafted from warm zinc and golden wool. Each petal is shaped and layered by hand, giving lifelike depth. Perfect as wall art, table centrepiece, or a thoughtful gift.",
			hi: "गर्म पीली ऊन से बना हंसमुख सूरजमुखी। हर पंखुड़ी हाथ से बनाई। दीवार या मेज की सजावट के लिए परफेक्ट।",
		},
		price: 299,
		priceNote: {
			en: "Custom sizes available · Free gift wrapping",
			hi: "कस्टम आकार उपलब्ध · मुफ्त गिफ्ट रैपिंग",
		},
		bg: "from-zinc-50 to-zinc-200",
		details: [
			{ en: ["Size", "10–14 cm"], hi: ["आकार", "10–14 सेमी"] },
			{ en: ["Material", "Pure Wool"], hi: ["सामग्री", "शुद्ध ऊन"] },
			{ en: ["Craft Time", "3–4 hrs"], hi: ["समय", "3–4 घंटे"] },
			{ en: ["Colours", "zinc, Gold"], hi: ["रंग", "पीला, सुनहरा"] },
		],
	},
	{
		id: 1,
		slug: "velvet-rose",
		image: "/products/rose.JPG",
		emoji: "🌹",
		badge: { en: "Popular", hi: "पसंदीदा" },
		name: { en: "Velvet Rose", hi: "मखमली गुलाब" },
		desc: {
			en: "Crimson roses that never wilt — perfect for gifting on any occasion.",
			hi: "लाल गुलाब जो कभी नहीं मुरझाते — किसी भी अवसर के लिए।",
		},
		fullDesc: {
			en: "Soft crimson and blush roses that never wilt. Each petal individually crafted and attached to a wool-wrapped stem — a timeless romantic gift.",
			hi: "नरम लाल गुलाब जो कभी नहीं मुरझाते। हर पंखुड़ी अलग से बनाई — एक कालातीत उपहार।",
		},
		price: 249,
		priceNote: { en: "Single stem or set of 3", hi: "एक या तीन के सेट में" },
		bg: "from-rose-50 to-rose-200",
		details: [
			{ en: ["Size", "12–16 cm"], hi: ["आकार", "12–16 सेमी"] },
			{ en: ["Material", "Pure Wool"], hi: ["सामग्री", "शुद्ध ऊन"] },
			{ en: ["Craft Time", "2–3 hrs"], hi: ["समय", "2–3 घंटे"] },
			{ en: ["Colours", "Red, Pink, Peach"], hi: ["रंग", "लाल, गुलाबी, पीच"] },
		],
	},
	{
		id: 2,
		slug: "nature-leaves",
		image: "/products/white-sunflower.JPG",
		emoji: "🍃",
		badge: null,
		name: { en: "Nature Leaves", hi: "प्रकृति के पत्ते" },
		desc: {
			en: "Sage green and forest hues, shaped for natural home décor.",
			hi: "हरे रंग की नाज़ुक पत्तियाँ — प्राकृतिक सजावट के लिए।",
		},
		fullDesc: {
			en: "Delicate leaf arrangements in sage, forest green and autumn hues. Adds an organic, natural touch to any corner of your home or workspace.",
			hi: "हरे रंग में नाज़ुक पत्तियाँ। घर के किसी भी कोने में प्राकृतिक स्पर्श।",
		},
		price: 179,
		priceNote: { en: "Single leaf or cluster set", hi: "एक या सेट में उपलब्ध" },
		bg: "from-green-50 to-green-200",
		details: [
			{ en: ["Size", "8–12 cm"], hi: ["आकार", "8–12 सेमी"] },
			{ en: ["Material", "Pure Wool"], hi: ["सामग्री", "शुद्ध ऊन"] },
			{ en: ["Craft Time", "1–2 hrs"], hi: ["समय", "1–2 घंटे"] },
			{ en: ["Colours", "Sage, Green"], hi: ["रंग", "हरा"] },
		],
	},
	{
		id: 3,
		slug: "petal-clusters",
		image: "/products/petals.JPG",
		emoji: "🌸",
		badge: null,
		name: { en: "Petal Clusters", hi: "पंखुड़ी समूह" },
		desc: {
			en: "Loose pastel petals to scatter or pair with a gift box.",
			hi: "पेस्टल पंखुड़ियाँ — बिखेरें या उपहार बॉक्स के साथ।",
		},
		fullDesc: {
			en: "Loose, layered petals in pastel shades. Scatter across a table, place in a decorative bowl, or pair with a gift box for a beautiful presentation.",
			hi: "पेस्टल रंगों में नाज़ुक पंखुड़ियाँ। मेज पर बिखेरें या उपहार बॉक्स के साथ सजाएँ।",
		},
		price: 149,
		priceNote: {
			en: "Set of 12 · Custom colours",
			hi: "12 का सेट · कस्टम रंग",
		},
		bg: "from-amber-50 to-amber-200",
		details: [
			{ en: ["Qty", "12/set"], hi: ["मात्रा", "12/सेट"] },
			{ en: ["Material", "Pure Wool"], hi: ["सामग्री", "शुद्ध ऊन"] },
			{ en: ["Craft Time", "~2 hrs"], hi: ["समय", "~2 घंटे"] },
			{ en: ["Colours", "Pastel/Custom"], hi: ["रंग", "पेस्टल"] },
		],
	},
	{
		id: 4,
		slug: "wool-gift-box",
		image: "/products/gift-box.JPG",
		emoji: "🎁",
		badge: { en: "Naya\nनया", hi: "नया\nNew" },
		name: { en: "Wool Gift Box", hi: "ऊनी उपहार बॉक्स" },
		desc: {
			en: "A keepsake box fully dressed in soft textured wool. Fill it, gift it.",
			hi: "मुलायम ऊन से सजा उपहार बॉक्स। भरें और उपहार दें।",
		},
		fullDesc: {
			en: "A fully wrapped gift box dressed in soft textured wool. Can be filled with our flowers or petals. A beautiful keepsake for any occasion.",
			hi: "मुलायम ऊन से सजा उपहार बॉक्स। हमारे फूलों से भरें। किसी भी अवसर के लिए।",
		},
		price: 549,
		priceNote: {
			en: "Can be filled with flowers — bundle price on ask",
			hi: "फूलों से भर सकते हैं — बंडल कीमत पर पूछें",
		},
		bg: "from-purple-50 to-purple-200",
		details: [
			{ en: ["Size", "15×15 cm"], hi: ["आकार", "15×15 सेमी"] },
			{ en: ["Material", "Cardboard+Wool"], hi: ["सामग्री", "कार्डबोर्ड+ऊन"] },
			{ en: ["Craft Time", "5–6 hrs"], hi: ["समय", "5–6 घंटे"] },
			{ en: ["Colours", "Custom"], hi: ["रंग", "कस्टम"] },
		],
	},
	{
		id: 5,
		slug: "bouquet-bundle",
		image: "/products/rose-sunflower.JPG",
		emoji: "💐",
		badge: null,
		name: { en: "Bouquet Bundle", hi: "गुलदस्ता" },
		desc: {
			en: "Roses, petals and leaves — a lasting wool bouquet for all occasions.",
			hi: "गुलाब, पंखुड़ियाँ और पत्तियाँ — एक स्थायी गुलदस्ता।",
		},
		fullDesc: {
			en: "A curated mix of roses, petals and leaves arranged into a lasting wool bouquet. Perfect for shaadi, birthdays, and housewarmings.",
			hi: "गुलाब, पंखुड़ियाँ और पत्तियों का स्थायी गुलदस्ता। शादी और जन्मदिन के लिए परफेक्ट।",
		},
		price: 699,
		priceNote: {
			en: "Gift-wrapped · Custom colour themes",
			hi: "गिफ्ट-रैप्ड · कस्टम रंग थीम",
		},
		bg: "from-zinc-50 to-zinc-200",
		details: [
			{
				en: ["Contents", "3 roses+petals+leaves"],
				hi: ["सामग्री", "3 गुलाब+पंखुड़ियाँ"],
			},
			{ en: ["Material", "Pure Wool"], hi: ["ऊन", "शुद्ध ऊन"] },
			{ en: ["Craft Time", "6–8 hrs"], hi: ["समय", "6–8 घंटे"] },
			{ en: ["Colours", "Custom"], hi: ["रंग", "कस्टम"] },
		],
	},
];

export function getProductBySlug(slug) {
	return PRODUCTS.find((p) => p.slug === slug) ?? null;
}

export function getSiteUrl() {
	if (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_SITE_URL) {
		return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
	}
	return 'https://woolcraft.in';
}

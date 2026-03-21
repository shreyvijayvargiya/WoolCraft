import Head from "next/head";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
	X,
	ChevronDown,
	MapPin,
	Phone,
	Mail,
	Clock,
	Star,
	Package,
	Truck,
	Scissors,
	Leaf,
	Palette,
	MessageCircle,
	Menu,
	Globe,
	Sparkles,
	Heart,
	Instagram,
	Facebook,
} from "lucide-react";

const GOOGLE_FONTS_HREF =
	"https://fonts.googleapis.com/css2?family=Rozha+One&family=Yatra+One&family=Mukta:wght@300;400;600;700&family=Tiro+Devanagari+Hindi:ital@0;1&display=swap";

const GLOBAL_CSS = `
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

// ── DATA ──
const T = {
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
			addressLbl: "Delivery Address",
			noteLbl: "Koi Khas Farmaish?",
			notePlaceholder: "Rang, size, occasion…",
			submit: "📱 WhatsApp pe bhejo →",
			product: "Product",
			price: "Daam",
			delivery: "Delivery",
			deliveryVal: "Confirm pe",
			total: "Total (approx)",
		},
		pmBuyNow: "Kharido →",
		pmCustom: "Custom Order",
		viewArrow: "View →",
		from: "from",
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
		orderNote: "📞 +91 98765 00000 · Mon–Sat · सोम–शनि 10am–7pm",
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
			noteLbl: "कोई खास फरमाइश?",
			notePlaceholder: "रंग, आकार, अवसर…",
			submit: "📱 WhatsApp पर भेजें →",
			product: "उत्पाद",
			price: "कीमत",
			delivery: "शिपिंग",
			deliveryVal: "पुष्टि पर",
			total: "अनुमानित कुल",
		},
		pmBuyNow: "खरीदो →",
		pmCustom: "कस्टम ऑर्डर",
		viewArrow: "देखें →",
		from: "से",
	},
};

const PRODUCTS = [
	{
		id: 0,
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

const trustIcons = [Star, Leaf, Truck, Palette, Heart];
const featureIcons = {
	scissors: Scissors,
	leaf: Leaf,
	palette: Palette,
	package: Package,
};

// ── ANIMATION VARIANTS ──
const fadeUp = {
	hidden: { opacity: 0, y: 28 },
	show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const stagger = { show: { transition: { staggerChildren: 0.12 } } };
const modalVariants = {
	hidden: { opacity: 0, scale: 0.94, y: 20 },
	show: {
		opacity: 1,
		scale: 1,
		y: 0,
		transition: { duration: 0.28, ease: "easeOut" },
	},
	exit: { opacity: 0, scale: 0.96, y: 10, transition: { duration: 0.2 } },
};

// ── HELPERS ──
function RangoliBorder({ teal = false }) {
	return <div className={teal ? "rangoli-border-teal" : "rangoli-border"} />;
}

function SectionTag({ children }) {
	return (
		<div
			className="flex items-center gap-2 text-zinc-600 mb-2"
			style={{
				fontFamily: "'Tiro Devanagari Hindi', serif",
				fontSize: "0.9rem",
			}}
		>
			<span className="text-zinc-500">❋</span>
			{children}
		</div>
	);
}

function MehndiDivider() {
	return (
		<div className="flex items-center justify-center gap-3 py-2">
			<div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
			<span className="text-zinc-500 text-lg">❋</span>
			<div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
		</div>
	);
}

function FadeInSection({ children, delay = 0 }) {
	const ref = useRef(null);
	const inView = useInView(ref, { once: true, margin: "-60px" });
	return (
		<motion.div
			ref={ref}
			initial="hidden"
			animate={inView ? "show" : "hidden"}
			variants={fadeUp}
			transition={{ delay }}
		>
			{children}
		</motion.div>
	);
}

function ProductImage({ p, sizes, priority = false }) {
	if (!p?.image) return null;
	return (
		<Image
			src={p.image}
			alt={`${p.name?.en ?? "Product"} — woolcraft`}
			fill
			sizes={sizes}
			priority={priority}
			style={{ objectFit: "cover" }}
		/>
	);
}

// ── NAVBAR ──
function Navbar({ lang, setLang, t, onOrder }) {
	const [scrolled, setScrolled] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);
	useEffect(() => {
		const fn = () => setScrolled(window.scrollY > 40);
		window.addEventListener("scroll", fn);
		return () => window.removeEventListener("scroll", fn);
	}, []);
	const scrollTo = (id) => {
		document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
		setMobileOpen(false);
	};
	const ids = ["products", "story", "gallery", "faq"];
	return (
		<>
			{/* Lang bar */}
			<div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-1.5 bg-zinc-900 border-b border-zinc-800">
				<span
					className="text-xs font-hindi"
					style={{
						color: "#F0C040",
						fontFamily: "'Tiro Devanagari Hindi', serif",
					}}
				>
					{t.langbar}
				</span>
				<div className="flex gap-2">
					{["en", "hi"].map((l) => (
						<button
							key={l}
							onClick={() => setLang(l)}
							className="text-xs font-bold px-3 py-0.5 border rounded-sm transition-all"
							style={{
								fontFamily: "'Mukta', sans-serif",
								letterSpacing: "0.1em",
								border:
									lang === l
										? "1px solid #D4A017"
										: "1px solid rgba(247,237,216,0.25)",
								background: lang === l ? "#D4A017" : "transparent",
								color: lang === l ? "#1A0A00" : "rgba(247,237,216,0.6)",
							}}
						>
							{l === "en" ? "EN" : "हिन्दी"}
						</button>
					))}
				</div>
			</div>
			{/* Main nav */}
			<nav
				className={`fixed left-0 right-0 bg-zinc-900 border-b border-zinc-800 z-40 flex items-stretch justify-between px-6 transition-shadow ${scrolled ? "shadow-lg" : ""}`}
				style={{
					top: "30px",
					borderBottom: "3px solid #27272a",
				}}
			>
				<button
					className="flex items-center gap-2 py-3"
					onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
				>
					<span
						className="font-rozha text-2xl"
						style={{
							fontFamily: "'Comic Sans', serif",
							color: "#F7EDD8",
							letterSpacing: "0.04em",
						}}
					>
						woolcraft
					</span>
					<span
						className="font-hindi text-base "
						style={{
							fontFamily: "'Tiro Devanagari Hindi', serif",
							color: "#F0C040",
						}}
					>
						ऊन फूल
					</span>
				</button>
				<ul className="hidden md:flex list-none">
					{t.nav.slice(0, 4).map((label, i) => (
						<li key={i}>
							<button
								onClick={() => scrollTo(ids[i])}
								className="h-full px-4 text-xs font-bold uppercase tracking-wider transition-all hover:text-white"
								style={{
									fontFamily: "'Mukta', sans-serif",
									letterSpacing: "0.06em",
									color: "rgba(247,237,216,0.75)",
									borderLeft: "1px solid rgba(247,237,216,0.1)",
								}}
							>
								{label}
							</button>
						</li>
					))}
					<li>
						<button
							onClick={onOrder}
							className="h-full px-5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-zinc-500"
							style={{
								fontFamily: "'Mukta', sans-serif",
								letterSpacing: "0.06em",
								background: "rgb(240, 192, 64)",
							}}
						>
							{t.nav[4]}
						</button>
					</li>
				</ul>
				<button
					className="md:hidden p-3 text-zinc-200"
					onClick={() => setMobileOpen((v) => !v)}
				>
					<Menu size={20} />
				</button>
			</nav>
			<AnimatePresence>
				{mobileOpen && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						className="fixed z-30 left-0 right-0 flex flex-col"
						style={{
							top: "78px",
							background: "#FFFFFF",
							borderBottom: "2px solid rgb(240, 192, 64)",
						}}
					>
						{t.nav.slice(0, 4).map((label, i) => (
							<button
								key={i}
								onClick={() => scrollTo(ids[i])}
								className="px-6 py-3 text-left text-sm font-bold border-b"
								style={{
									fontFamily: "'Mukta', sans-serif",
									color: "rgba(247,237,216,0.8)",
									borderColor: "rgba(247,237,216,0.1)",
								}}
							>
								{label}
							</button>
						))}
						<button
							onClick={() => {
								onOrder();
								setMobileOpen(false);
							}}
							className="px-6 py-3 text-left text-sm font-bold text-white"
							style={{ background: "rgb(240, 192, 64)" }}
						>
							{t.nav[4]}
						</button>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}

// ── HERO ──
function Hero({ lang, t, onOrder, onProduct }) {
	return (
		<section
			id="hero"
			className="min-h-screen flex items-center relative overflow-hidden paisley-bg"
			style={{ background: "#000000", paddingTop: "90px" }}
		>
			<div className="absolute inset-0 pointer-events-none" />
			<div className="w-full max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center py-16">
				<motion.div
					initial="hidden"
					animate="show"
					variants={stagger}
					className="relative z-10"
				>
					<motion.div
						variants={fadeUp}
						className="flex items-center gap-3 mb-4"
					>
						<div className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
						<span
							className="font-hindi text-sm "
							style={{
								fontFamily: "'Tiro Devanagari Hindi', serif",
								color: "#F0C040",
								letterSpacing: "0.04em",
							}}
						>
							{t.heroTag}
						</span>
					</motion.div>
					<motion.h1
						variants={fadeUp}
						className="font-rozha leading-tight mb-2 whitespace-pre-line"
						style={{
							fontFamily: "'Comic Sans', serif",
							fontSize: "clamp(2.8rem,5vw,5rem)",
							color: "#F7EDD8",
							letterSpacing: "0.02em",
						}}
					>
						{t.heroTitle}
					</motion.h1>
					<motion.div
						variants={fadeUp}
						className="font-hindi  mb-5"
						style={{
							fontFamily: "'Tiro Devanagari Hindi', serif",
							fontSize: "clamp(1.2rem,2.5vw,1.8rem)",
							color: "#F0C040",
						}}
					>
						{t.heroHindi}
					</motion.div>
					<motion.p
						variants={fadeUp}
						className="mb-8 max-w-md font-light leading-loose"
						style={{
							fontFamily: "'Mukta', sans-serif",
							fontSize: "0.92rem",
							color: "rgba(247,237,216,0.72)",
							letterSpacing: "0.02em",
						}}
					>
						{t.heroSub}
					</motion.p>
					<motion.div variants={fadeUp} className="flex flex-wrap gap-3">
						<button
							onClick={() =>
								document
									.getElementById("products")
									?.scrollIntoView({ behavior: "smooth" })
							}
							className="px-7 py-3 text-sm font-bold uppercase tracking-wider text-white transition-all hover:-translate-y-0.5"
							style={{
								fontFamily: "'Mukta', sans-serif",
								background: "rgb(240, 192, 64)",
								borderBottom: "3px solid #FFFFFF",
								boxShadow: "0 4px 16px rgba(232,98,10,0.35)",
							}}
						>
							{t.heroCta1}
						</button>
						<button
							onClick={onOrder}
							className="px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all"
							style={{
								fontFamily: "'Mukta', sans-serif",
								color: "#F7EDD8",
								border: "2px solid rgba(247,237,216,0.4)",
								letterSpacing: "0.1em",
							}}
						>
							{t.heroCta2}
						</button>
					</motion.div>
				</motion.div>

				{/* Hero cards */}
				<motion.div
					initial={{ opacity: 0, scale: 0.92, rotate: 1 }}
					animate={{ opacity: 1, scale: 1, rotate: 1 }}
					transition={{ duration: 0.7, delay: 0.2 }}
					className="flex justify-center"
				>
					<div className="grid grid-cols-2 gap-3" style={{ maxWidth: 360 }}>
						{[0, 1, 2, 4].map((idx, i) => (
							<motion.div
								key={idx}
								whileHover={{ y: -6, rotate: i % 2 === 0 ? -1 : 1 }}
								onClick={() => onProduct(idx)}
								className="cursor-pointer overflow-hidden"
								style={{
									background: "#F7EDD8",
									border: "2px solid #EDD8B0",
									boxShadow: "4px 4px 0 rgb(240, 192, 64)",
									marginTop: i === 1 ? 20 : i === 2 ? -20 : 0,
								}}
							>
								<div
									className={`aspect-square relative bg-gradient-to-br ${PRODUCTS[idx].bg}`}
								>
									<ProductImage
										p={PRODUCTS[idx]}
										sizes="(max-width: 768px) 40vw, 180px"
										priority={idx === 0}
									/>
								</div>
								<div
									className="px-3 py-2 text-xs font-bold uppercase tracking-wider"
									style={{
										fontFamily: "'Mukta', sans-serif",
										color: "rgb(240, 192, 64)",
										borderTop: "1px solid #EDD8B0",
									}}
								>
									{PRODUCTS[idx].name[lang]}
								</div>
							</motion.div>
						))}
					</div>
				</motion.div>
			</div>
		</section>
	);
}

// ── TRUST / SAREE STRIP ──
function SareeStrip({ lang, t }) {
	return (
		<div
			className="relative flex flex-wrap justify-center gap-8 px-6 py-4 overflow-hidden"
			style={{ background: "rgb(240, 192, 64)" }}
		>
			<div
				className="absolute inset-0 pointer-events-none opacity-20"
				style={{
					backgroundImage:
						"repeating-linear-gradient(90deg, rgba(255,255,255,0.15) 0px, rgba(255,255,255,0.15) 1px, transparent 1px, transparent 40px)",
					backgroundSize: "40px 100%",
				}}
			/>
			{t.trust.map((label, i) => (
				<div
					key={i}
					className="flex items-center gap-2 text-white font-bold uppercase tracking-wider z-10"
					style={{
						fontFamily: "'Mukta', sans-serif",
						fontSize: "0.75rem",
						letterSpacing: "0.12em",
					}}
				>
					{React.createElement(trustIcons[i], { size: 16 })}
					<span>{label}</span>
				</div>
			))}
		</div>
	);
}

// ── PRODUCTS ──
function Products({ lang, t, onProduct }) {
	return (
		<section
			id="products"
			className="py-20 px-6"
			style={{ background: "#000000" }}
		>
			<FadeInSection>
				<div className="text-center mb-2">
					<SectionTag>{t.prodTag}</SectionTag>
					<h2
						className="font-rozha text-4xl mb-1"
						style={{ fontFamily: "'Comic Sans', serif", color: "#FFFFFF" }}
					>
						{t.prodTitle}
					</h2>
					<div
						className="font-hindi  text-lg mb-3"
						style={{
							fontFamily: "'Tiro Devanagari Hindi', serif",
							color: "rgb(240, 192, 64)",
						}}
					>
						{t.prodHindi}
					</div>
					<p
						className="max-w-xl mx-auto font-light mb-6"
						style={{
							fontFamily: "'Mukta', sans-serif",
							fontSize: "0.88rem",
							color: "rgb(240, 192, 64)",
							lineHeight: 1.85,
						}}
					>
						{t.prodSub}
					</p>
				</div>
			</FadeInSection>
			<MehndiDivider />
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 max-w-7xl mx-auto">
				{PRODUCTS.map((p, i) => (
					<FadeInSection key={p.id} delay={i * 0.08}>
						<ProductCard
							product={p}
							lang={lang}
							t={t}
							onClick={() => onProduct(p.id)}
						/>
					</FadeInSection>
				))}
			</div>
		</section>
	);
}

function ProductCard({ product: p, lang, t, onClick }) {
	return (
		<motion.div
			whileHover={{ y: -6 }}
			onClick={onClick}
			className="cursor-pointer overflow-hidden relative"
			style={{
				background: "#FFFDF8",
				border: "1.5px solid #EDD8B0",
				borderBottom: "4px solid rgb(240, 192, 64)",
			}}
		>
			{/* Rainbow top bar on hover */}
			<div
				className="absolute top-0 left-0 right-0 h-0.5 opacity-0 hover:opacity-100 transition-opacity"
				style={{
					background:
						"linear-gradient(to right,#0F7B6C,rgb(240, 192, 64),#C4185C,#D4A017)",
				}}
			/>
			<div className={`aspect-square relative bg-gradient-to-br ${p.bg}`}>
				{/* Mandala ring */}
				<div className="absolute inset-3 border border-dashed border-red-900/10 rounded-full pointer-events-none" />
				<ProductImage
					p={p}
					sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 360px"
				/>
				{p.badge && (
					<div
						className="absolute top-2.5 right-2.5 w-12 h-12 rounded-full flex items-center justify-center text-center stamp-rotate z-20"
						style={{
							background: "#FFFFFF",
							color: "#F7EDD8",
							fontSize: "0.52rem",
							fontWeight: 700,
							letterSpacing: "0.06em",
							lineHeight: 1.3,
							border: "2px solid #A83030",
							fontFamily: "'Mukta', sans-serif",
							whiteSpace: "pre-line",
						}}
					>
						{lang === "en" ? p.badge.en : p.badge.hi}
					</div>
				)}
			</div>
			<div className="p-4">
				<div
					className="font-yatra text-lg mb-0.5"
					style={{ fontFamily: "'Yatra One', cursive", color: "#FFFFFF" }}
				>
					{p.name[lang]}
				</div>
				<div
					className="font-hindi  text-xs mb-2"
					style={{
						fontFamily: "'Tiro Devanagari Hindi', serif",
						color: "rgb(240, 192, 64)",
					}}
				>
					{p.name[lang === "en" ? "hi" : "en"]}
				</div>
				<p
					className="text-xs font-light mb-3 leading-relaxed"
					style={{
						fontFamily: "'Mukta', sans-serif",
						color: "rgb(240, 192, 64)",
					}}
				>
					{p.desc[lang]}
				</p>
				<div className="flex items-center justify-between">
					<div
						className="font-bold text-zinc-600"
						style={{ fontFamily: "'Mukta', sans-serif" }}
					>
						<span className="text-xs font-normal text-amber-800 mr-1">
							{t.from}
						</span>
						₹{p.price}
					</div>
					<span
						className="text-xs font-bold uppercase tracking-wider text-teal-700 group-hover:text-zinc-500 transition-colors"
						style={{
							fontFamily: "'Mukta', sans-serif",
							letterSpacing: "0.08em",
						}}
					>
						{t.viewArrow}
					</span>
				</div>
			</div>
		</motion.div>
	);
}

// ── STORY ──
function Story({ lang, t }) {
	return (
		<section
			id="story"
			className="py-20 px-6 relative overflow-hidden paisley-bg"
			style={{ background: "#000000" }}
		>
			<div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
				<FadeInSection>
					<div className="relative">
						<div
							className="p-12 text-center text-8xl relative"
							style={{ background: "#F7EDD8", border: "2px solid #EDD8B0" }}
						>
							<span className="absolute top-2.5 left-3.5 text-zinc-500 text-xl">
								❋
							</span>
							<span className="absolute bottom-2.5 right-3.5 text-zinc-500 text-xl">
								❋
							</span>
							<div
								className="absolute inset-2 border pointer-events-none"
								style={{ borderColor: "#D4B878" }}
							/>
							<div className="flex gap-2 items-center flex-wrap">
								<img
									src="/products/sunflower.JPG"
									alt="Story"
									className="w-24 h-24 object-cover rounded-xl"
								/>
								<img
									src="/products/rose.JPG"
									alt="Story"
									className="w-24 h-24 object-cover rounded-xl"
								/>{" "}
								<img
									src="/products/petals.JPG"
									alt="Story"
									className="w-24 h-24 object-cover rounded-xl"
								/>{" "}
								<img
									src="/products/gift-box.JPG"
									alt="Story"
									className="w-24 h-24 object-cover rounded-xl"
								/>{" "}
							</div>
						</div>
						<div
							className="absolute -top-4 -right-5 px-3 py-2 text-xs font-bold uppercase tracking-wider z-10"
							style={{
								background: "#D4A017",
								color: "#1A0A00",
								border: "2px solid #1A0A00",
								transform: "rotate(3deg)",
								fontFamily: "'Mukta', sans-serif",
							}}
						>
							✦ 2–6 {lang === "en" ? "hrs per piece" : "घंटे प्रति कृति"}
						</div>
						<div
							className="absolute -bottom-4 -left-5 px-3 py-2 text-xs font-bold uppercase tracking-wider z-10"
							style={{
								background: "#0F7B6C",
								color: "white",
								border: "2px solid #0F7B6C",
								transform: "rotate(-2deg)",
								fontFamily: "'Mukta', sans-serif",
							}}
						>
							🇮🇳 Kota · {lang === "en" ? "Est. 2026" : "2026 से"}
						</div>
					</div>
				</FadeInSection>
				<div>
					<FadeInSection>
						<SectionTag>
							<span style={{ color: "#ffffff" }}>{t.storyTag}</span>
						</SectionTag>
						<h2
							className="font-rozha text-4xl mb-1"
							style={{ fontFamily: "'Comic Sans', serif", color: "#F7EDD8" }}
						>
							{t.storyTitle}
						</h2>
						<div
							className="font-hindi  text-xl mb-4"
							style={{
								fontFamily: "'Tiro Devanagari Hindi', serif",
								color: "#F0C040",
							}}
						>
							{t.storyHindi}
						</div>
						<p
							className="font-light mb-8 leading-loose"
							style={{
								fontFamily: "'Mukta', sans-serif",
								fontSize: "0.88rem",
								color: "rgba(247,237,216,0.68)",
							}}
						>
							{t.storySub}
						</p>
					</FadeInSection>
					<motion.div
						className="flex flex-col gap-4"
						initial="hidden"
						whileInView="show"
						viewport={{ once: true }}
						variants={stagger}
					>
						{t.features.map((f, i) => {
							const Icon = featureIcons[f.icon];
							return (
								<motion.div
									key={i}
									variants={fadeUp}
									className="flex gap-4 items-start"
								>
									<div
										className="w-10 h-10 flex-shrink-0 flex items-center justify-center"
										style={{
											background: "rgba(247,237,216,0.1)",
											border: "1.5px solid rgba(247,237,216,0.2)",
										}}
									>
										<Icon size={18} color="#F0C040" />
									</div>
									<div>
										<h4
											className="font-yatra text-sm mb-0.5"
											style={{
												fontFamily: "'Yatra One', cursive",
												color: "#F7EDD8",
											}}
										>
											{f.title}
										</h4>
										<p
											className="text-xs font-light leading-relaxed"
											style={{
												fontFamily: "'Mukta', sans-serif",
												color: "rgba(247,237,216,0.58)",
											}}
										>
											{f.desc}
										</p>
									</div>
								</motion.div>
							);
						})}
					</motion.div>
				</div>
			</div>
		</section>
	);
}

// ── GALLERY ──
function Gallery({ lang, t, onProduct }) {
	const galleryItems = [0, 1, 2, 4, 3, 5, 2];
	return (
		<section
			id="gallery"
			className="py-20 px-6"
			style={{ background: "#000000" }}
		>
			<FadeInSection>
				<SectionTag>{t.galleryTag}</SectionTag>
				<h2
					className="font-rozha text-4xl mb-1"
					style={{ fontFamily: "'Comic Sans', serif", color: "#FFFFFF" }}
				>
					{t.galleryTitle}
				</h2>
				<div
					className="font-hindi  text-lg mb-3"
					style={{
						fontFamily: "'Tiro Devanagari Hindi', serif",
						color: "rgb(240, 192, 64)",
					}}
				>
					{t.galleryHindi}
				</div>
				<p
					className="max-w-xl font-light mb-6"
					style={{
						fontFamily: "'Mukta', sans-serif",
						fontSize: "0.88rem",
						color: "#ffffff",
						lineHeight: 1.85,
					}}
				>
					{t.gallerySub}
				</p>
			</FadeInSection>
			<div className="gallery-scroll flex gap-3 pb-2 max-w-7xl">
				{galleryItems.map((idx, i) => (
					<motion.div
						key={i}
						whileHover={{ scale: 1.06 }}
						onClick={() => onProduct(idx)}
						className="gallery-item flex-shrink-0 w-40 h-40 cursor-pointer relative overflow-hidden"
						style={{ background: "#FFFDF8", border: "2px solid #D4B878" }}
					>
						<div className="absolute inset-1.5 border border-dashed border-red-900/12 rounded-full pointer-events-none" />
						<div className="absolute inset-0">
							<ProductImage p={PRODUCTS[idx]} sizes="160px" />
						</div>
					</motion.div>
				))}
			</div>
			<div
				className="text-center mt-4 text-xs font-bold uppercase tracking-widest"
				style={{
					fontFamily: "'Mukta', sans-serif",
					color: "rgb(240, 192, 64)",
				}}
			>
				←{" "}
				{lang === "en"
					? "Scroll to explore more"
					: "और देखने के लिए स्क्रॉल करें"}{" "}
				→
			</div>
		</section>
	);
}

// ── CTA / ORDER SECTION ──
function OrderCTA({ lang, t, onOrder }) {
	return (
		<section
			id="order"
			className="py-20 px-6 text-center relative overflow-hidden bg-zinc-900"
		>
			<div
				className="absolute inset-0 opacity-5 pointer-events-none"
				style={{
					backgroundImage:
						"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cpath d='M40 10 L50 30 L70 30 L55 45 L60 65 L40 52 L20 65 L25 45 L10 30 L30 30 Z' fill='none' stroke='white' stroke-width='1'/%3E%3C/svg%3E\")",
					backgroundSize: "80px 80px",
				}}
			/>
			<FadeInSection>
				<div
					className="text-center mb-2"
					style={{
						fontFamily: "'Tiro Devanagari Hindi', serif",
						fontSize: "0.9rem",
					}}
				>
					<span style={{ color: "#ffffff" }}>{t.orderTag}</span>
				</div>
				<h2
					className="font-rozha text-4xl mb-1"
					style={{ fontFamily: "Comic Sans", color: "#ffffff" }}
				>
					{t.orderTitle}
				</h2>
				<div
					className="font-hindi  text-xl mb-4"
					style={{
						color: "#ffffff",
					}}
				>
					{t.orderHindi}
				</div>
				<p
					className="max-w-xl mx-auto font-light mb-8"
					style={{
						fontFamily: "'Mukta', sans-serif",
						fontSize: "0.88rem",
						color: "#ffffff",
						lineHeight: 1.85,
					}}
				>
					{t.orderSub}
				</p>
				<div className="flex flex-wrap gap-3 justify-center">
					<motion.button
						whileHover={{ y: -2 }}
						whileTap={{ scale: 0.97 }}
						onClick={onOrder}
						className="flex items-center gap-2 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white"
						style={{
							fontFamily: "'Mukta', sans-serif",
							background: "#25D366",
							borderBottom: "3px solid #128C7E",
						}}
					>
						<MessageCircle size={18} />
						{t.orderCta}
					</motion.button>
					<button
						onClick={() =>
							document
								.getElementById("products")
								?.scrollIntoView({ behavior: "smooth" })
						}
						className="px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all"
						style={{
							fontFamily: "'Mukta', sans-serif",
							color: "#F7EDD8",
							border: "2px solid rgba(247,237,216,0.35)",
						}}
					>
						{lang === "en" ? "Browse Products" : "उत्पाद देखें"}
					</button>
				</div>
				<p
					className="mt-5 text-xs"
					style={{
						fontFamily: "'Mukta', sans-serif",
						color: "rgba(247,237,216,0.55)",
						letterSpacing: "0.04em",
					}}
				>
					{t.orderNote}
				</p>
			</FadeInSection>
		</section>
	);
}

// ── FAQ ──
function FAQ({ t }) {
	const [open, setOpen] = useState(null);
	return (
		<section
			id="faq"
			className="mx-auto justify-center max-w-4xl py-20 px-6"
			style={{ background: "transparent" }}
		>
			<FadeInSection>
				<SectionTag>{t.faqTag}</SectionTag>
				<h2
					className="font-rozha text-4xl mb-1"
					style={{ fontFamily: "'Comic Sans', serif", color: "#ffffff" }}
				>
					{t.faqTitle}
				</h2>
				<div
					className="font-hindi  text-lg mb-3"
					style={{
						fontFamily: "'Tiro Devanagari Hindi', serif",
						color: "#ffffff",
					}}
				>
					{t.faqHindi}
				</div>
				<p
					className="max-w-xl font-light mb-8"
					style={{
						fontFamily: "'Mukta', sans-serif",
						fontSize: "0.88rem",
						color: "rgb(240, 192, 64)",
						lineHeight: 1.85,
					}}
				>
					{t.faqSub}
				</p>
			</FadeInSection>
			<div className="grid md:grid-cols-1 justify-center items-center gap-4">
				{t.faqs.map((faq, i) => (
					<FadeInSection key={i} delay={i * 0.05}>
						<div
							className={`overflow-hidden transition-all`}
							style={{
								border: "1.5px solid #EDD8B0",
								borderLeft: `4px solid rgb(240, 192, 64)`,
							}}
						>
							<button
								onClick={() => setOpen(open === i ? null : i)}
								className="w-full flex items-center justify-between gap-3 p-5 text-left transition-colors"
								style={{
									fontSize: "0.95rem",
									color: "#ffffff",
								}}
							>
								<span>{faq.q}</span>
								<motion.span
									animate={{ rotate: open === i ? 45 : 0 }}
									transition={{ duration: 0.25 }}
									className="flex-shrink-0 text-zinc-500"
								>
									<ChevronDown size={18} />
								</motion.span>
							</button>
							<AnimatePresence initial={false}>
								{open === i && (
									<motion.div
										initial={{ height: 0 }}
										animate={{ height: "auto" }}
										exit={{ height: 0 }}
										transition={{ duration: 0.3 }}
										className="overflow-hidden"
									>
										<p
											className="px-5 pb-5 text-sm font-light leading-relaxed"
											style={{
												fontFamily: "'Mukta', sans-serif",
												color: "rgb(240, 192, 64)",
											}}
										>
											{faq.a}
										</p>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					</FadeInSection>
				))}
			</div>
		</section>
	);
}

// ── FOOTER ──
function Footer({ lang, t, onOrder, onProduct }) {
	const scrollTo = (id) =>
		document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
	return (
		<footer style={{ background: "#000000" }}>
			{/* Top bar */}
			<div
				className="flex flex-wrap items-center justify-between gap-4 px-6 py-4"
				style={{ background: "#000000", borderBottom: "2px solid #27272a" }}
			>
				<div>
					<div
						className="font-hindi text-base"
						style={{
							fontFamily: "'Tiro Devanagari Hindi', serif",
							color: "#F0C040",
						}}
					>
						🧶 woolcraft — ऊन फूल
					</div>
					<div
						className="text-xs mt-0.5"
						style={{
							fontFamily: "'Mukta', sans-serif",
							color: "rgba(247,237,216,0.55)",
						}}
					>
						{lang === "en"
							? "Handcrafted wool art from Kota, Rajasthan"
							: "जयपुर, राजस्थान से हस्तनिर्मित ऊन कला"}
					</div>
				</div>
				<button
					onClick={onOrder}
					className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white uppercase tracking-wider"
					style={{
						fontFamily: "'Mukta', sans-serif",
						background: "#25D366",
						borderBottom: "2px solid #128C7E",
					}}
				>
					<MessageCircle size={14} />
					{lang === "en" ? "Order on WhatsApp" : "WhatsApp पर ऑर्डर"}
				</button>
			</div>
			<div className="px-6 py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
				<div>
					<div
						className="font-rozha text-2xl mb-1"
						style={{ fontFamily: "'Comic Sans', serif", color: "#F7EDD8" }}
					>
						woolcraft
					</div>
					<div
						className="font-hindi text-sm  mb-3"
						style={{
							fontFamily: "'Tiro Devanagari Hindi', serif",
							color: "#F0C040",
						}}
					>
						ऊन फूल · Kota
					</div>
					<p
						className="text-xs font-light leading-loose mb-4"
						style={{
							fontFamily: "'Mukta', sans-serif",
							color: "rgba(247,237,216,0.42)",
						}}
					>
						{lang === "en"
							? "Handcrafted wool art — flowers, leaves, boxes and more — made with patience and love in Kota. Every piece tells a story of devotion."
							: "हस्तनिर्मित ऊनी कला — फूल, पत्तियाँ, डिब्बे और भी — जयपुर में प्यार से बनाई।"}
					</p>
					<div className="flex gap-2">
						{[Instagram, Facebook, MessageCircle].map((Icon, i) => (
							<button
								key={i}
								className="w-8 h-8 flex items-center justify-center transition-all hover:border-zinc-500 hover:text-zinc-500"
								style={{
									border: "1px solid rgba(247,237,216,0.15)",
									color: "rgba(247,237,216,0.38)",
								}}
							>
								<Icon size={14} />
							</button>
						))}
					</div>
				</div>
				<div>
					<h5
						className="text-sm mb-4 font-yatra"
						style={{ fontFamily: "'Yatra One', cursive", color: "#F0C040" }}
					>
						{lang === "en" ? "Products" : "उत्पाद"}
					</h5>
					<ul className="space-y-2">
						{PRODUCTS.map((p) => (
							<li key={p.id}>
								<button
									onClick={() => onProduct(p.id)}
									className="text-xs font-light hover:text-white transition-colors"
									style={{
										fontFamily: "'Mukta', sans-serif",
										color: "rgba(247,237,216,0.42)",
									}}
								>
									{p.emoji} {p.name[lang]}
								</button>
							</li>
						))}
					</ul>
				</div>
				<div>
					<h5
						className="text-sm mb-4 font-yatra"
						style={{ fontFamily: "'Yatra One', cursive", color: "#F0C040" }}
					>
						{lang === "en" ? "Order" : "ऑर्डर"}
					</h5>
					<ul className="space-y-2">
						{[
							{ en: "Place an Order", hi: "ऑर्डर करें", action: onOrder },
							{ en: "Custom Request", hi: "कस्टम ऑर्डर", action: onOrder },
							{
								en: "Shipping Info",
								hi: "शिपिंग जानकारी",
								action: () => scrollTo("faq"),
							},
							{
								en: "Shaadi / Bulk",
								hi: "शादी / बल्क",
								action: () => scrollTo("faq"),
							},
							{
								en: "Payments / UPI",
								hi: "UPI भुगतान",
								action: () => scrollTo("faq"),
							},
						].map((item, i) => (
							<li key={i}>
								<button
									onClick={item.action}
									className="text-xs font-light hover:text-white transition-colors"
									style={{
										fontFamily: "'Mukta', sans-serif",
										color: "rgba(247,237,216,0.42)",
									}}
								>
									{item[lang]}
								</button>
							</li>
						))}
					</ul>
				</div>
				<div>
					<h5
						className="text-sm mb-4 font-yatra"
						style={{ fontFamily: "'Yatra One', cursive", color: "#F0C040" }}
					>
						{lang === "en" ? "Contact" : "संपर्क"}
					</h5>
					<div className="space-y-2.5">
						{[
							{
								icon: MapPin,
								text:
									lang === "en"
										? "Kota, Rajasthan 302001"
										: "जयपुर, राजस्थान 302001",
							},
							{ icon: Phone, text: "+91 9413732541" },
							{ icon: Mail, text: "hello@woolcraft.in" },
							{
								icon: Clock,
								text:
									lang === "en" ? "Mon–Sat · 10am–7pm" : "सोम–शनि · 10–7 बजे",
							},
							{
								icon: MessageCircle,
								text: lang === "en" ? "WhatsApp preferred" : "WhatsApp पसंदीदा",
							},
						].map(({ icon: Icon, text }, i) => (
							<div key={i} className="flex items-start gap-2">
								<Icon
									size={13}
									className="mt-0.5 flex-shrink-0"
									style={{ color: "rgb(240, 192, 64)" }}
								/>
								<span
									className="text-xs font-light"
									style={{
										fontFamily: "'Mukta', sans-serif",
										color: "rgba(247,237,216,0.42)",
									}}
								>
									{text}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>
			<RangoliBorder />
			<div className="flex flex-wrap justify-between gap-2 px-6 py-4">
				<p
					className="text-xs"
					style={{
						fontFamily: "'Mukta', sans-serif",
						color: "rgba(247,237,216,0.22)",
						letterSpacing: "0.06em",
					}}
				>
					© 2025 woolcraft.{" "}
					{lang === "en" ? "All rights reserved." : "सर्वाधिकार सुरक्षित।"}
				</p>
				<p
					className="text-xs"
					style={{
						fontFamily: "'Mukta', sans-serif",
						color: "rgba(247,237,216,0.22)",
					}}
				>
					{lang === "en"
						? "Made with 🧶 & ❤️ in Bharat 🇮🇳"
						: "🇮🇳 भारत में 🧶 और ❤️ से बनाया गया"}
				</p>
			</div>
		</footer>
	);
}

// ── PRODUCT DETAIL MODAL ──
function ProductModal({ product: p, lang, t, open, onClose, onOrder }) {
	if (!p) return null;
	return (
		<AnimatePresence>
			{open && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 z-[60] flex items-center justify-center p-4"
					style={{ background: "rgba(26,10,0,0.78)" }}
					onClick={(e) => e.target === e.currentTarget && onClose()}
				>
					<motion.div
						variants={modalVariants}
						initial="hidden"
						animate="show"
						exit="exit"
						className="w-full max-w-lg modal-scroll"
						style={{
							background: "#FFFDF8",
							border: "2px solid #EDD8B0",
							borderTop: "5px solid rgb(240, 192, 64)",
							boxShadow: "0 40px 80px rgba(26,10,0,0.5), 8px 8px 0 #FFFFFF",
						}}
					>
						<button
							onClick={onClose}
							className="absolute top-3 right-3 z-10 p-1.5 hover:text-zinc-500 transition-colors"
							style={{ color: "rgb(240, 192, 64)" }}
						>
							<X size={18} />
						</button>
						{/* Hero */}
						<div
							className={`relative aspect-[2/1] bg-gradient-to-br ${p.bg}`}
							style={{ borderBottom: "3px solid #EDD8B0" }}
						>
							<div className="absolute inset-6 border border-dashed border-red-900/10 rounded-full pointer-events-none" />
							<ProductImage
								p={p}
								sizes="(max-width: 640px) 92vw, 520px"
								priority
							/>
						</div>
						<div className="p-7">
							{p.badge && (
								<div
									className="inline-block mb-3 px-3 py-1 text-xs font-bold uppercase tracking-wider stamp-rotate"
									style={{
										fontFamily: "'Mukta', sans-serif",
										background: "#FFFFFF",
										color: "#F7EDD8",
										border: "1px solid #A83030",
									}}
								>
									{p.badge[lang].replace("\n", " ")}
								</div>
							)}
							<div
								className="font-rozha text-3xl mb-0.5"
								style={{ fontFamily: "'Comic Sans', serif", color: "#FFFFFF" }}
							>
								{p.name[lang]}
							</div>
							<div
								className="font-hindi  text-sm mb-4"
								style={{
									fontFamily: "'Tiro Devanagari Hindi', serif",
									color: "rgb(240, 192, 64)",
								}}
							>
								{p.name[lang === "en" ? "hi" : "en"]}
							</div>
							<p
								className="text-sm font-light leading-loose mb-5"
								style={{
									fontFamily: "'Mukta', sans-serif",
									color: "rgb(240, 192, 64)",
								}}
							>
								{p.fullDesc[lang]}
							</p>
							{/* Details grid */}
							<div className="grid grid-cols-2 gap-2 mb-5">
								{p.details.map((d, i) => (
									<div
										key={i}
										className="p-3"
										style={{
											background: "#F7EDD8",
											border: "1px solid #EDD8B0",
											borderLeft: "3px solid rgb(240, 192, 64)",
										}}
									>
										<div
											className="text-xs uppercase tracking-wider font-bold mb-1"
											style={{
												fontFamily: "'Mukta', sans-serif",
												color: "rgb(240, 192, 64)",
												letterSpacing: "0.14em",
											}}
										>
											{d[lang][0]}
										</div>
										<div
											className="text-sm font-bold"
											style={{
												fontFamily: "'Mukta', sans-serif",
												color: "#FFFFFF",
											}}
										>
											{d[lang][1]}
										</div>
									</div>
								))}
							</div>
							{/* Price */}
							<div
								className="flex items-center justify-between p-4 mb-5"
								style={{ background: "#F7EDD8", border: "1px solid #EDD8B0" }}
							>
								<div
									className="font-rozha text-4xl"
									style={{
										fontFamily: "'Comic Sans', serif",
										color: "rgb(240, 192, 64)",
									}}
								>
									₹{p.price}
								</div>
								<div
									className="text-xs text-right font-light max-w-[180px]"
									style={{
										fontFamily: "'Mukta', sans-serif",
										color: "rgb(240, 192, 64)",
									}}
								>
									{p.priceNote[lang]}
								</div>
							</div>
							<div className="flex gap-3">
								<motion.button
									whileHover={{ y: -1 }}
									onClick={() => {
										onClose();
										onOrder(p.id);
									}}
									className="flex-1 py-3 text-sm font-bold uppercase tracking-wider text-white"
									style={{
										fontFamily: "'Mukta', sans-serif",
										background: "rgb(240, 192, 64)",
										borderBottom: "3px solid #FFFFFF",
									}}
								>
									{t.pmBuyNow}
								</motion.button>
								<button
									onClick={() => {
										onClose();
										onOrder();
									}}
									className="flex-1 py-3 text-sm font-bold uppercase tracking-wider transition-all hover:bg-red-900 hover:text-white"
									style={{
										fontFamily: "'Mukta', sans-serif",
										color: "#FFFFFF",
										border: "2px solid #FFFFFF",
									}}
								>
									{t.pmCustom}
								</button>
							</div>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}

// ── ORDER MODAL ──
function OrderModal({ lang, t, open, onClose, preselect }) {
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [selectedId, setSelectedId] = useState(preselect ?? -1);
	const [address, setAddress] = useState("");
	const [note, setNote] = useState("");
	const om = t.orderModal;

	useEffect(() => {
		if (preselect !== undefined && preselect >= 0) setSelectedId(preselect);
	}, [preselect]);

	const selected = PRODUCTS.find((p) => p.id === selectedId);

	const submit = () => {
		if (!name || !phone) {
			alert(
				lang === "en"
					? "Please fill in your name and phone."
					: "Naam aur phone zaroor bharo.",
			);
			return;
		}
		if (!selected) {
			alert(
				lang === "en"
					? "Please select a product."
					: "Ek product zaroor chuniye.",
			);
			return;
		}
		const msg = encodeURIComponent(
			`🧶 *Namaskar! woolcraft Order*\n\n👤 Naam: ${name}\n📞 Phone: ${phone}\n🛍 Product: ${selected.emoji} ${selected.name.en} (₹${selected.price})\n📍 Pata: ${address || "—"}\n📝 Farmaish: ${note || "—"}\n\nJai Hind! 🇮🇳`,
		);
		window.open(`https://wa.me/919876500000?text=${msg}`, "_blank");
		onClose();
		setTimeout(
			() =>
				alert(
					lang === "en"
						? `Shukriya ${name} ji! 🙏🎉 We'll WhatsApp you shortly.`
						: `Shukriya ${name} ji! 🙏🎉 Hum jaldi WhatsApp karenge.`,
				),
			300,
		);
	};

	const inputStyle = {
		fontFamily: "'Mukta', sans-serif",
		fontSize: "0.85rem",
		color: "#1A0A00",
		background: "#F7EDD8",
		border: "1.5px solid #EDD8B0",
		borderLeft: "3px solid rgb(240, 192, 64)",
		outline: "none",
		padding: "10px 13px",
		width: "100%",
	};
	const selectStyle = {
		...inputStyle,
		borderLeft: "3px solid #0F7B6C",
		appearance: "none",
		cursor: "pointer",
	};

	return (
		<AnimatePresence>
			{open && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 z-[60] flex items-center justify-center p-4"
					style={{ background: "rgba(26,10,0,0.78)" }}
					onClick={(e) => e.target === e.currentTarget && onClose()}
				>
					<motion.div
						variants={modalVariants}
						initial="hidden"
						animate="show"
						exit="exit"
						className="w-full max-w-lg modal-scroll"
						style={{
							background: "#FFFDF8",
							border: "2px solid #EDD8B0",
							borderTop: "5px solid rgb(240, 192, 64)",
							boxShadow: "0 40px 80px rgba(26,10,0,0.5), 8px 8px 0 #FFFFFF",
						}}
					>
						<button
							onClick={onClose}
							className="absolute top-3 right-3 z-10 p-1.5 hover:text-zinc-500 transition-colors"
							style={{ color: "rgb(240, 192, 64)" }}
						>
							<X size={18} />
						</button>
						<div
							className="p-6 pb-5"
							style={{
								background: "#FFFFFF",
								borderBottom: "3px solid rgb(240, 192, 64)",
							}}
						>
							<div
								className="font-rozha text-2xl mb-1"
								style={{ fontFamily: "'Comic Sans', serif", color: "#F7EDD8" }}
							>
								{om.title}
							</div>
							<div
								className="text-xs"
								style={{
									fontFamily: "'Mukta', sans-serif",
									color: "rgba(247,237,216,0.62)",
								}}
							>
								{om.sub}
							</div>
						</div>
						<div className="p-6 space-y-4">
							{/* Name */}
							<div>
								<label
									className="block text-xs font-bold uppercase tracking-wider mb-2"
									style={{
										fontFamily: "'Mukta', sans-serif",
										color: "rgb(240, 192, 64)",
										letterSpacing: "0.14em",
									}}
								>
									{om.nameLbl}
								</label>
								<input
									style={inputStyle}
									value={name}
									onChange={(e) => setName(e.target.value)}
									placeholder={
										lang === "en" ? "Poora naam likhiye" : "पूरा नाम लिखें"
									}
								/>
							</div>
							{/* Phone */}
							<div>
								<label
									className="block text-xs font-bold uppercase tracking-wider mb-2"
									style={{
										fontFamily: "'Mukta', sans-serif",
										color: "rgb(240, 192, 64)",
										letterSpacing: "0.14em",
									}}
								>
									{om.phoneLbl}
								</label>
								<input
									style={inputStyle}
									value={phone}
									onChange={(e) => setPhone(e.target.value)}
									placeholder="+91 XXXXX XXXXX"
									type="tel"
								/>
							</div>
							{/* Select */}
							<div>
								<label
									className="block text-xs font-bold uppercase tracking-wider mb-2"
									style={{
										fontFamily: "'Mukta', sans-serif",
										color: "rgb(240, 192, 64)",
										letterSpacing: "0.14em",
									}}
								>
									{om.selectLbl}
								</label>
								<select
									style={selectStyle}
									value={selectedId === -1 ? "" : String(selectedId)}
									onChange={(e) =>
										setSelectedId(
											e.target.value === "" ? -1 : parseInt(e.target.value),
										)
									}
								>
									<option value="">{om.selectPlaceholder}</option>
									{PRODUCTS.map((p) => (
										<option key={p.id} value={p.id}>
											{p.emoji} {p.name[lang]} — ₹{p.price}
										</option>
									))}
								</select>
							</div>
							{/* Chips */}
							<div>
								<label
									className="block text-xs font-bold uppercase tracking-wider mb-2"
									style={{
										fontFamily: "'Mukta', sans-serif",
										color: "rgb(240, 192, 64)",
										letterSpacing: "0.14em",
									}}
								>
									{om.chipsLbl}
								</label>
								<div className="flex flex-wrap gap-2">
									{PRODUCTS.map((p) => (
										<button
											key={p.id}
											onClick={() => setSelectedId(p.id)}
											className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold transition-all"
											style={{
												fontFamily: "'Mukta', sans-serif",
												border:
													selectedId === p.id
														? "1.5px solid rgb(240, 192, 64)"
														: "1.5px solid #EDD8B0",
												borderLeft:
													selectedId === p.id
														? "3px solid rgb(240, 192, 64)"
														: "1.5px solid #EDD8B0",
												background:
													selectedId === p.id
														? "rgba(232,98,10,0.08)"
														: "#F7EDD8",
												color:
													selectedId === p.id
														? "rgb(240, 192, 64)"
														: "rgb(240, 192, 64)",
											}}
										>
											<span>{p.emoji}</span>
											<span>{p.name[lang]}</span>
										</button>
									))}
								</div>
							</div>
							{/* Summary */}
							{selected && (
								<motion.div
									initial={{ opacity: 0, y: 6 }}
									animate={{ opacity: 1, y: 0 }}
									className="p-3 space-y-1"
									style={{
										background: "#F7EDD8",
										border: "1.5px solid #EDD8B0",
										borderLeft: "4px solid #0F7B6C",
									}}
								>
									{[
										[om.product, `${selected.emoji} ${selected.name[lang]}`],
										[om.price, `₹${selected.price}`],
										[om.delivery, om.deliveryVal],
										[om.total, `₹${selected.price}+`],
									].map(([k, v], i) => (
										<div
											key={i}
											className={`flex justify-between text-xs py-1 ${i < 3 ? "border-b border-dashed border-amber-200" : "font-bold pt-2"}`}
											style={{
												fontFamily: "'Mukta', sans-serif",
												color:
													i === 3 ? "rgb(240, 192, 64)" : "rgb(240, 192, 64)",
											}}
										>
											<span>{k}</span>
											<span>{v}</span>
										</div>
									))}
								</motion.div>
							)}
							{/* Address */}
							<div>
								<label
									className="block text-xs font-bold uppercase tracking-wider mb-2"
									style={{
										fontFamily: "'Mukta', sans-serif",
										color: "rgb(240, 192, 64)",
										letterSpacing: "0.14em",
									}}
								>
									{om.addressLbl}
								</label>
								<input
									style={inputStyle}
									value={address}
									onChange={(e) => setAddress(e.target.value)}
									placeholder={
										lang === "en" ? "Sheher, Rajya, PIN" : "शहर, राज्य, PIN"
									}
								/>
							</div>
							{/* Note */}
							<div>
								<label
									className="block text-xs font-bold uppercase tracking-wider mb-2"
									style={{
										fontFamily: "'Mukta', sans-serif",
										color: "rgb(240, 192, 64)",
										letterSpacing: "0.14em",
									}}
								>
									{om.noteLbl}
								</label>
								<input
									style={{ ...inputStyle, borderLeft: "3px solid #D4A017" }}
									value={note}
									onChange={(e) => setNote(e.target.value)}
									placeholder={om.notePlaceholder}
								/>
							</div>
							{/* Submit */}
							<motion.button
								whileHover={{ y: -1 }}
								whileTap={{ scale: 0.97 }}
								onClick={submit}
								className="w-full py-3.5 flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-wider text-white"
								style={{
									fontFamily: "'Mukta', sans-serif",
									background: "rgb(240, 192, 64)",
									borderBottom: "3px solid #FFFFFF",
									letterSpacing: "0.12em",
								}}
							>
								{om.submit}
							</motion.button>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}

// ── ROOT APP ──
export default function woolcraft() {
	const [lang, setLang] = useState("en");
	const [productModal, setProductModal] = useState(null);
	const [orderModal, setOrderModal] = useState(false);
	const [orderPreselect, setOrderPreselect] = useState(-1);

	const t = T[lang];

	const openProduct = (id) => setProductModal(id);
	const closeProduct = () => setProductModal(null);

	const openOrder = (preselect) => {
		if (preselect !== undefined) setOrderPreselect(preselect);
		else setOrderPreselect(-1);
		setOrderModal(true);
	};
	const closeOrder = () => setOrderModal(false);

	useEffect(() => {
		document.body.style.overflow =
			productModal !== null || orderModal ? "hidden" : "";
	}, [productModal, orderModal]);

	return (
		<div
			className="font-mukta"
			style={{ fontFamily: "'Mukta', sans-serif", background: "#000000" }}
		>
			<Head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin=""
				/>
				<link href={GOOGLE_FONTS_HREF} rel="stylesheet" />
				<style>{GLOBAL_CSS}</style>
			</Head>
			<Navbar lang={lang} setLang={setLang} t={t} onOrder={() => openOrder()} />
			<div style={{ paddingTop: "78px" }}>
				<Hero
					lang={lang}
					t={t}
					onOrder={() => openOrder()}
					onProduct={openProduct}
				/>
				<RangoliBorder />
				<SareeStrip lang={lang} t={t} />
				<RangoliBorder teal />
				<Products lang={lang} t={t} onProduct={openProduct} />
				<RangoliBorder />
				<Story lang={lang} t={t} />
				<RangoliBorder teal />
				<Gallery lang={lang} t={t} onProduct={openProduct} />
				<RangoliBorder />
				<OrderCTA lang={lang} t={t} onOrder={() => openOrder()} />
				<RangoliBorder teal />
				<FAQ lang={lang} t={t} />
				<Footer
					lang={lang}
					t={t}
					onOrder={() => openOrder()}
					onProduct={openProduct}
				/>
			</div>

			<ProductModal
				product={productModal !== null ? PRODUCTS[productModal] : null}
				lang={lang}
				t={t}
				open={productModal !== null}
				onClose={closeProduct}
				onOrder={(id) => openOrder(id)}
			/>
			<OrderModal
				lang={lang}
				t={t}
				open={orderModal}
				onClose={closeOrder}
				preselect={orderPreselect}
			/>
		</div>
	);
}

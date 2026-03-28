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
	Share2,
	Copy,
	Heart,
	Instagram,
	Facebook,
	Sun,
	Moon,
} from "lucide-react";
import { useWoolcraftTheme } from "../contexts/WoolcraftThemeContext";
import { marketingSkin } from "../lib/woolcraft-marketing-skin";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "sonner";
import {
	GOOGLE_FONTS_HREF,
	WHATSAPP_ORDER_NUMBER,
	GLOBAL_CSS,
	T,
	PRODUCTS,
	getSiteUrl,
	SUPPORTED_LANGS,
	LANG_LABELS,
} from "../lib/woolcraft-data";

function pickLocalized(obj, lang) {
	if (!obj || typeof obj !== "object") return "";
	return obj[lang] ?? obj.en ?? obj.hi ?? "";
}

function pickProductName(name, lang) {
	return pickLocalized(name, lang);
}

function pickProductSubtitle(name, lang) {
	if (!name || typeof name !== "object") return "";
	if (lang === "en") return name.hi ?? name.en ?? "";
	if (lang === "hi") return name.en ?? name.hi ?? "";
	return name.en ?? name.hi ?? "";
}

function pickDetailPair(d, lang) {
	const arr = d?.[lang] ?? d?.en ?? d?.hi;
	return Array.isArray(arr) ? arr : ["", ""];
}

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
	const { theme } = useWoolcraftTheme();
	const muted = theme === "light" ? "#57534e" : "rgba(247,237,216,0.55)";
	return (
		<div
			className="flex items-center gap-2 mb-2"
			style={{
				fontFamily: "'Tiro Devanagari Hindi', serif",
				fontSize: "0.9rem",
				color: muted,
			}}
		>
			<span style={{ color: muted, opacity: 0.85 }}>❋</span>
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
			alt={`${pickProductName(p.name, "en") || "Product"} — woolcraft`}
			fill
			sizes={sizes}
			priority={priority}
			style={{ objectFit: "cover" }}
		/>
	);
}

// ── NAVBAR ──
function Navbar({ lang, setLang, t, onOrder }) {
	const { theme, toggleTheme } = useWoolcraftTheme();
	const skin = marketingSkin(theme);
	const router = useRouter();
	const isHome = router.pathname === "/";
	const [scrolled, setScrolled] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);
	useEffect(() => {
		const fn = () => setScrolled(window.scrollY > 40);
		window.addEventListener("scroll", fn);
		return () => window.removeEventListener("scroll", fn);
	}, []);
	const goSection = (id) => {
		setMobileOpen(false);
		if (isHome) {
			document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
		} else {
			router.push(`/#${id}`);
		}
	};
	const goHomeTop = () => {
		setMobileOpen(false);
		if (isHome) window.scrollTo({ top: 0, behavior: "smooth" });
		else router.push("/");
	};
	const ids = ["products", "story", "gallery", "faq"];
	return (
		<>
			{/* Lang bar */}
			<div
				className="fixed top-0 left-0 right-0 z-50 flex flex-wrap items-center justify-between gap-2 px-4 sm:px-6 py-1.5 border-b border-zinc-800"
				style={{ background: skin.navLangBar }}
			>
				<span
					className="text-xs font-hindi min-w-0 flex-1"
					style={{
						color: skin.heroHindi,
						fontFamily: "'Tiro Devanagari Hindi', serif",
					}}
				>
					{t.langbar}
				</span>
				<div className="flex items-center gap-2 flex-shrink-0">
					<button
						type="button"
						onClick={toggleTheme}
						className="p-1.5 rounded border transition-all"
						style={{
							border:
								theme === "light"
									? "1px solid rgba(28,25,23,0.15)"
									: "1px solid rgba(247,237,216,0.2)",
							color: theme === "light" ? "#1c1917" : "#F7EDD8",
							background:
								theme === "light"
									? "rgba(255,255,255,0.85)"
									: "rgba(255,255,255,0.06)",
						}}
						aria-label={theme === "dark" ? "Light mode" : "Dark mode"}
					>
						{theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
					</button>
					<select
						value={lang}
						onChange={(e) => setLang(e.target.value)}
						className="text-xs font-bold px-2 py-1 rounded-sm border max-w-[140px]"
						style={{
							fontFamily: "'Mukta', sans-serif",
							letterSpacing: "0.06em",
							border:
								theme === "light"
									? "1px solid rgba(28,25,23,0.2)"
									: "1px solid rgba(247,237,216,0.25)",
							background:
								theme === "light"
									? "rgba(255,255,255,0.9)"
									: "rgba(0,0,0,0.25)",
							color: theme === "light" ? "#1c1917" : "#F7EDD8",
						}}
					>
						{SUPPORTED_LANGS.map((l) => (
							<option key={l} value={l}>
								{LANG_LABELS[l] ?? l}
							</option>
						))}
					</select>
				</div>
			</div>
			{/* Main nav */}
			<nav
				className={`fixed left-0 right-0 border-b border-zinc-800 z-40 flex items-stretch justify-between px-6 transition-shadow ${scrolled ? "shadow-lg" : ""}`}
				style={{
					top: "30px",
					borderBottom: "3px solid #27272a",
					background: skin.navMain,
				}}
			>
				<button
					type="button"
					className="flex items-center gap-2 py-3"
					onClick={goHomeTop}
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
								type="button"
								onClick={() => goSection(ids[i])}
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
							type="button"
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
					type="button"
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
								type="button"
								onClick={() => goSection(ids[i])}
								className="px-6 py-3 text-left text-sm font-bold border-b"
								style={{
									fontFamily: "'Mukta', sans-serif",
									color: "#292524",
									borderColor: "rgba(0,0,0,0.08)",
								}}
							>
								{label}
							</button>
						))}
						<button
							type="button"
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
function Hero({ lang, t, onOrder }) {
	const { theme } = useWoolcraftTheme();
	const skin = marketingSkin(theme);
	return (
		<section
			id="hero"
			className="min-h-screen flex items-center relative overflow-hidden paisley-bg"
			style={{ background: skin.pageBg, paddingTop: "90px" }}
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
								color: skin.heroTag,
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
							color: skin.heroTitle,
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
							color: skin.heroHindi,
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
							color: skin.heroSub,
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
							type="button"
							onClick={onOrder}
							className="px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all"
							style={{
								fontFamily: "'Mukta', sans-serif",
								color: skin.heroTitle,
								border: `2px solid ${theme === "light" ? "rgba(28,25,23,0.2)" : "rgba(247,237,216,0.4)"}`,
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
							<Link
								key={idx}
								href={`/product/${PRODUCTS[idx].slug}`}
								className="block"
							>
								<motion.div
									whileHover={{ y: -6, rotate: i % 2 === 0 ? -1 : 1 }}
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
										{pickProductName(PRODUCTS[idx].name, lang)}
									</div>
								</motion.div>
							</Link>
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
function Products({ lang, t }) {
	const { theme } = useWoolcraftTheme();
	const skin = marketingSkin(theme);
	return (
		<section
			id="products"
			className="py-20 px-6"
			style={{ background: skin.sectionBg }}
		>
			<FadeInSection>
				<div className="text-center mb-2">
					<SectionTag>{t.prodTag}</SectionTag>
					<h2
						className="font-rozha text-4xl mb-1"
						style={{
							fontFamily: "'Comic Sans', serif",
							color: skin.headingOnDark,
						}}
					>
						{t.prodTitle}
					</h2>
					<div
						className="font-hindi  text-lg mb-3"
						style={{
							fontFamily: "'Tiro Devanagari Hindi', serif",
							color: skin.headingGold,
						}}
					>
						{t.prodHindi}
					</div>
					<p
						className="max-w-xl mx-auto font-light mb-6"
						style={{
							fontFamily: "'Mukta', sans-serif",
							fontSize: "0.88rem",
							color: skin.headingGold,
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
						<ProductCard product={p} lang={lang} t={t} />
					</FadeInSection>
				))}
			</div>
		</section>
	);
}

function ProductCard({ product: p, lang, t }) {
	return (
		<Link href={`/product/${p.slug}`} className="block">
			<motion.div
				whileHover={{ y: -6 }}
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
							{pickLocalized(p.badge, lang)}
						</div>
					)}
				</div>
				<div className="p-4">
					<div
						className="font-yatra text-lg mb-0.5"
						style={{ fontFamily: "'Yatra One', cursive", color: "#FFFFFF" }}
					>
						{pickProductName(p.name, lang)}
					</div>
					<div
						className="font-hindi  text-xs mb-2"
						style={{
							fontFamily: "'Tiro Devanagari Hindi', serif",
							color: "rgb(240, 192, 64)",
						}}
					>
						{pickProductSubtitle(p.name, lang)}
					</div>
					<p
						className="text-xs font-light mb-3 leading-relaxed"
						style={{
							fontFamily: "'Mukta', sans-serif",
							color: "rgb(240, 192, 64)",
						}}
					>
						{pickLocalized(p.desc, lang)}
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
		</Link>
	);
}

// ── STORY ──
function Story({ lang, t }) {
	const { theme } = useWoolcraftTheme();
	const skin = marketingSkin(theme);
	return (
		<section
			id="story"
			className="py-20 px-6 relative overflow-hidden paisley-bg"
			style={{ background: skin.sectionBg }}
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
							<span style={{ color: skin.faqHeading }}>{t.storyTag}</span>
						</SectionTag>
						<h2
							className="font-rozha text-4xl mb-1"
							style={{
								fontFamily: "'Comic Sans', serif",
								color: skin.heroTitle,
							}}
						>
							{t.storyTitle}
						</h2>
						<div
							className="font-hindi  text-xl mb-4"
							style={{
								fontFamily: "'Tiro Devanagari Hindi', serif",
								color: skin.heroHindi,
							}}
						>
							{t.storyHindi}
						</div>
						<p
							className="font-light mb-8 leading-loose"
							style={{
								fontFamily: "'Mukta', sans-serif",
								fontSize: "0.88rem",
								color: skin.bodyMuted,
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
											background:
												theme === "light"
													? "rgba(28,25,23,0.06)"
													: "rgba(247,237,216,0.1)",
											border:
												theme === "light"
													? "1.5px solid rgba(28,25,23,0.12)"
													: "1.5px solid rgba(247,237,216,0.2)",
										}}
									>
										<Icon size={18} color={skin.heroHindi} />
									</div>
									<div>
										<h4
											className="font-yatra text-sm mb-0.5"
											style={{
												fontFamily: "'Yatra One', cursive",
												color: skin.heroTitle,
											}}
										>
											{f.title}
										</h4>
										<p
											className="text-xs font-light leading-relaxed"
											style={{
												fontFamily: "'Mukta', sans-serif",
												color: skin.bodyMuted,
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
function Gallery({ lang, t }) {
	const { theme } = useWoolcraftTheme();
	const skin = marketingSkin(theme);
	const galleryItems = [0, 1, 2, 4, 3, 5, 2];
	return (
		<section
			id="gallery"
			className="py-20 px-6"
			style={{ background: skin.sectionBg }}
		>
			<FadeInSection>
				<SectionTag>{t.galleryTag}</SectionTag>
				<h2
					className="font-rozha text-4xl mb-1"
					style={{
						fontFamily: "'Comic Sans', serif",
						color: skin.headingOnDark,
					}}
				>
					{t.galleryTitle}
				</h2>
				<div
					className="font-hindi  text-lg mb-3"
					style={{
						fontFamily: "'Tiro Devanagari Hindi', serif",
						color: skin.headingGold,
					}}
				>
					{t.galleryHindi}
				</div>
				<p
					className="max-w-xl font-light mb-6"
					style={{
						fontFamily: "'Mukta', sans-serif",
						fontSize: "0.88rem",
						color: skin.faqHeading,
						lineHeight: 1.85,
					}}
				>
					{t.gallerySub}
				</p>
			</FadeInSection>
			<div className="gallery-scroll flex gap-3 pb-2 max-w-7xl mx-auto">
				{galleryItems.map((idx, i) => (
					<Link
						key={i}
						href={`/product/${PRODUCTS[idx].slug}`}
						className="gallery-item flex-shrink-0 w-40 h-40 cursor-pointer relative overflow-hidden block"
						style={{ background: "#FFFDF8", border: "2px solid #D4B878" }}
					>
						<motion.div
							whileHover={{ scale: 1.06 }}
							className="w-full h-full relative"
						>
							<div className="absolute inset-1.5 border border-dashed border-red-900/12 rounded-full pointer-events-none" />
							<div className="absolute inset-0">
								<ProductImage p={PRODUCTS[idx]} sizes="160px" />
							</div>
						</motion.div>
					</Link>
				))}
			</div>
			<div
				className="text-center mt-4 text-xs font-bold uppercase tracking-widest"
				style={{
					fontFamily: "'Mukta', sans-serif",
					color: skin.headingGold,
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
	const { theme } = useWoolcraftTheme();
	const skin = marketingSkin(theme);
	const ctaBg = theme === "light" ? "#e8e0d2" : "#18181b";
	return (
		<section
			id="order"
			className="py-20 px-6 text-center relative overflow-hidden"
			style={{ background: ctaBg }}
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
					<span style={{ color: skin.faqHeading }}>{t.orderTag}</span>
				</div>
				<h2
					className="font-rozha text-4xl mb-1"
					style={{
						fontFamily: "Comic Sans",
						color: skin.faqHeading,
					}}
				>
					{t.orderTitle}
				</h2>
				<div
					className="font-hindi  text-xl mb-4"
					style={{
						color: skin.faqHeading,
					}}
				>
					{t.orderHindi}
				</div>
				<p
					className="max-w-xl mx-auto font-light mb-8"
					style={{
						fontFamily: "'Mukta', sans-serif",
						fontSize: "0.88rem",
						color: skin.faqHeading,
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
						type="button"
						onClick={() =>
							document
								.getElementById("products")
								?.scrollIntoView({ behavior: "smooth" })
						}
						className="px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all"
						style={{
							fontFamily: "'Mukta', sans-serif",
							color: skin.heroTitle,
							border: `2px solid ${theme === "light" ? "rgba(28,25,23,0.2)" : "rgba(247,237,216,0.35)"}`,
						}}
					>
						{t.browseProductsCta}
					</button>
				</div>
				<p
					className="mt-5 text-xs"
					style={{
						fontFamily: "'Mukta', sans-serif",
						color:
							theme === "light"
								? "rgba(28,25,23,0.55)"
								: "rgba(247,237,216,0.55)",
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
	const { theme } = useWoolcraftTheme();
	const skin = marketingSkin(theme);
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
					style={{
						fontFamily: "'Comic Sans', serif",
						color: skin.faqHeading,
					}}
				>
					{t.faqTitle}
				</h2>
				<div
					className="font-hindi  text-lg mb-3"
					style={{
						fontFamily: "'Tiro Devanagari Hindi', serif",
						color: skin.faqHeading,
					}}
				>
					{t.faqHindi}
				</div>
				<p
					className="max-w-xl font-light mb-8"
					style={{
						fontFamily: "'Mukta', sans-serif",
						fontSize: "0.88rem",
						color: skin.faqSub,
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
								background:
									theme === "light" ? "rgba(255,255,255,0.7)" : "transparent",
							}}
						>
							<button
								type="button"
								onClick={() => setOpen(open === i ? null : i)}
								className="w-full flex items-center justify-between gap-3 p-5 text-left transition-colors"
								style={{
									fontSize: "0.95rem",
									color: skin.faqQ,
								}}
							>
								<span>{faq.q}</span>
								<motion.span
									animate={{ rotate: open === i ? 45 : 0 }}
									transition={{ duration: 0.25 }}
									className="flex-shrink-0"
									style={{ color: skin.bodyMuted }}
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
												color: skin.faqSub,
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
function Footer({ lang, t, onOrder }) {
	const { theme } = useWoolcraftTheme();
	const skin = marketingSkin(theme);
	const router = useRouter();
	const isHome = router.pathname === "/";
	const scrollTo = (id) => {
		if (isHome) {
			document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
		} else {
			router.push(`/#${id}`);
		}
	};
	return (
		<footer style={{ background: skin.footerBg }}>
			{/* Top bar */}
			<div
				className="flex flex-wrap items-center justify-between gap-4 px-6 py-4"
				style={{
					background: skin.footerBarBg,
					borderBottom: "2px solid #27272a",
				}}
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
							color: skin.footerMuted,
						}}
					>
						{t.footerTagline}
					</div>
				</div>
				<button
					type="button"
					onClick={onOrder}
					className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white uppercase tracking-wider"
					style={{
						fontFamily: "'Mukta', sans-serif",
						background: "#25D366",
						borderBottom: "2px solid #128C7E",
					}}
				>
					<MessageCircle size={14} />
					{t.footerWa}
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
							color: skin.footerMuted,
						}}
					>
						{t.footerBio}
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
						{t.footerColProducts}
					</h5>
					<ul className="space-y-2">
						{PRODUCTS.map((p) => (
							<li key={p.id}>
								<Link
									href={`/product/${p.slug}`}
									className="text-xs font-light hover:text-white transition-colors block"
									style={{
										fontFamily: "'Mukta', sans-serif",
										color: skin.footerMuted,
									}}
								>
									{p.emoji} {pickProductName(p.name, lang)}
								</Link>
							</li>
						))}
					</ul>
				</div>
				<div>
					<h5
						className="text-sm mb-4 font-yatra"
						style={{ fontFamily: "'Yatra One', cursive", color: "#F0C040" }}
					>
						{t.footerColOrder}
					</h5>
					<ul className="space-y-2">
						{[
							{ label: () => t.footerLinkPlaceOrder, action: onOrder },
							{ label: () => t.footerLinkCustom, action: onOrder },
							{
								label: () => t.footerLinkShipping,
								action: () => scrollTo("faq"),
							},
							{
								label: () => t.footerLinkBulk,
								action: () => scrollTo("faq"),
							},
							{
								label: () => t.footerLinkPay,
								action: () => scrollTo("faq"),
							},
						].map((item, i) => (
							<li key={i}>
								<button
									type="button"
									onClick={item.action}
									className="text-xs font-light hover:text-white transition-colors"
									style={{
										fontFamily: "'Mukta', sans-serif",
										color: skin.footerMuted,
									}}
								>
									{item.label()}
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
						{t.footerColContact}
					</h5>
					<div className="space-y-2.5">
						{[
							{
								icon: MapPin,
								text: t.footerLocation,
							},
							{ icon: Phone, text: "+91 9413732541" },
							{ icon: Mail, text: "hello@wool-craft.vercel.app" },
							{
								icon: Clock,
								text: t.footerHours,
							},
							{
								icon: MessageCircle,
								text: t.footerWaHint,
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
										color: skin.footerMuted,
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
						color: skin.footerCopyright,
						letterSpacing: "0.06em",
					}}
				>
					© 2025 woolcraft. {t.footerRights}
				</p>
				<p
					className="text-xs"
					style={{
						fontFamily: "'Mukta', sans-serif",
						color: skin.footerCopyright,
					}}
				>
					{t.footerMadeIn}
				</p>
			</div>
		</footer>
	);
}

// ── ORDER MODAL ──
function OrderModal({ lang, t, open, onClose, preselect }) {
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [selectedId, setSelectedId] = useState(preselect ?? -1);
	const [addressLine1, setAddressLine1] = useState("");
	const [addressLine2, setAddressLine2] = useState("");
	const [city, setCity] = useState("");
	const [addressRegion, setAddressRegion] = useState("");
	const [postalCode, setPostalCode] = useState("");
	const [country, setCountry] = useState("");
	const [note, setNote] = useState("");
	const om = t.orderModal;

	useEffect(() => {
		if (preselect !== undefined && preselect >= 0) setSelectedId(preselect);
	}, [preselect]);

	const selected = PRODUCTS.find((p) => p.id === selectedId);

	const submit = () => {
		const phoneClean = phone.replace(/\s/g, "").trim();
		if (!name || !phoneClean) {
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
		const deliveryLines = [
			addressLine1.trim(),
			addressLine2.trim(),
			[city.trim(), addressRegion.trim(), postalCode.trim()]
				.filter(Boolean)
				.join(", "),
			country.trim(),
		].filter(Boolean);
		const addressBlock = deliveryLines.length ? deliveryLines.join("\n") : "—";
		const msg = encodeURIComponent(
			`🧶 *Namaskar! woolcraft Order*\n\n👤 Naam: ${name}\n📞 Customer WhatsApp: ${phoneClean}\n🛍 Product: ${selected.emoji} ${selected.name.en} (₹${selected.price})\n📍 Delivery:\n${addressBlock}\n📝 Farmaish: ${note || "—"}\n\nJai Hind! 🇮🇳`,
		);
		window.open(`https://wa.me/${WHATSAPP_ORDER_NUMBER}?text=${msg}`, "_blank");
		onClose();
		toast.success(om.toastOrderTitle, {
			description: om.toastOrderDesc,
			duration: 6500,
		});
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
						<form
							className="p-6 space-y-4"
							autoComplete="on"
							onSubmit={(e) => {
								e.preventDefault();
								submit();
							}}
						>
							{/* Name */}
							<div>
								<label
									htmlFor="woolcraft-order-name"
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
									id="woolcraft-order-name"
									name="name"
									autoComplete="name"
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
									htmlFor="woolcraft-order-tel"
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
									id="woolcraft-order-tel"
									name="phone"
									autoComplete="tel"
									style={inputStyle}
									value={phone}
									onChange={(e) => setPhone(e.target.value)}
									placeholder="+91 XXXXX XXXXX"
									type="tel"
									inputMode="tel"
								/>
							</div>
							{/* Select */}
							<div>
								<label
									htmlFor="woolcraft-order-product"
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
									id="woolcraft-order-product"
									name="order-product"
									autoComplete="off"
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
											{p.emoji} {pickProductName(p.name, lang)} — ₹{p.price}
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
											type="button"
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
											<span>{pickProductName(p.name, lang)}</span>
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
										[
											om.product,
											`${selected.emoji} ${pickProductName(selected.name, lang)}`,
										],
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
							{/* Delivery — shipping* tokens help browser autofill */}
							<fieldset className="space-y-3 border-0 p-0 m-0 min-w-0">
								<legend
									className="block text-xs font-bold uppercase tracking-wider mb-2 w-full"
									style={{
										fontFamily: "'Mukta', sans-serif",
										color: "rgb(240, 192, 64)",
										letterSpacing: "0.14em",
									}}
								>
									{om.addressLbl}
								</legend>
								<div className="space-y-3">
									<div>
										<label
											htmlFor="woolcraft-shipping-line1"
											className="block text-[0.65rem] font-bold uppercase tracking-wider mb-1.5 opacity-90"
											style={{
												fontFamily: "'Mukta', sans-serif",
												color: "rgb(240, 192, 64)",
												letterSpacing: "0.1em",
											}}
										>
											{om.addressLine1Lbl}
										</label>
										<input
											id="woolcraft-shipping-line1"
											name="shipping-address-line1"
											autoComplete="shipping address-line1"
											style={inputStyle}
											value={addressLine1}
											onChange={(e) => setAddressLine1(e.target.value)}
										/>
									</div>
									<div>
										<label
											htmlFor="woolcraft-shipping-line2"
											className="block text-[0.65rem] font-bold uppercase tracking-wider mb-1.5 opacity-90"
											style={{
												fontFamily: "'Mukta', sans-serif",
												color: "rgb(240, 192, 64)",
												letterSpacing: "0.1em",
											}}
										>
											{om.addressLine2Lbl}
										</label>
										<input
											id="woolcraft-shipping-line2"
											name="shipping-address-line2"
											autoComplete="shipping address-line2"
											style={inputStyle}
											value={addressLine2}
											onChange={(e) => setAddressLine2(e.target.value)}
										/>
									</div>
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
										<div>
											<label
												htmlFor="woolcraft-shipping-city"
												className="block text-[0.65rem] font-bold uppercase tracking-wider mb-1.5 opacity-90"
												style={{
													fontFamily: "'Mukta', sans-serif",
													color: "rgb(240, 192, 64)",
													letterSpacing: "0.1em",
												}}
											>
												{om.cityLbl}
											</label>
											<input
												id="woolcraft-shipping-city"
												name="shipping-address-level2"
												autoComplete="shipping address-level2"
												style={inputStyle}
												value={city}
												onChange={(e) => setCity(e.target.value)}
											/>
										</div>
										<div>
											<label
												htmlFor="woolcraft-shipping-state"
												className="block text-[0.65rem] font-bold uppercase tracking-wider mb-1.5 opacity-90"
												style={{
													fontFamily: "'Mukta', sans-serif",
													color: "rgb(240, 192, 64)",
													letterSpacing: "0.1em",
												}}
											>
												{om.stateLbl}
											</label>
											<input
												id="woolcraft-shipping-state"
												name="shipping-address-level1"
												autoComplete="shipping address-level1"
												style={inputStyle}
												value={addressRegion}
												onChange={(e) => setAddressRegion(e.target.value)}
											/>
										</div>
										<div>
											<label
												htmlFor="woolcraft-shipping-postal"
												className="block text-[0.65rem] font-bold uppercase tracking-wider mb-1.5 opacity-90"
												style={{
													fontFamily: "'Mukta', sans-serif",
													color: "rgb(240, 192, 64)",
													letterSpacing: "0.1em",
												}}
											>
												{om.postalLbl}
											</label>
											<input
												id="woolcraft-shipping-postal"
												name="shipping-postal-code"
												autoComplete="shipping postal-code"
												style={inputStyle}
												value={postalCode}
												onChange={(e) => setPostalCode(e.target.value)}
												inputMode="numeric"
												maxLength={12}
											/>
										</div>
										<div>
											<label
												htmlFor="woolcraft-shipping-country"
												className="block text-[0.65rem] font-bold uppercase tracking-wider mb-1.5 opacity-90"
												style={{
													fontFamily: "'Mukta', sans-serif",
													color: "rgb(240, 192, 64)",
													letterSpacing: "0.1em",
												}}
											>
												{om.countryLbl}
											</label>
											<input
												id="woolcraft-shipping-country"
												name="shipping-country"
												autoComplete="shipping country"
												style={inputStyle}
												value={country}
												onChange={(e) => setCountry(e.target.value)}
											/>
										</div>
									</div>
								</div>
							</fieldset>
							{/* Note */}
							<div>
								<label
									htmlFor="woolcraft-order-note"
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
									id="woolcraft-order-note"
									name="order-notes"
									autoComplete="off"
									style={{ ...inputStyle, borderLeft: "3px solid #D4A017" }}
									value={note}
									onChange={(e) => setNote(e.target.value)}
									placeholder={om.notePlaceholder}
								/>
							</div>
							{/* Submit */}
							<motion.button
								type="submit"
								whileHover={{ y: -1 }}
								whileTap={{ scale: 0.97 }}
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
						</form>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}

// ── PRODUCT PAGE (SEO) ──
export function WoolcraftProductPage({ product }) {
	const [lang, setLang] = useState("en");
	const [orderModal, setOrderModal] = useState(false);
	const [orderPreselect, setOrderPreselect] = useState(product.id);
	const [canNativeShare, setCanNativeShare] = useState(false);
	const { theme } = useWoolcraftTheme();
	const skin = marketingSkin(theme);
	const t = T[lang] ?? T.en;
	const pp = t.productPage;
	const base = getSiteUrl();
	const pageUrl = `${base}/product/${product.slug}`;
	const ogImage = product.image.startsWith("http")
		? product.image
		: `${base}${product.image}`;

	useEffect(() => {
		setOrderPreselect(product.id);
	}, [product.id]);

	useEffect(() => {
		setCanNativeShare(typeof navigator !== "undefined" && !!navigator.share);
	}, []);

	const openOrder = (preselect) => {
		if (preselect !== undefined) setOrderPreselect(preselect);
		else setOrderPreselect(-1);
		setOrderModal(true);
	};
	const closeOrder = () => setOrderModal(false);

	useEffect(() => {
		document.body.style.overflow = orderModal ? "hidden" : "";
	}, [orderModal]);

	const copyPageUrl = () => {
		if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
			navigator.clipboard.writeText(pageUrl);
			toast.success(pp.copied);
		}
	};

	const shareNative = async () => {
		if (typeof navigator !== "undefined" && navigator.share) {
			try {
				await navigator.share({
					title: `${product.name.en} — woolcraft`,
					text: product.desc.en,
					url: pageUrl,
				});
			} catch {
				/* user cancelled */
			}
		}
	};

	const similar = PRODUCTS.filter((p) => p.id !== product.id);

	return (
		<div
			className="font-mukta"
			style={{
				fontFamily: "'Mukta', sans-serif",
				background: skin.pageBg,
			}}
		>
			<Head>
				<title>{`${pickProductName(product.name, "en")} — woolcraft · handmade wool art Kota`}</title>
				<meta name="description" content={product.desc.en} />
				<link rel="canonical" href={pageUrl} />
				<meta property="og:type" content="website" />
				<meta property="og:title" content={`${product.name.en} — woolcraft`} />
				<meta property="og:description" content={product.desc.en} />
				<meta property="og:url" content={pageUrl} />
				<meta property="og:image" content={ogImage} />
				<meta name="twitter:card" content="summary_large_image" />
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
				<section
					className="py-10 px-6 max-w-3xl mx-auto"
					style={{ background: skin.sectionBg }}
				>
					<Link
						href="/"
						className="inline-block text-xs font-bold uppercase tracking-wider mb-6 hover:opacity-80"
						style={{
							fontFamily: "'Mukta', sans-serif",
							color: "rgb(240, 192, 64)",
							letterSpacing: "0.1em",
						}}
					>
						{pp.allProducts}
					</Link>
					<FadeInSection>
						<SectionTag>
							<span style={{ color: skin.headingOnDark }}>{pp.tag}</span>
						</SectionTag>
						<div
							className={`relative aspect-[4/3] max-h-[420px] bg-gradient-to-br ${product.bg} rounded-sm overflow-hidden mb-6`}
							style={{ border: "2px solid #EDD8B0" }}
						>
							<div className="absolute inset-4 border border-dashed border-red-900/10 rounded-full pointer-events-none" />
							<ProductImage
								p={product}
								sizes="(max-width: 640px) 92vw, 720px"
								priority
							/>
						</div>
						{product.badge && (
							<div
								className="inline-block mb-3 px-3 py-1 text-xs font-bold uppercase tracking-wider stamp-rotate"
								style={{
									fontFamily: "'Mukta', sans-serif",
									background: "#FFFFFF",
									color: "#F7EDD8",
									border: "1px solid #A83030",
								}}
							>
								{pickLocalized(product.badge, lang).replace("\n", " ")}
							</div>
						)}
						<h1
							className="font-rozha text-3xl md:text-4xl mb-1"
							style={{
								fontFamily: "'Comic Sans', serif",
								color: skin.heroTitle,
							}}
						>
							{pickProductName(product.name, lang)}
						</h1>
						<div
							className="font-hindi text-base mb-4"
							style={{
								fontFamily: "'Tiro Devanagari Hindi', serif",
								color: "rgb(240, 192, 64)",
							}}
						>
							{pickProductSubtitle(product.name, lang)}
						</div>
						<p
							className="text-sm font-light leading-loose mb-6"
							style={{
								fontFamily: "'Mukta', sans-serif",
								color: skin.bodyMuted,
							}}
						>
							{pickLocalized(product.fullDesc, lang)}
						</p>
						<div className="grid grid-cols-2 gap-2 mb-8">
							{product.details.map((d, i) => {
								const [dk, dv] = pickDetailPair(d, lang);
								return (
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
											{dk}
										</div>
										<div
											className="text-sm font-bold"
											style={{
												fontFamily: "'Mukta', sans-serif",
												color: "#1A0A00",
											}}
										>
											{dv}
										</div>
									</div>
								);
							})}
						</div>
						<div
							className="flex flex-wrap items-center justify-between gap-4 p-4 mb-8"
							style={{ background: "#F7EDD8", border: "1px solid #EDD8B0" }}
						>
							<div
								className="font-rozha text-4xl"
								style={{
									fontFamily: "'Comic Sans', serif",
									color: "rgb(240, 192, 64)",
								}}
							>
								₹{product.price}
							</div>
							<div
								className="text-xs text-right font-light max-w-[200px]"
								style={{
									fontFamily: "'Mukta', sans-serif",
									color: "rgb(240, 192, 64)",
								}}
							>
								{pickLocalized(product.priceNote, lang)}
							</div>
						</div>
						<div className="flex flex-wrap gap-3 mb-6">
							{canNativeShare && (
								<motion.button
									type="button"
									whileHover={{ y: -1 }}
									onClick={shareNative}
									className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider"
									style={{
										fontFamily: "'Mukta', sans-serif",
										border: "2px solid rgba(247,237,216,0.35)",
										color: "#F7EDD8",
									}}
								>
									<Share2 size={16} />
									{pp.shareNative}
								</motion.button>
							)}
							<motion.button
								type="button"
								whileHover={{ y: -1 }}
								onClick={copyPageUrl}
								className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider"
								style={{
									fontFamily: "'Mukta', sans-serif",
									border: "2px solid rgba(247,237,216,0.35)",
									color: "#F7EDD8",
								}}
							>
								<Copy size={16} />
								{pp.copyLink}
							</motion.button>
						</div>
						<div className="flex flex-col sm:flex-row gap-3">
							<motion.button
								type="button"
								whileHover={{ y: -1 }}
								whileTap={{ scale: 0.98 }}
								onClick={() => openOrder(product.id)}
								className="flex-1 py-3.5 text-sm font-bold uppercase tracking-wider text-white"
								style={{
									fontFamily: "'Mukta', sans-serif",
									background: "rgb(240, 192, 64)",
									borderBottom: "3px solid #FFFFFF",
								}}
							>
								{pp.orderNow}
							</motion.button>
							<motion.button
								type="button"
								whileHover={{ y: -1 }}
								whileTap={{ scale: 0.98 }}
								onClick={() => openOrder()}
								className="flex-1 py-3.5 text-sm font-bold uppercase tracking-wider"
								style={{
									fontFamily: "'Mukta', sans-serif",
									color: "#F7EDD8",
									border: "2px solid rgba(247,237,216,0.4)",
								}}
							>
								{t.pmCustom}
							</motion.button>
						</div>
					</FadeInSection>
				</section>
				<RangoliBorder />
				<section className="py-16 px-6" style={{ background: skin.sectionBg }}>
					<div className="max-w-7xl mx-auto">
						<FadeInSection>
							<h2
								className="font-rozha text-2xl md:text-3xl mb-8 text-center"
								style={{
									fontFamily: "'Comic Sans', serif",
									color: skin.headingOnDark,
								}}
							>
								{pp.similar}
							</h2>
						</FadeInSection>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
							{similar.map((p, i) => (
								<FadeInSection key={p.id} delay={i * 0.06}>
									<ProductCard product={p} lang={lang} t={t} />
								</FadeInSection>
							))}
						</div>
					</div>
				</section>
				<RangoliBorder teal />
				<FAQ t={t} />
				<Footer lang={lang} t={t} onOrder={() => openOrder()} />
			</div>
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

// ── ROOT APP ──
export default function WoolcraftHomePage() {
	const [lang, setLang] = useState("en");
	const [orderModal, setOrderModal] = useState(false);
	const [orderPreselect, setOrderPreselect] = useState(-1);
	const { theme } = useWoolcraftTheme();
	const skin = marketingSkin(theme);

	const t = T[lang] ?? T.en;

	const openOrder = (preselect) => {
		if (preselect !== undefined) setOrderPreselect(preselect);
		else setOrderPreselect(-1);
		setOrderModal(true);
	};
	const closeOrder = () => setOrderModal(false);

	useEffect(() => {
		document.body.style.overflow = orderModal ? "hidden" : "";
	}, [orderModal]);

	return (
		<div
			className="font-mukta"
			style={{
				fontFamily: "'Mukta', sans-serif",
				background: skin.pageBg,
			}}
		>
			<Head>
				<title>woolcraft — Handmade wool art from Kota, Rajasthan</title>
				<meta
					name="description"
					content="Handcrafted wool flowers, petals, gift boxes and bouquets — made by hand in Kota. Order on WhatsApp, ships pan-India."
				/>
				<link rel="canonical" href={`${getSiteUrl()}/`} />
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
				<Hero lang={lang} t={t} onOrder={() => openOrder()} />
				<RangoliBorder />
				<SareeStrip lang={lang} t={t} />
				<RangoliBorder teal />
				<Products lang={lang} t={t} />
				<RangoliBorder />
				<Story lang={lang} t={t} />
				<RangoliBorder teal />
				<Gallery lang={lang} t={t} />
				<RangoliBorder />
				<OrderCTA lang={lang} t={t} onOrder={() => openOrder()} />
				<RangoliBorder teal />
				<FAQ t={t} />
				<Footer lang={lang} t={t} onOrder={() => openOrder()} />
			</div>

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

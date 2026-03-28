/**
 * Visual tokens for woolcraft marketing (light/dark + accent palette).
 * Accent changes brand color only; light/dark is separate (theme toggle).
 */

export const WC_ACCENT_IDS = [
	"yellow",
	"blue",
	"zinc",
	"orange",
	"green",
	"pink",
	"red",
];

/** UI labels + solid swatch for the header picker */
export const WC_ACCENT_OPTIONS = [
	{ id: "yellow", label: "Yellow", swatch: "#f0c040" },
	{ id: "blue", label: "Blue", swatch: "#2563eb" },
	{ id: "zinc", label: "Zinc", swatch: "#52525b" },
	{ id: "orange", label: "Orange", swatch: "#ea580c" },
	{ id: "green", label: "Green", swatch: "#059669" },
	{ id: "pink", label: "Pink", swatch: "#db2777" },
	{ id: "red", label: "Red", swatch: "#dc2626" },
];

const PALETTES = {
	yellow: {
		rgb: "240, 192, 64",
		lightHeading: "#b45309",
		lightOnAccent: "#1c1917",
	},
	blue: {
		rgb: "37, 99, 235",
		lightHeading: "#1d4ed8",
		lightOnAccent: "#ffffff",
	},
	zinc: {
		rgb: "82, 82, 91",
		lightHeading: "#3f3f46",
		lightOnAccent: "#fafafa",
	},
	orange: {
		rgb: "234, 88, 12",
		lightHeading: "#c2410c",
		lightOnAccent: "#ffffff",
	},
	green: {
		rgb: "5, 150, 105",
		lightHeading: "#047857",
		lightOnAccent: "#ffffff",
	},
	pink: {
		rgb: "219, 39, 119",
		lightHeading: "#be185d",
		lightOnAccent: "#ffffff",
	},
	red: {
		rgb: "220, 38, 38",
		lightHeading: "#b91c1c",
		lightOnAccent: "#ffffff",
	},
};

function paletteOrDefault(accentId) {
	const id =
		accentId && PALETTES[accentId] ? accentId : WC_ACCENT_IDS[0];
	return { id, ...PALETTES[id] };
}

/** @param {"light"|"dark"} theme
 *  @param {string} [accentId]
 */
export function marketingSkin(theme, accentId = "yellow") {
	const isLight = theme === "light";
	const p = paletteOrDefault(accentId);
	const accent = `rgb(${p.rgb})`;

	return {
		accent,
		accentMuted: isLight ? p.lightHeading : accent,
		pageBg: isLight ? "#FAF6ED" : "#000000",
		sectionBg: isLight ? "#FAF6ED" : "#000000",
		footerBg: isLight ? "#EDE6D6" : "#000000",
		footerBarBg: isLight ? "#E5DCC8" : "#000000",
		heroTitle: isLight ? "#1c1917" : "#F7EDD8",
		heroSub: isLight ? "rgba(28,25,23,0.78)" : "rgba(247,237,216,0.72)",
		heroHindi: isLight ? p.lightHeading : accent,
		heroTag: isLight ? p.lightHeading : accent,
		navLangBar: isLight ? "#292524" : "#18181b",
		navMain: isLight ? "#1c1917" : "#18181b",
		navCream: "#F7EDD8",
		navLinkMuted: "rgba(247,237,216,0.75)",
		headingOnDark: isLight ? "#1c1917" : "#FFFFFF",
		headingGold: isLight ? p.lightHeading : accent,
		bodyMuted: isLight ? "#57534e" : "rgba(247,237,216,0.68)",
		faqHeading: isLight ? "#1c1917" : "#ffffff",
		faqSub: isLight ? "#57534e" : accent,
		faqQ: isLight ? "#1c1917" : "#ffffff",
		footerMuted: isLight ? "rgba(28,25,23,0.78)" : "rgba(247,237,216,0.42)",
		footerCopyright: isLight ? "rgba(28,25,23,0.55)" : "rgba(247,237,216,0.22)",
		orderCtaSection: isLight ? "#e7dfd0" : undefined,
		/** Wordmark on footer (cream bg in light → dark text) */
		footerWordmark: isLight ? "#1c1917" : "#F7EDD8",
		footerAccent: accent,
		footerSocialBorder: isLight
			? "rgba(28,25,23,0.22)"
			: "rgba(247,237,216,0.15)",
		footerSocialFg: isLight ? "rgba(28,25,23,0.5)" : "rgba(247,237,216,0.38)",
		/** Modal header sits on white — always dark text */
		modalTitle: "#1c1917",
		modalSubtitle: "rgba(28,25,23,0.62)",
		modalClose: accent,
		/** Outline / ghost controls on light section backgrounds */
		ghostOnLightFg: "#1c1917",
		ghostOnLightBorder: "rgba(28,25,23,0.35)",
		ghostOnLightHoverBg: "rgba(28,25,23,0.06)",
		/** Filled CTA (hero, product order, nav pill on dark bar) */
		ctaFilledBg: accent,
		ctaFilledFg: isLight ? p.lightOnAccent : "#ffffff",
		/** Nav bar is always dark — order button text */
		ctaOnDarkNavFg: "#ffffff",
		/** Product card body (cream panel) */
		cardTitleOnCream: "#1c1917",
		cardAccentText: accent,
		cardBottomBorder: accent,
		/** Primary hero CTA bottom border */
		ctaFilledBorderBottom: isLight ? "rgba(28,25,23,0.25)" : "#ffffff",
		/** Trust strip / solid accent band (yellow needs dark text) */
		onAccentBandFg: p.id === "yellow" ? "#1c1917" : "#ffffff",
	};
}

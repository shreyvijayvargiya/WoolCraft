/** Visual tokens for woolcraft marketing pages (dark = current brand; light = warm paper). */
export function marketingSkin(theme) {
	const isLight = theme === "light";
	return {
		pageBg: isLight ? "#FAF6ED" : "#000000",
		sectionBg: isLight ? "#FAF6ED" : "#000000",
		footerBg: isLight ? "#EDE6D6" : "#000000",
		footerBarBg: isLight ? "#E5DCC8" : "#000000",
		heroTitle: isLight ? "#1c1917" : "#F7EDD8",
		heroSub: isLight ? "rgba(28,25,23,0.78)" : "rgba(247,237,216,0.72)",
		heroHindi: isLight ? "#b45309" : "#F0C040",
		heroTag: isLight ? "#b45309" : "#F0C040",
		navLangBar: isLight ? "#292524" : "#18181b",
		navMain: isLight ? "#1c1917" : "#18181b",
		headingOnDark: isLight ? "#1c1917" : "#FFFFFF",
		headingGold: isLight ? "#b45309" : "rgb(240, 192, 64)",
		bodyMuted: isLight ? "#57534e" : "rgba(247,237,216,0.68)",
		faqHeading: isLight ? "#1c1917" : "#ffffff",
		faqSub: isLight ? "#57534e" : "rgb(240, 192, 64)",
		faqQ: isLight ? "#1c1917" : "#ffffff",
		footerMuted: isLight ? "rgba(28,25,23,0.55)" : "rgba(247,237,216,0.42)",
		footerCopyright: isLight ? "rgba(28,25,23,0.35)" : "rgba(247,237,216,0.22)",
		orderCtaSection: isLight ? "#e7dfd0" : undefined, // use string for bg-zinc-900 replacement
	};
}

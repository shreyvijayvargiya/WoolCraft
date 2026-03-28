import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

import { WC_ACCENT_IDS } from "../lib/woolcraft-marketing-skin";

const WoolcraftThemeContext = createContext(null);
const STORAGE_THEME = "woolcraft-theme";
const STORAGE_ACCENT = "woolcraft-accent";

function normalizeAccent(v) {
	return WC_ACCENT_IDS.includes(v) ? v : WC_ACCENT_IDS[0];
}

export function WoolcraftThemeProvider({ children }) {
	const [theme, setThemeState] = useState("dark");
	const [accentPalette, setAccentState] = useState("yellow");
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		try {
			const savedT = localStorage.getItem(STORAGE_THEME);
			if (savedT === "light" || savedT === "dark") setThemeState(savedT);
			const savedA = localStorage.getItem(STORAGE_ACCENT);
			if (savedA) setAccentState(normalizeAccent(savedA));
		} catch {
			/* ignore */
		}
		setMounted(true);
	}, []);

	useEffect(() => {
		if (!mounted || typeof document === "undefined") return;
		try {
			localStorage.setItem(STORAGE_THEME, theme);
		} catch {
			/* ignore */
		}
		document.documentElement.setAttribute("data-wc-theme", theme);
	}, [theme, mounted]);

	useEffect(() => {
		if (!mounted || typeof document === "undefined") return;
		try {
			localStorage.setItem(STORAGE_ACCENT, accentPalette);
		} catch {
			/* ignore */
		}
		document.documentElement.setAttribute("data-wc-accent", accentPalette);
	}, [accentPalette, mounted]);

	const setTheme = useCallback((t) => {
		if (t === "light" || t === "dark") setThemeState(t);
	}, []);

	const toggleTheme = useCallback(() => {
		setThemeState((t) => (t === "dark" ? "light" : "dark"));
	}, []);

	const setAccentPalette = useCallback((id) => {
		setAccentState(normalizeAccent(id));
	}, []);

	const value = useMemo(
		() => ({
			theme,
			setTheme,
			toggleTheme,
			accentPalette,
			setAccentPalette,
		}),
		[theme, setTheme, toggleTheme, accentPalette, setAccentPalette],
	);

	return (
		<WoolcraftThemeContext.Provider value={value}>
			{children}
		</WoolcraftThemeContext.Provider>
	);
}

export function useWoolcraftTheme() {
	const ctx = useContext(WoolcraftThemeContext);
	if (!ctx) {
		throw new Error(
			"useWoolcraftTheme must be used within WoolcraftThemeProvider",
		);
	}
	return ctx;
}

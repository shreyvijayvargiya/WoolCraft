import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

const WoolcraftThemeContext = createContext(null);
const STORAGE_KEY = "woolcraft-theme";

export function WoolcraftThemeProvider({ children }) {
	const [theme, setThemeState] = useState("dark");
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			if (saved === "light" || saved === "dark") setThemeState(saved);
		} catch {
			/* ignore */
		}
		setMounted(true);
	}, []);

	useEffect(() => {
		if (!mounted || typeof document === "undefined") return;
		try {
			localStorage.setItem(STORAGE_KEY, theme);
		} catch {
			/* ignore */
		}
		document.documentElement.setAttribute("data-wc-theme", theme);
	}, [theme, mounted]);

	const setTheme = useCallback((t) => {
		if (t === "light" || t === "dark") setThemeState(t);
	}, []);

	const toggleTheme = useCallback(() => {
		setThemeState((t) => (t === "dark" ? "light" : "dark"));
	}, []);

	const value = useMemo(
		() => ({ theme, setTheme, toggleTheme }),
		[theme, setTheme, toggleTheme],
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

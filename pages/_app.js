import React from "react";
import { Analytics } from "@vercel/analytics/react";
import { WoolcraftThemeProvider } from "../contexts/WoolcraftThemeContext";
import "../styles/globals.css";
import { Toaster } from "sonner";

export default function App({ Component, pageProps }) {
	return (
		<WoolcraftThemeProvider>
			<Analytics />
			<Toaster position="top-center" richColors closeButton />
			<Component {...pageProps} />
		</WoolcraftThemeProvider>
	);
}

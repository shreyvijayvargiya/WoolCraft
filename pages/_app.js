import React from "react";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";
import { WoolcraftThemeProvider } from "../contexts/WoolcraftThemeContext";
import "../styles/globals.css";
import { Toaster } from "sonner";

export default function App({ Component, pageProps }) {
	return (
		<WoolcraftThemeProvider>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<title>WoolCraft</title>
				<meta name="description" content="WoolCraft" />
			</Head>
			<Analytics />
			<Toaster position="top-center" richColors closeButton />
			<Component {...pageProps} />
		</WoolcraftThemeProvider>
	);
}

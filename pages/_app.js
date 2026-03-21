import React from "react";
import { Analytics } from "@vercel/analytics/react";
import "../styles/globals.css";
import { Toaster } from "sonner";

export default function App({ Component, pageProps }) {
	return (
		<>
			<Analytics />
			<Toaster position="top-center" richColors closeButton />
			<Component {...pageProps} />
		</>
	);
}

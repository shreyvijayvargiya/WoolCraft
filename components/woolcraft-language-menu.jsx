import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Globe } from "lucide-react";

import { LANG_LABELS, SUPPORTED_LANGS } from "../lib/woolcraft-data";

/** Replaces native <select>; compact on narrow widths. */
export function WoolcraftLanguageMenu({ lang, setLang, theme }) {
	const [open, setOpen] = useState(false);
	const ref = useRef(null);
	const listId = useId();
	const isLight = theme === "light";

	useEffect(() => {
		if (!open) return;
		const onDoc = (e) => {
			if (ref.current && !ref.current.contains(e.target)) setOpen(false);
		};
		const onKey = (e) => {
			if (e.key === "Escape") setOpen(false);
		};
		document.addEventListener("mousedown", onDoc);
		document.addEventListener("keydown", onKey);
		return () => {
			document.removeEventListener("mousedown", onDoc);
			document.removeEventListener("keydown", onKey);
		};
	}, [open]);

	const triggerStyle = {
		border: isLight
			? "1px solid rgba(28,25,23,0.2)"
			: "1px solid rgba(247,237,216,0.25)",
		background: isLight ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.25)",
		color: isLight ? "#1c1917" : "#F7EDD8",
	};

	const panelStyle = {
		border: isLight
			? "1px solid rgba(28,25,23,0.12)"
			: "1px solid rgba(255,255,255,0.12)",
		background: isLight ? "rgba(255,252,245,0.98)" : "rgba(24,24,27,0.98)",
		backdropFilter: "blur(10px)",
		boxShadow: isLight
			? "0 12px 40px rgba(28,25,23,0.12)"
			: "0 12px 40px rgba(0,0,0,0.45)",
	};

	const label = LANG_LABELS[lang] ?? lang;
	const shortCode = lang.toUpperCase();

	return (
		<div className="relative max-w-[min(100%,11rem)] sm:max-w-[13rem]" ref={ref}>
			<motion.button
				type="button"
				whileTap={{ scale: 0.98 }}
				onClick={() => setOpen((o) => !o)}
				className="flex items-center gap-1 min-h-8 w-full max-w-full justify-between rounded-sm px-1.5 sm:px-2 py-1 text-left"
				style={triggerStyle}
				aria-haspopup="listbox"
				aria-expanded={open}
				aria-controls={listId}
				aria-label={`Language: ${label}`}
			>
				<Globe size={13} className="flex-shrink-0 opacity-90 sm:w-[14px] sm:h-[14px]" />
				<span className="min-w-0 flex-1 truncate text-[10px] font-bold uppercase tracking-wide sm:text-xs sm:normal-case sm:tracking-normal sm:font-bold">
					<span className="sm:hidden">{shortCode}</span>
					<span className="hidden sm:inline">{label}</span>
				</span>
				<motion.span
					animate={{ rotate: open ? 180 : 0 }}
					transition={{ duration: 0.2 }}
					className="inline-flex flex-shrink-0"
					aria-hidden
				>
					<ChevronDown size={13} className="opacity-80 sm:w-[14px] sm:h-[14px]" />
				</motion.span>
			</motion.button>
			<AnimatePresence initial={false}>
				{open && (
					<motion.ul
						id={listId}
						role="listbox"
						initial={{ opacity: 0, y: -6, scale: 0.98 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: -4, scale: 0.98 }}
						transition={{ duration: 0.18, ease: "easeOut" }}
						className="absolute right-0 top-[calc(100%+5px)] z-[70] max-h-[min(70vh,280px)] w-[min(calc(100vw-2rem),14rem)] overflow-auto rounded-md py-1 sm:w-52"
						style={panelStyle}
					>
						{SUPPORTED_LANGS.map((code) => {
							const active = code === lang;
							const optLabel = LANG_LABELS[code] ?? code;
							return (
								<li key={code} role="presentation">
									<button
										type="button"
										role="option"
										aria-selected={active}
										className="flex w-full items-center justify-between gap-2 px-2.5 py-2 text-left text-[11px] font-semibold transition-colors sm:px-3 sm:text-xs"
										style={{
											color: active
												? isLight
													? "#92400e"
													: "#F7EDD8"
												: isLight
													? "#292524"
													: "#e4e4e7",
											background: active
												? isLight
													? "rgba(251,191,36,0.2)"
													: "rgba(255,255,255,0.08)"
												: "transparent",
										}}
										onClick={() => {
											setLang(code);
											setOpen(false);
										}}
									>
										<span className="min-w-0 truncate">{optLabel}</span>
										{active ? (
											<Check size={14} className="flex-shrink-0 opacity-90" />
										) : (
											<span className="w-3.5 flex-shrink-0" aria-hidden />
										)}
									</button>
								</li>
							);
						})}
					</motion.ul>
				)}
			</AnimatePresence>
		</div>
	);
}

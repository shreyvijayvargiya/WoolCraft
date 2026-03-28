import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";

import { LANG_LABELS, SUPPORTED_LANGS } from "@/lib/woolcraft-data";
import { cn } from "@/lib/utils";

type ThemeMode = "light" | "dark";

export function WoolcraftLanguageMenu({
	lang,
	setLang,
	theme,
}: {
	lang: string;
	setLang: (code: string) => void;
	theme: ThemeMode;
}) {
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const listId = useId();

	useEffect(() => {
		if (!open) return;
		const onDoc = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setOpen(false);
			}
		};
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") setOpen(false);
		};
		document.addEventListener("mousedown", onDoc);
		document.addEventListener("keydown", onKey);
		return () => {
			document.removeEventListener("mousedown", onDoc);
			document.removeEventListener("keydown", onKey);
		};
	}, [open]);

	const isLight = theme === "light";
	const triggerStyle: React.CSSProperties = {
		fontFamily: "'Mukta', sans-serif",
		letterSpacing: "0.06em",
		border: isLight
			? "1px solid rgba(28,25,23,0.2)"
			: "1px solid rgba(247,237,216,0.25)",
		background: isLight ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.25)",
		color: isLight ? "#1c1917" : "#F7EDD8",
	};

	const panelStyle: React.CSSProperties = {
		fontFamily: "'Mukta', sans-serif",
		border: isLight
			? "1px solid rgba(28,25,23,0.12)"
			: "1px solid rgba(255,255,255,0.12)",
		background: isLight ? "rgba(255,252,245,0.98)" : "rgba(24,24,27,0.98)",
		backdropFilter: "blur(10px)",
		boxShadow: isLight
			? "0 12px 40px rgba(28,25,23,0.12)"
			: "0 12px 40px rgba(0,0,0,0.45)",
	};

	return (
		<div className="relative" ref={ref}>
			<motion.button
				type="button"
				whileTap={{ scale: 0.98 }}
				onClick={() => setOpen((o) => !o)}
				className="flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-sm max-w-[180px] min-w-0"
				style={triggerStyle}
				aria-haspopup="listbox"
				aria-expanded={open}
				aria-controls={listId}
				aria-label="Choose language"
			>
				<span className="truncate min-w-0 flex-1 text-left">
					{LANG_LABELS[lang as keyof typeof LANG_LABELS] ?? lang}
				</span>
				<motion.span
					animate={{ rotate: open ? 180 : 0 }}
					transition={{ duration: 0.22, ease: "easeOut" }}
					className="flex-shrink-0 inline-flex"
					aria-hidden
				>
					<ChevronDown size={14} className="opacity-80" />
				</motion.span>
			</motion.button>
			<AnimatePresence initial={false}>
				{open && (
					<motion.ul
						id={listId}
						role="listbox"
						aria-activedescendant={lang}
						initial={{ opacity: 0, y: -8, scale: 0.98 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: -6, scale: 0.98 }}
						transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
						className="absolute right-0 top-[calc(100%+6px)] z-[60] min-w-[168px] max-h-[min(70vh,320px)] overflow-auto rounded-md py-1"
						style={panelStyle}
					>
						{SUPPORTED_LANGS.map((code) => {
							const active = code === lang;
							const label =
								LANG_LABELS[code as keyof typeof LANG_LABELS] ?? code;
							return (
								<li key={code} role="presentation">
									<button
										type="button"
										role="option"
										aria-selected={active}
										id={`${listId}-opt-${code}`}
										className={cn(
											"flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-xs font-semibold transition-colors",
											active
												? isLight
													? "bg-amber-100/90 text-amber-950"
													: "bg-white/10 text-[#F7EDD8]"
												: isLight
													? "text-stone-800 hover:bg-stone-100/90"
													: "text-zinc-200 hover:bg-white/6",
										)}
										onClick={() => {
											setLang(code);
											setOpen(false);
										}}
									>
										<span>{label}</span>
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

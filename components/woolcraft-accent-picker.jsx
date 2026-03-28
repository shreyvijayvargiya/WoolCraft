import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Palette } from "lucide-react";

import { useWoolcraftTheme } from "../contexts/WoolcraftThemeContext";
import { WC_ACCENT_OPTIONS } from "../lib/woolcraft-marketing-skin";

/** Accent = brand color only (not light/dark). Sits next to theme toggle. */
export function WoolcraftAccentPicker({ theme }) {
	const { accentPalette, setAccentPalette } = useWoolcraftTheme();
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

	const current = WC_ACCENT_OPTIONS.find((o) => o.id === accentPalette);
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

	return (
		<div className="relative flex-shrink-0" ref={ref}>
			<motion.button
				type="button"
				whileTap={{ scale: 0.98 }}
				onClick={() => setOpen((o) => !o)}
				className="flex min-h-8 items-center justify-center gap-1 rounded-sm px-1.5 py-1 text-xs font-bold sm:gap-1.5 sm:px-2"
				style={triggerStyle}
				aria-haspopup="listbox"
				aria-expanded={open}
				aria-controls={listId}
				aria-label="Choose accent color"
			>
				<Palette
					size={14}
					className="hidden flex-shrink-0 opacity-90 sm:block"
				/>
				<span
					className="h-3.5 w-3.5 flex-shrink-0 rounded-full border sm:h-4 sm:w-4"
					style={{
						background: current?.swatch ?? "#f0c040",
						borderColor: isLight ? "rgba(28,25,23,0.25)" : "rgba(255,255,255,0.35)",
					}}
					aria-hidden
				/>
				<motion.span
					animate={{ rotate: open ? 180 : 0 }}
					transition={{ duration: 0.2 }}
					className="inline-flex"
					aria-hidden
				>
					<ChevronDown size={13} className="opacity-80 sm:h-[14px] sm:w-[14px]" />
				</motion.span>
			</motion.button>
			<AnimatePresence initial={false}>
				{open && (
					<motion.div
						id={listId}
						role="listbox"
						aria-label="Accent colors"
						initial={{ opacity: 0, y: -8, scale: 0.98 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: -6, scale: 0.98 }}
						transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
						className="absolute right-0 top-[calc(100%+6px)] z-[60] grid w-[min(calc(100vw-2rem),11rem)] grid-cols-4 gap-1.5 rounded-lg p-2 sm:min-w-[168px] sm:w-auto max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2"
						style={panelStyle}
					>
						{WC_ACCENT_OPTIONS.map((opt) => {
							const active = opt.id === accentPalette;
							return (
								<button
									key={opt.id}
									type="button"
									role="option"
									aria-selected={active}
									title={opt.label}
									onClick={() => {
										setAccentPalette(opt.id);
										setOpen(false);
									}}
									className="relative h-9 w-9 rounded-md border-2 flex items-center justify-center transition-transform hover:scale-105"
									style={{
										background: opt.swatch,
										borderColor: active
											? isLight
												? "#1c1917"
												: "#fff"
											: "transparent",
										boxShadow: active
											? "0 0 0 1px rgba(0,0,0,0.08)"
											: undefined,
									}}
								>
									{active && (
										<Check
											size={16}
											className="drop-shadow-sm"
											style={{
												color:
													opt.id === "yellow" ? "#1c1917" : "#ffffff",
												strokeWidth: 2.5,
											}}
										/>
									)}
								</button>
							);
						})}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

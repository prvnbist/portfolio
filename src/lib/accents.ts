/**
 * The rotating card accents. Full class names are spelled out so Tailwind's scanner sees them.
 */
export const ACCENTS = [
	{
		text: 'text-yellow-400',
		hover: 'hover:text-yellow-400',
		glow: 'bg-yellow-400/20',
		dot: 'bg-yellow-400',
	},
	{
		text: 'text-pink-400',
		hover: 'hover:text-pink-400',
		glow: 'bg-pink-400/20',
		dot: 'bg-pink-400',
	},
	{
		text: 'text-sky-400',
		hover: 'hover:text-sky-400',
		glow: 'bg-sky-400/20',
		dot: 'bg-sky-400',
	},
	{
		text: 'text-emerald-400',
		hover: 'hover:text-emerald-400',
		glow: 'bg-emerald-400/20',
		dot: 'bg-emerald-400',
	},
] as const

export type Accent = (typeof ACCENTS)[number]

/** The accent for the nth card, cycling through ACCENTS. */
export const accentAt = (index: number): Accent => ACCENTS[index % ACCENTS.length]

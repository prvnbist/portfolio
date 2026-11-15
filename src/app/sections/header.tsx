import { motion } from 'framer-motion'

import { Button, LinkPreview } from '@/components'

const EASE = [0.22, 1, 0.36, 1] as const

const fadeUp = (delay = 0) => ({
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.6, delay, ease: EASE },
})

const word = {
	hidden: { opacity: 0, y: 24, filter: 'blur(12px)' },
	show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: EASE } },
}

const BLOBS = [
	{
		color: 'bg-yellow-400/12',
		pos: 'top-[15%] left-[18%]',
		x: [0, 80, -40, 0],
		y: [0, -50, 40, 0],
	},
	{
		color: 'bg-pink-500/12',
		pos: 'top-[30%] right-[15%]',
		x: [0, -70, 50, 0],
		y: [0, 60, -30, 0],
	},
	{
		color: 'bg-sky-500/10',
		pos: 'bottom-[10%] left-[40%]',
		x: [0, 60, -60, 0],
		y: [0, -40, 30, 0],
	},
]

const Words = ({ children, className }: { children: string; className?: string }) => (
	<>
		{children.split(' ').map((w, i) => (
			<motion.span
				key={`${w}-${i}`}
				variants={word}
				className={`inline-block font-[inherit] ${className ?? ''}`}
			>
				{w}&nbsp;
			</motion.span>
		))}
	</>
)

export default function Header() {
	return (
		<header className="relative">
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 overflow-hidden mask-[linear-gradient(to_bottom,black_55%,transparent)]"
			>
				<div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[56px_56px] mask-[radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
				{BLOBS.map(blob => (
					<motion.span
						key={blob.pos}
						animate={{ x: blob.x, y: blob.y }}
						transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
						className={`absolute h-80 w-80 rounded-full blur-3xl ${blob.color} ${blob.pos}`}
					/>
				))}
				<div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-dark-400" />
			</div>

			<div className="relative mx-auto flex w-full flex-col items-center px-4 pt-48 pb-28 text-center lg:w-230">
				<motion.h1
					initial="hidden"
					animate="show"
					transition={{ staggerChildren: 0.06, delayChildren: 0.2 }}
					variants={{
						hidden: {},
						show: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } },
					}}
					className="max-w-184 font-stack text-4xl leading-[1.35] font-medium text-white md:text-[44px]"
				>
					<Words>Hey</Words>
					<motion.span
						variants={word}
						className="ml-[-0.3em] mr-1 inline-block origin-[70%_70%]"
					>
						<motion.span
							animate={{ rotate: [0, 18, -8, 14, 0] }}
							transition={{ duration: 1.6, delay: 1.2, ease: 'easeInOut' }}
							className="inline-block text-4xl"
						>
							👋🏽
						</motion.span>
						,&nbsp;
					</motion.span>
					<Words>I am an</Words>
					<Words className="bg-linear-to-r from-[#f6d365] to-[#fda085] bg-clip-text text-transparent">
						AI Engineer
					</Words>
					<Words>specializing in front-end building all things</Words>
					<motion.span variants={word} className="inline-block font-[inherit]">
						<LinkPreview
							href="https://justcall.io/product/send-and-receive-sms/"
							image="/images/justcall-sms-og.webp"
						>
							SMS<span className="text-4xl">💬</span>
						</LinkPreview>
						&nbsp;
					</motion.span>
					<Words>at</Words>
					<motion.span variants={word} className="inline-block font-[inherit]">
						<LinkPreview href="https://justcall.io" image="/images/justcall-og.png">
							JustCall
							<img
								src="/images/jc-logo.svg"
								alt=""
								aria-hidden="true"
								className="ml-1 inline-block h-[0.8em] w-auto align-baseline"
							/>
						</LinkPreview>
					</motion.span>
				</motion.h1>

				<motion.div {...fadeUp(1.1)} className="mt-12">
					<Button.Cta href="mailto:prvnbist@gmail.com">Get in touch</Button.Cta>
				</motion.div>
			</div>
		</header>
	)
}

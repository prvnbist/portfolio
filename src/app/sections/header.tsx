import { motion } from 'framer-motion'

import { Button, LinkPreview } from '@/components'

const ANIMATE_PROPS = {
	initial: { opacity: 0, y: 20 },
	whileInView: { opacity: 1, y: 0 },
	transition: { duration: 0.5 },
	viewport: { once: true },
}

export default function Header() {
	return (
		<header>
			<div className="mx-auto flex w-full flex-col items-center px-4 pt-52 pb-48 text-center lg:w-230">
				<motion.p
					{...ANIMATE_PROPS}
					className="font-inter text-xs font-semibold uppercase text-[#373745]"
				>
					Noida, India
				</motion.p>
				<motion.span
					{...ANIMATE_PROPS}
					aria-hidden="true"
					className="my-3 block w-5 h-px bg-zinc-900"
				/>
				<motion.h1
					{...ANIMATE_PROPS}
					className="max-w-184 font-stack text-[32px] leading-normal font-medium text-white"
				>
					Hey👋🏽, I am an AI Engineer specializing in front-end building all things{' '}
					<LinkPreview
						href="https://justcall.io/product/send-and-receive-sms/"
						image="/images/justcall-sms-og.webp"
					>
						SMS💬
					</LinkPreview>{' '}
					at{' '}
					<LinkPreview href="https://justcall.io" image="/images/justcall-og.png">
						JustCall
					</LinkPreview>
				</motion.h1>
				<motion.div {...ANIMATE_PROPS} className="mt-11">
					<Button.Cta href="mailto:prvnbist@gmail.com">Get in touch</Button.Cta>
				</motion.div>
			</div>
		</header>
	)
}

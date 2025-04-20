export { metadata } from '@/seo'
import { cn } from '@/utils/cn'

import GitHub from '@/assets/logos/Github'
import Instagram from '@/assets/logos/Instagram'
import LinkedIn from '@/assets/logos/LinkedIn'
import X from '@/assets/logos/X'
import YouTube from '@/assets/logos/Youtube'

const SOCIALS = [
	{
		title: 'Github',
		icon: <GitHub />,
		url: 'https://github.com/prvnbist',
	},
	{
		title: 'LinkedIn',
		icon: <LinkedIn />,
		url: 'https://www.linkedin.com/in/prvnbist',
	},
	{
		title: 'X',
		icon: <X />,
		url: 'https://x.com/prvnbist',
	},
	{
		title: 'YouTube',
		icon: <YouTube />,
		url: 'https://www.youtube.com/prvnbist',
	},
	{
		title: 'Instagram',
		icon: <Instagram />,
		url: 'https://www.instagram.com/prvnbist',
	},
]

export default function Home() {
	return (
		<div className="h-full grid place-content-center">
			<h2 className="text-center mb-3 font-medium font-serif text-3xl md:text-5xl">
				I design 🎨 & code 👨‍💻
			</h2>
			<p className="text-center mb-4 text-zinc-400 text-md md:text-lg w-full text-balance">
				Hi I'm Praveen Bisht — A frontend engineer based in Delhi, India building an AI call
				answering agent —{' '}
				<a
					href="https://serviceagent.ai"
					rel="noopener noreferrer"
					target="__blank"
					title="ServiceAgent.ai"
				>
					ServiceAgent.ai
				</a>{' '}
				at{' '}
				<a
					href="https://saaslabs.co"
					rel="noopener noreferrer"
					target="__blank"
					title="SaaSLabs.co"
				>
					SaaSLabs.co
				</a>
			</p>
			<div className="mx-auto flex flex-col justify-center items-center gap-4">
				<a
					className={cn(
						'px-3 h-10 rounded-md',
						'inline-flex items-center',
						'bg-yellow-300 !text-zinc-800',
						'font-medium font-serif text-sm',
						'hover:scale-105 transition-all duration-200 ease-[cubic-bezier(0.78,_0,_0.22,_1)]'
					)}
					href="mailto:prvnbist@gmail.com"
					rel="noopener noreferrer"
					target="__blank"
					title="Get In Touch"
				>
					Get In Touch
				</a>
				<ul className="w-fit flex items-center md:-space-x-3 group transition-all duration-200 ease-[cubic-bezier(0.78,_0,_0.22,_1)] md:hover:space-x-1">
					{SOCIALS.map((social, index) => (
						<li
							key={social.url}
							className={cn(
								'size-10 rounded-full bg-zinc-800',
								'box-content border-3 border-zinc-900',
								'transition-all duration-300 ease-[cubic-bezier(0.78,_0,_0.22,_1)] group-hover:rotate-0',
								index % 2 === 0 ? 'md:-rotate-12' : 'md:rotate-12'
							)}
						>
							<a
								href={social.url}
								rel="noopener noreferrer"
								target="__blank"
								title={social.title}
								className="size-10 grid place-items-center"
							>
								{social.icon}
							</a>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

import { Button } from '@/components'
import { buttonClass } from '@/components/Button'
import { Icon, type IconName, Reveal } from '@/components/ui'
import { EMAIL, GITHUB_URL, TWITTER_URL } from '@/config/site'
import { cn } from '@/utils'

const SOCIALS: { name: IconName; label: string; href: string }[] = [
	{ name: 'github', label: 'GitHub', href: GITHUB_URL },
	{ name: 'x', label: 'X', href: TWITTER_URL },
]

export default function Footer() {
	return (
		<footer aria-labelledby="contact" className="w-full">
			<div className="mx-auto w-full border-t border-line px-4 py-16 lg:w-230 lg:px-8">
				<Reveal className="flex flex-col items-center gap-5 text-center">
					<h2
						id="contact"
						className="bg-linear-to-r from-accent-from to-accent-to bg-clip-text font-stack text-4xl font-medium text-transparent"
					>
						Let's build something together
					</h2>
					<p className="max-w-md text-gray-400">
						Have a project, an idea or just want to say hi? My inbox is open.
					</p>
					<div className="mt-2 flex flex-wrap items-center justify-center gap-3">
						<Button href={`mailto:${EMAIL}`}>Get in touch</Button>
						{SOCIALS.map(({ name, label, href }) => (
							<a
								key={name}
								href={href}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={label}
								title={label}
								className={cn(buttonClass({ variant: 'secondary' }), 'w-12 min-w-0 px-0')}
							>
								<Icon name={name} />
							</a>
						))}
					</div>
				</Reveal>
			</div>
		</footer>
	)
}

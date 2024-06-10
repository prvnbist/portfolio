'use client'

import { motion } from 'framer-motion'

import { Button } from '@/components'

import classes from './design.module.css'

type Design = {
	id: string
	url: string
	title: string
	thumbnail: {
		id: string
		url: string
	}
	description: string
}

const ANIMATE_PROPS = {
	initial: { opacity: 0, y: 60 },
	whileInView: { opacity: 1, y: 0 },
	transition: { duration: 0.5 },
	viewport: { once: true },
}

export default function Project({ design }: { design: Design }) {
	return (
		<motion.li {...ANIMATE_PROPS} className={classes.project}>
			<header>
				<div>
					<img src={design.thumbnail.url} alt={design.title} />
				</div>
				<h3>{design.title}</h3>
			</header>
			<main>
				<p>{design.description}</p>
			</main>
			<footer>
				<a target="_blank" href={design.url} title={design.title} rel="noopener noreferrer">
					<Button.Text>View Project</Button.Text>
				</a>
			</footer>
		</motion.li>
	)
}

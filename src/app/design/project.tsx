import { motion } from 'framer-motion'

import { Button } from '@/components'
import type { Design } from '@/data/designs'

import classes from './design.module.css'

const ANIMATE_PROPS = {
	initial: { opacity: 0, y: 60 },
	whileInView: { opacity: 1, y: 0 },
	transition: { duration: 0.5 },
	viewport: { once: true },
}

export default function Project({ design }: { design: Design }) {
	return (
		<motion.li {...ANIMATE_PROPS} className={classes.project}>
			<div className={classes.head}>
				<div>
					<img src={design.thumbnail} alt={design.title} />
				</div>
				<h3>{design.title}</h3>
			</div>
			<div className={classes.body}>
				<p>{design.description}</p>
			</div>
			<div className={classes.foot}>
				<a target="_blank" href={design.url} title={design.title} rel="noopener noreferrer">
					<Button.Text>View Project</Button.Text>
				</a>
			</div>
		</motion.li>
	)
}

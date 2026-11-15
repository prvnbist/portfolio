import { Button } from '@/components'
import { Reveal } from '@/components/ui'
import type { Design } from '@/data/designs'

import classes from './design.module.css'

export default function Project({ design }: { design: Design }) {
	return (
		<Reveal as="li" y={60} className={classes.project}>
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
		</Reveal>
	)
}

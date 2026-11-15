import type { HTMLAttributes } from 'react'

import { cn } from '@/utils'

/** The centred page column used below every hero (full width on mobile, 920px on desktop). */
export const PageContainer = ({
	as: Tag = 'div',
	className,
	...props
}: HTMLAttributes<HTMLElement> & { as?: 'div' | 'section' | 'article' }) => (
	<Tag className={cn('mx-auto w-full px-4 lg:w-230 lg:px-8', className)} {...props} />
)

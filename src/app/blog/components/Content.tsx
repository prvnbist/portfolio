import type { MDXComponents } from 'mdx/types'
import { type ComponentProps, type ComponentType, isValidElement } from 'react'

import { CodeBlock } from '@/components'

type ContentProps = {
	Component: ComponentType<{ components?: MDXComponents }>
}

/** Fenced code: `highlight={[start, end]}` arrives as a prop via rehype-mdx-code-props. */
const Pre = ({
	children,
	highlight,
	...rest
}: ComponentProps<'pre'> & { highlight?: [number, number] }) =>
	isValidElement(children) ? (
		<CodeBlock highlight={highlight}>{children}</CodeBlock>
	) : (
		<pre {...rest}>{children}</pre>
	)

/**
 * Markdown images, loaded lazily and decoded off the main thread. Kept inline (no wrapper) because
 * markdown puts images inside a <p>; a title stays a native tooltip, as authored.
 */
const Figure = ({ alt = '', className, ...props }: ComponentProps<'img'>) => (
	<img
		{...props}
		alt={alt}
		loading="lazy"
		decoding="async"
		className="w-full rounded-md object-cover"
	/>
)

/** Tables scroll sideways on small screens; the region is focusable so keyboards can scroll it. */
const TableScroll = (props: ComponentProps<'table'>) => (
	// biome-ignore lint/a11y/noNoninteractiveTabindex: a scrollable region must be reachable by keyboard
	<section tabIndex={0} aria-label="Table" className="my-3 overflow-x-auto">
		<table {...props} className="table w-full border-collapse" />
	</section>
)

export const components: MDXComponents = {
	pre: Pre,
	h1: props => <h1 {...props} className="mt-5 mb-3 border-b border-gray-800 pb-3 text-4xl" />,
	h2: props => <h2 {...props} className="mt-5 mb-3 border-b border-gray-800 pb-3 text-3xl" />,
	h3: props => <h3 {...props} className="mt-5 mb-2 border-b border-gray-800 pb-3 text-2xl" />,
	h4: props => <h4 {...props} className="mt-5 mb-2 border-b border-gray-800 pb-3 text-xl" />,
	blockquote: props => <blockquote {...props} className="border-l-4 border-gray-700 pl-3" />,
	code: props => (
		<code
			{...props}
			className="inline-block rounded-sm border border-line bg-dark-400 px-2 text-sm text-zinc-300"
		/>
	),
	// Underlined so links in running text don't rely on colour alone (WCAG 1.4.1).
	a: props => (
		<a
			{...props}
			className="text-blue-500 underline decoration-blue-500/40 underline-offset-2 hover:text-blue-700 hover:decoration-current"
		/>
	),
	table: TableScroll,
	p: props => <p {...props} className="mb-3 text-base leading-[1.625rem] text-gray-400" />,
	tbody: props => <tbody {...props} className="border-t border-gray-700" />,
	thead: props => <thead {...props} className="h-8 border-gray-700" />,
	th: props => <th {...props} className="border-gray-700 px-3" />,
	tr: props => <tr {...props} className="h-10 border-gray-700 px-3" />,
	td: props => <td {...props} className="my-4 overflow-hidden rounded-sm" />,
	img: Figure,
	ul: props => <ul {...props} className="list-disc pl-6" />,
	li: props => <li {...props} className="my-1 text-base text-gray-400" />,
	ol: props => <ol {...props} className="list-decimal pl-4" />,
}

const Content = ({ Component }: ContentProps) => <Component components={components} />

export default Content

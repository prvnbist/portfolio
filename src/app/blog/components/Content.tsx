import type { ComponentType } from 'react'

import { CodeBlock } from '@/components'

type ContentProps = {
	Component: ComponentType<{ components?: Record<string, unknown> }>
}

const Content = ({ Component }: ContentProps) => <Component components={components} />

const components: Record<string, ComponentType<any>> = {
	// @ts-ignore
	pre: CodeBlock,
	h1: (props: any) => (
		<h1 {...props} className="border-b border-gray-800 pb-3 text-4xl mt-5 mb-3" />
	),
	h2: (props: any) => (
		<h2 {...props} className="border-b border-gray-800 pb-3 text-3xl mt-5 mb-3" />
	),
	h3: (props: any) => (
		<h3 {...props} className="border-b border-gray-800 pb-3 text-2xl mt-5 mb-2" />
	),
	h4: (props: any) => (
		<h4 {...props} className="border-b border-gray-800 pb-3 text-xl mt-5 mb-2" />
	),
	blockquote: (props: any) => (
		<blockquote {...props} className="border-l-4 border-gray-700 pl-3" />
	),
	code: (props: any) => (
		<code {...props} className="inline-block text-gray-400 text-sm bg-gray-800 px-2 rounded" />
	),
	a: (props: any) => <a {...props} className="text-blue-500 hover:text-blue-700" />,
	table: (props: any) => <table {...props} className="table my-3 w-full border-collapse" />,
	p: (props: any) => <p {...props} className="text-gray-400 mb-3 text-lg" />,
	tbody: (props: any) => <tbody {...props} className="border-t border-gray-700" />,
	thead: (props: any) => <thead {...props} className="h-8 border-gray-700" />,
	th: (props: any) => <th {...props} className="px-3 border-gray-700" />,
	tr: (props: any) => <tr {...props} className="h-10 px-3 border-gray-700" />,
	td: (props: any) => <td {...props} className="my-4 overflow-hidden rounded" />,
	img: (props: any) => (
		<img {...props} alt={props.alt} className="rounded-md w-full object-cover" />
	),
	ul: (props: any) => <ul {...props} className="list-disc pl-6" />,
	li: (props: any) => <li {...props} className="text-gray-400 my-1 text-lg" />,
	ol: (props: any) => <ol {...props} className="list-decimal pl-4" />,
	Video: (props: any) => (
		<video width="100%" controls className="my-4 rounded-md overflow-hidden">
			<source src={props.url} type="video/mp4" />
		</video>
	),
}

export default Content

import { useNavigate } from '@tanstack/react-router'
import debounce from 'lodash.debounce'
import { useEffect, useId, useMemo, useRef, useState } from 'react'

import type { BlogSearch } from '@/lib/articles.types'

/** Search params for a typed keyword: trimmed, and dropped when blank. */
export const nextSearch = (prev: BlogSearch, raw: string): BlogSearch => ({
	...prev,
	s: raw.trim() || undefined,
})

/**
 * What the input should show once the URL's `s` changes. It follows the URL (back/forward),
 * except while typed text is still waiting to be sent, or when it already matches the URL apart
 * from surrounding spaces.
 */
export const syncText = ({
	text,
	urlValue,
	pending,
}: {
	text: string
	urlValue: string
	pending: boolean
}) => (pending || text.trim() === urlValue ? text : urlValue)

const Search = ({ value = '' }: { value?: string }) => {
	const id = useId()
	const navigate = useNavigate({ from: '/blog/' })
	const [text, setText] = useState(value)
	const pending = useRef(false)

	const debouncedSearch = useMemo(
		() =>
			debounce((raw: string) => {
				pending.current = false
				navigate({ search: prev => nextSearch(prev, raw) })
			}, 400),
		[navigate]
	)

	// Don't navigate back to /blog after the user has left the page.
	useEffect(() => () => debouncedSearch.cancel(), [debouncedSearch])

	useEffect(() => {
		setText(current => syncText({ text: current, urlValue: value, pending: pending.current }))
	}, [value])

	return (
		<search>
			<form
				onSubmit={e => {
					e.preventDefault()
					debouncedSearch.flush()
				}}
			>
				<label htmlFor={id} className="sr-only">
					Search the blog
				</label>
				{/* A shell prompt, like the heroes: the prefix is decorative, the input is the command's argument. */}
				<div className="flex items-center gap-3 border border-white/10 bg-dark-400/60 px-4 py-2.5 font-code text-sm transition-colors focus-within:border-accent-to focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-accent-to">
					<span aria-hidden="true" className="shrink-0 select-none">
						<span className="text-emerald-400">$</span>{' '}
						<span className="text-gray-300">grep -i</span>
					</span>
					<input
						id={id}
						type="search"
						value={text}
						placeholder="title"
						autoComplete="off"
						spellCheck={false}
						onChange={e => {
							pending.current = true
							setText(e.target.value)
							debouncedSearch(e.target.value)
						}}
						className="min-w-0 flex-1 bg-transparent text-white outline-hidden placeholder:text-gray-400"
					/>
				</div>
			</form>
		</search>
	)
}

export default Search

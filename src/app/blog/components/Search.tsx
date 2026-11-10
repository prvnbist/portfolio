import { useNavigate } from '@tanstack/react-router'
import debounce from 'lodash.debounce'
import { useMemo } from 'react'

const Search = ({ value = '' }: { value?: string }) => {
	const navigate = useNavigate({ from: '/blog/' })

	const debouncedSearch = useMemo(
		() =>
			debounce((s: string) => {
				navigate({ search: prev => ({ ...prev, s: s || undefined }) })
			}, 400),
		[navigate]
	)

	return (
		<input
			type="text"
			defaultValue={value}
			placeholder="Search articles..."
			onChange={e => debouncedSearch(e.target.value.trim())}
			className="rounded-lg w-full px-3 py-2 bg-transparent border border-dark-200 focus:(outline-none border-yellow-400)"
		/>
	)
}

export default Search

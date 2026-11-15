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
			className="w-full rounded-full border border-white/10 bg-transparent px-5 py-2.5 text-sm placeholder:text-gray-500 transition-colors focus:border-[#fda085] focus:outline-hidden"
		/>
	)
}

export default Search

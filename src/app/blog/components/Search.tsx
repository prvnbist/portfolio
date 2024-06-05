'use client'

import debounce from 'lodash.debounce'
import { useRouter, useSearchParams } from 'next/navigation'

const Search = () => {
	const router = useRouter()
	const params = useSearchParams()

	const debouncedSearch = debounce((value: string) => {
		const _params = new URLSearchParams(params)
		if (value) {
			_params.set('s', value)
		} else {
			_params.delete('s')
		}
		router.push(`/blog?${_params.toString()}`)
	}, 400)

	return (
		<input
			type="text"
			placeholder="Search articles..."
			onChange={e => debouncedSearch(e.target.value.trim())}
			className="rounded-lg w-full px-3 py-2 bg-transparent border border-dark-200 focus:(outline-none border-yellow-400)"
		/>
	)
}

export default Search

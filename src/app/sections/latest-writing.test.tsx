import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import LatestWriting from './latest-writing'

describe('LatestWriting', () => {
	it('renders nothing when there are no articles', () => {
		expect(renderToStaticMarkup(<LatestWriting articles={[]} />)).toBe('')
	})
})

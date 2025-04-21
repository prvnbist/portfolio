import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	async rewrites() {
		return [
			{
				source: '/(design|code|blog)',
				destination: '/',
			},
			{
				source: '/script',
				destination: 'https://analytics.prvnbist.com/script.js',
			},
		]
	},
}

export default nextConfig

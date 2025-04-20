import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	async rewrites() {
		return [
			{
				source: '/(design|code|blog)',
				destination: '/',
			},
		]
	},
}

export default nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return [
			{
				source: '/script',
				destination: 'https://analytics.prvnbist.com/script.js',
			},
		]
	},
}

export default nextConfig

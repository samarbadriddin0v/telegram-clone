import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{ protocol: 'https', hostname: 'github.com', pathname: '**' },
			{ protocol: 'https', hostname: 'utfs.io', pathname: '**' },
		],
	},
}

export default nextConfig

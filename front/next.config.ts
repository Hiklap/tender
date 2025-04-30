import type { NextConfig } from 'next'

import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

const nextConfig: NextConfig = {
	env: {
		SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
		GOOGLE_RECAPTCHA_SITE_KEY: process.env.GOOGLE_RECAPTCHA_SITE_KEY
	},
	images: {
		domains: ['127.0.0.1']
	}
}

export default withNextIntl(nextConfig)

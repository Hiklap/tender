import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { MainProvider } from '@/shared/providers'
import { getLocale, getMessages } from 'next-intl/server'

import '@/shared/styles/globals.css'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin']
})

export const metadata: Metadata = {
	title: {
		absolute: 'Tender',
		template: '%s | Tender'
	},
	description:
		'Tender – платформа, где можно купить индивидуальную программу тренировок, отслеживать свой прогресс и записываться к опытным тренерам. Достигайте своих целей с персональными решениями и поддержкой профессионалов.',
	keywords: 'фитнес, тренировки, спорт, здоровый образ жизни, упражнения, Tender, советы по фитнесу, спортзал',
	authors: [{ name: 'Tender' }]
}

export default async function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	const locale = await getLocale()
	const messages = await getMessages()

	return (
		<html lang={locale} suppressHydrationWarning>
			<body className={geistSans.variable}>
				<MainProvider messages={messages} locale={locale}>
					<div className='h-screen w-full'>{children}</div>
				</MainProvider>
			</body>
		</html>
	)
}

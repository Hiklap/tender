'use client'

import { ReactNode } from 'react'

import { TanstackQueryProvider, ThemeProvider, ToastProvider } from './index'
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl'

export function MainProvider({
	children,
	messages,
	locale
}: {
	children: ReactNode
	messages: AbstractIntlMessages
	locale: string
}) {
	return (
		<NextIntlClientProvider locale={locale} messages={messages}>
			<TanstackQueryProvider>
				<ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
					<ToastProvider />
					{children}
				</ThemeProvider>
			</TanstackQueryProvider>
		</NextIntlClientProvider>
	)
}

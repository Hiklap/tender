'use server'

import { cookies } from 'next/headers'
import { defaultLocale, Locale } from './config'

const COOKIE_NAME = 'locale'

export async function getUserLocale() {
	const cookiesData = await cookies()

	return cookiesData.get(COOKIE_NAME)?.value || defaultLocale
}

export async function setUserLocale(locale: Locale) {
	const cookiesData = await cookies()

	cookiesData.set(COOKIE_NAME, locale)
}

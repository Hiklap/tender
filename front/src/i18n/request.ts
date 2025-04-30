import { getRequestConfig } from 'next-intl/server'
import { getUserLocale } from './locale'

export default getRequestConfig(async () => {
	const locale = await getUserLocale()

	return {
		locale,
		timeZone: 'Europe/Moscow',
		messages: (await import(`../shared/messages/${locale}.json`)).default
	}
})

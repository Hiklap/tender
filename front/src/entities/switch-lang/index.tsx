'use client'

import { Locale } from '@/i18n/config'
import { setUserLocale } from '@/i18n/locale'
import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/shared/ui'
import { useLocale, useTranslations } from 'next-intl'

export default function SwitchLang() {
	const locale = useLocale()
	const t = useTranslations('HomePage')

	const switchLanguage = (value: string) => {
		const locale = value as Locale
		setUserLocale(locale)
	}

	return (
		<div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='outline' size='icon'>{locale}</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>{t('change_lang')}</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={() => switchLanguage('ru')}>Русский</DropdownMenuItem>
					<DropdownMenuItem onClick={() => switchLanguage('en')}>English</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}

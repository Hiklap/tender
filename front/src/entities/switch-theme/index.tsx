'use client'

import { Button } from '@/shared/ui'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export default function SwitchTheme() {
	const { setTheme, resolvedTheme } = useTheme()

	console.log(resolvedTheme)
	return (
		<Button variant='outline' size='icon' onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>
			<Moon className='hidden h-4 w-4 dark:block' />
			<Sun className='h-4 w-4 dark:hidden' />
		</Button>
	)
}

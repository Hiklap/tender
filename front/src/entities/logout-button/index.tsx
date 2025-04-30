'use client'

import { Button } from '@/shared/ui'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

export const LogoutButton = () => {
	const router = useRouter()

	const logout = () => {
		Cookies.remove('token')
		router.push('/')
	}

	return (
		<Button className='mx-4' variant='secondary' onClick={logout}>
			Выйти
		</Button>
	)
}

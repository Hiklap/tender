import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import Cookies from 'js-cookie'

import { toastMessageHandler } from '@/shared/utils'

import type { TypeLoginSchema } from '../model'

export function useLoginMutation() {
	const router = useRouter()

	const { mutate: login, isPending: isLoadingLogin } = useMutation({
		mutationKey: ['login user'],
		mutationFn: async ({ values }: { values: TypeLoginSchema }) => {
			const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Origin: 'http://localhost:3000'
				},
				body: JSON.stringify(values)
			})
			return response.json()
		},
		onSuccess(data: any) {
			if (data.message) {
				toastMessageHandler(data)
			} else {
				router.push('/personal')

				Cookies.set('token', data.data.access_token, {
					expires: 7,
					sameSite: 'Strict'
				})

				toast.success('Успешная авторизация')
			}
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})

	return { login, isLoadingLogin }
}

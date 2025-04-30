import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import Cookies from 'js-cookie'

import { toastMessageHandler } from '@/shared/utils'

import type { TypeSignupSchema } from '../model'

export function useSignupMutation() {
	const router = useRouter()

	const { mutate: signup, isPending: isLoadingSignup } = useMutation({
		mutationKey: ['signup user'],
		mutationFn: async ({ values }: { values: TypeSignupSchema }) => {
			const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/signup`, {
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

				Cookies.set('token', data.data.user.access_token, {
					expires: 7,
					sameSite: 'Strict'
				})

				toast.success('Успешная регистрация')
			}
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})

	return { signup, isLoadingSignup }
}

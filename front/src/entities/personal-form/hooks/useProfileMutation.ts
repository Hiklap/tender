import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'
import { TypePersonalSchema } from '../model'

import { Fetch } from '@/shared/utils/api'

export function usePersonalMutation() {
	const { mutate: updatePersonal, isPending: isUpdatingPersonal } = useMutation({
		mutationKey: ['update user'],
		mutationFn: async ({ values }: { values: TypePersonalSchema }) => {
			return Fetch('/profile/update', {
				method: 'PUT',
				requiresAuth: true,
				body: values
			})
		},
		onSuccess(data: any) {
			if (data.message) {
				toastMessageHandler(data)
			} else {
				toast.success('Успешное обновление профиля')
			}
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})

	return { updatePersonal, isUpdatingPersonal }
}

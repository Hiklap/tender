import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'
import Cookies from 'js-cookie'

import { Fetch } from '@/shared/utils/api'
import axios from 'axios'
import { TypeAdminSchema } from '../model'

export function useAdminMutation() {
	const token = Cookies.get('token')

	const { mutate: createExercise, isPending: isAdminLoading } = useMutation({
		mutationKey: ['exercise user'],
		mutationFn: async (formData: TypeAdminSchema) => {
			return axios(`${process.env.NEXT_PUBLIC_SERVER_URL}/exercises`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`
				},
				data: formData
			})
		},
		onSuccess(data: any) {
			if (data.message) {
				toastMessageHandler(data)
			} else {
				toast.success('Успешное создание занятия')
			}
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})

	return { createExercise, isAdminLoading }
}

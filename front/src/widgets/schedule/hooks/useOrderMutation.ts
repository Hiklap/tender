import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'
import Cookies from 'js-cookie'

import axios from 'axios'

export function useOrderMutation() {
	const token = Cookies.get('token')

	const { mutate: addRecord, isPending: isRecordLoading } = useMutation({
		mutationKey: ['orders admin'],
		mutationFn: async (dataToSend: any) => {
			return axios(`${process.env.NEXT_PUBLIC_SERVER_URL}/orders`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`
				},
				data: dataToSend
			})
		},
		onSuccess(data: any) {
			if (data.message) {
				toastMessageHandler(data)
			} else {
				toast.success('Успешное добавление занятия в общее расписание')
			}
		},
		onError(error) {
			console.log(error)
			if (error.status === 422) {
				toast.error('Вы уже записаны на это мероприятие')
			} else {
				toastMessageHandler(error)
			}
		}
	})

	return { addRecord, isRecordLoading }
}

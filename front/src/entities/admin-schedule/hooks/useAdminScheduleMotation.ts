import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'
import Cookies from 'js-cookie'

import axios from 'axios'
import { TypeAdminScheduleSchema } from '../model'

export function useAdminScheduleMutation() {
	const token = Cookies.get('token')

	const { mutate: addSchedule, isPending: isAdminScheduleLoading } = useMutation({
		mutationKey: ['schedule admin'],
		mutationFn: async (dataToSend: TypeAdminScheduleSchema) => {
			return axios(`${process.env.NEXT_PUBLIC_SERVER_URL}/schedules`, {
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
			toastMessageHandler(error)
		}
	})

	return { addSchedule, isAdminScheduleLoading }
}

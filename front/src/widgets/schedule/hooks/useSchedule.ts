import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Cookies from 'js-cookie'

export function useSchedule() {
	const schedule = useQuery({
		queryKey: ['schedules'],
		queryFn: async () => {
			const response = await axios.get(`${process.env.SERVER_URL}/schedules`, {
				headers: {
					Authorization: `Bearer ${Cookies.get('token')}`
				}
			})
			return response.data
		}
	})

	return schedule
}

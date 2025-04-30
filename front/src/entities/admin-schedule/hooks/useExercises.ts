import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Cookies from 'js-cookie'

export function useExercises() {
	const schedule = useQuery({
		queryKey: ['exercises'],
		queryFn: async () => {
			const response = await axios.get(`${process.env.SERVER_URL}/exercises`, {
				headers: {
					Authorization: `Bearer ${Cookies.get('token')}`
				}
			})
			return response.data
		}
	})

	return schedule
}

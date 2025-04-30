import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Cookies from 'js-cookie'

export function useUser() {
	const user = useQuery({
		queryKey: ['user'],
		queryFn: async () => {
			const response = await axios.get(`${process.env.SERVER_URL}/profile`, {
				headers: {
					Authorization: `Bearer ${Cookies.get('token')}`
				}
			})
			return response.data
		}
	})

	return user
}

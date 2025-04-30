import Cookies from 'js-cookie'

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL

interface ApiOptions extends Omit<RequestInit, 'body'> {
	requiresAuth?: boolean
	body?: object
}

export async function Fetch(endpoint: string, options: ApiOptions = {}) {
	const { requiresAuth, headers, body, ...rest } = options

	const defaultHeaders: Record<string, string> = {
		'Content-Type': 'application/json',
		Origin: 'http://localhost:3000'
	}

	if (requiresAuth) {
		const token = Cookies.get('token')
		if (token) {
			defaultHeaders['Authorization'] = `Bearer ${token}`
		}
	}

	let serializedBody = ''

	if (body && typeof body !== 'string' && defaultHeaders['Content-Type'] === 'application/json') {
		serializedBody = JSON.stringify(body)
	}

	const mergedOptions: RequestInit = {
		headers: {
			...defaultHeaders,
			...headers
		},
		body: serializedBody,
		...rest
	}

	if (requiresAuth && !mergedOptions.credentials) {
		mergedOptions.credentials = 'include'
	}

	const response = await fetch(`${BASE_URL}${endpoint}`, mergedOptions)
	return response.json()
}

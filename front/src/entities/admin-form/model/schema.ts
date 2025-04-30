import { z } from 'zod'

export const AdminSchema = z.object({
	title: z
		.string()
		.min(1, { message: 'Это поле обязательно' })
		.max(30, { message: 'Ваше название занятия должно содержать максимум 30 символов.' }),
	description: z.string().min(1, { message: 'Это поле обязательно' }),
	image: z.string().min(1, { message: 'Это поле обязательно' }),
	price: z.preprocess((val) => Number(val), z.number().min(1, { message: 'Это поле обязательно' })),
	duration: z.preprocess((val) => Number(val), z.number().min(1, { message: 'Это поле обязательно' }))
})

export type TypeAdminSchema = z.infer<typeof AdminSchema>

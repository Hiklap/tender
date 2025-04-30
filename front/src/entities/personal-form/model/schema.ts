import { z } from 'zod'

export const PersonalSchema = z.object({
	username: z
		.string()
		.min(1, { message: 'Это поле обязательно' })
		.max(30, { message: 'Ваше имя должно содержать максимум 30 символов.' }),
	email: z.string().email({
		message: 'Пожалуйста, введите корректный адрес электронной почты.'
	}),
	age: z.number().nullable(),
	weight: z.number().nullable(),
	height: z.number().nullable(),
	gender: z.enum(['male', 'female', 'none']).nullable()
})

export type TypePersonalSchema = z.infer<typeof PersonalSchema>

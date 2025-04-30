import { z } from 'zod'

export const AdminScheduleSchema = z.object({
	exercise_id: z.preprocess((val) => Number(val), z.number().min(1, { message: 'Это поле обязательно' })),
	date: z.date(),
	start_time: z.string().min(1, 'Введите время начала'),
	end_time: z.string().min(1, 'Введите время окончания')
})

export type TypeAdminScheduleSchema = z.infer<typeof AdminScheduleSchema>

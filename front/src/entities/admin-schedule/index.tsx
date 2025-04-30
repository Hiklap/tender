'use client'

import {
	Button,
	Calendar,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Skeleton
} from '@/shared/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { AdminScheduleSchema, TypeAdminScheduleSchema } from './model'
import { cn } from '@/shared/utils'
import { CalendarIcon } from 'lucide-react'
import { addDays, addMinutes, format } from 'date-fns'
import { useAdminScheduleMutation } from './hooks/useAdminScheduleMotation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/Select'
import { useExercises } from './hooks/useExercises'
import { ru } from 'date-fns/locale'
import { useEffect } from 'react'

export function AdminSchedule() {
	const tomorrow = addDays(new Date(), 1)

	const form = useForm<TypeAdminScheduleSchema>({
		resolver: zodResolver(AdminScheduleSchema),
		defaultValues: {
			exercise_id: undefined,
			date: tomorrow,
			start_time: '',
			end_time: ''
		}
	})

	const { addSchedule, isAdminScheduleLoading } = useAdminScheduleMutation()
	const schedule = useExercises()

	const onSubmit = (values: TypeAdminScheduleSchema) => {
		const dataToSend = {
			...values,
			exercise_id: Number(values.exercise_id),
			date: format(values.date, 'yyyy-MM-dd') as unknown as Date
		}

		console.log(dataToSend)

		addSchedule(dataToSend)
		form.reset()
	}
	const selectedExerciseId = form.watch('exercise_id')
	const startTimeValue = form.watch('start_time')

	const selectedExercise = schedule.data?.data?.exercises.find((ex) => ex.id.toString() === selectedExerciseId)

	useEffect(() => {
		if (!form.getValues('exercise_id') && schedule.data?.data?.exercises?.length) {
			form.setValue('exercise_id', schedule.data.data.exercises[0].id.toString())
		}
	}, [schedule.data, form])

	useEffect(() => {
		if (startTimeValue && selectedExercise?.duration) {
			const [hours, minutes] = startTimeValue.split(':').map(Number)

			const startDate = new Date()
			startDate.setHours(hours, minutes, 0, 0)

			console.log(selectedExercise?.duration)

			const endDate = addMinutes(startDate, selectedExercise.duration)

			form.setValue('end_time', format(endDate, 'HH:mm'))
		}
	}, [selectedExercise?.duration, startTimeValue, form])

	if (schedule.isLoading)
		return (
			<div className=''>
				<Skeleton className='h-[600px] w-[400px] rounded-xl' />
			</div>
		)

	return (
		<Card className='w-[400px]'>
			<CardHeader className='space-y-2'>
				<CardTitle>Добавить занятие в расписание</CardTitle>
				<CardDescription>Чтобы пользователи увидели ваше занятие добавьте его в расписание</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-2 space-y-2'>
						<FormField
							control={form.control}
							name='exercise_id'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Название</FormLabel>
									<Select
										onValueChange={field.onChange}
										value={field.value ? field.value.toString() : ''}
										disabled={isAdminScheduleLoading}
										onOpenChange={() => schedule.refetch()}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder='Выберите занятие' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{schedule.data.data.exercises.map((exercise: any) => (
												<SelectItem key={exercise.id} value={exercise.id.toString()}>
													{exercise.title}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='date'
							render={({ field }) => (
								<FormItem className='flex flex-col'>
									<FormLabel>Дата</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant={'outline'}
													className={cn('w-[240px] pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
												>
													{field.value ? format(field.value, 'PPP', { locale: ru }) : <span>Выберете дату</span>}
													<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className='w-auto p-0' align='start'>
											<Calendar
												mode='single'
												locale={ru}
												selected={field.value}
												onSelect={field.onChange}
												disabled={(date) => date < new Date()}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='start_time'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Время начала</FormLabel>
									<FormControl>
										<Input type='time' disabled={isAdminScheduleLoading} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* <FormField
							control={form.control}
							name='end_time'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Время начала</FormLabel>
									<FormControl>
										<Input type='time' disabled={isAdminScheduleLoading} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/> */}
						<Button className='w-full' variant='outline'>
							Добавить в расписание
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	)
}

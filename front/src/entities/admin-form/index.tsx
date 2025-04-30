'use client'

import {
	Button,
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
	Textarea
} from '@/shared/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useAdminMutation } from './hooks/useAdminMutation'
import { useState } from 'react'
import { AdminSchema, TypeAdminSchema } from './model'

export function AdminForm() {
	const [currentFile, setCurrentFile] = useState<File | null>(null)

	const form = useForm<TypeAdminSchema>({
		resolver: zodResolver(AdminSchema),
		defaultValues: {
			title: '',
			description: '',
			price: 0,
			image: '',
			duration: 0
		}
	})
	const { createExercise, isAdminLoading } = useAdminMutation()

	const onSubmit = (values: TypeAdminSchema) => {
		const formData = new FormData()

		formData.append('image', currentFile!)
		formData.append('title', values.title)
		formData.append('description', values.description)
		formData.append('price', String(values.price))
		formData.append('duration', String(values.duration))

		createExercise(formData as unknown as TypeAdminSchema)
		form.reset()
	}

	return (
		<Card className='w-[400px]'>
			<CardHeader className='space-y-2'>
				<CardTitle>Создать занятие</CardTitle>
				<CardDescription>Можно создать тренировку на любой вкус</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-2 space-y-2'>
						<FormField
							control={form.control}
							name='title'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Название</FormLabel>
									<FormControl>
										<Input placeholder='Йога' disabled={isAdminLoading} type='text' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='description'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Описание</FormLabel>
									<FormControl>
										<Textarea placeholder='На этом занятии...' disabled={isAdminLoading} {...field} className='resize-none' />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='price'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Цена занятия</FormLabel>
									<FormControl>
										<Input placeholder='100 рублей' type='number' min={0} disabled={isAdminLoading} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='duration'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Продолжительность в минутах</FormLabel>
									<FormControl>
										<Input placeholder='30 минут' type='number' min={0} disabled={isAdminLoading} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='image'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Картинка</FormLabel>
									<FormControl>
										<Input
											type='file'
											accept='image/png, image/jpeg'
											disabled={isAdminLoading}
											{...field}
											onChange={(e) => {
												const file = e.target.files?.[0]
												if (file) {
													setCurrentFile(file)
													field.onChange(e)
												}
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button className='w-full' variant='outline'>
							Создать занятие
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	)
}

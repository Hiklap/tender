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
	Input
} from '@/shared/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { PersonalSchema, TypePersonalSchema } from './model'
import { usePersonalMutation } from './hooks/useProfileMutation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/Select'

interface PersonalFormProps {
	data: {
		user: { email: string; username: string; age: number; weight: number; height: number; gender: 'male' | 'female' | 'none' }
	}
}

export function PersonalForm({ data }: PersonalFormProps) {
	const [disabled, setDisabled] = useState(true)

	const form = useForm<TypePersonalSchema>({
		resolver: zodResolver(PersonalSchema),
		defaultValues: {
			email: data.user.email ?? '',
			username: data.user.username ?? '',
			age: Number(data.user.age),
			weight: Number(data.user.weight),
			height: Number(data.user.height),
			gender: data.user.gender ?? 'none'
		}
	})
	const { updatePersonal, isUpdatingPersonal } = usePersonalMutation()

	const onSubmit = (values: TypePersonalSchema) => {
		console.log(values)
		setDisabled(!disabled)
		updatePersonal({ values })
	}

	return (
		<Card className='w-[400px]'>
			<CardHeader className='space-y-2'>
				<CardTitle>Личные данные пользователя</CardTitle>
				<CardDescription>Можно просмотреть свои данные и редактировать</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-2 space-y-2'>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Почта</FormLabel>
									<FormControl>
										<Input placeholder='Почта кента' disabled={disabled || isUpdatingPersonal} type='email' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='username'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Имя</FormLabel>
									<FormControl>
										<Input placeholder='Никита Галкин' disabled={disabled || isUpdatingPersonal} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='age'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Возраст</FormLabel>
									<FormControl>
										<Input
											placeholder='21'
											type='number'
											min={0}
											disabled={disabled || isUpdatingPersonal}
											{...field}
											value={field.value ?? 0}
											onChange={(e) => field.onChange(Number(e.target.value))}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='weight'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Вес (кг)</FormLabel>
									<FormControl>
										<Input
											placeholder='60кг'
											type='number'
											min={0}
											disabled={disabled || isUpdatingPersonal}
											{...field}
											value={field.value ?? 0}
											onChange={(e) => field.onChange(Number(e.target.value))}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='height'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Рост (см)</FormLabel>
									<FormControl>
										<Input
											placeholder='170см'
											type='number'
											min={0}
											disabled={disabled || isUpdatingPersonal}
											{...field}
											value={field.value ?? 0}
											onChange={(e) => field.onChange(Number(e.target.value))}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='gender'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Пол</FormLabel>
									<Select
										name='gender'
										onValueChange={field.onChange}
										disabled={disabled || isUpdatingPersonal}
										defaultValue={field.value ?? 'none'}
									>
										<SelectTrigger>
											<SelectValue placeholder='Ваш пол' />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='none'>Не указан</SelectItem>
											<SelectItem value='male'>Мужской</SelectItem>
											<SelectItem value='female'>Женский</SelectItem>
										</SelectContent>
									</Select>

									<FormMessage />
								</FormItem>
							)}
						/>

						{!disabled && (
							<Button className='w-full' variant='outline'>
								Сохранить
							</Button>
						)}
						{disabled && (
							<Button className='w-full' disabled={isUpdatingPersonal} onClick={() => setDisabled(!disabled)}>
								Редактировать
							</Button>
						)}
					</form>
				</Form>
			</CardContent>
		</Card>
	)
}

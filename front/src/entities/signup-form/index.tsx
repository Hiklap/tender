'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	Button,
	Input,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent
} from '@/shared/ui'
import { SignupSchema, type TypeSignupSchema } from './model'
import { useSignupMutation } from './hooks/useSignupMutation'
import Link from 'next/link'
import { Google } from '@/shared/icons/google'

export function SignupForm() {
	const form = useForm<TypeSignupSchema>({
		resolver: zodResolver(SignupSchema),
		defaultValues: {
			username: '',
			email: '',
			password: '',
			confirmPassword: ''
		}
	})

	const { signup, isLoadingSignup } = useSignupMutation()

	const onSubmit = (values: TypeSignupSchema) => {
		signup({ values })
	}

	return (
		<Card className='w-[400px]'>
			<CardHeader className='space-y-2'>
				<CardTitle>Зарегистрироваться</CardTitle>
				<CardDescription>Зарегистрируйтесь, используя свой адрес электронной почты и пароль</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className='grid gap-2'>
							<div className='grid gap-1'>
								<FormField
									control={form.control}
									name='username'
									render={({ field }) => (
										<FormItem className='w-full pb-4'>
											<FormLabel htmlFor='username'>Имя</FormLabel>
											<div className='relative w-full'>
												<FormControl className='w-full'>
													<Input
														id='username'
														type='text'
														autoCapitalize='none'
														autoCorrect='off'
														placeholder='ivan'
														className='w-full'
														disabled={isLoadingSignup}
														{...field}
													/>
												</FormControl>
											</div>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='email'
									render={({ field }) => (
										<FormItem className='w-full pb-4'>
											<FormLabel htmlFor='email'>Почта</FormLabel>
											<div className='relative w-full'>
												<FormControl className='w-full'>
													<Input
														id='email'
														type='email'
														autoCapitalize='none'
														autoCorrect='off'
														placeholder='ivan@example.com'
														className='w-full'
														disabled={isLoadingSignup}
														{...field}
													/>
												</FormControl>
											</div>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='password'
									render={({ field }) => (
										<FormItem className='w-full pb-4'>
											<FormLabel htmlFor='password'>Пароль</FormLabel>
											<div className='relative w-full'>
												<FormControl className='w-full'>
													<Input
														id='password'
														type='password'
														autoCapitalize='none'
														autoCorrect='off'
														placeholder='******'
														className='w-full'
														disabled={isLoadingSignup}
														{...field}
													/>
												</FormControl>
											</div>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='confirmPassword'
									render={({ field }) => (
										<FormItem className='w-full pb-4'>
											<FormLabel htmlFor='confirmPassword'>Подтвердить пароль</FormLabel>
											<div className='relative w-full'>
												<FormControl className='w-full'>
													<Input
														id='confirmPassword'
														type='password'
														autoCapitalize='none'
														autoCorrect='off'
														placeholder='******'
														className='w-full'
														disabled={isLoadingSignup}
														{...field}
													/>
												</FormControl>
											</div>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<Button disabled={isLoadingSignup}>
								{isLoadingSignup && <div className='mr-2 h-4 w-4 animate-spin rounded-full border-2 border-x-white' />}
								Зарегистрироваться
							</Button>
							{/* <Button variant='outline' className='w-full' disabled={isLoadingSignup}>
								<Google className='fill-black dark:fill-white' />
								Зарегистрироваться с помощью Google
							</Button> */}
						</div>
					</form>
				</Form>
				<div className='mt-4 text-center text-sm'>
					Есть аккаунт?{' '}
					<Link href='/auth/login' className='underline underline-offset-4'>
						Войти
					</Link>
				</div>
			</CardContent>
		</Card>
	)
}

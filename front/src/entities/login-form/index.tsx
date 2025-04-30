'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { toast } from 'sonner'

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

import { LoginSchema, type TypeLoginSchema } from './model'
import { useLoginMutation } from './hooks/useLoginMutation'
import Link from 'next/link'
import { Google } from '@/shared/icons/google'

export function LoginForm() {
	const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null)

	const form = useForm<TypeLoginSchema>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	})

	const { login, isLoadingLogin } = useLoginMutation()

	const onSubmit = (values: TypeLoginSchema) => {
		if (recaptchaValue) {
			login({ values })
			console.log(values)
		} else {
			toast.error('Пожалуйста, завершите reCAPTCHA')
		}
	}

	return (
		<Card className='w-[400px]'>
			<CardHeader className='space-y-2'>
				<CardTitle>Войти</CardTitle>
				<CardDescription>Чтобы войти на сайт введите ваш email и пароль</CardDescription>
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
										<Input placeholder='ivan@example.com' disabled={isLoadingLogin} type='email' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Пароль</FormLabel>
									<FormControl>
										<Input placeholder='******' disabled={isLoadingLogin} type='password' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className='flex justify-center'>
							<ReCAPTCHA sitekey={process.env.GOOGLE_RECAPTCHA_SITE_KEY as string} onChange={setRecaptchaValue} />
						</div>
						<Button type='submit' disabled={isLoadingLogin}>
							{isLoadingLogin && <div className='mr-2 h-4 w-4 animate-spin rounded-full border-2 border-x-white' />}
							Войти в аккаунт
						</Button>
						{/* <Button variant='outline' className='w-full' disabled={isLoadingLogin}>
							<Google className='fill-black dark:fill-white' />
							Войти с помощью Google
						</Button> */}
					</form>
				</Form>
				<div className='mt-4 text-center text-sm'>
					Нету аккаунта?{' '}
					<Link href='/auth/signup' className='underline underline-offset-4'>
						Зарегистрироваться
					</Link>
				</div>
			</CardContent>
		</Card>
	)
}

'use client'

import { Button } from '@/shared/ui'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	return (
		<div className='flex w-full flex-col items-center justify-center' style={{ height: 'calc(100vh - 96px)' }}>
			<h2 className='scroll-m-20 text-2xl font-semibold tracking-tight'>Что-то пошло не так!</h2>
			<p className='mb-4 leading-7 [&:not(:first-child)]:mt-6'>Сообщение ошибки: {error.message}</p>
			<Button onClick={() => reset()}>Попробовать ещё раз</Button>
		</div>
	)
}

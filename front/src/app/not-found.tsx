import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
	title: 'Страница не найдена'
}

export default function NotFound() {
	return (
		<div className='flex h-full w-full items-center justify-center'>
			<div className='flex flex-col items-center justify-center gap-2'>
				<Image src={'not-found.svg'} priority alt='not-found' width={250} height={250} />
				<p className='text-[30px]'>Такой страницы не существует</p>
			</div>
		</div>
	)
}

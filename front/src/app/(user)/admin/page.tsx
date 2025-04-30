import { AdminForm } from '@/entities/admin-form'
import { AdminSchedule } from '@/entities/admin-schedule'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import Image from 'next/image'

export const metadata: Metadata = {
	title: 'Администратор'
}

export default async function Admin() {
	const token = (await cookies()).get('token')?.value

	const { data } = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/profile`, {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json'
		}
	}).then((res) => res.json())

	if (data.user.role !== 'admin') {
		return (
			<div className='flex h-[500px] w-full items-center justify-center'>
				<Image src={'protected.svg'} priority alt='protected' width={250} height={250} />
			</div>
		)
	}

	return (
		<div className='flex h-full items-center justify-center'>
			{data.user.role === 'admin' && (
				<div className='flex gap-4'>
					<AdminForm />
					<AdminSchedule />
				</div>
			)}
		</div>
	)
}

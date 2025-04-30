import { PersonalForm } from '@/entities/personal-form'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui'
import { Metadata } from 'next'
import { cookies } from 'next/headers'

export const metadata: Metadata = {
	title: 'Личные данные'
}

export default async function Personal() {
	const token = (await cookies()).get('token')?.value

	const profile = await fetch(`${process.env.SERVER_URL}/profile`, {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json'
		}
	}).then((res) => res.json())

	const orders = await fetch(`${process.env.SERVER_URL}/my-orders`, {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json'
		}
	}).then((res) => res.json())

	console.log(orders?.data)

	return (
		<div className='flex h-full items-center justify-center gap-6'>
			<PersonalForm data={profile.data} />
			<div className='flex flex-col items-center justify-center gap-2'>
				<h2>Мои заявки на тренировки</h2>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className='w-[200px]'>Название</TableHead>
							<TableHead className='w-[100px]'>Дата</TableHead>
							<TableHead>Время начала</TableHead>
							<TableHead>Время конец</TableHead>
							<TableHead className='text-right'>Цена</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{orders?.data?.orders
							.filter((item) => item.schedule)
							.map((item: any) => (
								<TableRow key={item.id}>
									<TableCell className='font-medium'>{item.schedule?.exercise.title}</TableCell>
									<TableCell className='font-medium'>{item.schedule?.date}</TableCell>
									<TableCell>{item.schedule?.start_time}</TableCell>
									<TableCell>{item.schedule?.end_time}</TableCell>
									<TableCell className='text-right'>{item.schedule?.exercise.price}</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</div>
		</div>
	)
}

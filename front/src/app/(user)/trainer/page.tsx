import { Metadata } from 'next'
import { Avatar, AvatarFallback, AvatarImage, Card, CardContent, CardHeader, CardTitle } from '@/shared/ui'

export const metadata: Metadata = {
	title: 'Тренера'
}

export const revalidate = 3600

export default async function Teachers() {
	const data = await fetch(`${process.env.SERVER_URL}/teachers`).then((res) => res.json())

	console.log(data)

	return (
		<div className='grid grid-cols-4 gap-4 pt-4'>
			{data?.data?.teachers?.map(
				(teacher: { id: number; name: string; subject: { name: string }[]; phone: string; email: string }) => (
					<Card className='w-[300px]' key={teacher.id}>
						<CardHeader>
							<CardTitle className='flex flex-col items-center justify-center gap-2'>
								<Avatar className='h-24 w-24'>
									<AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
									<AvatarFallback>CN</AvatarFallback>
								</Avatar>
								<p>{teacher.name}</p>
							</CardTitle>
						</CardHeader>
						<CardContent className='flex flex-col'>
							<p>Предмет: {teacher.subject?.map((subject) => subject.name).join(', ')}</p>
							<p>Телефон: {teacher.phone}</p>
							<p>Почта: {teacher.email}</p>
						</CardContent>
					</Card>
				)
			)}
		</div>
	)
}

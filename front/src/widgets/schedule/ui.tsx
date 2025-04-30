'use client'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	Skeleton
} from '@/shared/ui'

import Image from 'next/image'
import { useState } from 'react'
import { useSchedule } from './hooks/useSchedule'
import { format, parseISO } from 'date-fns'
import { useOrderMutation } from './hooks/useOrderMutation'
import { useUser } from '@/shared/api/useUser'

export function ScheduleList() {
	const [open, setOpen] = useState(false)
	const [currentSchedule, setCurrentSchedule] = useState<number | null>(null)

	const schedule = useSchedule()
	const user = useUser()
	const { addRecord } = useOrderMutation()

	console.log(user.data)

	const record = (id: number) => {
		setCurrentSchedule(id)
		setOpen(true)
	}

	const recording = () => {
		addRecord({
			schedule_id: currentSchedule
		})
	}

	return (
		<>
			{!schedule.isLoading && schedule.data.data.schedules.length === 0 && (
				<div className='flex h-[500px] w-full items-center justify-center'>
					<Image src={'no-data.svg'} alt='no-data' width={250} height={250} />
				</div>
			)}
			<div className='grid grid-cols-2 gap-2'>
				{schedule.isLoading &&
					Array.from({ length: 4 }).map((_, index) => (
						<div key={index}>
							<Skeleton className='h-[360px] w-[100%] rounded-xl' />
						</div>
					))}
				{!schedule.isLoading &&
					!user.isLoading &&
					schedule.data.data.schedules.map((item: any) => (
						<Card key={item.id}>
							<CardHeader>
								<CardTitle>{item.exercise.title}</CardTitle>
								<CardDescription>{item.exercise.description}</CardDescription>
							</CardHeader>
							<CardContent>
								<div className='relative h-[500px] max-h-[500px] w-full'>
									<Image
										src={`http://127.0.0.1:8000/storage/${item.exercise.image}`}
										alt={item.exercise.image}
										fill
										className='object-cover'
									/>
								</div>
								<p>Цена: {item.exercise.price}</p>
								<p>Продолжительность: {item.exercise.duration} минут(ы)</p>
								<p>
									Начало: {format(parseISO(item.date), 'dd.MM.yyyy')} в {item.start_time.slice(0, 5)}
								</p>
								<p>Конец: {item.end_time.slice(0, 5)}</p>
							</CardContent>
							<CardFooter>
								{user.data.data.user.role !== 'admin' && <Button onClick={() => record(item.id)}>Записаться</Button>}
							</CardFooter>
						</Card>
					))}
			</div>
			<AlertDialog open={open} onOpenChange={() => setOpen(false)}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Вы уверены что хотите записать?</AlertDialogTitle>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Отменить</AlertDialogCancel>
						<AlertDialogAction onClick={recording}>Записаться</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	)
}

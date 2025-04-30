import { ScheduleList } from '@/widgets/schedule'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Расписание моих тренировок'
}

export default function Schedule() {
	return <ScheduleList />
}

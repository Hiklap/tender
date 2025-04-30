import { Metadata } from 'next'

import { BarChartStats } from '@/widgets/bar-chart'

export const metadata: Metadata = {
	title: 'Статистика'
}

export const revalidate = 3600

export default async function Stats() {
	const data = await fetch(`${process.env.SERVER_URL}/grades/average`).then((res) => res.json())

	console.log(data)

	return <BarChartStats data={data} />
}

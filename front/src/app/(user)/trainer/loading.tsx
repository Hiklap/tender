import { Skeleton } from '@/shared/ui'

export default function Loading() {
	return (
		<div className='grid grid-cols-4 gap-4'>
			{Array.from({ length: 12 }).map((_, index) => (
				<Skeleton key={index} className='h-[216px] w-full rounded-xl' />
			))}
		</div>
	)
}

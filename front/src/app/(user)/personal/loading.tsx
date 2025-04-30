import { Skeleton } from '@/shared/ui'

export default function Loading() {
	return (
		<div className='flex h-full items-center justify-center'>
			<Skeleton className='flex h-[400px] w-[400px] justify-center rounded-xl' />
		</div>
	)
}

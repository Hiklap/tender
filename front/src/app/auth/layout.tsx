import { Slideshow } from '@/entities/slideshow'
import { Button } from '@/shared/ui'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export default async function AuthLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<Slideshow />
			<Button asChild className='absolute z-10 left-6 top-6' variant='outline' size='icon'>
				<Link href='/'>
					<ChevronLeft />
				</Link>
			</Button>
			{children}
		</>
	)
}

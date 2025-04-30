import { Metadata } from 'next'
import { Posts } from '@/entities/posts'

export const metadata: Metadata = {
	title: 'Новости'
}

export default function News() {
	return <Posts />
}

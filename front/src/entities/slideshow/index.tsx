'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

const images = ['/background-auth-1.jpg', '/background-auth-2.jpg', '/background-auth-3.jpg', '/background-auth-4.jpg']

export function Slideshow() {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [fade, setFade] = useState(true)

	useEffect(() => {
		const interval = setInterval(() => {
			setFade(false)

			const timeout = setTimeout(() => {
				setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
				setFade(true)
			}, 1000)

			return () => clearTimeout(timeout)
		}, 7000)

		return () => clearInterval(interval)
	}, [])

	return (
		<div className={`absolute -z-10 inset-0 transition-opacity duration-1000 ${fade ? 'opacity-100' : 'opacity-0'}`}>
			<Image src={images[currentIndex]} priority quality={70} alt={`Slide ${currentIndex}`} fill className='object-cover' />
		</div>
	)
}

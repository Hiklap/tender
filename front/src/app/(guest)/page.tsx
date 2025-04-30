import SwitchLang from '@/entities/switch-lang'
import SwitchTheme from '@/entities/switch-theme'
import { Button, Card, CardContent } from '@/shared/ui'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
	const t = useTranslations('HomePage')

	return (
		<div className='flex min-h-screen flex-col'>
			{/* Header */}
			<header className='sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur'>
				<div className='container flex h-16 items-center justify-between'>
					<div className='flex items-center gap-2'>
						<Image src='/logo.webp' alt='Tender' width={24} height={24} />
						<span className='text-xl font-bold text-sky-600 dark:text-sky-400'>Tender</span>
					</div>
					<nav className='hidden items-center gap-6 md:flex'>
						<Link href='#' className='text-sm font-medium'>
							{t('nav_home')}
						</Link>
						<Link href='#programs' className='text-sm font-medium'>
							{t('nav_programs')}
						</Link>
						<Link href='#trainers' className='text-sm font-medium'>
							{t('nav_trainers')}
						</Link>
						{/* <Link href='#pricing' className='text-sm font-medium'>
							{t('nav_pricing')}
						</Link> */}
					</nav>
					<div className='flex items-center gap-4'>
						<Button asChild className='bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600'>
							<Link href='/auth/login'>{t('signup')}</Link>
						</Button>
						<SwitchLang />
						<SwitchTheme />
					</div>
				</div>
			</header>

			<main className='flex-1'>
				{/* Hero Section */}
				<section className='relative overflow-hidden bg-background py-16 md:py-24'>
					<div className='absolute inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] opacity-30 [background-size:16px_16px] dark:bg-[radial-gradient(#2a2a2a_1px,transparent_1px)]'></div>
					<div className='container relative'>
						<div className='absolute right-1/4 top-20 h-24 w-24 text-yellow-400'>
							<svg viewBox='0 0 24 24' fill='currentColor'>
								<path d='M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z' />
							</svg>
						</div>
						<div className='absolute bottom-10 left-1/4 h-8 w-8 text-sky-400'>
							<svg viewBox='0 0 24 24' fill='currentColor'>
								<path d='M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z' />
							</svg>
						</div>
						<div className='grid items-center gap-6 lg:grid-cols-2 lg:gap-12'>
							<div className='space-y-6'>
								<h1 className='text-4xl font-bold tracking-tighter md:text-5xl lg:text-6xl'>
									<span className='text-sky-600 dark:text-sky-400'>{t('home_section_title_one')}</span>{' '}
									{t('home_section_title_two')}
									<span className='text-sky-600 dark:text-sky-400'> {t('home_section_title_three')}</span>{' '}
									{t('home_section_title_four')}
								</h1>
								<p className='relative z-10 text-muted-foreground md:text-xl'>{t('home_section_subtitle')}</p>
								<Button asChild className='bg-sky-600 px-8 py-6 text-lg hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600'>
									<Link href='/auth/login'>{t('home_section_button')}</Link>
								</Button>
							</div>
							<div className='grid grid-cols-2 gap-4'>
								<div className='overflow-hidden rounded-2xl'>
									<Image
										src='/main-picture-1.jpg'
										alt='Fitness training'
										width={300}
										height={400}
										className='h-full w-full object-cover'
									/>
								</div>
								<div className='mt-8 overflow-hidden rounded-2xl'>
									<Image
										src='/main-picture-2.jpg'
										alt='Fitness training'
										width={300}
										height={400}
										className='h-full w-full object-cover'
									/>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Stats Section */}
				<section className='bg-background py-12'>
					<div className='container'>
						<div className='grid grid-cols-3 gap-8 md:gap-12'>
							<div className='text-center'>
								<p className='text-3xl font-bold text-sky-600 dark:text-sky-400'>20K+</p>
								<p className='text-sm text-muted-foreground'>{t('stats_section_active_members')}</p>
							</div>
							<div className='text-center'>
								<p className='text-3xl font-bold text-sky-600 dark:text-sky-400'>10+</p>
								<p className='text-sm text-muted-foreground'>{t('stats_section_expert_trainers')}</p>
							</div>
							<div className='text-center'>
								<p className='text-3xl font-bold text-sky-600 dark:text-sky-400'>10+</p>
								<p className='text-sm text-muted-foreground'>{t('stats_section_fitness_programs')}</p>
							</div>
						</div>
					</div>
				</section>

				{/* Programs Section */}
				<section className='bg-slate-900 py-16 dark:bg-slate-800 md:py-24'>
					<div id='programs' className='container'>
						<h2 className='mb-12 text-center text-3xl font-bold text-white'>{t('programs_section_title')}</h2>
						<div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
							<Card className='overflow-hidden bg-white dark:bg-slate-900'>
								<div className='aspect-video overflow-hidden'>
									<Image
										src='/personal-training.jpg'
										alt='Personal plan'
										width={400}
										height={200}
										className='h-full w-full object-cover transition-transform hover:scale-105'
									/>
								</div>
								<CardContent className='p-6'>
									<h3 className='text-lg font-bold'>{t('programs_section_personal_plan')}</h3>
									<p className='mt-2 text-sm text-muted-foreground'>{t('programs_section_personal_plan_description')}</p>
								</CardContent>
							</Card>

							<Card className='overflow-hidden bg-white dark:bg-slate-900'>
								<div className='aspect-video overflow-hidden'>
									<Image
										src='/strength-training.jpg'
										alt='Strength training'
										width={400}
										height={200}
										className='h-full w-full object-cover transition-transform hover:scale-105'
									/>
								</div>
								<CardContent className='p-6'>
									<h3 className='text-lg font-bold'>{t('programs_section_strength_training')}</h3>
									<p className='mt-2 text-sm text-muted-foreground'>{t('programs_section_strength_training_description')}</p>
								</CardContent>
							</Card>

							<Card className='overflow-hidden bg-white dark:bg-slate-900'>
								<div className='aspect-video overflow-hidden'>
									<Image
										src='/cardio-training.jpg'
										alt='Cardio plan'
										width={400}
										height={200}
										className='h-full w-full object-cover transition-transform hover:scale-105'
									/>
								</div>
								<CardContent className='p-6'>
									<h3 className='text-lg font-bold'>{t('programs_section_cardio_plan')}</h3>
									<p className='mt-2 text-sm text-muted-foreground'>{t('programs_section_cardio_plan_description')}</p>
								</CardContent>
							</Card>

							<Card className='overflow-hidden bg-white dark:bg-slate-900'>
								<div className='aspect-video overflow-hidden'>
									<Image
										src='/yoga-training.jpg'
										alt='Yoga sessions'
										width={400}
										height={200}
										className='h-full w-full object-cover transition-transform hover:scale-105'
									/>
								</div>
								<CardContent className='p-6'>
									<h3 className='text-lg font-bold'>{t('programs_section_yoga_sessions')}</h3>
									<p className='mt-2 text-sm text-muted-foreground'>{t('programs_section_yoga_sessions_description')}</p>
								</CardContent>
							</Card>

							<Card className='overflow-hidden bg-white dark:bg-slate-900'>
								<div className='aspect-video overflow-hidden'>
									<Image
										src='/group-training.jpg'
										alt='Group classes'
										width={400}
										height={200}
										className='h-full w-full object-cover transition-transform hover:scale-105'
									/>
								</div>
								<CardContent className='p-6'>
									<h3 className='text-lg font-bold'>{t('programs_section_group_classes')}</h3>
									<p className='mt-2 text-sm text-muted-foreground'>{t('programs_section_group_classes_description')}</p>
								</CardContent>
							</Card>
							<Card className='overflow-hidden bg-white dark:bg-slate-900'>
								<div className='aspect-video overflow-hidden'>
									<Image
										src='/hiit-training.jpg'
										alt='HIIT training'
										width={400}
										height={200}
										className='h-full w-full object-cover transition-transform hover:scale-105'
									/>
								</div>
								<CardContent className='p-6'>
									<h3 className='text-lg font-bold'>{t('programs_section_hiit_training')}</h3>
									<p className='mt-2 text-sm text-muted-foreground'>{t('programs_section_hiit_training_description')}</p>
								</CardContent>
							</Card>
						</div>
					</div>
				</section>

				<section className='bg-background py-16 md:py-24'>
					<div id='trainers' className='container'>
						<h2 className='mb-12 text-center text-3xl font-bold'>{t('trainer_section_title')}</h2>
						<div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
							{['/fitness-trainer-1.jpg', '/fitness-trainer-2.jpg', '/fitness-trainer-3.jpg'].map((trainer, index) => (
								<div key={trainer} className='overflow-hidden rounded-xl'>
									<Image
										src={trainer}
										alt={`Fitness trainer ${index}`}
										priority
										quality={70}
										width={300}
										height={300}
										className='h-full w-full object-cover'
									/>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Membership Section */}
				{/* <section className='bg-background py-16 md:py-24'>
					<div id='pricing' className='container'>
						<h2 className='mb-12 text-center text-3xl font-bold'>Membership</h2>
						<div className='grid gap-6 md:grid-cols-3'>
							{[
								{ name: 'Basic', price: '$29', color: 'bg-card' },
								{ name: 'Pro', price: '$59', color: 'bg-indigo-600 dark:bg-indigo-700 text-white' },
								{ name: 'Elite', price: '$99', color: 'bg-card' }
							].map((plan) => (
								<Card key={plan.name} className={`${plan.color}`}>
									<CardContent className='p-6'>
										<h3 className='text-xl font-bold'>{plan.name}</h3>
										<p className='mt-2 text-3xl font-bold'>
											{plan.price}
											<span className='text-sm font-normal text-muted-foreground'>/month</span>
										</p>
										<ul className='mt-6 space-y-3'>
											<li className='flex items-center'>
												<svg className='mr-2 h-5 w-5 text-green-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
													<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
												</svg>
												<span>Access to gym facilities</span>
											</li>
											<li className='flex items-center'>
												<svg className='mr-2 h-5 w-5 text-green-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
													<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
												</svg>
												<span>Group classes</span>
											</li>
											<li className='flex items-center'>
												<svg className='mr-2 h-5 w-5 text-green-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
													<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
												</svg>
												<span>Fitness assessment</span>
											</li>
										</ul>
										<Button
											className={`mt-6 w-full ${plan.name === 'Pro' ? 'bg-white text-indigo-600 hover:bg-gray-100 dark:bg-slate-800 dark:text-indigo-400 dark:hover:bg-slate-700' : 'bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600'}`}
										>
											Choose Plan
										</Button>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				</section> */}
			</main>

			<footer className='bg-slate-900 py-8 text-white dark:bg-slate-800'>
				<div className='container'>
					<div className='flex flex-col items-center justify-between md:flex-row'>
						<div className='mb-4 flex items-center gap-2 md:mb-0'>
							<Image src='/logo.webp' alt='Tender' width={24} height={24} />
							<span className='text-xl font-bold text-sky-400'>Tender</span>
						</div>
						<p className='text-sm text-gray-400'>{t('copyright')}</p>
					</div>
				</div>
			</footer>
		</div>
	)
}

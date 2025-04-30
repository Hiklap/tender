'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { breadcrumbs } from '@/shared/utils'
import { BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/shared/ui'
import { Fragment } from 'react'

export function BreadcrumbDynamic() {
	const pathname = usePathname()
	const currentBreadcrumbs = breadcrumbs(pathname)

	return (
		<BreadcrumbList>
			{currentBreadcrumbs.map((breadcrumb, index) => (
				<Fragment key={index}>
					<BreadcrumbItem className={index === 0 ? 'hidden md:block' : ''}>
						{breadcrumb.href ? (
							<Link href={breadcrumb.href}>
								<span>{breadcrumb.label}</span>
							</Link>
						) : (
							<BreadcrumbPage>
								<span>{breadcrumb.label}</span>
							</BreadcrumbPage>
						)}
					</BreadcrumbItem>
					{index < currentBreadcrumbs.length - 1 && <BreadcrumbSeparator className='hidden md:block' />}
				</Fragment>
			))}
		</BreadcrumbList>
	)
}

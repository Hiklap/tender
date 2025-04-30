import { AppSidebar } from '@/widgets/sidebar'
import { Breadcrumb, Separator, SidebarInset, SidebarProvider, SidebarTrigger } from '@/shared/ui'
import { BreadcrumbDynamic } from '@/entities/breadcrumb'
import { LogoutButton } from '@/entities/logout-button'

export default function UserLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className='flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
					<div className='flex items-center gap-2 px-4'>
						<SidebarTrigger className='-ml-1' />
						<Separator orientation='vertical' className='mr-2 h-4' />
						<Breadcrumb>
							<BreadcrumbDynamic />
						</Breadcrumb>
					</div>
					<LogoutButton />
				</header>
				<div className='p-4'>{children}</div>
			</SidebarInset>
		</SidebarProvider>
	)
}

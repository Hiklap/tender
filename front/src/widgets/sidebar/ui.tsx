import * as React from 'react'

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarRail,
	ToggleTheme
} from '@/shared/ui'
import { ChevronRight, CircleUserRound, Dumbbell, Shield } from 'lucide-react'
import Link from 'next/link'
import { cookies } from 'next/headers'

const data = {
	main: [
		{
			name: 'Профиль',
			icon: CircleUserRound,
			items: [
				{
					title: 'Личные данные',
					url: '/personal'
				},
				{
					title: 'Расписание',
					url: '/schedule'
				}
				// {
				// 	title: 'Статистика',
				// 	url: '/stats'
				// }
			]
		}
	],
	second: [
		// {
		// 	name: 'Тренера',
		// 	url: '/trainer',
		// 	icon: Dumbbell
		// },
		// {
		// 	name: 'Новости',
		// 	url: '/news',
		// 	icon: Newspaper
		// }
		{
			name: 'Администратор',
			url: '/admin',
			icon: Shield
		}
	]
}

export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const token = (await cookies()).get('token')?.value

	const user = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/profile`, {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json'
		}
	}).then((res) => res.json())

	console.log(user)

	return (
		<Sidebar collapsible='icon' {...props}>
			<SidebarContent>
				<SidebarGroup className='group-data-[collapsible=icon]:block'>
					<SidebarGroupLabel>Главное</SidebarGroupLabel>
					<SidebarMenu>
						{data.main.map((item) => (
							<Collapsible key={item.name} asChild defaultOpen className='group/collapsible'>
								<SidebarMenuItem>
									<CollapsibleTrigger asChild>
										<SidebarMenuButton tooltip={item.name}>
											{item.icon && <item.icon />}
											<span>{item.name}</span>
											<ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
										</SidebarMenuButton>
									</CollapsibleTrigger>
									<CollapsibleContent>
										<SidebarMenuSub>
											{item.items?.map((subItem) => (
												<SidebarMenuSubItem key={subItem.title}>
													<SidebarMenuSubButton asChild>
														<Link href={subItem.url}>
															<span>{subItem.title}</span>
														</Link>
													</SidebarMenuSubButton>
												</SidebarMenuSubItem>
											))}
										</SidebarMenuSub>
									</CollapsibleContent>
								</SidebarMenuItem>
							</Collapsible>
						))}
						{user.data.user.role === 'admin' &&
							data.second.map((item) => (
								<SidebarMenuItem key={item.name}>
									<SidebarMenuButton asChild>
										<Link href={item.url}>
											<item.icon />
											<span>{item.name}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarGroupLabel className='truncate'>Сменить тему</SidebarGroupLabel>
				<SidebarMenu>
					<SidebarMenuItem>
						<ToggleTheme />
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	)
}

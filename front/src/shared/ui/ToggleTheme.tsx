'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './DropdownMenu'
import { SidebarMenuButton } from './Sidebar'

export function ToggleTheme() {
	const { setTheme } = useTheme()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<SidebarMenuButton
					size='lg'
					className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
				>
					<div className='flex h-8 min-w-8 items-center justify-center rounded-lg'>
						<Sun className='h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
						<Moon className='absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
					</div>
					<div className='grid flex-1 text-left text-sm leading-tight'>
						<span className='truncate'>Изменить тему</span>
					</div>
				</SidebarMenuButton>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuItem onClick={() => setTheme('light')}>Светлая</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('dark')}>Темная</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

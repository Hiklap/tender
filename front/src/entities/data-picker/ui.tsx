'use client'

import * as React from 'react'
import { addDays, format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { DateRange } from 'react-day-picker'
import { ru } from 'date-fns/locale'

import { cn } from '@/shared/utils'
import { Button, Calendar, Popover, PopoverContent, PopoverTrigger } from '@/shared/ui'

export function DatePickerWithRange({ className }: React.HTMLAttributes<HTMLDivElement>) {
	const [date, setDate] = React.useState<DateRange | undefined>({
		from: new Date(),
		to: addDays(new Date(), 7)
	})

	return (
		<div className={cn('grid gap-2', className)}>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						id='date'
						variant={'outline'}
						className={cn('w-[300px] justify-start text-left font-normal', !date && 'text-muted-foreground')}
					>
						<CalendarIcon />
						{date?.from ? (
							date.to ? (
								<>
									{format(date.from, 'd.MM.y', { locale: ru })} - {format(date.to, 'd.MM.y', { locale: ru })}
								</>
							) : (
								format(date.from, 'd.MM.y', { locale: ru })
							)
						) : (
							<span>Выбрать день</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className='w-auto p-0' align='start'>
					<Calendar initialFocus mode='range' defaultMonth={date?.from} selected={date} onSelect={setDate} max={7} locale={ru} />
				</PopoverContent>
			</Popover>
		</div>
	)
}

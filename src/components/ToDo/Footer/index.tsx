import { useState, useCallback, useContext } from 'react'
import { TasksContext } from '../../../contexts/TasksContext'

export type FilterProps = 'all' | 'active' | 'completed'

const filterButtonStyles = (isActive: boolean) =>
	`text-default-dark-grayish-blue  ${
		isActive && 'text-primary-bright-blue'
	}`

export function Footer() {
	const { filterTasks } = useContext(TasksContext)
	const [filter, setFilter] = useState<FilterProps>('all')

	const handleFilterChange = useCallback(
		(newFilter: FilterProps) => {
			setFilter(newFilter)
			filterTasks(newFilter)
		},
		[filterTasks],
	)

	return (
		<>
			<footer className='mt-4 flex items-center justify-around rounded-lg bg-default-very-light-grayish-blue p-4 text-sm font-bold text-default-dark-grayish-blue lg:text-lg dark:bg-dark-very-dark-desaturated-blue'>
				<button
					aria-label='Show all tasks'
					className={filterButtonStyles(filter === 'all')}
					onClick={() => handleFilterChange('all')}
				>
					All
				</button>
				<button
					aria-label='Show only active tasks'
					className={filterButtonStyles(filter === 'active')}
					onClick={() => handleFilterChange('active')}
				>
					Active
				</button>
				<button
					aria-label='Show only completed tasks'
					className={filterButtonStyles(filter === 'completed')}
					onClick={() => handleFilterChange('completed')}
				>
					Completed
				</button>
			</footer>
			<p className='mx-auto mt-4 w-fit text-default-dark-grayish-blue'>
				Drag and drop to reorder list
			</p>
		</>
	)
}

import { useContext, useState } from 'react'

import { v4 as uuidv4 } from 'uuid'

import { TasksContext } from '../../../contexts/TasksContext'

import { InputShowProps, Task } from './Task'

export function Tasks() {
	const {
		tasks,
		setTasks,
		tasksLeft,
		currentFilter,
		clearDoneTodos,
	} = useContext(TasksContext)

	const [task, setTask] = useState('')

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		const validInput = task.trim()

		if (validInput.length > 0) {
			const newTask: InputShowProps = {
				id: uuidv4(),
				type: 'show',
				description: validInput,
				done: false,
			}

			setTasks([...tasks, newTask])
			setTask('')
		}
	}

	const filteredTasks = tasks.filter((task) => {
		if (currentFilter === 'active') return !task.done
		if (currentFilter === 'completed') return task.done
		return true // 'all' filter
	})

	function swapTasks(
		tasks: InputShowProps[],
		draggedId: string,
		targetId: string,
	) {
		const updatedTasks = [...tasks]
		const draggedIndex = updatedTasks.findIndex(
			(t) => t.id === draggedId,
		)
		const targetIndex = updatedTasks.findIndex(
			(t) => t.id === targetId,
		)

		if (draggedIndex !== -1 && targetIndex !== -1) {
			;[updatedTasks[draggedIndex], updatedTasks[targetIndex]] = [
				updatedTasks[targetIndex],
				updatedTasks[draggedIndex],
			]
		}

		return updatedTasks
	}

	return (
		<form
			className='flex w-full flex-col gap-6 text-default-very-dark-grayish-blue lg:text-xl dark:text-default-light-grayish-blue'
			onSubmit={(e) => handleSubmit(e)}
		>
			<Task
				id='todoInput'
				type='add'
				className='rounded-lg'
				value={task}
				onChange={(e) =>
					setTask((e.target as HTMLInputElement).value)
				}
			/>
			<ul className='max-h-80 overflow-y-scroll'>
				{filteredTasks.map((task, index) => (
					<li
						key={task.id}
						onDrop={(e) => {
							e.preventDefault()
							const draggedId = e.dataTransfer.getData('text')
							const targetId = task.id

							const newTasks = swapTasks(tasks, draggedId, targetId)
							setTasks(newTasks)
						}}
						onDragOver={(e) => {
							e.preventDefault()
						}}
						className='border-b-[1px] border-default-dark-grayish-blue lg:border-b-2 dark:border-dark-very-dark-grayish-blue-1'
					>
						<Task
							id={task.id}
							type='show'
							done={task.done}
							description={task.description}
							className={
								index === 0 ? 'rounded-t-lg' : 'rounded-none'
							}
						/>
					</li>
				))}
			</ul>
			<section className='-mt-6 flex items-center justify-between rounded-b-lg bg-default-very-light-grayish-blue p-4 text-sm text-default-dark-grayish-blue lg:text-lg dark:bg-dark-very-dark-desaturated-blue'>
				<p>{tasksLeft} items left</p>
				<button type='button' onClick={() => clearDoneTodos()}>
					Clear Completed
				</button>
			</section>
		</form>
	)
}

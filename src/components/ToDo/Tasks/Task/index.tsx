import { twMerge } from 'tailwind-merge'
import { FaCheck } from 'react-icons/fa'
import { IoCloseOutline } from 'react-icons/io5'
import { useContext, useEffect, useState } from 'react'
import { TasksContext } from '../../../../contexts/TasksContext'

interface InputAddProps extends React.HTMLProps<HTMLInputElement> {
	id: string
	type: 'add'
}

export type InputShowProps = {
	type: 'show'

	id: string
	description: string
	done: boolean
}

type descriptionProps = {
	id: string
	className?: string
} & (InputAddProps | InputShowProps)

export function Task(props: descriptionProps) {
	const { deleteTask, updateTask } = useContext(TasksContext)
	const [isChecked, setIsChecked] = useState(false)

	useEffect(() => {
		if (props.type === 'show') {
			setIsChecked(props.done)
		}
	}, [])

	useEffect(() => {
		if (props.type === 'show') {
			updateTask(props.id, isChecked)
		}
	}, [isChecked])

	const handleCheckboxChange = () => {
		setIsChecked(!isChecked)
	}

	function handleDragStart(e: React.DragEvent<HTMLDivElement>) {
		e.dataTransfer.setData('text', props.id)
	}

	return (
		<div
			id={props.id}
			onDragStart={(e) => handleDragStart(e)}
			draggable={props.type === 'show'}
			className={twMerge(
				'flex items-center justify-between bg-default-very-light-grayish-blue p-4 dark:bg-dark-very-dark-desaturated-blue',
				props.className,
			)}
		>
			<label
				className={`relative flex w-full cursor-pointer items-center pl-9 ${
					isChecked && props.type === 'show' && 'line-through'
				}`}
			>
				{props.type === 'show' && props.description}
				{props.type === 'show' ? (
					<input
						type='checkbox'
						className='absolute h-0 w-0 cursor-pointer opacity-0'
						checked={isChecked}
						onChange={() => handleCheckboxChange()}
					/>
				) : (
					<>
						<input
							type='checkbox'
							className='absolute h-0 w-0 cursor-pointer opacity-0'
							checked={false}
							readOnly
						/>

						{props.type === 'add' && (
							<input
								type='text'
								className='w-full bg-transparent focus:outline-0'
								placeholder='Create a new todo...'
								value={props.value}
								onChange={props.onChange}
							/>
						)}
					</>
				)}

				<span
					className={`absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full border border-dark-very-dark-grayish-blue-1 ${
						isChecked && props.type === 'show'
							? 'from bg-gradient-to-r from-primary-very-light-blue to-primary-dark-purple'
							: 'bg-transparent'
					}`}
				>
					{isChecked && props.type === 'show' && (
						<FaCheck className='h-3 w-3 text-white' />
					)}
				</span>
			</label>
			{props.type === 'show' && (
				<button
					type='button'
					className='hover:opacity-80'
					onClick={() => deleteTask(props.id)}
				>
					<IoCloseOutline />
				</button>
			)}
		</div>
	)
}

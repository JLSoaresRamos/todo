import {
	createContext,
	useState,
	Dispatch,
	SetStateAction,
	useEffect,
} from 'react'
import { InputShowProps } from '../components/ToDo/Tasks/Task'
import { FilterProps } from '../components/ToDo/Footer'

type TaskProviderProps = {
	children: React.ReactNode
}

type ContextValuesProps = {
	tasks: InputShowProps[]
	tasksLeft: number
	currentFilter: FilterProps
	setTasks: Dispatch<SetStateAction<InputShowProps[]>>
	deleteTask: (id: string) => void
	updateTask: (id: string, taskState: boolean) => void
	filterTasks: (filter: FilterProps) => void
	clearDoneTodos: () => void
}

const defaultContextValue: ContextValuesProps = {
	tasks: [],
	tasksLeft: 0,
	currentFilter: 'all',
	clearDoneTodos: () => {},
	setTasks: () => {},
	deleteTask: () => {},
	updateTask: () => {},
	filterTasks: () => {},
}

export const TasksContext = createContext<ContextValuesProps>(
	defaultContextValue,
)

export function TaskProvider({ children }: TaskProviderProps) {
	const [tasks, setTasks] = useState<InputShowProps[]>([])
	const [currentFilter, setCurrentFilter] =
		useState<FilterProps>('all')
	const [tasksLeft, setTasksLeft] = useState(0)

	useEffect(() => {
		const loadedTasks = localStorage.getItem('tasks')
		if (loadedTasks) {
			setTasks(JSON.parse(loadedTasks))
		}
	}, [])

	useEffect(() => {
		let tasksToDo = tasks.filter((task) => task.done === false).length
		setTasksLeft(tasksToDo)

		if (tasks.length > 0) {
			localStorage.setItem('tasks', JSON.stringify(tasks))
		} else {
			localStorage.removeItem('tasks')
		}
	}, [tasks])

	function filterTasks(filter: FilterProps) {
		setCurrentFilter(filter)
	}

	function clearDoneTodos() {
		let tasksToDo = tasks.filter((task) => task.done === false)
		setTasks(tasksToDo)
	}

	function deleteTask(id: string) {
		setTasks((prevTasks) =>
			prevTasks.filter((task) => task.id !== id),
		)
	}

	function updateTask(id: string, taskState: boolean) {
		setTasks((prevTasks) => {
			return prevTasks.map((task) => {
				if (task.id === id) {
					return { ...task, done: taskState }
				}
				return task
			})
		})
	}

	const contextValue = {
		tasks,
		tasksLeft,
		currentFilter,
		setTasks,
		deleteTask,
		updateTask,
		filterTasks,
		clearDoneTodos,
	}

	return (
		<TasksContext.Provider value={contextValue}>
			{children}
		</TasksContext.Provider>
	)
}

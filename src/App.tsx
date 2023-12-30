import { ToDo } from './components/ToDo'

function App() {
	return (
		<>
			<main className='h-screen w-screen overflow-x-hidden'>
				<div
					id='background-image'
					className='-z-10 h-[40%] w-full bg-default-mobile bg-cover md:bg-default-desktop dark:bg-dark-mobile md:dark:bg-dark-desktop'
				></div>
				<ToDo />
			</main>
		</>
	)
}

export default App

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { IconContext } from 'react-icons'
import { TaskProvider } from './contexts/TasksContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<IconContext.Provider
			value={{
				className: 'w-5 h-5 fill-white lg:w-8 lg:h-8',
			}}
		>
			<TaskProvider>
				<App />
			</TaskProvider>
		</IconContext.Provider>
	</React.StrictMode>,
)

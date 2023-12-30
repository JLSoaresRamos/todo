import { useEffect, useState } from 'react'

import { IoMoon, IoSunny } from 'react-icons/io5'

type ThemeProps = '' | 'dark' | 'light'

export function Header() {
	const [theme, setTheme] = useState<ThemeProps>('')

	useEffect(() => {
		const theme = document.documentElement.classList.contains('dark')
			? 'dark'
			: 'light'

		setTheme(theme)
	}, [])

	function handleToggle() {
		const htmlDocumentClass = document.documentElement.classList

		if (theme === 'dark') {
			setTheme('light')
			htmlDocumentClass.remove('dark')
			htmlDocumentClass.add('light')
			localStorage.theme = 'light'
		} else {
			setTheme('dark')
			htmlDocumentClass.remove('light')
			htmlDocumentClass.add('dark')
			localStorage.theme = 'dark'
		}
	}

	return (
		<header className='flex items-center justify-between bg-transparent text-white'>
			<h1 className='text-3xl tracking-[0.4rem] lg:text-4xl'>TODO</h1>
			<button
				aria-label='Toggle theme'
				onClick={() => handleToggle()}
			>
				{theme === 'dark' ? <IoMoon /> : <IoSunny />}
			</button>
		</header>
	)
}

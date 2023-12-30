import { Footer } from './Footer'
import { Header } from './Header'
import { Tasks } from './Tasks'

export function ToDo() {
	return (
		<div className='mx-auto -mt-40 w-4/5 py-4 md:max-w-screen-sm'>
			<Header />
			<Tasks />
			<Footer />
		</div>
	)
}

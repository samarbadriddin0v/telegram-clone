import { Loader2 } from 'lucide-react'
import ContactList from './_components/contact-list'

const HomePage = () => {
	return (
		<>
			{/* Sidebar */}
			<div className='w-80 h-screen border-r fixed inset-0 z-50'>
				{/* Loading */}
				{/* <div className='w-full h-[95vh] flex justify-center items-center'>
					<Loader2 size={50} className='animate-spin' />
				</div> */}

				{/* Contact list */}
				<ContactList contacts={contacts} />
			</div>
			{/* Chat area */}
		</>
	)
}

const contacts = [
	{ email: 'john@gmail.com', _id: '1', avatar: 'https://github.com/shadcn.png' },
	{ email: 'amile@gmail.com', _id: '2' },
	{ email: 'faris@gmail.com', _id: '3' },
	{ email: 'abdo@gmail.com', _id: '4' },
	{ email: 'billi@gmail.com', _id: '5' },
]

export default HomePage

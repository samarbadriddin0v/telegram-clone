'use client'

import { IUser } from '@/types'
import React, { FC, useState } from 'react'
import Settings from './settings'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useRouter } from 'next/navigation'
import { cn, sliceText } from '@/lib/utils'
import { useCurrentContact } from '@/hooks/use-current'
import { useAuth } from '@/hooks/use-auth'
import { format } from 'date-fns'
import { CONST } from '@/lib/constants'

interface Props {
	contacts: IUser[]
}
const ContactList: FC<Props> = ({ contacts }) => {
	const [query, setQuery] = useState('')

	const { onlineUsers } = useAuth()
	const router = useRouter()
	const { setCurrentContact, currentContact } = useCurrentContact()

	const filteredContacts = contacts.filter(contact => contact.email.toLowerCase().includes(query.toLowerCase()))

	const renderContact = (contact: IUser) => {
		const onChat = () => {
			if (currentContact?._id === contact._id) return
			setCurrentContact(contact)
			router.push(`/?chat=${contact._id}`)
		}

		return (
			<div
				className={cn(
					'flex justify-between items-center cursor-pointer hover:bg-secondary/50 p-2',
					currentContact?._id === contact._id && 'bg-secondary/50'
				)}
				onClick={onChat}
			>
				<div className='flex items-center gap-2'>
					<div className='relative'>
						<Avatar className='z-40'>
							<AvatarImage src={contact.avatar} alt={contact.email} className='object-cover' />
							<AvatarFallback className='uppercase'>{contact.email[0]}</AvatarFallback>
						</Avatar>
						{onlineUsers.some(user => user._id === contact._id) && (
							<div className='size-3 bg-green-500 absolute rounded-full bottom-0 right-0 !z-50' />
						)}
					</div>

					<div>
						<h2 className='capitalize line-clamp-1 text-sm'>{contact.email.split('@')[0]}</h2>
						<p
							className={cn(
								'text-xs line-clamp-1',
								contact.lastMessage
									? contact.lastMessage.status !== CONST.READ
										? 'text-foreground'
										: 'text-muted-foreground'
									: 'text-muted-foreground'
							)}
						>
							{contact.lastMessage ? sliceText(contact.lastMessage.text, 25) : 'No messages yet'}
						</p>
					</div>
				</div>
				{contact.lastMessage && (
					<div className='self-end'>
						<p className='text-xs text-muted-foreground'>{format(contact.lastMessage.updatedAt, 'hh:mm a')}</p>
					</div>
				)}
			</div>
		)
	}

	return (
		<>
			{/* Top bar */}
			<div className='flex items-center bg-background pl-2 sticky top-0'>
				<Settings />
				<div className='m-2 w-full'>
					<Input
						className='bg-secondary'
						value={query}
						onChange={e => setQuery(e.target.value)}
						type='text'
						placeholder='Search...'
					/>
				</div>
			</div>

			{filteredContacts.length === 0 ? (
				<div className='w-full h-[95vh] flex justify-center items-center text-center text-muted-foreground'>
					<p>Contact list is empty</p>
				</div>
			) : (
				filteredContacts.map(contact => <div key={contact._id}>{renderContact(contact)}</div>)
			)}
		</>
	)
}

export default ContactList

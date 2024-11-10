import { useCurrentContact } from '@/hooks/use-current'
import { cn } from '@/lib/utils'
import { IMessage } from '@/types'
import { FC } from 'react'

interface Props {
	message: IMessage
}
const MessageCard: FC<Props> = ({ message }) => {
	const { currentContact } = useCurrentContact()

	return (
		<div
			className={cn(
				'm-2.5 font-medium text-xs flex',
				message.receiver._id === currentContact?._id ? 'justify-start' : 'justify-end'
			)}
		>
			<div
				className={cn(
					'relative inline p-2 pl-2.5 pr-12 max-w-full',
					message.receiver._id === currentContact?._id ? 'bg-primary' : 'bg-secondary'
				)}
			>
				<p className='text-sm text-white'>{message.text}</p>
				<span className='text-xs right-1 bottom-0 absolute opacity-60'>✓</span>
			</div>
		</div>
	)
}

export default MessageCard

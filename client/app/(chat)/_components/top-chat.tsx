import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useCurrentContact } from '@/hooks/use-current'
import { Settings2 } from 'lucide-react'

const TopChat = () => {
	const { currentContact } = useCurrentContact()

	return (
		<div className='w-full flex items-center justify-between sticky top-0 z-50 h-[8vh] p-2 border-b bg-background'>
			<div className='flex items-center'>
				<Avatar className='z-40'>
					<AvatarImage src={currentContact?.avatar} alt={currentContact?.email} className='object-cover' />
					<AvatarFallback className='uppercase'>{currentContact?.email[0]}</AvatarFallback>
				</Avatar>
				<div className='ml-2'>
					<h2 className='font-medium text-sm'>{currentContact?.email}</h2>
					{/* IsTyping */}
					{/* <div className='text-xs flex items-center gap-1 text-muted-foreground'>
						<p className='text-secondary-foreground animate-pulse line-clamp-1'>Hello world</p>
						<div className='self-end mb-1'>
							<div className='flex justify-center items-center gap-1'>
								<div className='w-1 h-1 bg-secondary-foreground rounded-full animate-bounce [animation-delay:-0.3s]'></div>
								<div className='w-1 h-1 bg-secondary-foreground rounded-full animate-bounce [animation-delay:-0.10s]'></div>
								<div className='w-1 h-1 bg-secondary-foreground rounded-full animate-bounce [animation-delay:-0.15s]'></div>
							</div>
						</div>
					</div> */}
					<p className='text-xs'>
						{/* Online */}
						{/* <span className='text-green-500'>●</span> Online */}
						{/* Offline */}
						<span className='text-muted-foreground'>●</span> Last seen recently
					</p>
				</div>
			</div>

			<Button size={'icon'} variant={'secondary'}>
				<Settings2 />
			</Button>
		</div>
	)
}

export default TopChat

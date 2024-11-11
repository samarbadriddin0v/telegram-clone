import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { useAuth } from '@/hooks/use-auth'
import { useCurrentContact } from '@/hooks/use-current'
import { useLoading } from '@/hooks/use-loading'
import { sliceText } from '@/lib/utils'
import { IMessage } from '@/types'
import { Settings2 } from 'lucide-react'
import Image from 'next/image'
import { FC } from 'react'

interface Props {
	messages: IMessage[]
}
const TopChat: FC<Props> = ({ messages }) => {
	const { currentContact } = useCurrentContact()
	const { onlineUsers } = useAuth()
	const { typing } = useLoading()

	return (
		<div className='w-full flex items-center justify-between sticky top-0 z-50 h-[8vh] p-2 border-b bg-background'>
			<div className='flex items-center'>
				<Avatar className='z-40'>
					<AvatarImage src={currentContact?.avatar} alt={currentContact?.email} className='object-cover' />
					<AvatarFallback className='uppercase'>{currentContact?.email[0]}</AvatarFallback>
				</Avatar>
				<div className='ml-2'>
					<h2 className='font-medium text-sm'>{currentContact?.email}</h2>

					{currentContact?._id === typing?.sender?._id
						? typing?.message.length > 0 && (
								<div className='text-xs flex items-center gap-1 text-muted-foreground'>
									<p className='text-secondary-foreground animate-pulse line-clamp-1'>{sliceText(typing?.message, 20)}</p>
									<div className='self-end mb-1'>
										<div className='flex justify-center items-center gap-1'>
											<div className='w-1 h-1 bg-secondary-foreground rounded-full animate-bounce [animation-delay:-0.3s]'></div>
											<div className='w-1 h-1 bg-secondary-foreground rounded-full animate-bounce [animation-delay:-0.10s]'></div>
											<div className='w-1 h-1 bg-secondary-foreground rounded-full animate-bounce [animation-delay:-0.15s]'></div>
										</div>
									</div>
								</div>
						  )
						: typing.message && (
								<p className='text-xs'>
									{onlineUsers.some(user => user._id === currentContact?._id) ? (
										<>
											<span className='text-green-500'>●</span> Online
										</>
									) : (
										<>
											<span className='text-muted-foreground'>●</span> Last seen recently
										</>
									)}
								</p>
						  )}

					{!typing.message && (
						<p className='text-xs'>
							{onlineUsers.some(user => user._id === currentContact?._id) ? (
								<>
									<span className='text-green-500'>●</span> Online
								</>
							) : (
								<>
									<span className='text-muted-foreground'>●</span> Last seen recently
								</>
							)}
						</p>
					)}
				</div>
			</div>

			<Sheet>
				<SheetTrigger asChild>
					<Button size={'icon'} variant={'secondary'}>
						<Settings2 />
					</Button>
				</SheetTrigger>
				<SheetContent className='w-80 max-md:w-full p-2 overflow-y-scroll sidebar-custom-scrollbar'>
					<SheetHeader>
						<SheetTitle />
					</SheetHeader>
					<div className='mx-auto w-1/2 max-md:w-1/4 h-36 relative'>
						<Avatar className='w-full h-36'>
							<AvatarImage src={currentContact?.avatar} alt={currentContact?.email} className='object-cover' />
							<AvatarFallback className='text-6xl uppercase font-spaceGrotesk'>{currentContact?.email[0]}</AvatarFallback>
						</Avatar>
					</div>

					<Separator className='my-2' />

					<h1 className='text-center capitalize font-spaceGrotesk text-xl'>{currentContact?.email}</h1>

					<div className='flex flex-col space-y-1'>
						{currentContact?.firstName && (
							<div className='flex items-center gap-1 mt-4'>
								<p className='font-spaceGrotesk'>First Name: </p>
								<p className='font-spaceGrotesk text-muted-foreground'>{currentContact?.firstName}</p>
							</div>
						)}
						{currentContact?.lastName && (
							<div className='flex items-center gap-1 mt-4'>
								<p className='font-spaceGrotesk'>Last Name: </p>
								<p className='font-spaceGrotesk text-muted-foreground'>{currentContact?.lastName}</p>
							</div>
						)}
						{currentContact?.bio && (
							<div className='flex items-center gap-1 mt-4'>
								<p className='font-spaceGrotesk'>
									About: <span className='font-spaceGrotesk text-muted-foreground'>{currentContact?.bio}</span>
								</p>
							</div>
						)}

						<Separator className='my-2' />

						<h2 className='text-xl'>Image</h2>
						<div className='flex flex-col space-y-2'>
							{messages
								.filter(msg => msg.image)
								.map(msg => (
									<div className='w-full h-36 relative' key={msg._id}>
										<Image src={msg.image} alt={msg._id} fill className='object-cover rounded-md' />
									</div>
								))}
						</div>
					</div>
				</SheetContent>
			</Sheet>
		</div>
	)
}

export default TopChat

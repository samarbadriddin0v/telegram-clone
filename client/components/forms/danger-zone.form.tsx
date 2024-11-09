import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { confirmTextSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { generateToken } from '@/lib/generate-token'
import { signOut, useSession } from 'next-auth/react'
import { useMutation } from '@tanstack/react-query'
import { axiosClient } from '@/http/axios'

const DangerZoneForm = () => {
	const { data: session } = useSession()

	const form = useForm<z.infer<typeof confirmTextSchema>>({
		resolver: zodResolver(confirmTextSchema),
		defaultValues: { confirmText: '' },
	})

	const { mutate, isPending } = useMutation({
		mutationFn: async () => {
			const token = await generateToken(session?.currentUser?._id)
			const { data } = await axiosClient.delete('/api/user', { headers: { Authorization: `Bearer ${token}` } })
			return data
		},
		onSuccess: () => {
			signOut()
		},
	})

	function onSubmit() {
		mutate()
	}
	return (
		<>
			<p className='text-xs text-muted-foreground text-center'>
				Are you sure you want to delete your account? This action cannot be undone.
			</p>

			<Dialog>
				<DialogTrigger asChild>
					<Button className='mt-2 w-full font-spaceGrotesk font-bold' variant={'destructive'}>
						Delete permenantly
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Are you absolutely sure?</DialogTitle>
						<DialogDescription>
							This action cannot be undone. This will permanently delete your account and remove your data from our servers.
						</DialogDescription>
					</DialogHeader>
					<Separator />
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
							<FormField
								control={form.control}
								name='confirmText'
								render={({ field }) => (
									<FormItem>
										<FormDescription>
											Please type <span className='font-bold'>DELETE</span> to confirm.
										</FormDescription>
										<FormControl>
											<Input className='bg-secondary' disabled={isPending} {...field} />
										</FormControl>
										<FormMessage className='text-xs text-red-500' />
									</FormItem>
								)}
							/>
							<Button className='w-full font-bold' disabled={isPending}>
								Submit
							</Button>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		</>
	)
}

export default DangerZoneForm

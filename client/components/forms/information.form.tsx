import { profileSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { useMutation } from '@tanstack/react-query'
import { axiosClient } from '@/http/axios'
import { toast } from '@/hooks/use-toast'
import { useSession } from 'next-auth/react'
import { generateToken } from '@/lib/generate-token'

const InformationForm = () => {
	const { data: session, update } = useSession()

	const form = useForm<z.infer<typeof profileSchema>>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			firstName: session?.currentUser?.firstName,
			lastName: session?.currentUser?.lastName,
			bio: session?.currentUser?.bio,
		},
	})

	const { mutate, isPending } = useMutation({
		mutationFn: async (payload: z.infer<typeof profileSchema>) => {
			const token = await generateToken(session?.currentUser?._id)
			const { data } = await axiosClient.put('/api/user/profile', payload, { headers: { Authorization: `Bearer ${token}` } })
			return data
		},
		onSuccess: () => {
			toast({ description: 'Profile updated successfully' })
			update()
		},
	})

	const onSubmit = (data: z.infer<typeof profileSchema>) => {
		mutate(data)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
				<FormField
					control={form.control}
					name='firstName'
					render={({ field }) => (
						<FormItem>
							<Label>First name</Label>
							<FormControl>
								<Input placeholder='Oman' className='bg-secondary' disabled={isPending} {...field} />
							</FormControl>
							<FormMessage className='text-xs text-red-500' />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='lastName'
					render={({ field }) => (
						<FormItem>
							<Label>Last name</Label>
							<FormControl>
								<Input placeholder='Ali' className='bg-secondary' disabled={isPending} {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='bio'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Bio</FormLabel>
							<FormControl>
								<Textarea placeholder='Enter anyhting about yourself' className='bg-secondary' disabled={isPending} {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<Button type='submit' className='w-full' disabled={isPending}>
					Submit
				</Button>
			</form>
		</Form>
	)
}

export default InformationForm

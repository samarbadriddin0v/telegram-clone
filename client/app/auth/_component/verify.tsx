import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/use-auth'
import { toast } from '@/hooks/use-toast'
import { axiosClient } from '@/http/axios'
import { otpSchema } from '@/lib/validation'
import { IUser } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { REGEXP_ONLY_DIGITS } from 'input-otp'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { signIn } from 'next-auth/react'

const Verify = () => {
	const { email } = useAuth()

	const form = useForm<z.infer<typeof otpSchema>>({
		resolver: zodResolver(otpSchema),
		defaultValues: { email, otp: '	' },
	})

	const { mutate, isPending } = useMutation({
		mutationFn: async (otp: string) => {
			const { data } = await axiosClient.post<{ user: IUser }>('/api/auth/verify', { email, otp })
			return data
		},
		onSuccess: ({ user }) => {
			signIn('credentials', { email: user.email, callbackUrl: '/' })
			toast({ description: 'Successfully verified' })
		},
	})

	function onSubmit(values: z.infer<typeof otpSchema>) {
		mutate(values.otp)
	}

	return (
		<div className='w-full'>
			<p className='text-center text-muted-foreground text-sm'>
				We have sent you an email with a verification code to your email address. Please enter the code below.
			</p>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-2'>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<Label>Email</Label>
								<FormControl>
									<Input placeholder='info@sammi.ac' disabled className='h-10 bg-secondary' {...field} />
								</FormControl>
								<FormMessage className='text-xs text-red-500' />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='otp'
						render={({ field }) => (
							<FormItem>
								<Label>One-Time Password</Label>
								<FormControl>
									<InputOTP maxLength={6} className='w-full' pattern={REGEXP_ONLY_DIGITS} disabled={isPending} {...field}>
										<InputOTPGroup className='w-full '>
											<InputOTPSlot index={0} className='w-full dark:bg-primary-foreground bg-secondary' />
											<InputOTPSlot index={1} className='w-full dark:bg-primary-foreground bg-secondary' />
											<InputOTPSlot index={2} className='w-full dark:bg-primary-foreground bg-secondary' />
										</InputOTPGroup>
										<InputOTPSeparator />
										<InputOTPGroup className='w-full '>
											<InputOTPSlot index={3} className='w-full dark:bg-primary-foreground bg-secondary' />
											<InputOTPSlot index={4} className='w-full dark:bg-primary-foreground bg-secondary' />
											<InputOTPSlot index={5} className='w-full dark:bg-primary-foreground bg-secondary' />
										</InputOTPGroup>
									</InputOTP>
								</FormControl>
								<FormMessage className='text-xs text-red-500' />
							</FormItem>
						)}
					/>

					<Button type='submit' className='w-full' size={'lg'} disabled={isPending}>
						Submit
					</Button>
				</form>
			</Form>
		</div>
	)
}

export default Verify

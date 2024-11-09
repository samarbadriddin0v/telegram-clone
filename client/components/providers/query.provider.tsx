'use client'

import { toast } from '@/hooks/use-toast'
import { ChildProps, IError } from '@/types'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FC } from 'react'

const handleQueryError = (error: Error | IError) => {
	if ((error as IError).response?.data?.message) {
		return toast({ description: (error as IError).response.data.message, variant: 'destructive' })
	}
	return toast({ description: 'Something went wrong', variant: 'destructive' })
}

const queryClient = new QueryClient({
	defaultOptions: {
		mutations: { onError: handleQueryError },
	},
})

const QueryProvider: FC<ChildProps> = ({ children }) => {
	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default QueryProvider

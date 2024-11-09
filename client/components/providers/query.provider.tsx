'use client'

import { ChildProps } from '@/types'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FC } from 'react'

const queryClient = new QueryClient()

const QueryProvider: FC<ChildProps> = ({ children }) => {
	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default QueryProvider

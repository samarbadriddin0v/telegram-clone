'use client'

import { ChildProps } from '@/types'
import { SessionProvider as Session } from 'next-auth/react'
import { FC } from 'react'

const SessionProvider: FC<ChildProps> = ({ children }) => {
	return <Session>{children}</Session>
}

export default SessionProvider

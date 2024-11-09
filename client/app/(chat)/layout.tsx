import { authOptions } from '@/lib/auth-options'
import { ChildProps } from '@/types'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { FC } from 'react'

const Layout: FC<ChildProps> = async ({ children }) => {
	const session = await getServerSession(authOptions)
	if (!session) return redirect('/auth')

	return <div>{children}</div>
}

export default Layout

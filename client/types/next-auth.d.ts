import { DefaultSession } from 'next-auth'
import { IUser } from '.'

declare module 'next-auth' {
	interface Session {
		currentUser?: IUser
		user: {} & DefaultSession['user']
	}
}

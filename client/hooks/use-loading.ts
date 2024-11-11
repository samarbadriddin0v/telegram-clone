import { IUser } from '@/types'
import { create } from 'zustand'

type Store = {
	isCreating: boolean
	setCreating: (isCreating: boolean) => void
	isLoading: boolean
	setLoading: (isLoading: boolean) => void
	loadMessages: boolean
	setLoadMessages: (loadMessages: boolean) => void
	typing: { sender: IUser | null; message: string }
	setTyping: (typing: { sender: IUser | null; message: string }) => void
}

export const useLoading = create<Store>()(set => ({
	isCreating: false,
	setCreating: isCreating => set({ isCreating }),
	isLoading: false,
	setLoading: isLoading => set({ isLoading }),
	loadMessages: false,
	setLoadMessages: loadMessages => set({ loadMessages }),
	typing: { sender: null, message: '' },
	setTyping: typing => set({ typing }),
}))

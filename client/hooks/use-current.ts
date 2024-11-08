import { IUser } from '@/types'
import { create } from 'zustand'

type Store = {
	currentContact: IUser | null
	setCurrentContact: (contact: IUser | null) => void
}

export const useCurrentContact = create<Store>()(set => ({
	currentContact: null,
	setCurrentContact: contact => set({ currentContact: contact }),
}))

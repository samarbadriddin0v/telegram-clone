import { IMessage, IUser } from '@/types'
import { create } from 'zustand'

type Store = {
	currentContact: IUser | null
	setCurrentContact: (contact: IUser | null) => void
	editedMessage: IMessage | null
	setEditedMessage: (message: IMessage | null) => void
}

export const useCurrentContact = create<Store>()(set => ({
	currentContact: null,
	setCurrentContact: contact => set({ currentContact: contact }),
	editedMessage: null,
	setEditedMessage: message => set({ editedMessage: message }),
}))

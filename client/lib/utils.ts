import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const getSoundLabel = (value?: string) => {
	switch (value) {
		case 'notification.mp3':
			return 'Apple'
		case 'notification2.mp3':
			return 'Sammish'
		case 'sending.mp3':
			return 'Belli'
		case 'sending2.mp3':
			return 'Oranger'
		default:
			return ''
	}
}

export const sliceText = (text: string, length: number) => {
	return text.length > length ? `${text.slice(0, length)}...` : text
}

'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import NoSSR from 'react-no-ssr'

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
	return (
		<NextThemesProvider {...props}>
			<NoSSR>{children}</NoSSR>
		</NextThemesProvider>
	)
}

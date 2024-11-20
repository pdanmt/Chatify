import { RouterProvider } from 'react-router-dom'
import { AppRoutes } from './router'
import { ChakraProvider } from '@chakra-ui/react'
import { DarkTheme } from './themes/dark-theme'
import { UserContextProvider } from './contexts/user-context'
import { Toaster } from 'sonner'
import { ThemeContext } from './contexts/theme-context'
import { LightTheme } from './themes/light-theme'

export function App() {
  const { theme } = ThemeContext()

  return (
    <UserContextProvider>
      <ChakraProvider theme={theme ? DarkTheme : LightTheme}>
        <Toaster richColors theme={theme ? 'dark' : 'light'} />
        <RouterProvider router={AppRoutes} />
      </ChakraProvider>
    </UserContextProvider>
  )
}

import { createContext, ReactNode, useContext, useState } from 'react'

interface themeContextBody {
  theme: boolean
  changeTheme: () => void
}

interface ThemeContextProviderProps {
  children: ReactNode
}

const themeContext = createContext({} as themeContextBody)

export function ThemeContextProvider({ children }: ThemeContextProviderProps) {
  const getInitialTheme: boolean = JSON.parse(
    localStorage.getItem('chatify@1.0.0: theme') || 'true',
  )

  const [theme, setTheme] = useState<boolean>(getInitialTheme)

  function changeTheme() {
    setTheme(!theme)
    localStorage.setItem('chatify@1.0.0: theme', JSON.stringify(!theme))
  }

  return (
    <themeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </themeContext.Provider>
  )
}

export const ThemeContext = () => useContext(themeContext)

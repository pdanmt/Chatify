import { UserInfo } from 'firebase/auth'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { GetUser } from '../services/firebase'

interface UserContextBody {
  user: UserInfo | null
  setUser: React.Dispatch<React.SetStateAction<UserInfo | null>>
}

interface UserContextProviderProps {
  children: ReactNode
}

const userContext = createContext({} as UserContextBody)

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [user, setUser] = useState<UserInfo | null>(null)

  useEffect(() => {
    const unsubscribeGetUser = GetUser(setUser)

    return unsubscribeGetUser
  }, [])

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  )
}

export const UserContext = () => useContext(userContext)

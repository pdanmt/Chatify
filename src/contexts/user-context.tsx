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
  activeUserChats: UserInfo[]
  setUser: React.Dispatch<React.SetStateAction<UserInfo | null>>
  setActiveUserChats: React.Dispatch<React.SetStateAction<UserInfo[]>>
}

interface UserContextProviderProps {
  children: ReactNode
}

const userContext = createContext({} as UserContextBody)

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [user, setUser] = useState<UserInfo | null>(null)
  const [activeUserChats, setActiveUserChats] = useState<UserInfo[]>([])

  useEffect(() => {
    const unsubscribeGetUser = GetUser(setUser)

    return unsubscribeGetUser
  }, [])

  return (
    <userContext.Provider
      value={{ user, setUser, activeUserChats, setActiveUserChats }}
    >
      {children}
    </userContext.Provider>
  )
}

export const UserContext = () => useContext(userContext)

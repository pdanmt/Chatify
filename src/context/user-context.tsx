'use client'

import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useEffect,
    useState
} from "react"
import { GetUser } from "@/services/firebase/firebase";

export interface UserInfo {
    uid: string
    photoURL: string
    displayName: string
    email: string
}

interface UserContextBody {
    user: UserInfo | null
    setUser: Dispatch<SetStateAction<UserInfo | null>>
}

const UserContext = createContext({} as UserContextBody)

export function UserContextProvider(
    { children }: { children: ReactNode }
) {
    const [user, setUser] = useState<UserInfo | null>(null)

    useEffect(() => {
        const unsubscribe = GetUser(setUser)

        return unsubscribe
    }, [])

    return (
        <UserContext.Provider value={{
            user,
            setUser,
        }}>
            {children}
        </UserContext.Provider>
    )
}

export const UseUserContext = () => useContext(UserContext)
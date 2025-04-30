'use client'

import { GetActiveUserChats } from "@/services/firebase/firebase"
import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react"
import { UserInfo, UseUserContext } from "./user-context"
import { toast } from "react-toastify"

interface ConversationContextBody {
    activeChat: UserInfo | null
    userChats: UserInfo[]
    setActiveChat: React.Dispatch<React.SetStateAction<UserInfo | null>>
    setUserChats: React.Dispatch<React.SetStateAction<UserInfo[]>>
}

const ConversationContext = createContext({} as ConversationContextBody)

export function ConversationContextProvider(
    { children }: { children: React.ReactNode }
) {
    const { user } = UseUserContext()

    const [activeChat, setActiveChat] = useState<UserInfo | null>(null)
    const [userChats, setUserChats] = useState<UserInfo[]>([])

    useEffect(() => {
        async function getUserChats() {
            if (user && user.email) {
                try {
                    await GetActiveUserChats(user.email, setUserChats)
                } catch (error) {
                    console.error(`Erro ao pegar chats do usuário. ERRO: ${error}`);
                    toast.error('Erro ao pegar chats do usuário.')
                }
            }
        }

        getUserChats()
    }, [user, user?.email])

    return (
        <ConversationContext.Provider value={{
            activeChat,
            userChats,
            setActiveChat,
            setUserChats
        }}>
            {children}
        </ConversationContext.Provider>
    )
}

export const UseConversationContext = () => useContext(ConversationContext)
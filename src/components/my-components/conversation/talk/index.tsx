'use client'

import { UseConversationContext, UseUserContext } from "@/context"
import { GetActiveChatMessages } from "@/services/firebase/firebase"
import { Flex, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Message } from "./message"

export interface MessageBody {
    message: string
    timestamp: Date
    hour: string
    sendBy: string
    deleted: boolean
    edited: boolean
    id: string
}

export function Talk() {
    const { user } = UseUserContext()
    const { activeChat } = UseConversationContext()
    const [messages, setMessages] = useState<MessageBody[]>([])

    useEffect(() => {
        if (user && user.email && activeChat) {
            setMessages([])
            const unsubscribe = GetActiveChatMessages(user.email, activeChat.email, setMessages)

            return unsubscribe
        }
    }, [user, user?.email, activeChat])

    return (
        <Flex
            direction='column'
            px={['0.5rem', '1rem', '4rem', '8rem']}
            py='1rem'
            overflow='auto'
            w='100%'
            h='calc(100vh - 8rem)'
            m='0 auto'
            gap='0.7rem'
        >
            {messages.length === 0 && (
                <Text textAlign='center'>
                    Seja o primeiro a enviar uma mensagem!
                </Text>
            )}
            {messages.map(({
                message,
                sendBy,
                hour,
                id,
                deleted,
                edited,
                timestamp,
            }) => (
                <Message
                    deleted={deleted}
                    edited={edited}
                    hour={hour}
                    id={id}
                    message={message}
                    sendBy={sendBy}
                    timestamp={timestamp}
                    key={id}
                />
            ))}
        </Flex>
    )
}
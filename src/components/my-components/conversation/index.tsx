'use client'

import { Flex, Text } from "@chakra-ui/react";
import { ConversationHeader } from "./conversation-header";
import { Talk } from "./talk";
import { Footer } from "./footer";
import { UseConversationContext } from "@/context";

export function Conversation() {
    const { activeChat } = UseConversationContext()

    if (!activeChat) {
        return (
            <Flex
                bg='gray.600'
                textAlign='center'
                direction='column'
                justify='center'
                display={activeChat ? 'flex' : ['none', 'none', 'flex']}
            >
                <Text fontSize='lg' color='fr'>
                    Compartilhe o Chatify com seus amigos!
                </Text>
                <Text color='gray.200'>
                    Tenha mais gente para conversar no app
                </Text>
            </Flex>
        )
    }

    return (
        <Flex
            bg='gray.600'
            direction='column'
            pos='relative'
        >
            <ConversationHeader />
            <Talk />
            <Footer />
        </Flex>
    )
}
'use client'

import { Flex, Text } from "@chakra-ui/react";
import { Header } from "./chat-header";
import { Search } from "./search";
import { ChatBox } from "./chat-box";
import { UseConversationContext } from "@/context";

export function Chats() {
    const { activeChat, userChats } = UseConversationContext()

    return (
        <Flex
            bg='gray.700'
            borderRight='1px solid'
            borderColor='gray.400'
            direction='column'
            display={activeChat ? ['none', 'none', 'flex'] : 'flex'}
            minH='100vh'
        >
            <Header />
            <Search />
            {userChats.length === 0 ? (
                <Flex
                    display={['flex', 'flex', 'none']}
                    direction='column'
                    textAlign='center'
                    align='center'
                    pt='2rem'
                >
                    <Text fontSize='lg' color='fr'>
                        Compartilhe o Chatify com seus amigos!
                    </Text>
                    <Text color='gray.200'>
                        Tenha mais gente para conversar no app
                    </Text>
                </Flex>
            ) : (
                <ChatBox />
            )}
        </Flex>
    )
}
'use client'

import { UseConversationContext } from "@/context";
import { Flex, Box, Icon, Text } from "@chakra-ui/react";
import Image from "next/image";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Avatar } from "../../avatar";

export function ConversationHeader() {
    const { activeChat, setActiveChat } = UseConversationContext()

    if (!activeChat) {
        return
    }

    return (
        <Flex
            bg='gray.500'
            w='100%'
            h='4.5rem'
            p='0.6rem 1rem'
            align='center'
            gap='2px'
        >
            <Icon
                display={['block', 'block', 'none']}
                fontSize='lg'
                onClick={() => setActiveChat(null)}
            >
                <IoMdArrowRoundBack />
            </Icon>
            <Avatar name={activeChat.displayName} photoUrl={activeChat.photoURL} />
        </Flex>
    )
}
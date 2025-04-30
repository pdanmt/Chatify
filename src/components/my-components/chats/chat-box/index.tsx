'use client'

import { UseConversationContext } from "@/context";
import { Flex, Box, Text } from "@chakra-ui/react";
import Image from "next/image";

export function ChatBox() {
    const { userChats, setActiveChat } = UseConversationContext()

    return (
        <>
            {userChats.map((props) => (
                <Flex
                    p='0.6rem 1rem'
                    borderTop='1px solid'
                    borderBottom='1px solid'
                    borderColor='gray.400'
                    justify='space-between'
                    cursor='pointer'
                    key={props.uid}
                    _hover={{ transition: '0.15s', bg: 'gray.500' }}
                    onClick={() => setActiveChat(props)}
                >
                    <Flex align='center' gap='1rem'>
                        <Box w='50px' h='50px' pos='relative'>
                            <Image
                                src={props.photoURL}
                                alt=''
                                fill
                                style={{ borderRadius: '100%' }}
                            />
                        </Box>
                        <Box>
                            <Text color='gray.100' fontSize='lg'>
                                {props.displayName}
                            </Text>
                            <Text color='gray.300' fontSize='md'>
                                message
                            </Text>
                        </Box>
                    </Flex>
                    <Box lineHeight='2'>
                        <Text color='gray.300'>08:21</Text>
                        <Flex
                            bg='green'
                            w='1.25rem'
                            h='1.25rem'
                            align='center'
                            justify='center'
                            borderRadius='100%'
                            ml='auto'
                            color='#fff'
                            fontSize='sm'
                            userSelect='none'
                        >
                            5
                        </Flex>
                    </Box>
                </Flex>
            ))}
        </>
    )
}
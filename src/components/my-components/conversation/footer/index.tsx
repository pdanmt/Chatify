'use client'

import { UseConversationContext, UseUserContext } from "@/context";
import { SendMessage } from "@/services/firebase/firebase";
import { Flex, Input, Button } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { IoSend } from "react-icons/io5";
import { z } from "zod";

export function Footer() {
    const { user } = UseUserContext()
    const { activeChat } = UseConversationContext()

    const sendMessageSchema = z.object({
        message: z.string()
    })

    type sendMessageType = z.infer<typeof sendMessageSchema>

    const { handleSubmit, register, reset } = useForm({
        resolver: zodResolver(sendMessageSchema)
    })

    async function handleSendMessage({ message }: sendMessageType) {
        if (activeChat && user && user.email) {
            await SendMessage(user.email, activeChat.email, message)
            reset()
        }
    }
    return (
        <Flex
            h='3.5rem'
            w={['100%', '100%', '75vw']}
            pos='fixed'
            bottom='0'
            bg='gray.400'
            p='0.5rem'
            justify='center'
            align='center'
            as='form'
            onSubmit={handleSubmit(handleSendMessage)}
        >
            <Input
                w='800px'
                border='none'
                bg='gray.500'
                borderRadius='8px 0 0 8px'
                placeholder='Digite uma mensagem'
                _placeholder={{ color: 'gray.300' }}
                {...register('message')}
            />
            <Button
                bg='gray.500'
                _hover={{ bg: 'gray.600' }}
                borderRadius='0 8px 8px 0'
                type='submit'
            >
                <IoSend />
            </Button>
        </Flex>
    )
}
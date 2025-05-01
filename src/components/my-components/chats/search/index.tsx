'use client'

import { UseConversationContext, UseUserContext } from "@/context";
import { CreateChatIfThatUserExist } from "@/services/firebase/firebase";
import { Button, Flex, Input } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { toast } from "react-toastify";
import { z } from "zod";

export function Search() {
    const { user } = UseUserContext()
    const { setActiveChat, setUserChats, userChats } = UseConversationContext()

    const searchSchema = z.object({
        email: z.string()
    })
    type searchType = z.infer<typeof searchSchema>
    const { handleSubmit, register, reset } = useForm({
        resolver: zodResolver(searchSchema)
    })

    async function handleSearchChat({ email }: searchType) {
        if (user && user.email) {
            if (user.email === email) {
                toast.error('Use um e-mail diferente do seu.')
            } else {
                try {
                    const thisChatExists = userChats.find((props) => props.email === email)
                    if (thisChatExists) {
                        setActiveChat(thisChatExists)
                    } else {
                        const userChatInfos = await CreateChatIfThatUserExist(user.email, email)
                        setActiveChat(userChatInfos)
                        setUserChats((prev) => [...prev, userChatInfos])
                    }

                    reset()
                } catch (error) {
                    toast.error('Erro ao encontrar usuário.')
                    console.error(`Erro ao encontrar usuário: ${error}`)
                }
            }
        }
    }

    return (
        <Flex
            align='center'
            p='0.5rem'
            as='form'
            onSubmit={handleSubmit(handleSearchChat)}
        >
            <Input
                bg='gray.500'
                border='none'
                color='gray.100'
                borderRadius='8px 0 0 8px'
                type='email'
                required
                placeholder='Crie ou busque uma conversa'
                _placeholder={{ color: 'gray.300' }}
                _focus={{ outline: 'none' }}
                {...register('email')}
            />
            <Button
                bg='gray.500'
                color='gray.100'
                borderRadius='0 8px 8px 0'
                type='submit'
                _hover={{ bg: 'gray.400' }}
            >
                <HiMagnifyingGlass />
            </Button>
        </Flex>
    )
}
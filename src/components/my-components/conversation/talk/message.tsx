import { UseConversationContext, UseUserContext } from "@/context";
import { DeleteMessage } from "@/services/firebase/firebase";
import { Flex, Menu, Icon, Portal, Text } from "@chakra-ui/react";
import { FaChevronDown } from "react-icons/fa";
import { MessageBody } from ".";
import { useState } from "react";
import { EditingForm } from "./editing-form";

export function Message({
    deleted,
    edited,
    hour,
    id,
    message,
    sendBy,
}: MessageBody) {
    const { user } = UseUserContext()
    const { activeChat } = UseConversationContext()
    const [showTrig, setShowTrig] = useState<boolean>(false)
    const [editingMessage, setEditingMessage] = useState<boolean>(false)

    const formatedHour = `${new Date(hour).getHours()}:${new Date(hour).getMinutes()}`

    if (!user || !activeChat) {
        return
    }

    return (
        <Flex
            mr={sendBy === user?.email ? '0' : 'auto'}
            ml={sendBy === user?.email ? 'auto' : '0'}
            maxW='650px'
            wordBreak='break-word'
            direction='column'
            textAlign={sendBy === user?.email ? 'right' : 'left'}
            gap='2px'
        >
            <Flex
                bg={sendBy === user?.email ? 'gray.400' : 'gray.500'}
                p='0.5rem'
                pos='relative'
                borderRadius='8px'
                key={id}
                onMouseEnter={() => setShowTrig(true)}
                onMouseLeave={() => setShowTrig(false)}
            >
                {!deleted && showTrig && (
                    <Menu.Root>
                        <Menu.Trigger
                            asChild
                            className='messageMenu'
                            display={user?.email === sendBy ? showTrig ? 'block' : 'none' : 'none'}
                        >
                            <Icon
                                pos='absolute'
                                right='5px'
                                top='5px'
                                cursor='pointer'
                                color='gray.300'
                                opacity='0.7'
                            >
                                <FaChevronDown />
                            </Icon>
                        </Menu.Trigger>
                        <Portal>
                            <Menu.Positioner>
                                <Menu.Content bg='gray.500'>
                                    <Menu.Item
                                        value='edit'
                                        color='gray.100'
                                        cursor='pointer'
                                        _hover={{ bg: 'gray.400', color: 'fr' }}
                                        onClick={() => setEditingMessage(true)}
                                    >
                                        Editar
                                    </Menu.Item>
                                    <Menu.Item
                                        value='delete'
                                        color='red'
                                        cursor='pointer'
                                        _hover={{ bg: 'gray.400' }}
                                        onClick={() => DeleteMessage(id, user.email, activeChat.email)}
                                    >
                                        Apagar
                                    </Menu.Item>
                                </Menu.Content>
                            </Menu.Positioner>
                        </Portal>
                    </Menu.Root>
                )}
                {!editingMessage && (
                    <Text
                        pr='2.375rem'
                        color={deleted ? 'gray.300' : 'gray.100'}
                    >
                        {message}
                    </Text>
                )}
                {editingMessage && (
                    <EditingForm
                        id={id}
                        currentUserEmail={user.email}
                        chatUserEmail={activeChat.email}
                        message={message}
                        setEditingMessage={setEditingMessage}
                    />
                )}
                <Text
                    pos='absolute'
                    bottom='0.2rem'
                    right='0.2rem'
                    color='gray.300'
                    fontSize='sm'
                >
                    {formatedHour}
                </Text>
            </Flex>
            {edited && !deleted && (
                <Text color='gray.300'>editado</Text>
            )}
        </Flex>
    )
}
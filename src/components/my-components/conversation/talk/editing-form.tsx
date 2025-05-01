'use client'

import { EditMessage } from "@/services/firebase/firebase";
import { Box, Input } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface EditingFormProps {
    message: string
    id: string
    currentUserEmail: string
    chatUserEmail: string
    setEditingMessage: React.Dispatch<React.SetStateAction<boolean>>
}

export function EditingForm({
    message,
    id,
    currentUserEmail,
    chatUserEmail,
    setEditingMessage
}: EditingFormProps) {
    const editingFormSchema = z.object({
        editedMessage: z.string()
    })

    type EditingFormType = z.infer<typeof editingFormSchema>

    const { handleSubmit, register } = useForm({
        resolver: zodResolver(editingFormSchema)
    })

    async function handleEditMessage({ editedMessage }: EditingFormType) {
        await EditMessage(
            id,
            editedMessage,
            currentUserEmail,
            chatUserEmail
        )

        setEditingMessage(false)
    }

    return (
        <Box as='form' onSubmit={handleSubmit(handleEditMessage)}>
            <Input
                defaultValue={message}
                w='400px'
                resize='none'
                border='1px solid'
                borderColor='gray.200'
                mr='2.375rem'
                autoFocus
                {...register('editedMessage')}
                _focus={{ borderColor: 'gray.300' }}
                onBlur={() => setEditingMessage(false)}
            />
        </Box>
    )
}
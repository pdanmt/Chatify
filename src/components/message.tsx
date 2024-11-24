import { Box, Image, Input, Text } from '@chakra-ui/react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { SortedEmail } from '../utils/sort-emails'
import { MessageMenu } from './message-menu'
import { useState } from 'react'
import { UpdateMessage } from '../services/firebase'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

interface MessageProps {
  messageId: string
  authorEmail: string
  userEmail: string | undefined | null
  authorPhotoUrl: string
  message: string
  createdAt: string
  wasDeleted?: boolean
  wasEdited?: boolean
}

export function Message({
  authorEmail,
  userEmail,
  authorPhotoUrl,
  message,
  createdAt,
  messageId,
  wasDeleted,
  wasEdited,
}: MessageProps) {
  const emails = SortedEmail()
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const messageSchema = z.object({
    message: z.string(),
  })

  type messageType = z.infer<typeof messageSchema>

  const { handleSubmit, register } = useForm<messageType>({
    resolver: zodResolver(messageSchema),
  })

  function handleUpdateMessage(data: messageType) {
    UpdateMessage(messageId, data.message, emails)

    setIsEditing(false)
  }

  return (
    <Box
      display="flex"
      justifyContent={authorEmail === userEmail ? 'right' : 'left'}
      flexDir="column"
      textAlign={authorEmail === userEmail ? 'right' : 'left'}
    >
      <Box
        display="flex"
        alignItems="flex-start"
        gap="0.5rem"
        flexDir={authorEmail === userEmail ? 'row-reverse' : 'row'}
      >
        <Image
          alt=""
          src={authorPhotoUrl}
          w="34px"
          h="34px"
          borderRadius="100%"
          border="2px solid transparent"
          outline="2px solid"
          outlineColor="border"
        />
        <Box
          display="flex"
          alignItems="flex-start"
          bg={authorEmail === userEmail ? 'secondary' : 'muted'}
          w="auto"
          maxW="75%"
          borderRadius="8px"
          gap="1rem"
          p="0.5rem 1rem"
          textAlign={authorEmail === userEmail ? 'right' : 'left'}
          outline="1px solid"
          outlineColor={isEditing ? 'sucess' : 'transparent'}
        >
          {!isEditing && (
            <Text
              wordBreak="break-word"
              color={wasDeleted ? 'mutedFr' : 'inherit'}
            >
              {message}
            </Text>
          )}
          {isEditing && (
            <Box
              as="form"
              onSubmit={handleSubmit(handleUpdateMessage)}
              w="100%"
            >
              <Input
                variant="unstyled"
                w="100%"
                defaultValue={message}
                autoFocus
                {...register('message')}
                isRequired
                onBlur={() => setIsEditing(false)}
              />
            </Box>
          )}
        </Box>
        {!wasDeleted && (
          <MessageMenu
            emails={emails}
            messageId={messageId}
            setIsEditing={setIsEditing}
          />
        )}
      </Box>
      <Text as="span" fontSize="0.8rem" color="mutedFr">
        {formatDistanceToNow(new Date(createdAt), { locale: ptBR })} atrás
        {wasEdited && !wasDeleted && ' - editado'}
      </Text>
    </Box>
  )
}

import { Box, Image, Text } from '@chakra-ui/react'
import { SendButton } from '../components/send-button'
import { FormEvent, useEffect, useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase-config'
import { UserContext } from '../contexts/user-context'
import { GetMessages } from '../services/firebase'
import { SortedEmail } from '../utils/sort-emails'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { FormInput } from '../components/form-input'
import { LoadingSpinner } from '../components/loading-spinner'

export type MessagesDocType = {
  message: string
  createdAt: string
  timestamp: Date
  author: string
  authorPhotoUrl: string
  authorEmail: string
  messageId: string
}

export function ChatPage() {
  const { user } = UserContext()
  const [loading, setLoading] = useState<boolean>(true)
  const [message, setMessage] = useState<string>('')
  const [messages, setMessages] = useState<MessagesDocType[]>([])
  const emails = SortedEmail()

  const userEmail1 = emails && emails[0]
  const userEmail2 = emails && emails[1]

  useEffect(() => {
    if (userEmail2 && userEmail1) {
      const unsubscribe = GetMessages(
        userEmail1,
        userEmail2,
        setMessages,
        setLoading,
      )

      return unsubscribe
    }
  }, [userEmail1, userEmail2])

  function handleSendMessage(e: FormEvent) {
    e.preventDefault()

    if (userEmail1 && user) {
      addDoc(collection(db, `/chats/${userEmail1}${userEmail2}/chat`), {
        message,
        author: user?.displayName,
        authorPhotoUrl: user?.photoURL,
        createdAt: new Date().toISOString(),
        authorEmail: user?.email,
        timestamp: new Date(),
      })
    }
    setMessage('')
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <Box
      display="flex"
      flexDir="column"
      alignItems="center"
      gap="2rem"
      justifyContent="space-between"
      p="2rem 0.5rem"
      w={{ base: '80vw', md: '80vw', lg: '50vw' }}
      minH="90vh"
      m="0 auto"
    >
      <Box w="100%" display="flex" flexDir="column" gap="1.3rem">
        {messages.map(
          ({ authorEmail, message, messageId, authorPhotoUrl, createdAt }) => (
            <Box
              key={messageId}
              display="flex"
              justifyContent={authorEmail === user?.email ? 'right' : 'left'}
              flexDir="column"
              textAlign={authorEmail === user?.email ? 'right' : 'left'}
            >
              <Box
                display="flex"
                alignItems="flex-start"
                gap="0.5rem"
                flexDir={authorEmail === user?.email ? 'row-reverse' : 'row'}
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
                  bg={authorEmail === user?.email ? 'primaryFr' : 'muted'}
                  w="auto"
                  maxW="75%"
                  borderRadius="8px"
                  gap="1rem"
                  p="0.5rem 1rem"
                  textAlign={authorEmail === user?.email ? 'right' : 'left'}
                >
                  <Text wordBreak="break-word">{message}</Text>
                </Box>
              </Box>
              <Text as="span" fontSize="0.8rem" color="mutedFr">
                {formatDistanceToNow(new Date(createdAt), { locale: ptBR })}{' '}
                atrás
              </Text>
            </Box>
          ),
        )}
      </Box>
      <Box
        display="flex"
        gap="1rem"
        w={['100%', '90%', '80%']}
        as="form"
        onSubmit={handleSendMessage}
      >
        <FormInput
          placeholder="Digite uma mensagem"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          isRequired
        />
        <SendButton />
      </Box>
    </Box>
  )
}

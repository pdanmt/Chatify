import { Box, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase-config'
import { UserContext } from '../contexts/user-context'
import { GetMessages } from '../services/firebase'
import { SortedEmail } from '../utils/sort-emails'
import { LoadingSpinner } from '../components/loading-spinner'
import { Message } from '../components/message'
import { FormBox, inputFormBoxType } from '../components/form-box'

export type MessagesDocType = {
  message: string
  createdAt: string
  timestamp: Date
  author: string
  authorPhotoUrl: string
  authorEmail: string
  messageId: string
  wasDeleted?: boolean
  wasEdited?: boolean
}

export function ChatPage() {
  const { user } = UserContext()
  const [loading, setLoading] = useState<boolean>(true)
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

  function handleSendMessage(data: inputFormBoxType) {
    const { message } = data

    if (userEmail1 && user) {
      addDoc(collection(db, `/chats/${userEmail1}${userEmail2}/chat`), {
        message,
        author: user?.displayName,
        authorPhotoUrl: user?.photoURL,
        createdAt: new Date().toISOString(),
        authorEmail: user?.email,
        timestamp: new Date(),
        wasDeleted: false,
        wasEdited: false,
      })
    }
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
      minH="88vh"
      m="0 auto"
    >
      {messages.length === 0 && (
        <Text color="mutedFr" textAlign="center" w="90vw">
          Sem mensagens nesse chat. Seja o primeiro a mandar uma mensagem!
        </Text>
      )}
      <Box w="100%" display="flex" flexDir="column" gap="1.3rem">
        {messages.map(
          ({
            authorEmail,
            message,
            messageId,
            authorPhotoUrl,
            createdAt,
            wasDeleted,
            wasEdited,
          }) => (
            <Message
              authorEmail={authorEmail}
              authorPhotoUrl={authorPhotoUrl}
              createdAt={createdAt}
              message={message}
              messageId={messageId}
              userEmail={user?.email}
              wasDeleted={wasDeleted}
              wasEdited={wasEdited}
              key={messageId}
            />
          ),
        )}
      </Box>
      <FormBox
        handleSubmitFn={(data) => handleSendMessage(data)}
        w={['94vw', '90%', '80%']}
        registerName="message"
        hasInputMaxValue
        inputPlaceholder="Digite uma mensagem"
      />
    </Box>
  )
}

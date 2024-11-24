import { Box, Text } from '@chakra-ui/react'
import { ChatBox } from '../components/chat-box'
import { useEffect, useState } from 'react'
import { GetActiveUserChats, ThisUserExists } from '../services/firebase'
import { toast } from 'sonner'
import { UserContext } from '../contexts/user-context'
import { useNavigate } from 'react-router-dom'
import { LoadingSpinner } from '../components/loading-spinner'
import { FormBox, inputFormBoxType } from '../components/form-box'

export function UserPage() {
  const { user, setActiveUserChats, activeUserChats } = UserContext()
  const [loading, setLoading] = useState<boolean>(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (user?.email) {
      GetActiveUserChats(user.email, setActiveUserChats, setLoading)
    }
  }, [user?.email, setActiveUserChats])

  function sortEmailsByLenght(userEmail: string) {
    if (user?.email) {
      if (user.email <= userEmail) {
        return [user.email, userEmail]
      } else {
        return [userEmail, user.email]
      }
    } else {
      throw new Error()
    }
  }

  async function handleStartAChat(data: inputFormBoxType) {
    const { userEmail } = data
    if (user?.email && userEmail) {
      if (user.email === userEmail) {
        toast.error(
          'Você não pode iniciar uma conversa usando o seu e-mail logado.',
        )
      } else {
        try {
          const [userEmail1, userEmail2] = sortEmailsByLenght(userEmail)
          await ThisUserExists(userEmail1, userEmail2)
          navigate(`/user/${user.uid}/chat/${userEmail}`)
        } catch (error) {
          toast.error('Este usuário não existe.')
          console.error(`Erro ao encontrar usuário: ${error}`)
        }
      }
    }
  }

  if (!user || loading) {
    return <LoadingSpinner />
  }

  return (
    <Box
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      pt="4rem"
      gap="2rem"
    >
      <FormBox
        handleSubmitFn={(data) => handleStartAChat(data)}
        w={['90%', '55%', '35%']}
        registerName="userEmail"
        inputType="email"
      />
      <Text
        fontSize={['1.2rem', '1.35rem', '1.5rem']}
        fontWeight="bold"
        textAlign="center"
      >
        {activeUserChats.length === 0
          ? 'Você ainda não possui chats'
          : 'Seus Chats'}
      </Text>
      <Box
        w={{ base: '90%', md: '80%', lg: '60%' }}
        display="flex"
        flexDir="column"
        gap="1rem"
      >
        {activeUserChats.map(({ displayName, photoURL, uid, email }) => {
          if (displayName && photoURL && email) {
            return (
              <ChatBox
                displayName={displayName}
                photoUrl={photoURL}
                chatUserEmail={email}
                key={uid}
              />
            )
          }

          return null
        })}
      </Box>
    </Box>
  )
}

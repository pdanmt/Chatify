import { Box } from '@chakra-ui/react'
import { ChatBox } from '../components/chat-box'
import { FormEvent, useState } from 'react'
import { ThisUserExists } from '../services/firebase'
import { toast } from 'sonner'
import { UserContext } from '../contexts/user-context'
import { useNavigate } from 'react-router-dom'
import { SendButton } from '../components/send-button'
import { FormInput } from '../components/form-input'
import { LoadingSpinner } from '../components/loading-spinner'

export function UserPage() {
  const { user } = UserContext()
  const [userEmail, setUserEmail] = useState<string>('')
  const navigate = useNavigate()

  function sortEmailsByLenght() {
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

  async function handleStartAChat(e: FormEvent) {
    e.preventDefault()
    if (user?.email) {
      if (user.email === userEmail) {
        toast.error(
          'Você não pode iniciar uma conversa usando o seu e-mail logado.',
        )
      } else {
        try {
          const [userEmail1, userEmail2] = sortEmailsByLenght()
          await ThisUserExists(userEmail1, userEmail2)
          navigate(`/user/${user.uid}/chat/${userEmail}`)
        } catch (error) {
          toast.error('Este usuário não existe.')
          console.error(`Erro ao encontrar usuário: ${error}`)
        }
      }
    }
  }

  if (!user) {
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
      <Box
        w={{ sm: '90%', md: '55%', lg: '35%' }}
        display="flex"
        alignItems="center"
        gap="1rem"
        as="form"
        onSubmit={handleStartAChat}
      >
        <FormInput
          placeholder="Digite o e-mail de um usuário para iniciar um chat com ele."
          onChange={(e) => setUserEmail(e.target.value)}
          value={userEmail}
          type="email"
        />
        <SendButton />
      </Box>
      <Box
        w={{ base: '90%', md: '80%', lg: '60%' }}
        display="flex"
        flexDir="column"
        gap="1rem"
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          bg="muted"
          p="1rem"
          borderRadius="8px"
        >
          <ChatBox displayName="Pedro" photoUrl="" />
        </Box>
      </Box>
    </Box>
  )
}

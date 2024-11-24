import { Box, Button, Icon, Image, Text } from '@chakra-ui/react'
import { MessageSquareMore } from 'lucide-react'
import { SignIn } from '../services/firebase'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { UserContext } from '../contexts/user-context'

export function AuthPage() {
  const { user } = UserContext()
  const navigate = useNavigate()

  async function handleSignIn() {
    await SignIn(navigate)

    if (Notification.permission !== 'granted') {
      await Notification.requestPermission()
    }
  }

  useEffect(() => {
    if (user && location.pathname === '/') {
      navigate(`/user/${user.uid}`)
    }
  }, [user, navigate])

  return (
    <Box
      display={{ base: 'flex', md: 'grid', lg: 'grid' }}
      gridTemplateColumns="50% 50%"
      flexDir="column"
      minH="100vh"
    >
      <Box
        bg="bg"
        p="1rem"
        display="flex"
        flexDir="column"
        justifyContent="space-between"
        h={{ base: '10vh', md: '100vh' }}
        w="100%"
        position={{ base: 'absolute', md: 'relative', lg: 'relative' }}
        top="0"
      >
        <Box
          display="flex"
          alignItems="flex-end"
          gap="0.5rem"
          fontWeight="bold"
          fontSize="1.3rem"
          justifyContent={{ base: 'center', md: 'left' }}
        >
          <Text>Chatify</Text>
          <Icon as={MessageSquareMore} fontSize={22} />
        </Box>
        <Text display={{ base: 'none', md: 'flex' }}>
          Pedro daniel {new Date().getFullYear()} &copy; todos os direitos
          reservados
        </Text>
      </Box>
      <Box
        bg="muted"
        display="flex"
        justifyContent="center"
        alignItems="center"
        h={{ base: '92vh', md: '100vh' }}
        mt={{ base: '10vh', md: '0' }}
      >
        <Box
          display="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
          maxW="500px"
          textAlign="center"
          gap="1.5rem"
          p="0.5rem"
        >
          <Box>
            <Text fontSize="1.4rem" letterSpacing="-1px" fontWeight="500">
              Entre em uma conta para começar a usar o Chatify!
            </Text>
            <Text color="mutedFr">
              Conecte-se com outros usuários para conversar, sem precisar de
              números de telefone!
            </Text>
          </Box>
          <Button
            variant="ghost"
            border="1px solid"
            borderColor="mutedFr"
            display="flex"
            alignItems="center"
            gap="0.6rem"
            color="fr"
            _hover={{ bg: 'primaryFr' }}
            onClick={() => handleSignIn()}
          >
            <Image src="/google-logo.svg" alt="" w="25px" h="25px" />
            Entre com sua conta Google
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

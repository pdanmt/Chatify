import { Box, Image, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../contexts/user-context'

interface ChatBoxProps {
  photoUrl: string
  displayName: string
  chatUserEmail: string
}

export function ChatBox({
  photoUrl,
  displayName,
  chatUserEmail,
}: ChatBoxProps) {
  const { user } = UserContext()
  const navigate = useNavigate()

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      bg="muted"
      transition="0.2s"
      _hover={{ bg: 'primaryFr' }}
      cursor="pointer"
      p="1rem"
      borderRadius="8px"
      onClick={() => navigate(`/user/${user?.uid}/chat/${chatUserEmail}`)}
    >
      <Box display="flex" alignItems="center" gap="1rem">
        <Image alt="" src={photoUrl} w="35px" h="35px" borderRadius="100%" />
        <Text fontWeight="600">{displayName}</Text>
      </Box>
    </Box>
  )
}

import { Box, Image, Text } from '@chakra-ui/react'

interface ChatBoxProps {
  photoUrl: string
  displayName: string
}

export function ChatBox({ photoUrl, displayName }: ChatBoxProps) {
  return (
    <Box display="flex" alignItems="center" gap="1rem">
      <Image alt="" src={photoUrl} w="35px" h="35px" borderRadius="100%" />
      <Text fontWeight="600">{displayName}</Text>
    </Box>
  )
}

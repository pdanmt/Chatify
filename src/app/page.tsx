import { Chats } from "@/components/my-components/chats";
import { Conversation } from "@/components/my-components/conversation";
import { Box } from "@chakra-ui/react";

export default function Home() {
  return (
    <Box
      display={['block', 'block', 'grid']}
      minH='100vh'
      gridTemplateColumns={['0', '0', '40vw 60vw', '25vw 75vw']}
      color='gray.100'
    >
      <Chats />
      <Conversation />
    </Box>
  )
}

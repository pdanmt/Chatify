import { Button, Icon } from '@chakra-ui/react'
import { SendHorizonal } from 'lucide-react'

export function SendButton() {
  return (
    <Button
      variant="ghost"
      color="fr"
      _hover={{ bg: 'primaryFr' }}
      type="submit"
      borderLeft="1px solid"
      borderColor="border"
      borderRadius="0 6px 6px 0"
    >
      <Icon as={SendHorizonal} fontSize={['1rem', '1.2rem', '1.3rem']} />
    </Button>
  )
}

import { Button } from '@chakra-ui/react'

export function SendButton() {
  return (
    <Button
      variant="ghost"
      bg="input"
      color="fr"
      _hover={{ bg: 'primaryFr' }}
      type="submit"
      p="0.5rem 1rem"
    >
      Enviar
    </Button>
  )
}

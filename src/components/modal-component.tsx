import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { DeleteMessage, SignOut } from '../services/firebase'
import { MenuItemComponent } from './menu-item'
import { LogOut, Trash } from 'lucide-react'

interface ModalComponentProps {
  message?: string
  messageId?: string
  emails?: [string, string] | undefined
  toDeleteAMessage?: boolean
}

export function ModalComponent({
  message,
  messageId,
  emails,
  toDeleteAMessage,
}: ModalComponentProps) {
  const { onClose, onOpen, isOpen } = useDisclosure()
  return (
    <>
      {toDeleteAMessage && (
        <MenuItemComponent
          fontSize="0.86rem"
          bg="primaryFr"
          color="destructive"
          onClick={onOpen}
        >
          <Text>Deletar mensagem</Text>
          <Trash size={19} />
        </MenuItemComponent>
      )}

      {!toDeleteAMessage && (
        <MenuItemComponent onClick={onOpen} color="destructive">
          Sair da conta <LogOut size={21} />
        </MenuItemComponent>
      )}

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay bg="#00000099" />
        <ModalContent bg="bg">
          <ModalHeader>
            {toDeleteAMessage ? (
              <Text>Deletar mensagem</Text>
            ) : (
              <Text>Sair da conta</Text>
            )}
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            <Text>
              Tem certeza que deseja{' '}
              {toDeleteAMessage ? 'excluir essa mensagem?' : 'sair da conta?'}
            </Text>
            {toDeleteAMessage && (
              <Box bg="muted" borderRadius="8px" m="1rem auto" p="1rem">
                {message}
              </Box>
            )}
          </ModalBody>
          <ModalFooter display="flex" alignItems="center" gap="1rem">
            <Button
              bg="muted"
              color="mutedFr"
              _hover={{ color: 'fr' }}
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button
              bg="destructive"
              color="fr"
              transition="0.2s"
              _hover={{ filter: 'brightness(1.3)' }}
              onClick={() => {
                if (toDeleteAMessage && messageId) {
                  DeleteMessage(messageId, emails)
                } else {
                  SignOut()
                }
              }}
            >
              {toDeleteAMessage ? 'Excluir' : 'Sair'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

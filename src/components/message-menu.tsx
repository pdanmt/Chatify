import { Menu, MenuButton, MenuList, Text } from '@chakra-ui/react'
import { EllipsisVertical, PencilLine } from 'lucide-react'
import { MenuItemComponent } from './menu-item'
import { ModalComponent } from './modal-component'

interface MessageMenuProps {
  messageId: string
  message: string
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
  emails: [string, string] | undefined
}

export function MessageMenu({
  emails,
  messageId,
  setIsEditing,
  message,
}: MessageMenuProps) {
  return (
    <Menu>
      <MenuButton
        color="mutedFr"
        m="auto 0"
        cursor="pointer"
        className="ellipsisButton"
        display="none"
      >
        <EllipsisVertical size={21} />
      </MenuButton>
      <MenuList bg="primaryFr" border="none">
        <MenuItemComponent
          fontSize="0.86rem"
          bg="primaryFr"
          color="mutedFr"
          onClick={() => setIsEditing(true)}
        >
          <Text>Editar mensagem</Text>
          <PencilLine size={19} />
        </MenuItemComponent>

        <ModalComponent
          emails={emails}
          message={message}
          messageId={messageId}
          toDeleteAMessage
        />
      </MenuList>
    </Menu>
  )
}

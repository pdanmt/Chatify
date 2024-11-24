import { Menu, MenuButton, MenuList, Text } from '@chakra-ui/react'
import { EllipsisVertical, PencilLine, Trash } from 'lucide-react'
import { DeleteMessage } from '../services/firebase'
import { MenuItemComponent } from './menu-item'

interface MessageMenuProps {
  messageId: string
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
  emails: [string, string] | undefined
}

export function MessageMenu({
  emails,
  messageId,
  setIsEditing,
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
        <MenuItemComponent
          fontSize="0.86rem"
          bg="primaryFr"
          color="destructive"
          onClick={() => DeleteMessage(messageId, emails)}
        >
          <Text>Deletar mensagem</Text>
          <Trash size={19} />
        </MenuItemComponent>
      </MenuList>
    </Menu>
  )
}

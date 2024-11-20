import { Box, Menu, MenuButton, MenuList, Text } from '@chakra-ui/react'
import {
  LogOut,
  Menu as MenuIcon,
  MessageSquareMore,
  ToggleLeftIcon,
  ToggleRightIcon,
} from 'lucide-react'
import { ThemeContext } from '../contexts/theme-context'
import { MenuItemComponent } from './menu-item'
import { SignOut } from '../services/firebase'

export function Header() {
  const { changeTheme, theme } = ThemeContext()

  return (
    <Box
      as="header"
      p="1rem"
      display="flex"
      justifyContent="space-around"
      alignItems="center"
      borderBottom="1px solid"
      borderColor="border"
    >
      <Text
        display="flex"
        gap="0.5rem"
        fontWeight="700"
        alignItems="flex-end"
        fontSize="1.3rem"
      >
        Chatify <MessageSquareMore />
      </Text>
      <Menu>
        <MenuButton>
          <MenuIcon size={21} />
        </MenuButton>
        <MenuList bg="bg" p="0.5rem" border="2px solid" borderColor="mutedFr">
          <MenuItemComponent onClick={() => changeTheme()}>
            Mudar Tema
            {theme && <ToggleLeftIcon size={21} />}
            {!theme && <ToggleRightIcon size={21} />}
          </MenuItemComponent>
          <MenuItemComponent onClick={() => SignOut()} color="destructive">
            Sair da conta <LogOut size={21} color="#ed4545" />
          </MenuItemComponent>
        </MenuList>
      </Menu>
    </Box>
  )
}

import { MenuItem, MenuItemProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface MenuItemComponentProps extends MenuItemProps {
  children: ReactNode
}

export function MenuItemComponent({
  children,
  ...props
}: MenuItemComponentProps) {
  return (
    <MenuItem
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      bg="bg"
      border="2px solid transparent"
      _hover={{ borderColor: 'border' }}
      borderRadius="6px"
      {...props}
    >
      {children}
    </MenuItem>
  )
}

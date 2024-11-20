import { Box, useTheme } from '@chakra-ui/react'
import { OrbitProgress } from 'react-loading-indicators'

export function LoadingSpinner() {
  const theme = useTheme()

  return (
    <Box
      h="90vh"
      w="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <OrbitProgress size="small" color={theme.colors.ring} />
    </Box>
  )
}

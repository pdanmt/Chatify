import { Outlet } from 'react-router-dom'
import { Header } from '../components/header'
import { Box } from '@chakra-ui/react'

export function HomePage() {
  return (
    <Box bg="bg" minH="100vh">
      <Header />
      <Outlet />
    </Box>
  )
}

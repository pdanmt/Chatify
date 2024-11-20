import { createBrowserRouter } from 'react-router-dom'
import { AuthPage } from './pages/auth'
import { UserPage } from './pages/user-page'
import { HomePage } from './layouts/home'
import { ChatPage } from './pages/chat'

export const AppRoutes = createBrowserRouter([
  {
    path: '/',
    element: <AuthPage />,
  },
  {
    path: '/',
    element: <HomePage />,
    children: [
      { path: '/user/:id', element: <UserPage /> },
      { path: '/user/:id/chat/:userEmail', element: <ChatPage /> },
    ],
  },
])

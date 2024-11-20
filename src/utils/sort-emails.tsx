import { useParams } from 'react-router-dom'
import { UserContext } from '../contexts/user-context'

function sortEmailsByLength(email1: string, email2: string): [string, string] {
  if (email1.length <= email2.length) {
    return [email1, email2]
  }
  return [email2, email1]
}

export const SortedEmail = () => {
  const { userEmail } = useParams()
  const { user } = UserContext()

  if (user?.email && userEmail) {
    return sortEmailsByLength(user.email, userEmail)
  }
}

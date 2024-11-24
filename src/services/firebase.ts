import {
  browserLocalPersistence,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
  signOut,
  UserInfo,
} from 'firebase/auth'
import { auth, db } from '../firebase-config'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import { NavigateFunction } from 'react-router-dom'
import { toast } from 'sonner'
import { MessagesDocType } from '../pages/chat'
import { produce } from 'immer'

export async function SignIn(navigate: NavigateFunction) {
  const provider = new GoogleAuthProvider()

  await setPersistence(auth, browserLocalPersistence)

  await signInWithPopup(auth, provider)
    .then(async ({ user }) => {
      if (user.email) {
        const { displayName, email, uid, photoURL } = user
        await setDoc(doc(db, '/users', email), {
          displayName,
          email,
          uid,
          photoURL,
        })

        navigate(`/user/${uid}`)
        toast.success('Login realizado com sucesso!')
      }
    })
    .catch((error) => {
      console.error(
        `Algo deu errado ao fazer login com o Google. Erro: ${error}`,
      )
      throw new Error('Algo deu errado ao fazer login com o Google.')
    })
}

export function GetUser(
  setUser: React.Dispatch<React.SetStateAction<UserInfo | null>>,
) {
  const unsubscribe = auth.onAuthStateChanged((user) => {
    if (!user && location.pathname !== '/') {
      setTimeout(() => location.replace('/'), 0)
    } else {
      setUser(user)
    }
  })

  return unsubscribe
}

export async function SignOut() {
  await signOut(auth).catch((error) => {
    console.error(`Ocorreu um erro ao sair da conta. Erro: ${error}`)
    toast.error('Algo deu errado ao sair da conta, tente novamente.')
  })
}

export async function ThisUserExists(UserEmail1: string, UserEmail2: string) {
  const exists = (await getDoc(doc(db, `/users/${UserEmail1}`))).exists()

  if (!exists) {
    throw new Error('O usuário não existe.')
  } else {
    setDoc(doc(db, '/chats', `${UserEmail1}${UserEmail2}`), {})
  }
}

export function GetMessages(
  userEmail1: string,
  userEmail2: string,
  setMessages: React.Dispatch<React.SetStateAction<MessagesDocType[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const chatRef = collection(db, `/chats/${userEmail1}${userEmail2}/chat`)
  const q = query(chatRef, orderBy('timestamp', 'asc'))

  const unsubscribe = onSnapshot(q, (snap) => {
    snap.docChanges().forEach((change) => {
      const docData = change.doc.data() as MessagesDocType
      const docId = change.doc.id

      if (change.type === 'added') {
        setMessages((prev) => {
          if (prev.find(({ messageId }) => messageId === docId)) {
            return prev
          } else {
            return [
              ...prev,
              { ...docData, messageId: docId } as MessagesDocType,
            ]
          }
        })
      } else if (change.type === 'removed') {
        setMessages((prev) =>
          prev.filter(({ messageId }) => messageId !== docId),
        )
      } else if (change.type === 'modified') {
        setMessages((prev) => {
          return produce(prev, (draft) => {
            const messageIndex = draft.findIndex(
              ({ messageId }) => messageId === docId,
            )

            draft[messageIndex] = { ...docData, messageId: docId }
          })
        })
      }
    })
    setLoading(false)
  })

  return unsubscribe
}

export async function GetActiveUserChats(
  userEmail: string,
  setActiveUserChats: React.Dispatch<React.SetStateAction<UserInfo[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const chatsRef = collection(db, '/chats')
  await getDocs(chatsRef).then((docs) => {
    docs.forEach(async (document) => {
      if (document.id.includes(userEmail)) {
        const startsWithUserEmail = document.id.startsWith(userEmail)
        const indexOfUserEmail = document.id.indexOf(userEmail)

        if (startsWithUserEmail) {
          const email = document.id.slice(userEmail.length, document.id.length)
          SetActiveUserChats(email, setActiveUserChats)
        } else {
          const email = document.id.slice(0, indexOfUserEmail)
          SetActiveUserChats(email, setActiveUserChats)
        }
      }
    })
  })

  setLoading(false)
}

async function SetActiveUserChats(
  chatUserEmail: string,
  setActiveUserChats: React.Dispatch<React.SetStateAction<UserInfo[]>>,
) {
  const userRef = doc(db, `/users/${chatUserEmail}`)

  await getDoc(userRef).then((doc) => {
    setActiveUserChats((prev) => {
      if (prev.find(({ email }) => email === chatUserEmail)) {
        return prev
      } else {
        return [doc.data() as UserInfo, ...prev]
      }
    })
  })
}

export async function DeleteMessage(
  messageId: string,
  emails: [string, string] | undefined,
) {
  const email1 = emails && emails[0]
  const email2 = emails && emails[1]

  const messageRef = doc(db, `/chats/${email1}${email2}/chat/${messageId}`)

  try {
    await updateDoc(messageRef, {
      message: 'Mensagem excluída',
      wasDeleted: true,
    })
  } catch (error) {
    toast.error('Erro ao excluir mensagem. Tente novamente. ')
    console.error(`Erro ao excluir mensagem. Erro: ${error}`)
  }
}

export async function UpdateMessage(
  messageId: string,
  message: string,
  emails: [string, string] | undefined,
) {
  const email1 = emails && emails[0]
  const email2 = emails && emails[1]

  const messageRef = doc(db, `/chats/${email1}${email2}/chat/${messageId}`)

  try {
    await updateDoc(messageRef, { message, wasEdited: true })
  } catch (error) {
    toast.error('Erro ao editar mensagem. Tente novamente. ')
    console.error(`Erro ao editar mensagem. Erro: ${error}`)
  }
}

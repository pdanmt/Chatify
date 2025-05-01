import {
    GoogleAuthProvider,
    setPersistence,
    browserLocalPersistence,
    signInWithPopup,
} from "firebase/auth"
import { setDoc, doc, getDoc, collection, getDocs, addDoc, orderBy, query, onSnapshot, updateDoc } from "firebase/firestore"
import { auth, db } from "./firebase-config"
import { toast } from "react-toastify"
import { sortEmailsByLenght } from "@/utils/sort-emails"
import { UserInfo } from "@/context/user-context"
import { MessageBody } from "@/components/my-components/conversation/talk"

// navigate: NavigateFunction
export async function SignIn() {
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

        toast.success('Login realizado com sucesso!')
        setTimeout(() => location.replace('/'), 400)
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
    if (!user && location.pathname !== '/login') {
      setTimeout(() => location.replace('/login'), 0)
    } else if (user) {
      setUser(user as UserInfo)
    }
  })

  return unsubscribe
}

export async function CreateChatIfThatUserExist(
  currentUserEmail: string,
  chatUserEmail: string
) {
  const userRef = doc(db, `/users/${chatUserEmail}`)
  const chatUser = await getDoc(userRef)
  
  const [userEmail1, userEmail2] = sortEmailsByLenght(currentUserEmail, chatUserEmail)
  const chatRef = doc(db, `/chats/${userEmail1}${userEmail2}`)
  const chatExists = (await getDoc(chatRef)).exists()

  if (!chatUser.exists()) {
    toast.error('O usuário não existe.')
    throw new Error('O usuário não existe.')
  } else if (!chatExists) {
    setDoc((chatRef), {})
  }

  return chatUser.data() as UserInfo
}

export async function GetActiveUserChats(
  userEmail: string,
  setUserChats: React.Dispatch<React.SetStateAction<UserInfo[]>>
) {
  const chatsRef = collection(db, '/chats')
  await getDocs(chatsRef).then((docs) => {
    docs.forEach(async (document) => {
      if (document.id.includes(userEmail)) {
        const startsWithUserEmail = document.id.startsWith(userEmail)
        const indexOfUserEmail = document.id.indexOf(userEmail)

        // pega as informações da pessoa que o usuário está conversando
        const email = () => {
            if (startsWithUserEmail) {
            const email = document.id.slice(userEmail.length, document.id.length)
            return email
          } else {
            const email = document.id.slice(0, indexOfUserEmail)
            return email
          }
        }

        const infos = await getDoc(doc(db, `/users/${email()}`))
        setUserChats((prev) => [...prev, infos.data() as UserInfo])
      }
    })
  })
}

export async function SendMessage(
  currentUserEmail: string,
  chatUserEmail: string,
  message: string
) {
  const [userEmail1, userEmail2] = sortEmailsByLenght(currentUserEmail, chatUserEmail)
  const chatRef = collection(db, `/chats/${userEmail1}${userEmail2}/chat`)

  try {
    await addDoc(chatRef, {
      message,
      timestamp: new Date(),
      hour: new Date().toISOString(),
      sendBy: currentUserEmail,
      deleted: false,
      edited: false,
    } as MessageBody)
  } catch (error) {
    console.error(`Erro ao enviar mensagem: ${error}`)
    toast.error('Erro ao enviar mensagem, tente novamente.')
  }
}

export function GetActiveChatMessages(
  currentUserEmail: string,
  chatUserEmail: string,
  setMessages: React.Dispatch<React.SetStateAction<MessageBody[]>>,
) {
  const [userEmail1, userEmail2] = sortEmailsByLenght(currentUserEmail, chatUserEmail)
  const chatRef = collection(db, `/chats/${userEmail1}${userEmail2}/chat`)
  const q = query(chatRef, orderBy('timestamp', 'asc'))

  const unsubscribe = onSnapshot(q, (snap) => {
    snap.docChanges().forEach((change) => {
      const docData = change.doc.data() as MessageBody
      const docId = change.doc.id

      // se a mensagem já existir, nada acontece, caso ela tenha sido adicionada, um id é passado à ela.
      if (change.type === 'added') {
        setMessages((prev) => {
          if (prev.find(({ id }) => id === docId)) {
            return prev
          }

          return [
            ...prev,
            { ...docData, id: docId } as MessageBody,
          ]
        })
      } else if (change.type === 'modified') {
        setMessages((prev) => {
          const newMessages = prev.map((props) => {
            if (props.id === docId) {
              return { ...docData, id: docId }
            }

            return props
          })

          return newMessages
        })
      }
    })
  })

  return unsubscribe
}

export async function DeleteMessage(
  id: string,
  currentUserEmail: string,
  chatUserEmail: string,
) {
  const [userEmail1, userEmail2] = sortEmailsByLenght(currentUserEmail, chatUserEmail)
  const chatRef = doc(db, `/chats/${userEmail1}${userEmail2}/chat/${id}`)

  try {
    await updateDoc(chatRef, { deleted: true, message: 'Mensagem apagada' })
  } catch (error) {
    toast.error('Erro ao deletar mensagem.')
    console.error(`Erro ao deletar mensagem. ERRO: ${error}`)
  }
}

export async function EditMessage(
  id: string,
  message: string,
  currentUserEmail: string,
  chatUserEmail: string,
) {
  const [userEmail1, userEmail2] = sortEmailsByLenght(currentUserEmail, chatUserEmail)
  const chatRef = doc(db, `/chats/${userEmail1}${userEmail2}/chat/${id}`)

  try {
    await updateDoc(
      chatRef,
      { edited: true, message })
  } catch (error) {
    toast.error('Erro ao editar mensagem.')
    console.error(`Erro ao editar mensagem. ERRO: ${error}`)
  }
}
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// import { getMessaging, getToken } from 'firebase/messaging'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
// export const messaging = getMessaging(app)
// getToken(messaging, {
//   vapidKey:
//     'BAT3QrO9LU2IUD5NRYQ--yr0-_BzRim1vPndYByi5X_Fh9bZJeAI65iAWvrm4ieWfwG_BQkOERGM7xFniw1faYI',
// })

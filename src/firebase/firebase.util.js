import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
}

export const createUserProfileDocument = async(userAuth, additionalData) => {
  // --> userAuthにはuidとはemailとかいろんな情報が入ってる

  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  // const userRef = firestore.doc() // path to user object

  const snapshot = await userRef.get()  // --> userRefは19行目のuserRef。snapshot自体にはそんなデータ入ってない。
  // snapshotってもっといろんなデータ入ってるのかと思った。違った

  console.log("snapshot: ", snapshot);

  if (!snapshot.exist) {
    const  {displayName, email} = userAuth
    const createdAt = new Date()

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch(error) {
      console.log("Error creating data: ", error.message);
    }
  }

  return userRef
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider() // --> googleアカウント使うAuthで必要なやつだと思う

provider.setCustomParameters({ prompt: 'select_account' })

export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
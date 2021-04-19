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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  // --> userAuthにはuidとはemailとかいろんな情報が入ってる。App.jsからやってくる

  if (!userAuth) return;

  // console.log("userAuthhhh: ", userAuth);

  const userRef = firestore.doc(`users/${userAuth.uid}`)
  // userAuth.uidのは、firestoreで自動生成されたidが入ってる

  // const userRef = firestore.doc() // path to user object

  const snapshot = await userRef.get()  // --> userRefは19行目のuserRef。snapshot自体にはそんなデータ入ってない。
  // snapshot.idにはfirebaseのauthの中にあるidが格納されてる
  // snapshotってもっといろんなデータ入ってるのかと思った。違った

  // console.log("snapshot: ", snapshot);

  if (!snapshot.exists) {
    const { displayName, email } = userAuth
    // displayNameとemailに、userAuth.displayNameとuserAuth.emailの値を入れてる
    const createdAt = new Date()

    console.log(userAuth)
    console.log("YOO: ", displayName);
    console.log("YOO: ", email);

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log("Error creating data: ", error.message);
    }
  }

  return userRef
}

export const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {
  const collectionRef = firestore.collection(collectionKey)

  // console.log(collectionRef);

  const batch = firestore.batch()

  objectToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc() // --> return id って言ってた...?

    batch.set(newDocRef, obj)
  })

  return await batch.commit()
}

// --> collection: object, collection.docs: array
export const convertCollectionSnapShotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data()
    return {
      id: doc.id,
      title,
      items,
      routeName: encodeURI(title.toLowerCase())
    }
  })

  return transformedCollection.reduce((acc, collection) => {
    acc[collection.title.toLowerCase()] = collection
    return acc
  }, {})
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider() // --> googleアカウント使うAuthで必要なやつだと思う

provider.setCustomParameters({ prompt: 'select_account' })

export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
// import React, { useState, useEffect } from 'react';
// import './App.scss';
// import { Switch, Route, Redirect } from 'react-router-dom'
// import { connect } from 'react-redux'

// import HomePage from './pages/homepage/homepage.component';
// import Header from './components/header/header.component';
// // import ShopPage from './pages/shop/shop.component'
// import ShopPage from './pages/shop/shop.component'
// import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
// import { auth, createUserProfileDocument } from './firebase/firebase.util'
// // import { addCollectionAndDocuments } from './firebase/firebase.util'
// import CollectionPage from './pages/collection/collection-page.component'
// import CollectionOverview from './components/collection-overview/collection-overview.component'

// const PageNotFound = () => (
//   <div>
//     <h1>Page Not Found</h1>
//   </div>
// )

// function App({ collectionArray }) {
//   const [currentUser, setCurrentUser] = useState(null)

//   useEffect(() => {
//     let unsbscribeFromAuth = null;
//     unsbscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
//       // console.log("ONAUTHSTATECHANGED: ", userAuth);
//       // --> このuserAuthにemailとかuidとかいろんな情報が入ってて、それをcreateUserProfileDocumentに渡してる


//       const userRef = await createUserProfileDocument(userAuth)

//       if (userAuth) {
//         userRef.onSnapshot((snapshot) => {
//           // console.log(snapshot.data()); // --> firebase.util.jsの32行目でsetしたオブジェクトが入ってる
//           setCurrentUser({
//             id: snapshot.id, // --> snapshotの中には自動的にidが入ってる
//             ...snapshot.data()  // --> 残りは自分で設定したやつ
//           })
//         })
//       } else {
//         setCurrentUser(userAuth)
//       }
//     })

//     return () => { // --> called just before the dom gets removed
//       unsbscribeFromAuth()
//     }
//   }, [])

//   // useEffect(() => {
//   //   console.log(collectionArray);
//   //   addCollectionAndDocuments('collections', collectionArray.map(({title, items}) => ({title, items})) ) // 2nd argument is the collections of array

//   // }, [])



//   return (
//     <div className="App">
//       <Header currentUser={currentUser} />
//       <Switch>
//         <Route exact path="/" component={HomePage} />
//         <Route exact path="/shop" component={ShopPage} />
//         {/* <Route path="/signin" component={SignInAndSignUp} /> */}
//         {/* <Route path="/signin" render={() => {
//           currentUser ? (<Redirect to="/" />) : (<SignInAndSignUp />)
//         }} /> */}
//         <Route path="/signin" render={() => currentUser ? (<Redirect to="/" />) : (<SignInAndSignUp />)} />

//         <Route component={PageNotFound} />

//       </Switch>
//       {/* <br/><br/><br/><br/><br/>
//       ------------------------------------------
//       <CollectionPage />
//       ------------------------------------------
//       <br/><br/><br/><br/><br/>
//       ------------------------------------------
//       <CollectionOverview />
//       ------------------------------------------ */}
//       {/* <ShopPage /> */}
//     </div>
//   );
// }

// const mapStateProps = (state) => {

//   return ({
//     collectionArray: state.shop.collections
//   })
// }

// export default connect(mapStateProps)(App);


import React, { useState, useEffect } from 'react';
import './App.scss';
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import HomePage from './pages/homepage/homepage.component';
import Header from './components/header/header.component'
import ShopPage from './pages/shop/shop.component';
import CheckoutPage from './pages/checkout/checkout-page.component'
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.util'
// import { addCollectionAndDocuments } from './firebase/firebase.util'

const PageNotFound = () => (
  <div>
    <h1>Page Not Found</h1>
  </div>
)

function App({ collectionArray }) {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    let unsubscribeFromAuth = null

    unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      // console.log(userAuth)

      const userRef = await createUserProfileDocument(userAuth)

      if (userAuth) {
        userRef.onSnapshot((snapShot) => {
          // console.log(snapShot)
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          })
        })
      } else {
        setCurrentUser(userAuth)
      }
    })

    //componentDidUnmount
    //cleanup function
    return () => {
      unsubscribeFromAuth()
    }
  }, [])

  // useEffect(() => {
  //   addCollectionAndDocuments('collections', collectionArray.map(({title, items}) => ({ title, items})) ) //2nd argument is the collections array
  // }, [])

  return (
    <div className="App">
      <Header currentUser={currentUser} />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route path="/checkout" component={CheckoutPage} />
        <Route path="/signin" render={() => currentUser ? (<Redirect to="/" />) : (<SignInAndSignUp />)} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => ({
  collectionArray: state.shop.collections
})

export default connect(mapStateToProps)(App);
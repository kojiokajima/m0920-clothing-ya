import React, { useState, useEffect } from 'react';
import './App.scss';
import { Switch, Route, Redirect } from 'react-router-dom'

import HomePage from './pages/homepage/homepage.component';
import Header from './components/header/header.component';
import ShopPage from './pages/shop/shop.component'
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import { auth, createUserProfileDocument } from './firebase/firebase.util'

const PageNotFound = () => (
  <div>
    <h1>Page Not Found</h1>
  </div>
)

function App() {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    let unsbscribeFromAuth = null;
    unsbscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      console.log("ONAUTHSTATECHANGED: ", userAuth);
      // --> このuserAuthにemailとかuidとかいろんな情報が入ってて、それをcreateUserProfileDocumentに渡してる
      
      // console.log(userAuth);
      
      console.log("CREATEPROFILEDOCUMENT(APP)" );
      const userRef = await createUserProfileDocument(userAuth)

      if (userAuth) {
        userRef.onSnapshot((snapshot) => {
          // console.log(snapshot.data()); // --> firebase.util.jsの32行目でsetしたオブジェクトが入ってる
          setCurrentUser({
            id: snapshot.id, // --> snapshotの中には自動的にidが入ってる
            ...snapshot.data()  // --> 残りは自分で設定したやつ
          })
        })
      } else {
        setCurrentUser(userAuth)
      }
    })

    return () => { // --> called just before the dom gets removed
      unsbscribeFromAuth()
    }
  }, [])



  return (
    <div className="App">
      <Header currentUser={currentUser} />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/shop" component={ShopPage} />
        {/* <Route path="/signin" component={SignInAndSignUp} /> */}
        {/* <Route path="/signin" render={() => {
          currentUser ? (<Redirect to="/" />) : (<SignInAndSignUp />)
        }} /> */}
        <Route path="/signin" render={() => currentUser ? (<Redirect to="/" />) : (<SignInAndSignUp />)} />

        <Route component={PageNotFound} />

      </Switch>
    </div>
  );
}

export default App;

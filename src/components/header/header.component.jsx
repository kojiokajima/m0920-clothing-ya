import React from "react";
import { Link } from "react-router-dom";

import Logo from "../../assets/ClothingYa.png";
import {auth} from '../../firebase/firebase.util'

import "./header.styles.scss";

const Header = ({currentUser}) => (
  <div className="header">
    <Link className="logo-container" to="/">
      <img src={Logo} alt="logo" />
    </Link>
    <div className="options">
      <Link className="option" to="/shop">
        Shop
      </Link>
      {
        currentUser ? (
        <div className="option" onClick={() => auth.signOut()}>Sign Out</div>
        ) : (
        <Link className="option" to="/signin">
          Sign In
        </Link>
      )}
      
    </div>
  </div>
);

export default Header;

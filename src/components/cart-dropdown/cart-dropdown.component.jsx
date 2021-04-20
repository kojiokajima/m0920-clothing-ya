import React from "react";
import { connect } from "react-redux";
// import styled from 'styled-components';

import "./cart-dropdown.styles.scss";

import CartItem from "../cart-item/cart-item.component";
// import CustomButton from "../custom-button/custom-button.component";
import {CartDropdownContainer, CartDropdownButton} from './cart-dropdown.styles'



const CartDropdown = ({ cartItemsProps }) => {
  return (
    // <div className="cart-dropdown">
    <CartDropdownContainer>
      <div className="cart-items">
        {cartItemsProps.length > 0 ? (
          cartItemsProps.map((cartItem) => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
          <span className="empty-message">Your cart is empty</span>
        )}
      </div>
      {/* <CustomButton>GO TO CHECKOUT</CustomButton> */}
      <CartDropdownButton>GO TO CHECKOUT</CartDropdownButton>
    {/* </div> */}
    </CartDropdownContainer>
  );
};

const mapStateToProps = (state) => ({
  cartItemsProps: state.cart.cartItems
});

export default connect(mapStateToProps)(CartDropdown);

import React from "react";
import {withRouter} from 'react-router-dom'
import {useReactiveVar} from '@apollo/client'

import "./cart-dropdown.styles.scss";

import CartItem from "../cart-item/cart-item.component";
// import CustomButton from "../custom-button/custom-button.component";
import {
  CartDropdownContainer,
  CartDropdownButton,
  EmptyMessageContainer,
  CartItemsContainer,
} from './cart-dropdown.styles'
import {cartHiddenVar, cartItemsVar} from '../../graphql/cache'



const CartDropdown = ({ history }) => {
  // console.log("HIS: ", history);
  const cartItems = useReactiveVar(cartItemsVar)
  const cartHidden = useReactiveVar(cartHiddenVar)

  return (
    // <div className="cart-dropdown">
    <CartDropdownContainer>
      <CartItemsContainer>
        {cartItems.length > 0 ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
          <EmptyMessageContainer>Your cart is empty</EmptyMessageContainer>
        )}
      </CartItemsContainer>
      {/* <CustomButton>GO TO CHECKOUT</CustomButton> */}
      <CartDropdownButton
        onClick={() => {
          history.push('/checkout')
          // dispatch(toggleCartHidden())
          cartHiddenVar(!cartHidden)
        }}
      >GO TO CHECKOUT</CartDropdownButton>
    {/* </div> */}
    </CartDropdownContainer>
  );
};

const mapStateToProps = (state) => ({
  cartItemsProps: state.cart.cartItems
});

export default withRouter(CartDropdown);




// import React from "react";
// import { connect } from "react-redux";
// // import styled from 'styled-components';
// import {withRouter} from 'react-router-dom'

// import "./cart-dropdown.styles.scss";

// import CartItem from "../cart-item/cart-item.component";
// import {toggleCartHidden} from '../../redux/cart/cart.actions'
// // import CustomButton from "../custom-button/custom-button.component";
// import {CartDropdownContainer, CartDropdownButton} from './cart-dropdown.styles'



// const CartDropdown = ({ cartItemsProps, history, dispatch }) => {
//   console.log("HIS: ", history);
//   return (
//     // <div className="cart-dropdown">
//     <CartDropdownContainer>
//       <div className="cart-items">
//         {cartItemsProps.length > 0 ? (
//           cartItemsProps.map((cartItem) => (
//             <CartItem key={cartItem.id} item={cartItem} />
//           ))
//         ) : (
//           <span className="empty-message">Your cart is empty</span>
//         )}
//       </div>
//       {/* <CustomButton>GO TO CHECKOUT</CustomButton> */}
//       <CartDropdownButton
//         onClick={() => {
//           history.push('/checkout')
//           dispatch(toggleCartHidden())
//         }}
//       >GO TO CHECKOUT</CartDropdownButton>
//     {/* </div> */}
//     </CartDropdownContainer>
//   );
// };

// const mapStateToProps = (state) => ({
//   cartItemsProps: state.cart.cartItems
// });

// export default withRouter(connect(mapStateToProps)(CartDropdown));

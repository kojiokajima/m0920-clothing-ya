import React from 'react'
import {connect} from 'react-redux'
import {useReactiveVar} from '@apollo/client'

import './cart-icon.styles.scss'

// import {toggleCartHidden} from '../../redux/cart/cart.actions'

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'
import {cartHiddenVar} from '../../graphql/cache'

const CartIcon = ({ itemCount}) => {
  const cartHidden = useReactiveVar(cartHiddenVar)

  
  return (
    <div className="cart-icon">
        <ShoppingIcon className="shopping-icon" onClick={() => cartHiddenVar(!cartHidden)} />
        <span className="item-count">{itemCount}</span>
    </div>
  )
}


const mapStateToProps = (state) => {
// const mapStateToProps = ({cart: {cartItems}}) => {

  const quantity = state.cart.cartItems.reduce((acc, cur) => {
    return acc + cur.quantity
  }, 0)
  // itemCount: cartItems.reduce((acc, cartItem) => (acc + cartItem.quantity), 0)

  return ({
  // itemCount: quantity
  itemCount: quantity
})}

// const mapDispatchToProps = (dispatch) => ({
//   toggleCartHiddenProps: () => dispatch(toggleCartHidden())
//   // toggleCartHiddenProps: toggleCartHidden
// })

// このコンポーネントでは変数のprops、つまりstate?を使わないからmapStateToPropsがnullになってるってことかなぁ
export default connect(mapStateToProps)(CartIcon)

// function sumOfQuantity(arr) {
//   const reducer = (sum, item) => sum + item.quantity
//   const initVal = 0
//   return arr.reduce(reducer, initVal)
// }
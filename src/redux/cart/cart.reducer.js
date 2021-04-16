import {ADD_CART_ITEM, TOGGE_CART_HIDDEN} from './cart.actions'
import {addItemToCart} from './cart.util'

// init state
const INITIAL_STATE = {
  cartItems: [],
  hidden: true
}

// reducer function
const cartReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case TOGGE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden
      }
    case ADD_CART_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload) // -> cartItemsは配列、action.payloadはなんだっけ
      }
    default:
      return state;
  }
}

export default cartReducer
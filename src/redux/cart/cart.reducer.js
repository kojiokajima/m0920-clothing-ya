import {ADD_CART_ITEM, TOGGE_CART_HIDDEN} from './cart.actions'

// init state
const INITIAL_STATE = {
  cartItems: [],
  hidden: false
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
        cartItems: [...state.cartItems, action.payload]
      }
    default:
      return state;
  }
}

export default cartReducer
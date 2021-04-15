// action types
export const ADD_CART_ITEM = 'ADD_CART_ITEM'
export const TOGGE_CART_HIDDEN = 'TOGGE_CART_HIDDEN'

// action creaters
export const addItem = (item) => ({
  type: ADD_CART_ITEM,
  payload: item
})

export const toggleCartHidden = () => ({
  type: TOGGE_CART_HIDDEN,
})
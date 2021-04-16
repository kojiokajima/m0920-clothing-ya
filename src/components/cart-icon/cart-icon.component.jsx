import React from 'react'
import {connect} from 'react-redux'
// import { bindActionCreators } from 'redux'

import './cart-icon.styles.scss'

import {toggleCartHidden} from '../../redux/cart/cart.actions'

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'

const CartIcon = ({toggleCartHiddenProps}) => {
  return (
    <div className="cart-icon">
        <ShoppingIcon className="shopping-icon" onClick={toggleCartHiddenProps} />
        <span className="item-count">0</span>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  toggleCartHiddenProps: () => dispatch(toggleCartHidden())
  // toggleCartHiddenProps: toggleCartHidden
})

// このコンポーネントでは変数のprops、つまりstate?を使わないからmapStateToPropsがnullになってるってことかなぁ
export default connect(null, mapDispatchToProps)(CartIcon)
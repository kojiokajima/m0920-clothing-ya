import React from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import {
  CheckoutPageContainer,
  CheckoutHeaderContainer,
  HeaderBlockContainer,
  TotalContainer,
  WarningContainer
} from './checkout-page.style'

import {selectCartTotal, selectCartItems} from '../../redux/cart/cart.selector'
import CheckoutItem from '../../components/checkout-item/check-item.conponent' 
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component'

const CheckoutPage = ({cartItems, total}) => (
  <CheckoutPageContainer>
    <CheckoutHeaderContainer>
      <HeaderBlockContainer>
        <span>Product</span>
      </HeaderBlockContainer>
      <HeaderBlockContainer>
        <span>Description</span>
      </HeaderBlockContainer>
      <HeaderBlockContainer>
        <span>Quantity</span>
      </HeaderBlockContainer>
      <HeaderBlockContainer>
        <span>Price</span>
      </HeaderBlockContainer>
      <HeaderBlockContainer>
        <span>Remoove</span>
      </HeaderBlockContainer>
    </CheckoutHeaderContainer>

      {/* // cartItem to map */}
      {cartItems.map((cartItem) => (
        // checkout item component
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}

    <TotalContainer>TOTAL: ${total}</TotalContainer>
    <WarningContainer>

    </WarningContainer>

    <StripeCheckoutButton price={total} />

    {/* //stripe button */}
  </CheckoutPageContainer>
)

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal
})

export default connect(mapStateToProps)(CheckoutPage)
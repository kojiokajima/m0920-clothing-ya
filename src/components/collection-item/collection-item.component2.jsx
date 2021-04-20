import React from 'react'
import {connect} from 'react-redux'

import './collection-item.styles.scss'

import CustomButton from '../custom-button/custom-button.component'
import {addItem} from '../../redux/cart/cart.actions'

const CollectionItem = ({ item, addItemProps}) => {
    // --> itemはCollectionPreviewから渡ってきたオブジェクト
    // --> addItemPropsはmapDispatchToPropsで作られたprops
    const {name, price, imageUrl} = item
    return (
    <div className="collection-item">
        <div className="image" style={{ backgroundImage: `url(${imageUrl})`}}></div>
        <div className="collection-footer">
            <span className="name">{name}</span>
            <span className="price">{price}</span>
        </div>
        <CustomButton onClick={() => addItemProps(item)} >Add to Cart</CustomButton>
        {// -->addItemPropsにitemっていうオブジェクトを渡してる。 addItemはcart.actions参照
        }
    </div>
)}

const mapDispatchToProps = (dispatch) => ({
    addItemProps: (item) => dispatch(addItem(item))
})

export default connect(null, mapDispatchToProps)(CollectionItem)
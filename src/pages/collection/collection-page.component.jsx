import React from 'react'
import { connect } from 'react-redux'

import {
  CollectionPageContainer,
  CollectionTitle,
  CollectionItemsContainer,
} from './collection-page.styles'

import CollectionItem from '../../components/collection-item/collection-item.component';
import { selectCollection } from '../../redux/shop/shop.selector'

const CollectionPage = ({ collections }) => {
    console.log('cols: ', collections)
    const {title, items} = collections
      // --> collectionsオブジェクトにはtitleとitemsプロパティないから、まるっと表示されてないのかそうかそうか
      //   console.log("COLLECTIONSSSS: ", collections); // --> {hats: {…}, mens: {…}, jackets: {…}, womens: {…}, sneakers: {…}}
    return(
        <CollectionPageContainer>
            <CollectionTitle>{title}</CollectionTitle>
            <CollectionItemsContainer>
                {items && items.map((item) => (
                    <CollectionItem key={item.id} item={item} />
                ))}
            </CollectionItemsContainer>
        </CollectionPageContainer>
    )
}

const mapStateToProps = (state, ownProps) => {
    console.log("STATE IS:", state );
    console.log("OWN PROPS: ", ownProps);
    return ({
    collections: selectCollection(ownProps.match.params.collectionId)(state)
})}

export default connect(mapStateToProps)(CollectionPage)
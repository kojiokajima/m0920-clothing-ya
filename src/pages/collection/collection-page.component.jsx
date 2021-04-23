import React from 'react'

import {
  CollectionPageContainer,
  CollectionTitle,
  CollectionItemsContainer,
} from './collection-page.styles'

import CollectionItem from '../../components/collection-item/collection-item.component';

const CollectionPage = ({ collections }) => {
    console.log("COLLECTIONS: ", collections);
    const {title, items} = collections
    return(
        <CollectionPageContainer>
            <CollectionTitle>{title && title}</CollectionTitle>
            <CollectionItemsContainer>
                {items && items.map((item) => (
                    <CollectionItem key={item.id} item={item} />
                ))}
            </CollectionItemsContainer>
        </CollectionPageContainer>
    )
}

export default CollectionPage
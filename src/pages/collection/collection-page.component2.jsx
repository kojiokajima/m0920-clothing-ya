import React from "react";
import { connect } from "react-redux";


import {
  CollectionPageContainer,
  CollectionTitle,
  CollectionItemsContainer,
} from "./collection-page.styles";

import CollectionItem from "../../components/collection-item/collection-item.component";
import {selectCollection} from '../../redux/shop/shop.selector'

const CollectionPage = ({ collections }) => {
  console.log("COLLECTION: ", collections);
  const { title, items } = collections;
  // --> collectionsオブジェクトにはtitleとitemsプロパティないから、まるっと表示されてないのかそうかそうか
//   console.log("COLLECTIONSSSS: ", collections); // --> {hats: {…}, mens: {…}, jackets: {…}, womens: {…}, sneakers: {…}}
  console.log("TITLE: ", title);
  console.log("ITEMS: ", items);
  return (
    <CollectionPageContainer>
      <CollectionTitle>{title}</CollectionTitle>
      <CollectionItemsContainer>
        {items &&
          items.map((item) => (
            <CollectionItem key={item.id} item={item} />
            // <div>yoyoyoyo</div>
          ))}
      </CollectionItemsContainer>
    </CollectionPageContainer>
  );
};

const mapStateToProps = (state, ownProps) => ({
  collections: selectCollection(ownProps.match.params.collectionIs)(state)
});

export default connect(mapStateToProps)(CollectionPage);

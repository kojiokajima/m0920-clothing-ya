import React from "react";
import { connect } from "react-redux";

import {
  CollectionPageContainer,
  CollectionTitle,
  CollectionItemsContainer,
} from "./collection-page.styles";

import CollectionItem from "../../components/collection-item/collection-item.component";

const CollectionPage = ({ collections }) => {
  const { title, items } = collections;
  // --> collectionsオブジェクトにはtitleとitemsプロパティないから、まるっと表示されてないのかそうかそうか
  console.log("COLLECTIONSSSS: ", collections); // --> {hats: {…}, mens: {…}, jackets: {…}, womens: {…}, sneakers: {…}}
  console.log("ITEMSSSSS: ", items);
  return (
    <CollectionPageContainer>
      <CollectionTitle>{title}</CollectionTitle>
      <CollectionItemsContainer>
        {items &&
          items.map((item) => (
            // <CollectionItem key={item.id} item={item} />
            <div>yoyoyoyo</div>
          ))}
      </CollectionItemsContainer>
    </CollectionPageContainer>
  );
};

const mapStateToProps = (state) => ({
  collections: state.shop.collections,
});

export default connect(mapStateToProps)(CollectionPage);

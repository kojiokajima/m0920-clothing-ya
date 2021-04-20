import React from 'react' 
import { connect } from 'react-redux'

import { CollectionsOverviewContainer } from './collection-overview.styles'

import CollectionPreview from '../collection-preview/collection-preview.component';

const CollectionOverview = ({ collectionsProps }) => (
    <CollectionsOverviewContainer>
    {
        collectionsProps && collectionsProps.map(({ id, ...otherCollectionProps}) => (
            <CollectionPreview key={id} {...otherCollectionProps} />
        ))
    }
    </CollectionsOverviewContainer>
)

const mapStateToProps = state => {
  console.log("STATE IS ", state.shop.collections);
  console.log("Play: ", Object.keys(state.shop.collections).map(key => state.shop.collections[key])); // --> 配列[{…}, {…}, {…}, {…}, {…}]
  console.log("Play: ", Object.keys(state.shop.collections).map(key => state.shop.collections[key]));
  // --> 配列[{…}, {…}, {…}, {…}, {…}]
  // --> 各要素はこんな感じ -- {id: "8870jJJ5yetOvY8xuMbv", title: "Hats", items: Array(9), routeName: "hats"}
  return ({
    collectionsProps: Object.keys(state.shop.collections).map(key => state.shop.collections[key])
    // --> mapの中のkeyには["hats", "mens", "jackets", "womens", "sneakers"]の各要素が入ってる
    // --> その各要素を、各要素を含むstoreのデータに置き換えてるのかぁ
    // --> それをcollectionsPropsって名前でpropsとして渡してる
    // --> 要はあれだ、あとでmapで回したいからオブジェクトを配列にしてるんだ
})}

export default connect(mapStateToProps)(CollectionOverview)
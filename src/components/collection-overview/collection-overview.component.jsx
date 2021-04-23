import React from 'react' 
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { CollectionsOverviewContainer } from './collection-overview.styles'

import CollectionPreview from '../collection-preview/collection-preview.component';
import { selectCollectionForPreview } from '../../redux/shop/shop.selector'

const CollectionOverview = ({ collections }) => {
    console.log("COLLECTIONS IS  ", collections);
    return (
    <CollectionsOverviewContainer>
    {
        collections && collections.map(({ id, ...otherCollectionProps}) => ( // --> otherCollectionPropsにはitems(配列)とtitle(文字列)が入ってるはず
            <CollectionPreview key={id} {...otherCollectionProps} />
        ))
    }
    </CollectionsOverviewContainer>
)}

// const mapStateToProps = state => {
//   console.log("STATE IS ", state);
//   console.log("STATE IS ", state.shop);
//   console.log("STATE IS ", state.shop.collections);
// //   console.log("Play: ", Object.keys(state.shop.collections).map(key => state.shop.collections[key])); // --> 配列[{…}, {…}, {…}, {…}, {…}]
//   // --> 配列[{…}, {…}, {…}, {…}, {…}]
//   // --> 各要素はこんな感じ -- {id: "8870jJJ5yetOvY8xuMbv", title: "Hats", items: Array(9), routeName: "hats"}
//   return ({
//     collectionsProps: Object.keys(state.shop.collections).map(key => state.shop.collections[key])
//     // --> mapの中のkeyには["hats", "mens", "jackets", "womens", "sneakers"]の各要素が入ってる
//     // --> その各要素を、各要素を含むstoreのデータに置き換えてるのかぁ
//     // --> それをcollectionsPropsって名前でpropsとして渡してる
//     // --> 要はあれだ、あとでmapで回したいからオブジェクトを配列にしてるんだ
// })}


export default CollectionOverview
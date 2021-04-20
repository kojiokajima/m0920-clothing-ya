import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

// import SHOP_DATA from './shop.data.js'
import {
  firestore,
  convertCollectionSnapShotToMap,
} from "../../firebase/firebase.util";

import {
  fetchCollectionsStart,
  fetchCollectionsSuccess,
  fetchCollectionsFailure,
  updateCollection,
} from "../../redux/shop/shop.actions";

import CollectionOverviewContainer from "../../components/collection-overview/collection-overview.container";
import CollectionPageContainer from "../collection/collection-page.container";

const ShopPage = ({
  fetchCollectionsStartProps,
  fetchCollectionsSuccessProps,
  updateCollectionProps,
  fetchCollectionsFailureProps,
  match,
}) => {
  useEffect(() => {
    // fetchCollectionsStartAsyncProps() //promise-based fetching of data

    console.log("MATCH: ", match); // --> {path: "/shop", url: "/shop", isExact: true, params: {…}}
    // --> たぶんmatchはpropsの中に自動的に入るやつ


    let unsubscribeFromSnapShot = null;

    const collectionRef = firestore.collection("collections");

    try {
      unsubscribeFromSnapShot = collectionRef.onSnapshot(async (snapShot) => {
        // --> snapShotは謎のあれ(t {_firestore: t, _delegate: t})
        fetchCollectionsStartProps();
        const collectionsMap = await convertCollectionSnapShotToMap(snapShot);
        // --> いきなりわかりやすいやつになった({hats: {…}, mens: {…}, jackets: {…}, womens: {…}, sneakers: {…}})
        // updateCollectionProps(collectionsMap)
        fetchCollectionsSuccessProps(collectionsMap);
        // --> 今unsubscribeFromSnapShotには謎の関数が入ってる
        // --> あーあれか、unsubscribeFromSnapShotはfetchCollectionsStartPropsとfetchCollectionsSuccessPropsを実行するためのものだったのか.
      });
    } catch (error) {
      fetchCollectionsFailureProps(error.message);
    }

    return () => {
      console.log("HAHAHA: ", unsubscribeFromSnapShot());
      unsubscribeFromSnapShot(); //unsubscribe
    };
  }, []);

  return (
    <div className="shop-page">
      {/* {
        collections && collections.map(({ id, ...otherCollectionProps }) => (
            <CollectionPreview key={id} {...otherCollectionProps} />
            ))
        } */}

      <Route
        exact
        path={`${match.path}`}
        component={CollectionOverviewContainer}
      />
      <Route
        path={`${match.path}/:collectionId`}
        component={CollectionPageContainer}
      />
    </div>
  );
};

// class ShopPage extends React.Component {
//   constructor(props) {
//     super(props)

//     this.state = {
//       collections: SHOP_DATA,
//     }
//   }

//   render() {
//     const { collections } = this.state

//     return (
//       <div className='shop-page'>
//         {collections &&
//           collections.map(({ id, ...otherCollectionProps }) => (
//             <CollectionPreview key={id} {...otherCollectionProps} />
//           ))}
//       </div>
//     )
//   }
// }

// const mapStateToProps = (state) => ({
//   collectionsProps: state.shop.collections,
// })

const mapDispatchToProps = (dispatch) => ({
  updateCollectionProps: (collectionsMap) =>
    dispatch(updateCollection(collectionsMap)),
  fetchCollectionsStartProps: () => dispatch(fetchCollectionsStart()),
  fetchCollectionsSuccessProps: (collectionsMap) =>
    dispatch(fetchCollectionsSuccess(collectionsMap)),
  fetchCollectionsFailureProps: (err) => dispatch(fetchCollectionsFailure(err)),
});

export default connect(null, mapDispatchToProps)(ShopPage);

import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'


// import SHOP_DATA from './shop.data.js'
import {
  firestore,
  convertCollectionSnapShotToMap,
} from '../../firebase/firebase.util'
// import CollectionPreview from '../../components/collection-preview/collection-preview.component'
// import CollectionOverview from '../../components/collection-overview/collections-overview.component'
import {
  fetchCollectionsStartAsync,
  updateCollection,
} from '../../redux/shop/shop.actions'

import {selectIsCollectionFetching, selectIsCollectionLoaded} from '../../redux/shop/shop.selector'

import CollectionOverviewContainer from '../../components/collection-overview/collection-overview.container'
import CollectionPageContainer from '../collection/collection-page.container'

const ShopPage = ({
  fetchCollectionsStartProps,
  fetchCollectionsSuccessProps,
  updateCollectionProps,
  fetchCollectionsFailureProps,
  match,
  // collectionsProps
//   --> 最初の2つのpropsは、下のmapStateToPropsで作ったprops
  // --> matchはオブジェクト({path: "/shop", url: "/shop", isExact: true, params: {…}})
}) => {
  // console.log("UPDATE: ", collectionsProps);
  console.log("MATCH: ", match);
  useEffect(() => {
    console.log("USE STATE");
    fetchCollectionsStartAsyncProps()

    let unsubscribeFromSnapShot = null

    const collectionRef = firestore.collection('collections')

    // unsubscribeFromSnapShot = collectionRef.onSnapshot(async (snapShot) => {
    //   // --> snapShotは謎のあれ(t {_firestore: t, _delegate: t})
    //   // console.log("SNAPSHOT IS ", snapShot);
    //   const collectionsMap = convertCollectionSnapShotToMap(snapShot)
    //   // --> いきなりわかりやすいやつになった({hats: {…}, mens: {…}, jackets: {…}, womens: {…}, sneakers: {…}})
    //   // console.log("collectionsMap is ", collectionsMap);
    //   updateCollectionProps(collectionsMap)
    // })
    try {
      unsubscribeFromSnapShot = collectionRef.onSnapshot(async (snapShot) => {
        fetchCollectionsStartProps()
        const collectionsMap = await convertCollectionSnapShotToMap(snapShot)
        // updateCollectionProps(collectionsMap)
        fetchCollectionsSuccessProps(collectionsMap)
      })
    } catch (error) {
      fetchCollectionsFailureProps(error.message)
    }

    return () => {
      unsubscribeFromSnapShot() //unsubscribe
    }
  }, [])

  return (
    <div className='shop-page'>
      {/* {
        collections && collections.map(({ id, ...otherCollectionProps }) => (
            <CollectionPreview key={id} {...otherCollectionProps} />
            ))
        } */}

      <Route exact path={`${match.path}`} component={CollectionOverviewContainer} />
      <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
    </div>
  )
}

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
const mapStateToProps = createStructuredSelector({
  isCollectionFetching: selectIsCollectionFetching,
  isCollectionLoaded: selectIsCollectionLoaded
})

// const mapDispatchToProps = (dispatch) => ({
//   updateCollectionProps: (collectionsMap) =>
//     dispatch(updateCollection(collectionsMap)),
//   fetchCollectionsStartAsyncProps: () => dispatch(fetchCollectionsStartAsync()),
// })
const mapDispatchToProps = (dispatch) => ({
  updateCollectionProps: (collectionsMap) =>dispatch(updateCollection(collectionsMap)),
  fetchCollectionsStartProps: () => dispatch(fetchCollectionsStart()),
  fetchCollectionsSuccessProps: (collectionsMap) => dispatch(fetchCollectionsSuccess(collectionsMap)),
  fetchCollectionsFailureProps: (err) => dispatch(fetchCollectionsFailure(err)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage)
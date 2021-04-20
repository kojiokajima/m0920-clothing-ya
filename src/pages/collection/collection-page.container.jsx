// import {connect} from 'react-redux'
// import {compose} from 'redux'
// import { createStructuredSelector } from 'reselect'

// import WithSpinner from '../../components/withSpinner/with-spinner.component';
// import CollectionPage from './collection-page.component';
// import { selectIsCollectionsLoaded } from '../../redux/shop/shop.selector'

// // const mapStateToProps = (state) => ({
// //     isLoading: !!state.shop.collections
// // })

// const mapStateToProps = createStructuredSelector({
//     isLoading: selectIsCollectionsLoaded
// })

// const CollectionPageContainer = compose(
//     connect(mapStateToProps),
//     WithSpinner
// )(CollectionPage)
// // やってること自体はきっと、
// // WithSpinner(CollectionPage)からの
// // connect(mapStateToProps)(WithSpinner(CollectionPage))ってことかな
// // てことはWithSpinnerで返ってきたコンポーネントとstoreを繋げてるってこと?かな?

// export default CollectionPageContainer
// // HOCはコンポーネントを受け取って、新しいコンポーネントを返す関数です。って。どういうこと。
// // const EnhancedComponent = higherOrderComponent(WrappedComponent);

// // CollectionPageっていうのはHatsのアイテムずらーとか、Jacketsのアイテムずらーとかのページ


import {connect} from 'react-redux'
import {compose} from 'redux'
import { createStructuredSelector } from 'reselect'

import WithSpinner from '../../components/withSpinner/with-spinner.component';
import CollectionPage from './collection-page.component';
import { selectIsCollectionsLoaded } from '../../redux/shop/shop.selector'

// const mapStateToProps = (state) => ({
//     isLoading: !!state.shop.collections
// })

const mapStateToProps = createStructuredSelector({
    isLoading: (state) => !selectIsCollectionsLoaded(state)
})

const CollectionPageContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionPage)
// やってること自体はきっと、
// WithSpinner(CollectionPage)からの
// connect(mapStateToProps)(WithSpinner(CollectionPage))ってことかな
// てことはWithSpinnerで返ってきたコンポーネントとstoreを繋げてるってこと?かな?

export default CollectionPageContainer
// // HOCはコンポーネントを受け取って、新しいコンポーネントを返す関数です。って。どういうこと。
// // const EnhancedComponent = higherOrderComponent(WrappedComponent);

// // CollectionPageっていうのはHatsのアイテムずらーとか、Jacketsのアイテムずらーとかのページ
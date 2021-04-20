import {connect} from 'react-redux'
import {compose} from 'redux'
import {createStructuredSelector} from 'reselect'

import WithSpinner from '../../components/withSpinner/with-spinner.component';
import CollectionPage from './collection-page.component';
import {selectIsCollectionLoaded} from '../../redux/shop/shop.selector'

// const mapStateToProps = (state) => ({
//     isLoading: !!state.shop.collections
// })

const mapStateToProps = createStructuredSelector({
    // isLoaded: (state) => !selectIsCollectionLoaded(state)
    isLoaded: selectIsCollectionLoaded
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

// composeってなんだああああああああああああ

// HOCはコンポーネントを受け取って、新しいコンポーネントを返す関数です。って。どういうこと。
// const EnhancedComponent = higherOrderComponent(WrappedComponent);
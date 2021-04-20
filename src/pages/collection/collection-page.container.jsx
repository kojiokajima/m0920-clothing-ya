import {connect} from 'react-redux'
import {compose} from 'redux'

import WithSpinner from '../../components/withSpinner/with-spinner.component';
import CollectionPage from './collection-page.component';

const mapStateToProps = (state) => ({
    isLoading: !!state.shop.collections
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
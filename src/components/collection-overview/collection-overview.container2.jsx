import { connect } from "react-redux";
import { compose } from "redux";
import {createStructuredSelector} from 'reselect'

import WithSpinner from "../withSpinner/with-spinner.component";
import CollectionOverview from "./collection-overview.component";
import {selectIsCollectionFetching} from '../../redux/shop/shop.selector'

// const mapStateToProps = (state) => ({
//   isLoading: state.shop.isFetching,
// });

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching
})

// const CollectionOverviewContainer = compose(connect(mapStateToProps),WithSpinner)(CollectionOverview);
const CollectionOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner)
    (CollectionOverview);
// --> あれかな、WithSpinnerとCollectionOverviewにisLoadingっていうprops(?)を渡してるってことなのかな。や違うかも
// --> WithSpinner(CollectionOverview)からの
// --> connect(mapStateToProps)(WithSpinner(CollectionOverview))
// --> てことはWithSpinnerで返ってきたコンポーネントとstoreを繋げてるってこと?かな?


export default CollectionOverviewContainer;

import { connect } from "react-redux";
import { compose } from "redux";

import WithSpinner from "../withSpinner/with-spinner.component";
import CollectionOverview from "./collections-overview.component";

const mapStateToProps = (state) => ({
  isLoading: state.shop.isFetching,
});

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

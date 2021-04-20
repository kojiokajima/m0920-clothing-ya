import React from 'react'

import { SpinnerContainer, SpinnerOverlay} from './with-spinner.styles'

const WithSpinner = WrappedComponent => {
    console.log("WRAPPED: ", WrappedComponent);
    // --> collection-overview.container.jsxとcollection-page.component.jsxでWithSpinner使ってるからconsoleした時に2つ出てくるのか。ハイハイ
    // --> あーーーー、WrappedComponentはあれになるのか、
    // --> collection-overview.container.jsxでいうCollectionOverview、
    // --> collection-page.container.jsxでいうCollectionPageてことか
    const Spinner = ({ isLoading, ...otherProps}) => {
        // console.log("OTHER PROPS", otherProps);
        // --> otherPropsの中身はこんな感じ -- {history: {…}, location: {…}, match: {…}, staticContext: undefined, dispatch: ƒ}
        // --> なんでやねん。なんだこれ。
        // ------------------------------------
        // return isLoading ? (
        //     <SpinnerOverlay>
        //         <SpinnerContainer />
        //     </SpinnerOverlay>
        // ) : (
        //     <WrappedComponent {...otherProps} />
        // )
        // ------------------------------------
        return <WrappedComponent {...otherProps} />
        // ------------------------------------
    }
    return Spinner
}

export default WithSpinner

// 何をしているかというと、、、
// まず、collection-overview.component.jsx(結局CollectionOverviewコンポーネント)っていうのは、
// Hatsが4個ずらー、Mensが4個ずらーって書いてあるページ。
// んで、collection-page.container.jsx(結局CollectionPageコンポーネント)っていうのは、
// CollectionPage、空っぽなんだけどas of Apr 19
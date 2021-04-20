import React from 'react'
import {withRouter} from 'react-router-dom'

// import './collection-preview.styles.scss'
import {
    CollectionPreviewContainer,
    TitleContainer,
    PreviewContainer
  } from './collection-preview.styles';

import CollectionItem from '../collection-item/collection-item.component';

const CollectionPreview = ({ title, items, history, match, routeName}) => (
    // --> 渡ってきてるpropsはこんな感じのやつ -- {title: "Hats", items: Array(9), routeName: "hats"}
    // --> そのpropsの中のtitleとitemsだけ分解して取り出して使ってるってことなのかそうなのか
    // --> itemsは、9個のオブジェクトが入った配列
    // --> ちなみに1つのオブジェクトはこんな感じ -- {id: 1, name: "Brown Brim", price: 25, imageUrl: "https://i.ibb.co/ZYW3VTp/brown-brim.png"}
    // console.log("TITLE: ", items);
    <CollectionPreviewContainer>
    <TitleContainer onClick={() => history.push(`${match.path}/${routeName}`)} >
      {title && title.toUpperCase()}
    </TitleContainer>
    <PreviewContainer>
      {items && items
        .filter((item, idx) => idx < 4)
        .map(item => (
          <CollectionItem key={item.id} item={item} />

        ))}
    </PreviewContainer>
  </CollectionPreviewContainer>
    // <div className="collection-preview">
    //     <h1 className="title">{title}</h1>
    //     <div className="preview">
    //         {
    //             items.filter((item, index) => index < 4 ).map((item) => (
    //                 <CollectionItem key={item.id} item={item} />
    //             ))
    //         }
    //     </div>
    // </div>
)

export default withRouter(CollectionPreview)
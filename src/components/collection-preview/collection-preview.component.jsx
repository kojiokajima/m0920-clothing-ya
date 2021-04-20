
import React from 'react'

import './collection-preview.styles.scss'

import CollectionItem from '../collection-item/collection-item.component';

const CollectionPreview = ({ title, items}) => {
    // --> 渡ってきてるpropsはこんな感じのやつ -- {title: "Hats", items: Array(9), routeName: "hats"}
    // --> そのpropsの中のtitleとitemsだけ分解して取り出して使ってるってことなのかそうなのか
    // --> itemsは、9個のオブジェクトが入った配列
    // --> ちなみに1つのオブジェクトはこんな感じ -- {id: 1, name: "Brown Brim", price: 25, imageUrl: "https://i.ibb.co/ZYW3VTp/brown-brim.png"}
    // console.log("TITLE: ", items);
    return (
    <div className="collection-preview">
        <h1 className="title">{title}</h1>
        <div className="preview">
            {
                items && items.filter((item, index) => index < 4 ).map((item) => (
                    <CollectionItem key={item.id} item={item} />
                    // --> CollectionItemに、propsとしてitem(propsとして渡ってきたitemsの各要素)を渡してる
                ))
            }
        </div>
    </div>
)}

export default CollectionPreview
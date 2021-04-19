import {createSelector} from 'reselect'

const selectShop = state => state.shop

export const selectCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
)

export const selectCollectionForPreview  = createSelector(
  [selectCollections],
  (collections) => (collections ? Object.keys(state.shop.collections).map(key => state.shop.collections[key]) : []) 
)

export const selectCollection = (collectionUrlParam) => createSelector(
  [selectCollection],
  (collections) => (collections ? collections[collectionUrlParam] : null)
)
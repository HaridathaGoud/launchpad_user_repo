import React from 'react'
import {  connect} from 'react-redux'
import Nfts from '../../nfts.component'
 const CollectionItems = () => {
  return (<>
  <Nfts type="hot collections"/>
  </>)
}
const connectStateToProps = ({ oidc,collectionReducer }: any) => {
  return { oidc: oidc,collectionReducer:collectionReducer };
};
export default connect(connectStateToProps, (dispatch) => {
  return { dispatch };
})(CollectionItems);
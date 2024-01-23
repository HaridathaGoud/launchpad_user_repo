import React from 'react'
import Placeholder from 'react-bootstrap/Placeholder';
const PlaceHoder = (props) => {
  return (
      <Placeholder lg={3} md={6} xs={12} as='span' animation="glow">
      {props?.contenthtml && props?.contenthtml}
      {!props?.contenthtml &&<div style={{ flexDirection: "row", alignItems: "center" }}>
                <div style={{ width: 60, height: 60, borderRadius: 50 }} ></div>
                <div style={{ marginLeft: 20 }}>
                    <div style={{ width: 120, height: 20, borderRadius: 4 }} ></div>
                    <div
                        style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
                    ></div>
                </div>
            </div>}
      
      </Placeholder>
  )
}

export default PlaceHoder
 
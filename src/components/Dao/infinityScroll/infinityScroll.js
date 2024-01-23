import React, { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
const InfinityScroll = (props) => {

   useEffect(()=>{
   },[])

  return (
    <div>
          <InfiniteScroll
              dataLength={props?.data?.length}
              next={props?.fetchMoreData}
              hasMore={props.hasMore}
              loader={props.loader}
          >
              <div>{props.htmlContent}</div>
          </InfiniteScroll>
    </div>
  )
}

export default InfinityScroll

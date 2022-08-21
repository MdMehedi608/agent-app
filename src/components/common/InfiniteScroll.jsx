import React from 'react';
import ReactInfiniteScroll from "react-infinite-scroll-component";

const InfiniteScroll = ({children, dataListLength, fatchNextData, style}) => {
  return (
    <ReactInfiniteScroll
          dataLength={dataListLength}
          style={style} 
          next={fatchNextData}
          hasMore={true}
        >
          {children}
    </ReactInfiniteScroll>
  )
}

export default InfiniteScroll
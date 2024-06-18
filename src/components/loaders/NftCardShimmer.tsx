import React from 'react'
import NftCardShimmer from '../marketplace.component/hotcollections.component/NftCardShimmer'

 const NftCardsShimmer = () => {
  return (
    <div className="container mx-auto px-3 lg:px-0 mt-4">
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[...Array(6)].map((_, index) => (
        <div key={index}>
          <NftCardShimmer />
        </div>
      ))}
    </div>
  </div>
  )
}
export default NftCardsShimmer

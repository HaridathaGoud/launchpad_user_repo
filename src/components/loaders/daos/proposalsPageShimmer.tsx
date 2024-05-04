import React from 'react'
import ProposalsShimmer from './proposalsShimmer'

const ProposalsPageShimmer = () => {
  return (
    <div className="container mx-auto px-3 lg:px-0 mt-3">
        <div className="container mx-auto md:grid lg:grid-cols-4 gap-7 mt-8">
        <div className="shrink-0"></div>
        <div className="mt-5 md:mt-0 lg:col-span-3">
            <ProposalsShimmer/>
        </div>
        </div>
    </div>
  )
}

export default ProposalsPageShimmer
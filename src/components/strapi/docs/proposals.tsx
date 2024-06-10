import React from 'react'

const Proposals = ({data}) => {
  return (
    <div>
    {data?.data?.map((item: any) => (
      <div className="">
        <div>
          <h1 className='text-[40px] font-semibold text-secondary'>{item.attributes?.daos?.ProposalCreation}</h1>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.ProposalCreationdesc}</p>

          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.UserUnderstanding}</p>

          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.Ourplatform }</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.ProposalCreators}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.ProposalCreatorstxt}</p>

          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.ProposalVoters}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.ProposalVoterstxt}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.VotingMechanism}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.VotingMechanism1}</p>

          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.VotingMechanism2}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.VotingMechanism3}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.VotingMechanism4}</p>

          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.AutoAcceptance}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.AutoAcceptance1}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.AutoAcceptance2}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.AutoAcceptance3}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.AutoAcceptance4}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.proposalsummary}</p>
        </div>
      </div>
    ))}
  </div>
  )
}

export default Proposals
import React from 'react'

const Proposals = ({data}) => {
  return (
    <div>
    {data?.data?.map((item: any) => (
      <div className="">
        <div>
          <h1 className='text-2xl font-semibold text-secondary'>{item.attributes?.daos?.ProposalCreation}</h1>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.ProposalCreationdesc}</p>
          <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.daos?.UserUnderstanding}</h2>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.Ourplatform }</p>
          <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.daos?.ProposalCreators}</h2>
          <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
             <li >{item.attributes?.daos?.ProposalCreatorstxt}</li>           
          </ul>
          <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.daos?.ProposalVoters}</h2>
          <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
             <li >{item.attributes?.daos?.ProposalVoterstxt}</li>           
          </ul>
          <h1 className='text-2xl font-semibold text-secondary mt-5'>{item.attributes?.daos?.VotingMechanism}</h1>
          <div className="pl-1">
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.VotingMechanism1}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.VotingMechanism2}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.VotingMechanism3}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.VotingMechanism4}</p>
          </div>
          <h1 className='text-2xl font-semibold text-secondary mt-5'>{item.attributes?.daos?.AutoAcceptance}</h1>
          <div className="pl-1">
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.AutoAcceptance1}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.AutoAcceptance2}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.AutoAcceptance3}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.AutoAcceptance4}</p>
          </div>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.proposalsummary}</p>
        </div>
      </div>
    ))}
  </div>
  )
}

export default Proposals
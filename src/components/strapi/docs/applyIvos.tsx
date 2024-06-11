import React from 'react'

const ApplyIvos = ({data}) => {
  return (
    <div>
    {data?.data?.map((item: any) => (
      <div className="">
        <div>
          <h1 className='text-[40px] font-semibold text-secondary'>{item.attributes?.ApplyIVO?.ApplyIVO}</h1>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.ApplyIVOdesc}</p>

          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.StepsApply}</p>

          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.ResearchIVO }</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.ResearchIVO1}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.ResearchIVO2}</p>

          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.PrepareYour}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.PrepareYour1}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.PrepareYour2}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.PrepareYour3}</p>

          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.PrepareYour4}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.StakingFinancial}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.StakingFinancial1}</p>

          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.StakingFinancial2}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.SubmitApplication}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.SubmitApplication1}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.SubmitApplication2}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.SubmitApplication3}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.FollowUp}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.FollowUp1}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.FollowUp2}</p>

          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.TipsSuccessful}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.TipsSuccessful1}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.TipsSuccessful2}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.TipsSuccessful3}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.TipsSuccessful4}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.ExampleApplication}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.PersonalInformation}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.Personalname}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.Personalcontact}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.ProfessionalBackground}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.Summary}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.Experience}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.TechnicalExpertise}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.Skills}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.TechnicalProjects }</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.CommunityContribution}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.Involvement}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.Contributions}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.StakingCommitment}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.Conclusion}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.conclusionSummary}</p>
        </div>
      </div>
    ))}
  </div>
  )
}

export default ApplyIvos
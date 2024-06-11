import React from 'react'

const ApplyIvos = ({data}) => {
  return (
    <div>
    {data?.data?.map((item: any) => (
      <div className="">
        <div>
          <h1 className='text-2xl font-semibold text-secondary'>{item.attributes?.ApplyIVO?.ApplyIVO}</h1>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.ApplyIVOdesc}</p>
          <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.ApplyIVO?.StepsApply}</h2>
          <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.ApplyIVO?.ResearchIVO }</h2>
          <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
             <li >{item.attributes?.ApplyIVO?.ResearchIVO1}</li>           
             <li >{item.attributes?.ApplyIVO?.ResearchIVO2}</li>           
          </ul>
          <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.ApplyIVO?.PrepareYour}</h2>
          <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
             <li >{item.attributes?.ApplyIVO?.PrepareYour1}</li>           
             <li >{item.attributes?.ApplyIVO?.PrepareYour2}</li>           
             <li >{item.attributes?.ApplyIVO?.PrepareYour3}</li>           
             <li >{item.attributes?.ApplyIVO?.PrepareYour4}</li>           
          </ul>       
          <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.ApplyIVO?.StakingFinancial}</h2>
          <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
             <li >{item.attributes?.ApplyIVO?.StakingFinancial1}</li>           
             <li >{item.attributes?.ApplyIVO?.StakingFinancial2}</li>  
          </ul>   
          <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.ApplyIVO?.SubmitApplication}</h2>
          <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
             <li >{item.attributes?.ApplyIVO?.SubmitApplication1}</li>           
             <li >{item.attributes?.ApplyIVO?.SubmitApplication2}</li>  
             <li >{item.attributes?.ApplyIVO?.SubmitApplication3}</li>  
          </ul>  
          <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.ApplyIVO?.FollowUp}</h2>
          <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
             <li >{item.attributes?.ApplyIVO?.FollowUp1}</li>           
             <li >{item.attributes?.ApplyIVO?.FollowUp2}</li>  
          </ul>   
          <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.ApplyIVO?.TipsSuccessful}</h2>
          <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
             <li >{item.attributes?.ApplyIVO?.TipsSuccessful1}</li>           
             <li >{item.attributes?.ApplyIVO?.TipsSuccessful2}</li>  
             <li >{item.attributes?.ApplyIVO?.TipsSuccessful3}</li>  
             <li >{item.attributes?.ApplyIVO?.TipsSuccessful4}</li>  
          </ul>  
          <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.ApplyIVO?.ExampleApplication}</h2>
          <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.ApplyIVO?.PersonalInformation}</h2>
          <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
             <li >{item.attributes?.ApplyIVO?.Personalname}</li>           
             <li >{item.attributes?.ApplyIVO?.Personalcontact}</li> 
          </ul>          
          <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.ApplyIVO?.ProfessionalBackground}</h2>
          <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
             <li >{item.attributes?.ApplyIVO?.Summary}</li>           
             <li >{item.attributes?.ApplyIVO?.Experience}</li> 
          </ul>   
          <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.ApplyIVO?.TechnicalExpertise}</h2>
          <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
             <li >{item.attributes?.ApplyIVO?.Skills}</li>           
             <li >{item.attributes?.ApplyIVO?.TechnicalProjects}</li> 
          </ul> 
          <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.ApplyIVO?.CommunityContribution}</h2>
          <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
             <li >{item.attributes?.ApplyIVO?.Involvement}</li>           
             <li >{item.attributes?.ApplyIVO?.Contributions}</li> 
          </ul>
          <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.ApplyIVO?.StakingCommitment}</h2>
          <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.ApplyIVO?.Conclusion}</h2>
          <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
             <li >{item.attributes?.ApplyIVO?.Involvement}</li>           
             <li >{item.attributes?.ApplyIVO?.conclusionSummary}</li> 
          </ul> 
        </div>
      </div>
    ))}
  </div>
  )
}

export default ApplyIvos
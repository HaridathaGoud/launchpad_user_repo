import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import defaultlogo from '../../assets/images/default-logo.png';
import moment from 'moment';

function ProjectdetailsCard(props: any) {
    const pjctTypes={ongoing:'Ongoing',upcoming:'Upcoming',closed:'Closed'}
    const handleWebSiteLinks = (item: any, type: string) => {
        if (type == 'TW') {
          window.open(item.twitter);
        } else if (type == 'FACEBOOK') {
          window.open(item.facebook);
        } else if (type == 'INSTAGRAM') {
          window.open(item.instagram);
        } else if (type == 'NETWORK') {
          window.open(item.websiteUrl);
        } else if (type == 'LINKDIN') {
          window.open(item.linkdin);
        }else if (type == 'TELEGRAM') {
          window.open(item.telegram);
        }else if (type == 'DISCARD') {
          window.open(item.discord);
        }
      };
      const statusColourList: any = {
        ongoing: 'dot-green',
        closed : 'dot-red ',
        Closed : 'dot-red ',
        upcoming: 'dot-orange',
      };
    return (

                  <div className='md:col-span-4 max-sm:mt-4'>
                    <div className="border bg-primary-content border-neutral-content relative rounded-[15px] py-5 px-3.5 ">
                    <div className="">
                      <div className="">
                        <div className="md:flex justify-between">
                          <div className='flex gap-2 items-start'>
                          <div className="profile-image">
                            <img
                              src={props.pjctInfo?.publisherLogo || defaultlogo}
                              className="h-12 w-12 rounded-full object-cover"
                              alt=""
                            />
                          </div>
                          <div>
                           <h3 className="text-2xl font-semibold text-secondary">{props.pjctInfo?.projectName}</h3>
                            <h4 className="text-sm text-secondary uppercase">{props.pjctInfo?.tokenSymbol}</h4>
                                  <div className='flex gap-2'> 
                                  {props.pjctInfo.facebook && (
                                    <span
                                      className="icon facebook-md cursor-pointer"
                                      onClick={() => handleWebSiteLinks(props.pjctInfo, 'FACEBOOK')}
                                    ></span>
                                  )}
                                  {props.pjctInfo.websiteUrl && (
                                    <span
                                      className="icon network-md cursor-pointer"
                                      onClick={() => handleWebSiteLinks(props.pjctInfo, 'NETWORK')}
                                    ></span>
                                  )}
                                  {props.pjctInfo.twitter && (
                                    <span
                                      className="icon twitter-md cursor-pointer"
                                      onClick={() => handleWebSiteLinks(props.pjctInfo, 'TW')}
                                    ></span>
                                  )}
                                  {props.pjctInfo.instagram && (
                                    <span
                                      className="icon instagram-md cursor-pointer"
                                      onClick={() => handleWebSiteLinks(props.pjctInfo, 'INSTAGRAM')}
                                    ></span>
                                  )}
                                  {props.pjctInfo.telegram && (
                                    <span
                                      className="icon telegram-md cursor-pointer"
                                      onClick={() => handleWebSiteLinks(props.pjctInfo, 'TELEGRAM')}
                                    ></span>
                                  )}
                                   {props.pjctInfo.discard && (
                                    <span
                                      className="icon discord-md cursor-pointer"
                                      onClick={() => handleWebSiteLinks(props.pjctInfo, 'DISCARD')}
                                    ></span>
                                  )}
                                  </div>
                          </div>
                          </div>
                         
                        </div>
                        <div className="">
                           
                            <div className="flex mt-6 ">
                              <div className='flex gap-3 justify-between items-center'>
                              <div className="bg-[#8B8989] py-1 rounded px-3">
                                <p className="text-sm font-medium text-base-100">
                                  <span className={`inline-block w-2 h-2 rounded-full mr-2 ${statusColourList[props.currentPjct]}`}></span>
                                  {pjctTypes[props.currentPjct]}
                                </p>
                              </div>
                              
                              {props.pjctInfo?.tokenNetwork && (
                                  <p className="text-sm font-medium text-secondary">
                                    <span
                                      className={`icon scale-[1.4] mr-1 ${props.pjctInfo?.tokenNetworkLogo?.toLowerCase() || 'usdt'}`}
                                    ></span>
                                    {props.pjctInfo?.tokenNetwork || process.env.REACT_APP_CURRENCY}
                                  </p>
                              )}
                              </div>
                            </div>
                          </div>
                       
                        <div className='grid grid-cols-2 mt-[32px] gap-5'>
                       
                          <div className="">
                            <h5 className="text-base text-secondary mb-1">{props.pjctInfo.totalSupply?.toLocaleString()}</h5>
                            <p className="text-base text-secondary opacity-60">Total Supply</p>
                          </div>
                          <div className="">
                            {props.pjctInfo?.totalRaised && (
                              <h5 className="text-base text-secondary mb-1">${props.pjctInfo?.totalRaised?.toLocaleString()}</h5>
                            )}
                            {!props.pjctInfo?.totalRaised && <h5 className="text-base text-secondary opacity-60">-</h5>}
                            <p className="text-base text-secondary opacity-60">Total Raise</p>
                          </div>
                    
                       
                          <div className="">
                            <h5 className="text-base text-secondary mb-1">
                              {props.pjctInfo?.tokenVolume} {props.pjctInfo?.tokenSymbol} = {props.pjctInfo?.paymentValue}{' '}
                              {props.pjctInfo?.paymentSymbol}
                            </h5>
                            <p className="text-base text-secondary opacity-60">Price</p>
                          </div>
                          <div className="">
                            <h5 className="text-base text-secondary mb-1">{props.pjctInfo?.intialsupply?.toLocaleString() || '-'}</h5>
                            <p className="text-base text-secondary opacity-60">Initial Supply</p>
                          </div>
                        
                        <div className="total-status">
                          <div className="fields-style">
                          <h5 className="text-base text-secondary mb-1">
                            {props.pjctInfo?.launchDate ? moment(props.pjctInfo?.launchDate).format("DD-MM-YYYY HH:mm") : "--"}(UTC)</h5>
                           
                            <p className="text-base text-secondary opacity-60">Launch date</p>
                          </div>
                          
                        </div>
                        </div>
                        <div className="border border-neutral-content relative rounded-[5px] py-[18px] px-2">
                          <div className="flex justify-between">
                            <div className='flex-1'>
                              <p className="text-xs text-secondary opacity-60 mb-2">Private Opens</p>
                              <p className='text-sm text-secondary'>
                              {props.pjctInfo?.privateStartDate ? moment(props.pjctInfo?.privateStartDate).format("DD-MM-YYYY HH:mm") : "--"}(UTC)
                              </p>
                            </div>
                           <div className='border-r border-neutral-content mx-4'></div>
                            <div className='flex-1'>
                              <p className="text-xs text-secondary opacity-60 mb-2">Private Closes</p>
                              <p className='text-sm text-secondary'>
                              {props.pjctInfo?.privateEndDate ? moment(props.pjctInfo?.privateEndDate).format("DD-MM-YYYY HH:mm") : "--"}(UTC)</p>
                            </div>
                          </div>
                          <div className="bg-[#8B8989] py-1 rounded px-3 absolute top-[-17px] right-6">
                            <p className="text-base mb-0 text-base-100">
                              <span className={`inline-block w-3 h-3 ${statusColourList[props.pjctInfo?.privateStatus?.toLowerCase()]} rounded-full mr-2 `}></span>
                              {(props.pjctInfo?.privateStatus === 'Ongoing' && 'Ongoing') ||
                                (props.pjctInfo?.privateStatus === 'Upcoming' && 'Upcoming') ||
                                (props.pjctInfo?.privateStatus === 'Closed' && 'Closed')}
                                                           </p>
                          </div>
                                                  </div>
                        <div className="border border-neutral-content relative rounded-[5px] py-[18px] px-2 mt-7">
                          <div className="flex justify-between">
                            <div className='flex-1'>
                              <p className="text-xs text-secondary opacity-60 mb-2">Public Opens</p>
                              <p className='text-sm text-secondary'>
                              {props.pjctInfo?.publicStartDate ? moment(props.pjctInfo?.publicStartDate).format("DD-MM-YYYY HH:mm") : "--"}(UTC)</p>
                            </div>
                            <div className='border-r border-neutral-content mx-4'></div>  
                            <div className='flex-1'>
                              <p className="text-xs text-secondary opacity-60 mb-2">Public Closes</p>
                              <p className='text-sm text-secondary'>
                              {props.pjctInfo?.publicEndDate ? moment(props.pjctInfo?.publicEndDate).format("DD-MM-YYYY HH:mm") : "--"}(UTC)</p>
                            </div>
                          </div>
                          <div className="bg-[#8B8989] py-1 rounded px-3 absolute top-[-17px] right-6">
                            <p className="text-base mb-0 text-base-100">
                            <span className={`inline-block w-3 h-3 ${statusColourList[props.pjctInfo?.publicStatus?.toLowerCase()]} rounded-full mr-2 `}></span>
                              {(props.pjctInfo?.publicStatus === 'Ongoing' && 'Ongoing') ||
                                (props.pjctInfo?.publicStatus === 'Upcoming' && 'Upcoming') ||
                                (props.pjctInfo?.publicStatus === 'Closed' && 'Closed')}
                            </p>
                          </div>
                        </div>
                        <div className="divider h-px"></div>
                        <div>
                          <div className=" mb-4">
                            <h4 className="text-base text-secondary opacity-60 mb-1">Vesting Periods</h4>
                            <p className="text-base text-secondary mb-2">{props.pjctInfo?.vesting} Day</p>
                            <h4 className="text-base text-secondary opacity-60 mb-1">Vesting Slots</h4>
                            <p className="text-base text-secondary">{props.pjctInfo?.claimSlots}</p>
                          </div>
                          <div className="">
                            <h4 className="text-base text-secondary opacity-60">Country Restrictions</h4>
                            <p className="text-base text-secondary">{props.pjctInfo?.countryRestrictions?.join(', ')}</p>
                          </div>
                          <div className='mt-6'>
                            <p className="text-base text-secondary opacity-60">Swap Progress</p>
                            <ProgressBar variant="info" now={props.swapedPercentage?.toString()?.slice(0, 3)} className='rounded-[15px] border bg[#D9D9D9]' />
                            <div className="flex justify-between items-start">
                              <p className="text-xs text-secondary">{props.swapedPercentage?.toString()?.slice(0,4)} %</p>
                              <p className="text-xs text-secondary">
                                {props.pjctInfo?.totalSoldTokens?.toLocaleString()}/{props.pjctInfo?.intialsupply?.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                       
                      </div>
                    </div>
                  </div>
                  </div>
  );
}


export default ProjectdetailsCard;

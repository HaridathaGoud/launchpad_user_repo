{/* <p>
             {(user?.data?.status=="Pending" || user?.data?.status=="Publishing") ? <span className='icon pending-icon'/> : user?.data?.status=="declined" ? <span className='icon reject-icon'/> : <span className='icon failed-close'/>}{" "} 
            {<span className={`${user?.data?.status == "Closed" && "close-text" || "pending-text"  }`}>{user?.data?.status}</span>}
             </p>
             {user?.data?.status !== "Closed" && <p> {remainingTime == null && "Voting Period Ended"}</p>}
              {(user?.data?.status == "Pending" || user?.data?.status == "Publishing" && remainingTime != null)
                && <p> {beforeStartTime && "Voting Not Yet Started"
                  || user?.data?.status == "Closed" && "Voting Closed"
                  // ||    `${remainingTime != null && `Time Remaining - ${remainingHrs}`}`
                  // ||    `${remainingTime != undefined ? `Time Remaining - ${remainingHrs}`:""}`
                  ||  `${remainingTime != undefined ? `End Time`:""}`
                }
                </p>}
            <p>{beforeStartTime && `Start Time` }</p>
           {user?.data?.status !== "Closed" && <p> {remainingTime == null && "End Time"}</p>}
             <p className='my-3'>
                <span className='icon time'></span>
                <span className='common-text'> 
                <Moment local  format="DD/MM/YYYY HH:mm">{beforeStartTime && user?.data?.startDate || user?.data?.endDate}</Moment> (UTC)
                    </span>
             </p>
             <span className='common-text address-label'>
              {user?.data?.walletAddress?.slice(0, 4) + '.......' + user?.data?.walletAddress?.substring(user?.data?.walletAddress.length - 4, user?.data?.walletAddress.length)}
              <CopyToClipboard text={user?.data?.walletAddress}  options={{ format: 'text/plain' }}
                        onCopy={() => handleCopy()}
                      >
                        <span className={!copied ? 'icon md copy-icon c-pointer' : 'icon copy-check c-pointer ms-2'} />
                      </CopyToClipboard>
              </span> */}
    {/* <div className='flex gap-5 justify-between items-center mb-4'>
                <p className={`text-sm shrink-0 text-secondary opacity-50`}>IPFS</p>
                <p className='truncate text-secondary'>#bafkrei</p>
                </div> */}
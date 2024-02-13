import React,{useState,useEffect} from 'react';
import { useSelector } from 'react-redux';
import Moment from 'react-moment';
import Image from 'react-bootstrap/Image';
import moment from 'moment';
import shimmers from '../../shimmers/shimmers';
import PlaceHolder from "../../shimmers/placeholder";
import { useAccount } from 'wagmi';
import { CopyToClipboard } from "react-copy-to-clipboard";
import daocardProfile from '../../../../../src/assets/images/daocard-profile.png';
import styles from "./dao.module.css";
 function Status() {
  const { isConnected } = useAccount();
    const user = useSelector((state: any) => isConnected ? state?.oidc?.fetchproposalviewdata : state?.proposal?.proViewData);
    const [remainingTime, setRemainingTime] = useState<any>(null);
    const [copied,setCopied]=useState(false);
    const Cardstransactions = shimmers.votingShimmer(3);
    const createdDate = new Date(user?.data?.startDate);
    const endDate = new Date(user?.data?.endDate);
    const [remainingHrs,setRemainingHrs]=useState()
    const [loading,setLoading] = useState(true)

    useEffect(() => {      
        const interval = setInterval(() => {
          let stDateData = moment(new Date()).utc().format("YYYY-MM-DDTHH:mm:ss");
          const timeDifference=moment(user?.data?.endDate).format("X")-moment(stDateData).format("X")
          if (timeDifference <= 0) {
            clearInterval(interval);
            setRemainingTime(null);
          } else {
            const timestampInMilliseconds = timeDifference * 1000; 
            const localTime = new Date(timestampInMilliseconds).toLocaleString();
            const endDate = new Date(localTime)

            const days = Math.floor(endDate / (1000 * 60 * 60 * 24));
            const hours = Math.floor((endDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((endDate % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((endDate % (1000 * 60)) / 1000);
            setRemainingHrs(`${hours}:${minutes}:${seconds}`)
            const formattedDate = `${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(2, '0')}-${String(
              endDate.getDate()
            ).padStart(2, '0')},`;
    
            const formattedTime = `${hours}:${String(minutes).padStart(2, '0')}`;//:${String(seconds).padStart(2, '0')}
    
            setRemainingTime(`${formattedDate}Hr ${formattedTime}Min`);
          }
        }, 1000);
        return () => clearInterval(interval);

      }, [user]);

   useEffect(() => {
    Load()
   }, [user])

   const Load = async ()=>{
     if (user?.data) {     
      if (user?.loading) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); 
        setLoading(false);  
    }else if(!isConnected){
      setLoading(false);  
    }
   }
   }
      const handleCopy = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
      }

      const beforeStartDateandTime=()=>{
        let currentDate = moment(new Date()).utc().format("YYYY-MM-DDTHH:mm:ss");
       return moment(currentDate).format("X")< moment(createdDate).format("X")
      }
      const beforeStartTime = beforeStartDateandTime();
      const getRecorderValue = (recorder) => {
        const recorderValues = ["A", "B", "C", "D", "E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
        return recorderValues[recorder - 1];
      };
    return (
        <>
          {loading  ? <PlaceHolder contenthtml={Cardstransactions} /> :
         (<> 
        <div className=''>      
          <div className=''>
         <h2 className='text-lg font-semibold pb-3 text-secondary'>Information</h2>
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

              <div className='flex gap-5 justify-between items-center mb-4 shrink-0'>
                    <p className={`text-sm text-secondary opacity-50`}>Strategies(s)</p>
                    <div className='w-9 h-9 mr-2'>
                        <Image src={daocardProfile} className='rounded-full object-cover' alt='profile'/>
                    </div>
                </div>
                <div className='flex gap-5 justify-between items-center mb-4'>
                <p className={`text-sm shrink-0 text-secondary opacity-50`}>IPFS</p>
                <p className='truncate text-secondary'>#bafkrei</p>
                </div>
                <div className='flex gap-5 justify-between items-center mb-4'>
                <p className={`text-sm shrink-0 text-secondary opacity-50`}>Voting System</p>
                <p className='truncate text-secondary'>  {user?.data?.status !== "Closed" && <p className='text-secondary'> {remainingTime == null && "Voting Period Ended"}</p>}</p>
                </div>
                <div className='flex gap-5 justify-between items-center mb-4'>
                <p className={`text-sm shrink-0 text-secondary opacity-50`}>Start Date </p>
                <p className='truncate text-secondary'><Moment local={true} format={"DD/MM/YYYY HH:mm"}>{user?.data?.startdate}</Moment> (UTC)</p>
                </div>
                <div className='flex gap-5 justify-between items-center mb-4'>
                <p className={`text-sm shrink-0 text-secondary opacity-50`}>End Date</p>
                <p className='truncate text-secondary'><Moment local  format="DD/MM/YYYY HH:mm">{beforeStartTime && user?.data?.startDate || user?.data?.endDate}</Moment> (UTC)</p>
                </div>
            </div>  
            <hr />         
           
        </div>
          {/* <div className='my-4'>
          <h2 className='text-secondary text-base font-semibold my-3 text-secondary '>Proposal options</h2>
                      {user?.data?.options?.map((data:any) => (<div className='text-secondary'>
                       <div key={data?.id}>
                       <p className='text-secondary'>{getRecorderValue(data?.recorder)}. {data?.option} {`(${data?.votersCount || "0"})`}
                       </p>
                       </div>
               </div>))}     
          </div> */}
          </>)}
          
        </>
    );
} 

export default (Status);

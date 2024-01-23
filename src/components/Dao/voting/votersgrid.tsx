import React, { useState, useEffect } from 'react';
import walletimg from '../../../assets/images/wallet-img.svg';
import InfinityScroll from '../infinityScroll/infinityScroll';
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getVotersGrid } from '../../../reducers/votingReducer';
import apiCalls from '../../../utils/api';
import { useAccount } from 'wagmi';
import nodata from '../../../assets/images/no-data.png';
import error from '../../../assets/images/error.svg';
import Image from 'react-bootstrap/Image';
import { CopyToClipboard } from "react-copy-to-clipboard";
import Placeholder from 'react-bootstrap/Placeholder';
import styles from "../proposal/createproposal/dao.module.css";
 function Voters(props : any) {
  const { isConnected, address } = useAccount();
  const [pageNo, setPageNo] = useState(1);
  const [errorMsg,setErrorMsg]=useState(null);
  const params = useParams()
  const pageSize = 10;
  const votersDetails = useSelector((state: any) => state?.vtg?.fetchVotersData);
  const [copied,setCopy]=useState(false);
  const [selection,setSelection]=useState(null);
  const [loading,setloading] = useState(true);
   useEffect(() => {
    Load()
     props.getVotersGrid(pageNo, pageSize, params.id,
       (callback: any) => {
         if (callback) {
           setErrorMsg(apiCalls.isErrorDispaly(callback))
         } else {
           setErrorMsg(null)
         }
    })
    let _pageNo = pageNo + 1;
    setPageNo(_pageNo);
    
  },[isConnected,address])

  const Load = async ()=>{
    if(votersDetails){
      await new Promise((resolve) => setTimeout(resolve, 1000)); 
      setloading(false)
    }   
  }

  const fetchMoreData = () => {
    let _pageNo = pageNo + 1;
    setPageNo(_pageNo);
     props.getVotersGrid(pageNo,pageSize,params.id );
  };
  const handleCopy = (data) => {
    setSelection(data)
    setCopy(true)
    setTimeout(() => {
      setCopy(false);
    }, 1000);
	}

  const generateHTMLContent = () => {
    const html = votersDetails?.map((item : any) => (
      <tr>
        <td className="">
          <div className="d-flex ">
            <div className='flex gap-2 items-center'>
              <img src={walletimg} alt="" className='mr-3 object-cover' />
              <span className=''>{item?.walletAddress}</span>{" "}
            </div>
            <CopyToClipboard text={item?.walletAddress} options={{ format: 'text/plain' }}
              onCopy={() => handleCopy(item?.walletAddress)}
            >
              <span className={(copied && selection === item?.walletAddress) ? 'icon copy-check c-pointer ms-2' : 'icon md copy-icon c-pointer'} />
            </CopyToClipboard>
          </div>
        </td>
        <td className=''>{item?.options}</td>
        <td className='whitespace-nowrap'>23k The Saf...</td>
      </tr>
    ));

    return <div className='overflow-x-auto'>     
      <table className='table allocationtable px-1 border-separate border-spacing-y-4' width='100%'>  
        <tbody>
          {html}
          <tr>{votersDetails?.length===0 && 
          <td colSpan={2} className='ps-0'><div className='text-center'><img src={nodata} width={95} className='mx-auto' alt=""/><h4 className="text-center no-data-text">No data found</h4></div></td>}</tr>
        </tbody>
      </table>
    </div>
  }

  const htmlContent = generateHTMLContent();

    return (
        <>
        <div className='mt-[40px] mb-2'>

            {errorMsg && (
          <div className='cust-error-bg'>
          <div className='cust-crd-mr'><Image src={error} alt="" /></div>
        <div>
          <p className='error-title error-red'>Error</p>
          <p className="error-desc">{errorMsg}</p></div>
        </div>
        )}
       <div className="flex justify-between items-center">
       <div>
       <span className='text-2xl font-semibold text-secondary'>Voters {""}</span><span className='text-secondary'>({votersDetails?.length} voters)</span>
       </div>
        <div className={`${styles.customTabs} tabs`}>
            <a className={`${styles.tab}  tab tab-active`}>Discussions</a>
            <a className={`${styles.tab} ${styles.tabActive} tab`}>Voters</a>
        </div>
              
        </div>
       </div>
        {loading ?
        <Placeholder xs={12} animation="glow">
          <Placeholder xs={1} className='me-3 shimmer-icon' />
          <Placeholder xs={5} />&emsp;
          <Placeholder xs={5} />
        </Placeholder> :
        <div>
          <InfinityScroll
            data={votersDetails}
            htmlContent={htmlContent}
            hasMore={true}
            fetchMoreData={fetchMoreData}
          />
        </div> }

        </>
    );
}
const connectDispatchToProps = (dispatch: any) => {
  return {
    getVotersGrid: (pageNo:any, pageSize:any,id:any,callback:any) => {
      dispatch(getVotersGrid(pageNo, pageSize,id,callback));
    }
  }
}
 export default connect(null, connectDispatchToProps)(Voters);
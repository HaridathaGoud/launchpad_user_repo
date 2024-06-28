import React, { useEffect, useMemo, useReducer, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import {  useParams } from 'react-router-dom';
import CollectionTabs from './CollectionTabs'
import Button from '../../../ui/Button';
import {hotCollectionReducer, hotcollectionState} from './reducer';
import HotcollectionviewShimmer from './hotcollectionviewshimmer';
import { clearCollectionsActivityData,
   clearHotCollectionsViewDetails,
   fetchHotCollectionsActivityDetails,
   fetchHotCollectionsViewDetails} from '../../../reducers/collectionReducer';
import { setError } from '../../../reducers/layoutReducer';
import { guid } from '../../../utils/constants';
import BreadCrumb from '../../../ui/breadcrumb';
import { CopyToClipboard } from "react-copy-to-clipboard";

const pageSize = 6;

const HotcollectionView = (props: any) => {
  const params = useParams();
  const rootDispatch = useDispatch();
  const [state, dispatch] = useReducer(hotCollectionReducer, hotcollectionState);
  const {hotCollectionViewDetails,user,activityData,NftDetails} = useSelector((store: any) => {
    return {
      hotCollectionViewDetails:store.collectionReducer.hotCollectionViewDetails,
      user:store.auth.user || guid,
      activityData:store?.collectionReducer.hotCollectionsActivityDetails,
      NftDetails:store.collectionReducer.NftDetails,
    }
  });
  const [isActive, setIsActive] = useState(0);

  useEffect(()=>{
    getHotCollectionsData();
    if (hotCollectionViewDetails.error) rootDispatch(setError({message:hotCollectionViewDetails.error}))

    return () => {
      props.clearHotCollectionViewDetails();
    };
  },[])
  useEffect(() => {
    getNftsDetails();
    if (NftDetails.error) rootDispatch(setError({message:NftDetails.error}))
    return () => {
      props.clearCollectionsActivityData();
    };
  }, [isActive]);

  const handleTabChange = (selectedTab: any) => {
     setIsActive(selectedTab);
       getNftsDetails();
  };

  const getHotCollectionsData = async () => {
    props.fetchHotCollectionViewDetails({
      data: null,
      id:params.collectionid
    });
  };

  const getNftsDetails=async(on: string = "")=>{
    if(isActive === 1){
      props.fetchHotCollectionsActivityDetails({
        data: on === "seeMore" ? activityData.data : null,
        id:user.id || guid,
        collectionId:params.collectionid,
        page: on === "seeMore" ? activityData.nextPage : 1,
        take: pageSize,
      });
      return;
    }
  }

  const showSeeMore = useMemo(() => {
    const { loading, data, nextPage } = isActive===1
      ? activityData
      : NftDetails;
    return !loading && data && data?.length === pageSize * (nextPage-1);
  }, [isActive, activityData, NftDetails]);
  

  return (
      <>
      {hotCollectionViewDetails.loading && <HotcollectionviewShimmer/> }
      {!hotCollectionViewDetails.loading &&
      <div className="max-sm:px-3 md:mt-5 px-0 container mx-auto">
              <BreadCrumb/>
      <div className='min-h-[350px] bg-center relative rounded-lg px-4 md:px-[50px] flex items-center mt-4 max-sm:py-4'>
        <img src={hotCollectionViewDetails?.data?.bannerImage} className='w-full rounded-lg h-full absolute top-0 left-0 object-cover' alt="" />
        <div className='absolute top-0 left-0 w-full h-full bg-black opacity-60 rounded-lg z-10'></div>
          <div className="md:flex gap-12 items-center z-40">
            <img src={hotCollectionViewDetails?.data?.logo} className="w-[150px] h-[150px] rounded-full object-cover shrink-0" alt="" />
            <div>
              <div className='flex max-sm:mt-4 items-center'>
                <p className='text-white font-semibold text-[32px] leading-8 mr-2'>{hotCollectionViewDetails?.data?.collectionName ||'--'}</p>
              </div>
              <div className="flex text-[18px] mt-2 font-medium gap-2">
                <p className='text-white '>By : {hotCollectionViewDetails?.data?.creatorName ||hotCollectionViewDetails?.data?.walletAddress || '--'}   </p>
                <CopyToClipboard
                    // text={hotCollectionViewDetails?.data?.walletAddress}
                    // options={{ format: "text/plain" }}
                   
                  >
                    <span
                      className={
                        // state.copied === "current"
                          // ? "icon md check-icon pl-4"
                          // : 
                          "icon md copy-icon invert cursor-pointer ms-0 pl-4"
                      }
                    />
                  </CopyToClipboard>
              </div>
              <p className='text-white mt-3 text-base pr-4 overflow-hidden text-ellipsis line-clamp-4'>
                {hotCollectionViewDetails?.data?.description ||'--'}
                </p>
          </div>
          </div>
          <div className='flex gap-6 absolute z-10 right-10 bottom-6'>
            {hotCollectionViewDetails?.data?.facebook &&
              <a
              href={hotCollectionViewDetails?.data?.facebook}
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              <span className='icon fb cursor-pointer'></span>
              </a>
               }
            {hotCollectionViewDetails?.data?.linkedIn &&
              <a
              href={hotCollectionViewDetails?.data?.linkedIn}
              target="_blank"
              rel="noreferrer"
              >
              {" "}
              <span className='icon linkedin cursor-pointer'></span>
              </a>
            }
            {hotCollectionViewDetails?.data?.twitter &&
              <a
              href={hotCollectionViewDetails?.data?.twitter}
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              <span className='icon twit cursor-pointer'></span>
              </a>
            }
            {hotCollectionViewDetails?.data?.websiteUrl &&
              <a
              href={hotCollectionViewDetails?.data?.websiteUrl}
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              <span className='icon network cursor-pointer'></span>
              </a>
            }
            </div>
        </div>
        <hr className="bg-[#f8f6f6] my-6" />
       <CollectionTabs  handleTabChange={handleTabChange} screen={props?.screen}/>

        {showSeeMore && isActive === 1 && (
        <div className="flex justify-center items-center">
          <Button type="plain"
          handleClick={() => getNftsDetails('seeMore')}>
          <span className="cursor-pointer text-base text-primary font-semibold">
            See More
          </span>
          <span className="mx-auto block icon see-more cursor-pointer mt-[-4px]"></span>
        </Button>
        </div>
      )}
        </div>
      }
        </> );
}
const connectStateToProps = ({ oidc,collectionReducer }: any) => {
  return { oidc: oidc,collectionReducer:collectionReducer };
};
const connectDispatchToProps = (dispatch: any) => {
  return {
    fetchHotCollectionViewDetails: (callback: any) => {
      dispatch(fetchHotCollectionsViewDetails(callback));
    },
    clearHotCollectionViewDetails: () => {
      dispatch(clearHotCollectionsViewDetails());
    },
    fetchHotCollectionsActivityDetails:(callback: any)=>{
      dispatch(fetchHotCollectionsActivityDetails(callback));
    },
    clearCollectionsActivityData:()=>{
      dispatch(clearCollectionsActivityData());
    },
    dispatch,
  };
};
export default connect(connectStateToProps, connectDispatchToProps)(HotcollectionView);

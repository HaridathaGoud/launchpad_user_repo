import React,{ useEffect, useState ,useRef} from 'react';
import {getMarketplace, postMarketplace } from '../../../utils/api';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import { Button, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import {Link, useParams} from 'react-router-dom';
import nodata from '../../../assets/images/no-data.png';
import defaultlogo from '../../../assets/images/default-logo.png';
import { isErrorDispaly } from '../../../utils/errorHandling';
import { useAccount } from 'wagmi';
import {useNavigate} from 'react-router-dom';
import error from '../../../assets/images/error.svg';
import loadimg from '../../../assets/images/loader.svg';
import WalletConnect from '../../shared/connect.wallet';
function ExploreNfts(props: any) {
  const [modalShow, setModalShow] = React.useState(false);
  const [loader, setLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [nftDatafilter, setNftDatafilter] = useState<any>([]);
  const [categoryData, setCategoryData] = useState();
  const[catagoryes,setCatagoryes]=useState('all')
  const pageSize =8;
  const [pageNo, setPageNo] = useState(1);
  const { address,isConnected } = useAccount();
  const [search,setSearch]=useState(null)
  const[loadDara,setLoadData]=useState()
  const router = useNavigate();
  const  category  = useParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollableRef = useRef<any>(null);
  const [seeHide,setSeeHide]=useState(true);
  useEffect(() => {
      initialize();
      scrollableRef?.current?.scrollIntoView(0,0);
  }, [props.auth.user?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  function initialize() {
    setErrorMessage(null)
   // getCategories();
    setErrorMessage(null);
    getExploreNftsDetails(1, 8, "all",search);
  }
  const loadmore=()=>{
    getExploreNftsDetails(pageNo, pageSize,"all",search);
  };

  const getCategories = async () => {
    let response = await getMarketplace(`User/CategoriesLU`);
    if (response) {
      setCategoryData(response.data);
    }
  };
  const getExploreNftsDetails = async (pageNo: number, pageSize: number, value: any,search:any) => {
    if (nftDatafilter.length == 0) {
      setLoader(true);
    }
    setErrorMessage(null);
    if (value?.includes('domain')) {
      value = 'domain names';
    }
    const skip = pageNo * pageSize - pageSize;
    const take = pageSize;
    await getMarketplace(`User/ExploreNfts/${take}/${skip}/${'all'}/${search}/${props.auth.user?.id||''}`)
      .then((response: any) => {
        let _pageNo = pageNo + 1;
        setPageNo(_pageNo);
        let mergeData = pageNo == 1 ? [...response.data] : [...nftDatafilter, ...response.data];
        setNftDatafilter(mergeData);
        // setLoadData(response?.data?.length>=4 ? true : false)
        setLoadData(response?.data?.length >=5)
        setSeeHide(response?.data?.length == 8 ? true : false)
        setLoader(false);
      })
      .catch((error: any) => {
        setErrorMessage(isErrorDispaly(error));
        setLoader(false);
      });
  };

  const handleSearchbyCategory = (e: any) => {
    inputRef.current.value = '';
    let data=e.target.value
    setCatagoryes(data)
    getExploreNftsDetails(1, 8,data,null);
      
  };


const handleSearchIcon = (iconData:any) => {
  let data=iconData
  if(data == ""||data == null || data.includes(".")){	
  }
  else{ 
    getExploreNftsDetails(1, 8,"all",search)
 }	
 
};
const handleChange=(e:any)=>{
let data=e.target.value.trim()
setSearch(data)
if(data == ""){
  e.preventDefault();
  getExploreNftsDetails(1, 8,"all",null)
}else{
  if(!data){
    getExploreNftsDetails(1, 8,"all",search)
   e.preventDefault();
  }
}
}
const handleSearch = async(e:any) =>{
let data=e.target.value.trim()
 setSearch(data)
 if (e.key==='Enter') {
  if(data == "" || data.includes(".")){	
    e.preventDefault();
  }
  else{ getExploreNftsDetails(1, 8,"all",search)
    e.preventDefault();
   }	
}else if(e.key === 'Backspace' && data==""){
  getExploreNftsDetails(1, 8,"all",null)
    e.preventDefault();
}
}
const gotoFavorite=(item: any)=>{
  if(isConnected){
    saveFavorite(item)
  }else{
    setModalShow(true)
  }
}
  const saveFavorite = async (item: any) => {
    setErrorMessage(null);
    setModalShow(false)
    let obj = {
      nftId: item?.id,
      customerId: props.auth.user?.id,
      isFavourite: item?.isFavourite ? false : true,
    };
    await postMarketplace(`User/SaveFavorite`, obj)
      .then((response: any) => {
        getExploreNftsDetails(1, 8, 'all',null);
      })
      .catch((error: any) => {
        setErrorMessage(isErrorDispaly(error));
      });
  };

  const metaSaveView =(item)=>{
    router(`/marketplace/assets/${item.tokenId}/${item.collectionContractAddress}/${item.id}`);

  }
  const saveViews = async (item) => {
    let obj = {
      nftId: item.id,
      customerId: props.auth.user?.id,
    };
    await postMarketplace(`User/SaveViewer`, obj)
      .then((response: any) => {
        router(`/marketplace/assets/${item.tokenId}/${item.collectionContractAddress}/${item.id}`);
      })
      .catch((error: any) => {
        setErrorMessage(isErrorDispaly(error));
      });
  };
  return (
    <>
    <div ref={scrollableRef}></div>
    {loader && 
    <>
     
    </>
    ||<>
      <div className="container mx-auto pt-5 px-3 lg:px-0">
        <h2 className="text-[24px] text-secondary font-semibold">Explore NFTs</h2>
        
        {errorMessage && (
          <div className=''>
          <div className='mr-4'><img src={error} alt="" /></div>
          <div>
          <p className=''>Error</p>
          <p className="">{errorMessage}</p></div>
     </div>
        )}
        {/* <Form className="explore-search mb-4"  >
          <div className="p-relative">
            <Form className="d-flex nav-search hide-mobile ">
             
              <Form.Control
                  placeholder="Search"
                  className="header-search pe-5"
                  aria-label="Search"
                  onKeyDown={(e) => handleSearch(e)}
                  onChange={(e)=>handleChange(e)}
                />
                <i className="icon md search-angle icon-space " onClick={()=>handleSearchIcon(search)}></i>
            </Form>
          </div>
        </Form> */}
          <div className="grid gap-4 lg:grid-cols-5 md:grid-cols-3">
                {nftDatafilter.length > 0 ? (
                  nftDatafilter?.map((item: any, idx: any) => (
                    <div className="mt-3 shadow-md cursor-pointer bg-primary-content rounded-lg relative min-h-[420px] transform transition-transform duration-500 hover:scale-[1.03]" key={idx}>
                      <div className="cursor-pointer" >
                        <div   onClick={isConnected ? () => saveViews(item) :  () => metaSaveView(item)}>
                          <div className="">
                            {' '}
                            <img
                              src={
                                item?.image && !item?.image?.includes('null')
                                  ? item.image.replace('ipfs://', 'https://ipfs.io/ipfs/')
                                  : defaultlogo
                              }
                             
                              alt=""                            
                              className={`h-[255px] w-full object-cover rounded-tl-lg rounded-tr-lg  ${
                                item?.isUnlockPurchased && address !== item?.walletAddress ? 'blur-image' : ''
                              }`}
                            />
                          </div>
                        </div>
                        <WalletConnect showWalletModal={modalShow} onWalletConect={(addr) => {}} onWalletClose={() => setModalShow(false)} />
                        <div className="cursor-pointer bg-black top-3 absolute cursor-pointer right-3 rounded-full">
                          <span
                            className={`icon like-white   ${item?.isFavourite ? 'active' : ''}`}
                             onClick={() =>gotoFavorite(item)}
                          ></span>
                        </div>
                        <div className='px-2 py-2.5' onClick={isConnected ? () => saveViews(item) :  () => metaSaveView(item)}>
                              <p className="text-xs text-secondary truncate">{item.creator}</p>
                            <h1 className="mb-2.5 text-base font-semibold truncate text-secondary"> {item.name}  </h1>                         
                          
                            <div className="flex justify-between truncate mb-3 gap-2">
                              <label className="opacity-60 truncate text-secondary flex-1">Price</label>
                              <p className="font-semibold text-secondary flex-1 truncate text-right">
                                {item.price?item.price:"--"}{" "}{(item.currency&&item.price) ? item.currency.toUpperCase():" "}
                              </p>
                              </div>
                              <div className='flex justify-between gap-2'>
                              <label className="opacity-60 truncate text-secondary flex-1">Highest bid</label>
                              <p className="font-semibold text-secondary flex-1 truncate text-right">
                                 {item.highestBid?item.highestBid:"--"}{" "}{(item.currency&&item.highestBid) ? item.currency.toUpperCase():" "}
                              </p>
                            </div>                         
                        </div>
                        <hr />
                        <div className='px-2.5 py-4 flex justify-between'>
                          <div className='flex add-cart cursor-pointer'>
                            <span className='icon card-cart'></span>
                            <span className='font-semibold text-secondary ml-1 whitespace-nowrap hover:text-primary'>Add to Cart</span>
                          </div>
                          <div className='w-px border'></div>
                          <div className='flex shop-card cursor-pointer'>
                            <span className='icon card-shop'></span>
                            <span className='font-semibold text-secondary ml-1 whitespace-nowrap hover:text-primary'>Buy Now</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="">
                    <img src={nodata} alt="" className='mx-auto w-[80px]'/>
                    <h3 className="text-center">No data found</h3>
                  </div>
                )}
          </div>
          {loadDara&&<div className="category-more">
          {seeHide && <>
            <div className="text-center mt-5">
          <span onClick={loadmore} className='cursor-pointer text-base text-primary font-semibold'>See More</span>         
            <i className="icon block mx-auto see-more cursor-pointer" onClick={loadmore}></i>
          </div></>}
        </div>}
      </div>
     </> }
    </>
  );
}
const connectStateToProps = ({ auth }: any) => {
  return { auth: auth };
};
export default connect(connectStateToProps, (dispatch) => {
  return { dispatch };
})(ExploreNfts);

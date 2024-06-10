import axios from 'axios';
import { store } from '../store';
import { ApiControllers } from '../api/config';
const API_END_POINT = process.env.REACT_APP_API_END_POINT;
const API_END_POINT_KYC = process.env.REACT_APP_API_END_POINT_KYCINFO;
const API_VERSION = 'api/v1/';
const MINTING_API_END_POINT=process.env.REACT_APP_API_MINTING_END_POINT
const API_SIGNER_END_POINT= process.env.REACT_APP_API_SIGNATURE
const API_END_POINT_CUSTOMER=process.env.REACT_APP_API_END_POINT_CUSTOMER
const API_END_POINT_DAO = process.env.REACT_APP_API_DAO_END_POINT + "api/v1/";
const API_END_POINT_DAO_CARDS = process.env.REACT_APP_API_END_POINT + "api/v1/";
const MARKETPLACE_API_END_POINT=process.env.REACT_APP_MARKETPLACE_END_POINT
const STRAPI_ABOUT_US_DOC_PUBLISHED_URL=process.env.STRAPI_ABOUT_US_DOC_PUBLISHED_URL;
export function getToken() {
  const state = store.getState();
  // const token = state?.auth?.token || state.auth.user?.token || "" ;
  const token =state.auth.user?.token || state?.auth?.token ||  "" ;
  return token;

}
export function getCombineToken() {
  const state = store.getState();
  const token = state.auth?.token ;
  return token;

}
export function updateisreferralpage(url: any, obj: any) {
  return axios.put(`${API_END_POINT_KYC}${API_VERSION}${url}`, obj,{
    headers: {
      Authorization: `${getToken()}`
    }
  });
}

export function isexistingreferralcode(url: string) {
  return axios.get(API_END_POINT_KYC + `${API_VERSION}${url}`,{
    headers: {
      Authorization: `${getToken()}`
    }
  })
}

export function KycPost(url: string, obj: Object) {
  return axios.post(API_END_POINT_KYC + `${API_VERSION}${url}`, obj,{
    headers: {
      Authorization: `${getToken()}` },
  });
}
//---------------------marketplace-----------------

export function getTopNft(url: string) {
  return axios.get(MARKETPLACE_API_END_POINT + `${API_VERSION}${url}`, {
    headers:{
      Authorization: `${getToken()}`
    }
  });
}

export function getMarketplace(url: string) {
  return axios.get(MARKETPLACE_API_END_POINT + `${API_VERSION}${url}`, {
    headers:{
      Authorization: `${getToken()}`
    }
  });
}
export async function postMarketplace(url: any, obj: any) {
  return await axios.post(MARKETPLACE_API_END_POINT + `${API_VERSION}${url}`, obj, {
    headers: {
      Authorization: `${getToken()}`
    }
  });
}
//---------------------marketplace end-----------------
export function getEarnedBonous(url: string) {
  return axios.get(API_END_POINT + `${API_VERSION}${url}`,{
    headers: {
      Authorization: `${getToken()}`
    }
  });
}

export async function postMinting(url: any, obj: any) {
  return await axios.post(`https://devmintapi.azurewebsites.net/${API_VERSION}${url}`, obj, {
    headers: {
      Authorization: `${getToken()}`
    }
  });
}
export function getCUstomers(url: string) {
  return axios.get( `https://devkycapi.azurewebsites.net/${API_VERSION}${url}`,{
    headers:{
      Authorization: `${getToken()}`
    }
  });
}
export function getMinting(url: string) {
  return axios.get(`${MINTING_API_END_POINT}${url}`,{
    headers: {
      Authorization: `${getToken()}`}
  });
}
export function putForMinting(url:string,obj:any){
  const token = getToken();
  return axios.put(`${MINTING_API_END_POINT}${url}`, obj,{
    headers:{
      Authorization:`${token}`
    }
  });
}

export async function postSigner(url:string,obj:any){
    
  return await axios.post(`${API_SIGNER_END_POINT}${url}`,obj, {
    headers: {
      Authorization: `${getToken()}`
    }
  })
}

export function get(url: string,tokenType:string) {
  return axios.get(API_END_POINT + `${API_VERSION}${url}`,{
    headers: {
      Authorization: tokenType==='authorized' ?`${getToken()}` : `${getCombineToken()}`},
  });
}
export function getCall(url: string) {
  return axios.get(API_END_POINT_KYC + `${API_VERSION}${url}`);
}
export function apiUploadPost(url: string, obj: Object) {
  return axios.post(API_END_POINT_KYC + `${API_VERSION}${url}`, obj);
}
export function post(url: string, obj: Object) {
  return axios.post(API_END_POINT + `${API_VERSION}${url}`, obj,{
    headers: {
      Authorization: `${getToken()}`   },
  });
}
export function put(url: string, obj: any) {
  return axios.put(API_END_POINT + `${API_VERSION}${url}`, obj);
}
export const convertUTCToLocalTime = (dateString: any) => {
  let date = new Date(dateString);
  const milliseconds = Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  );
  const localTime = new Date(milliseconds);
  return localTime.toISOString();
};
export async function saveUser(url: string, obj: Object) {
  return axios.post(API_END_POINT_KYC + `${API_VERSION}${url}`, obj, {
    headers: {
      Authorization: `${getToken()}`},
  });
}
export async function getKyc(url: string) {
  return await axios.get(API_END_POINT_KYC + `${API_VERSION}${url}`, {
    headers: {
      Authorization: `${getCombineToken()}` },
  });
}

const getDaos=async(take:any,skip:any)=> {
  return await axios.get(API_END_POINT_DAO_CARDS + ApiControllers.user +`daodetails/${take}/${skip}`,{
    headers: {
      Authorization: `${getToken()}` },
  });
}

const getDaoDetails=async(id)=> {
  return await axios.get(API_END_POINT_DAO_CARDS + ApiControllers.user +`daodetails/${id}`,{
    headers: {
      Authorization: `${getToken()}` },
  });
}
const getMIntDaoDetails=async(take:any,skip:any)=> {
  return await axios.get(`https://devmintingapi.minnapad.com/${API_VERSION}` + ApiControllers.user +`DaoDetails/${take}/${skip}`,{
    headers: {
      Authorization: `${getToken()}` },
  });
}
const getStatusLu = async()=>{
  return await axios.get(API_END_POINT_DAO + ApiControllers.user +`StatusLu`,{
    headers: {
      Authorization: `${getToken()}` },
  });
}

const getProposalView=async(proposalId:any,customerId:any)=> {
   return await axios.get( API_END_POINT_DAO + ApiControllers.user +`proposalview/${proposalId}/${customerId ? customerId : ""}`,{
    headers: {
      Authorization: `${getToken()}` },
   });
  }

  const postCreateProposal=async(obj)=> {
  return await axios.post(API_END_POINT_DAO + ApiControllers.user +`createproposal`,obj,{
    headers: {
      Authorization: `${getToken()}`},
  }); 
}

const postSaveVote=async(obj)=> {
  return await axios.post(API_END_POINT_DAO + ApiControllers.user +`savevote`,obj,{
    headers: {
      Authorization: `${getToken()}` },
  });  
}

const getProposalList=async(take:any,skip:any,daoId:any,status:any,searchBy:any,startDate:any,endDate:any)=> {
  return await axios.get(API_END_POINT_DAO + ApiControllers.user +`ProposalsList/${take}/${skip}/${daoId}/${status}/${searchBy}/${startDate}/${endDate}`,{
    headers: {
      Authorization: `${getToken()}` },
  }) 
}

const getContractDetails=async(daoId:any)=> {
  return await axios.get(API_END_POINT_DAO + ApiControllers.user +`ContractDetails/${daoId}`,{
    headers: {
      Authorization: `${getToken()}` },
  });  
}

const getProposalVotes=async(proposalId:any)=> {
  return await axios.get(API_END_POINT_DAO + ApiControllers.user +`ProposalVotes/${proposalId}`,{
    headers: {
      Authorization: `${getToken()}`},
  });  
}

const getProposalVoters=async(take:any,skip:any,proposalId:any)=> {
  return await axios.get(API_END_POINT_DAO + ApiControllers.user +`proposalvoters/${take}/${skip}/${proposalId}`,{
    headers: {
      Authorization: `${getToken()}` },
  });
}

const customerVoted = async(proposalId:any,CustomerId:any) => {
  return await axios.get(API_END_POINT_DAO + ApiControllers.user + `isvotedcustomer/${proposalId}/${CustomerId}`,{
    headers: {
      Authorization: `${getToken()}`},
  })
}

const customerDetails = async(address:any) => {
  return await axios.get(API_END_POINT_KYC + API_VERSION + ApiControllers.user + `CustomerDetails/${address}`,{
    headers: {
      Authorization: `${getToken()}` },
  })
}
const isErrorDispaly = (objValue) => {
    if ((objValue.status > 400 && objValue.status < 500) && objValue.status != 401) {
      return "Something went wrong please try again!";
    } else {
      if (objValue.data && typeof objValue.data === "string") {
        return objValue.data;
      } else if (objValue.data && objValue.data.title && typeof objValue.data.title) {
        return objValue.data.title;
      }else if(objValue.title && typeof objValue.title){
        return objValue.title;
      }else if(objValue.shortMessage && typeof objValue.shortMessage){
        return objValue.shortMessage;
       } else if (objValue.originalError && typeof objValue.originalError.message === "string") {
        return objValue.originalError.message;
      } else {
      return typeof (objValue) === "object" && objValue.reason ? objValue.reason : "Something went wrong please try again!";
      }
    }
  };
  const uploadErrorDisplay = (objValue)=>{
  	if ((objValue?.status >= 400 && objValue?.status < 500) && objValue?.status != 401) {
  		return "Something went wrong please try again!";
  	} else {
  		if (objValue?.title && typeof objValue?.title) {
  			return objValue?.title;
  		}   else {
  			return "Something went wrong please try again!";
  		}
  	}
  }

  const getPortFolioData=async(customerId:any)=> {
    return await axios.get(API_END_POINT_DAO_CARDS + ApiControllers.user +`userportfolio/${customerId}`,{
      headers: {
        Authorization: `${getToken()}` },
    });
  }
  const getUserInvestments=async(take:any,skip:any,customerId:any,search:any)=> {
    return await axios.get(API_END_POINT_DAO_CARDS + ApiControllers.user +`userinvestments/${customerId}/${take}/${skip}/${search}`,{
      headers: {
        Authorization: `${getToken()}` },
    });
  }
  const getUserclaims=async(take:any,skip:any,customerId:any,search:any)=> {
    return await axios.get(API_END_POINT_DAO_CARDS + ApiControllers.user +`userclaims/${customerId}/${take}/${skip}/${search}`,{
      headers: {
        Authorization: `${getToken()}` },
    });
  }
  const getAboutpageData=async()=>{
    return await axios.get('https://wonderful-baseball-df5acc8ae6.strapiapp.com/api/aboutpages?populate=*')
  }
  const getDocData=async ()=>{
    return await axios.get('https://wonderful-baseball-df5acc8ae6.strapiapp.com/api/docs?populate=*')
  }
  const getDocsRestData=async ()=>{
    return await axios.get('https://determined-duck-ea7e7c45e5.strapiapp.com/api/docs?populate=*')
  }
let apiCalls = {getTopNft,getMarketplace,postMarketplace,getDaos,
  getDaoDetails,getMIntDaoDetails,getStatusLu,getProposalView,postCreateProposal,postSaveVote,getProposalList,getContractDetails,
  getProposalVotes,getProposalVoters,customerVoted,isErrorDispaly,uploadErrorDisplay,customerDetails,getPortFolioData,getUserInvestments,
  getUserclaims,getAboutpageData,getDocData,getDocsRestData,
}
export default apiCalls
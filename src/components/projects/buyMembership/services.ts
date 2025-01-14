import { create as ipfsHttpClient } from "ipfs-http-client";
import { apiUploadPost, getMinting, putForMinting } from "../../../utils/api";
import { isErrorDispaly } from "../../../utils/errorHandling";
import { waitForTransaction } from "wagmi/actions";
import { addressType } from "../../../utils/useCollectionDeployer";
const projectId = process.env.REACT_APP_PROJECTID;
const projectSecret = process.env.REACT_APP_PROJECTSECRET;
const authorization = "Basic " + btoa(projectId + ":" + projectSecret);

function base64ToBlob(base64, mimeType) {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
}
const validate=async (getCount:Function,address:addressType)=>{
  try{
    const response=await getCount(address);
    return {data:Number(response),error:''}
  }catch(error){
    return {data:null,error}
  }
}
const validation = (
  data: any,
  userBalance: number,
  totalMinted: number,
  inputCount: number
) => {
  const validationOnUserBalance = () => {
    let checkCount = userBalance + inputCount;
    if (checkCount <= data[0]?.maxMintedNfts) {
      return "";
    }
    if (userBalance === data[0]?.maxMintedNfts) {
      return "You have already minted maximum number of NFT's.";
    }
    const remainingCount = data[0]?.maxMintedNfts - userBalance;
    return `You have already minted ${userBalance} NFT. You are eligible to mint only ${remainingCount} more NFT in this ${data[0]?.saleName}.`;
  };
  let error: string = "";
  if (totalMinted < data[0]?.totalNfts) {
    error = validationOnUserBalance();
  } else {
    error = "The maximum number of NFT's has already been minted.";
  }
  return error;
};
const handleContractDetails = (
  response: any,
  onSuccess: Function,
  onError: Function
) => {
  if (response) {
    onSuccess(response);
    return;
  }
  onError(response);
};
export const getDetailsfromContract = async (funArgs: any, callbacks: any) => {
  const { address } = funArgs;
  const {
    onCount,
    onBalance,
    onNativePrice,
    onError,
    getMintedCount,
    readMintBalance,
    getNativeTokenPriceForMint,
  } = callbacks;
  try {
    const count = await getMintedCount(address);
    const balance = await readMintBalance(address);
    const nativePrice = await getNativeTokenPriceForMint(address);
    handleContractDetails(count, onCount, onError);
    handleContractDetails(balance, onBalance, onError);
    handleContractDetails(nativePrice, onNativePrice, onError);
  } catch (error) {
    onError(error);
  }
};

export const getMembershipDetails = async (funArgs: any, callbacks: any) => {
  const { daoId, userId } = funArgs;
  const { onSuccess, onError } = callbacks;
  try {
    const response = await getMinting(
      `User/GetMemberShipType/${daoId}/${userId}`
    );
    if (
      response.statusText?.toLowerCase() === "ok" ||
      response.status === 200
    ) {
      onSuccess(response.data);
    } else {
      onError(isErrorDispaly(response));
    }
  } catch (error) {
    onError(isErrorDispaly(error));
  }
};

export const getMetaData = async (funArgs: any, callbacks: any) => {
  const { count, daoId,totalSupply,getMintedCount,contractAddress,getDetails } = funArgs;
  const { setLoading, onSuccess, onError, loaderType } = callbacks;
  try {
    setLoading(loaderType, true);
    debugger
    const {data:totalSold,error}=await validate(getMintedCount,contractAddress);
    if(error){
      onError(error)
      return;
    }
    if(totalSold && totalSold+count>Number(totalSupply)){
      getDetails()
      const remaining=totalSupply-totalSold
      const message=remaining>0 ? `Already sold ${totalSold} out of ${totalSupply}! You can purchase only ${remaining} memberships` : 'Memberships are all sold out!'
      onError(message);
      return;
    }
    const response = await getMinting(`User/mintfiles/${count}/${daoId}`);
    if (
      response.statusText?.toLowerCase() === "ok" ||
      response.status === 200
    ) {
      onSuccess(response.data);
    } else {
      onError(isErrorDispaly(response));
    }
  } catch (error) {
    onError(isErrorDispaly(error));
  }
};
export const uploadToIPFS = async (funArgs: any, callbacks: any) => {
  const { data, nftPrice, crypto } = funArgs;
  const { onSuccess, onError } = callbacks;
  const urisFromIPFSData: any = [];
  const fileNames: any[] = [];
  try {
    for (let item of data) {
      const base64String = item?.image;
      let mimeType = "";
      if (base64String.startsWith("iVBORw0KGgo")) {
        mimeType = "image/png";
      } else if (base64String.startsWith("/9j/")) {
        mimeType = "image/jpeg";
      } else if (base64String.startsWith("UklGR")) {
        mimeType = "image/webp";
      } else if (base64String.startsWith("R0lGOD")) {
        mimeType = "image/gif";
      } else {
        console.error("Unsupported image format");
        return;
      }
      const nftMetadata = JSON.stringify(item);
      const blob = new Blob([nftMetadata], { type: "application/json" });
      const formData = new FormData();
      formData.append("file", blob, new Date().getTime() + ".json");
      const response = await apiUploadPost("Upload/UploadFileNew", formData);
      if (response.statusText.toLowerCase() !== "ok") {
        onError(response);
        return;
      }
      const imageBlob = base64ToBlob(base64String, mimeType);
      const imageData = new FormData();
      imageData.append("file", imageBlob, new Date().getTime() + '.'+mimeType.split('/')[1]);
      const imageURL = await apiUploadPost("Upload/UploadFileNew", imageData);
      if (imageURL.statusText.toLowerCase() !== "ok") {
        onError(imageURL);
        return;
      }
      urisFromIPFSData.push(response.data[0]);
      fileNames.push({
        fileName: item.serialNo,
        ImageCid: imageURL.data[0],
        Description: item.description,
        nftName: item.name,
        cid: response.data[0],
        coin: crypto,
        price: Number(nftPrice).toFixed(8),
      });
    }
    onSuccess(urisFromIPFSData, fileNames, data);
  } catch (error) {
    onError(isErrorDispaly(error));
  }
};

export const mintNfts = async (funArgs: any, callbacks: any) => {
  const { uri, files, currency, price, contractAddress } = funArgs;
  const { onSuccess, onError, minMultipleNft, parseError } = callbacks;
  try {
    const response = await minMultipleNft(
      uri,
      currency,
      price,
      contractAddress
    );
    if (response) {
      onSuccess(response, files);
    } else {
      onError(parseError(response));
    }
  } catch (error) {
    onError(parseError(error));
  }
};

const updateHash = async (params: any) => {
  const { data, files, userId, daoId } = params;
  try {
    const response = await putForMinting("User/updatetransactionhash", {
      transactionHash: data.hash,
      files: files,
      customerId: userId,
      daoId: daoId,
    });
    if (response.status === 200) {
      return;
    } else {
      return response;
    }
  } catch (err) {
    return err.message || err;
  }
};

export const updateTransactionHash = async (funArgs: any, callbacks: any) => {
  const { data } = funArgs;
  const { onSuccess, onError } = callbacks;
  try {
    const txResponse = await waitForTransaction({ hash: data.hash });

    if (txResponse && txResponse.status === "reverted") {
      onError("Transaction Failed");
    } else {
      const errorMessage = await updateHash(funArgs);
      !errorMessage && onSuccess(txResponse);
      errorMessage && onError(isErrorDispaly(errorMessage));
    }
  } catch (error) {
    onError(isErrorDispaly(error));
  }
};

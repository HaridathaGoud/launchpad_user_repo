import { create as ipfsHttpClient } from "ipfs-http-client";
import { getMinting, putForMinting } from "../../../utils/api";
import { isErrorDispaly } from "../../../utils/errorHandling";
import { waitForTransaction } from "wagmi/actions";
const projectId = process.env.REACT_APP_PROJECTID;
const projectSecret = process.env.REACT_APP_PROJECTSECRET;
const authorization = "Basic " + btoa(projectId + ":" + projectSecret);
const ipfs = ipfsHttpClient({
  url: "https://ipfs.infura.io:5001/api/v0",
  headers: {
    authorization,
  },
});
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
  const { count, daoId } = funArgs;
  const { setLoading, onSuccess, onError, loaderType } = callbacks;
  try {
    setLoading(loaderType, true);
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
  const { data, nftPrice } = funArgs;
  const { onSuccess, onError } = callbacks;
  const urisFromIPFSData: any = [];
  const fileNames: any[] = [];
  try {
    for (let item of data) {
      const base64String = item?.image;
      const binaryString = atob(base64String);
      let buffer = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        buffer[i] = binaryString.charCodeAt(i);
      }
      const result = await ipfs.add(buffer);
      if (!result) {
        onError(isErrorDispaly(result));
        return;
      }
      item.image = `ipfs://${result?.path}`;
      let nftMetadata = JSON.stringify(item);
      const jsonBlob = new Blob([nftMetadata], { type: "application/json" });
      const dataFromIPFS = await ipfs.add(jsonBlob);
      if (!dataFromIPFS) {
        onError(isErrorDispaly(dataFromIPFS));
        return;
      }
      urisFromIPFSData.push(dataFromIPFS.path);
      fileNames.push({
        fileName: item.serialNo,
        ImageCid: result?.path,
        Description: item.description,
        NftName: item.name,
        cid: dataFromIPFS.path,
        coin: "Matic",
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
    const response = await minMultipleNft(uri, currency, price, contractAddress);
    if (response) {
      onSuccess(response, files);
    } else {
      onError(parseError(response));
    }
  } catch (error) {
    onError(parseError(error));
  }
};

export const updateTransactionHash = async (funArgs:any,callbacks:any) => {
    const {data,files,userId}=funArgs;
    const {onSuccess,onError}=callbacks
    putForMinting('User/updatetransactionhash', {
      transactionHash: data.hash,
      files: files,
      customerId: userId,
    });
    try {
      const txResponse = await waitForTransaction({ hash: data.hash });
      if (txResponse && txResponse.status === "reverted") {
        onError('Transaction Failed')
      } else {
        onSuccess(txResponse)
      }
    } catch (error) {
        onError(isErrorDispaly(error))
    }
  };
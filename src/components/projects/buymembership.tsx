import React, { useCallback, useEffect, useState } from "react";
import { create as ipfsHttpClient} from 'ipfs-http-client';
import { ethers } from 'ethers';
import success from "../../assets/images/success.png";
import  useContract  from '../../hooks/useContract';
import MaticInput from "../inputs/maticforminput";
import Button from "../../ui/Button";
import { Modal, modalActions } from "../../ui/Modal";
import { useAccount } from "wagmi";
import { connect, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMemberTypes, getMetaDataDetails } from "../../reducers/rootReducer";


const BuyMembership = (props) => {
  const params=useParams()
  const { isConnected, address } = useAccount();
  const { minMultipleNft, parseError } = useContract();
  const user = useSelector((state: any) => state.auth.user);
  const projectId = process.env.REACT_APP_PROJECTID;
  const projectSecret = process.env.REACT_APP_PROJECTSECRET;
  const authorization = 'Basic ' + btoa(projectId + ':' + projectSecret);
  const ipfs = ipfsHttpClient({
    url: "https://ipfs.infura.io:5001/api/v0",
    headers: {
      authorization,
    },
  });
  useEffect(() => {
    if(user?.id && props?.daoId){
      getMemberShipDetails()
    }
    if (isConnected) {
    handleSubmit()
    }
  }, [isConnected,address,user?.id]);

  const handleSubmit = useCallback(() => {
    if (address) {
      getContractCounts()
    }
  }, [address])
  const getMemberShipDetails = () => {
    props.dispatch(getMemberTypes(props?.daoId, user?.id, (memType) => {
      getMemberShipTypes(memType);
    }));

  }

  const getContractCounts = () => {
    getCount();
    getBalanceCount(address)
    getNativeMint()
  }
  const getMemberShipTypes = async (data: any) => {
    console.log(data)
    // setMaxMintedNfts(getMemberTypes?.data[0]?.maxMintedNfts)
    // setMaxNftCount(getMemberTypes?.data[0]?.maxNftCount)
  };

  async function getCount() {
    // let mintCount: any = await readContract({
    //   address: mintingContractAddress,
    //   abi: MintContract.abi,
    //   functionName: "mintedCount"
    // });
    // mintCount = Number(mintCount);
    // setNftMintCount(mintCount);
  }
  async function getBalanceCount(address) {
    // let balance: any = await readContract({
    //   address: mintingContractAddress,
    //   abi: MintContract.abi,
    //   functionName: "balanceOf",
    //   args: [address]
    // });
    // balance = Number(balance);
    // setSmartMintedNftCount(balance);
  }

  async function getNativeMint(currency = "native") {
    // setNote(null)
    // setCount(1)
    // setCurrecnyLodaer(true)
    // setSelectedCrypto("Matic")
    // const _methodNames = { "token": "getPriceForTokenMint", "native": "getPriceForNativeMint" }
    // const nativeMint: any = await readContract({
    //   address: mintingContractAddress,
    //   abi: MintContract.abi,
    //   functionName: _methodNames[currency]
    // });
    // const hex = ethers.utils.formatEther(nativeMint)
    // const hexCurrencyValue = parseFloat(hex)
    // const percentage = 1 / 100;
    // const newCurrencyValue = hexCurrencyValue + hexCurrencyValue * percentage
    // const currencyValue = parseFloat(newCurrencyValue)
    // setNftPrice(currencyValue);
    // setReferralPrice(currencyValue)
    // setCurrencyValue(currencyValue);
    // setCurrecnyLodaer(false)
  }
  const handleMinting = () => {
    // enableDisableLoader(true);
    // setNote(null);
    // setSuccess(null);
    // setLoader(true)
    // if (nftMintCount < memberType?.data[0]?.totalNfts) {
    //   let checkCount = smartMintedNftCount + count;
    //   if (checkCount <= memberType?.data[0]?.maxMintedNfts) {
        props.dispatch(getMetaDataDetails(5,params?.daoid, (data:any) => {
          getMetaDataList(data);
        }))
      // }
      // else if (checkCount > smartMintedNftCount) {
      //   if (smartMintedNftCount == memberType?.data[0]?.maxMintedNfts) {
      //     setNote("The maximum number of NFT's has already been minted.")
      //     setLoader(false)
      //   } else {
      //     let remainingCount = memberType?.data[0]?.maxMintedNfts - smartMintedNftCount
      //     let remainingCountValue=remainingCount<=0?0:remainingCount
      //     setNote(`You have already minted ${smartMintedNftCount} NFT. You are eligible to mint only ${remainingCountValue} more NFT in this ${memberType?.data[0]?.saleName}.`)
      //     setLoader(false)
      //   }
      // }

    // else {
    //   if (nftMintCount == memberType?.data[0]?.totalNfts) {
    //     setNote("The maximum number of NFT's has already been minted.")
    //     setLoader(false)
    //   } else {
    //     let remainingCount = memberType?.data[0]?.totalNfts - nftMintCount
    //     setNote(`You have already minted ${nftMintCount} NFT. You are eligible to mint ${remainingCount} more NFT in this ${memberType?.data[0]?.saleName}.`)
    //     setLoader(false)
    //   }

    // }
  }
  const getMetaDataList = (data: any) => {
    // setMetaDataUri([])
    ipfsDataUpload(data);
  };
  const ipfsDataUpload = async (data: any) => {
    let metaDataDetails = data;
    let metadataIpfs;
    let fileNames: any[] = [];
    for (let item of metaDataDetails) {
      const base64String = item?.image;
      const binaryString = atob(base64String);
      let buffer = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        buffer[i] = binaryString.charCodeAt(i);
      }
      const result = await ipfs.add(buffer);
      if (!result) {
        // setErrorMsg(isErrorDispaly(result));
        // setIsShowRefreshBtn(true)
      }
      item.image = `ipfs://${result?.path}`;
      let nftMetadata = JSON.stringify(item);
      const jsonBlob = new Blob([nftMetadata], { type: 'application/json' });
      metadataIpfs = await ipfs.add(jsonBlob);
      // metaDataUri.push(metadataIpfs.path);
      fileNames.push({ fileName: item.serialNo,
        ImageCid:result?.path,
         Description:item.description,
         NftName:item.name,
         cid: metadataIpfs.path,
        //  coin:coinDetails,
        //  price:Number(referralPrice).toFixed(8)

         });
    }
  //  ipfsMetadata('metaDataUri', fileNames, metaDataDetails);
  };
  const ipfsMetadata = async (uri: string[], fileNames: any[], data: any[]) => {
    // try {
    //   const response = await minMultipleNft(uri, coinDetails, nftPrice, address);
    //    transactionHash(response, fileNames);
    // } catch (error) {
    //   setErrorMsg(parseError(error));
    //   setLoader(false)
    //   enableDisableLoader(false);
    //   setMetaDataUri([])
    //   store.dispatch(handleFetchMetaData({ key: 'metaDataDetails', loading: false, data: [], error: error?.message }));
    //   setIsShowRefreshBtn(true)
    //   setIsShowRefreshBtn(true);
    // }
  };
  const handleModalShow = () => {
    modalActions("my_modal_5", "open");
  };
  return (
    <div className="container mx-auto" id="buyMembershipHeader">
      <h1 className="font-semibold mb-4 text-2xl text-secondary">
        Buy Memb<span className={`text-primary`}>ership</span>
      </h1>
     <div className="lg:px-[55px]">
        <div className="mt-7 text-center">
          <h1 className="text-lg font-semibold text-secondary">
            {/* About {currMembership?.name?.toLowerCase()} membership */}
            About membership
          </h1>
          <p className="mt-2 mb-6 text-secondary">
            we’re building a DAO where members collaborate to create the
            videos.The DAO presents an incredible opportunity to shape the
            future of {process.env.REACT_APP_OFFERING_TITLE}`s.
          </p>
          <MaticInput value={1} maxValue={5} minValue={1}/>
          <div className="text-right mt-5 max-sm:text-center">
            <Button
              type="primary"
              handleClick={handleModalShow}
              btnClassName=""
            >
              MINT For Membership Pass
            </Button>
          </div>
        </div>
     </div>

      <Modal id={"my_modal_5"}>
        <div className="">
          <div className="flex justify-between items-center  mb-5">
            <h3 className="font-semibold text-lg mb-5"></h3>
          </div>
          <div className="text-center">
            <img className="mx-auto" src={success} />
            <h1 className={`text-success text-3xl font-semibold mt-5 mb-2`}>
              Congratulations!
            </h1>
            <p className="text-lg">0x4a9Df2CF...37c33929A</p>
            <p className="text-base mt-6 mb-8">
              Your{" "}
              <span className="font-semibold">
                mint for membership pass Registration
                <br /> is Successfull
              </span>{" "}
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};
const connectDispatchToProps = (dispatch: any) => {
  return {
    dispatch
  };
};
export default connect(null, connectDispatchToProps)(BuyMembership);

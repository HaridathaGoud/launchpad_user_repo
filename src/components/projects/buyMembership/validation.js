export const membershipValidation=(userInput,totalNfts,nftsLeft,mintedNftsByUser,overallMintedCount)=>{
    let error="";
    if (nftMintCount < memberType?.data[0]?.totalNfts) {
        let checkCount = smartMintedNftCount + count;
        if (checkCount <= memberType?.data[0]?.maxMintedNfts) {
          props.trackauditlogs(count,params?.daoid, (data) => {
            getMetaDataList(data);
          });
        }
        else if (checkCount > smartMintedNftCount) {
          if (smartMintedNftCount == memberType?.data[0]?.maxMintedNfts) {
            setNote("The maximum number of NFT's has already been minted.")
            setLoader(false)
          } else {
            let remainingCount = memberType?.data[0]?.maxMintedNfts - smartMintedNftCount
            let remainingCountValue=remainingCount<=0?0:remainingCount
            setNote(`You have already minted ${smartMintedNftCount} NFT. You are eligible to mint only ${remainingCountValue} more NFT in this ${memberType?.data[0]?.saleName}.`)
            setLoader(false)
          }
        }
  
      }
      else {
        if (nftMintCount == memberType?.data[0]?.totalNfts) {
          setNote("The maximum number of NFT's has already been minted.")
          setLoader(false)
        } else {
          let remainingCount = memberType?.data[0]?.totalNfts - nftMintCount
          setNote(`You have already minted ${nftMintCount} NFT. You are eligible to mint ${remainingCount} more NFT in this ${memberType?.data[0]?.saleName}.`)
          setLoader(false)
        }
  
      }
}
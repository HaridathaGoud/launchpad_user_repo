const [mintedMemberShipCount, setMintedMemberShipCount] = useState<any>();
const mintingContractAddress: any = process.env.REACT_APP_MINTING_CONTRACTOR;
async function getBalanceCount(address) {
    let contractAddress = mintingContractAddress;
    let balance: any = await readContract({
      address: contractAddress,
      abi: MintContract.abi,
      functionName: "balanceOf",
      args: [address],
    });
    balance = Number(balance);
    setMintedMemberShipCount(balance);
  }

  useEffect(() => {
    if (address) {
      getBalanceCount(address);
    }
  }, [address]);


  //view.tsx
  let currentDate = moment(new Date()).utc().format("YYYY-MM-DDTHH:mm:ss");
  const createdDate = moment(proposalDetails?.data?.startDate).format("X");
  const ended = moment(proposalDetails?.data?.endDate).format("X");
  const presentDate = moment(currentDate).format("X");

  // const showVotingOptions = presentDate >= createdDate && presentDate <= ended;

  getBalanceCount(daoData?.name, address);

  async function getBalanceCount(daoName, address) {
    // let contractAddress = daoName == "SEIICHI ISHII" ? mintingContractAddress : mintingKrijiContractAddress
    let contractAddress = (daoName = mintingContractAddress);
    let balance: any = await readContract({
      address: contractAddress,
      abi: MintContract.abi,
      functionName: "balanceOf",
      args: [address],
    });
    balance = Number(balance);
    dispatch({ type: "mintedMemberShipCount", payload: balance });
  }

  const userDetails = useSelector((state: any) =>
  isConnected
    ? state?.oidc?.fetchproposalviewdata
    : state?.proposal?.proViewData
);
const startDate = new Date(proposalDetails?.data?.startDate);
const getDaoItem = () => {
  let daoData = DaoDetail?.find(
    (item) => item?.daoId == selectedDaoData?.daoId
  );
  setDaoVoteName(daoData?.name);
  
};
const mintingContractAddress: any = process.env.REACT_APP_MINTING_CONTRACTOR;
// const mintingKrijiContractAddress: any = process.env.REACT_APP_MINTING_KEIJI_CONTRACTOR;
// const votingSeicheContractAddress: any = process.env.REACT_APP_VOTING_CONTRACTOR;
// const votingKeijiContractAddress: any = process.env.REACT_APP_VOTING_KEIJI_CONTRACTOR;

const DaoDetail = useSelector((state: any) => state?.proposal?.daos?.data);
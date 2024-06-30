import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import Button from "../../../ui/Button";
import { useAccount } from "wagmi";
import NoDataFound from "../../../ui/noData";
import { useCollectionDeployer } from "../../../utils/useCollectionDeployer";
import { getMarketplace, postMarketplace } from "../../../utils/api";
import { useDispatch } from "react-redux";
import { setError, setToaster } from "../../../reducers/layoutReducer";
import { useNavigate } from "react-router-dom";
import Spinner from "../../loaders/spinner";
import PortfolioShimmer from "../../loaders/portfolioshimmer";
const take = 5;
const msg = "After successful transaction NFT will be transferred to buyer";
const BiddingDetails = ({
  nftDetails,
  nftId,
  collectionAddress,
  tokenId,
}) => {
  const { acceptBid } = useCollectionDeployer();
  const rootDispatch = useDispatch();
  const { address } = useAccount();
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [skip,setSkip]=useState(0)
  const [isLoading, setIsLoading] = useState("");
  useEffect(() => {
    fetchData(false);
  }, []);
  const fetchData = async (seeMore:boolean) => {
    try {
      setIsLoading("fetchingData");
      const response = await getMarketplace(
        `User/biddata/${nftId}/${take}/${skip}`
      );
      if (response.statusText.toLowerCase() === "ok") {
        const dataToUpdate=seeMore ? [...data,...response.data] : [...response.data]
        setData(dataToUpdate);
        setSkip(skip+take)
      } else {
        rootDispatch(setError(response));
      }
    } catch (fetchError) {
      rootDispatch(setError({ message: fetchError }));
    } finally {
      setIsLoading("");
    }
  };
  console.log(skip)
  const executeBid = async (item: any) => {
    setIsLoading(item?.id);
    try {
      const hash = await acceptBid(
        collectionAddress,
        nftDetails.collectionType,
        item.biddingAmount,
        tokenId,
        item.signature,
        item.bidderAddress,
        1
      );
      const obj = {
        nftId: nftId,
        value: item.biddingAmount,
        crypto: "WMATIC",
        buyerAddress: item.bidderAddress,
        bidId: item.bidId,
        TransactionHash: hash,
      };
      const response = await postMarketplace(`User/SaveAcceptBid`, obj);
      if (
        response.status === 200 ||
        response.statusText.toLowerCase() === "ok"
      ) {
        rootDispatch(
          setToaster({
            message: "Bid accepted succesfully",
            callback: () => {
              setIsLoading("");
              navigate(`/profile/${address}`);
            },
          })
        );
      } else {
        setIsLoading("");
        rootDispatch(setError({ messsage: response }));
      }
    } catch (errorMessage) {
      setIsLoading("");
      rootDispatch(setError({ message: errorMessage, from: "contract" }));
    }
  };
  return (
    <section>
      <h3 className="text-[24px] font-semibold text-secondary mb-1 mt-6">
        Bidding Details
      </h3>

      <div className="max-sm:w-full overflow-auto px-1">
        <table className="refferal-table md:w-full border-spacing-y-2.5 border-separate max-sm:w-[800px]  ">
          <thead>
            <tr className="">
              <th className="text-left text-base text-secondary font-bold">
                S.No
              </th>
              <th className="text-left text-base text-secondary font-bold">
                Date
              </th>
              <th className="text-left text-base text-secondary font-bold">
                Buyer Address
              </th>
              <th className="text-left text-base text-secondary font-bold">
                Buyer Name
              </th>
              <th className="text-left text-base text-secondary font-bold">
                Bidding Amount
              </th>
              <th className="text-left text-base text-secondary font-bold"></th>
            </tr>
          </thead>

          <tbody>
            {data &&
              data.length > 0 &&
              data?.map((item: any, idx: any) => (
                <tr className="" key={item?.id}>
                  <td className="font-normal text-sm text-secondary">
                    {idx + 1}
                  </td>
                  <td className="font-normal text-sm text-secondary">
                    <Moment format="DD-MM-YYYY " className="blue-text">
                      {item.bidDate || "--"}
                    </Moment>
                  </td>
                  <td className="font-normal text-sm text-secondary">
                    {item.bidderAddress || "--"}
                  </td>
                  <td className="font-normal text-sm text-secondary">
                    {item.creatorName || "--"}
                  </td>
                  <td className="font-normal text-sm text-secondary">
                    {item.biddingAmount + " " || "--"}
                    {item.crypto ? item.crypto : ""}
                  </td>
                  <td>
                    {nftDetails?.ownerAddress.toLowerCase() ===
                      address?.toLowerCase() && (
                      <Button
                        btnClassName="px-5 lg:px-5"
                        handleClick={() => executeBid(item)}
                        disabled={isLoading !== ""}
                      >
                        <span>Accept Bid</span>
                        <span>
                          {isLoading === item?.id && (
                            <Spinner size="loading-sm" />
                          )}{" "}
                        </span>
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {isLoading==='fetchingData' && <PortfolioShimmer.Tab />}
        {data && data?.length===skip && isLoading!=='fetchingData' && (
        <div className="flex justify-center items-center">
          <Button type="plain" handleClick={() => fetchData(true)}>
          <span className="cursor-pointer text-base text-primary font-semibold">
            See More
          </span>
          <span className="mx-auto block icon see-more cursor-pointer mt-[-4px]"></span>
        </Button>
        </div>
      )}
        {isLoading!=='fetchingData' && data?.length === 0 && <NoDataFound text={""} />}
      </div>
    </section>
  );
};

export default React.memo(BiddingDetails);

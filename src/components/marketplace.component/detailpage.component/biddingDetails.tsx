import React, { useState } from "react";
import Moment from "react-moment";
import Button from "../../../ui/Button";
import { useAccount } from "wagmi";
import NoDataFound from "../../../ui/noData";
import { useCollectionDeployer } from "../../../utils/useCollectionDeployer";
import { postMarketplace } from "../../../utils/api";
import { useDispatch } from "react-redux";
import { setError, setToaster } from "../../../reducers/layoutReducer";
import { useNavigate } from "react-router-dom";
import Spinner from "../../loaders/spinner";
const msg = "After successful transaction NFT will be transferred to buyer";
const BiddingDetails = ({
  nftDetails,
  bidData,
  nftId,
  collectionAddress,
  tokenId,
}) => {
  const { acceptBid } = useCollectionDeployer();
  const rootDispatch = useDispatch();
  const { address } = useAccount();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState("");
  const executeBid = async (item: any) => {
    setIsLoading("acceptingBid");
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
    } catch (error) {
      setIsLoading("");
      rootDispatch(setError({ messsage: error }));
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
                Bidding Amount
              </th>
              <th className="text-left text-base text-secondary font-bold">
                Creator Name
              </th>
              <th className="text-left text-base text-secondary font-bold"></th>
            </tr>
          </thead>

          <tbody>
            {bidData?.map((item: any, idx: any) => (
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
                  {item.biddingAmount + " " || "--"}
                  {item.crypto ? item.crypto : ""}
                </td>
                <td className="font-normal text-sm text-secondary">
                  {item.creatorName || "--"}
                </td>

                <td>
                  {nftDetails?.ownerAddress.toLowerCase() ===
                    address?.toLowerCase() && (
                    <Button
                      btnClassName="px-5 lg:px-5"
                      handleClick={() => executeBid(item)}
                      disabled={isLoading !== ""}
                    >
                      Accept Bid
                      <span>
                        {isLoading !== "" && <Spinner size="loading-sm" />}{" "}
                      </span>
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {bidData?.length === 0 && <NoDataFound text={""} />}
      </div>
    </section>
  );
};

export default BiddingDetails;

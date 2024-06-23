import React from 'react'
import Moment from 'react-moment'
import Button from '../../../ui/Button'
import { useAccount } from 'wagmi'
import NoDataFound from "../../../ui/noData";
const BiddingDetails = ({nftDetails,bidData,executeBid}) => {
    const {address}=useAccount()
  return (
    <div>
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
                      <td
                        className="font-normal text-sm text-secondary"
                      >
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
                        {/* <Button
                            onClick={() =>
                              acceptBid(
                                collectionAddress,
                                nftDetails.collectionType,
                                item.biddingAmount,
                                tokenId,
                                item.signature,
                                item.bidderAddress,
                                1,
                              )
                            }
                          >
                            Accept Bid
                          </Button> */}
                        {nftDetails?.ownerAddress.toLowerCase() ===
                          address?.toLowerCase() && (
                          <Button
                            btnClassName="px-5 lg:px-5"
                            handleClick={() => executeBid(item)}
                          >
                            Accept Bid
                            {/* <span>{acceptbtnLoader && <Spinner size="sm" />} </span> */}
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {bidData?.length === 0 && (<NoDataFound text={""} />
              )}
            </div>
    </div>
  )
}

export default BiddingDetails
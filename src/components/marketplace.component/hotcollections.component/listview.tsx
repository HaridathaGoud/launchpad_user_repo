import React from "react";
import Button from "../../../ui/Button";
import listimg from '../../../assets/images/default-nft.png'
import NoData from "../../../ui/noData";
import PortfolioShimmer from "../../loaders/portfolioshimmer";
import { useNavigate } from "react-router-dom";
import Moment from "react-moment";
import { useAccount } from "wagmi";

const ListView = (props:any) => {
  const { address,isConnected } = useAccount();
  const navigate = useNavigate();
  const navigateToAsset = (item:any) => {
    navigate(`/marketplace/nft/${item.tokenId}/${item.collectionContractAddress}/${item.id}`) };
const saveView = (item:any) =>{
  props?.sendSaveView(item);
}
  return (
    <div>
      <div className="mb-6 max-sm:w-full overflow-auto">
        <div className="px-1">
          <table className="refferal-table md:w-full border-spacing-y-2.5 border-separate max-sm:w-[800px] px-1">
            <thead>
              <tr className="!bg-primary-content">
                <th className="text-left text-base text-secondary font-bold w-52">
                Item
                </th>
                <th className="text-left text-base text-secondary font-bold whitespace-nowrap">
                Current Price
                </th>
                <th className="text-left text-base text-secondary font-bold whitespace-nowrap">
                Owner
                </th>
                <th className="text-left text-base text-secondary font-bold whitespace-nowrap">
                Time Listed
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {props?.data?.data?.length > 0 && !props?.data?.loading &&
                props?.data?.data?.map((item: any) => (
                  <tr key={item?.id}>
                    <td className="w-52">
                      <div className="flex gap-4 items-center truncate">
                        <img src=
                        {
                          item?.image && !item?.image?.includes("null")
                            ? item.image.replace(
                                "ipfs://",
                                "https://ipfs.io/ipfs/"
                              )
                              : listimg
                          }
                          className="w-[50px] h-[50px] object-cover rounded-2xl shrink-0 cursor-pointer" alt="" onClick={
                            isConnected
                              ? () => saveView?.(item)
                              : () => navigateToAsset(item)
                          } />
                         <p className="font-normal text-sm text-secondary w-36 truncate " title={item?.name}>{item?.name}</p>
                         </div>
                    </td>
                    <td>
                      <p className="font-normal text-sm text-secondary">{item?.price ? (item?.price+' Matic') :'--'  } </p>
                    </td>
                    <td>
                      <p className="font-normal text-sm text-secondary">
                        {item?.creator || '--'}
                      </p>
                    </td>
                    <td>
                      <p className="font-normal text-sm text-secondary">
                     {(item.date ||item?.createdDate) ?
                      <Moment format="DD-MM-YYYY " className="blue-text">
                          {item.date ||item?.createdDate}
                        </Moment>
                        : "--"}
                      </p>
                    </td>
                    <td className="!p-2 text-right md:w-[217px]">
                      {" "}
                    {item.isPutOnSale && item?.walletAddress !== address &&
                      <Button
                        type="secondary"
                        btnClassName="!py-0 px-6 whitespace-nowrap"
                        handleClick={()=>navigateToAsset(item)}
                      >
                        Buy Now
                      </Button>
                     }
                    </td>
                  </tr>
                  ))
               }
                {props?.data?.data?.length === 0 && !props?.data?.loading && (
                <tr className="!bg-transparent">
                  <td colSpan={6} className="text-center ">
                  <NoData text={""} />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {props?.data?.loading && <PortfolioShimmer.Tab />}
        </div>
      </div>
    </div>
  );
};

export default ListView;

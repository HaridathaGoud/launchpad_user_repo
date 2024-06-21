import React from "react";
import Button from "../../../ui/Button";
import listimg from '../../../assets/images/default-nft.png'
import NoData from "../../../ui/noData";
import PortfolioShimmer from "../../loaders/portfolioshimmer";
import { useNavigate } from "react-router-dom";

const ListView = (props:any) => {
  const navigate = useNavigate();
  const navigateToAsset = (item:any) => {
    navigate(`/marketplace/nft/${item.tokenId}/${item.collectionContractAddress}/${item.id}`) };
    
  return (
    <div>
      <div className="mb-6 max-sm:w-full overflow-auto">
        <div className="px-1">
          <table className="refferal-table md:w-full border-spacing-y-2.5 border-separate max-sm:w-[800px] px-1">
            <thead>
              <tr className="!bg-primary-content">
                <th className="text-left text-base text-secondary font-bold">
                Item
                </th>
                <th className="text-left text-base text-secondary font-bold">
                Current Price
                </th>
                <th className="text-left text-base text-secondary font-bold">
                Best Offer
                </th>
                <th className="text-left text-base text-secondary font-bold">
                Last Sale
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
              {props?.data?.length > 0 &&
                props?.data?.map((item: any, index: any) => (
                  <tr>
                    <td>
                      <div className="flex gap-4 items-center"> <img src={listimg} className="w-[50px] h-[50px] object-cover rounded-2xl" alt="" /> <p>Null Stone</p></div>
                    </td>
                    <td>
                      <p className="font-normal text-sm text-secondary"> 0.0001 ETH</p>
                    </td>
                    <td>
                      <p className="font-normal text-sm text-secondary">
                        --
                      </p>
                    </td>
                    <td>
                      <p className="font-normal text-sm text-secondary">
                        0.024 MAGIC
                      </p>
                    </td>
                    <td>
                      <p className="font-normal text-sm text-secondary">
                        Raygan6
                      </p>
                    </td>
                    <td>
                      <p className="font-normal text-sm text-secondary">
                        2d ago
                      </p>
                    </td>
                    <td className="!p-2 text-right md:w-[217px]">
                      {" "}

                      <Button
                        type="secondary"
                        btnClassName="!py-0 px-6"
                        handleClick={()=>navigateToAsset(item)}
                      >
                        Buy Now
                      </Button>

                    </td>
                  </tr>
                ))
               }
                {!props?.data?.length && !props?.data?.loading && (
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

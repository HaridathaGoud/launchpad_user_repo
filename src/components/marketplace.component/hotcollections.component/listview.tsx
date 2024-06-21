import React, { useEffect } from "react";
import Button from "../../../ui/Button";

import moment from "moment";
import { useDispatch } from "react-redux";

import Spinner from "../../loaders/spinner";
import { setToaster } from "../../../reducers/layoutReducer";
import useClaimTokens from "../../../hooks/useClaimTokens";
import listimg from '../../../assets/images/default-nft.png'

const ListView = ({ userClaims,fetchData }) => {
  const rootDispatch = useDispatch();
  const { isClaiming, handleClaim, tokensClaimed } = useClaimTokens();
  useEffect(() => {
    onClaim();
  }, [tokensClaimed]);
  const onClaim = () => {
    if (tokensClaimed) {
      rootDispatch(setToaster({ message: "Tokens claim successful!" }));
      fetchData();
    }
  };
  const isBuyButtonDisabled = (claims: any) => {
    const nowDate = moment.utc(new Date()).toDate().getTime();
    const claimDate = moment.utc(claims.date).toDate().getTime();
    const isEnable = claimDate >= nowDate;
    return isEnable;
  };

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
                        >               
                          Buy Now
                        </Button>                   
                     
                    </td>
                  </tr>
            </tbody>
          </table>
        
        </div>
      </div>
    </div>
  );
};

export default ListView;

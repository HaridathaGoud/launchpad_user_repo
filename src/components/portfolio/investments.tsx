import React from "react";
import Button from "../../../ui/Button";
import { connect } from "react-redux";
import NoDataFound from "../../../ui/nodatafound";

const Investments = () => {
  return (
    <>
        <div >          
          <div className="">
            <div className="mb-6 max-sm:w-full overflow-auto">
             
                <div className="px-1">
                  <table className="refferal-table md:w-full border-spacing-y-2.5 border-separate max-sm:w-[800px] px-1">
                    <thead>
                      <tr className="!bg-primary-content">
                        <th className="text-left text-base text-secondary font-bold">
                        Projects
                        </th>
                        <th className="text-left text-base text-secondary font-bold">
                        Network
                        </th>
                        <th className="text-left text-base text-secondary font-bold">
                        Invested
                        </th>
                        <th className="text-left text-base text-secondary font-bold">
                        Tokens
                        </th>
                        <th className="text-left text-base text-secondary font-bold">
                        Status
                        </th>
                        <th className="text-left text-base text-secondary font-bold whitespace-nowrap">
                        Purchase Price
                        </th>
                        <th className="text-left text-base text-secondary font-bold whitespace-nowrap">
                        Live Price
                        </th>
                      </tr>
                    </thead>
                
                      <tbody >
                        <tr>
                          <td>
                            <p className="font-normal text-sm text-secondary">
                            Freebnk IDO
                            </p>
                          </td>
                          <td>
                           <img src="https://devdottstoragespace.blob.core.windows.net/dottimages/binance-network.svg" alt="" />
                          </td>
                          <td>
                            <p className="font-normal text-sm text-secondary">
                            177.83 USDT
                            </p>
                          </td>
                          <td>
                            <p className="font-normal text-sm text-secondary">
                            11.86k FRBK
                            </p>
                          </td>
                          <td>
                            <p className="font-normal text-sm text-secondary">
                            Claimable
                            </p>
                          </td>
                          <td>
                            <p className="font-normal text-sm text-secondary">
                            $0.015
                            </p>
                          </td>
                          <td>
                            <p className="font-normal text-sm text-secondary">
                            $0.021
                            </p>
                          </td>
                          
                        </tr>
                      </tbody>
                   
                  </table>
                </div>
            
            </div>
          </div>         
        </div>

     
    </>
  );
};
const connectStateToProps = ({ auth }) => {
  return { auth: auth };
};
export default connect(connectStateToProps, (dispatch) => {
  return { dispatch };
})(Investments);

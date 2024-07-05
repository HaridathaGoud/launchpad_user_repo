import React from "react";
import NoDataFound from "../../ui/noData";
import PortfolioShimmer from "../loaders/portfolioshimmer";
import { numberWithCommas } from "../../ui/formatNumber";
const Investments = ({ userInvestments }) => {
  return (
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
                {/* <th className="text-left text-base text-secondary font-bold whitespace-nowrap">
                   Live Price
                   </th> */}
              </tr>
            </thead>
            <tbody>
              {userInvestments?.data?.length > 0 &&
                userInvestments?.data.map((item: any) => (
                  <tr key={item.projectName}>
                    <td>
                      <p className="font-normal text-sm text-secondary">
                        {item?.projectName}
                      </p>
                    </td>
                    <td>
                      <span className="icon usdt scale-150"></span>
                    </td>
                    <td>
                      <p className="font-normal text-sm text-secondary">
                        {item?.invested
                          ? `${numberWithCommas(item?.invested)} ${process.env.REACT_APP_CURRENCY}`
                          : "--"}
                      </p>
                    </td>
                    <td>
                      <p className="font-normal text-sm text-secondary">
                        {item?.tokens
                          ? `${numberWithCommas(item?.tokens)} ${item?.tokenSymbol}`
                          : "--"}
                      </p>
                    </td>
                    <td>
                      <p className="font-normal text-sm text-secondary">
                        {item?.status ? item?.status : "--"}
                      </p>
                    </td>
                    <td>
                      <p className="font-normal text-sm text-secondary">
                        {item?.purchasePrice
                          ? `${numberWithCommas(item?.purchasePrice)} ${process.env.REACT_APP_CURRENCY}`
                          : "--"}
                      </p>
                    </td>
                    {/* <td>
                   <p className="font-normal text-sm text-secondary">
                     {item?.liveprice && '$'+item?.liveprice||'--'}
                   </p>
                 </td> */}
                  </tr>
                ))}
              {!userInvestments?.data?.length && !userInvestments?.loading && (
                <tr className="!bg-transparent">
                  <td colSpan={6} className="text-center ">
                    <NoDataFound />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {userInvestments?.loading && <PortfolioShimmer.Tab />}
        </div>
      </div>
    </div>
  );
};

export default Investments;

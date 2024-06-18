import React, { useEffect } from "react";
import Button from "../../../ui/Button";



const Activity = (props:any) => {
 

  return (
    <div>
      <div className="mb-6 max-sm:w-full overflow-auto">
        <div className="px-1">
          <table className="refferal-table md:w-full border-spacing-y-2.5 border-separate max-sm:w-[800px] px-1">
            <thead>
              <tr className="!bg-primary-content">
                <th className="text-left text-base text-secondary font-bold">
                No.
                </th>
                <th className="text-left text-base text-secondary font-bold">
                Type
                </th>
                <th className="text-left text-base text-secondary font-bold">
                Allocation Volume
                </th>
                <th className="text-left text-base text-secondary font-bold">
                Price Per Token
                </th>
                <th className="text-left text-base text-secondary font-bold whitespace-nowrap">
                Purchase Volume
                        </th>
              </tr>
            </thead>
            <tbody>            
                  <tr>
                    <td>
                      <p className="font-normal text-sm text-secondary">
                      01
                      </p>
                    </td>
                    <td>Private</td>
                    <td>
                      <p className="font-normal text-sm text-secondary">
                      10000
                      </p>
                    </td>
                    <td>
                      <p className="font-normal text-sm text-secondary">
                      0.01USDT
                      </p>
                    </td>
                    <td>
                        <p className="font-normal text-sm text-secondary">
                        2000
                        </p>
                      </td>
                    <td className="!p-2 text-right md:w-[217px]">                   
                        <Button
                          type="cancel"
                          btnClassName="!py-0 px-6 min-w-[140px]"                         
                        >                        
                         Success
                        </Button>
                     
                    </td>
                  </tr>  
                  <tr>
                    <td>
                      <p className="font-normal text-sm text-secondary">
                      01
                      </p>
                    </td>
                    <td>Private</td>
                    <td>
                      <p className="font-normal text-sm text-secondary">
                      10000
                      </p>
                    </td>
                    <td>
                      <p className="font-normal text-sm text-secondary">
                      0.01USDT
                      </p>
                    </td>
                    <td>
                        <p className="font-normal text-sm text-secondary">
                        2000
                        </p>
                      </td>
                    <td className="!p-2 text-right md:w-[217px]">                   
                        <Button
                          type="primary"
                          btnClassName="!py-0 px-6 min-w-[140px]"                         
                        >                        
                         Pending
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

export default Activity;

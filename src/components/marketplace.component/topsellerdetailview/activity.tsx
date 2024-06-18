import React from "react";

const Activity = ({activityData}) => {
//  console.log('activityData ',activityData);
 

  return (
    <div>
      <div className="mb-6 max-sm:w-full overflow-auto">
        <div className="px-1">
          <table className="refferal-table md:w-full border-spacing-y-2.5 border-separate max-sm:w-[800px] px-1">
            <thead>
              <tr className="!bg-primary-content">
                <th className="text-left text-base text-secondary font-bold">
                S.No.
                </th>
                <th className="text-left text-base text-secondary font-bold whitespace-nowrap">
                Date
                        </th>
                <th className="text-left text-base text-secondary font-bold">
                From
                </th>
                <th className="text-left text-base text-secondary font-bold">
                To
                </th>
                <th className="text-left text-base text-secondary font-bold">
                Price
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
                    <td>
                        <p className="font-normal text-sm text-secondary">
                        14-06-2024
                        </p>
                      </td>   
                    <td>0x4a9Df2CF064...d9EE37c33929A</td>
                    <td>
                      <p className="font-normal text-sm text-secondary">
                      0d9EE37c30xaf....0x4a9Df2CD8f8
                      </p>
                    </td>
                    <td>
                      <p className="font-normal text-sm text-secondary">
                      0.01USDT
                      </p>
                    </td>
                                    
                  </tr> 
                  <tr>
                    <td>
                      <p className="font-normal text-sm text-secondary">
                      02
                      </p>
                    </td>
                    <td>
                        <p className="font-normal text-sm text-secondary">
                        14-06-2024
                        </p>
                      </td>   
                    <td>0x4a9Df2CF064...d9EE37c33929A</td>
                    <td>
                      <p className="font-normal text-sm text-secondary">
                      0d9EE37c30xaf....0x4a9Df2CD8f8
                      </p>
                    </td>
                    <td>
                      <p className="font-normal text-sm text-secondary">
                      0.01USDT
                      </p>
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

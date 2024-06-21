import React from "react";
import Moment from "react-moment";
import AllocationsShimmer from "../../loaders/projects/allocationsShimmer";
import NoData from "../../../ui/noData";
import { useSelector } from "react-redux";

const Activity = (props:any) => {
  const {activityData} = useSelector((store: any) => {
    return {
      activityData:store?.collectionReducer.hotCollectionsActivityDetails
    }
  });
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
                  Name
                </th>
                <th className="text-left text-base text-secondary font-bold">
                Description
                </th>
                <th className="text-left text-base text-secondary font-bold">
                  Type
                </th>

              </tr>
            </thead>
            {activityData?.data?.loading && <AllocationsShimmer />}
            {!activityData?.data?.loading && <>
              <tbody>
                {activityData?.data?.length > 0 && activityData?.data?.map((item: any, index) => (
                  <tr>
                    <td>
                      <p className="font-normal text-sm text-secondary">
                        {index + 1}
                      </p>
                    </td>
                    <td>
                      <p className="font-normal text-sm text-secondary">
                        <Moment format="DD-MM-YYYY " className="blue-text">
                          {item.date || "--"}
                        </Moment>
                      </p>
                    </td>
                    <td> {item?.name || '--'} </td>
                    <td>
                      <p className="font-normal text-sm text-secondary">
                        {item?.description || '--'}
                      </p>
                    </td>
                    <td>
                      <p className="font-normal text-sm text-secondary">
                        {item?.type || '--'}
                      </p>
                    </td>

                  </tr>
                ))}
              </tbody>
            </>}
          </table>
          {activityData?.data?.length == 0 && <>
            <div className='text-center '> <NoData text={""} /></div></>}
        </div>
      </div>
    </div>
  );
};

export default Activity;

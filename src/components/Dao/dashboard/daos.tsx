import React, { useEffect } from "react";
import DaoCardShimmer from "../shimmers/daodashboard";
import { connect, useDispatch, useSelector } from "react-redux";
import { setError } from "../../../reducers/layoutReducer";
import { clearDaos, getDaos } from "../../../reducers/proposlaReducer";
import Button from "../../../ui/Button";
import nodata from "../../../assets/images/no-data.png";
import { useNavigate } from "react-router-dom";
const take = 8;
const Daos = (props: any) => {
  const rootDispatch = useDispatch();
  const navigate = useNavigate();
  const daos = useSelector((store: any) => store.proposal.daos);
  const getDaosList = async () => {
    await props.getDaos({
      page: daos?.nextPage || 1,
      take: take,
      data: daos?.data || null,
    });
  };
  useEffect(() => {
    getDaosList();
    return () => {
      props.clearDaos();
    };
  }, []);

  const navigateToProposals = (item: any) => {
    navigate(`/daos/${item?.name}/${item?.daoId}/${item.projectId}/proposals`);
  };
  if (daos?.error) rootDispatch(setError(daos?.error));
  return (
    <div>
      <div className="container mx-auto px-3 lg:px-0 mt-4">
        <h5 className="font-semibold text-2xl text-secondary">DAO’s</h5>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {!daos?.loading && (
            <>
              {daos?.data?.map((item: any) => (
                <div
                  className="shadow rounded mt-md-0 mt-3 sm-m-0 cursor-pointer rounded-lg transform transition-transform duration-500 hover:scale-[1.03]"
                  onClick={() => navigateToProposals(item)}
                  key={item.name + item.daoId}
                >
                  <img
                    src={item?.image}
                    className="w-full rounded-t-lg h-[350px] object-cover"
                    alt={item?.name || "Dao"}
                  />
                  <div className="p-2 rounded-b-lg">
                    <div className="flex gap-1 text-base font-normal text-secondary !mb-1">
                      <p className="text-base-200 text-base font-semibold">
                        Name:
                      </p>{" "}
                      <p className="text-secondary truncate"> {item?.name}</p>
                    </div>
                    {/* <div className="flex gap-1 text-base font-normal text-secondary mb-1">
                      <p className="text-base-200 text-base font-semibold">
                        {" "}
                        Members:
                      </p>{" "}
                      <p className="text-secondary truncate">
                        {" "}
                        {item?.members?.toLocaleString() || 0}
                      </p>
                    </div> */}
                  </div>
                </div>
              ))}
            </>
          )}
          {daos?.loading &&
            [...Array(take * daos.nextPage)].map((_, index) => (
              <div key={index}>
                <DaoCardShimmer />
              </div>
            ))}
        </div>
        <div className="text-center mt-4">
          {daos?.loading && (
            <span className="loading loading-spinner loading-sm"></span>
          )}
          {daos?.data?.length > 0 &&
            daos?.data?.length === take * (daos?.nextPage - 1) && (
              <Button type="plain" handleClick={getDaosList}>
                <span className="cursor-pointer text-base text-primary font-semibold">
                  See More
                </span>
                <span className="mx-auto block icon see-more cursor-pointer mt-[-4px]"></span>
              </Button>
            )}
          {!daos.loading && (!daos.data || daos.data?.length === 0) && (
            <div className="text-center mt-5">
              <img src={nodata} width={95} className="mx-auto" alt="No Data" />
              <h4 className="text-center text-secondary mt-2">No data found</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
const connectDispatchToProps = (dispatch: any) => {
  return {
    getDaos: (information: any) => {
      dispatch(getDaos(information));
    },
    clearDaos: () => {
      dispatch(clearDaos());
    },
    dispatch,
  };
};
export default connect(null, connectDispatchToProps)(Daos);

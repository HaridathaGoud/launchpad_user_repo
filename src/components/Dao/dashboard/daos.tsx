import React, { useEffect, useMemo } from "react";
import DaoCardShimmer from "../shimmers/daodashboard";
import { connect, useDispatch, useSelector } from "react-redux";
import { setError } from "../../../reducers/layoutReducer";
import { clearDaos, getDaos } from "../../../reducers/proposlaReducer";
import Button from "../../../ui/Button";
import { useNavigate } from "react-router-dom";
import NoData from "../../../ui/noData";
import SearchInputComponent from "../../marketplace.component/hotcollections.component/SearchComponent";
import DropdownMenus from "../../../ui/DropdownMenus";
const take = 8;
const Daos = (props: any) => {
  const rootDispatch = useDispatch();
  const navigate = useNavigate();
  const daos = useSelector((store: any) => store.proposal.daos);
  useEffect(() => {
    getDaosList();
    return () => {
      props.clearDaos();
    };
  }, []);
  const getDaosList = async () => {
    await props.getDaos({
      page: daos?.nextPage || 1,
      take: take,
      data: daos?.data || null,
    });
  };
  const navigateToProposals = (item: any) => {
    navigate(`/daos/${item?.name}/${item?.daoId}/${item.projectId}/proposals`);
  };
  if (daos?.error) rootDispatch(setError(daos?.error));
  const showSeeMore = useMemo(() => {
    return (
      !daos.loading &&
      daos?.data?.length > 0 &&
      daos?.data?.length === take * (daos?.nextPage - 1)
    );
  }, [daos]);
  const showNoData = useMemo(() => {
    return !daos.loading && (!daos.data || daos.data?.length === 0);
  }, [daos]);
  const dropdownList = [    
    {
      name: "Cancel sale",
      // action: () => handleDrawerToOpen("cancelSaleOrAuction"),
      isActive: false,
    }
  ]
   
   
 
  return (
    <div>
      <div className="container mx-auto px-3 lg:px-0 mt-4">
        <h5 className="font-semibold text-2xl text-secondary mb-4">Dashboard</h5>
         <div className="md:flex justify-between items-center">
         <div className="md:flex gap-6">
          <SearchInputComponent placeholdertext='Search' />
          <details className="dropdown daodrop-arrow dao-dropdown max-sm:mt-2">
            <summary className="px-4 pr-16 py-2 rounded-full cursor-pointer bg-transparent border"><span className="icon category mr-2"></span>Category</summary>
            <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 px-0 py-3 shadow">
              <li><a className="rounded-none">All</a></li>
              <li><a className="justify-between rounded-none">Social <span className="bg-[#57606A] rounded-full w-fit px-2 py-1 text-white font-medium text-xs">15,293</span></a></li>
              <li><a className="justify-between rounded-none">Protocol <span className="bg-[#57606A] rounded-full w-fit px-2 py-1 text-white font-medium text-xs">6,160</span></a></li>
              <li><a className="justify-between rounded-none">Investment <span className="bg-[#57606A] rounded-full w-fit px-2 py-1 text-white font-medium text-xs">5,284</span></a></li>
              <li><a className="justify-between rounded-none">Creator <span className="bg-[#57606A] rounded-full w-fit px-2 py-1 text-white font-medium text-xs">2,575</span></a></li>
            </ul>
          </details>         
          </div> 
          <p className="text-lg font-normal text-[#444] max-sm:mt-2 dao-count">34K dao(s)</p> 
         </div>
        <div className="grid md:grid-cols-2 mt-6 lg:grid-cols-4 gap-6">
          {daos?.data?.map((item: any) => (
            <div
              className="dao-card flex justify-center hover:border-[#343434] items-center shadow mt-md-0 sm-m-0 cursor-pointer rounded-lg transform transition-transform duration-500 hover:scale-[1.03]"
              onClick={() => navigateToProposals(item)}
              key={item.name + item.daoId}
            >
             <div>
             <img
                src={item?.image}
                className="rounded-full h-[82px] w-[82px] mx-auto object-cover"
                alt={item?.name || "Dao"}
              />
              <div className="p-2 rounded-b-lg">
                <div className="!mb-1 text-center">                  
                  <p className="text-secondary truncate text-xl font-medium mb-1 mt-[28px]"> {item?.name}</p>
                  <p className="text-neutral font-medium text-base">313K members</p>
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
            </div>
          ))}
          {daos?.loading &&
            [...Array(take * 1)].map((_, index) => (
              <div key={index}>
                <DaoCardShimmer />
              </div>
            ))}
        </div>
        <div className="text-center mt-4">
          {daos?.loading && (
            <span className="loading loading-spinner loading-sm"></span>
          )}
          {showSeeMore && (
            <Button type="plain" handleClick={getDaosList}>
              <span className="cursor-pointer text-base text-primary font-semibold">
                See More
              </span>
              <span className="mx-auto block icon see-more cursor-pointer mt-[-4px]"></span>
            </Button>
          )}
          {showNoData && <NoData text={""} />}
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

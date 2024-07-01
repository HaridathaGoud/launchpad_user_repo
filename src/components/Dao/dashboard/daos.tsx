import React, { useEffect, useMemo, useRef, useState } from "react";
import DaoCardShimmer from "../shimmers/daodashboard";
import { connect, useDispatch, useSelector } from "react-redux";
import { setError } from "../../../reducers/layoutReducer";
import { clearDaos, getDaos } from "../../../reducers/proposlaReducer";
import Button from "../../../ui/Button";
import { useNavigate } from "react-router-dom";
import NoData from "../../../ui/noData";
// import SearchInputComponent from "../../marketplace.component/hotcollections.component/SearchComponent";
// import DropdownMenus from "../../../ui/DropdownMenus";
import SearchBar from "../../../ui/searchBar";
import formatNumber from "../../../ui/formatNumber";
const take = 8;
const Daos = (props: any) => {
  const rootDispatch = useDispatch();
  const navigate = useNavigate();
  const searchBarRef = useRef(null);
  const [searchInput, setSearchInput] = useState("");
  const daos = useSelector((store: any) => store.proposal.daos);
  useEffect(() => {
    getDaosList(false);
    return () => {
      props.clearDaos();
    };
  }, [searchInput]);
  const getDaosList = async (seeMore: boolean) => {
    await props.getDaos({
      page: seeMore ? daos?.nextPage : 1,
      take: take,
      data: seeMore ? daos?.data : null,
      search: searchInput || null,
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

  return (
    <div>
      <div className="container mx-auto px-3 lg:px-0 mt-4">
        <div className="px-4 mx-auto max-w-[1012px]">
          <h5 className="font-semibold text-2xl text-secondary mb-4">
            Dashboard
          </h5>
        </div>
        {/* <div className="md:flex justify-between items-center">
         <div className="md:flex gap-6">
          <SearchBar inputRef={searchBarRef} onSearch={setSearchInput} placeholder="Search by dao name"/>
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
         </div> */}
        <div className="px-4 mx-auto max-w-[1012px] mb-[24px] flex flex-wrap items-centerflex-row md:flex-nowrap justify-between">
          <div className="w-full md:max-w-[420px]">
            <SearchBar
              inputRef={searchBarRef}
              onSearch={setSearchInput}
              placeholder="Search by dao name"
            />
          </div>
          <div>
            <p className="text-lg font-medium text-[#57606a] max-sm:mt-2 dao-count">
              34K dao(s)
            </p>
          </div>
        </div>
        <div className="px-0 md:px-4 mx-auto max-w-[1012px]">
          <div className="grid gap-[24px] md:grid-cols-3 lg:grid-cols-4">
            {daos?.data?.map((item: any) => (
              <div
                className="dao-card hover:border-[#57606a] border-y border-skin-border bg-skin-block-bg text-base md:rounded-xl md:border mb-0 flex items-center justify-center text-center transition-all hover:border-skin-text"
                onClick={() => navigateToProposals(item)}
                key={item.name + item.daoId}
                style={{ height: "266px" }}
              >
                <div className="p-[24px] leading-5 sm:leading-6">
                  <div className="relative mb-2 inline-block">
                    <div className="mb-1">
                      <img
                        src={item?.image}
                        className="mx-auto rounded-full bg-skin-border object-cover bg-[#e0e0e0]"
                        style={{
                          width: "82px",
                          minWidth: "82px",
                          height: "82px",
                        }}
                        alt={item?.name || "Dao"}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-1 truncate">
                    <h3 className="mb-0 mt-0 !h-[32px] overflow-hidden pb-0 text-[22px] font-semibold truncate w-[200px]">
                      {" "}
                      {item?.name}
                    </h3>
                  </div>
                  <p className="mb-[12px] text-skin-text text-[18px] text-[#57606a]">
                  {formatNumber(item?.members)} members
                  </p>
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
          <div className="text-center mt-4 mb-4">
            {daos?.loading && (
              <span className="loading loading-spinner loading-sm"></span>
            )}
            {showSeeMore && (
              <Button type="plain" handleClick={() => getDaosList(true)}>
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

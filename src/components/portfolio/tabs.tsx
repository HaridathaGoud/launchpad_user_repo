import React, { useEffect, useMemo, useRef, useState } from "react";
import Investments from "./investments";
import Claims from "./claims";
import SearchBar from "../../ui/searchBar";
import {
  clearUserClaims,
  clearUserInvestments,
  getUserClaims,
  getUserinvestments,
} from "../../reducers/portfolioReducer";
import { connect, useSelector } from "react-redux";
import Button from "../../ui/Button";
const pageSize = 10;
const Tabs = (props: any) => {
  const { user, userInvestments, userClaims } = useSelector(
    ({ auth, portfolio }: any) => {
      const user = auth.user;
      const userInvestments = portfolio.userInvestments;
      const userClaims = portfolio.userClaims;
      return { user, userInvestments, userClaims };
    }
  );
  const [isInvestmentsActive, setIsInvestmentsActive] = useState(true);
  const [searchInput, setSearchInput] = useState(null);
  const searchInputRef=useRef<any>(null)
  useEffect(() => {
    fetchData();
    return () => {
      props.clearUserInvestmentsData();
      props.clearUserClaims();
    };
  }, [isInvestmentsActive,searchInput]);
  const handleTabChange = () => {
    setSearchInput(null)
    if(searchInputRef.current) searchInputRef.current.value=''
    setIsInvestmentsActive((prev: boolean) => {
      return !prev;
    });
  };
  const fetchData = (on: string = "") => {
    if (!isInvestmentsActive) {
      props.getUserClaims({
        page: on === "seeMore" ? userClaims.nextPage : 1,
        take: pageSize,
        customerId: user.id,
        data: on === "seeMore" ? userClaims.data : null,
        search: searchInput,
      });
      return;
    }
    props.getUserinvestments({
      page: on === "seeMore" ? userInvestments.nextPage : 1,
      take: pageSize,
      customerId: user.id,
      data: on === "seeMore" ? userInvestments.data : null,
      search: searchInput,
    });
  };
  const showSeeMore = useMemo(() => {
    const { loading, data, nextPage } = isInvestmentsActive
      ? userInvestments
      : userClaims;
    return !loading && data && data?.length === pageSize * (nextPage-1);
  }, [isInvestmentsActive, userInvestments, userClaims]);
  return (
    <>
      <div className="md:flex items-center justify-between mt-8 mb-3">
        <div className="flex gap-4 items-center">
          <p className="text-xl font-semibold text-secondary">Investments</p>
          <input
            type="checkbox"
            className="toggle"
            checked={!isInvestmentsActive}
            onChange={() => handleTabChange()}
          />
          <p className="text-secondary text-sm font-normal">Claimable Only</p>
        </div>
        <SearchBar onSearch={setSearchInput} inputRef={searchInputRef} />
      </div>
      {isInvestmentsActive && <Investments userInvestments={userInvestments} />}
      {!isInvestmentsActive && <Claims userClaims={userClaims} />}
      {showSeeMore && (
        <div className="flex justify-center items-center">
          <Button type="plain" handleClick={() => fetchData('seeMore')}>
          <span className="cursor-pointer text-base text-primary font-semibold">
            See More
          </span>
          <span className="mx-auto block icon see-more cursor-pointer mt-[-4px]"></span>
        </Button>
        </div>
      )}
    </>
  );
};

const connectDispatchToProps = (dispatch: any) => {
  return {
    getUserinvestments: (callback: any) => {
      dispatch(getUserinvestments(callback));
    },
    getUserClaims: (callback: any) => {
      dispatch(getUserClaims(callback));
    },
    clearUserInvestmentsData: () => {
      dispatch(clearUserInvestments());
    },
    clearUserClaims: () => {
      dispatch(clearUserClaims());
    },
    dispatch,
  };
};
export default connect(null, connectDispatchToProps)(Tabs);

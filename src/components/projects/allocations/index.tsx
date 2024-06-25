import React, { useEffect, useReducer, useState } from 'react'
import { store } from '../../../store';
import { allocationState, allocationsReducer } from './reducers';
import { useDispatch } from 'react-redux';
import { setError, setToaster } from '../../../reducers/layoutReducer';
import { get } from '../../../utils/api';
import AllocationsView from  './allocations';
import { ethers } from "ethers";
import useContract from '../../../hooks/useContract';
import { BuyTokenDrawer } from './BuyTokenDrawer';
import AllocationsShimmer from '../../loaders/projects/allocationsShimmer';

 const Allocations = (props:any) => {
    const user = store.getState().auth;
    const [state, dispatch] = useReducer(allocationsReducer, allocationState);
    const rootDispatch = useDispatch();
    const [loader, setLoader] = useState(true);
    const { buyTokens } = useContract();

    useEffect(()=>{
        getAllocationDetails()
      },[])
    const getAllocationDetails = async () => {
        const userId =
          user?.user?.id && user?.user?.id !== ""
            ? user?.user?.id
            : "00000000-0000-0000-0000-000000000000";
        try {
            const allocations = await get(
              "User/Allocations/" + props.pid + "/" + userId
            );
            if (allocations.status === 200) {
              dispatch({ type: "setAllocations", payload: allocations.data });
              if (allocations.data?.length !== 0) {
                dispatch({ type: "setHide", payload: false });
              } else {
                dispatch({ type: "setHide", payload: true });
              }
              handlePrivateOrPublic(allocations?.data);
              setLoader(false);
            } else {
              rootDispatch(setError({ message: allocations }));
              setLoader(false);
            }
        } catch (error) {
          rootDispatch(setError({ message: error }));
        } finally {
          setLoader(false);
        }
      };
      const handlePrivateOrPublic = (data: any) => {
        data?.forEach((item: any) => {
          if (item.type === "Private") {
            let privateStartDate = new Date(item.startDate).getTime();
            let privateEndDate = new Date(item.endDate).getTime();
            DatesCheck(privateStartDate, privateEndDate, item);
          } else if (item.type === "Public") {
            let publicStartDate = new Date(props.pjctInfo.startDate).getTime();
            let publicEndDate = new Date(props.pjctInfo.endDate).getTime();
            DatesCheck(publicStartDate, publicEndDate, item);
          }
        });
      };
      const DatesCheck = (startDate: any, endDate: any, item: any) => {
        let nowDate = new Date().getTime();
        let allocationArray: any = [];
        if (startDate <= nowDate && nowDate <= endDate) {
          allocationArray.push(item);
          dispatch({ type: "setAllocations", payload: allocationArray });
        }
      };
      const handleDrawerActions = (payload: any, item: any) => {
        if(!props.proStatus()){
          rootDispatch(setError({message:"No active rounds at the moment."}));
          return
        }
        if (payload) {
          dispatch({
            type: "setAllocationVolume",
            payload: item?.allocationVolume,
          });
          dispatch({
            type: "setBuyAmount",
            payload: item?.allocationVolume,
          });
          dispatch({
            type: "setIsPublic",
            payload: item?.type?.toLowerCase() === "public",
          });
          dispatch({
            type: "setPurchasedAmount",
            payload: Number(item?.purchaseVolume),
          });
          dispatch({ type: "setVolumeData", payload: item?.paymentValue });
        } else {
          dispatch({ type: "setBuyAmount", payload: null });
          state.amountError && dispatch({ type: "setAmountError", payload: "" });
          rootDispatch(setError({ message: "" }));
          dispatch({ type: "setIsPublic", payload: false });
          dispatch({ type: "setIsBuying", payload: false });
          dispatch({ type: "setDrawerStep", payload: 1 });
        }
        dispatch({ type: "setShouldOpenDrawer", payload: payload });
      };
      const handleAmount = (e: any) => {
        if (!e.target.value || e.target.value?.match(/^\d{1,}(\.\d{0,8})?$/)) {
          dispatch({ type: "setBuyAmount", payload: e.target.value });
        }
        dispatch({
          type: "setAmountError",
          payload: "",
        });
      };
      const handleBuyToken = (e: any) => {
        let isUpdate = false;
        const value = state.allocationVolume?.toString();
        const decimalRegex = /^\d*\.\d+$/;
        state.amountError && dispatch({ type: "setAmountError", payload: "" });
        rootDispatch(setError({ message: "" }));
        if (value && !state.buyAmount) {
          if (state.buyAmount === "") {
            dispatch({
              type: "setAmountError",
              payload: "Please enter allocation volume to buy.",
            });
          } else if (parseFloat(state.buyAmount) === 0) {
            dispatch({
              type: "setAmountError",
              payload: "Please enter allocation volume greater than zero.",
            });
          } else if (
            state.buyAmount &&
            (Number(state.buyAmount) > state.allocationVolume ||
              Number(state.buyAmount) >
                Number(state.allocationVolume) - Number(state.purchasedAmount))
          ) {
            dispatch({
              type: "setAmountError",
              payload: "Insufficient Allocation volume.",
            });
          } else if (decimalRegex.test(state.buyAmount)) {
            dispatch({
              type: "setAmountError",
              payload: "Decimal values are not allowed.",
            });
          } else {
            isUpdate = true;
          }
        } else {
          if (!state.buyAmount) {
            dispatch({
              type: "setAmountError",
              payload: "Please enter allocation volume to buy.",
            });
          } else if (parseFloat(state.buyAmount) === 0) {
            dispatch({
              type: "setAmountError",
              payload: "Please enter allocation volume greater than zero.",
            });
          } else if (
            state.buyAmount &&
            (Number(state.buyAmount) > state.allocationVolume ||
              Number(state.buyAmount) >
                Number(state.allocationVolume) - Number(state.purchasedAmount))
          ) {
            dispatch({
              type: "setAmountError",
              payload: "Insufficient Allocation volume.",
            });
          } else if (decimalRegex.test(state.buyAmount)) {
            dispatch({
              type: "setAmountError",
              payload: "Decimal values are not allowed.",
            });
          } else {
            isUpdate = true;
          }
        }
        if (isUpdate) {
          dispatch({ type: "setDrawerStep", payload: 2 });
        } else {
          dispatch({ type: "setDrawerStep", payload: 1 });
        }
      };
      function _provider() {
        const _connector: any = window?.ethereum;
        const provider = new ethers.providers.Web3Provider(_connector);
        return provider;
      }
      const handleOk = async () => {
        const etherValue = Number(state.volumeData) * Number(state.buyAmount);
        dispatch({ type: "setIsBuying", payload: true });
        buyTokens(
          etherValue.toFixed(8),
          Number(state.buyAmount),
          state.isPublic,
          props.pjctInfo?.contractAddress
        )
          .then((res: any) => {
            // res?.wait()
            _provider()
              .waitForTransaction(res?.hash)
              .then((receipt: any) => {
                dispatch({ type: "setIsBuying", payload: false });
                dispatch({ type: "setShouldOpenDrawer", payload: false });
                dispatch({ type: "setDrawerStep", payload: 1 });
                rootDispatch(setToaster({ message: "Tokens purchase successful!" }));
                getAllocationDetails();
                props.getDetails();
              })
              .catch((error: any) => {
                rootDispatch(setError({ message: error?.reason || error }));
                dispatch({ type: "setIsBuying", payload: false });
              });
          })
          .catch((error: any) => {
            rootDispatch(
              setError({
                message: error?.shortMessage || error?.reason || error,
                from: "contract",
              })
            );
            dispatch({ type: "setIsBuying", payload: false });
          });
      };
  return (<>
    {loader && (
      <AllocationsShimmer />
    )}
    {!loader && (
      <AllocationsView
        pjctInfo={props.pjctInfo}
        loader={loader}
        allocations={state.allocations}
        hide={state.hide}
        handleDrawerActions={handleDrawerActions}
        allocationVolume={state.allocationVolume}
      />
    )}

        {state.shouldOpenDrawer &&  (
        <BuyTokenDrawer
        shouldOpenDrawer={state.shouldOpenDrawer}
        handleDrawerActions={handleDrawerActions}
        drawerStep={state.drawerStep}
        allocationVolume={state.allocationVolume}
        buyAmount={state.buyAmount}
        handleAmount ={handleAmount}
        amountError={state.amountError}
        handleBuyToken={handleBuyToken}
        isBuying={state.isBuying}
        handleOk={handleOk} />
      )}
    </>)
}
export default Allocations;
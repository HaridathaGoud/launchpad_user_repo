import React, { useContext, useEffect, useMemo, useReducer } from "react";
import Collapse from "../../ui/Collapse";
import RewardsComponent from "./rewards";
import WithdrawComponent from "./withdraw";
import Unstake from "./unstake";
import StakingComponent from "./stake";
import { StakingContextModal, StakingTabsContextModel } from "./models";
import { StakingContext } from "./context/stakingContext";
import { stakingTabsCommonReducer, stakingTabsInitialState } from "./reducers";
import { StakingTabsProvider } from "./context/stakingTabsContext";
import formatErrorMessage from "../../utils/formatErrorMessage";
import OutletContextModel from "../../layout/context/model";
import outletContext from "../../layout/context/outletContext";


const StakingTabs = () => {
  const {setErrorMessage}:OutletContextModel=useContext(outletContext)
  const {
    activeTab,
    setActiveTab,
    activeStep,
    setActiveStep,
  }: StakingContextModal = useContext(StakingContext);
  const [tabState, dispatch] = useReducer(
    stakingTabsCommonReducer,
    stakingTabsInitialState
  );
  useEffect(()=>{
    console.log(tabState.tabError)
    setErrorMessage?.(tabState?.tabError,()=>dispatch({type:'setTabError',payload:''}))
  },[tabState?.tabError])  // eslint-disable-line react-hooks/exhaustive-deps
  const tabsContextValue: StakingTabsContextModel = useMemo(() => {
    return {
      tabError:tabState?.tabError,
      checkboxValue: tabState?.checkboxValue,
      buttonLoader: tabState?.buttonLoader,
      amountFieldError: tabState?.amountFieldError,
      tabAmount: tabState?.tabAmount,
      tabData: tabState?.tabData,
      setAmountFieldError: (payload: string) =>
        dispatch({
          type: "setAmountFieldError",
          payload: formatErrorMessage(payload),
        }),
      setButtonLoader: (payload: boolean) =>
        dispatch({ type: "setButtonLoader", payload: payload }),
      setCheckboxValue: (payload: boolean) =>
        dispatch({ type: "setCheckboxValue", payload: payload }),
      setTabAmount: (payload: any) =>
        dispatch({ type: "setTabAmount", payload: payload }),
      setTabData: (payload: any) =>
        dispatch({ type: "setTabData", payload: payload }),
      setTabError:(payload:any)=>dispatch({type:'setTabError',payload:payload}),
      resetTab: () => {
        tabState?.tabError && dispatch({type:'setTabError',payload:''})
        activeStep !== 0 && setActiveStep?.(0);
        tabState?.checkboxValue &&
          dispatch({ type: "setCheckboxValue", payload: false });
        tabState?.buttonLoader &&
          dispatch({ type: "setButtonLoader", payload: false });
        tabState?.amountFieldError &&
          dispatch({
            type: "setAmountFieldError",
            payload: "",
          });
        tabState?.tabAmount &&
          dispatch({ type: "setTabAmount", payload: null });
      },
    };
  }, [tabState,activeStep]); // eslint-disable-line react-hooks/exhaustive-deps
  const tabs = useMemo(
    () => [
      {
        name: "Stake",
        content: [
          {
            name: "Checkpoints",
            icon: "checkpoints",
            activeIcon: "checkpointsActive",
          },
          {
            name: "Amount to Stake",
            icon: "amount",
            activeIcon: "amountActive",
          },
          { name: "Confirm", icon: "confirm", activeIcon: "confirmActive" },
          {
            name: "Confirmation",
            icon: "confirmation",
            activeIcon: "confirmationActive",
          },
        ],
      },
      {
        name: "Unstake",
        content: [
          { name: "Warning", icon: "warning", activeIcon: "warningactive" },
          {
            name: "Checkpoints",
            icon: "checkpoints",
            activeIcon: "checkpointsActive",
          },
          {
            name: "Amount to Unstake",
            icon: "amount",
            activeIcon: "amountActive",
          },
          {
            name: "Initialize Unstake",
            icon: "confirm",
            activeIcon: "confirmActive",
          },
          {
            name: "Confirmation",
            icon: "confirmation",
            activeIcon: "confirmationActive",
          },
        ],
      },
      {
        name: "Withdraw",
        content: [
          {
            name: "checkpoints",
            icon: "checkpoints",
            activeIcon: "checkpointsActive",
          },
          {
            name: "Initialize Withdrawl",
            icon: "amount",
            activeIcon: "amountActive",
          },
          {
            name: "Confirmation",
            icon: "confirmation",
            activeIcon: "confirmationActive",
          },
        ],
      },
      { name: "Rewards", content: [] },
    ],
    []
  );
  return (
    <div className="grid lg:grid-cols-4 mt-2">
      <div className="mt-5">
        <Collapse
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={(payload: number) => setActiveTab?.(payload)}
          activeStep={activeStep}
          setActiveStep={(payload: number) => setActiveStep?.(payload)}
        />
      </div>
      <StakingTabsProvider value={tabsContextValue}>
        <div className="lg:col-span-3">
          {activeTab === 0 && <StakingComponent />}
          {activeTab === 1 && <Unstake />}
          {activeTab === 2 && <WithdrawComponent />}
          {activeTab === 3 && <RewardsComponent />}
        </div>
      </StakingTabsProvider>
    </div>
  );
};

export default StakingTabs;

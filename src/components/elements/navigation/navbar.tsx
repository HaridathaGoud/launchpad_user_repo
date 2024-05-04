/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import logo from "../../../assets/images/yb-logo.svg";
import { connect, useDispatch, useSelector } from "react-redux";
import { ConnectorData, useAccount, useDisconnect } from "wagmi";
import { store } from "../../../store";
import {
  getTokenDetails,
  setUserID,
  Staker,
  walletAddress,
} from "../../../reducers/rootReducer";
import { getKyc } from "../../../utils/api";
import useContract from "../../../hooks/useContract";
import userImage from "../../../assets/images/avatar.jpg";
import DropdownMenus from "../../../ui/DropdownMenus";
import { useLocation, useNavigate } from "react-router-dom";
import NaviLink from "../../../ui/NaviLink";
import ConnectWallet from "../../../ui/connectButton";
import Spinner from "../../loaders/spinner";
import { setError } from "../../../reducers/layoutReducer";

function HeaderNavbar() {
  const rootDispatch=useDispatch()
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const userProfilePic = useSelector(
    (state: any) => state.auth.user?.profilePicUrl
  );
  const [changingAddress,setChangingAddress]=useState(false)
  const { disconnectAsync } = useDisconnect();
  const { isConnected, address } = useAccount();
  const { isStaker } = useContract();
  const [profilePic, setProfilePic] = useState("");
  useEffect(() => {
    setProfilePic(userProfilePic);
  }, [userProfilePic]);
  const { connector: activeConnector } = useAccount();
  useEffect(()=>{
    if(!address){
      store.dispatch(getTokenDetails(null,null))
    }
  },[address])
  useEffect(() => {
      activeConnector?.on("change", handleConnectorUpdate);
    return () => activeConnector?.off("change", handleConnectorUpdate);
  }, [activeConnector]);
  const handleDisconnect = useCallback(async () => {
    await disconnectAsync();
    store.dispatch(setUserID(""));
  }, []);
  const handleConnectorUpdate = ({ account, chain }: ConnectorData) => {
    if (account) {
      getCustomerDetails(account);
      getStakeFlag();
      return;
    }
    
    if (chain?.id?.toString()!==process.env.REACT_APP_CHAIN_ID_NUMARIC || chain?.unsupported) {
      rootDispatch(setError({message:"Switched to unsupported network!",type:"warning"}))
    }else if(chain?.id?.toString()===process.env.REACT_APP_CHAIN_ID_NUMARIC && !chain?.unsupported){
      rootDispatch(setError({message:""}))
    }
  };
  const handleDropdownAction = useCallback((path: string) => {
    navigate(path);
  }, []);
  const { navMenuList, navBarDropDownMenu,globalDropdown } = useMemo(() => {
    const globalDropdown = [
      {
        name: "Streaming",
        image:
          "https://dottdevstoragespace.blob.core.windows.net/images/streming.png",
          action: () => window.open("https://streaming.dott.network", "_blank"),
      },
      {
        name: "DAO’s",
        image:
          "https://dottdevstoragespace.blob.core.windows.net/images/dao.png",
          action: () => navigate("/daos"),
      },
    ];
    const navMenuList = [
      { path: "/projects", content: "Projects" },
      { path: "/staking", content: "Staking" },
      { path: "/tiers", content: "Tiers" },
    ];
    const navBarDropDownMenu = [
      {
        name: "Profile",
        action: () => handleDropdownAction("/profile"),
        isActive: pathname.includes("/profile"),
      },
      {
        name: "Disconnect",
        action: () => {
          handleDisconnect();
          handleDropdownAction("/dashboard");
        },
      },
    ];
    return { navMenuList, navBarDropDownMenu,globalDropdown };
  }, [pathname]);

  const dispatchCustomerDetails=(data:any)=>{
    store.dispatch(setUserID(data));
    setProfilePic(data?.profilePicUrl);
    store.dispatch(walletAddress(address || ""));
  }
  const getCustomerDetails = async (address:string | undefined) => {
    setChangingAddress(true)
    if (address) {
      try {
        const res = await getKyc(`User/CustomerDetails/${address}`);
        if (res.statusText?.toLowerCase() === "ok" || res.status===200) {
          store.dispatch(getTokenDetails(res?.data,dispatchCustomerDetails))
        } else {
          rootDispatch(setError({message:res}))
        }
      } catch (error) {
        rootDispatch(setError({message:error}))
      }finally{
        setChangingAddress(false)
      }
    }
  };
  const getStakeFlag = () => {
    isStaker().then((res: any) => {
      store.dispatch(Staker(res));
    });
  };
  

  return (
    <div id="header" className="sticky top-0 z-50 bg-success-content header-shadow">
      <div className="navbar bg-success-content container mx-auto lg:px-0 px-3">
        <div className="navbar-start">
          <div className="pr-4 hidden lg:flex shrink-0">
            <NaviLink path={"/dashboard"} type="primary">
              <img src={logo} alt="YellowBlock" className="w-[28px]" />
            </NaviLink>
          </div>
          <div className="flex items-center">
            <div className="drawer w-[26px] lg:hidden mr-2">
              <input id="my-drawer" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content">
                <label htmlFor="my-drawer" className="">
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 17 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1h15M1 7h15M1 13h15"
                    />
                  </svg>
                </label>
              </div>
              <div className="drawer-side">
                <label
                  htmlFor="my-drawer"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
                <ul className="menu menu-sm dropdown-content z-[1] p-2 shadow bg-base-100 h-screen min-w-[200px]">
                  {navMenuList.map(({ path, content, target, rel }) => {
                    return (
                      <li className="group mb-2" key={path}>
                        <NaviLink
                          path={path}
                          type="primary"
                          target={target}
                          rel={rel}
                        >
                          {content}
                        </NaviLink>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="pr-4 lg:hidden">
              <NaviLink path={"/dashboard"} type="primary">
                <img src={logo} alt="YellowBlock" className="w-[22px] mr-3 " />
              </NaviLink>
            </div>
          </div>

          <div className="navbar-center hidden lg:flex ">
            <ul className="menu menu-horizontal pl-[24px] border-l border-gray-300 ">
              {navMenuList.map(({ path, content, target, rel }) => {
                return (
                  <li className="group" key={path}>
                    <NaviLink
                      path={path}
                      type="primary"
                      className="mr-[30px] text-secondary cursor-pointer bg-transparent"
                      target={target}
                      rel={rel}
                    >
                      {content}
                    </NaviLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="navbar-end">
        <div className="mr-6">
              <DropdownMenus
                btnContent={<span className="icon menu-icon"></span>}
                dropdownClass="md:dropdown-end"
                dropdownList={globalDropdown}
                menuwidth="!min-w-[254px] grid grid-cols-2 global-list"
                btnCenter="text-center py-4"
                borderList="border border-t-0"
              />
            </div>
          {!isConnected && <ConnectWallet />}
          {isConnected && changingAddress &&  <div
                    className={`p-2 px-2 truncate rounded-[33px] border-solid border-[1px] border-primary bg-secondary !text-base-100 font-semibold text-sm flex items-center gap-4 lg:px-4 max-sm:scale-[0.7] min-w-[160px] min-h-[48px]`}
                  >
                      <p className="!text-base-100 inline-block text-sm leading-5 truncate">
                      please wait...
                    </p>
                    <span><Spinner size="loading-sm"/></span>
                    </div>}
          {isConnected && !changingAddress && (
            <DropdownMenus
              btnContent={      
                 <span className="relative">
                  <div
                    className={`p-2 px-2 truncate rounded-[33px] border-solid border-[1px] border-primary bg-primary hover:bg-primary !text-base-100 font-semibold text-sm flex items-center gap-4 lg:px-4 max-sm:scale-[0.7]`}
                  >
                    <p className="!text-base-100 inline-block text-sm leading-5 truncate">
                      {address?.slice(0, 4) +
                        "...." +
                        address?.substring(address.length - 4, address.length)}
                    </p>
                    {!profilePic && (
                      <div className="shrink-0">
                        <img
                          src={userImage}
                          alt="user profile"
                          className="w-[30px] h-[30px] rounded-full object-cover border border-[#fff]"
                        />
                      </div>
                    )}
                    {profilePic && (
                      <div className="shrink-0">
                        <img
                          src={profilePic}
                          alt="user profile"
                          className="w-[30px] h-[30px] rounded-full object-cover border border-[#fff]"
                        />
                      </div>
                    )}
                  </div>
                </span>
              }
              dropdownList={navBarDropDownMenu}
            />
          )}
        </div>
      </div>
    </div>
  );
}
const connectStateToProps = ({ auth }) => {
  return { auth: auth };
};
export default connect(connectStateToProps, (dispatch) => {
  return { dispatch };
})(HeaderNavbar);

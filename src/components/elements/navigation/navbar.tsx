/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import logo from "../../../assets/images/yb-logo.svg";
import { connect, useSelector } from "react-redux";
import WalletConnect from "../../modules/ConnectButton/connect.wallet";
import { useAccount, useDisconnect } from "wagmi";
import { store } from "../../../store";
import {
  setUserID,
  Staker,
  walletAddress,
} from "../../../reducers/rootReducer";
import { getKyc } from "../../../utils/api";
import useContract from "../../../hooks/useContract";
import userImage from "../../../assets/images/avatar.jpg";

import { Modal, modalActions } from "../../../ui/Modal";
import DropdownMenus from "../../../ui/DropdownMenus";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../../ui/Button";
import NaviLink from "../../../ui/NaviLink";

function HeaderNavbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const userProfilePic = useSelector(
    (state: any) => state.auth.user?.profilePicUrl
  );
  const { disconnectAsync } = useDisconnect();
  const { isConnected, address } = useAccount();
  const { isStaker } = useContract();
  const [profilePic, setProfilePic] = useState("");
  useEffect(() => {
    if (address) {
      getCustomerDetails();
      getStakeFlag();
    }
  }, [address]);
  useEffect(() => {
    setProfilePic(userProfilePic);
  }, [userProfilePic]);

  const handleDisconnect = useCallback(async () => {
    await disconnectAsync();
    store.dispatch(setUserID(""));
  }, []);

  const handleDropdownAction = useCallback((path: string) => {
    navigate(path);
  }, []);
  const { navMenuList, navBarDropDownMenu } = useMemo(() => {
    const navMenuList = [
      { path: "/projects", content: "Projects" },
      { path: "/staking", content: "Staking" },
      { path: "/tiers", content: "Tiers" },
      {
        path: "https://ybstreaming.azurewebsites.net/",
        content: "Streaming",
        target: "_blank",
        rel: "noopener noreferrer",
      },
      // { path: "/dao", content: "DAOs" },
      { path: "/marketplace", content: "Marketplace" },
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
      // { name: "Notifications (3)", action: () => handleDropdownAction("#") },
    ];
    return { navMenuList, navBarDropDownMenu };
  }, [pathname]);

  // const RedirectDao = (key: any) => {
  //   const _links = {
  //     dao: process.env.REACT_APP_DAO_APP,
  //     marketplace: process.env.REACT_APP_MARKETPLACE_APP,
  //   };
  //   window.open(_links[key], "_blank");
  // };
  const getCustomerDetails = async () => {
    if (address) {
      try {
        let res = await getKyc(`User/CustomerDetails/${address}`);
        if (res.statusText.toLowerCase() === "ok") {
          setProfilePic(res?.data?.profilePicUrl);
          store.dispatch(setUserID(res.data));
          store.dispatch(walletAddress(address || ""));
        } else {
          console.log(res);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const getStakeFlag = () => {
    isStaker().then((res: any) => {
      store.dispatch(Staker(res));
    });
  };

  return (
    <div className=" sticky top-0 z-50 bg-success-content header-shadow">
      <div className="navbar bg-success-content container mx-auto lg:px-0 px-3">
        <div className="navbar-start">
          <div className="pr-4 border-r border-gray-300 hidden lg:flex shrink-0">
            <NaviLink path={"/dashboard"} type="primary">
              <img src={logo} alt="YellowBlock" className="w-24 mr-3" />
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
                  {navMenuList.map(({ path, content,target,rel }) => {
                    return (
                      <li className="group" key={path}>
                        <NaviLink path={path} type="primary" target={target} rel={rel}>
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
                <img src={logo} alt="YellowBlock" className="w-16 mr-3 " />
              </NaviLink>
            </div>
          </div>

          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal pl-[24px]">
              {navMenuList.map(({ path, content,target,rel }) => {
                return (
                  <li className="group" key={path}>
                    <NaviLink
                      path={path}
                      type="primary"
                      className="mr-[30px] text-secondary cursor-pointer bg-transparent"
                      target={target} rel={rel}
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
          {!isConnected && (
            <>
              <Button
                type="primary"
                handleClick={() => {
                  modalActions("walletConnectModal", "open");
                }}
                btnClassName="flex items-center"
              >
                <>
                  <span>Connect Wallet</span>
                  <span className={`icon wallet mt-[-3px]`}></span>
                </>
              </Button>
              {
                <Modal id={"walletConnectModal"}>
                  <WalletConnect
                    onWalletConect={() => getCustomerDetails()}
                    onWalletClose={() => {
                      modalActions("walletConnectModal", "close");
                    }}
                  />
                </Modal>
              }
            </>
          )}
          {isConnected && (
            <DropdownMenus
              btnContent={
                <span className="relative">
                  <div
                    className={`p-2 px-2 rounded-[33px] border-solid border-[1px] border-primary bg-primary hover:bg-primary !text-base-100 font-semibold text-sm flex items-center gap-4 lg:px-4 max-sm:scale-[0.7]`}
                  >
                    <span className="!text-base-100 inline-block text-sm leading-5">
                      {address?.slice(0, 4) +
                        "...." +
                        address?.substring(address.length - 4, address.length)}
                    </span>
                    {!profilePic && (
                      <span>
                        <img
                          src={userImage}
                          alt="user profile"
                          className="w-[30px] h-[30px] rounded-full object-cover border border-[#fff]"
                        />
                      </span>
                    )}
                    {profilePic && (
                      <span>
                        <img
                          src={profilePic}
                          alt="user profile"
                          className="w-[30px] h-[30px] rounded-full object-cover border border-[#fff]"
                        />
                      </span>
                    )}
                  </div>
                  {/* <span className='inline-block w-6 h-6 bg-black border rounded-full absolute text-base-100 flex justify-center items-center right-[-4px] top-[-10px]'>3</span> */}
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

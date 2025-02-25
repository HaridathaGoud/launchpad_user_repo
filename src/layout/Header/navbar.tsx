/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useMemo, useState } from "react";
import logo from "../../assets/images/yb-logo-white.svg";
import { connect, useSelector } from "react-redux";
import { useAccount } from "wagmi";
import userImage from "../../assets/images/avatar.jpg";
import DropdownMenus from "../../ui/DropdownMenus";
import { useLocation, useNavigate } from "react-router-dom";
import NaviLink from "../../ui/NaviLink";
import ConnectWallet from "../../ui/connectButton";
import Spinner from "../../components/loaders/spinner";
import {
  getNavBarDropdown,
  getNavMenu,
} from "./utils";
import useArcanaAuth from "../../hooks/useArcanaAuth";
import Sidebar from "./sidebar";
function Navbar({ handleDisconnect }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const user= useSelector((state: any) => state.auth.user);
  const gettingUserData= useSelector((state: any) => state.auth.gettingUserData);
  const isLoggedIn=useSelector((state:any)=>state.auth.arcanaUser?.isLoggedIn)
  const { isConnected, address, isConnecting, isReconnecting } = useAccount();
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked((prev) => !prev);
  };

  const handleCancel = () => {
    setIsChecked(false);
  };
  const auth = useArcanaAuth();
  const handleDropdownAction = useCallback(
    (action: string) => {
      switch (action) {
        case "profile":
          navigate(`/profile/${address}`);
          return;
        case "wallet":
          // modalActions('arcana-custom-wallet','open')
          if (isLoggedIn) {
            auth?.showWallet();
          }
          return;
        case "disconnect":
          handleDisconnect();
          return;
        case "mycollections":
          navigate(`/marketplace/mycollections`);
          return;
        default:
          return;
      }
    },
    [pathname, isLoggedIn,address,user?.id]
  );
  const { navMenuList, navBarDropDownMenu } = useMemo(() => {
    return {
      navMenuList: getNavMenu(navigate, pathname, user?.id),
      navBarDropDownMenu: getNavBarDropdown(
        handleDropdownAction,
        pathname,
        isLoggedIn
      )
    };
  }, [address,user?.id, pathname, isLoggedIn]);

  return (
    <div
      id="header"
      className="sticky top-0 z-[99] bg-success-content header-shadow"
    >
      <div className="navbar bg-success-content container mx-auto lg:px-0 px-3">
        <div className="navbar-start">
          <div className="pr-4 hidden lg:flex shrink-0">
            <NaviLink path={"/dashboard"} type="primary">
              <img src={logo} alt="YellowBlock" className="w-[28px]" />
            </NaviLink>
          </div>
          <div className="flex items-center">
            <div className="w-[26px] lg:hidden mr-2 mobile-icon-style">
              <svg
                onClick={handleToggle}
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
              {isChecked && (
                <Sidebar
                  list={navMenuList}
                  isChecked={isChecked}
                  closeDrawer={handleCancel}
                />
              )}
            </div>
            <div className="pr-4 lg:hidden">
              <NaviLink path={"/dashboard"} type="primary">
                <img src={logo} alt="YellowBlock" className="w-[22px] mr-3 " />
              </NaviLink>
            </div>
          </div>

          <div className="navbar-center hidden lg:flex ">
            <ul className="menu menu-horizontal pl-[24px] border-l border-gray-300 items-center gap-8">
              {navMenuList.map(({ name, type, path, menu }) => {
                return (
                  <li className="group !hover:bg-transparent" key={name}>
                    {type === "dropdown" && (
                      <DropdownMenus
                        btnContent={
                          <span className="!hover:bg-transparent">
                            <NaviLink
                              path={path}
                              type="primary"
                              className="text-secondary cursor-pointer bg-transparent"
                            >
                              {name}<span className="icon arrow-icon"></span>
                            </NaviLink>
                          </span>
                        }
                        dropdownClass="md:dropdown-end dropdown-hover"
                        dropdownList={menu}
                        addToMenuClass="!min-w-[254px] grid grid-cols-2 global-list mt-5"
                        addToMenuBtnClass="text-center"
                        menuItemClass="border border-t-0"
                        isHover={true}
                      />
                    )}
                    {type === "link" && path && (
                      <NaviLink
                        path={path}
                        type="primary"
                        className="text-secondary cursor-pointer bg-transparent"
                      >
                        {name}
                      </NaviLink>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="navbar-end">
          {!isConnected &&
            !isReconnecting &&
            !isConnecting &&
            !gettingUserData && <ConnectWallet />}
          {(isReconnecting || isConnecting || gettingUserData) && (
            <div
              className={`bg-transparent p-2 px-2 truncate rounded-[12px] border-solid border-[1px] border-secondary bg-secondary !text-base-100 font-semibold text-sm flex items-center gap-4 lg:px-4 max-sm:scale-[0.7] min-w-[160px] min-h-[48px]`}
            >
              <p className="!text-primary inline-block text-sm leading-5 truncate dark-textwhite">
                Please wait...
              </p>
              <span>
                <Spinner size="loading-sm" />
              </span>
            </div>
          )}
          {!isReconnecting &&
            !isConnecting &&
            !gettingUserData &&
            isConnected && (
              <DropdownMenus
                btnContent={
                  <span className="relative">
                    <div
                      className={`p-2 px-2 truncate rounded-[12px] border-solid border-[1px] border-primary bg-primary hover:bg-primary !text-base-100 font-semibold text-sm flex items-center gap-4 lg:px-4 max-sm:scale-[0.7]`}
                    >
                      <p className="!text-base-100 inline-block text-sm leading-5 truncate dark-textwhite">
                        {address?.slice(0, 4) +
                          "...." +
                          address?.substring(
                            address.length - 4,
                            address.length
                          )}
                      </p>
                      {(!user || !user?.profilePicUrl) && (
                        <div className="shrink-0">
                          <img
                            src={userImage}
                            alt="user profile"
                            className="w-[30px] h-[30px] rounded-full object-cover border border-[#fff]"
                          />
                        </div>
                      )}
                      {user?.profilePicUrl && (
                        <div className="shrink-0">
                          <img
                            src={user?.profilePicUrl}
                            alt="user profile"
                            className="w-[30px] h-[30px] rounded-full object-cover border border-[#fff]"
                          />
                        </div>
                      )}
                    </div>
                  </span>
                }
                dropdownList={navBarDropDownMenu}
                addToMenuClass="mt-2"
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
})(Navbar);

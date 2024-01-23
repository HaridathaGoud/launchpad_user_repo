import React, { useEffect, useState } from "react";
import logo from "../../../../assets/images/logo.svg";
import { Image } from "react-bootstrap";
import { connect } from "react-redux";
import WalletConnect from "../../../modules/ConnectButton/connect.wallet";
import { useAccount, useDisconnect } from "wagmi";
import { store } from "../../../../store";
import {
  setUserID,
  Staker,
  walletAddress,
} from "../../../../reducers/rootReducer";
import { getKyc } from "../../../../utils/api";
import useContract from "../../../../hooks/useContract";
import userImage from "../../../../assets/images/avatar.jpg";
import PrimaryLink from "../../../../ui/Links/PrimaryLink";
import useOutsideClick from "../../../../hooks/useOutsideClick";
import { Outlet } from "react-router-dom";
import Button from "../../../../ui/Button";
import SearchInputComponent from "../../SearchComponent";

function HeaderNavbar() {
  const [modalShow, setModalShow] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { disconnectAsync } = useDisconnect();
  const { isConnected, address } = useAccount();
  const { isStaker } = useContract();
  const {ref:dropdownRef}=useOutsideClick(()=>setShowDropdown(false),false)
  const [sidebarWidth, setSidebarWidth] = useState<string>('0');
  const [mainMarginLeft, setMainMarginLeft] = useState<string>('0');
  // const RedirectDao = (key: any) => {
  //   const _links = {
  //     dao: process.env.REACT_APP_DAO_APP,
  //     marketplace: process.env.REACT_APP_MARKETPLACE_APP,
  //   };
  //   window.open(_links[key], "_blank");
  // };
  const getCustomerDetails = async () => {
    let res = await getKyc(`User/CustomerDetails/${address}`);
    store.dispatch(setUserID(res.data));
    store.dispatch(walletAddress(address));
  };

  const handleDisconnect = async () => {
    await disconnectAsync();
    store.dispatch(setUserID(null));
    setModalShow(false);
  };

  const handleDropdownAction=(navigate, path)=>{
    navigate(path);
    setShowDropdown(false);
  }
  useEffect(() => {
    getStakeFlag();
    if (address) {
      getCustomerDetails();
    }
  }, [address]);

  const getStakeFlag = () => {
    isStaker().then((res: any) => {
      store.dispatch(Staker(res));
    });
  };
  const navMenuList=[
    {path:'/projects',content:'Projects'},
    {path:'/staking',content:'Staking'},
    {path:'/tiers',content:'Tiers'},
    {path:'/minting',content:'Minting'},
    {path:'/dao',content:'DAOs'},
  ]
 

  const openNav = () => {
    setSidebarWidth('250px');
    setMainMarginLeft('264px');
  };

  const closeNav = () => {
    setSidebarWidth('0');
    setMainMarginLeft('0');
  };
  return (
    <>
     <div>
      

      <div>
        
        <div className=" sticky top-0 z-50 bg-success-content">
        <div className="navbar bg-success-content p-0 header-shadow px-4">
          <div className="navbar-start">
          <span className="icon toggle-icon cursor-pointer bg-inherit rounded-none border-0" onClick={openNav} />
         
             <div className="pr-4  hidden lg:flex"> {/*border-r border-gray-300 */}
              <PrimaryLink path={"/dashboard"}>
                <Image src={logo} className="h-8 mr-3 w-[93px]" />
              </PrimaryLink>
            </div>
            <div className="flex items-center">
              <div className="dropdown">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost lg:hidden"
                >
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
                </div>

                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                >
                  {navMenuList.map(({path,content},index)=>{
                  return <li className="group" key={index}>
                    <PrimaryLink path={path}>{content}</PrimaryLink>
                  </li>
                })}
                </ul>
              </div>
              <div className="pr-4 lg:hidden">
                <PrimaryLink path={"/dashboard"}>
                  <Image src={logo} className="h-8 mr-3 w-[60px]" />
                </PrimaryLink>
              </div>
            </div>
          </div>
            <div className="hidden md:block">
            <SearchInputComponent/>
            </div>
          <div className="navbar-end gap-10">
          <details className="dropdown dropdown-end">
                  <summary className="btn p-0 bg-inherit border-0 hover:bg-transparent shadow-none">
                    <span className='icon menu-icon'>
                     
                    </span>
                  </summary>
                  <ul className="p-0 shadow menu dropdown-content z-[1] bg-base-100 rounded-box py-4 w-[180px]">
                    <li ><a className='py-2 font-semibold px-4 text-base  hover:text-primary hover:bg-[#FFE9E9] active:text-primary !active:bg-transparent flex items-center gap-2 rounded-none' ><span className="icon streaming" /><span>Streming</span></a></li>
                    <li> <a className='py-2 font-semibold px-4 text-base  hover:text-primary hover:bg-[#FFE9E9] active:text-primary !active:bg-transparent flex items-center gap-2 rounded-none' ><span className="icon launchpad" /><span>Launchpad</span></a></li>
                    <li> <a className='py-2 font-semibold px-4 text-base  hover:text-primary hover:bg-[#FFE9E9] active:text-primary !active:bg-transparent flex items-center gap-2 rounded-none' ><span className="icon marketplace" /><span>Marketplace</span></a></li>
                    <li> <a className='py-2 font-semibold px-4 text-base  hover:text-primary hover:bg-[#FFE9E9] active:text-primary !active:bg-transparent flex items-center gap-2 rounded-none' ><span className="icon daos" /><span>DAO’s</span></a></li>
                  </ul>
                </details>
            <div className="flex flex-col md:order-2" ref={dropdownRef}>
               {!isConnected && <Button type="primary"
                  // handleClick={
                  //   !isConnected
                  //     ? () => setModalShow(true)
                  //     : () => setShowDropdown(state=>!state)
                  // }
                  handleClick={() => setModalShow(true)}
                >
                    <>
                      <span className={`icon wallet mr-1`}></span>
                      <span>Connect Wallet</span>
                    </>
                </Button>}
                {isConnected && <details className="dropdown">
                      <summary className="btn p-0 bg-inherit border-0 hover:bg-transparent">
                        <span className='relative'>
                          <div className={`p-2 px-2 rounded-[33px] border-solid border-[1px] border-primary bg-primary hover:bg-primary !text-base-100 font-semibold text-sm flex items-center gap-4 ps-3`}><span>{address?.slice(0, 4) + '....' + address?.substring(address.length - 4, address.length)}</span>
                            <span><img src={userImage} className="w-[30px] h-[30px] rounded-full object-cover" /></span>
                          </div>
                          <span className='inline-block w-6 h-6 bg-black border rounded-full absolute text-base-100 flex justify-center items-center right-[-4px] top-[-10px]'>3</span>
                        </span>
                      </summary>
                      <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-[146px]">
                        <li ><a className='block py-2 font-semibold px-4 text-base  hover:text-primary hover:bg-transparent active:text-primary !active:bg-transparent' onClick={handleDisconnect}>Disconnect</a></li>
                        <li> <a className='block py-2 font-semibold px-4 text-base  hover:text-primary hover:bg-transparent active:text-primary !active:bg-transparent' onClick={(e) => handleLinkClick(e, '/profile')}>Profile</a></li>
                      </ul>
                    </details>}
              {/* {showDropdown && (
                <div className="dropdown">
                  <ul className="">
                    <li>
                      <Button type="nav" path={"/dashboard"} action={(navigate,path)=>{
                        handleDisconnect();
                        handleDropdownAction(navigate,path);
                      }}>
                        Disconnect
                      </Button>
                    </li>
                    <li>
                      <Button type="nav" path={"/profile"} action={handleDropdownAction}>Profile</Button>
                    </li>
                    <li>
                      <Button  type="nav" path={"#"} action={handleDropdownAction}>Notifications</Button>
                    </li>
                  </ul>
                </div>
              )} */}
                 
            </div>
          </div>

          {modalShow && (
            <div id="my_modal_1">
              <div className="modal-box rounded-[15px] lg:max-w-[750px] bg-primary-content">
                <WalletConnect
                  onWalletConect={(addr) => getCustomerDetails(addr)}
                  onWalletClose={() => setModalShow(false)}
                />
              </div>
            </div>
          )}
        </div>
        </div>
        <div>
        <div id="mySidebar" className="sidebar" style={{ width: sidebarWidth }}>
       <div className="text-right">
       <a href="javascript:void(0)" className="closebtn text-3xl" onClick={closeNav}>
          ×
        </a>
       </div>
       <ul className="px-4">
        <li className="mb-2 px-2.5 py-2 rounded-[30px] hover:bg-[#F0F0F0] cursor-pointer text-base text-secondary"><span className="icon home mr-[18px]"></span>Home</li>
        <li className="mb-2 px-2.5 py-2 rounded-[30px] hover:bg-[#F0F0F0] cursor-pointer text-base"><span className="icon trending mr-[18px]"></span>Trending</li>
        <li className="mb-2 px-2.5 py-2 rounded-[30px] hover:bg-[#F0F0F0] cursor-pointer text-base"><span className="icon channels mr-[18px]"></span>Channels</li>
        <li className="mb-2 px-2.5 py-2 rounded-[30px] hover:bg-[#F0F0F0] cursor-pointer text-base"><span className="icon movies mr-[18px]"></span>Movies</li>        
        <li className="px-2.5 py-2 rounded-[30px] hover:bg-[#F0F0F0] cursor-pointer text-base"><span className="icon web-series mr-[18px]"></span>Web Series</li>
       </ul>
       <hr className="mt-2 mb-6" />
       <ul className="px-4">
        <li className="text-base mb-2.5">Explore</li>
        <li className="mb-3.5 px-2.5 py-2 rounded-[30px] hover:bg-primary hover:text-base-100 cursor-pointer text-base">All </li>
        <li className="mb-3.5 px-2.5 py-2 rounded-[30px] hover:bg-primary hover:text-base-100 cursor-pointer text-base">Movies </li>
        <li className="mb-3.5 px-2.5 py-2 rounded-[30px] hover:bg-primary hover:text-base-100 cursor-pointer text-base">Series </li>
        <li className="mb-3.5 px-2.5 py-2 rounded-[30px] hover:bg-primary hover:text-base-100 cursor-pointer text-base">Songs </li>
        <li className="mb-3.5 px-2.5 py-2 rounded-[30px] hover:bg-primary hover:text-base-100 cursor-pointer text-base">Sports </li>
        <li className="mb-3.5 px-2.5 py-2 rounded-[30px] hover:bg-primary hover:text-base-100 cursor-pointer text-base">Telugu </li>
        <li className="mb-3.5 px-2.5 py-2 rounded-[30px] hover:bg-primary hover:text-base-100 cursor-pointer text-base">Malayalam </li>
        <li className="mb-3.5 px-2.5 py-2 rounded-[30px] hover:bg-primary hover:text-base-100 cursor-pointer text-base">Kids </li>
        <li className="mb-3.5 px-2.5 py-2 rounded-[30px] hover:bg-primary hover:text-base-100 cursor-pointer text-base">Fun </li>
       </ul>
      </div>
      <div id="main" className="" style={{ marginLeft: mainMarginLeft }}>
        <Outlet />
        </div></div>
      </div>
    </div>
     
    </>
  );
}
const connectStateToProps = ({ auth }) => {
  return { auth: auth };
};
export default connect(connectStateToProps, (dispatch) => {
  return { dispatch };
})(HeaderNavbar);

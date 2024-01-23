import React,{useState} from "react";
import trailer from "../../../assets/video/salaartrailer.mp4";
import logo from "../../../assets/images/animal-banner.png";
import Button from "../../../ui/Button";
import CastAndCrewMember from "../../projects/castandcrewmember";
import NftProducers from "./NftProducers";
import success from "../../../assets/images/success.png";
import successgif from  '../../../assets/images/reviewsuccess.gif'
import { Link } from "react-router-dom";

interface GenresCardSliderInterface {
    handleClick?: Function;
    btnClassName?: string;
    children?: any;
    type?: string;
}

const DetailviewLeftpanel = ({ handleClick, children, type }: GenresCardSliderInterface) => {
    const [showConfirmation,setshowConfirmation]=useState(false);
    const [hideMetamask,sethideMetamask]=useState(true);
    const handleMetamaskClick =()=>{
        setshowConfirmation(true);
    } 
    const hideMetamaskClick =()=>{
        sethideMetamask(false);
    } 

    return (
        <>
          <div className=" rounded-lg header-shadow relative shadow-md h-full">
          <div className="relative">
          <video controls className="rounded-t-lg h-[546px] w-full object-cover" muted>
                <source src={trailer} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            
            {hideMetamask && <div className="h-full absolute pt-12 md:pt-24 top-0 bg-[#00000040] w-full text-center max-sm:px-4">
                
            {showConfirmation ? (<div className="relative">
               <div>
               <img src={success} alt="success" className="mx-auto" />
               <h1 className="text-error-content text-[42px] font-semibold">Confirmation</h1>
               <img src={successgif} alt="" className='h-[280px] m-[-180px] mx-auto' />
               <p className="text-error-content mt-20 mb-6">Connect with one of available wallet providers or create a <br /> new wallet.What is wallet?</p>              
               <Button type="primary" btnClassName="h-[52px]" handleClick={hideMetamaskClick}>Confirm to paly with 2 Matic</Button>
               </div>               
               </div>):(
                <div>
                <div className="text-right pr-4 absolute top-6 right-2">
                <Link to='/streamingdashboard'><span className="icon close-red cursor-pointer scale-[1.3]"></span></Link>
                </div>
                <h1 className="text-error-content text-[42px] font-semibold">Connect Your Wallet</h1>
                <p className="text-error-content mt-3 mb-6">Connect with one of available wallet providers or create a <br /> new wallet.What is wallet?</p>
                <div className="bg-primary text-error-content py-2.5 px-6 w-[232px] min-h-[56px] flex items-center gap-3.5 mx-auto rounded-[42px] cursor-pointer hover:opacity-80" onClick={handleMetamaskClick}>
                    <span className="icon Metamask"></span><span>Metamask Wallet</span>
                </div>
                <div className="bg-primary text-error-content py-2.5 px-6 w-[232px] min-h-[56px] flex items-center gap-3.5 mx-auto mt-4 rounded-[42px] cursor-pointer hover:opacity-80">
                    <span className="icon WalletConnect"></span><span>WalletConnect</span>
                </div>
                <p className="mt-8 text-white opacity-80">we do not own private keys and cannot access your <br /> funds without your confirmation</p>
                </div>
               )
               
            }
            </div>}            
          </div>
            <div className="px-3 py-4 flex justify-between items-center">
                <div  className="flex gap-2">
                    <img className="h-[40px] w-[40px] rounded-full object-cover" src={logo} alt="" />
                <div className="flex-1">
                    <p className="text-neutral text-sm font-normal">UV Creations</p>
                    <p className="text-base text-secondary font-medium">Adipurush Final Trailer - Telugu</p>
                    
                </div>
                </div>
                <div className="">
                    <Button children="Subscribe" type="cardButton" btnClassName="!h-[32px]" />
                    </div>
            </div>

            <div className="flex justify-end gap-2.5 px-3">
                <button className="bg-accent px-4 py-2 rounded-[20px] text-sm font-medium whitespace-nowrap"> <span className="icon like-icon mr-2"></span>Like <span className="text-xs">(23)</span></button>
                <button className="bg-accent px-4 py-2 rounded-[20px] text-sm font-medium whitespace-nowrap"> <span className="icon unlike-icon mr-2"></span>Unlike</button>
                <button className="bg-accent px-4 py-2 rounded-[20px] text-sm font-medium whitespace-nowrap"> <span className="icon share mr-2"></span>Share</button>
              
            </div>
            <hr className="mt-4 mb-[18px]" />
           <div className="px-3">
           <h1 className="text-lg font-semibold text-secondary mb-2">NFT Producers</h1>
           <NftProducers/>
           </div>
           <hr className="mt-4 mb-2" />
          <div className="px-3 pb-3">
          <h1 className="text-lg font-semibold text-secondary">About the movie</h1>
           <p className="text-base-200">Adipurush is an adaptation of Indian mythology that depicts the victory of good over evil.</p>
           <a href="#" className="text-primary font-semibold">...more</a>
          </div>
          </div>
        </>
    );
};

export default DetailviewLeftpanel;
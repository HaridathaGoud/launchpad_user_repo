import React from "react";
import trailer from "../../../assets/video/Adipurush.mp4";
import logo from "../../../assets/images/animal-banner.png";
import Button from "../../../ui/Button";


interface MoviesCardInterface {
    handleClick?: Function;
    btnClassName?: string;
    children?: any;
    type?: string;
    badge?:boolean;
    matic?:boolean;
}

const MoviesCard = ({ handleClick, children, type, badge=false, matic=false }: MoviesCardInterface) => {
    return (
        <>
        
          <div className=" rounded-lg border header-shadow relative">
          <video controls className="rounded-t-lg h-[213px] w-full object-cover" muted>
                <source src={trailer} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="px-3 py-4">
                <div  className="flex gap-2">
                    <img className="h-[40px] w-[40px] rounded-full object-cover" src={logo} alt="" />
                <div className="flex-1">
                    <p className="text-neutral text-sm font-normal">UV Creations</p>
                    <p className="text-base text-secondary font-medium">Adipurush Final Trailer - Telugu</p>
                    <div className="md:flex gap-3 items-center justify-between">
                <div className="flex gap-3 items-center">
                <div className="flex gap-1">
                    <span className="icon eye-view"></span><label className="text-neutral text-sm font-normal">19 hours ago</label>
                </div>
                <div className="flex gap-1">
                    <span className="icon clock"></span><label className="text-neutral text-sm font-normal">33K views</label>
                </div>
                </div>
                <div className="max-sm:text-right">
                    <Button children="Buy NFT" type="cardButton" btnClassName="px-4 h-[28px] hover:opacity-60" />
                    </div>
                </div>
                </div>
                </div>
               
            </div>
           {badge && <div className={` bg-[#008000] px-[14px] py-1 rounded-ss-lg rounded-ee-lg w-fit absolute left-0 top-0`}>
                        <p className="text-[10px] text-base-100 font-semibold">Free Movie</p>
                    </div>}
                    {matic && <div className={` bg-[#D600004D] px-[14px] py-1 rounded-ss-lg rounded-ee-lg w-fit absolute left-0 top-0`}>
                        <p className="text-[10px] text-base-100 font-semibold">2Matic / $1.32</p>
                    </div>}
          </div>
          </>
    );
};

export default MoviesCard;
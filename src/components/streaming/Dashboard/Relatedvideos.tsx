import React from "react";
import trailer from "../../../assets/video/Adipurush.mp4";
import logo from "../../../assets/images/animal-banner.png";

const RelatedVideos = () => {
   

    return (<>
        <div className="mb-4 flex items-center justify-between mt-[34px]">
            <h3 className="text-xl font-medium textw-[390px]-secondary">Related Videos</h3>
            <div className="flex ">
                <div className="hover:bg-accent hover:rounded-full h-9 w-9 flex items-center justify-center cursor-pointer"><span className="icon leftarrow-small"></span></div>
                <div className="hover:bg-accent hover:rounded-full h-9 w-9 flex items-center justify-center cursor-pointer"><span className="icon rightarrow-small"></span></div>
            </div>
        </div>

        <div className="carousel gap-4 overflow-y-hidden max-sm:w-full">
           <div className="carousel-item shadow-lg">
           <div className=" rounded-lg border header-shadow relative ">
                <video controls className="rounded-t-lg h-[146px] w-full object-cover" muted>
                    <source src={trailer} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="px-3 py-4">
                    <div className="flex gap-2">
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           </div>

           <div className="carousel-item">
           <div className=" rounded-lg border header-shadow relative ">
                <video controls className="rounded-t-lg h-[146px] w-full object-cover" muted>
                    <source src={trailer} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="px-3 py-4">
                    <div className="flex gap-2">
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           </div>
        </div>
    </>
       
    );
};

export default RelatedVideos;

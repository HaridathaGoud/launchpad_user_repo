import React from "react";
import trailer from "../../../assets/video/Adipurush.mp4";
import logo from "../../../assets/images/animal-banner.png";
import MoviesCard from "../Dashboard/MoviesCard";
import { Link } from "react-router-dom";

const MovieVideos = () => {
   

    return (<>
        <div className="mb-4 flex items-center justify-between mt-[34px]">
            <h3 className="text-xl font-medium textw-[390px]-secondary">Primetime movies for you</h3>
            <div className="flex ">
                <div className="hover:bg-accent hover:rounded-full h-9 w-9 flex items-center justify-center cursor-pointer"><span className="icon leftarrow-small"></span></div>
                <div className="hover:bg-accent hover:rounded-full h-9 w-9 flex items-center justify-center cursor-pointer"><span className="icon rightarrow-small"></span></div>
            </div>
        </div>

        <div className="carousel gap-4 overflow-y-hidden max-sm:w-full">
           <div className="carousel-item shadow-lg"><Link to='/streamingdetailview'><MoviesCard/></Link></div>
           <div className="carousel-item"> <Link to='/streamingdetailview'><MoviesCard/></Link></div>
           <div className="carousel-item"> <Link to='/streamingdetailview'><MoviesCard/></Link></div>
           <div className="carousel-item"> <Link to='/streamingdetailview'><MoviesCard/></Link></div>
           <div className="carousel-item"> <Link to='/streamingdetailview'><MoviesCard/></Link></div>
        </div>
    </>
       
    );
};

export default MovieVideos;

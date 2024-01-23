import React from "react";
import Button from "../../../ui/Button";

interface WebSeriesCardInterface {
    handleClick?: Function;
    btnClassName?: string;
    children?: any;
    type?: string;
    carouselItems: Array<{
        image: string;
        title: string;
        rating: number;
        genre: string;
        ageRating: string;
        language: string;
        duration: string;
    }>;
}

const WebSeriesCard = ({ handleClick, children, type, carouselItems }: WebSeriesCardInterface) => {
    return (
        <>
            
            <div className="carousel gap-4 overflow-y-hidden">
                {carouselItems.map((item, index) => (
                    <div key={index} className="rounded-[10px] carousel-item relative">
                        <img className="w-[390px] h-[315px] rounded-[10px] object-cover" src={item.image} alt={item.title} />
                        <div className="black-gradient px-5 pb-7 rounded-b-[10px] absolute bottom-0 w-full h-[228px] flex items-end">
                            <div className="flex-1">
                                <div className="flex items-baseline justify-between mb-2">
                                    <p className="text-base text-base-100 font-bold">{item.title}</p>
                                    <div className="bg-base-100 py-1 px-[10px] rounded-[5px] ">
                                        <p className="text-sm font-semibold text-secondary mb-0">{item.rating}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-normal text-base-100">{item.genre}</p>
                                    <p className="text-sm font-normal text-base-100">{item.ageRating}</p>
                                    <p className="text-sm font-normal text-base-100">{item.language}</p>
                                    <p className="text-sm font-normal text-base-100">{item.duration}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default WebSeriesCard;

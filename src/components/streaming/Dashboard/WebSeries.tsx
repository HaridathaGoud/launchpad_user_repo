import React from "react";
import WebSeriesCard from "./WebSeriesCard";

const WebSeriesComponent = () => {
    const carouselItems = [
        {
            image: "https://upload.wikimedia.org/wikipedia/en/7/78/Stranger_Things_season_4.jpg",
            title: "Web Series Title 1",
            rating: 8.5,
            genre: "Action & Drama",
            ageRating: "U/A",
            language: "English",
            duration: "2Hr 19Min",
        },
        {
            image: "https://c.ndtvimg.com/2023-03/i7lef4qg_taj_625x300_04_March_23.jpg?im=Resize=(1230,900)",
            title: "Taj: Divided By Blood",
            rating: 9.1,
            genre: "Love & Drama",
            ageRating: "U/A",
            language: "Hindi",
            duration: "2Hr 19Min",
        },
        {
            image: "https://m.media-amazon.com/images/M/MV5BMDU4MWViOGItZGJjYi00YjczLTk1YmMtY2ZmNmY4YTllNDA0XkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_.jpg",
            title: "Jupiter’s Lehacy",
            rating: 8.5,
            genre: "Action & Drama",
            ageRating: "U/A",
            language: "English",
            duration: "2Hr 19Min",
        },
        {
            image: "https://www.hindustantimes.com/ht-img/img/2023/08/19/1600x900/loki-mandalorian-yellowjackets-tv-shows-of-2023_1692458449662_1692458462935.webp",
            title: "Web Series Title 1",
            rating: 8.5,
            genre: "Action & Drama",
            ageRating: "U/A",
            language: "English",
            duration: "2Hr 19Min",
        },
        {
            image: "https://assets.gadgets360cdn.com/pricee/assets/product/202208/family-drama_1660626989.jpg",
            title: "Web Series Title 1",
            rating: 8.5,
            genre: "Action & Drama",
            ageRating: "U/A",
            language: "English",
            duration: "2Hr 19Min",
        },
        {
            image: "https://filmfare.wwmindia.com/content/2022/nov/topcomedyfilms21667974671.jpg",
            title: "Web Series Title 1",
            rating: 8.5,
            genre: "Action & Drama",
            ageRating: "U/A",
            language: "English",
            duration: "2Hr 19Min",
        },
    ];

    return (<>
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-medium textw-[390px]-secondary">Your Free Web series Episodes</h3>
                <div className="flex ">
                    <div className="hover:bg-accent hover:rounded-full h-9 w-9 flex items-center justify-center cursor-pointer"><span className="icon leftarrow-small"></span></div>
                    <div className="hover:bg-accent hover:rounded-full h-9 w-9 flex items-center justify-center cursor-pointer"><span className="icon rightarrow-small"></span></div>
                </div>
            </div>
            <WebSeriesCard carouselItems={carouselItems} />
    </>
       
    );
};

export default WebSeriesComponent;

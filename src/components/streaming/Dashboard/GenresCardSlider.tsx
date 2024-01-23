import React from "react";
import trailer from "../../../assets/video/Adipurush.mp4";
import logo from "../../../assets/images/animal-banner.png";
import Button from "../../../ui/Button";


interface GenresCardSliderInterface {
    handleClick?: Function;
    btnClassName?: string;
    children?: any;
    type?: string;
}

const GenresCardSlider = ({ handleClick, children, type }: GenresCardSliderInterface) => {
    return (
        <div className="">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-medium text-secondary">Genres</h3>
                <div className="flex">
                <div className="hover:bg-accent hover:rounded-full h-9 w-9 flex items-center justify-center cursor-pointer"><span className="icon leftarrow-small"></span></div>
                <div className="hover:bg-accent hover:rounded-full h-9 w-9 flex items-center justify-center cursor-pointer"><span className="icon rightarrow-small"></span></div>
                </div>
            </div>
            <div className="carousel gap-4 overflow-y-hidden max-sm:w-full">
                <div className="rounded-lg carousel-item">
                    <div>
                        <img className="w-[250px] h-[250px] rounded-lg object-cover" src="https://cdn.firstcry.com/education/2022/09/14183308/A-Special-Friendship-Story-With-Moral-for-Kids.jpg" alt="Kids Special" />
                        <div className="pt-3">
                            <p className="text-base text-secondary font-medium">Kids Special</p>
                        </div>
                    </div>
                </div>
                <div className="rounded-lg carousel-item">
                    <div>
                        <img className="w-[250px] h-[250px] rounded-lg object-cover" src="https://stat4.bollywoodhungama.in/wp-content/uploads/2017/11/Jumanji-Welcome-to-The-Jungle-English-01-306x393.jpg" alt="English Action" />
                        <div className="pt-3">
                            <p className="text-base text-secondary font-medium">English Action</p>
                        </div>
                    </div>
                </div>
                <div className="rounded-lg carousel-item">
                    <div>
                        <img className="w-[250px] h-[250px] rounded-lg object-cover" src="https://media.assettype.com/tnm%2Fimport%2Fsites%2Fdefault%2Ffiles%2FHit-Evaru.jpg?auto=format%2Ccompress&fit=max&w=1200" alt="Telugu Thriller" />
                        <div className="pt-3">
                            <p className="text-base text-secondary font-medium">Telugu Thriller</p>
                        </div>
                    </div>
                </div>
                <div className="rounded-lg carousel-item">
                    <div>
                        <img className="w-[250px] h-[250px] rounded-lg object-cover" src="https://assets.gadgets360cdn.com/pricee/assets/product/202208/family-drama_1660626989.jpg" alt="Family Drama" />
                        <div className="pt-3">
                            <p className="text-base text-secondary font-medium">Family Drama</p>
                        </div>
                    </div>
                </div>
                <div className="rounded-lg carousel-item">
                    <div>
                        <img className="w-[250px] h-[250px] rounded-lg object-cover" src="https://filmfare.wwmindia.com/content/2022/nov/topcomedyfilms21667974671.jpg" alt="Hindi Comedy" />
                        <div className="pt-3">
                            <p className="text-base text-secondary font-medium">Hindi Comedy</p>
                        </div>
                    </div>
                </div>
                <div className="rounded-lg carousel-item">
                    <div>
                        <img className="w-[250px] h-[250px] rounded-lg object-cover" src="https://assets.gadgets360cdn.com/pricee/assets/product/202208/family-drama_1660626989.jpg" alt="Family Drama" />
                        <div className="pt-3">
                            <p className="text-base text-secondary font-medium">Family Drama</p>
                        </div>
                    </div>
                </div>
                <div className="rounded-lg carousel-item">
                    <div>
                        <img className="w-[250px] h-[250px] rounded-lg object-cover" src="https://filmfare.wwmindia.com/content/2022/nov/topcomedyfilms21667974671.jpg" alt="Hindi Comedy" />
                        <div className="pt-3">
                            <p className="text-base text-secondary font-medium">Hindi Comedy</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GenresCardSlider;
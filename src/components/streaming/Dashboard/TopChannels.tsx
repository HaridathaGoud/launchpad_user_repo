import React from "react";
import trailer from "../../../assets/video/Adipurush.mp4";
import logo from "../../../assets/images/animal-banner.png";
import Button from "../../../ui/Button";
import { Link } from "react-router-dom";
import TopChannelShimmer from "../Loaders/Topchannelshimmer";



interface MoviesCardInterface {
    handleClick?: Function;
    btnClassName?: string;
    children?: any;
    type?: string;
}

const TopChannels = ({ handleClick, children, type }: MoviesCardInterface) => {
    return (
        <>
          <h1 className=" text-lg font-semibold text-secondary mb-7">Top Channels</h1>
          <div className="flex justify-between overflow-x-auto no-scrollbar gap-[50px] pb-3">
          <div className="flex justify-center">
            <div className="text-center">
              <Link to='/channelview'>
            <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpuiTPQhJIciOzncYy6fSWx74TEqyYqA7lJrgHPpXeQw&s'} className="w-[150px] h-[150px] rounded-full object-cover mx-auto" alt="" /></Link>
            <Link to='/channelview'><h2 className=" text-lg font-semibold text-secondary mt-4 leading-4 md:w-[150px] truncate">Marvel</h2></Link>
            <p className="text-info text-base">Earned <span className="font-[700]">1K Matic</span></p>
            <p className="text-base text-info mt-2">19.3K subscribers</p>
            <Button children={'Subscribe'} type="secondary" btnClassName="!font-medium uppercase" />
            </div>
          </div>
          <TopChannelShimmer/>
          <div className="flex justify-center">
            <div className="text-center">
            <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpAV1hEc2p-UNtwwToQ6346Ps1v2l3l6kI7rNxsROH5Q&s'} className="w-[150px] h-[150px] rounded-full object-cover mx-auto" alt="" />
            <h2 className=" text-lg font-semibold text-secondary mt-4 leading-4 md:w-[150px] truncate">Geetha Arts</h2>
            <p className="text-info text-base">Earned <span className="font-[700]">1K Matic</span></p>
            <p className="text-base text-info mt-2">19.3K subscribers</p>
            <Button children={'Subscribe'} type="secondary" btnClassName="!font-medium uppercase" />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="text-center">
            <img src={'https://i.ytimg.com/vi/bNJW113tbKk/maxresdefault.jpg'} className="w-[150px] h-[150px] rounded-full object-cover mx-auto" alt="" />
            <h2 className=" text-lg font-semibold text-secondary mt-4 leading-4 md:w-[150px] truncate">Universal </h2>
            <p className="text-info text-base">Earned <span className="font-[700]">1K Matic</span></p>
            <p className="text-base text-info mt-2">19.3K subscribers</p>
            <Button children={'Subscribe'} type="secondary" btnClassName="!font-medium uppercase" />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="text-center">
            <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGSmeInF1oilMjPwUyyKL2ZV-YoJSUIqLYfqX_Ucz6MQ&s'} className="w-[150px] h-[150px] rounded-full object-cover mx-auto" alt="" />
            <h2 className=" text-lg font-semibold text-secondary mt-4 leading-4 md:w-[150px] truncate">Gemini  </h2>
            <p className="text-info text-base">Earned <span className="font-[700]">1K Matic</span></p>
            <p className="text-base text-info mt-2">19.3K subscribers</p>
            <Button children={'Subscribe'} type="secondary" btnClassName="!font-medium uppercase" />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="text-center">
            <img src={'https://cdn.gulte.com/wp-content/uploads/2023/01/mythri.jpg'} className="w-[150px] h-[150px] rounded-full object-cover mx-auto" alt="" />
            <h2 className=" text-lg font-semibold text-secondary mt-4 leading-4 md:w-[150px] truncate">Mythri movies </h2>
            <p className="text-info text-base">Earned <span className="font-[700]">1K Matic</span></p>
            <p className="text-base text-info mt-2">19.3K subscribers</p>
            <Button children={'Subscribe'} type="secondary" btnClassName="!font-medium uppercase" />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="text-center">
            <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQktwxh2eFhjnYiKVP0Ed2MSeZLTKfuox9GLg2GSq1kLw&s'} className="w-[150px] h-[150px] rounded-full object-cover mx-auto" alt="" />
            <h2 className=" text-lg font-semibold text-secondary mt-4 leading-4 md:w-[150px] truncate">Film Productions </h2>
            <p className="text-info text-base">Earned <span className="font-[700]">1K Matic</span></p>
            <p className="text-base text-info mt-2">19.3K subscribers</p>
            <Button children={'Subscribe'} type="secondary" btnClassName="!font-medium uppercase" />
            </div>
          </div>
          </div>
        </>
    );
};

export default TopChannels;
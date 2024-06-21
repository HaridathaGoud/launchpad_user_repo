import React, { useEffect, useRef, useState } from "react";
import FoundingMemberBannerSimmer from "../../loaders/projects/foundingBannerShimmer";
import FoundingMemberSimmer from "../../loaders/projects/foundingmembersshimmer";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { get } from "../../../utils/api";
import ProjectBanner from "../projectBanner";
import BreadCrumb from "../../../ui/breadcrumb";
import CopyToClipboard from "react-copy-to-clipboard";
import { setError } from "../../../reducers/layoutReducer";
import foundingimg from '../../../assets/images/default-nft.png';
import defaultbannerimg from '../../../assets/images/default-bg.png';

const FoundingMembersView = () => {
    const rootDispatch=useDispatch()
    const [foundingmems, setFoundingmems] = useState<{ [key: string]: any }>({});
    const [foundingmemLoader, setFoundingmemLoader] = useState(false);
    const shouldLog = useRef(true);
    const params = useParams();
    const [copied,setCopied]=useState('')
    const handleCopy = (address) => {
        setCopied(address);
        setTimeout(() =>setCopied(''), 1000)
      }
    useEffect(() => {
      window.scroll(0, 0);
      if (params.projectId) {
        if (shouldLog.current) {
          shouldLog.current = false;
          getFoundingMembers();
        }
      }
    }, [params.projectId]);
    const getFoundingMembers = async () => {
      setFoundingmemLoader(true);
      const res = await get("User/stakers/" + params.projectId)
        .then((res: any) => {
          setFoundingmems(res.data);
          setFoundingmemLoader(false);
        })
        .catch((error: any) => {
          rootDispatch(setError({message:error}))
          setFoundingmemLoader(false);
        });
    };
    return (
      <div className="container mx-auto px-3 lg:px-0 mt-3">
  
        {!foundingmemLoader && (
          <>
            {foundingmems && (
              <ProjectBanner
                bannerImage={foundingmems?.bannerImage || defaultbannerimg}
                bannerheight='!h-[200px]'
              />
            )}
          </>
        )}
        <BreadCrumb/>
        <h1 className="text-base font-semibold text-secondary mb-3 mt-5">Founding Members</h1>
  
        <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-7 founding-members">
          {foundingmems.stakersData?.map((item) => (
            <div className="card !bg-base-100 border border-slate-200 transform transition-transform duration-500 hover:scale-[1.03]" key={item.walletAddress}>
              <div className="">
                {/* <div
                  className={`bg-primary text-sm  font-semibold absolute z-10 right-3 top-3 rounded-full w-6 h-6 p-4 text-base-100 flex items-center justify-center border border-white`}
                >
                  3%
                </div> */}
                <img
                  src={item?.image || foundingimg}
                  className="w-full h-[255px] object-cover rounded-t-lg"
                  alt={`Founding Member`}
                />
              </div>
              <div className="card-body px-3 py-6 flex flex-row justify-between">
                <div className="flex-1 overflow-hidden">
                  <h1 className="text-base font-semibold mb-3 truncate  " title={item.userName}>
                  {  item.userName || "--"}
                  </h1>
                  <p className={`opacity-60 mb-3 text-base truncate`}>Earned</p>
                  <p className={` opacity-60 truncate`}>Subscribers</p>
                </div>
                <div className={`w-px bg-base-200 opacity-20`}></div>
                <div className="text-right flex-1 truncate">
                  <h1 className="font-semibold text-sm mb-3 flex justify-end" title={item.walletAddress}>
                    {item.walletAddress?.slice(0, 4) +
                      "...." +
                      item.walletAddress?.substring(
                        item.walletAddress.length - 4,
                        item.walletAddress.length
                      )}
                       <CopyToClipboard
                              text={item.walletAddress}
                              options={{ format: 'text/plain' }}
                              onCopy={() => handleCopy(item.walletAddress)}
                            >
                              <span className={copied!==item.walletAddress ? 'icon md copy-icon cursor-pointer ms-0 pl-4 shrink-0' : 'icon md check-icon pl-4 shrink-0'} />
                            </CopyToClipboard>
                  </h1>
                  {/* <p className="font-semibold mb-3 truncate">1k Matic</p>
                  <p className="font-semibold mb-3 truncate">19.3k</p> */}
                  <p className="font-semibold mb-3 truncate">--</p>
                  <p className="font-semibold mb-3 truncate">--</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {foundingmemLoader && (
          <>
            <FoundingMemberBannerSimmer />
            <div className="grid md:grid-cols-4 gap-6 mt-5">
              <FoundingMemberSimmer />
              <FoundingMemberSimmer />
              <FoundingMemberSimmer />
              <FoundingMemberSimmer />
            </div>
          </>
        )}
      </div>
    );
  };
  
  export default FoundingMembersView;
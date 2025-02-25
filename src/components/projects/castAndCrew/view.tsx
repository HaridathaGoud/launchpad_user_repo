import React, { useState, useEffect, useRef} from "react";
import foundingimg from '../../../assets/images/default-avatar.jpg';
import { useParams } from "react-router-dom";
import defaultbannerimg from '../../../assets/images/default-bg.png';
import { useDispatch } from "react-redux";
import FoundingMemberSimmer from "../../loaders/projects/foundingmembersshimmer";
import ProjectBanner from "../projectBanner";
import BreadCrumb from "../../../ui/breadcrumb";
import { setError } from "../../../reducers/layoutReducer";
import { get } from "../../../utils/api";

const CastandCrewMembersView = () => {
  const [castandcrews, setCastandcrews] = useState<{ [key: string]: any }>({});
  const [castcrewsLoader, setCastcrewsLoader] = useState(false);
  const params = useParams();
  const shouldLog = useRef(true);
  const rootDispatch=useDispatch()

  useEffect(() => {
    window.scroll(0, 0);
    if (params.projectId) {
      if (shouldLog.current) {
        shouldLog.current = false;
        getCastandcrews();
      }
    }
  }, [params.projectId]);
  const getCastandcrews = async () => {
    setCastcrewsLoader(true);
    const res = await get("User/castandcrews/" + params.projectId)
      .then((res: any) => {
        setCastandcrews(res.data);
        setCastcrewsLoader(false);
      })
      .catch((error: any) => {
        rootDispatch(setError({message:error}))
        setCastcrewsLoader(false);
      });
  };
  return (
    <div className="container mx-auto mt-4 px-3 lg:px-0">
      <div className="">
        {castandcrews && (
          <ProjectBanner
            bannerImage={castandcrews?.bannerImage || defaultbannerimg}
            bannerheight='!h-[200px]'
          />
        )}
      </div>
      <BreadCrumb/>
      <h1 className="text-base text-secondary font-semibold mb-3 mt-5">Cast & Crew</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-7 founding-members">
        {castandcrews.cast_Crews?.map((item) => (
          <div className="card !bg-base-100 border border-slate-200 transform transition-transform duration-500 hover:scale-[1.03]" key={item.image+item.name}>
            <div className="">
              <img
                src={item?.image || foundingimg}
                className="w-full h-[255px] object-cover rounded-t-lg"
                alt={`${item.name || item.role}`}
              />
            </div>
            <div className="card-body px-3 py-6 flex flex-row justify-between">
              <div className="flex-1">
                <h1 className="text-base font-semibold mb-3 truncate" title={item.name}>
                  {item.name}
                </h1>
                <p className={`opacity-60 mb-3 text-base`}>Role</p>
                <p className={` opacity-60 truncate text-base`}>Bio</p>
              </div>
              <div className={`w-px bg-base-200 opacity-20`}></div>
              <div className="text-right flex-1 truncate">
                <h1 className="font-semibold mb-3">-</h1>            
                <p className="font-semibold mb-3 truncate" title={item.role}>{item.role}</p>               
                <p className="font-semibold mb-3 truncate" title={item.bio}>
                  {item.bio || '--'}
                </p>
              </div>
            </div>
          </div>
        ))}

        <div className="">{castcrewsLoader && <FoundingMemberSimmer />}</div>
      </div>
    </div>
  );
};

export default CastandCrewMembersView;

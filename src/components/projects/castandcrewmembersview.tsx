import React, { useState, useEffect, useRef, useContext } from "react";
import foundingimg from "../../assets/images/founding-img.png";
import FoundingMemberSimmer from "../loaders/foundingmembersshimmer";
import { useParams } from "react-router-dom";
import { get } from "../../utils/api";
// import { isErrorDispaly } from '../../utils/errorHandling';
import defaultbannerimg from "../../assets/images/default-bg.png";
// import error from '../../assets/images/error.svg';
import ProjectBanner from "./projectBanner";
import outletContext from "../../layout/context/outletContext";
import OutletContextModel from "../../layout/context/model";
import BreadCrumb from "../../ui/breadcrumb";

const CastandCrewMembersView = () => {
  const [castandcrews, setcastandcrews] = useState<{ [key: string]: any }>({});
  const [castcrewsLoader, setcastcrewsLoader] = useState(false);
  // const [errorMsg, setErrorMsg] = useState(null);
  const params = useParams();
  const shouldLog = useRef(true);
  const { setErrorMessage }: OutletContextModel = useContext(outletContext);

  useEffect(() => {
    window.scroll(0, 0);
    if (params.pjctId) {
      if (shouldLog.current) {
        shouldLog.current = false;
        getCastandcrews();
      }
    }
  }, [params.pjctId]);
  const getCastandcrews = async () => {
    setcastcrewsLoader(true);
    const res = await get("User/castandcrews/" + params.pjctId)
      .then((res: any) => {
        setcastandcrews(res.data);
        setcastcrewsLoader(false);
      })
      .catch((error: any) => {
        setErrorMessage?.(error);
        setcastcrewsLoader(false);
      });
  };
  return (
    <div className="container mx-auto mt-4">
      <div className="">
        {castandcrews && (
          <ProjectBanner
            bannerImage={castandcrews?.bannerImage || defaultbannerimg}
          />
        )}
      </div>
      <BreadCrumb/>
      <h1 className="text-base font-semibold mb-3 mt-5">Cast & Crew</h1>
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-7 founding-members">
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
                <h1 className="text-base font-semibold mb-3 truncate">
                  {item.name}
                </h1>
                <p className={`opacity-60 mb-3 text-base`}>Role</p>
                <p className={` opacity-60 truncate text-base`}>Description</p>
              </div>
              <div className={`w-px bg-base-200 opacity-20`}></div>
              <div className="text-right flex-1 truncate">
                <h1 className="font-semibold mb-3">-</h1>                
                <p className="font-semibold mb-3 truncate">{item.role}</p>               
                <p className="font-semibold mb-3 truncate">
                  {item.description || '--'}
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

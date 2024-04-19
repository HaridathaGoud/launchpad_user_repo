import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const ProjectViewTabs = ({
  setDaoTab,
  pjctInfo,
  scrollToBuyMembership,
  scrollToAllocation
}) => {
  const [active, setActive] = useState("");
  const router = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params?.proposalId) {
      setActive("dao");
    } else {
      setActive("projectFeed");
    }
  }, []);
  const handleTabClick = (tab: any) => {
    setActive(tab);
    if (params?.proposalId && tab!=='dao') {
      router(
        `/projects/${params?.projectName}/${params?.projectId}`
      );
    }
    if (tab === "projectFeed") {
      setDaoTab?.(false);
    } else if (tab === "allocationClaim") {
      setDaoTab?.(false);
      scrollToAllocation()
    } else if (tab === "buyMembership") {
      setDaoTab?.(false);
      scrollToBuyMembership();
    } else if (tab === "dao") {
      setDaoTab?.(true);
    }
  };
  return (
    <div
      className={`customTabs flex gap-[10px] overflow-x-auto max-sm:pb-2 scrollbar-hidden pt-2 pb-2 bg-base-100`}
    >
      {/* <a href='#projectFeed' className={`tab !bg-primary leading-normal text-base-100 font-semibold rounded-[28px] py-2 px-3.5 whitespace-nowrap`}>Project Feed</a>
                <a href='#allocationClaim' className={`tab bg-accent leading-normal font-semibold rounded-[28px] py-2 px-3.5 text-black whitespace-nowrap`}>Allocation/Claim</a>
                <a  href='#buyMembership'className={`tab tab bg-accent leading-normal font-semibold rounded-[28px] py-2 px-3.5 text-black whitespace-nowrap`}>Buy Membership</a>
              <a href='/dao' className={`tab bg-accent leading-normal font-semibold rounded-[28px] py-2 px-3.5 text-black whitespace-nowrap`}>DAO’s</a> */}
      <button
        onClick={() => handleTabClick("projectFeed")}
        className={`${
          active === "projectFeed" ? "!bg-primary text-base-100" : ""
        } tab bg-accent leading-normal  font-semibold rounded-[28px] py-2 px-3.5 whitespace-nowrap`}
      >
        Project Feed
      </button>
    {pjctInfo?.tokenType =='ERC-20' && 
      <button
        onClick={() => handleTabClick("allocationClaim")}
        className={`${
          active === "allocationClaim"
            ? "!bg-primary text-base-100"
            : "text-secondary"
        } tab bg-accent leading-normal font-semibold rounded-[28px] py-2 px-3.5  whitespace-nowrap`}
      >
        Allocation/Claim
      </button>
     } 
     {pjctInfo?.tokenType =='ERC-721' && 
      <button
        onClick={() => handleTabClick("buyMembership")}
        className={`${
          active === "buyMembership"
            ? "!bg-primary text-base-100"
            : "text-secondary"
        } tab bg-accent leading-normal font-semibold rounded-[28px] py-2 px-3.5  whitespace-nowrap`}
      >
        Buy Membership
      </button>
     } 
      <button
        onClick={() => handleTabClick("dao")}
        className={`${
          active === "dao" ? "!bg-primary text-base-100" : "text-secondary"
        } tab bg-accent leading-normal font-semibold rounded-[28px] py-2 px-3.5  whitespace-nowrap`}
      >
        DAO’s
      </button>
      {/* <a href='/dao' className={`tab bg-accent leading-normal font-semibold rounded-[28px] py-2 px-3.5 text-black whitespace-nowrap`}>DAO’s</a> */}
    </div>
  );
};

export default ProjectViewTabs;

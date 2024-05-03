import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ScrollTabs from "../../ui/scrollTabs";
const ProjectDetailTabs = ({
  pjctInfo,
}) => {
  const navigate = useNavigate();
  const params = useParams();
  const getMiddleTab=(type:any)=>{
    return type==='ERC-20' ?  { id: 'allocationClaim', label: 'Allocations/Claims' }:{ id: 'buyMembership', label: 'Buy Membership' }
  }
  const navigateToProject=(id:string)=>{
    navigate(`/projects/${params?.projectName}/${params?.projectId}/${id}`)
  }
  const tabFromParams=params?.tab ? {id:params?.tab,shouldRedirect:true } :{id:""}
  const active=params?.proposalId ? {id:"dao",shouldRedirect:false } : tabFromParams
  const action=params?.proposalId && navigateToProject;
  const sections = useMemo(()=>[
    { id: 'projectFeed', label: 'Project Feed', action:action},
    {...getMiddleTab(pjctInfo?.tokenType || params?.tokenType),action:action},
    { id: 'dao', label: 'Dao'},
  ],[pjctInfo?.tokenType]);
  return (
      <ScrollTabs sections={sections} tabsDivClass={`customTabs flex gap-[10px] overflow-x-auto max-sm:pb-2 scrollbar-hidden pt-2 pb-2 bg-base-100`} tabClass={"tab bg-accent leading-normal  font-semibold rounded-[28px] py-2 px-3.5 whitespace-nowrap"} activeTabClass={"!bg-primary text-base-100"} active={active}/>
  );
};

export default ProjectDetailTabs;
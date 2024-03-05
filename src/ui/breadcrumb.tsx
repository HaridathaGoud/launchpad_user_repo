import React, { useEffect, useState } from "react";
import NaviLink from "./NaviLink";
import { useLocation, useParams } from "react-router-dom";
import { getBreadcrumbList } from "../utils/breadcrumbList";
const BreadCrumb = () => {
  const { pathname } = useLocation();
  const params = useParams();
  const [breadcrumb, setBreadcrumb] = useState<any>(null);
  useEffect(() => {
    setBreadcrumbList(pathname);
  }, [pathname, params]);
  const setBreadcrumbList = (path: any) => {
    let breadcrumbToUpdate = breadcrumb ? [...breadcrumb] : null;

    if (path.includes("dashboard")) {
      breadcrumbToUpdate = getBreadcrumbList["launchpadDashboard"];
    } else if (path.includes("projects")) {
      if (params.type) {
        breadcrumbToUpdate = getBreadcrumbList["launchpadProjectsWithStatus"](
          params.type
        );
      } else {
        if (params.projectName && !params.proposalTitle) {
          if (path.includes("foundingmembers")) {
            breadcrumbToUpdate = getBreadcrumbList[
              "launchpadProjectFoundingMembers"
            ]({
              projectName: params.projectName,
              projectPath: `/projects/${params.projectName}/${params.projectId}`,
            });
          } else if (path.includes("castandcrew")) {
            breadcrumbToUpdate = getBreadcrumbList[
              "launchpadProjectCastAndCrew"
            ]({
              projectName: params.projectName,
              projectPath: `/projects/${params.projectName}/${params.projectId}`,
            });
          } else {
            breadcrumbToUpdate = getBreadcrumbList["launchpadProject"](
              params.projectName
            );
          }
        } else if (params.projectName && params.proposalTitle) {
          breadcrumbToUpdate = getBreadcrumbList["launchpadProjectProposal"]({
            proposalTitle: params.proposalTitle,
            projectName: params.projectName,
            projectPath: `/projects/${params.projectName}/${params.projectId}`,
          });
        } else {
          breadcrumbToUpdate = getBreadcrumbList["launchpadProjects"];
        }
      }
    } else if (path.includes("daos")) {
      if (params.daoName && !params.proposalTitle) {
        breadcrumbToUpdate = getBreadcrumbList["daoProposals"](params.daoName);
      } else if (params.daoName && params.proposalTitle) {
        breadcrumbToUpdate = getBreadcrumbList["daoProposal"]({
          daoName: params.daoName,
          proposalsPath: `/daos/${params.daoName}/${params.daoId}/${params.votingAddress}/proposals`,
          proposalTitle: params.proposalTitle,
        });
      } else {
        breadcrumbToUpdate = getBreadcrumbList["daoDashboard"];
      }
    } else if (path.includes("staking")) {
      breadcrumbToUpdate = getBreadcrumbList["launchpadStaking"];
    } else if (path.includes("tiers")) {
      breadcrumbToUpdate = getBreadcrumbList["launchpadTiers"];
    } else {
      breadcrumbToUpdate = getBreadcrumbList["default"];
    }

    setBreadcrumb(breadcrumbToUpdate);
  };
  return (
    <div className="text-sm breadcrumbs">
      <ul>
        {breadcrumb?.map((item: any) => {
          return (
            <li key={item.path + item.name}>
              {item.path && (
                <NaviLink path={item.path} className="!font-normal">
                  {item.name}
                </NaviLink>
              )}
              {!item.path && <p className="!font-normal">{item.name}</p>}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BreadCrumb;

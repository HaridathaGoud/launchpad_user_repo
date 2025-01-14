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
          if (path.includes("investors")) {
            breadcrumbToUpdate = getBreadcrumbList[
              "launchpadProjectInvestors"
            ]({
              projectName: params.projectName,
              projectPath: `/projects/${params.projectName}/${params.projectId}/null`,
            });
          } else if (path.includes("castandcrew")) {
            breadcrumbToUpdate = getBreadcrumbList[
              "launchpadProjectCastAndCrew"
            ]({
              projectName: params.projectName,
              projectPath: `/projects/${params.projectName}/${params.projectId}/null`,
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
            projectPath: `/projects/${params.projectName}/${params.projectId}/null`,
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
          proposalsPath: `/daos/${params.daoName}/${params.daoId}/${params.projectId}/proposals`,
          proposalTitle: params.proposalTitle,
        });
      } else {
        breadcrumbToUpdate = getBreadcrumbList["daoDashboard"];
      }
    } else if (path.includes("staking")) {
      breadcrumbToUpdate = getBreadcrumbList["launchpadStaking"];
    } else if (path.includes("tiers")) {
      breadcrumbToUpdate = getBreadcrumbList["launchpadTiers"];
    }else if (path.includes("portfolio")) {
      breadcrumbToUpdate = getBreadcrumbList["launchpadPortFolio"];
    }
    // else if (path.includes("categoryview")) {
    //   breadcrumbToUpdate = getBreadcrumbList["marketplaceCategory"];
    // }
    else if(path.includes("hotcollectionsviewall")){
      breadcrumbToUpdate = getBreadcrumbList['marketplaceHotCollectionViewAll'];
    }else if(path.includes("browsebyviewall")){
      breadcrumbToUpdate = getBreadcrumbList['marketplaceBrowseByCategoryAll'];
    }
    else if(path.includes("marketplace/account")){
      breadcrumbToUpdate = getBreadcrumbList['marketplaceAccount'](params);
    }else if(path.includes("explore")){
      breadcrumbToUpdate = getBreadcrumbList['marketplaceExplore'];
    }else if(path.includes("marketplace/collections")){
      breadcrumbToUpdate = getBreadcrumbList['marketplaceCollections'];}
      else if(path.includes("mycollections")){
        breadcrumbToUpdate = getBreadcrumbList['marketplaceMyCollections'];}
   else if(path.includes("nft/create")){
      breadcrumbToUpdate = getBreadcrumbList['marketplaceCreateNft'];
    }else if(path.includes("collection/create")){
      breadcrumbToUpdate = getBreadcrumbList['marketplaceCreateColection'];
    }
    else if(path.includes("marketplace/collection")){
       if (params.collectionid ) {
        breadcrumbToUpdate = getBreadcrumbList["colloctionView"]({
          collectionName: params.collectionName,
          collectionPath: `marketplace/collections`,
          proposalTitle: params.collectionName,
        });
      }
    }
    else if(path.includes("marketplace/mycollection")){
      if (params.collectionid ) {
       breadcrumbToUpdate = getBreadcrumbList["mycolloctionView"]({
         collectionName: params.collectionName,
         collectionPath: `marketplace/mycollections`,
         proposalTitle: params.collectionName,
       });
     }
   }
   else if(path.includes("marketplace/hotcollection")){
    if (params.collectionid ) {
     breadcrumbToUpdate = getBreadcrumbList["marketplaceHotCollectionsView"]({
       collectionName: params.collectionName,
       collectionPath: `marketplace/home`,
       proposalTitle: params.collectionName,
     });
    }
   }
   else if(path.includes("marketplace/topseller")){
    if (params.id ) {
     breadcrumbToUpdate = getBreadcrumbList["marketplaceTopSellerView"]({
       collectionName: params?.walletAddress,
       collectionPath: `marketplace/home`,
       proposalTitle: params?.walletAddress,
     });
    }
 }
 else if(path.includes("marketplace/categoryview")){
  breadcrumbToUpdate = getBreadcrumbList['marketplaceBrowseByCateory'](params);
}
    else {
      breadcrumbToUpdate = getBreadcrumbList["default"];
    }

    setBreadcrumb(breadcrumbToUpdate);
  };
  return (
    <div className="text-sm breadcrumbs no-scrollbar">
      <ul>
        {breadcrumb?.map((item: any,index) => {
          return (
            <li key={item.path + item.name}>
              {item.path && (
                <NaviLink path={item.path} className={`${index===breadcrumb.length-1 ? 'text-primary !font-medium':'!text-secondary'} ${item.name.length>50 ? 'truncate w-1/2':''} !font-normal `}>
                  {item.name}
                </NaviLink>
              )}
              {!item.path && <p className={` ${index===breadcrumb.length-1 ? 'text-primary text-base !font-medium':'!text-secondary'} ${item.name.length>50 ? 'truncate w-1/2':''}`}>{item.name}</p>}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BreadCrumb;

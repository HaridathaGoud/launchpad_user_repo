export const getBreadcrumbList = {
  default: [{ name: "Launchpad", path: "/" }],
  launchpadDashboard: [
    { name: "Launchpad", path: "/dashboard" },
    { name: "Dashboard", path: "" },
  ],
  launchpadProjects: [
    { name: "Launchpad", path: "/" },
    { name: "Projects", path: "" },
  ],
  launchpadStaking: [
    { name: "Launchpad", path: "/" },
    { name: "Staking", path: "" },
  ],
  launchpadTiers: [
    { name: "Launchpad", path: "/" },
    { name: "Tiers", path: "" },
  ],
  launchpadPortFolio:[
    { name: "Launchpad", path: "/" },
    { name: "Portfolio", path: "" },
  ],
  marketplaceCategory:[
    { name: "Home", path: "/" },
    { name: "Marketplace", path: "/marketplace/home" },
    { name: "Browse by Category", path: "" },
  ],
  marketplaceHotCollectionViewAll:[
    { name: "Home", path: "/" },
    { name: "Marketplace", path: "/marketplace/home" },
    { name: "Hot Collections", path: "" },
  ],
  marketplaceBrowseByCategoryAll:[
    { name: "Home", path: "/" },
    { name: "Marketplace", path: "/marketplace/home" },
    { name: "Browse by Category", path: "" },
  ],
  marketplaceCollections:[
    { name: "Home", path: "/" },
    { name: "Marketplace", path: "/marketplace/home" },
    { name: "Collections", path: "" },
  ],
  marketplaceCreateNft:[ 
    { name: "Home", path: "/" },
    { name: "Marketplace", path: "/marketplace/home" },
    { name: "Create New NFT", path: "" },
  ],
  marketplaceCreateColection:[ 
    { name: "Home", path: "/" },
    { name: "Marketplace", path: "/marketplace/home" },
    { name: "Create New Collection", path: "" },
  ],
  marketplaceExplore:[
    { name: "Home", path: "/" },
    { name: "Marketplace", path: "/marketplace/home" },
    { name: "Explore", path: "" },
  ],
  launchpadProjectsWithStatus: (status: any) => {
    return [
      { name: "Launchpad", path: "/" },
      { name: "Projects", path: "/projects" },
      { name: status.charAt(0).toUpperCase()+status.slice(1), path: "" },
    ];
  },
  launchpadProject: (projectName: any) => {
    return [
      { name: "Launchpad", path: "/" },
      { name: "Projects", path: "/projects" },
      { name: projectName.charAt(0).toUpperCase()+projectName.slice(1), path: "" },
    ];
  },
  launchpadProjectProposal: (props: any) => {
    return [
      { name: "Launchpad", path: "/" },
      { name: "Projects", path: "/projects" },
      { name: props.projectName.charAt(0).toUpperCase()+props.projectName.slice(1), path: props.projectPath },
      { name: props.proposalTitle.charAt(0).toUpperCase()+props.proposalTitle.slice(1), path: "" },
    ];
  },
  launchpadProjectInvestors: (project: any) => [
    { name: "Launchpad", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: project.projectName.charAt(0).toUpperCase()+project.projectName.slice(1), path: project.projectPath },
    { name: "Investors", path: "" },
  ],
  launchpadProjectCastAndCrew: (project: any) => [
    { name: "Launchpad", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: project.projectName.charAt(0).toUpperCase()+project.projectName.slice(1), path: project.projectPath },
    { name: "Cast And Crew", path: "" },
  ],
  daoDashboard: [
    { name: "Daos", path: "/daos" },
    { name: "Dashboard", path: "" },
  ],
  daoProposals: (daoName: any) => [
    { name: "Daos", path: "/daos" },
    { name: daoName.charAt(0).toUpperCase()+daoName.slice(1), path: "" },
    { name: "Proposals", path: "" },
  ],
  daoProposal: (props:any) => [
    { name: "Daos", path: "/daos" },
    { name: props.daoName.charAt(0).toUpperCase()+props.daoName.slice(1), path: "" },
    { name: "Proposals", path: props.proposalsPath },
    { name: props.proposalTitle.charAt(0).toUpperCase()+props.proposalTitle.slice(1), path: "" },
  ],

};

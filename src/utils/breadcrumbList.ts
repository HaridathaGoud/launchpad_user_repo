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
  launchpadProjectFoundingMembers: (project: any) => [
    { name: "Launchpad", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: project.projectName.charAt(0).toUpperCase()+project.projectName.slice(1), path: project.projectPath },
    { name: "Founding Members", path: "" },
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

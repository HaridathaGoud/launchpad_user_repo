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
  launchpadProjectsWithStatus: (status: any) => {
    return [
      { name: "Launchpad", path: "/" },
      { name: "Projects", path: "/projects" },
      { name: status, path: "" },
    ];
  },
  launchpadProject: (projectName: any) => {
    return [
      { name: "Launchpad", path: "/" },
      { name: "Projects", path: "/projects" },
      { name: projectName, path: "" },
    ];
  },
  launchpadProjectProposal: (props: any) => {
    return [
      { name: "Launchpad", path: "/" },
      { name: "Projects", path: "/projects" },
      { name: props.projectName, path: props.projectPath },
      { name: props.proposalTitle, path: "" },
    ];
  },
  launchpadProjectFoundingMembers: (project: any) => [
    { name: "Launchpad", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: project.projectName, path: project.projectPath },
    { name: "Founding Members", path: "" },
  ],
  launchpadProjectCastAndCrew: (project: any) => [
    { name: "Launchpad", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: project.projectName, path: project.projectPath },
    { name: "Cast And Crew", path: "" },
  ],
  daoDashboard: [
    { name: "Daos", path: "/daos" },
    { name: "Dashboard", path: "" },
  ],
  daoProposals: (daoName: any) => [
    { name: "Daos", path: "/daos" },
    { name: daoName, path: "" },
    { name: "Proposals", path: "" },
  ],
  daoProposal: (props:any) => [
    { name: "Daos", path: "/daos" },
    { name: props.daoName, path: "" },
    { name: "Proposals", path: props.proposalsPath },
    { name: props.proposalTitle, path: "" },
  ],
};

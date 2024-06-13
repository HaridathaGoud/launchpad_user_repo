export const getGlobalDropDown = (navigate: Function) => {
  return [
    {
      name: "Streaming",
      image:
        "https://dottdevstoragespace.blob.core.windows.net/images/streming.png",
      action: () => window.open("https://streaming.dott.network", "_blank"),
    },
    {
      name: "DAO’s",
      image: "https://dottdevstoragespace.blob.core.windows.net/images/dao.png",
      action: () => navigate("/daos"),
    },
    {
      name: "Marketplace",
      image: "https://dottdevstoragespace.blob.core.windows.net/images/dao.png",
      action: () => navigate("/marketplace"),
    },
  ];
};
export const getNavMenu = (
  navigate: Function,
  currentPath: string | undefined,
  userId: string | undefined
) => {
  if (userId) {
    return [
      {
        path: "/portfolio",
        name: "Portfolio",
        action: () => navigate("/portfolio"),
        isActive: currentPath?.includes("/portfolio"),
      },
      {
        path: "/projects",
        name: "Projects",
        action: () => navigate("/projects"),
        isActive: currentPath?.includes("/projects"),
      },
      {
        path: "/staking",
        name: "Staking",
        action: () => navigate("/staking"),
        isActive: currentPath?.includes("/staking"),
      },
      {
        path: "/tiers",
        name: "Tiers",
        action: () => navigate("/tiers"),
        isActive: currentPath?.includes("/tiers"),
      },
      {
        path: "/aboutus",
        name: "About Us",
        action: () => navigate("/aboutus"),
        isActive: currentPath?.includes("/aboutus"),
      },
      // {
      //   path: "/docs",
      //   name: "Docs",
      //   action: () => navigate("/docs"),
      //   isActive: currentPath?.includes("/docs"),
      // },
    ];
  }
  return [
    {
      path: "/projects",
      name: "Projects",
      action: () => navigate("/projects"),
      isActive: currentPath?.includes("/projects"),
    },
    {
      path: "/staking",
      name: "Staking",
      action: () => navigate("/staking"),
      isActive: currentPath?.includes("/staking"),
    },
    {
      path: "/tiers",
      name: "Tiers",
      action: () => navigate("/tiers"),
      isActive: currentPath?.includes("/tiers"),
    },
    {
      path: "/aboutus",
      name: "About Us",
      action: () => navigate("/aboutus"),
      isActive: currentPath?.includes("/aboutus"),
    },
    // {
    //   path: "/docs",
    //   name: "Docs",
    //   action: () => navigate("/docs"),
    //   isActive: currentPath?.includes("/docs"),
    // },
  ];
};

export const getNavBarDropdown = (
  handleDropdownAction: Function,
  pathname: string | undefined,
  isArcanaUser: boolean
) => {
  return isArcanaUser
    ? [
        {
          name: "Profile",
          action: () => handleDropdownAction("profile"),
          isActive: pathname?.includes("/profile"),
        },
        {
          name: "Wallet",
          action: () => handleDropdownAction("wallet"),
        },
        {
          name: "Disconnect",
          action: () => {
            handleDropdownAction("disconnect");
          },
        },
      ]
    : [
        {
          name: "Profile",
          action: () => handleDropdownAction("profile"),
          isActive: pathname?.includes("/profile"),
        },
        {
          name: "Disconnect",
          action: () => {
            handleDropdownAction("disconnect");
          },
        },
      ];
};

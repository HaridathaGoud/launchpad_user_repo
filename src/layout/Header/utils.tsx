export const getGlobalDropDown = (navigate: Function) => {
  return [
    {
      name: "Streaming",
      image:
        "https://dottdevstoragespace.blob.core.windows.net/images/streming.png",
      action: () => window.open("https://streaming.dott.network", "_blank"),
    },
    // {
    //   name: "DAO’s",
    //   image: "https://dottdevstoragespace.blob.core.windows.net/images/dao.png",
    //   action: () => navigate("/daos"),
    // },
    // {
    //   name: "Marketplace",
    //   image: "https://dottdevstoragespace.blob.core.windows.net/images/dao.png",
    //   action: () => navigate("/marketplace/home"),
    // },
  ];
};
export const getNavMenu = (
  navigate: Function,
  currentPath: string | undefined,
  userId: string | undefined
) => {
  // if (userId) {
  //   return [
  //     {
  //       path: "/portfolio",
  //       name: "Portfolio",
  //       action: () => navigate("/portfolio"),
  //       isActive: currentPath?.includes("/portfolio"),
  //     },
  //     {
  //       path: "/projects",
  //       name: "Projects",
  //       action: () => navigate("/projects"),
  //       isActive: currentPath?.includes("/projects"),
  //     },
  //     {
  //       path: "/staking",
  //       name: "Staking",
  //       action: () => navigate("/staking"),
  //       isActive: currentPath?.includes("/staking"),
  //     },
  //     {
  //       path: "/tiers",
  //       name: "Tiers",
  //       action: () => navigate("/tiers"),
  //       isActive: currentPath?.includes("/tiers"),
  //     },
  //     {
  //       path: "/marketplace/home",
  //       name: "Home",
  //       action: () => navigate("/home"),
  //       isActive: currentPath?.includes("/marketplace/home"),
  //     },
  //     {
  //       path: "/marketplace/explore",
  //       name: "Explore",
  //       action: () => navigate("/explore"),
  //       isActive: currentPath?.includes("/marketplace/explore"),
  //     },
  //     {
  //       path: "/marketplace/nft/create",
  //       name: "Create",
  //       action: () => navigate("/marketplace/nft/create"),
  //       isActive: currentPath?.includes("/marketplace/nft/create"),
  //     },
  //     {
  //       path:"/marketplace/collections",
  //       name: "Collections",
  //       action: () => navigate("/marketplace/collections"),
  //       isActive: currentPath?.includes("/collections"),
  //     },
  //     {
  //       path: "/aboutus",
  //       name: "About Us",
  //       action: () => navigate("/aboutus"),
  //       isActive: currentPath?.includes("/aboutus"),
  //     },
  //     // {
  //     //   path: "/docs",
  //     //   name: "Docs",
  //     //   action: () => navigate("/docs"),
  //     //   isActive: currentPath?.includes("/docs"),
  //     // },
  //   ];
  // }
  // return [
  //   {
  //     path: "/projects",
  //     name: "Projects",
  //     action: () => navigate("/projects"),
  //     isActive: currentPath?.includes("/projects"),
  //   },
  //   {
  //     path: "/staking",
  //     name: "Staking",
  //     action: () => navigate("/staking"),
  //     isActive: currentPath?.includes("/staking"),
  //   },
  //   {
  //     path: "/tiers",
  //     name: "Tiers",
  //     action: () => navigate("/tiers"),
  //     isActive: currentPath?.includes("/tiers"),
  //   },
  //   {
  //     path: "/marketplace/home",
  //     name: "Home",
  //     action: () => navigate("/home"),
  //     isActive: currentPath?.includes("/marketplace/home"),
  //   },
  //   {
  //     path: "/marketplace/explore",
  //     name: "Explore",
  //     action: () => navigate("/explore"),
  //     isActive: currentPath?.includes("/marketplace/explore"),
  //   },
  //   {
  //     path: "/marketplace/nft/create",
  //     name: "Create",
  //     action: () => navigate("/marketplace/nft/create"),
  //     isActive: currentPath?.includes("/marketplace/nft/create"),
  //   },
  //   {
  //     path:"/marketplace/collections",
  //     name: "Collections",
  //     action: () => navigate("/marketplace/collections"),
  //     isActive: currentPath?.includes("/collections"),
  //   },
  //   {
  //     path: "/aboutus",
  //     name: "About Us",
  //     action: () => navigate("/aboutus"),
  //     isActive: currentPath?.includes("/aboutus"),
  //   },
  //   // {
  //   //   path: "/docs",
  //   //   name: "Docs",
  //   //   action: () => navigate("/docs"),
  //   //   isActive: currentPath?.includes("/docs"),
  //   // },
  // ];

  return [
    {
      name: "Launchpad",
      type:'dropdown',
      path:'/dashboard',
      menu:[
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
      ]
    },
   
    {
      name: "Marketplace",
      type:'dropdown',
      path:'/marketplace/home',
      menu:[
       
              {
                path: "/marketplace/explore",
                name: "Explore",
                action: () => navigate("/explore"),
                isActive: currentPath?.includes("/marketplace/explore"),
              },
              
              {
                path:"/marketplace/collections",
                name: "Collections",
                action: () => navigate("/marketplace/collections"),
                isActive: currentPath?.includes("/collections"),
              },
              {
                path: "/marketplace/nft/create",
                name: "Create Nft",
                action: () => navigate("/marketplace/nft/create"),
                isActive: currentPath?.includes("/marketplace/nft/create"),
              },
      ]
    },
   
    {
      name: "Daos",
      path:"/daos",
      type:'link'
    },
    {
      name: "Portfolio",
      path:"/portfolio",
      type:'link'
    },
    {
      name: "About Us",
      type:'link',
      path:"/aboutus",
    },
    {
      name: "Docs",
      type:'link',
      path:"/docs",
    },
  ]
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
        {
          name: "My Collections",
          action: () => {
            handleDropdownAction("mycollections");
          }
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
      {
        name: "My Collections",
        action: () => {
          handleDropdownAction("mycollections");
        },
      },
    ];
};

export const getMarketplaceNavMenu = (navigate: Function,
  currentPath: string | undefined,
  userId: string | undefined) => {
  return [
    {
      path: "/marketplace/home",
      name: "Home",
      action: () => navigate("/home"),
      isActive: currentPath?.includes("/marketplace/home"),
    },
    {
      path: "/marketplace/explore",
      name: "Explore",
      action: () => navigate("/explore"),
      isActive: currentPath?.includes("/marketplace/explore"),
    },
    {
      path: "/marketplace/nft/create",
      name: "Create",
      action: () => navigate("/marketplace/nft/create"),
      isActive: currentPath?.includes("/marketplace/nft/create"),
    },
    {
      path: "/marketplace/collections",
      name: "Collections",
      action: () => navigate("/marketplace/collections"),
      isActive: currentPath?.includes("/collections"),
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

import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Pageerror from "../utils/pagenotFoundPage";
import ErrorPage from "../utils/errorPage";
import FoundingMembersView from "../components/projects/founders/view";
import AppLayout from "./AppLayout";
import ComingSoon from "../components/shared/comingSoon";
import TopsellerDetailview from "../components/marketplace.component/topsellerdetailview";
import MycollectionsComponent from "../components/marketplace.component/mycollections.component";
import TiresShimmer from "../components/loaders/TiresShimmers";
import StakingShimmer from "../components/loaders/StakingShimmer";
import ProjectViewShimmer from "../components/loaders/projects/projectViewShimmer";
import ProjectCardsShimmers from "../components/loaders/projects/projectCardsShimmers";
import ProfileShimmer from "../components/loaders/profileShimmer";
import DashboardShimmers from "../components/loaders/dashboard/dashboardShimmers";
import DaosPageShimmer from "../components/loaders/daos/daosPageShimmer";
import ProposalsPageShimmer from "../components/loaders/daos/proposalsPageShimmer";
import ProposalPageShimmer from "../components/loaders/daos/proposalPageShimmer";
import PageSpinner from "./pageSpinner";
import ProtectedRoute from "./protectedRoute";
// import MinnapadDashboard from "../components/strapi/minnapaddashboard";
import AboutUs from "../components/strapi/aboutus";
import Docs from "../components/strapi/docs";
import PortfolioShimmer from "../components/loaders/portfolioshimmer";
import CreatenftComponent from "../components/marketplace.component/createnft.component";
import Createcollection from "../components/marketplace.component/createcollection.component/createcollection";
import HotcollectionView from "../components/marketplace.component/hotcollections.component/hotcollectionsview";
import CategoryView from "../components/marketplace.component/browsebycategory.component/categoryview";
const Portfolio = React.lazy(() => import("../components/portfolio"));
const Project = React.lazy(() => import("../components/projects"));
const Dashboard = React.lazy(() => import("../components/dashboard"));
// const AboutUs = React.lazy(() => import("../components/aboutus.component"));
const Faq = React.lazy(() => import("../components/faq.component"));
const KycStatus = React.lazy(() => import("../components/sumsub/kycStatus"));
const Profile = React.lazy(() => import("../components/profile"));
const Projectdetails = React.lazy(
  () => import("../components/projects/project/index")
);
const AllProjects = React.lazy(
  () => import("../components/projects/allProjects")
);
const Staking = React.lazy(() => import("../components/staking"));
const Tiers = React.lazy(() => import("../components/tiers"));
const SumSub = React.lazy(() => import("../components/sumsub"));
const Marketplace = React.lazy(
  () => import("../components/marketplace.component/dashboard.component")
);
const Daos = React.lazy(() => import("../components/Dao/dashboard/index"));
const Proposals = React.lazy(() => import("../components/Dao/proposals/index"));
const ProposalView = React.lazy(() => import("../components/Dao/proposal"));
const ExploreNfts = React.lazy(
  () =>
    import("../components/marketplace.component/explorenfts.component/index")
);
const Detailpage = React.lazy(
  () => import("../components/marketplace.component/detailpage.component/index")
);
const Referral = React.lazy(
  () => import("../components/referral.component/referral")
);
const ReferralsCode = React.lazy(
  () => import("../components/referral.component/referralCode")
);
const CastandCrewMembersView = React.lazy(
  () => import("../components/projects/castAndCrew/view")
);

const Routes = () => {
  const routes = createBrowserRouter([
    {
      element: <AppLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Navigate replace to={"/dashboard"} />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/dashboard",
          element: (
            <React.Suspense fallback={<DashboardShimmers />}>
              <Dashboard />
            </React.Suspense>
          ),
          errorElement: <ErrorPage />,
        },
        // { path: "/aboutus", element: <AboutUs />, errorElement: <ErrorPage /> },
        {
          path: "/kycStatus",
          element: (
            <ProtectedRoute>
              <KycStatus />
            </ProtectedRoute>
          ),
          errorElement: <ErrorPage />,
        },
        { path: "/faq", element: <Faq />, errorElement: <ErrorPage /> },
        {
          path: "/profile/:walletAddress?",
          element: (
            <React.Suspense fallback={<ProfileShimmer />}>
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            </React.Suspense>
          ),
          errorElement: <ErrorPage />,
        },
        {
          path: "/projects",
          element: (
            <React.Suspense fallback={<ProjectCardsShimmers />}>
              <Project />
            </React.Suspense>
          ),
          errorElement: <ErrorPage />,
        },
        {
          path: `/projects/:type`,
          element: (
            <React.Suspense fallback={<ProjectCardsShimmers />}>
              <AllProjects />
            </React.Suspense>
          ),
          errorElement: <ErrorPage />,
        },
        {
          path: "/projects/:projectName/:projectId/:tab",
          element: (
            <React.Suspense fallback={<ProjectViewShimmer />}>
              <Projectdetails />
            </React.Suspense>
          ),
          errorElement: <ErrorPage />,
        },
        {
          path: "/staking",
          element: (
            <React.Suspense fallback={<StakingShimmer />}>
              <Staking />
            </React.Suspense>
          ),
          errorElement: <ErrorPage />,
        },
        {
          path: "/staking/:stakeAmount",
          element: (
            <React.Suspense fallback={<StakingShimmer />}>
              <Staking />
            </React.Suspense>
          ),
          errorElement: <ErrorPage />,
        },
        {
          path: "/tiers",
          element: (
            <React.Suspense fallback={<TiresShimmer />}>
              <Tiers />
            </React.Suspense>
          ),
          errorElement: <ErrorPage />,
        },
        {
          path: "/portfolio",
          element: (
            <React.Suspense fallback={<PortfolioShimmer />}>
              <ProtectedRoute>
                <Portfolio />
              </ProtectedRoute>
            </React.Suspense>
          ),
          errorElement: <ErrorPage />,
        },
        {
          path: "/completekyc",
          element: (
            <React.Suspense fallback={<PageSpinner />}>
              <ProtectedRoute>
                <SumSub />
              </ProtectedRoute>
            </React.Suspense>
          ),
          errorElement: <ErrorPage />,
        },
        {
          path: "/marketplace/home",
          element: (
            <React.Suspense fallback={<PageSpinner />}>
              <Marketplace />
            </React.Suspense>
          ),
          errorElement: <ErrorPage />,
        },
        {
          path: "/marketplace/explore",
          element: (
            <React.Suspense fallback={<PageSpinner />}>
              <ExploreNfts />
            </React.Suspense>
          ),
          errorElement: <ErrorPage />,
        },
        {
          path: "/marketplace/nft/create",
          element: <CreatenftComponent />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/marketplace/collection/create",
          element: <Createcollection />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/marketplace/collection/:collectionid/view",
          element: <HotcollectionView />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/marketplace/collection/:id",
          element: <TopsellerDetailview />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/marketplace/collections",
          element: <MycollectionsComponent />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/marketplace/mycollections",
          element: <MycollectionsComponent />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/marketplace/categoryview",
          element: <CategoryView />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/marketplace/nft/:tokenId?/:collectionAddress?/:nftId",
          element: (
            <React.Suspense fallback={<PageSpinner />}>
              <Detailpage />
            </React.Suspense>
          ),
          errorElement: <ErrorPage />,
        },
        {
          path: "/projects/:projectName/:projectId/foundingmembers",
          element: <FoundingMembersView />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/daos",
          element: (
            <React.Suspense fallback={<DaosPageShimmer />}>
              <Daos />
            </React.Suspense>
          ),
        },
        {
          path: "/aboutus",
          element: (
            <React.Suspense fallback={<DaosPageShimmer />}>
              <AboutUs />
            </React.Suspense>
          ),
        },
        {
          path: "/docs",
          element: (
            <React.Suspense fallback={<DaosPageShimmer />}>
              <Docs />
            </React.Suspense>
          ),
        },
        {
          path: "/daos/:daoName/:daoId/:projectId/proposals",
          element: (
            <React.Suspense fallback={<ProposalsPageShimmer />}>
              <Proposals showBreadcrumb={true} showHeader={true} />
            </React.Suspense>
          ),
        },
        {
          path: "/daos/:daoName/:daoId/:projectId/proposals/:proposalTitle/:proposalId/:projectToken",
          element: (
            <React.Suspense fallback={<ProposalPageShimmer />}>
              <ProposalView showTabs={false} />
            </React.Suspense>
          ),
        },
        {
          path: "/projects/:projectName/:projectId/:tokenType/proposals/:proposalTitle/:proposalId/:projectToken",
          element: (
            <React.Suspense fallback={<ProposalPageShimmer />}>
              <ProposalView showTabs={true} />
            </React.Suspense>
          ),
        },
        {
          path: "/referrals/:id",
          element: (
            <React.Suspense>
              <Referral />
            </React.Suspense>
          ),
        },
        {
          path: "/referralcode/:id",
          element: (
            <React.Suspense>
              <ReferralsCode />
            </React.Suspense>
          ),
        },
        {
          path: "/projects/:projectName/:projectId/castandcrew",
          element: (
            <React.Suspense fallback={<PageSpinner />}>
              <CastandCrewMembersView />
            </React.Suspense>
          ),
        },
        {
          path: "/comingsoon",
          element: <ComingSoon />,
          errorElement: <ErrorPage />,
        },
      ],
    },
    {
      path: "*",
      element: (
        <React.Suspense fallback={<PageSpinner />}>
          <Pageerror />
        </React.Suspense>
      ),
    },
  ]);

  return <RouterProvider router={routes} />;
};
export default Routes;

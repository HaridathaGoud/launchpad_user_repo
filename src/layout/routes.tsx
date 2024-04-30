import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Pageerror from "../utils/pagenotFoundPage";
import ErrorPage from "../utils/errorPage";
import { store } from "../store";
import { getKyc } from "../utils/api";
import { setToken } from "../reducers/rootReducer";
import FoundingMembersView from "../components/projects/founders/projectFoundersView";
import AppLayout from "./AppLayout";
import SumSub from "../components/sumsub";
import ComingSoon from "../components/shared/comingSoon";
import TopsellerDetailview from "../components/marketplace.component/topsellerdetailview";
import MycollectionsComponent from "../components/marketplace.component/mycollections.component";
const Project = React.lazy(() => import("../components/projects"));
const Dashboard = React.lazy(() => import("../components/dashboard"));
const AboutUs = React.lazy(() => import("../components/aboutus.component"));
const Faq = React.lazy(() => import("../components/faq.component"));
const KycStatus = React.lazy(() => import("../components/sumsub/kycStatus"));
const Profile = React.lazy(() => import("../components/profile"));
const Projectdetails = React.lazy(
  () => import("../components/projects/projectdetails")
);
const AllProjects = React.lazy(
  () => import("../components/projects/allProjects")
);
const Staking = React.lazy(() => import("../components/staking"));
const Tiers = React.lazy(() => import("../components/tiers"));
const Minting = React.lazy(
  () => import("../components/minting.component/dashboard")
);
const MintingDao = React.lazy(
  () => import("../components/minting.component/daoCards")
);
const ThankYou = React.lazy(
  () => import("../components/minting.component/thankyou")
);
const MyCollections = React.lazy(
  () => import("../components/minting.component/mycollections/index")
);
const Marketplace = React.lazy(
  () => import("../components/marketplace.component/index")
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
      element: (
        <React.Suspense>
          <AppLayout />
        </React.Suspense>
      ),
      errorElement: <ErrorPage />,
      loader: async () => {
        const id = store.getState().auth?.user?.id;
        return getKyc(`User/GetAuthorizationToken/${id || ""}`).then(
          (token) => {
            store.dispatch(setToken(token.data));
            return token;
          }
        );
      },
      children: [
        {
          path: "/",
          element: <Navigate replace to={"/dashboard"} />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
          errorElement: <ErrorPage />,
        },
        { path: "/aboutus", element: <AboutUs />, errorElement: <ErrorPage /> },
        {
          path: "/kycStatus",
          element: <KycStatus />,
          errorElement: <ErrorPage />,
        },
        { path: "/faq", element: <Faq />, errorElement: <ErrorPage /> },
        { path: "/profile", element: <Profile />, errorElement: <ErrorPage /> },
        {
          path: "profile/:show",
          element: <Profile />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/projects",
          element: <Project />,
          errorElement: <ErrorPage />,
        },
        {
          path: `/projects/:type`,
          element: <AllProjects />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/projects/:projectName/:projectId",
          element: <Projectdetails />,
          errorElement: <ErrorPage />,
        },
        { path: "/staking", element: <Staking />, errorElement: <ErrorPage /> },
        {
          path: "/staking/:stakeAmount",
          element: <Staking />,
          errorElement: <ErrorPage />,
        },
        { path: "/tiers", element: <Tiers />, errorElement: <ErrorPage /> },
        {
          path: "/completekyc",
          element: <SumSub />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/minting",
          element: <MintingDao />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/minting/:daoname/:daoid",
          element: <Minting />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/minnapad/thankyou",
          element: <ThankYou />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/minnapad/mycollections",
          element: <MyCollections />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/marketplace",
          element: <Marketplace />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/marketplace/explorenfts",
          element: <ExploreNfts />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/topsellerdetailview",
          element: <TopsellerDetailview />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/mycollections",
          element: <MycollectionsComponent />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/marketplace/assets/:tokenId?/:collectionAddress?/:nftId",
          element: <Detailpage />,
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
            <React.Suspense>
              <Daos />
            </React.Suspense>
          ),
        },
        {
          path: "/daos/:daoName/:daoId/:projectId/proposals",
          element: (
            <React.Suspense>
              <Proposals showBreadcrumb={true} showHeader={true}/>
            </React.Suspense>
          ),
        },
        {
          path: "/daos/:daoName/:daoId/:projectId/proposals/:proposalTitle/:proposalId/:projectToken",
          element: (
            <React.Suspense>
              <ProposalView showTabs={false} />
            </React.Suspense>
          ),
        },
        {
          path: "/projects/:projectName/:projectId/:tokenType/proposals/:proposalTitle/:proposalId/:projectToken",
          element: (
            <React.Suspense>
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
            <React.Suspense>
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
        <React.Suspense>
          <Pageerror />
        </React.Suspense>
      ),
    },
  ]);

  return <RouterProvider router={routes} />;
};
export default Routes;

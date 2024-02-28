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
import FoundingMembersView from "../components/projects/foundingmembersview";
import StreamingDashboard from "../components/streaming/Dashboard";
import StreamingDetailview from "../components/streaming/Detailview";
import AppLayout from "./AppLayout";
import NftCardDetailview from "../components/streaming/Detailview/Nftcarddetailview";
import Trending from "../components/streaming/Trending/trending";
import Channels from "../components/streaming/Channels/channels";
import ChannelView from "../components/streaming/Channels/channeldetailview";
import Movies from "../components/streaming/Movies/movies";
import SumSub from "../components/sumsub";
import ComingSoon from "../components/shared/comingSoon";
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
const Dao = React.lazy(() => import("../components/Dao/dashboard/index"));
const Proposals = React.lazy(
  () => import("../components/Dao/proposals/index")
);
const ProposalView = React.lazy(() => import("../components/Dao/proposal"));
const ExploreNfts = React.lazy(
  () =>
    import("../components/marketplace.component/explorenfts.component/index")
);
const Detailpage = React.lazy(
  () => import("../components/marketplace.component/detailpage.component/index")
);
const KycPage = React.lazy(() => import("../components/Dao/complete.kyc"));
const Referral = React.lazy(
  () => import("../components/referral.component/referral")
);
const ReferralsCode = React.lazy(
  () => import("../components/referral.component/referralCode")
);
const CastandCrewMembersView = React.lazy(
  () => import("../components/projects/castandcrewmembersview")
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
          path: "/StreamingDashboard",
          element: <StreamingDashboard />,
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
          path: `/allprojects/:type`,
          element: <AllProjects />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/projects/projectdetails/:projectstatus/:pid",
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
        {path:'/completekyc',element:<SumSub/>,errorElement:<ErrorPage/> },
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
          path: "/marketplace/assets/:tokenId?/:collectionAddress?/:nftId",
          element: <Detailpage />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/foundingmemebersview/:pjctId",
          element: <FoundingMembersView />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/streamingdetailview",
          element: <StreamingDetailview />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/nftdetailview",
          element: <NftCardDetailview />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/trending",
          element: <Trending />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/channels",
          element: <Channels />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/channelview",
          element: <ChannelView />,
          errorElement: <ErrorPage />,
        },
        { path: "/movies", element: <Movies />, errorElement: <ErrorPage /> },
        {
          path: "/dao",
          element: (
            <React.Suspense>
              <Dao />
            </React.Suspense>
          ),
        },
        {
          path: "/dao/:daoId/:votingAddress",
          element: (
            <React.Suspense>
              <Proposals />
            </React.Suspense>
          ),
        },
        // {
        //   path: "/dao/success/:id",
        //   element: (
        //     <React.Suspense>
        //       <Success />
        //     </React.Suspense>
        //   ),
        // },
        {
          path: "/dao/voting/:proposalId",
          element: (
            <React.Suspense>
              <ProposalView />
            </React.Suspense>
          ),
        },
        {
          path: "/projects/projectdetails/:projectstatus/:pid/voting/:proposalId",
          element: (
            <React.Suspense>
              <ProposalView />
            </React.Suspense>
          ),
        },
        {
          path: "/dao/kyc",
          element: (
            <React.Suspense>
              <KycPage />
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
          path: "/castcrewsmembersview/:pjctId",
          element: (
            <React.Suspense>
              <CastandCrewMembersView />
            </React.Suspense>
          ),
        },
        {
          path: "/",
          element: <Navigate to="/dashboard" />,
          errorElement: <ErrorPage />,
        },
        {
          path:'/comingsoon',
          element:<ComingSoon/>,
          errorElement:<ErrorPage/>
        }
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

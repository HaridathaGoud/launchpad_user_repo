import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import rootReducer from "../reducers/rootReducer";
import authReducer from "../reducers/authReducer";
import proposalReducer from "../reducers/proposlaReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import votingReducer from "../reducers/votingReducer";
import marketPlaceReducer from "../reducers/marketPlaceReducer";
import layoutReducer from "../reducers/layoutReducer";
import portfolioReducer from "../reducers/portfolioReducer";
import strapiReducer from "../components/strapi/docs/strapiReducer";
import dashboardReducer from "../reducers/dashboardreducer";
import { hotCollectionReducer } from "../components/marketplace.component/hotcollections.component/reducer";
import marketPlaceProfileReducer from "../reducers/marketplaceProfileReducer";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};
const rootReducerState = combineReducers({
  auth: rootReducer,
  oidc: authReducer,
  proposal: proposalReducer,
  vtg: votingReducer,
  marketPlaceDashboard: marketPlaceReducer.marketPlaceDashboardReducer,
  exploreNfts: marketPlaceReducer.exploreNtfsReducer,
  layoutReducer: layoutReducer,
  portfolio: portfolioReducer,
  strapiData:strapiReducer,
  dashboardReducer:dashboardReducer,
  hotCollections:hotCollectionReducer,
  marketPlaceProfileReducer:marketPlaceProfileReducer.ntfsCollectionsReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducerState);
const middleware = [thunk];
const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
const persistor = persistStore(store);
export { store, persistor };

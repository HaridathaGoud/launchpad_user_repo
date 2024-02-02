import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import rootReducer from '../reducers/rootReducer';
import authReducer from '../reducers/authReducer';
import proposalReducer from "../components/Dao/proposal/proposlaReducer/proposlaReducer"
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import votingReducer from '../reducers/votingReducer';
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};
const rootReducerState = combineReducers({ 
  auth: rootReducer,
  oidc: authReducer,
  proposal:proposalReducer,
 vtg: votingReducer
 });
const persistedReducer = persistReducer(persistConfig, rootReducerState);
const middleware = [thunk];
const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(...middleware)));
const persistor = persistStore(store);
export { store, persistor };


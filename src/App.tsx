import React from "react";
import "./index.css";
import { WagmiConfig } from "wagmi";
import Routes from "./layout/routes";
import { Provider } from "react-redux";
import { store } from "./store";
import {wagmiConfig} from './appConfig'
const MyApp = () => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <Provider store={store}>
        <Routes />
      </Provider>
    </WagmiConfig>
  );
};

export default MyApp;

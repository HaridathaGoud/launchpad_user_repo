import React from "react";
import "./index.css";
import { WagmiConfig } from "wagmi";
import { Web3Modal } from "@web3modal/react";
import Routes from "./layout/routes";
import { Provider } from "react-redux";
import { store } from "./store";
import {wagmiConfig} from './appConfig'
const walletConnectProjectId: any =
  process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID;
const MyApp = () => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <Provider store={store}>
        <Routes />
        <Web3Modal
          themeVariables={{
            "--w3m-z-index": "9999",
            "--w3m-background-color": "#0067FD",
          }}
          projectId={walletConnectProjectId}
        />
      </Provider>
    </WagmiConfig>
  );
};

export default MyApp;

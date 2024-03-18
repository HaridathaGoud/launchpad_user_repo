import React from 'react';
import './index.css';
import { WagmiConfig, createConfig, configureChains } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { Web3Modal } from '@web3modal/react';
import { polygon, polygonMumbai } from 'viem/chains';
import Routes from './layout/routes';
import { Provider } from 'react-redux';
import { store } from './store';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
const walletConnectProjectId: any = process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID;
const { chains, publicClient } = configureChains(
  [polygon, polygonMumbai],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: process.env.REACT_APP_JSONRPC_URL || '',
      }),
    }),
  ],
);
const config = createConfig({
  autoConnect: true,
  connectors: [
    new InjectedConnector({
      chains,
      options: {
        name: 'Browser Wallet',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: walletConnectProjectId,
        metadata: {
          name: `${process.env.REACT_APP_TOKEN_SYMBOL} Launchpad`,
          description:
            `${process.env.REACT_APP_TOKEN_SYMBOL} Launchpad is a Create-to-Earn DAOs' launchpad and NFT marketplace that provides access to legendary creators for the wider entertainment community.`,
          icons: ['https://yellowblock.net/wp-content/uploads/2023/09/YB-Logo.svg'],
          url: 'https://dott.network/dashboard',
        },
      },
    }),
  ],
  publicClient
});
const MyApp = () => {
  return (
    <WagmiConfig config={config}>
      <Provider store={store}>
        <Routes />
        <Web3Modal
          themeVariables={{
            '--w3m-z-index': '9999',
            '--w3m-background-color': '#0067FD',
          }}
          projectId={walletConnectProjectId}
        />
      </Provider>
    </WagmiConfig>
  );
};

export default MyApp

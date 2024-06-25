import { createConfig, configureChains } from "wagmi";
import { polygon } from "viem/chains";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { AuthProvider } from "@arcana/auth";
import { ArcanaConnector } from "@arcana/auth-wagmi";
import { amoyNetwork } from "./utils/amoyConfig";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
const walletConnectProjectId: any = process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID;
const arcanaClientId: string = process.env.REACT_APP_ARCANA_CLIENT_ID || "";
let auth: AuthProvider | null=null;
if (!auth) {
  auth = new AuthProvider(`${arcanaClientId}`, { 
    position: 'right',     
    theme: 'light',
    alwaysVisible: false, 
    debug:false,   
    setWindowProvider: true,
    connectOptions: {
      compact: true 
    },
    // chainConfig: {
    //   chainId: process.env.REACT_APP_CHAIN_ID_NUMARIC,        
    //   rpcUrl: process.env.REACT_APP_RPC_URL,
    // },
});
}
window.onload = async function() {
  try{
    await auth?.init()
  }catch(error){
  }
};
export {auth}
export const arcana = (chains) => {
  return new ArcanaConnector({
    chains,
    options: {
      auth: auth,
    },
  });
};
const { chains, publicClient } = configureChains(
  [polygon, amoyNetwork],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: process.env.REACT_APP_JSONRPC_URL || "",
      }),
    }),
    alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_KEY as string }),
    publicProvider(),
  ]
);
export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    arcana(chains),
    new InjectedConnector({
      chains,
      options: {
        name: "Metamask",
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
  publicClient,
  // storage: createStorage({ storage: sessionStorage }), 
});
declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}

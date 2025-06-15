import { type Web3AuthContextConfig } from "@web3auth/modal/react";
import { WEB3AUTH_NETWORK, type Web3AuthOptions } from "@web3auth/modal";

const web3AuthOptions: Web3AuthOptions = {
  clientId: "BD3QCVQXNuAIJw334o-cl3_i1WgOCDB3MFLC2EU92pGonOCC5KVJlQ14ly02hKj9OMJRtpTuGHnXuDWuVO4iVU8", // Your Web3Auth Client ID
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
  chainConfig: {
    chainNamespace: "eip155",
    chainId: "0x1", // Ethereum Mainnet
    rpcTarget: "https://rpc.ankr.com/eth",
  },
  uiConfig: {
    theme: "dark",
    loginMethodsOrder: ["google", "facebook", "twitter"],
    appLogo: "https://your-logo-url.com/logo.png", // Optional: Add your app logo
  }
};

const web3AuthContextConfig: Web3AuthContextConfig = {
  web3AuthOptions,
};

export default web3AuthContextConfig;

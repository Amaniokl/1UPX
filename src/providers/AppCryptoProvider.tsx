// 'use client'
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { ContractTransactionResponse, ContractTransactionReceipt, ethers } from 'ethers';
import { CONNECT_STATES, Web3Context } from './Web3ContextProvider';
import SkyMainBrowser from '@decloudlabs/skynet/lib/services/SkyMainBrowser';
import SkyBrowserSigner from '@decloudlabs/skynet/lib/services/SkyBrowserSigner';
import SkyEtherContractService from '@decloudlabs/skynet/lib/services/SkyEtherContractService';
import toast from 'react-hot-toast';
import { APICallReturn, APIResponse, ContractAddresses, SkyContractService, SkyEnvConfigBrowser } from '@decloudlabs/skynet/lib/types/types';
import { useWeb3Auth } from '@web3auth/modal-react-hooks';
import { AppManager, BalanceSettler, BalanceStore, CollectionNFT, NFT, NFTRoles, ERC20, Subscription, SecondsCostCalculator, NFTMinter, NFTRoles__factory, Subscription__factory, NFTMinter__factory, ERC20__factory, SecondsCostCalculator__factory, AppManager__factory, BalanceSettler__factory, CollectionNFT__factory, NFT__factory, BalanceStore__factory, NFTFactory, NFTFactory__factory } from '@decloudlabs/skynet/lib/types/contracts';
import { chainContracts } from '@decloudlabs/skynet/lib/utils/constants';
import { apiCallWrapper } from '@decloudlabs/skynet/lib/utils/utils';

interface AppCryptoConfig {
  skyBrowser: SkyMainBrowser | null;
  initAppCrypto: ((address: string) => Promise<void>) | null;
}

export const AppCryptoContext = createContext<AppCryptoConfig>({
  skyBrowser: null,
  initAppCrypto: null,
});

interface Props {
  children: ReactNode;
}

export function AppCryptoContextProvider({ children }: Props) {
  const [skyBrowser, setSkyBrowser] = useState<SkyMainBrowser | null>(null);
  const web3Context = useContext(Web3Context);
  const { provider } = useWeb3Auth();

  class ContractService implements SkyContractService {
    selectedAccount: string;
    AppManager: AppManager;
    BalanceSettler: BalanceSettler;
    BalanceStore: BalanceStore;
    CollectionNFT: CollectionNFT;
    AgentNFT: NFT;
    SubnetNFT: NFT;
    NFTRoles: NFTRoles;
    SkyUSD: ERC20;
    Subscription: Subscription;
    SecondsCostCalculator: SecondsCostCalculator;
    NFTMinter: NFTMinter;
    provider: ethers.Provider;
    contractAddresses: ContractAddresses;
    signer: ethers.Signer;
    NFTFactory: NFTFactory;

    constructor(chainID: keyof typeof chainContracts) {
      const contractAddresses = chainContracts[chainID];
      // this.selectedAccount = walletAddress;
      this.contractAddresses = contractAddresses;

      const empty: any = {};

      this.AppManager = empty;
      this.BalanceSettler = empty;
      this.BalanceStore = empty;
      this.CollectionNFT = empty;
      this.AgentNFT = empty;
      this.SubnetNFT = empty;
      this.NFTRoles = empty;
      this.SkyUSD = empty;
      this.Subscription = empty;
      this.SecondsCostCalculator = empty;
      this.NFTMinter = empty;
      this.NFTFactory = empty;
      this.provider = empty;
      this.signer = empty;
      this.selectedAccount = empty;
    }

    setup = async () => {
      const contractAddresses = chainContracts['619'];
      const ethersProvider = new ethers.BrowserProvider(provider!);
      const signer = await ethersProvider.getSigner();
      this.selectedAccount = signer.address;
      this.signer = signer;
      this.provider = ethersProvider;

      this.AppManager = AppManager__factory.connect(contractAddresses.AppManager, signer);

      this.BalanceSettler = BalanceSettler__factory.connect(
        contractAddresses.BalanceSettler,
        signer
      );

      this.BalanceStore = BalanceStore__factory.connect(
        contractAddresses.BalanceStore,
        signer
      );

      this.CollectionNFT = CollectionNFT__factory.connect(
        contractAddresses.CollectionNFT,
        signer
      );

      this.AgentNFT = NFT__factory.connect(contractAddresses.AgentNFT, signer);

      this.SubnetNFT = NFT__factory.connect(contractAddresses.SubnetNFT, signer);

      this.NFTRoles = NFTRoles__factory.connect(contractAddresses.AgentAccessControl, signer);

      this.SecondsCostCalculator = SecondsCostCalculator__factory.connect(
        contractAddresses.SecondsCostCalculator,
        signer
      );

      this.SkyUSD = ERC20__factory.connect(contractAddresses.SkyUSD, signer);

      this.Subscription = Subscription__factory.connect(
        contractAddresses.Subscription,
        signer
      );

      this.NFTMinter = NFTMinter__factory.connect(
        contractAddresses.AgentNFTMinter,
        signer
      );

      this.NFTFactory = NFTFactory__factory.connect(
        contractAddresses.NFTFactory,
        signer
      );
    };



    async callContractWrite(
      apiCall: Promise<ContractTransactionResponse>
    ): Promise<APICallReturn<string>> {
      const result = await apiCallWrapper<ContractTransactionReceipt, any>(
        (async () => {
          const tr = await apiCall;
          const rc = await tr.wait();
          if (!rc) {
            throw new Error('Transaction receipt is null');
          }
          return rc;
        })(),
        (res) => res.hash
      );

      return result;
    }

    async callContractRead<K, T, E = Error>(
      apiCall: Promise<K>,
      format: (rowList: K) => T,
      modifyRet?: (param: APIResponse<K, E>) => APICallReturn<T, E>
    ): Promise<APICallReturn<T, E>> {
      const result = await apiCallWrapper<K, T, E>(
        (async () => {
          const tr = await apiCall;
          return tr;
        })(),
        format,
        modifyRet
      );

      return result;
    }
  }

  const initAppCrypto = async () => {
    try {
      const contractInstance = new ContractService(619);
      await contractInstance.setup();
      const defaultEnvConfig: SkyEnvConfigBrowser = {
        STORAGE_API: 'https://appsender.skynet.io/api/lighthouse',
        CACHE: {
          TYPE: "CACHE",
        },
      };

      const skyMainBrowser = new SkyMainBrowser(
         //@ts-ignore
        contractInstance!,
        contractInstance.selectedAccount,
        new SkyBrowserSigner(contractInstance.selectedAccount, contractInstance.signer),
        defaultEnvConfig
      );

      await skyMainBrowser.init(true);

      console.log("SkyMainBrowser:", skyMainBrowser);
      setSkyBrowser(skyMainBrowser);

    } catch (err: any) {
      const error: Error = err;
      toast.error(
        'Something went wrong. Please try reloading the page in a few minutes.', {
        position: 'top-right',
      }
      );
    }
  };

  const initContractInstance = async (selectedAccount: string, provider: any) => {
    if (!provider) return null;
    const signer = provider.getSigner();
    const constractService = new SkyEtherContractService(provider, signer, selectedAccount,619);
    return constractService;
  };

  useEffect(() => {
    if (web3Context.status !== CONNECT_STATES.CONNECTED || !provider || !('address' in web3Context)) return;
    initAppCrypto();
  }, [web3Context, provider]);

  return (
    <AppCryptoContext.Provider value={{ skyBrowser, initAppCrypto }}>
      {children}
    </AppCryptoContext.Provider>
  );
}

// src/utils/nftUtils.js (or .ts if using TypeScript)
import { ethers } from "ethers";
import NFTMinterABI from "../abis/NFTMinter.json";
import AgentNFTABI from "../abis/AgentNFT.json";

// Contract addresses
const NFT_MINTER_ADDRESS = "0x2F82E354301BFB65Babd2967a81ae1A695FAd20E";
const AGENT_NFT_ADDRESS = "0xb578643b5237E93DA88eaE928C83200aA225F031";

/**
 * Mints a new NFT for the specified account
 */
export async function mintNFTWithEthers(provider: any, selectedAccount: string) {
    try {
        const ethersProvider = new ethers.BrowserProvider(provider);
        const signer = await ethersProvider.getSigner();
        console.log("dfsaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",NFT_MINTER_ADDRESS)
        const nftMinter = new ethers.Contract(NFT_MINTER_ADDRESS, NFTMinterABI, signer);

        const tx = await nftMinter.mint(selectedAccount, AGENT_NFT_ADDRESS, {
            value: "0",
        });

        const receipt = await tx.wait();
        console.log("✅ NFT minted successfully:", receipt);
        return receipt;
    } catch (error) {
        console.error("❌ Error minting NFT:", error);
        throw error;
    }
}

/**
 * Fetches all NFTs owned by a user
 */
export async function fetchUserNFTs(provider: any, userAddress: string): Promise<string[]> {
    try {
      const ethersProvider = new ethers.BrowserProvider(provider);
      const contract = new ethers.Contract(AGENT_NFT_ADDRESS, AgentNFTABI, ethersProvider);
      console.log("dfsaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",NFT_MINTER_ADDRESS)
      // Get number of NFTs owned
      const balance: bigint = await contract.balanceOf(userAddress);
      const nftCount = Number(balance);
  
      const nftIds: string[] = [];
  
      for (let i = 0; i < nftCount; i++) {
        const tokenId = await contract.tokenOfOwnerByIndex(userAddress, i);
        nftIds.push(tokenId.toString());
      }
  
      return nftIds;
    } catch (error) {
      console.error("❌ Failed to fetch NFTs:", error);
      return [];
    }
  }

/**
 * Signs a message for authentication/decryption
 */
type UrsulaAuth = {
    userAddress: string;
    signature: string;
    message: string;
  };
  
  type APICallReturn<T> = {
    success: boolean;
    data: T | any;
  };
  
  export async function signUserForDecryption(
    provider: any,
    selectedAccount: string
  ): Promise<APICallReturn<UrsulaAuth>> {
    const message = Date.now().toString();
  
    try {
      const ethersProvider = new ethers.BrowserProvider(provider);
      const signer = await ethersProvider.getSigner();
  
      // Optional: Ensure signer matches selectedAccount
      const signerAddress = await signer.getAddress();
      if (signerAddress.toLowerCase() !== selectedAccount.toLowerCase()) {
        throw new Error("Signer address does not match selected account.");
      }
  
      const signature = await signer.signMessage(message);
  
      return {
        success: true,
        data: {
          userAddress: signerAddress,
          signature,
          message,
        },
      };
    } catch (err: any) {
      return {
        success: false,
        data: err,
      };
    }
  }
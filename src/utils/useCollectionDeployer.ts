import { useAccount } from "wagmi";
import {
  prepareWriteContract,
  writeContract,
  getWalletClient,
  waitForTransaction,
} from "wagmi/actions";
import ERC721 from "../contracts/erc721factory.json";
import ERC1155 from "../contracts/erc1155factory.json";
import USER721 from "../contracts/user721contract.json";
import USER1155 from "../contracts/user1155contract.json";
import Trade from "../contracts/trade.json";
import { ethers } from "ethers";
import PaymentToken from "../contracts/paymenttoken.json";
export type addressType = `0x${string}`;
export function useCollectionDeployer() {
  const { address } = useAccount();
  async function getSign(data_types: string[], values: any[]) {
    const nonce = Math.floor(new Date().getTime() / 1000);
    const hash = ethers.utils.solidityKeccak256(data_types, [...values, nonce]);
    const private_key: any = process.env.REACT_APP_OWNER_PRIVATE_KEY;
    const msgHash = ethers.utils.arrayify(hash);
    const wallet = new ethers.Wallet(private_key, provider());
    const signHash = await wallet.signMessage(msgHash);
    const signature = ethers.utils.splitSignature(signHash);
    return { signature, nonce };
  }
  function salt(contractAddress: string) {
    const randomValue = ethers.utils.randomBytes(32);
    const combined = ethers.utils.solidityPack(
      ["address", "address", "bytes32"],
      [contractAddress, address, ethers.utils.hexlify(randomValue)]
    );
    const salt = ethers.utils.solidityKeccak256(["bytes"], [combined]);
    return salt;
  }
  function provider() {
    const _provider = new ethers.providers.JsonRpcProvider(
      process.env.REACT_APP_ALCHEMY_PROVIDER
    );
    return _provider;
  }
  async function createonChainErc721Collection(
    name: string,
    symbol: string,
    tokenUriPrefix: string
  ) {
    return createERC721Collection(name, symbol, tokenUriPrefix);
  }
  async function createERC721Collection(
    name: string,
    symbol: string,
    tokenUriPrefix: string
  ) {
    const config = await prepareWriteContract({
      abi: ERC721.abi,
      address: process.env.REACT_APP_MARKETPLACE_ERC721_FACTORY as addressType,
      functionName: "deploy",
      args: [salt(process.env.REACT_APP_MARKETPLACE_ERC721_FACTORY as addressType), name, symbol, tokenUriPrefix],
    });
    return writeContract(config);
  }
  async function createonChainErc1155Collection(
    name: string,
    symbol: string,
    tokenUriPrefix: string
  ) {
    return createERC1155Collection(name, symbol, tokenUriPrefix);
  }
  async function createERC1155Collection(
    name: string,
    symbol: string,
    tokenUriPrefix: string
  ) {
    const config = await prepareWriteContract({
      abi: ERC1155.abi,
      address: process.env.REACT_APP_MARKETPLACE_ERC1115_FACTORY as addressType,
      functionName: "deploy",
      args: [salt(process.env.REACT_APP_MARKETPLACE_ERC1115_FACTORY as addressType), name, symbol, tokenUriPrefix],
    });
    return writeContract(config);
  }
  async function splitSign(hash: any) {
    const signature = ethers.utils.splitSignature(hash);
    return signature;
  }
  async function getSignatureForSale(
    contractAddress: addressType,
    tokenId: any,
    type: string,
    nftPrice: any
  ) {
    try{
      const unitPrice = (nftPrice * 10 ** 18).toString();
      const nonce = Math.floor(new Date().getTime() / 1000);
      const hash = ethers.utils.solidityKeccak256(
        ["address", "uint256", "address", "uint256", "uint256"],
        [
          contractAddress,
          tokenId,
          process.env.REACT_APP_ERC20WMATIC_TOKEN,
          unitPrice,
          nonce,
        ]
      );
      const msgHash = ethers.utils.arrayify(hash);
      const walletClient = await getWalletClient();
      const signHash = await walletClient?.signMessage({
        message: { raw: msgHash as addressType | Uint8Array },
      });
      const sign = await splitSign(signHash);
      return {status:true,data:JSON.stringify({ sign, nonce })}

    }catch(error){
      return {status:false,data:error}
    }
  }
  async function getBidConfirmation(nftPrice: any) {
    let unitPrice = Number(nftPrice);
    unitPrice = unitPrice * 10 ** 18;
    // let percentage= 0.01*nftPrice
    let percentage = (nftPrice * 1) / 100;
    // const _amount = ((Number(nftPrice) + percentage) * 10 ** 18).toString();
    const _amount = ethers.utils.parseUnits(
      (nftPrice+ percentage).toFixed(8),
      "ether"
    );
    let amount = _amount;
    await deposit(amount);
    await approveERC20(process.env.REACT_APP_MARKETPLACE_PROXY_CONTRACT, amount);
  }
  async function getSignatureForBid(
    contract_address: string,
    tokenId: any,
    nftPrice: any,
    quantity: any
  ) {
    // let unitPrice = Number(nftPrice);
    let qty = quantity;
    // unitPrice = unitPrice * 10 ** 18;
    const nftAddress = contract_address;
    // let percentage= 0.01*nftPrice
    let percentage = (nftPrice * 1) / 100;
    const _amount = ethers.utils.parseUnits(
      (nftPrice+ percentage).toFixed(8),
      "ether"
    );
    // const _amount = ((Number(nftPrice) + percentage) * 10 ** 18).toString();
    let amount = _amount;
    let nonce = Math.floor(new Date().getTime() / 1000);
    const hash = ethers.utils.solidityKeccak256(
      ["address", "uint256", "address", "uint256", "uint256", "uint256"],
      [
        nftAddress,
        tokenId,
        process.env.REACT_APP_ERC20WMATIC_TOKEN,
        amount,
        qty,
        nonce,
      ]
    );
    const msgHash: Uint8Array = ethers.utils.arrayify(hash);
    const walletClient = await getWalletClient();
    const signHash = await walletClient?.signMessage({
      message: { raw: msgHash as addressType | Uint8Array },
    });
    const sign = await splitSign(signHash);
    return JSON.stringify({ sign, nonce });
  }
  async function setApprovalForAll(
    contractAddress: addressType,
    callback: Function
  ) {
    try {
      const config = await prepareWriteContract({
        abi: USER721.abi,
        address: contractAddress,
        functionName: "setApprovalForAll",
        args: [process.env.REACT_APP_MARKETPLACE_PROXY_CONTRACT, true],
      });
      const receipt = await writeContract(config);
      // await waitForTransaction({hash:receipt.hash})
      await callback({ ok: true, data: receipt });
    } catch (error) {
      await callback({ ok: false, data: error });
    }
  }
  async function mintTo721(
    contractAddress: addressType,
    tokenURI: string,
    royaltyFee: number,
    callback: Function
  ) {
    try {
      const config = await prepareWriteContract({
        abi: USER721.abi,
        address: contractAddress,
        functionName: "mint",
        args: [tokenURI, royaltyFee],
        // gasLimit: 700000,
        // gasPrice: ethers.utils.parseUnits("50", "gwei"),
      });
      const receipt = await writeContract(config);
      if (receipt.hash) {
        const transaction = await waitForTransaction({ hash: receipt.hash });
        await callback({ ok: true, data: transaction });
      }
    } catch (error) {
      await callback({ ok: false, data: error });
    }
  }
  async function buyAsset(
    signature: string,
    type: string,
    contract_address: string,
    token_id: number,
    nft_price: number,
    creator_address: string,
    quantity: number
  ) {
    let sign = JSON.parse(signature);
    let unitPrice: any = nft_price;
    let assetOwner = creator_address;
    let qty = quantity;
    unitPrice = (unitPrice * 10 ** 18).toString();
    // let percentage= 0.01*nft_price
    let percentage = (nft_price * 1) / 100;
    const _amount = ethers.utils.parseUnits(
      (nft_price + percentage).toFixed(8),
      "ether"
    );
    let amount = _amount;
    let nftAddress = contract_address;
    let abi;
    type = type.replace("-", "");
    if (type === "ERC721") {
      abi = USER721.abi;
    } else {
      abi = USER1155.abi;
    }
    const orderStruct = [
      assetOwner,
      address,
      process.env.REACT_APP_ERC20WMATIC_TOKEN,
      nftAddress,
      type === "ERC721" ? 1 : 0,
      unitPrice,
      amount,
      token_id,
      qty,
    ];
    await deposit(amount);
    await approveERC20(process.env.REACT_APP_MARKETPLACE_PROXY_CONTRACT, amount);
    const config = await prepareWriteContract({
      abi: Trade.abi,
      address: process.env.REACT_APP_MARKETPLACE_TRADE_CONTRACT as addressType,
      functionName: "buyAsset",
      args: [
        orderStruct,
        [sign?.sign?.v, sign?.sign.r, sign?.sign.s, sign?.nonce],
      ],
    });
    const response= await writeContract(config);
    // await waitForTransaction({hash:response.hash});
    return response
  }
  async function acceptBid(
    contract_address: string,
    type: any,
    biddingPrice: any,
    token_id: any,
    signature: string,
    buyer_address: string,
    quantity: any
  ) {
    type = type.replace("-", "") === "ERC721" ? 1 : 0;
    let tokenID = token_id;
    let unitPrice = biddingPrice;
    let sign = JSON.parse(signature);
    let buyerAddress = buyer_address;
    let qty = quantity;
    unitPrice = (unitPrice * 10 ** 18).toString();
    let percentage = (biddingPrice * 1) / 100;
    const _amount = ethers.utils.parseUnits(
      (biddingPrice + percentage).toString(),
      "ether"
    );
    let amount = _amount;
    let nftAddress = contract_address;
    const orderStruct = [
      address,
      buyerAddress,
      process.env.REACT_APP_ERC20WMATIC_TOKEN,
      nftAddress,
      type,
      unitPrice,
      amount,
      tokenID,
      qty,
    ];
    const config = await prepareWriteContract({
      abi: Trade.abi,
      address: process.env.REACT_APP_MARKETPLACE_TRADE_CONTRACT as addressType,
      functionName: "executeBid",
      args: [orderStruct, [sign.sign.v, sign.sign.r, sign.sign.s, sign.nonce]],
    });
    const { hash } = await writeContract(config);
    //  await waitForTransaction({ hash });
    return hash
  }
  async function approveERC20(contractAddress: any, amount: any) {
    const wmaticToken: string = process.env.REACT_APP_ERC20WMATIC_TOKEN || "";
    const config = await prepareWriteContract({
      abi: PaymentToken.abi,
      address: wmaticToken as addressType,
      functionName: "approve",
      args: [contractAddress, amount],
    });
    // const { hash } = 
    return await writeContract(config);
    // return await waitForTransaction({ hash });
  }
  async function deposit(amount: any) {
    const wmaticToken: string = process.env.REACT_APP_ERC20WMATIC_TOKEN || "";
    const config = await prepareWriteContract({
      abi: PaymentToken.abi,
      address: wmaticToken as addressType,
      functionName: "deposit",
      value: amount,
    });
    // const { hash } = 
    return await writeContract(config);
    // return await waitForTransaction({ hash });
  }
  function parseError(message) {
    let _message =
      message?.details ||
      message?.cause?.reason ||
      message?.message ||
      message.fault;
    return _message;
  }

  return {
    createonChainErc721Collection,
    createonChainErc1155Collection,
    getSignatureForBid,
    getSignatureForSale,
    getSign,
    setApprovalForAll,
    buyAsset,
    acceptBid,
    approveERC20,
    getBidConfirmation,
    parseError,
    mintTo721,
  };
}

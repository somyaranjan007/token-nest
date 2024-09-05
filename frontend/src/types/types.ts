import { ethers } from "ethers";

export type ConnectWalletInterface = {
  provider: ethers.providers.Web3Provider | null;
  signer: ethers.providers.JsonRpcSigner | null;
  address: string | null;
  error: string | null;
  loading: boolean;
};

export type TokenType = {
  name: string;
  symbol: string;
  address: string;
  image: string;
};

export type BasketType = {
  name: string;
  assets: (TokenType & { percentage: `${number}%` })[];
  address: string;
};

export type BasketOfBasketsType = {
  name: string;
  assets: (BasketType & { percentage: `${number}%` })[];
  address: string;
};

export type BasketInfo = {
  addr: string;
  percent: number;
  image: string;
};

export type BasketTokenData = {
  name: string;
  symbol: string;
  address: string;
  percent: number;
  image: string;
  balance: string;
  balanceInUSD: string;
};

export type BasketData = {
  name: string;
  symbol: string;
  address: string;
  tokens: BasketTokenData[];
  createdAt: string;
  downVotes: string | null;
  upVotes: string | null;
  percent: string | null;
  balance: number | null;
  loading: boolean;
  error: string | null;
};

export type UserBasketOfBasketData = {
  name: string;
  symbol: string;
  address: string;
  basket: BasketData[];
  createdAt: string;
  balance: number;
  loading: boolean;
  error: string | null;
};

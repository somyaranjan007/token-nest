import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BasketData } from "../../types/types";
import { getBasketContract } from "../../utils/contracts";
import { getContract, readContract } from "thirdweb";
import { client, tenderlyMainnet } from "../../thirdWebInfo";
import {
  TokenContractABI,
  BASKET_FACTORY_CONTRACT_ADDRESS,
} from "../../utils/constant";

type UserBasketInitialState = {
  userTotalBasket: BasketData[] | null;
  loading: boolean;
  error: string | null;
};

const initialState: UserBasketInitialState = {
  userTotalBasket: null,
  loading: false,
  error: null,
};

export const getUserTotalBasket = createAsyncThunk(
  "getUserTotalBasket",
  async (address: string, { rejectWithValue }) => {
    console.log("fetching user total basket");
    try {
      let basketTotalBalanceUSD = 0;
      let userBasketData: BasketData[] = [];
      const getBasketFactoryContract = getBasketContract(
        BASKET_FACTORY_CONTRACT_ADDRESS,
        "FACTORY"
      );

      const totalBasketAddress = await readContract({
        contract: getBasketFactoryContract,
        method:
          "function getAllBaskets() public view returns (address[] memory)",
        params: [],
      });
      console.log("totalBasketAddress: : : : ", totalBasketAddress);
      let userBasketAddress: string[] = [];

      const userLpTokenPromises = totalBasketAddress.map(
        async (basketAddress) => {
          const getBasket = getBasketContract(basketAddress, "BASKET");
          const userLpToken = await readContract({
            contract: getBasket,
            method: "balanceOf",
            params: [address],
          });
          if (Number(userLpToken) > 0) {
            userBasketAddress.push(basketAddress);
          }
        }
      );

      await Promise.all(userLpTokenPromises);
      console.log("^^^^", userBasketAddress);

      const userBasketDataPromises = userBasketAddress.map(
        async (basketAddress) => {
          const getBasket = getBasketContract(basketAddress, "BASKET");
          const getBasketData = await readContract({
            contract: getBasket,
            method: "getBasketData",
            params: [],
          });
          const userLpToken = await readContract({
            contract: getBasket,
            method: "balanceOf",
            params: [address],
          });
          const totalSupply = await readContract({
            contract: getBasket,
            method: "totalSupply",
            params: [],
          });
          const userSharePercent = Number(userLpToken / totalSupply) * 100;

          const tokenPromises = getBasketData.basketTokens.map(
            async (token: any) => {
              const tokenContract = getContract({
                address: token.addr,
                abi: TokenContractABI.abi as any,
                client: client,
                chain: tenderlyMainnet,
              });

              const [tokenSymbol, tokenName, tokenDecimals] = await Promise.all(
                [
                  readContract({
                    contract: tokenContract,
                    method: "symbol",
                    params: [],
                  }),
                  readContract({
                    contract: tokenContract,
                    method: "name",
                    params: [],
                  }),
                  readContract({
                    contract: tokenContract,
                    method: "decimals",
                    params: [],
                  }),
                ]
              );

              const tokenBalance =
                Number(
                  await readContract({
                    contract: tokenContract,
                    method: "balanceOf",
                    params: [basketAddress],
                  })
                ) /
                10 ** Number(tokenDecimals);

              token.name = tokenName;
              token.symbol = tokenSymbol;
              token.balance = (Number(tokenBalance) * userSharePercent) / 100;
              token.balanceInUSD =
                (Number(tokenBalance) * userSharePercent) / 100;

              basketTotalBalanceUSD +=
                (Number(tokenBalance) * userSharePercent) / 100;
            }
          );

          await Promise.all(tokenPromises);

          userBasketData.push({
            name: getBasketData.name,
            symbol: getBasketData.symbol,
            address: getBasketData.tokenAddress,
            tokens: getBasketData.basketTokens,
            createdAt: getBasketData.createdAt,
            downVotes: getBasketData.downVotes,
            upVotes: getBasketData.upVotes,
            percent: null,
            balance: basketTotalBalanceUSD,
            loading: false,
            error: null,
          });

          basketTotalBalanceUSD = 0;
        }
      );

      await Promise.all(userBasketDataPromises);

      console.log(userBasketData);

      return { userBasketData };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const userTotalBasketSlice = createSlice({
  name: "userTotalBasket",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserTotalBasket.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserTotalBasket.fulfilled, (state, action) => {
      state.userTotalBasket = action.payload.userBasketData;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getUserTotalBasket.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default userTotalBasketSlice.reducer;

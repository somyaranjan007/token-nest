import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ConnectWalletInterface } from "../../types/types";
import { ethers } from "ethers";

const initialState: ConnectWalletInterface = {
  provider: null,
  signer: null,
  address: null,
  loading: false,
  error: null,
};

type ConnectWalletReturnType =
  | {
      provider: ethers.providers.Web3Provider;
      signer: ethers.providers.JsonRpcSigner;
      address: string;
    }
  | undefined;

export const connectWallet = createAsyncThunk<
  ConnectWalletReturnType,
  void,
  {}
>("connectWallet", async (_, { rejectWithValue }) => {
  try {
    if (typeof (window as any).ethereum != "undefined") {
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      return {
        provider: provider,
        signer: signer,
        address: address,
      };
    }
  } catch (error) {
    return rejectWithValue(error);
  }
});

const connectWalletSlice = createSlice({
  name: "connectWallet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(connectWallet.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(connectWallet.fulfilled, (state, action) => {
      state.loading = false;
      state.provider = action.payload?.provider ?? null;
      state.signer = action.payload?.signer ?? null;
      state.address = action.payload?.address ?? null;
    });
    builder.addCase(connectWallet.rejected, (state, action) => {
      console.log("error: ");
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default connectWalletSlice.reducer;

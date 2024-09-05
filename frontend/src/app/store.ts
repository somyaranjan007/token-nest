import { configureStore } from '@reduxjs/toolkit'
import connectWalletReducer from "./features/connectWalletSlice";
import totalBasketReducer from "./features/totalBasketSlice";
import userTotalBasketReducer from "./features/userTotalBasketSlice";
import userTotalBasketOfBasketReducer from "./features/userBasketOfBasketSlice";

export const store = configureStore({
    reducer: {
        connectWallet: connectWalletReducer,
        totalBasket: totalBasketReducer,
        userTotalBasket: userTotalBasketReducer,
        userTotalBasketOfBasket: userTotalBasketOfBasketReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
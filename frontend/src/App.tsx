import Header from "./components/Header";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import {
  useActiveAccount,
  useActiveWalletConnectionStatus,
} from "thirdweb/react";
import { connectWallet } from "./app/features/connectWalletSlice";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import BasketOfBaskets from "./pages/BasketOfBaskets";
import Dashboard from "./pages/Dashboard";
import Marketplace from "./pages/Marketplace";
import CreateBasket from "./pages/CreateBasket";
import { Toaster } from "react-hot-toast";
import CreateBasketOfBaskets from "./pages/CreateBasketOfBaskets";
import UserBaskets from "./pages/UserBaskets";
import UserTokens from "./pages/UserTokens";
import { getTotalBasket } from "./app/features/totalBasketSlice";
import { getUserTotalBasket } from "./app/features/userTotalBasketSlice";
import { getUserTotalBasketOfBasket } from "./app/features/userBasketOfBasketSlice";
import Home from "./pages/Home";

function AppRoutes() {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/marketplace">
        <Route index element={<Marketplace />} />
        <Route path="create-basket" element={<CreateBasket />} />
      </Route>
      <Route path="/basket-of-baskets">
        <Route index element={<BasketOfBaskets />} />
        <Route
          path="create-basket-of-baskets"
          element={<CreateBasketOfBaskets />}
        />
      </Route>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="user-baskets" element={<UserBaskets />} />
        <Route path="user-tokens" element={<UserTokens />} />
      </Route>
    </Routes>
  );
}

function App() {
  const dispatch = useAppDispatch();
  const walletData = useAppSelector((state) => state.connectWallet);
  const connectionStatus = useActiveWalletConnectionStatus();
  const account = useActiveAccount();

  useEffect(() => {
    if (connectionStatus === "connected") {
      dispatch(connectWallet()).then(() => {
        if (account) {
          dispatch(getTotalBasket());
          dispatch(getUserTotalBasket(account.address));
          dispatch(getUserTotalBasketOfBasket(account.address));
        }
      });
    } else {
      console.log("wallet not connected");
    }
  }, [connectionStatus]);

  console.log("walletData", walletData);

  return (
    <div className="h-screen w-screen bg-background-image bg-cover">
      <Header />
      <div className="h-full w-full pt-[100px]">
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
        <div className="z-[60]">
          <Toaster
            containerStyle={{
              zIndex: 10000,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

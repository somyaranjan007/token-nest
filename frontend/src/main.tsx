import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { store } from "./app/store.ts";
import { Provider } from "react-redux";
import { ThirdwebProvider } from "thirdweb/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ThirdwebProvider>
      <App />
    </ThirdwebProvider>
  </Provider>
);

import { client, tenderlyMainnet } from "../thirdWebInfo";
import { createWallet, walletConnect } from "thirdweb/wallets";
import { ConnectButton, lightTheme } from "thirdweb/react";

const ConnectWalletButton = () => {
  console.log(client);
  const wallets = [
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    walletConnect(),
  ];

  return (
    <ConnectButton
      client={client}
      chains={[tenderlyMainnet]}
      wallets={wallets}
      theme={lightTheme({
        colors: {
          primaryText: "#49E08C",
          primaryButtonBg: "#F5F5F51A",
          primaryButtonText: "#49E08C",
          connectedButtonBg: "#F5F5F51A",
          connectedButtonBgHover: "#F5F5F51A",
          modalBg: "#F5F5F51A",
          accentText: "#49E08C",
          accentButtonText: "#49E08C",
          accentButtonBg: "#F5F5F51A",
          secondaryText: "#C1C1C1",
          secondaryButtonText: "#49E08C",
          secondaryButtonBg: "#C1C1C1",
          secondaryButtonHoverBg: "#1C1C1C",
          secondaryIconColor: "#49E08C",
          secondaryIconHoverColor: "#1C1C1C",
          secondaryIconHoverBg: "#C1C1C1",
        },
      })}
      connectModal={{ size: "wide" }}
    />
  );
};

export default ConnectWalletButton;

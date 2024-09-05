import { Spinner } from "@material-tailwind/react";
import { useAppSelector } from "../app/hooks";
import TokenAssetsCard from "../components/TokenAssetsCard";

const UserTokens = () => {
  const tradeBaskets = useAppSelector(
    (state) => state.userTotalBasket.userTotalBasket
  );

  if (!tradeBaskets) {
    return (
      <div className="h-screen w-screen -translate-y-[100px] backdrop-blur-lg flex justify-center items-center">
        <div className="p-8 bg-custom-gray-2 rounded-lg shadow-2xl">
          <Spinner
            className="h-[75px] w-[75px]"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
        </div>
      </div>
    );
  }

  const totalAssets = tradeBaskets.reduce(
    (acc, curr) => acc + parseFloat((curr.balance ?? 0).toFixed(2)),
    0
  );

  const getAssetBalances = () => {
    var assetBalances: {
      [key: string]: {
        name: string;
        symbol: string;
        image: string;
        valueInUsd: number;
        balance: number;
        address: string;
      };
    } = {};

    tradeBaskets.forEach((basket) => {
      basket.tokens.forEach((tokens) => {
        const { symbol, name, image, address, balance, balanceInUSD } = tokens;
        if (!assetBalances[symbol]) {
          assetBalances[symbol] = {
            name,
            symbol,
            image,
            balance: 0,
            valueInUsd: 0,
            address,
          };
        }
        assetBalances[symbol].balance += parseFloat(
          parseFloat(balance).toFixed(2)
        );
        assetBalances[symbol].valueInUsd += parseFloat(
          parseFloat(balanceInUSD).toFixed(2)
        );
      });
    });

    return Object.values(assetBalances).map((asset) => ({
      name: asset.name,
      symbol: asset.symbol,
      image: asset.image,
      balance: asset.balance,
      valueInUsd: asset.valueInUsd,
      address: asset.address,
      percentageFromTotalOwned: (asset.valueInUsd / totalAssets) * 100,
    }));
  };

  const tokenAssets = getAssetBalances();

  return (
    <div className="h-full w-full flex flex-col gap-4 px-10 py-8">
      <TokenAssetsCard tokenAssets={tokenAssets} expanded />
    </div>
  );
};

export default UserTokens;

import { Button } from "@material-tailwind/react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { BasketInfo, BasketType } from "../types/types";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import BasketSelectorCard from "../components/BasketSelectorCard";
import CreateBasketOfBasketsCard from "../components/CreateBasketOfBasketsCard";
import { sendAndConfirmTransaction } from "thirdweb";
import { prepareTxForCreatingBasket } from "../utils/contracts";
import { useActiveAccount } from "thirdweb/react";
import { useAppDispatch } from "../app/hooks";
import { getUserTotalBasketOfBasket } from "../app/features/userBasketOfBasketSlice";

const CreateBasket = () => {
  const navigate = useNavigate();
  const [basketOfBasketsName, setBasketOfBasketsName] = useState<string>("");
  const [baskets, setBaskets] = useState<
    (BasketType & { percent: `${number}%` })[]
  >([]);
  const [basketSelectorOpen, setBasketSelectorOpen] = useState<boolean>(false);
  const account = useActiveAccount();
  const dispatch = useAppDispatch();

  const handleAddBasket = (basket: BasketType, percentage: `${number}%`) => {
    setBaskets((prev) => [...prev, { ...basket, percent: percentage }]);
  };

  const handleRemoveBasket = (basket: BasketType) => {
    setBaskets((prev) => prev.filter((b) => b.name !== basket.name));
  };

  const setBasketPercentage = (
    basket: BasketType,
    percentage: `${number}%`
  ) => {
    setBaskets((prev) => {
      const index = prev.findIndex((b) => b.name === basket.name);
      const newTokens = [...prev];
      newTokens[index].percent = percentage;
      return newTokens;
    });
  };

  const createBasketOfBaskets = async (
    name: string,
    symbol: string,
    selectedBasket: BasketInfo[]
  ) => {
    try {
      console.log(name);
      console.log(symbol);
      console.log(selectedBasket);
      console.log("*******__________*******");
      const transaction = prepareTxForCreatingBasket(
        name,
        symbol,
        selectedBasket,
        false,
        0
      );
      console.log(transaction);
      console.log(account);

      const result =
        account &&
        (await sendAndConfirmTransaction({
          transaction: transaction,
          account: account,
        }));
      console.log(result);
      if (result) {
        if (result.status === "success") {
          toast.success("Basket of Baskets created");
          dispatch(getUserTotalBasketOfBasket(account.address));
          navigate("/basket-of-baskets", {
            replace: true,
          });
        } else {
          toast.error("Something went wrong");
        }
      } else {
        toast.error("Result not found!");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  const handleCreateBasketOfBaskets = () => {
    if (basketOfBasketsName === "") {
      toast.error("Basket name cannot be empty");
      return;
    } else if (baskets.length === 0) {
      toast.error("Basket must have at least one token");
      return;
    }
    const totalPercentage = baskets
      .reduce(
        (acc, curr) =>
          acc + parseFloat(parseFloat(curr.percent.slice(0, -1)).toFixed(2)),
        0
      )
      .toFixed(2);
    if (totalPercentage !== "100.00") {
      toast.error("Percentages do not add up to 100%");
      toast.error("Current percentage: " + totalPercentage);
      return;
    }

    var basketSymbol: string | null = null;
    if (basketOfBasketsName.length > 5) {
      if (basketOfBasketsName.includes(" ")) {
        basketSymbol = basketOfBasketsName
          .split(" ")
          .map((word) => word[0])
          .slice(0, 5)
          .join("")
          .toUpperCase();
      } else if (basketOfBasketsName.includes("-")) {
        basketSymbol = basketOfBasketsName
          .split("-")
          .map((word) => word[0])
          .slice(0, 5)
          .join("")
          .toUpperCase();
      } else {
        basketSymbol = basketOfBasketsName.slice(0, 5).toUpperCase();
      }
    } else {
      basketSymbol = basketOfBasketsName.toUpperCase();
    }

    createBasketOfBaskets(
      basketOfBasketsName,
      basketSymbol,
      baskets.map((basket) => ({
        addr: basket.address,
        percent: parseFloat(basket.percent.slice(0, -1)),
        image: "",
      }))
    );
  };

  return (
    <div className="h-full w-full px-20 py-14">
      <div className="h-full w-full flex flex-col justify-between items-center gap-8 bg-custom-gray-2/20 backdrop-blur-3xl rounded-[20px] p-8">
        <div className="h-[calc(100%-75px)] w-full ">
          {basketSelectorOpen ? (
            <BasketSelectorCard
              baskets={baskets}
              addBasket={handleAddBasket}
              setBasketSelectorOpen={setBasketSelectorOpen}
            />
          ) : (
            <CreateBasketOfBasketsCard
              basketName={basketOfBasketsName}
              setBasketName={setBasketOfBasketsName}
              baskets={baskets}
              setBasketPercentage={setBasketPercentage}
              setBasketSelectorOpen={setBasketSelectorOpen}
              removeBasket={handleRemoveBasket}
            />
          )}
        </div>
        <Button
          className="flex items-center gap-2 bg-custom-gray-4/10 text-custom-green"
          onClick={handleCreateBasketOfBaskets}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Create Basket of Baskets <FaPlus />
        </Button>
      </div>
    </div>
  );
};

export default CreateBasket;

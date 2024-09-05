import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { BasketInfo, TokenType } from "../types/types";
import CreateBasketCard from "../components/CreateBasketCard";
import TokenSelectorCard from "../components/TokenSelectorCard";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { prepareTxForCreatingBasket } from "../utils/contracts";
import { sendAndConfirmTransaction } from "thirdweb";
import { useActiveAccount } from "thirdweb/react";
import { getTotalBasket } from "../app/features/totalBasketSlice";
import { useAppDispatch } from "../app/hooks";

const CreateBasket = () => {
  const navigate = useNavigate();
  const [basketName, setBasketName] = useState<string>("");
  const [tokens, setTokens] = useState<
    (TokenType & { percent: `${number}%` })[]
  >([]);
  const [tokenSelectorOpen, setTokenSelectorOpen] = useState<boolean>(false);
  const [amountInEth, setAmountInEth] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const account = useActiveAccount();
  const dispatch = useAppDispatch();

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleAddToken = (token: TokenType, percentage: `${number}%`) => {
    setTokens((prev) => [...prev, { ...token, percent: percentage }]);
  };

  const handleRemoveToken = (token: TokenType) => {
    setTokens((prev) => prev.filter((t) => t.name !== token.name));
  };

  const setTokenPercentage = (token: TokenType, percentage: `${number}%`) => {
    setTokens((prev) => {
      const index = prev.findIndex((t) => t.name === token.name);
      const newTokens = [...prev];
      newTokens[index].percent = percentage;
      return newTokens;
    });
  };

  const createBasket = async (
    name: string,
    symbol: string,
    selectedBasket: BasketInfo[]
  ) => {
    try {
      console.log(name);
      console.log(symbol);
      console.log(selectedBasket);
      console.log(amountInEth);
      const transaction = prepareTxForCreatingBasket(
        name,
        symbol,
        selectedBasket,
        true,
        amountInEth!
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
          toast.success("Basket created");
          dispatch(getTotalBasket());
          navigate("/marketplace", {
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

  const handleCreateBasket = () => {
    if (amountInEth === null) {
      toast.error("Amount in ETH cannot be empty");
      return;
    } else if (amountInEth < 0.01) {
      toast.error("Amount in ETH cannot be less than 0.01");
      return;
    }

    var basketSymbol: string | null = null;
    if (basketName.length > 5) {
      if (basketName.includes(" ")) {
        basketSymbol = basketName
          .split(" ")
          .map((word) => word[0])
          .slice(0, 5)
          .join("")
          .toUpperCase();
      } else if (basketName.includes("-")) {
        basketSymbol = basketName
          .split("-")
          .map((word) => word[0])
          .slice(0, 5)
          .join("")
          .toUpperCase();
      } else {
        basketSymbol = basketName.slice(0, 5).toUpperCase();
      }
    } else {
      basketSymbol = basketName.toUpperCase();
    }

    createBasket(
      basketName,
      basketSymbol,
      tokens.map((token) => ({
        addr: token.address,
        percent: parseFloat(token.percent.slice(0, -1)),
        image: token.image,
      }))
    );
  };

  return (
    <>
      <Dialog
        className="bg-gray-500/10 text-white !backdrop-blur-0"
        open={open}
        size="sm"
        handler={handleOpen}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <DialogHeader
          className="text-custom-green"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Create and Fund Basket
        </DialogHeader>
        <DialogBody
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <Typography
            color="black"
            variant="lead"
            className="text-white"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Enter the amount of ETH you want to invest
          </Typography>
          <Typography
            color="black"
            variant="small"
            className="mb-8 text-gray-400"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Note: Baskets do not provide tokens on withdrawal, but rather invest
            your ETH in the basket. You will be able to withdraw your ETH at any
            time.
          </Typography>
          <Input
            type="number"
            variant="outlined"
            color="white"
            className="[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none shadow-lg"
            label="Amount in ETH"
            value={amountInEth ?? ""}
            onChange={(e) => setAmountInEth(parseFloat(e.target.value) || null)}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            crossOrigin={undefined}
          />
        </DialogBody>
        <DialogFooter
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={handleCreateBasket}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <div className="h-full w-full px-20 py-14">
        <div className="h-full w-full flex flex-col justify-between items-center gap-8 bg-custom-gray-2/20 backdrop-blur-3xl rounded-[20px] p-8">
          <div className="h-[calc(100%-75px)] w-full ">
            {tokenSelectorOpen ? (
              <TokenSelectorCard
                tokens={tokens}
                addToken={handleAddToken}
                setTokenSelectorOpen={setTokenSelectorOpen}
              />
            ) : (
              <CreateBasketCard
                basketName={basketName}
                setBasketName={setBasketName}
                tokens={tokens}
                removeToken={handleRemoveToken}
                setTokenPercentage={setTokenPercentage}
                setTokenSelectorOpen={setTokenSelectorOpen}
              />
            )}
          </div>
          <Button
            className="flex items-center gap-2 bg-custom-gray-4/10 text-custom-green"
            onClick={() => {
              if (basketName === "") {
                toast.error("Basket name cannot be empty");
                return;
              } else if (tokens.length === 0) {
                toast.error("Basket must have at least one token");
                return;
              }
              const totalPercentage = tokens
                .reduce(
                  (acc, curr) =>
                    acc +
                    parseFloat(
                      parseFloat(curr.percent.slice(0, -1)).toFixed(2)
                    ),
                  0
                )
                .toFixed(2);
              if (totalPercentage !== "100.00") {
                toast.error("Percentages do not add up to 100%");
                toast.error("Current percentage: " + totalPercentage);
                return;
              }

              handleOpen();
            }}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Create Basket <FaPlus />
          </Button>
        </div>
      </div>
    </>
  );
};

export default CreateBasket;

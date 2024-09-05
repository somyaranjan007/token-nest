import { Button, Input, Spinner } from "@material-tailwind/react";
import { FaSearch, FaPlus, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { TbArrowBigDownFilled, TbArrowBigUpFilled } from "react-icons/tb";
import { useState } from "react";
import { BasketData } from "../types/types";
import CopyButton from "../components/CopyButton";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import toast from "react-hot-toast";
import { prepareContractCall, sendAndConfirmTransaction } from "thirdweb";
import { useActiveAccount } from "thirdweb/react";
import { ethers } from "ethers";
import { getBasketContract } from "../utils/contracts";
import { getTotalBasket } from "../app/features/totalBasketSlice";

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openedBasketIndex, setOpenedBasketIndex] = useState<number | null>(
    null
  );
  const [amountInEth, setAmountInEth] = useState<number | null>(null);
  const baskets = useAppSelector((state) => state.totalBasket.totalBasket);
  const account = useActiveAccount();
  const dispatch = useAppDispatch();

  if (!baskets) {
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

  const filteredBaskets = baskets.filter((basket) =>
    basket.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInvestInBasket = async (basket: BasketData) => {
    if (!amountInEth) {
      toast.error("Please enter amount in ETH");
      return;
    } else if (amountInEth < 0.01) {
      toast.error("Amount in ETH must be greater than 0.01");
      return;
    }

    try {
      if (account) {
        const basketTokenContract = getBasketContract(basket.address, "BASKET");
        const transaction = prepareContractCall({
          contract: basketTokenContract,
          method:
            "function depositBasketToken(address _to) public payable returns (bool)",
          params: [account?.address],
          value: BigInt(
            ethers.utils.parseEther(amountInEth.toString()).toBigInt()
          ),
          gas: BigInt(10000000),
        });

        const result = await sendAndConfirmTransaction({
          transaction: transaction,
          account: account,
        });

        console.log(result);

        if (result) {
          if (result.status === "success") {
            toast.success("Deposit successfully");
          } else {
            toast.error("Something went wrong");
          }
        } else {
          toast.error("Result not found!");
        }
      } else {
        toast.error("Connect your wallet!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
    setAmountInEth(null);
  };

  const handleUpvote = async (basket: BasketData) => {
    try {
      if (account) {
        const basketContract = getBasketContract(basket.address, "BASKET");
        const transaction = prepareContractCall({
          contract: basketContract,
          method: "function upVote() external",
          params: [],
          gas: BigInt(50000000),
        });

        const result = await sendAndConfirmTransaction({
          transaction: transaction,
          account: account,
        });
        if (result.status === "success") {
          toast.success("Upvote successfully");
          dispatch(getTotalBasket());
        } else {
          toast.error("Something went wrong");
        }
      } else {
        toast.error("Connect your wallet!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleDownvote = async (basket: BasketData) => {
    try {
      if (account) {
        const basketContract = getBasketContract(basket.address, "BASKET");
        const transaction = prepareContractCall({
          contract: basketContract,
          method: "function downVote() external",
          params: [],
          gas: BigInt(50000000),
        });

        const result = await sendAndConfirmTransaction({
          transaction: transaction,
          account: account,
        });
        if (result.status === "success") {
          toast.success("Downvote successfully");
          dispatch(getTotalBasket());
        } else {
          toast.error("Something went wrong");
        }
      } else {
        toast.error("Connect your wallet!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="h-full w-full px-20 py-14">
      <div className="h-full w-full bg-custom-gray-2/20 backdrop-blur-3xl rounded-[20px] p-6">
        <div className="h-10 w-full flex justify-between items-center mb-4">
          <div className="h-full grid grid-cols-[10fr_1fr_7fr]">
            <Button
              variant="text"
              className="text-white py-3"
              size="sm"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Most Upvote
            </Button>
            <div className="flex justify-center items-center">
              <div className="h-5/6 w-[1px] bg-white" />
            </div>
            <Button
              variant="text"
              className="text-white py-3"
              size="sm"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Latest
            </Button>
          </div>
          <div className="h-full flex items-center gap-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
              <Input
                type="text"
                color="white"
                placeholder="Search"
                label="Search"
                size="md"
                className="pl-10 rounded-full !border-[1px] !border-white placeholder:opacity-100 hover:shadow-xl"
                labelProps={{
                  className: "hidden",
                }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />
            </div>
            <a href="/marketplace/create-basket">
              <Button
                className="flex items-center gap-2 bg-custom-gray-4/10 text-custom-green"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Create Basket <FaPlus />
              </Button>
            </a>
          </div>
        </div>
        <div className="h-[calc(100%-60px)] space-y-4 overflow-y-auto">
          {filteredBaskets.length === 0 ? (
            <div className="h-full w-full flex justify-center items-center text-white text-2xl font-semibold">
              No baskets found
            </div>
          ) : (
            filteredBaskets.map((basket, index) => (
              <div
                key={index}
                className="bg-custom-gray-4/10 rounded-lg p-4 cursor-pointer"
                onClick={() =>
                  setOpenedBasketIndex((prev) =>
                    prev === index ? null : index
                  )
                }
              >
                <div className="h-full w-full px-4 my-0 flex justify-between items-center">
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="text-white text-xl font-semibold">
                      {basket.name}
                    </div>
                    <div className="w-[650px] grid grid-cols-4 justify-center items-center gap-4 mt-2">
                      {basket.tokens.slice(0, 4).map((token, idx) => (
                        <div
                          key={idx}
                          className="w-full flex justify-center items-center gap-2 text-white !text-base"
                        >
                          <div className="!text-semibold">{token.symbol}</div>

                          <img
                            src={token.image}
                            alt={token.symbol}
                            width={25}
                            height={25}
                          />
                          <div className="!text-medium">
                            {token.percent
                              .toString()
                              .split(".")[0]
                              .padStart(2, "0")}
                            .
                            {(
                              token.percent.toString().split(".")[1] || "0"
                            ).padEnd(2, "0")}
                            %
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="h-full w-[280px] px-4">
                    <div className="flex justify-center items-center gap-2 text-base">
                      <span className="text-gray-300">Address:</span>
                      <span className="flex justify-center items-center gap-2 text-white font-medium">
                        {basket.address.length > 18
                          ? basket.address.slice(0, 7) +
                            "..." +
                            basket.address.slice(-7)
                          : basket.address}
                        <CopyButton text={basket.address} />
                      </span>
                    </div>
                    <div className="ml-4 grid grid-cols-5 justify-center items-center">
                      <Button
                        variant="text"
                        size="lg"
                        color="white"
                        className="col-span-2 flex justify-center items-center gap-2 text-lg px-5 mx-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpvote(basket);
                        }}
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        <div className="h-[20px] w-[20px] flex justify-center items-center">
                          <TbArrowBigUpFilled className="h-[20px] w-[20px]" />
                        </div>
                        <span>{Number(basket.upVotes) || 0}</span>
                      </Button>
                      <Button
                        variant="text"
                        size="lg"
                        color="white"
                        className="col-span-2 flex justify-center items-center gap-2 text-lg px-5 mx-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownvote(basket);
                        }}
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        <div className="h-[20px] w-[20px] flex justify-center items-center">
                          <TbArrowBigDownFilled className="h-[20px] w-[20px]" />
                        </div>
                        <span>{Number(basket.downVotes) || 0}</span>
                      </Button>
                      <div className="flex justify-center items-center">
                        {openedBasketIndex === index ? (
                          <FaChevronUp
                            className="h-[18px] w-[18px]"
                            color="white"
                          />
                        ) : (
                          <FaChevronDown
                            className="h-[18px] w-[18px]"
                            color="white"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {openedBasketIndex === index && (
                  <div className="h-full w-full px-4 my-0 flex justify-between items-end">
                    <div className="h-full flex flex-col gap-2">
                      <div className="h-full w-[650px] grid grid-cols-4 justify-center items-center gap-4 mt-2">
                        {basket.tokens.slice(4).map((token, idx) => (
                          <div
                            key={idx}
                            className="w-full flex justify-center items-center gap-2 text-white !text-base"
                          >
                            <div className="!text-semibold">{token.symbol}</div>
                            <img
                              src={token.image}
                              alt={token.symbol}
                              width={25}
                              height={25}
                            />
                            <div className="!text-medium">
                              {token.percent
                                .toString()
                                .split(".")[0]
                                .padStart(2, "0")}
                              .
                              {(
                                token.percent.toString().split(".")[1] || "0"
                              ).padEnd(2, "0")}
                              %
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="w-[350px] grid grid-cols-[1fr_1fr] justify-center items-center gap-2 mb-2 ml-2"
                    >
                      <Input
                        type="number"
                        variant="outlined"
                        color="white"
                        className="[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none shadow-lg"
                        label="Amount in ETH"
                        value={amountInEth ?? ""}
                        onChange={(e) =>
                          setAmountInEth(parseFloat(e.target.value) || null)
                        }
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                        crossOrigin={undefined}
                      />
                      <Button
                        className="!bg-custom-gray-3/40 !text-custom-green"
                        onClick={() => handleInvestInBasket(basket)}
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        Invest In
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;

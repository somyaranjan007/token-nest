import { Button, Input, Spinner } from "@material-tailwind/react";
import { FaSearch, FaPlus, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useState } from "react";
// import { PiCaretUpDownDuotone } from "react-icons/pi";
import CopyButton from "../components/CopyButton";
import { UserBasketOfBasketData } from "../types/types";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import toast from "react-hot-toast";
import { useActiveAccount } from "thirdweb/react";
import {
  getContract,
  prepareContractCall,
  sendAndConfirmTransaction,
} from "thirdweb";
import { userBasketsContractABI } from "../abis/userBasketsContractABI";
import { client, tenderlyMainnet } from "../thirdWebInfo";
import { ethers } from "ethers";
import { getUserTotalBasketOfBasket } from "../app/features/userBasketOfBasketSlice";

const BasketOfBaskets = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openedBasketIndex, setOpenedBasketIndex] = useState<number | null>(
    null
  );
  const [amountInEth, setAmountInEth] = useState<number | null>(null);
  const dispatch = useAppDispatch();
  const basketOfBaskets = useAppSelector(
    (state) => state.userTotalBasketOfBasket.userTotalBasketOfBasket
  );
  const account = useActiveAccount();

  if (!basketOfBaskets) {
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

  const filteredBasketOfBaskets = basketOfBaskets.filter((basket) =>
    basket.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenAccordion = (index: number) => {
    setOpenedBasketIndex((prev) => (prev === index ? null : index));
    setAmountInEth(null);
  };

  const handleInvestInBasketOfBaskets = async (
    basketOfBaskets: UserBasketOfBasketData
  ) => {
    if (!amountInEth) {
      toast.error("Please enter amount in ETH");
      return;
    } else if (amountInEth < 0.01) {
      toast.error("Amount in ETH must be greater than 0.01");
      return;
    }

    try {
      if (account) {
        const basketTokenContract = getContract({
          address: basketOfBaskets.address,
          abi: userBasketsContractABI.abi as any,
          client: client,
          chain: tenderlyMainnet,
        });

        const transaction = prepareContractCall({
          contract: basketTokenContract,
          method: "function deposit(address _to) public payable",
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

        if (result) {
          if (result.status === "success") {
            toast.success("Deposit successfully");
            dispatch(getUserTotalBasketOfBasket(account.address));
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

  return (
    <div className="h-full w-full px-20 py-14">
      <div className="h-full w-full bg-custom-gray-2/20 backdrop-blur-3xl rounded-[20px] p-6">
        <div className="h-10 w-full flex justify-end items-center mb-4">
          {/* <Button
            variant="text"
            className="flex justify-center items-center gap-2 text-lg font-medium text-white py-3"
            size="sm"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Latest
            <PiCaretUpDownDuotone />
          </Button> */}

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
            <a href="/basket-of-baskets/create-basket-of-baskets">
              <Button
                className="flex items-center gap-2 bg-custom-gray-4/10 text-custom-green"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Create Basket of Basket <FaPlus />
              </Button>
            </a>
          </div>
        </div>
        <div className="h-[calc(100%-60px)] space-y-4 overflow-y-auto">
          {filteredBasketOfBaskets.length === 0 ? (
            <div className="h-full w-full flex justify-center items-center text-white text-2xl font-semibold">
              No baskets found
            </div>
          ) : (
            filteredBasketOfBaskets.map((basket, index) => (
              <div
                key={index}
                className="bg-custom-gray-4/10 rounded-lg p-4 cursor-pointer"
                onClick={() => handleOpenAccordion(index)}
              >
                <div className="h-full w-full px-4 my-0 flex justify-between items-center">
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="flex justify-start items-center gap-2">
                      <div className="text-white text-xl font-semibold">
                        {basket.name}
                      </div>
                      <div className="text-gray-300 text-sm font-regular">
                        {basket.createdAt}
                      </div>
                    </div>
                    <div className="w-[650px] grid grid-cols-4 justify-center items-center gap-4 mt-2">
                      {basket.basket.slice(0, 4).map((basket, idx) => (
                        <div
                          key={idx}
                          className="w-full flex justify-center items-center gap-2 text-white !text-base"
                        >
                          <div className="!text-semibold">{basket.name}</div>
                          <div className="!text-medium">
                            {(basket.percent || "0")
                              .toString()
                              .split(".")[0]
                              .padStart(2, "0")}
                            .
                            {(
                              (basket.percent || "0")
                                .toString()
                                .split(".")[1] || "0"
                            ).padEnd(2, "0")}
                            %
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="h-full w-[280px] px-4">
                    <div className="flex gap-2">
                      <div className="flex flex-col gap-2">
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
                        <div className="flex justify-center items-center gap-2 text-base">
                          <span className="text-gray-300">Total Assets:</span>
                          <span className="flex justify-center items-center gap-2 text-white font-medium">
                            {Number(basket.balance.toFixed(2))} US$
                          </span>
                        </div>
                      </div>
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
                        {basket.basket.slice(4).map((basket, idx) => (
                          <div
                            key={idx}
                            className="w-full flex justify-center items-center gap-2 text-white !text-base"
                          >
                            <div className="!text-semibold">{basket.name}</div>
                            <div className="!text-medium">
                              {(basket.percent || 0)
                                .toString()
                                .split(".")[0]
                                .padStart(2, "0")}
                              .
                              {(basket.percent || 0)
                                .toString()
                                .split(".")[1]
                                .padEnd(2, "0")}
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
                        onClick={() => handleInvestInBasketOfBaskets(basket)}
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

export default BasketOfBaskets;

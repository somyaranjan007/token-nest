import { Button, Input, Spinner } from "@material-tailwind/react";
import { BasketData } from "../types/types";
import { useState } from "react";
import CopyButton from "../components/CopyButton";
import { useAppSelector } from "../app/hooks";
import toast from "react-hot-toast";
import { ethers } from "ethers";
import {
  getContract,
  prepareContractCall,
  sendAndConfirmTransaction,
} from "thirdweb";
import { basketTokenContractABI } from "../abis/basketTokenContractABI";
import { client, tenderlyMainnet } from "../thirdWebInfo";
import { useActiveAccount } from "thirdweb/react";
import { getBasketContract } from "../utils/contracts";
import { maxUint256 } from "thirdweb/utils";

const UserBaskets = () => {
  const [openedBasketIndex, setOpenedBasketIndex] = useState<number | null>(
    null
  );
  const [amountInEth, setAmountInEth] = useState<number | null>(null);
  const tradeBaskets =
    useAppSelector((state) => state.userTotalBasket.userTotalBasket) || [];
  const account = useActiveAccount();

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
        const basketTokenContract = getContract({
          address: basket.address,
          abi: basketTokenContractABI.abi as any,
          client: client,
          chain: tenderlyMainnet,
        });

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

  const basketWithdraw = async (basketTokenContractAddress: string) => {
    try {
      if (account) {
        const basketTokenContract = getBasketContract(
          basketTokenContractAddress,
          "BASKET"
        );

        const approveTransaction = prepareContractCall({
          contract: basketTokenContract,
          method: "function approve(address spender, uint256 value)",
          params: [basketTokenContractAddress, maxUint256],
        });
        const approveResult = await sendAndConfirmTransaction({
          transaction: approveTransaction,
          account: account,
        });
        if (approveResult) {
          if (approveResult.status === "success") {
            toast.success("Withdraw successful");
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
  };

  const handleWithdrawFromBasket = (basket: BasketData) => {
    basketWithdraw(basket.address);
  };

  return (
    <div className="h-full w-full flex flex-col gap-4 px-10 py-8">
      <div className="h-full w-full px-20 py-14">
        <div className="h-full w-full bg-custom-gray-2/20 backdrop-blur-3xl rounded-[20px] p-6">
          <div className="w-full flex justify-start items-center p-4">
            <div className="text-white text-3xl font-semibold">
              Baskets Distribution
            </div>
          </div>
          <div className="h-[calc(100%-60px)] space-y-4 overflow-y-auto">
            {tradeBaskets.length === 0 ? (
              <div className="h-full w-full flex justify-center items-center text-white text-2xl font-semibold">
                No baskets found
              </div>
            ) : (
              tradeBaskets.map((basket, index) => (
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
                        {basket.tokens.slice(0, 4).map((tokens, idx) => (
                          <div
                            key={idx}
                            className="w-full flex justify-center items-center gap-2 text-white !text-base"
                          >
                            <div className="!text-semibold">
                              {tokens.symbol}
                            </div>

                            <img
                              src={tokens.image}
                              alt={tokens.symbol}
                              width={25}
                              height={25}
                            />
                            <div className="!text-medium">
                              {tokens.percent
                                .toString()
                                .split(".")[0]
                                .padStart(2, "0")}
                              .
                              {(
                                tokens.percent.toString().split(".")[1] || "0"
                              ).padEnd(2, "0")}
                              %
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="h-full w-[280px] px-4 flex flex-col items-end gap-2">
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
                      <div className="text-3xl text-white">
                        ${(basket.balance || 0).toFixed(2)}
                      </div>
                    </div>
                  </div>
                  {openedBasketIndex === index && (
                    <div className="h-full w-full px-4 my-0 flex justify-between items-end">
                      <div className="h-full flex flex-col gap-2">
                        <div className="h-full w-[650px] grid grid-cols-4 justify-center items-center gap-4 mt-2">
                          {basket.tokens.slice(4).map((tokens, idx) => (
                            <div
                              key={idx}
                              className="w-full flex justify-center items-center gap-2 text-white !text-base"
                            >
                              <div className="!text-semibold">
                                {tokens.symbol}
                              </div>

                              <img
                                src={tokens.image}
                                alt={tokens.symbol}
                                width={25}
                                height={25}
                              />
                              <div className="!text-medium">
                                {tokens.percent
                                  .toString()
                                  .split(".")[0]
                                  .padStart(2, "0")}
                                .
                                {(
                                  tokens.percent.toString().split(".")[1] || "0"
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
                          Deposit
                        </Button>
                        <Button
                          className="col-span-2 !bg-custom-gray-3/40 !text-custom-green"
                          onClick={() => handleWithdrawFromBasket(basket)}
                          placeholder={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                        >
                          Withdraw
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
    </div>
  );
};

export default UserBaskets;

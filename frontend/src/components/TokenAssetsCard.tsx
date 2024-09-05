import { Card } from "@material-tailwind/react";
import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { TokenType } from "../types/types";
import { useNavigate } from "react-router-dom";

const TokenAssetsCard = ({
  tokenAssets,
  expanded = false,
}: {
  tokenAssets: (TokenType & {
    balance: number;
    valueInUsd: number;
    percentageFromTotalOwned: number;
  })[];
  expanded?: boolean;
}) => {
  const navigate = useNavigate();
  return (
    <Card
      className="h-full w-full bg-custom-gray-4/10 backdrop-blur-3xl text-white p-5"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <div className="flex justify-between items-center">
        <div className="text-2xl font-medium">Token Assets</div>
        {!expanded && (
          <div
            className="flex items-center gap-1 text-sm font-normal select-none cursor-pointer"
            onClick={() => navigate("/user-tokens")}
          >
            More <FaChevronRight />
          </div>
        )}
      </div>
      <div className="h-full my-4 mx-6">
        {tokenAssets.length === 0 ? (
          <div className="h-full w-full flex justify-center items-center gap-1 text-lg">
            No token assets found.
            <a href="/marketplace" className="underline text-blue-500">
              Invest Now
            </a>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-6">
              <div className="col-span-4 flex flex-col justify-start items-start text-xl font-medium">
                Token
              </div>
              <div className="col-span-2 flex flex-col justify-end items-end text-xl font-medium">
                Balance
              </div>
            </div>
            <div className="mt-4 grid grid-cols-6 gap-3">
              {tokenAssets.map((token, index) => (
                <React.Fragment key={index}>
                  <div className="col-span-4 flex justify-start items-center gap-2">
                    <img
                      src={token.image}
                      alt={token.name}
                      className="w-8 h-8"
                    />
                    <div className="flex flex-col justify-center items-start">
                      <div className="text-base font-semibold">
                        {token.name}
                      </div>
                      <div className="text-xs">
                        <span className="font-semibold">
                          {token.percentageFromTotalOwned
                            .toString()
                            .split(".")[0]
                            .padStart(2, "0")}
                          .
                          {(
                            token.percentageFromTotalOwned
                              .toString()
                              .split(".")[1] || "0"
                          ).padEnd(2, "0")}
                          %
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 flex flex-col justify-center items-end text-base">
                    <div>
                      {(token.balance || 0).toFixed(2)} {token.symbol}
                    </div>
                    <div className="text-xs">
                      {token.valueInUsd.toFixed(2)} USD
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </>
        )}
      </div>
    </Card>
  );
};

export default TokenAssetsCard;

import { useState } from "react";
import { TokenType } from "../types/types";
import { tokens as tokensOptions } from "../constants/constants";
import { Badge, Button } from "@material-tailwind/react";
import { MdDone } from "react-icons/md";
import toast from "react-hot-toast";

const TokenSelectorCard = ({
  tokens,
  addToken,
  setTokenSelectorOpen,
}: {
  tokens: (TokenType & { percent: `${number}%` })[];
  addToken: (token: TokenType, percent: `${number}%`) => void;
  setTokenSelectorOpen: (open: boolean) => void;
}) => {
  const [selectedTokens, setSelectedTokens] = useState<TokenType[]>([]);

  return (
    <div className="h-full w-full flex flex-col justify-around items-center gap-2 bg-custom-gray-4/10 text-white rounded-lg p-6">
      <div className="h-[calc(100%-85px)] w-full grid grid-cols-3 grid-rows-4 gap-4 bg-custom-gray-4/10 rounded-lg p-4">
        {tokensOptions.map((token, index) => (
          <Badge
            key={index}
            color="green"
            content={<MdDone />}
            invisible={
              !selectedTokens.filter((t) => t.name === token.name).length
            }
          >
            <div
              onClick={
                selectedTokens.filter((t) => t.name === token.name).length > 0
                  ? () =>
                      setSelectedTokens(
                        selectedTokens.filter((t) => t.name !== token.name)
                      )
                  : () => {
                      const tokensAlreadyAdded = tokens.filter(
                        (t) => t.name === token.name
                      );
                      console.log(tokensAlreadyAdded);
                      if (tokensAlreadyAdded.length > 0) {
                        toast.error("Token already added");
                        return;
                      }
                      setSelectedTokens([...selectedTokens, token]);
                    }
              }
              className="w-full h-full flex justify-start items-center gap-4 bg-custom-gray-4/10 rounded-lg p-6 cursor-pointer"
            >
              <img src={token.image} alt={token.name} width={45} height={45} />
              <div className="text-2xl font-semibold">{token.name}</div>
            </div>
          </Badge>
        ))}
      </div>
      <div className="w-full flex justify-end items-center gap-2">
        <Button
          variant="outlined"
          color="red"
          onClick={() => {
            setSelectedTokens([]);
            setTokenSelectorOpen(false);
          }}
          className="w-32 flex justify-center items-center gap-2 text-white"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Cancel
        </Button>
        <Button
          onClick={
            selectedTokens.length > 0
              ? () => {
                  const maxAllowedPercentage =
                    100 -
                    tokens
                      .filter((t) => t.name !== selectedTokens[0].name)
                      .reduce(
                        (acc, curr) =>
                          acc + parseFloat(curr.percent.slice(0, -1)),
                        0
                      );
                  const percentagePerToken = parseInt(
                    (maxAllowedPercentage / selectedTokens.length).toFixed(0)
                  );
                  selectedTokens.forEach((token, index) => {
                    if (index === selectedTokens.length - 1) {
                      addToken(
                        token,
                        `${
                          maxAllowedPercentage -
                          percentagePerToken * (selectedTokens.length - 1)
                        }%`
                      );
                    } else {
                      addToken(token, `${Number(percentagePerToken)}%`);
                    }
                  });
                  setTokenSelectorOpen(false);
                  setSelectedTokens([]);
                }
              : () => {
                  toast.error("No token selected");
                }
          }
          variant="outlined"
          color="green"
          className="w-32 flex justify-center items-center gap-2 text-white"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default TokenSelectorCard;

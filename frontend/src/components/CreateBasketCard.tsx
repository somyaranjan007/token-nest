import { Input, Button, IconButton } from "@material-tailwind/react";
import { FaPlus } from "react-icons/fa";
import { TokenType } from "../types/types";
import toast from "react-hot-toast";
import { useEffect, useRef } from "react";
import { BsTrashFill } from "react-icons/bs";

const CreateBasketCard = ({
  basketName,
  setBasketName,
  tokens,
  removeToken,
  setTokenPercentage,
  setTokenSelectorOpen,
}: {
  basketName: string;
  setBasketName: (value: string) => void;
  tokens: (TokenType & { percent: `${number}%` })[];
  removeToken: (token: TokenType) => void;
  setTokenPercentage: (token: TokenType, percent: `${number}%`) => void;
  setTokenSelectorOpen: (value: boolean) => void;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [tokens.length]);

  return (
    <div className="h-full w-full flex flex-col justify-center items-center gap-3 bg-custom-gray-4/10 text-white rounded-lg p-6">
      <div className="flex justify-center items-baseline gap-2">
        <Input
          variant="static"
          size="lg"
          color="white"
          className="!text-xl !font-semibold !text-white placeholder:text-white placeholder:text-2xl placeholder:font-medium !border-white text-center"
          labelProps={{
            className: "hidden",
          }}
          placeholder="Enter Basket Name"
          value={basketName}
          onChange={(e) => setBasketName(e.target.value)}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          crossOrigin={undefined}
        />
      </div>
      <div
        ref={scrollRef}
        className="h-[calc(100vh-284px)] w-full flex flex-col justify-start items-center gap-4 overflow-y-auto"
      >
        {tokens.length == 0 ? (
          <div className="flex-1 flex justify-center items-center text-2xl font-medium">
            Add tokens to your basket
          </div>
        ) : (
          tokens.map((token, index) => (
            <div
              key={index}
              className="h-24 w-5/6 flex justify-center items-center gap-4"
            >
              <div className="text-2xl font-semibold">{index + 1}.</div>
              <div className="flex justify-between items-center gap-2 w-5/6 bg-custom-gray-4/10 p-4 rounded-lg">
                <div className="flex justify-center items-center gap-4">
                  <div className="text-3xl font-semibold">
                    {token.name} ({token.symbol})
                  </div>
                  <img
                    src={token.image}
                    alt={token.name}
                    className="h-10 w-10 rounded-full"
                  />
                </div>
                <div className="flex justify-between items-center gap-2">
                  <div className="w-32 text-2xl font-semibold bg-custom-gray-1/40 py-2 rounded-lg relative">
                    <Input
                      type="number"
                      className="!w-[115px] !pl-0 !ml-0 !text-3xl !font-semibold !text-white !border-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      labelProps={{
                        className: "hidden",
                      }}
                      value={token.percent.slice(0, -1)}
                      onChange={(e) => {
                        var value = parseInt(e.target.value || "0");
                        const percentage: `${number}%` = `${value}%`;
                        const maxAllowedPercentage =
                          100 -
                          tokens
                            .filter((t) => t.name !== token.name)
                            .reduce(
                              (acc, curr) =>
                                acc + parseInt(curr.percent.slice(0, -1)),
                              0
                            );
                        if (value > maxAllowedPercentage) {
                          toast.error("Maximum percentage reached");
                          return;
                        }
                        setTokenPercentage(token, percentage);
                      }}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                      crossOrigin={undefined}
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-3xl font-semibold">
                      %
                    </span>
                  </div>
                  <IconButton
                    variant="text"
                    color="white"
                    onClick={() => {
                      removeToken(token);
                    }}
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    <BsTrashFill size={25} />
                  </IconButton>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <Button
        onClick={() => setTokenSelectorOpen(true)}
        className="flex items-center gap-2 bg-custom-gray-1/40 text-custom-blue"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        Add Token <FaPlus />
      </Button>
    </div>
  );
};

export default CreateBasketCard;

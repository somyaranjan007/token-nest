import { Input, Button, IconButton } from "@material-tailwind/react";
import { FaPlus } from "react-icons/fa";
import { BasketType } from "../types/types";
import toast from "react-hot-toast";
import { useEffect, useRef } from "react";
import { BsTrashFill } from "react-icons/bs";

const CreateBasketOfBasketsCard = ({
  basketName,
  setBasketName,
  baskets,
  removeBasket,
  setBasketPercentage,
  setBasketSelectorOpen,
}: {
  basketName: string;
  setBasketName: (value: string) => void;
  baskets: (BasketType & { percent: `${number}%` })[];
  removeBasket: (basket: BasketType) => void;
  setBasketPercentage: (basket: BasketType, percent: `${number}%`) => void;
  setBasketSelectorOpen: (value: boolean) => void;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [baskets.length]);

  return (
    <div className="h-full w-full flex flex-col justify-center items-center gap-3 bg-custom-gray-4/10 text-white rounded-lg p-6">
      <div className="flex justify-center items-center gap-2">
        <Input
          variant="static"
          size="lg"
          color="white"
          className="!text-3xl !font-semibold !text-white placeholder:text-white placeholder:text-2xl placeholder:font-medium !border-none text-center"
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
        {baskets.length == 0 ? (
          <div className="flex-1 flex justify-center items-center text-2xl font-medium">
            Add baskets to your basket of baskets
          </div>
        ) : (
          baskets.map((basket, index) => (
            <div
              key={index}
              className="h-24 w-5/6 flex justify-center items-center gap-4"
            >
              <div className="text-2xl font-semibold">{index + 1}.</div>
              <div className="flex justify-between items-center gap-2 w-5/6 bg-custom-gray-4/10 p-4 rounded-lg">
                <div className="text-3xl font-semibold">{basket.name}</div>
                <div className="flex justify-between items-center gap-2">
                  <div className="w-32 text-2xl font-semibold bg-custom-gray-1/40 py-2 rounded-lg relative">
                    <Input
                      type="number"
                      className="!w-[115px] !pl-0 !ml-0 !text-3xl !font-semibold !text-white !border-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      labelProps={{
                        className: "hidden",
                      }}
                      value={basket.percent.slice(0, -1)}
                      onChange={(e) => {
                        var value = parseInt(e.target.value || "0");
                        const percentage: `${number}%` = `${value}%`;
                        const maxAllowedPercentage = (
                          100 -
                          baskets
                            .filter((b) => b.name !== basket.name)
                            .reduce(
                              (acc, curr) =>
                                acc + parseInt(curr.percent.slice(0, -1)),
                              0
                            )
                        );
                        if (value > maxAllowedPercentage) {
                          toast.error("Maximum percentage reached");
                          return;
                        }
                        setBasketPercentage(basket, percentage);
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
                      removeBasket(basket);
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
        onClick={() => setBasketSelectorOpen(true)}
        className="flex items-center gap-2 bg-custom-gray-1/40 text-custom-blue"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        Add Basket <FaPlus />
      </Button>
    </div>
  );
};

export default CreateBasketOfBasketsCard;

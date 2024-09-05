import { useState } from "react";
import { BasketType } from "../types/types";
import { Badge, Button, Spinner } from "@material-tailwind/react";
import { MdDone } from "react-icons/md";
import toast from "react-hot-toast";
import { useAppSelector } from "../app/hooks";

const BasketSelectorCard = ({
  baskets,
  addBasket,
  setBasketSelectorOpen,
}: {
  baskets: (BasketType & { percent: `${number}%` })[];
  addBasket: (basket: BasketType, percent: `${number}%`) => void;
  setBasketSelectorOpen: (open: boolean) => void;
}) => {
  const [selectedBaskets, setSelectedBaskets] = useState<BasketType[]>([]);
  const basketsOptions = useAppSelector(
    (state) => state.totalBasket.totalBasket
  );

  if (!basketsOptions) {
    return (
      <div className="h-full w-full bg-custom-gray-4/10 rounded-lg flex justify-center items-center">
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

  return (
    <div className="h-full w-full flex flex-col justify-around items-center gap-2 bg-custom-gray-4/10 text-white rounded-lg p-6">
      <div className="h-[calc(100%-85px)] w-full bg-custom-gray-4/10 rounded-lg p-4">
        {basketsOptions.length === 0 ? (
          <div className="w-full h-full flex justify-center items-center gap-1 text-xl">
            No basket found.
            <a
              href="/marketplace/create-basket"
              className="underline text-blue-500"
            >
              Create one
            </a>
          </div>
        ) : (
          <div className="w-full h-full grid grid-cols-3 grid-rows-4 gap-4">
            {basketsOptions.map((basket, index) => (
              <Badge
                key={index}
                color="green"
                content={<MdDone />}
                invisible={
                  !selectedBaskets.filter((b) => b.name === basket.name).length
                }
              >
                <div
                  onClick={
                    selectedBaskets.filter((b) => b.name === basket.name)
                      .length > 0
                      ? () =>
                          setSelectedBaskets(
                            selectedBaskets.filter(
                              (b) => b.name !== basket.name
                            )
                          )
                      : () => {
                          const tokensAlreadyAdded = baskets.filter(
                            (b) => b.name === basket.name
                          );
                          console.log(tokensAlreadyAdded);
                          if (tokensAlreadyAdded.length > 0) {
                            toast.error("Token already added");
                            return;
                          }
                          const x: BasketType = {
                            ...basket,
                            assets: basket.tokens.map((token) => ({
                              ...token,
                              percentage: `${token.percent}%`,
                            })),
                          };
                          setSelectedBaskets([...selectedBaskets, x]);
                        }
                  }
                  className="w-full h-full flex justify-start items-center gap-4 bg-custom-gray-4/10 rounded-lg p-6 cursor-pointer"
                >
                  <div className="text-2xl font-semibold">{basket.name}</div>
                </div>
              </Badge>
            ))}
          </div>
        )}
      </div>
      <div className="w-full flex justify-end items-center gap-2">
        <Button
          variant="outlined"
          color="red"
          onClick={() => {
            setSelectedBaskets([]);
            setBasketSelectorOpen(false);
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
            selectedBaskets.length > 0
              ? () => {
                  const maxAllowedPercentage =
                    100 -
                    baskets
                      .filter((b) => b.name !== selectedBaskets[0].name)
                      .reduce(
                        (acc, curr) =>
                          acc + parseFloat(curr.percent.slice(0, -1)),
                        0
                      );
                  const percentagePerToken = parseInt(
                    (maxAllowedPercentage / selectedBaskets.length).toFixed(0)
                  );
                  selectedBaskets.forEach((basket, index) => {
                    if (index === selectedBaskets.length - 1) {
                      addBasket(
                        basket,
                        `${
                          maxAllowedPercentage -
                          percentagePerToken * (selectedBaskets.length - 1)
                        }%`
                      );
                    } else {
                      addBasket(basket, `${Number(percentagePerToken)}%`);
                    }
                  });
                  setBasketSelectorOpen(false);
                  setSelectedBaskets([]);
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

export default BasketSelectorCard;

import { Card } from "@material-tailwind/react";

const TotalAssetsCard = ({ totalAssets }: { totalAssets: number }) => {
  return (
    <Card
      className="h-full w-full bg-custom-gray-4/10 backdrop-blur-3xl text-white p-5"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <div className="flex justify-start items-center">
        <div className="text-2xl font-medium">Total Assets</div>
      </div>
      <div className="m-4 flex justify-start items-center gap-2">
        <div className="text-2xl font-medium">Total Balance - </div>
        <div className="text-[2.5rem]/[3rem] font-medium">
          {totalAssets} US$
        </div>
      </div>
    </Card>
  );
};

export default TotalAssetsCard;

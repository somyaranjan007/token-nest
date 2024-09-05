import { useConnectModal } from "thirdweb/react";
import { Button } from "@material-tailwind/react";
import { createWallet, walletConnect } from "thirdweb/wallets";
import { client, tenderlyMainnet } from "../thirdWebInfo";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { connect, isConnecting } = useConnectModal();
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full -mt-[100px] overflow-y-auto snap-y snap-mandatory">
      <div className="relative h-screen flex justify-center items-center px-32 pt-24 pb-44 snap-start">
        <div className="relative w-full h-full text-white bg-custom-gray-4/10 backdrop-blur-3xl rounded-[20px] flex flex-col justify-center items-center">
          <div className="absolute bottom-[22%] left-1/2 -translate-x-[60%] -z-10">
            <img
              src="/circle.png"
              alt="home-bg"
              className="w-[360px] h-[360px] object-cover"
            />
          </div>
          <div className="flex flex-col translate-y-12 gap-6">
            <div className="text-7xl translate-x-24 font-bold">TOKEN NEST</div>
            <div className="w-[500px] translate-x-64 text-xl uppercase">
              Token Nest is a marketplace that facilitates the buying and
              selling of ERC7261 tokens organised in complex baskets, enabling
              streamlined transactions and enhanced asset management.
            </div>
          </div>
        </div>
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
          <Button
            className="w-96 bg-custom-gray-4/10 backdrop-blur-3xl text-custom-green rounded-2xl border-[0.1px] border-custom-green/50 shadow-custom-green/30 hover:shadow-custom-green/50 text-xl font-medium normal-case"
            onClick={() =>
              connect({
                chain: tenderlyMainnet,
                client: client,
                wallets: [
                  createWallet("io.metamask"),
                  createWallet("com.coinbase.wallet"),
                  walletConnect(),
                ],
              }).then(() => {
                navigate("/dashboard");
              })
            }
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {isConnecting ? "Connecting..." : "Connect Wallet"}
          </Button>
        </div>
      </div>
      <div className="relative h-screen flex justify-center items-center px-32 pt-24 pb-44 snap-start">
        <div className="relative w-full h-full text-white bg-custom-gray-4/10 backdrop-blur-3xl rounded-[20px] flex justify-center items-center gap-8">
          <div className="w-[600px] text-xl uppercase">
            <span className="font-bold mr-1">
              Basket Creation and Customization:
            </span>
            Design your own unique baskets of ERC7261 tokens, tailored to fit
            your investment strategies and preferences. This platform allows for
            personalized asset management, making it easy to adapt to changing
            market conditions.
          </div>
          <img
            src="/asset-1.png"
            alt="asset-1"
            className="w-[450px] h-[450px] object-cover"
          />
        </div>
      </div>
      <div className="relative h-screen flex justify-center items-center px-32 pt-24 pb-44 snap-start">
        <div className="relative w-full h-full text-white bg-custom-gray-4/10 backdrop-blur-3xl rounded-[20px] flex justify-center items-center gap-8">
          <img
            src="/asset-2.png"
            alt="asset-2"
            className="w-[450px] h-[450px] object-cover"
          />
          <div className="w-[550px] text-xl uppercase">
            <span className="font-bold mr-1">
              Interactive Community Engagement:
            </span>
            Engage with the marketplace community through a robust voting
            system. Upvote or downvote baskets to influence their visibility and
            trustworthiness, fostering a dynamic and participative investment
            environment.
          </div>
        </div>
      </div>
      <div className="relative h-screen flex justify-center items-center px-32 pt-24 pb-44 snap-start">
        <div className="relative w-full h-full text-white bg-custom-gray-4/10 backdrop-blur-3xl rounded-[20px] flex justify-center items-center gap-8">
          <div className="w-[600px] text-xl uppercase">
            <span className="font-bold mr-1">
              Investment and Analytics Platform:
            </span>
            Dive into a diverse array of baskets and invest with precision using
            real-time analytics and transparent transaction processes. This
            feature equips both novice and experienced investors with the tools
            needed for effective decision-making in the token economy.
          </div>
          <img
            src="/asset-3.png"
            alt="asset-3"
            className="w-[420px] h-[420px] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;

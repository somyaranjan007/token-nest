import ConnectWalletButton from "./ConnectWalletButton";

const Header = () => {
  const { pathname } = window.location;
  const selectedIndex = pathname.startsWith("/marketplace")
    ? 0
    : pathname.startsWith("/dashboard")
    ? 1
    : pathname.startsWith("/basket-of-baskets")
    ? 2
    : null;

  if (selectedIndex === null) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 h-[100px] w-full z-10 flex items-center justify-center bg-custom-gray-1/20 backdrop-blur-3xl rounded-b-3xl shadow-xl select-none">
      {["Marketplace", "Dashboard", "Basket of Baskets"].map((item, index) => (
        <a
          key={index}
          href={`/${item.toLowerCase().replace(/ /g, "-")}`}
          className={`h-full flex justify-center items-center text-white text-xl font-medium px-5 border-b-[6px] ${
            selectedIndex === index
              ? "border-white bg-custom-gray-3/20"
              : "border-transparent"
          }`}
        >
          <div className="translate-y-[3px]">{item}</div>
        </a>
      ))}
      <div className="absolute right-8 top-5">
        <ConnectWalletButton />
      </div>
    </div>
  );
};

export default Header;

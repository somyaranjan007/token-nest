import TelegramBot from "node-telegram-bot-api";
import { ethers } from "ethers";
import cron from "node-cron";
import { basketFactoryContractABI } from "./abis/basketFactoryContractABI.ts";
import { basketTokenContractABI } from "./abis/basketTokenContractABI.ts";

console.log("starting bot....");
// Initialize the bot with the token from environment variables
const token = "7189685058:AAE-KXiBHe1q1GIVGnudaqTa6JaLt2gttJU";
const bot = new TelegramBot(token, { polling: true });

// Set up provider and contract
const provider = new ethers.JsonRpcProvider(
  "https://virtual.mainnet.rpc.tenderly.co/04d3510d-01ad-4c97-9259-0bc2d169d87f"
);
const contractAddress = "0xE4a623C65eE82002f9D4200329ad2DFA06427d93";

// Create a contract instance
const contract = new ethers.Contract(
  contractAddress,
  basketFactoryContractABI,
  provider
);

// function getAllBaskets() public view returns (address[] memory) {
//         return allBasket;
//     }
// Function to call the contract and get basket data
async function getBaskets(method: "best" | "latest") {
  try {
    const basketAddresses: string[] = await contract["getAllBaskets"]();
    const baskets = await Promise.all(
      basketAddresses.map(async (basketAddress) => {
        const basketContract = new ethers.Contract(
          basketAddress,
          basketTokenContractABI,
          provider
        );
        const name = await basketContract["name"]();
        const symbol = await basketContract["symbol"]();
        return `${name} (${symbol})`;
      })
    );
    if (method === "best") {
      return baskets.slice(0, 10);
    } else {
      return baskets.slice(-10);
    }
  } catch (error: any) {
    console.error(`Error fetching baskets: ${error.message}`);
    return null;
  }
}

// Function to get all chat IDs (a simplified example)
let chatIds: number[] = [];

function addChatId(chatId: number) {
  if (!chatIds.includes(chatId)) {
    chatIds.push(chatId);
  }
}

// Set up the commands that will appear in the Telegram bot menu
bot.setMyCommands(
  [
    {
      command: "/start",
      description: "Greet the user and show available commands",
    },
    { command: "/bestbaskets", description: "Show the best baskets" },
    { command: "/latestbaskets", description: "Show the latest baskets" },
    { command: "/end", description: "End the conversation and say goodbye" },
  ],
  { scope: { type: "all_private_chats" } }
);

// /start command handler
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  addChatId(chatId);
  const welcomeMessage =
    `*Welcome to the Basket Bot!* 🧺\n\nHere are the available commands:\n\n` +
    `• /start - *Greet the user and show available commands*\n` +
    `• /bestbaskets - *Show the best baskets*\n` +
    `• /latestbaskets - *Show the latest baskets*\n` +
    `• /end - *End the conversation and say goodbye*`;
  bot.sendMessage(chatId, welcomeMessage, { parse_mode: "Markdown" });
});

// /bestbaskets command handler
bot.onText(/\/bestbaskets/, async (msg) => {
  const chatId = msg.chat.id;
  addChatId(chatId);
  bot.sendMessage(chatId, "🔍 *Fetching best baskets...*", {
    parse_mode: "Markdown",
  });
  const baskets = await getBaskets("best");

  if (baskets) {
    bot.sendMessage(
      chatId,
      `*Best Baskets to Invest In* 📈\n\n${baskets.join("\n")}`,
      { parse_mode: "Markdown" }
    );
  } else {
    bot.sendMessage(
      chatId,
      "❌ *Sorry, unable to retrieve best baskets at the moment.*",
      { parse_mode: "Markdown" }
    );
  }
});

// /latestbaskets command handler
bot.onText(/\/latestbaskets/, async (msg) => {
  const chatId = msg.chat.id;
  addChatId(chatId);
  bot.sendMessage(chatId, "🔍 *Fetching latest baskets...*", {
    parse_mode: "Markdown",
  });
  const baskets = await getBaskets("latest");

  if (baskets) {
    bot.sendMessage(chatId, `*Latest Baskets* 🆕\n\n${baskets.join("\n")}`, {
      parse_mode: "Markdown",
    });
  } else {
    bot.sendMessage(
      chatId,
      "❌ *Sorry, unable to retrieve latest baskets at the moment.*",
      { parse_mode: "Markdown" }
    );
  }
});

// /end command handler
bot.onText(/\/end/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "👋 *Goodbye! Thanks for using the Basket Bot.*", {
    parse_mode: "Markdown",
  });
});

// Handle unrecognized commands
bot.on("text", (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  const validCommands = [
    "/start",
    "/bestbaskets",
    "/trendingbaskets",
    "/latestbaskets",
    "/end",
  ];
  if (text && !validCommands.includes(text)) {
    bot.sendMessage(
      chatId,
      `⚠️ *Sorry, I didn't understand that command.*\n\nHere are the available commands:\n` +
        `• /start - *Greet the user and show available commands*\n` +
        `• /bestbaskets - *Show the best baskets*\n` +
        `• /trendingbaskets - *Show trending baskets*\n` +
        `• /latestbaskets - *Show the latest baskets*\n` +
        `• /end - *End the conversation and say goodbye*`,
      { parse_mode: "Markdown" }
    );
  }
});

// Schedule sending best baskets every morning and evening
const templates = [
  "🌅 *Good morning!*\n\nHere are the best baskets to invest in today:\n",
  "🌄 *Morning update!*\n\nConsider these top baskets:\n",
  "🌇 *Evening review!*\n\nCheck out these best baskets:\n",
  "🌆 *Evening update!*\n\nHere are the top baskets for your consideration:\n",
];

function getRandomTemplate() {
  return templates[Math.floor(Math.random() * templates.length)];
}

async function sendBestBaskets() {
  const baskets = await getBaskets("best");
  if (baskets) {
    const message = `${getRandomTemplate()}${baskets.join("\n")}`;
    chatIds.forEach((chatId) => {
      bot.sendMessage(chatId, message, { parse_mode: "Markdown" });
    });
  } else {
    console.error("Failed to retrieve best baskets for scheduled message.");
  }
}

// Schedule tasks: 8 AM and 8 PM daily
cron.schedule("0 8 * * *", sendBestBaskets);
cron.schedule("10 18 * * *", sendBestBaskets);

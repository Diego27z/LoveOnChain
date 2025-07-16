import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-verify";
import * as dotenv from "dotenv";

dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const BASESCAN_API_KEY = process.env.BASESCAN_API_KEY;

// Validaciones
if (!PRIVATE_KEY) {
  throw new Error("❌ PRIVATE_KEY no está definido en el archivo .env");
}
if (!PRIVATE_KEY.startsWith("0x")) {
  throw new Error("❌ PRIVATE_KEY debe comenzar con '0x'");
}

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  paths: {
    sources: "./contracts",
    artifacts: "../frontend/src/contracts", // Guarda los JSONs aquí
  },
  networks: {
    hardhat: {}, // Configuración local de Hardhat
    base: {
      url: "https://mainnet.base.org",
      accounts: [PRIVATE_KEY],
      chainId: 8453,
      gas: 200000, // Límite de gas aumentado
      gasPrice: 1000000000, // 1 Gwei (puedes ajustarlo)
    },
    baseSepolia: {
      // Opcional: configuración para testnet
      url: "https://sepolia.base.org",
      accounts: [PRIVATE_KEY],
      chainId: 84532,
    },
  },
  etherscan: {
    apiKey: {
      base: BASESCAN_API_KEY ?? "",
      baseSepolia: BASESCAN_API_KEY ?? "", // Misma API key para testnet
    },
    customChains: [
      {
        network: "base",
        chainId: 8453,
        urls: {
          apiURL: "https://api.basescan.org/api",
          browserURL: "https://basescan.org",
        },
      },
      {
        network: "baseSepolia",
        chainId: 84532,
        urls: {
          apiURL: "https://api-sepolia.basescan.org/api",
          browserURL: "https://sepolia.basescan.org",
        },
      },
    ],
  },
  sourcify: {
    enabled: true, // Para verificación en Sourcify
  },
};

export default config;

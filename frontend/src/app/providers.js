import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet, sepolia, polygon, baseSepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";

const config = createConfig({
  chains: [mainnet, sepolia, polygon, baseSepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [polygon.id]: http(),
    [baseSepolia.id]: http(),
  },
});

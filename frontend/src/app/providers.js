

const config = createConfig({
  chains: [mainnet, sepolia, polygon, baseSepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [polygon.id]: http(),
    [baseSepolia.id]: http(),
  },
});

import type { Metadata } from "next";
import { headers } from "next/headers";
import { createConfig, http } from "wagmi";
import { mainnet, sepolia, polygon, baseSepolia } from "wagmi/chains";

const config = createConfig({
  chains: [mainnet, sepolia, polygon, baseSepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [polygon.id]: http(),
    [baseSepolia.id]: http(),
  },
});

import "./globals.css";

import ContextProvider from "../../context";

export const metadata: Metadata = {
  title: "LoveOnChain",
  description: "Un registro matrimonial descentralizado",
  openGraph: {
    title: "Frontend web3 hackathon starter",
    description: "Frontend web3 hackathon starter",
    url: "https://frontend-web3-hackathon-starter.vercel.app",
    siteName: "Frontend web3 hackathon starter",
    type: "website",
    images: [
      {
        url: "assets/cover.jpg",
        alt: "Frontend web3 hackathon starter",
      },
    ],
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = headers();
  const cookies = cookieStore.toString();

  return (
    <html lang="en">
      <body className="antialiased">
        <ContextProvider cookies={cookies}>{children}</ContextProvider>
      </body>
    </html>
  );
}

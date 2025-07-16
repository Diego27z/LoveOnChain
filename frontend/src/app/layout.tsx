// frontend/src/app/layout.tsx

import type { Metadata } from "next";
// 1. ELIMINA la importación de 'headers'
// import { headers } from "next/headers"; 
import "./globals.css";
import ContextProvider from "../../context";

export const metadata: Metadata = {
  title: "LoveOnChain DApp",
  description: "Un registro matrimonial en la blockchain de Base.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 2. ELIMINA estas líneas que usan headers()
  // const cookieStore = headers();
  // const cookies = cookieStore.toString();

  return (
    <html lang="en">
      <body className="antialiased">
        {/* 3. Llama a ContextProvider sin la prop 'cookies' */}
        <ContextProvider>{children}</ContextProvider>
      </body>
    </html>
  );
}

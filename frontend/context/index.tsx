// frontend/context/index.tsx

"use client";

// Importamos la configuración ya hecha desde el archivo config
import { wagmiAdapter } from "../config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { type ReactNode } from "react";
import { cookieToInitialState, WagmiProvider, type Config } from "wagmi";

// Set up queryClient
const queryClient = new QueryClient();

// No necesitamos definir metadata aquí, appkit puede que lo tome de otro lado o no sea crucial ahora
// Para mantenerlo simple, podemos omitir la creación explícita de `modal` si no se usa.

function ContextProvider({
  children,
}: {
  children: ReactNode;
  cookies: string | null;
}) {


  // El componente se simplifica mucho, solo provee los contextos
 return (
    // 3. Llama a WagmiProvider sin 'initialState'
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

export default ContextProvider;

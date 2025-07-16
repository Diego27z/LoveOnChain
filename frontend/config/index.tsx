// frontend/config/index.tsx

// 1. VOLVEMOS a importar desde "@wagmi/core", como lo tenías originalmente.
// Esto es crucial para la compatibilidad con tu versión de @reown/appkit.
import { cookieStorage, createStorage } from "@wagmi/core";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
// 3. HACEMOS el cambio importante en las redes.
// Importamos 'baseSepolia' y quitamos 'mainnet' y 'base'.
import { base, baseSepolia } from "@reown/appkit/networks";

// Get projectId from https://cloud.walletconnect.com
export const projectId = "0febfada86f766656d6951d1cb6c6c54";

if (!projectId) {
  throw new Error("Project ID is not defined");
}

// 3. (Continuación) Definimos la nueva lista de redes.
export const networks = [base, baseSepolia];

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  // 2. MANTENEMOS la estructura original de 'storage' que no daba error.
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks, // <-- Aquí se usa la nueva lista de redes
});

export const config = wagmiAdapter.wagmiConfig;

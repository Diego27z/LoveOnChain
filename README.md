# ❤️ LoveOnChain: Registro Matrimonial en la Blockchain

## 📄 Resumen del Proyecto

**LoveOnChain** es una Aplicación Descentralizada (DApp) completamente funcional que permite a las parejas registrar simbólicamente su unión en la blockchain de **Base**. Este proyecto demuestra un ciclo de desarrollo Web3 de principio a fin, desde la creación de un contrato inteligente seguro en Solidity hasta la construcción de una interfaz de usuario reactiva y multi-red con Next.js y Wagmi.


##  Características Técnicas

- **Contrato Inteligente Seguro:** Escrito en **Solidity** y siguiendo los estándares de seguridad de OpenZeppelin (`Ownable`), el contrato gestiona la lógica de registro, divorcio y tarifas.
- **Despliegues Robustos:** Se utiliza **Hardhat Ignition** para asegurar despliegues deterministas y fiables tanto en redes de prueba como en la red principal.
- **Soporte Multi-Red:** La DApp es compatible y funciona de manera idéntica en **Base Mainnet** y **Base Sepolia Testnet**, con un sistema dinámico que selecciona las direcciones de contrato correctas según la red conectada.
- **Interfaz de Usuario Moderna:** Frontend construido con **Next.js** y **React**, utilizando un diseño limpio y animaciones CSS para una experiencia de usuario agradable.
- **Interacción Web3 Avanzada:** Se emplean los hooks más recientes de **Wagmi (v2)** y **Viem** para la gestión del estado de la wallet, la lectura de datos (`useReadContract`) y el envío de transacciones (`writeContract`, `waitForTransactionReceipt`), demostrando las mejores prácticas actuales.
- **Manejo de Tokens ERC20:** La DApp integra el pago de una tarifa en **USDC**, implementando el flujo completo de `approve` y `transferFrom`.


## ¿Cómo Probar el Proyecto?

**1. Prerrequisitos:**
   - Node.js (v18+)
   - npm o Yarn
   - Git

**2. Clonar el Repositorio:**
   bash
   git clone https://github.com/tu-usuario/love-on-chain.git
   cd love-on-chain


3. Instalar Dependencias:
Este comando instalará las dependencias tanto para el contract como para el frontend.

Generated bash
# Desde la raíz del proyecto
npm install && (cd contract && npm install) && (cd frontend && npm install)
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END

4. Configurar el Frontend:
El proyecto ya está configurado para usar los contratos que he desplegado. Las direcciones se encuentran en frontend/src/contracts/addresses.js. No necesitas desplegar tu propio contrato para probar el frontend.

5. Iniciar la Aplicación:
Desde la carpeta frontend, inicia el servidor de desarrollo.

Generated bash
cd frontend
npm run dev
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END

Abre http://localhost:3000 y sigue los mismos pasos de configuración de MetaMask del Método 1.


 Estructura del Contrato

El contrato MarriageRegistry.sol es el núcleo del proyecto. Sus funciones principales son:

marry(address, string): Registra una unión.

divorce(): Marca una unión como inactiva.

setMarriageFee(uint256): Función administrativa para el dueño.

withdrawTokens(): Función administrativa para el dueño.


Generated code
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
IGNORE_WHEN_COPYING_END

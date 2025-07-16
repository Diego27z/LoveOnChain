"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useAccount, useReadContract, useConfig } from "wagmi";
import {
  writeContract,
  waitForTransactionReceipt,
  readContract,
} from "wagmi/actions";

import {
  marriageRegistryAddresses,
  usdcTokenAddresses,
} from "../contracts/addresses";
import MarriageForm from "../components/MarriageForm";
import MarriageDetails from "../components/MarriageDetails";

const CONTRACT_ABI = [
  // Pega aquí el contenido completo del archivo MarriageRegistry.json
  // Ejemplo: { "inputs": [...], "name": "...", ... }, { ... }
  {
    inputs: [
      {
        internalType: "address",
        name: "_feeTokenAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_initialFee",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "partner1",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "partner2",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "Divorced",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "partner1",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "partner2",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "message",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "MarriageCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "divorce",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "feeToken",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "getMarriageDetails",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "partner1",
            type: "address",
          },
          {
            internalType: "address",
            name: "partner2",
            type: "address",
          },
          {
            internalType: "string",
            name: "message",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isActive",
            type: "bool",
          },
        ],
        internalType: "struct MarriageRegistry.Marriage",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "isMarried",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "marriageFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "marriages",
    outputs: [
      {
        internalType: "address",
        name: "partner1",
        type: "address",
      },
      {
        internalType: "address",
        name: "partner2",
        type: "address",
      },
      {
        internalType: "string",
        name: "message",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isActive",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_partner",
        type: "address",
      },
      {
        internalType: "string",
        name: "_message",
        type: "string",
      },
    ],
    name: "marry",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newFeeTokenAddress",
        type: "address",
      },
    ],
    name: "setFeeToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_newFee",
        type: "uint256",
      },
    ],
    name: "setMarriageFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_tokenAddress",
        type: "address",
      },
    ],
    name: "withdrawTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const ERC20_ABI_MIN = [
  {
    constant: false,
    inputs: [
      {
        name: "spender",
        type: "address",
      },
      {
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

export default function HomePage() {
  const { address: account, chain, isConnected } = useAccount();
  const config = useConfig();

  const [marriageDetails, setMarriageDetails] = useState(null);
  const [marriageFee, setMarriageFee] = useState("0");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const currentChainId = chain?.id;
  const contractAddress = currentChainId
    ? marriageRegistryAddresses[currentChainId]
    : null;
  const feeTokenAddress = currentChainId
    ? usdcTokenAddresses[currentChainId]
    : null;

  const { data: isMarried, refetch: refetchIsMarriedStatus } = useReadContract({
    address: contractAddress,
    abi: CONTRACT_ABI,
    functionName: "isMarried",
    args: [account],
    query: { enabled: !!account && !!contractAddress },
  });

  const { data: feeData } = useReadContract({
    address: contractAddress,
    abi: CONTRACT_ABI,
    functionName: "marriageFee",
    query: { enabled: !!contractAddress },
  });

  useEffect(() => {
    if (feeData) {
      setMarriageFee(ethers.formatUnits(feeData, 6));
    }
  }, [feeData]);

  useEffect(() => {
    const fetchMarriageDetails = async () => {
      if (isMarried && account && contractAddress) {
        try {
          const details = await readContract(config, {
            address: contractAddress,
            abi: CONTRACT_ABI,
            functionName: "getMarriageDetails",
            args: [account],
          });
          setMarriageDetails(details);
        } catch (e) {
          console.error(
            "No se pudieron obtener los detalles del matrimonio:",
            e
          );
        }
      } else {
        setMarriageDetails(null);
      }
    };

    fetchMarriageDetails();
  }, [isMarried, account, contractAddress, config]);

  const handleMarry = async (partnerAddress, message) => {
    if (!contractAddress || !feeTokenAddress) {
      setError(
        "Dirección de contrato no encontrada. ¿Estás en la red correcta?"
      );
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      console.log("Paso 1: Aprobación...");
      const feeInSmallestUnit = ethers.parseUnits(marriageFee, 6);
      const approveHash = await writeContract(config, {
        address: feeTokenAddress,
        abi: ERC20_ABI_MIN,
        functionName: "approve",
        args: [contractAddress, feeInSmallestUnit],
      });
      await waitForTransactionReceipt(config, { hash: approveHash });
      console.log("¡Aprobación confirmada!");

      console.log("Paso 2: Matrimonio...");
      const marryHash = await writeContract(config, {
        address: contractAddress,
        abi: CONTRACT_ABI,
        functionName: "marry",
        args: [partnerAddress, message],
      });
      await waitForTransactionReceipt(config, { hash: marryHash });
      console.log("¡Matrimonio registrado!");

      await refetchIsMarriedStatus(); // Actualiza el estado isMarried
    } catch (err) {
      console.error("Error:", err);
      setError(err.shortMessage || err.message || "Ocurrió un error.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- FUNCIÓN DE DIVORCIO---
  const handleDivorce = async () => {
    if (!contractAddress) return;
    setIsLoading(true);
    setError("");
    try {
      const hash = await writeContract(config, {
        address: contractAddress,
        abi: CONTRACT_ABI,
        functionName: "divorce",
      });
      await waitForTransactionReceipt(config, { hash });
      alert("El divorcio ha sido procesado.");
      await refetchIsMarriedStatus();
    } catch (err) {
      console.error("Error al divorciarse:", err);
      setError(err.shortMessage || "Ocurrió un error al procesar el divorcio.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container">
      <header>
        <h1>❤️LoveOnChain❤️</h1>
        <p>Una forma inmutable de registrar tu unión en la blockchain.</p>
      </header>

      {isConnected ? (
        <div className="wallet-info">
          <p>
            Conectado como:{" "}
            <strong>{`${account?.substring(0, 6)}...${account?.substring(
              account.length - 4
            )}`}</strong>
            <br />
            Red: <strong>{chain?.name}</strong>
          </p>
        </div>
      ) : (
        <div className="wallet-info">
          <p>Por favor, conecta tu wallet para empezar.</p>
        </div>
      )}

      {isLoading && <p className="loading-text">Procesando transacción...</p>}
      {error && <p className="error-text">{error}</p>}

      {isConnected && !contractAddress && (
        <p className="error-text">
          Red no soportada. Por favor, cambia a Base o Base Sepolia.
        </p>
      )}

      {isConnected &&
        contractAddress &&
        (isMarried ? (
          // Ahora pasamos la función handleDivorce real
          <MarriageDetails
            details={marriageDetails}
            onDivorce={handleDivorce}
          />
        ) : (
          <MarriageForm
            currentUserAddress={account}
            onMarrySubmit={handleMarry}
            fee={marriageFee}
            feeTokenSymbol="USDC"
            isLoading={isLoading}
          />
        ))}
    </main>
  );
}

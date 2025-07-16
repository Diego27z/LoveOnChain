import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers } from "hardhat";

const FEE_TOKEN_ADDRESS_TESTNET = "0x036CbD53842c5426634e7929541eC2318f3dCF7e";

const MARRIAGE_FEE: bigint = ethers.parseUnits("1", 6); // 10 USDC

// ========================================================================================

const MarriageRegistryModule = buildModule("MarriageRegistryModule", (m) => {
  const feeTokenAddress = m.getParameter(
    "_feeTokenAddress",
    FEE_TOKEN_ADDRESS_TESTNET
  );
  const initialFee = m.getParameter("_initialFee", MARRIAGE_FEE);

  const marriageRegistry = m.contract("MarriageRegistry", [
    feeTokenAddress,
    initialFee,
  ]);

  return { marriageRegistry };
});

export default MarriageRegistryModule;

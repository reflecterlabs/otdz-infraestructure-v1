
import { useEffect, useState, useCallback, useMemo } from "react";
import { useFetchWallet } from "./useFetchWallet";
import { Contract, RpcProvider, shortString, hash, num } from "starknet";
import { IDENTITY_REGISTRY_ABI, CONTRACTS, MAINNET_RPC_URL } from "@optz/shared-configs";
import { useExecuteWithSession, useChipiSession } from "@chipi-stack/nextjs";

export interface UseAgentWalletReturn {
    wallet: any;
    agentId: string | null;
    isLoading: boolean;
    isRegistering: boolean;
    error: any;
    registerAgent: (tokenUri: string, metadata?: { key: string, value: string }[]) => Promise<void>;
    refetch: () => void;
}

/**
 * useAgentWallet Hook - Vibe-Proof Edition (Fixes applied)
 * 
 * Orchestrates the ERC-8004 identity registration on Starknet Mainnet.
 */
export const useAgentWallet = (): UseAgentWalletReturn => {
    const { wallet, isLoading: isFetchingWallet, error, refetch, compositeId } = useFetchWallet();
    const provider = useMemo(() => new RpcProvider({ nodeUrl: MAINNET_RPC_URL }), []);

    // Session state from chipi
    const { session } = useChipiSession({} as any);

    const chipiNav: any = useExecuteWithSession();
    const { executeWithSessionAsync } = chipiNav;
    const isChipiPending = chipiNav.isPending || chipiNav.isLoading || chipiNav.status === "pending";

    const [agentId, setAgentId] = useState<string | null>(null);
    const [isLocalRegistering, setIsLocalRegistering] = useState(false);
    const [hasAttemptedAutoReg, setHasAttemptedAutoReg] = useState(false);

    const isRegistering = isLocalRegistering || isChipiPending;
    const isLoading = isFetchingWallet || isRegistering;

    const checkRegistration = useCallback(async () => {
        if (!wallet?.address) return;
        const storedAgentId = localStorage.getItem(`agent_id_${wallet.address}`);
        if (storedAgentId) setAgentId(storedAgentId);
    }, [wallet?.address]);

    const registerAgent = async (tokenUri: string, metadata: { key: string, value: string }[] = []) => {
        if (!wallet?.address || !session || isLocalRegistering) {
            console.warn("Skip registration: Missing wallet, session or already in progress");
            return;
        }

        setIsLocalRegistering(true);
        try {
            const registryAddress = CONTRACTS.mainnet.identityRegistry;

            if (!registryAddress || registryAddress === "0x0000000000000000000000000000000000000000000000000000000000000000") {
                throw new Error("Identity Registry address not configured in shared-configs.");
            }

            console.log("🔐 Orchestrating ERC-8004 registration on Mainnet:", wallet.address);

            const contract = new Contract(IDENTITY_REGISTRY_ABI, registryAddress, provider);

            // Using encodeShortString specifically for Starknet.js v6
            const metadataFelts = metadata.map(m => [
                shortString.encodeShortString(m.key),
                shortString.encodeShortString(m.value)
            ]);

            // Populate the call
            const call = contract.populate("register_with_metadata", [
                tokenUri,
                metadataFelts
            ]);

            console.log("✅ Serialized calldata:", call.calldata);

            // Execute via Chipi Session (Sponsored/Gasless)
            const result = await (executeWithSessionAsync as any)({
                params: { externalUserId: compositeId || "" },
                transactions: [
                    {
                        contractAddress: registryAddress,
                        entrypoint: "register_with_metadata",
                        calldata: call.calldata
                    }
                ]
            });

            console.log("🟢 Registration TX sent:", result?.transaction_hash);

            // Wait for transaction and parse events
            console.log("⌛ Waiting for transaction confirmation...");
            const receipt = await provider.waitForTransaction(result.transaction_hash);

            // Search for Transfer event to get the tokenId (Agent ID)
            const transferSelector = hash.getSelectorFromName("Transfer");

            // Casting receipt to any to bypass union type restrictions on events property
            const transferEvent = (receipt as any).events?.find((e: any) => e.keys?.[0] === transferSelector);

            let realAgentId = null;
            if (transferEvent) {
                // tokenId is usually at index 2 (low) and 3 (high) in data for uint256
                const low = transferEvent.data[2];
                const high = transferEvent.data[3] || "0";

                // Using BigInt constructor instead of literals for ES2017 compatibility
                realAgentId = BigInt(high) << BigInt(128) | BigInt(low);
                console.log("🎯 Agent Identity Secured! ID:", realAgentId.toString());
            }

            const agentIdFormatted = realAgentId ? realAgentId.toString() : result.transaction_hash.slice(0, 10);
            localStorage.setItem(`agent_id_${wallet.address}`, agentIdFormatted);
            setAgentId(agentIdFormatted);

        } catch (err: any) {
            console.error("❌ ERC-8004 Orchestration failed:", err);
            throw err;
        } finally {
            setIsLocalRegistering(false);
        }
    };

    useEffect(() => {
        if (wallet?.address) checkRegistration();
    }, [wallet?.address, checkRegistration]);

    return {
        wallet,
        agentId,
        isLoading,
        isRegistering,
        error,
        registerAgent,
        refetch
    };
};

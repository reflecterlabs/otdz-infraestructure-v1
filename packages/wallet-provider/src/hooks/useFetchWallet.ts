"use client";

import { useAuth } from "@clerk/nextjs";
import { useGetWallet, useCreateWallet } from "@chipi-stack/nextjs";
import { useEffect, useState, useMemo } from "react";


export interface WalletData {
    address: string;
    compositeId: string | null;
    [key: string]: any;
}

export interface UseFetchWalletReturn {
    wallet: WalletData | null;
    isLoading: boolean;
    error: any;
    refetch: () => void;
    compositeId: string | null;
}


export const useFetchWallet = (): UseFetchWalletReturn => {
    const { userId, orgId, getToken, isLoaded: isAuthLoaded } = useAuth();
    const [sessionToken, setSessionToken] = useState<string | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    // Derive Composite ID: combines userId and orgId for isolation
    const compositeId = useMemo(() => {
        if (!userId) return null;
        return orgId ? `${userId}_${orgId}` : userId;
    }, [userId, orgId]);

    const { data: wallet, isLoading: isGetLoading, error: getError, refetch } = useGetWallet({
        params: {
            externalUserId: compositeId || "",
        },
        // Only provide token if it's available to avoid 401s on initial load
        getBearerToken: async () => {
            if (!sessionToken) {
                // Try to fetch it one last time before giving up
                const token = await getToken({ template: "chipi" }).catch(() => getToken());
                if (token) return token;
                throw new Error("No session token available");
            }
            return sessionToken;
        },
    });

    const { createWalletAsync } = useCreateWallet();

    useEffect(() => {
        const fetchToken = async () => {
            if (isAuthLoaded && userId) {
                try {
                    // Chipi usually expects a JWT with a specific 'chipi' template if configured in Clerk.
                    // We try the template first, fallback to default.
                    const token = await getToken({ template: "chipi" }).catch(() => getToken());
                    setSessionToken(token);
                } catch (err) {
                    console.error("Error fetching Clerk token:", err);
                }
            }
        };

        fetchToken();
    }, [isAuthLoaded, userId, getToken]);

    // Auto-create wallet if it doesn't exist
    useEffect(() => {
        const autoCreate = async () => {
            if (isAuthLoaded && userId && sessionToken && !wallet && !isGetLoading && !getError && !isCreating) {
                setIsCreating(true);
                try {
                    console.log("Auto-creating wallet for:", compositeId);
                    await createWalletAsync({
                        params: {
                            externalUserId: compositeId!,
                            encryptKey: `enc_${compositeId}`
                        },
                        bearerToken: sessionToken
                    });
                    refetch();
                } catch (err) {
                    // Silently fail or log, as the user might already have a wallet and the GET just failed
                    console.warn("Auto-creation check/attempt finished:", err);
                } finally {
                    setIsCreating(false);
                }
            }
        };

        autoCreate();
    }, [isAuthLoaded, userId, sessionToken, wallet, isGetLoading, getError, isCreating, createWalletAsync, compositeId, refetch]);

    return {
        wallet: wallet ? { ...wallet, address: wallet.publicKey, compositeId } : null,
        isLoading: (isGetLoading && !wallet) || !isAuthLoaded || (userId && !sessionToken) || isCreating,
        error: getError,
        refetch: () => { refetch(); },
        compositeId
    };
};

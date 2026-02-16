"use client";

import { useAuth } from "@clerk/nextjs";
import { useGetWallet, useCreateWallet } from "@chipi-stack/nextjs";
import { useEffect, useState, useMemo } from "react";

export const useFetchWallet = () => {
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
        getBearerToken: async () => sessionToken,
    });

    const { createWalletAsync } = useCreateWallet();

    useEffect(() => {
        const fetchToken = async () => {
            if (isAuthLoaded && userId) {
                try {
                    const token = await getToken();
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
                            encryptKey: `enc_${compositeId}` // Deterministic key for dev-focused automatic deployment
                        },
                        bearerToken: sessionToken
                    });
                    refetch();
                } catch (err) {
                    console.error("Auto-creation failed:", err);
                } finally {
                    setIsCreating(false);
                }
            }
        };

        autoCreate();
    }, [isAuthLoaded, userId, sessionToken, wallet, isGetLoading, getError, isCreating, createWalletAsync, compositeId, refetch]);

    useEffect(() => {
        console.log("useFetchWallet State:", { userId, orgId, compositeId, hasToken: !!sessionToken, hasWallet: !!wallet });
    }, [userId, orgId, compositeId, sessionToken, wallet]);

    return {
        wallet: wallet ? { ...wallet, address: wallet.publicKey, compositeId } : null,
        isLoading: isGetLoading || !isAuthLoaded || (userId && !sessionToken) || isCreating,
        error: getError,
        refetch,
        compositeId
    };
};


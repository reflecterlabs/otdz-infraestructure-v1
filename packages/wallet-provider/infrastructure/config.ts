export const CHIPI_CONFIG = {
    apiKey: process.env.NEXT_PUBLIC_CHIPI_API_KEY || "",
    network: "starknet-mainnet", // or whichever is default
};

export const CLERK_CONFIG = {
    publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "",
};

export const MAINNET_RPC_URL = process.env.NEXT_PUBLIC_STARKNET_RPC_URL || "https://starknet-mainnet.public.blastapi.io";

export const CONTRACTS = {
    mainnet: {
        // Replace with your deployed Identity Registry address
        identityRegistry: process.env.NEXT_PUBLIC_IDENTITY_REGISTRY_ADDRESS || "0x0000000000000000000000000000000000000000000000000000000000000000",
        reputationRegistry: process.env.NEXT_PUBLIC_REPUTATION_REGISTRY_ADDRESS || "0x0000000000000000000000000000000000000000000000000000000000000000",
        validationRegistry: process.env.NEXT_PUBLIC_VALIDATION_REGISTRY_ADDRESS || "0x0000000000000000000000000000000000000000000000000000000000000000",
    }
};

/**
 * Vibe-friendly Minimal ABI for ERC-8004 Agent Registry
 */
export const IDENTITY_REGISTRY_ABI = [
    {
        "type": "struct",
        "name": "core::byte_array::ByteArray",
        "members": [
            { "name": "data", "type": "core::array::Array<core::felt252>" },
            { "name": "pending_word", "type": "core::felt252" },
            { "name": "pending_word_len", "type": "core::integer::u32" }
        ]
    },
    {
        "name": "register_with_metadata",
        "type": "function",
        "inputs": [
            { "name": "token_uri", "type": "core::byte_array::ByteArray" },
            { "name": "metadata", "type": "core::array::Array<(core::felt252, core::felt252)>" }
        ],
        "outputs": [],
        "state_mutability": "external"
    }
];

export interface AgentMetadataEntry {
    key: string;
    value: string;
}

export const MAINNET_RPC_URL = process.env.NEXT_PUBLIC_STARKNET_RPC_URL || "https://starknet-mainnet.public.blastapi.io";

export const CONTRACTS = {
    mainnet: {
        identityRegistry: process.env.NEXT_PUBLIC_IDENTITY_REGISTRY_ADDRESS || "0x0501f59f95afbf692d842e4f5d7e1996e4d1be1ecc5b9c3890710a7db33f7f76",
        reputationRegistry: process.env.NEXT_PUBLIC_REPUTATION_REGISTRY_ADDRESS || "0x0000000000000000000000000000000000000000000000000000000000000000",
        validationRegistry: process.env.NEXT_PUBLIC_VALIDATION_REGISTRY_ADDRESS || "0x0000000000000000000000000000000000000000000000000000000000000000",
    }
};

/**
 * Standard Byte Array struct used in Cairo 2+
 */
const BYTE_ARRAY_MEMBER = {
    "type": "struct",
    "name": "core::byte_array::ByteArray",
    "members": [
        { "name": "data", "type": "core::array::Array<core::felt252>" },
        { "name": "pending_word", "type": "core::felt252" },
        { "name": "pending_word_len", "type": "core::integer::u32" }
    ]
};

/**
 * Comprehensive ABI for ERC-8004 Identity Registry
 */
export const IDENTITY_REGISTRY_ABI = [
    BYTE_ARRAY_MEMBER,
    {
        "type": "struct",
        "name": "erc8004::interfaces::identity_registry::MetadataEntry",
        "members": [
            { "name": "key", "type": "core::byte_array::ByteArray" },
            { "name": "value", "type": "core::byte_array::ByteArray" }
        ]
    },
    {
        "name": "register_with_metadata",
        "type": "function",
        "inputs": [
            { "name": "token_uri", "type": "core::byte_array::ByteArray" },
            { "name": "metadata", "type": "core::array::Array<erc8004::interfaces::identity_registry::MetadataEntry>" }
        ],
        "outputs": [{ "name": "agent_id", "type": "core::integer::u256" }],
        "state_mutability": "external"
    },
    {
        "name": "get_metadata",
        "type": "function",
        "inputs": [
            { "name": "agent_id", "type": "core::integer::u256" },
            { "name": "key", "type": "core::byte_array::ByteArray" }
        ],
        "outputs": [{ "name": "value", "type": "core::byte_array::ByteArray" }],
        "state_mutability": "view"
    },
    {
        "name": "agent_exists",
        "type": "function",
        "inputs": [{ "name": "agent_id", "type": "core::integer::u256" }],
        "outputs": [{ "name": "exists", "type": "core::bool" }],
        "state_mutability": "view"
    },
    {
        "name": "total_agents",
        "type": "function",
        "inputs": [],
        "outputs": [{ "name": "count", "type": "core::integer::u256" }],
        "state_mutability": "view"
    }
];

/**
 * Comprehensive ABI for ERC-8004 Reputation Registry
 */
export const REPUTATION_REGISTRY_ABI = [
    BYTE_ARRAY_MEMBER,
    {
        "name": "get_summary",
        "type": "function",
        "inputs": [
            { "name": "agent_id", "type": "core::integer::u256" },
            { "name": "client_addresses", "type": "core::array::Array<core::starknet::contract_address>" },
            { "name": "tag1", "type": "core::integer::u256" },
            { "name": "tag2", "type": "core::integer::u256" }
        ],
        "outputs": [
            { "name": "count", "type": "core::integer::u64" },
            { "name": "average_score", "type": "core::integer::u8" }
        ],
        "state_mutability": "view"
    },
    {
        "name": "get_clients",
        "type": "function",
        "inputs": [{ "name": "agent_id", "type": "core::integer::u256" }],
        "outputs": [{ "name": "clients", "type": "core::array::Array<core::starknet::contract_address>" }],
        "state_mutability": "view"
    }
];

export interface AgentMetadataEntry {
    key: string;
    value: string;
}

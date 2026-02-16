import * as react_jsx_runtime from 'react/jsx-runtime';

interface SocialLoginProps {
    onSuccessRedirect?: string;
}
declare const SocialLogin: ({ onSuccessRedirect }: SocialLoginProps) => react_jsx_runtime.JSX.Element | null;

declare const WalletCard: () => react_jsx_runtime.JSX.Element;

interface WalletData {
    address: string;
    compositeId: string | null;
    [key: string]: any;
}
interface UseFetchWalletReturn {
    wallet: WalletData | null;
    isLoading: boolean;
    error: any;
    refetch: () => void;
    compositeId: string | null;
}
declare const useFetchWallet: () => UseFetchWalletReturn;

interface UseAgentWalletReturn {
    wallet: any;
    agentId: string | null;
    isLoading: boolean;
    isRegistering: boolean;
    error: any;
    registerAgent: (tokenUri: string, metadata?: {
        key: string;
        value: string;
    }[]) => Promise<void>;
    refetch: () => void;
}
declare const useAgentWallet: () => UseAgentWalletReturn;

export { SocialLogin, type UseAgentWalletReturn, type UseFetchWalletReturn, WalletCard, type WalletData, useAgentWallet, useFetchWallet };

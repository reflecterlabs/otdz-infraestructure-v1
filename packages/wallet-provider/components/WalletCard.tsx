"use client";

import { useFetchWallet } from "@/hooks/useFetchWallet";
import { Copy, Check, ExternalLink, Loader2, Link2, Unlink, Code2 } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const WalletCard = () => {
    const { wallet, isLoading, error } = useFetchWallet();
    const [copied, setCopied] = useState(false);
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        const currentStatus = navigator.onLine;
        if (currentStatus !== isOnline) setIsOnline(currentStatus);
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    const copyToClipboard = () => {
        if (wallet?.address) {
            navigator.clipboard.writeText(wallet.address);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (isLoading) {
        return (
            <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 p-6 rounded-2xl flex items-center justify-center min-h-[200px]">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl text-red-100 italic">
                Error deriving Smart Wallet: {error.message}
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/60 p-8 rounded-3xl shadow-xl relative overflow-hidden group"
        >
            {/* Decorative gradient */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full group-hover:bg-blue-500/20 transition-colors duration-500" />

            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">Starknet Smart Wallet</h3>
                    <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]'}`} />
                        <span className="text-xs text-slate-500 font-mono">
                            {isOnline ? 'Network Online' : 'Offline Mode'}
                        </span>
                    </div>
                </div>
                <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20">
                    {isOnline ? <Link2 className="w-5 h-5 text-blue-400" /> : <Unlink className="w-5 h-5 text-slate-500" />}
                </div>
            </div>

            <div className="space-y-4">
                <div className="p-4 bg-slate-950/50 border border-slate-800 rounded-2xl">
                    <label className="block text-[10px] text-slate-500 font-bold uppercase mb-2 ml-1">Wallet Address</label>
                    <div className="flex items-center gap-3">
                        <div className="flex-1 font-mono text-sm text-slate-100 truncate">
                            {wallet?.address || "Deriving address..."}
                        </div>
                        <button
                            onClick={copyToClipboard}
                            className="p-2 hover:bg-slate-800 rounded-xl transition-colors text-slate-400 hover:text-slate-100"
                        >
                            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                <div className="p-4 bg-slate-950/20 border border-slate-800/50 rounded-2xl border-dashed">
                    <label className="block text-[10px] text-slate-400/50 font-bold uppercase mb-1 ml-1">Composite Application ID</label>
                    <div className="flex items-center gap-2">
                        <Code2 className="w-3 h-3 text-slate-600" />
                        <div className="flex-1 font-mono text-[10px] text-slate-500 truncate">
                            {wallet ? (wallet as any).compositeId || "N/A" : "..."}
                        </div>
                    </div>
                </div>

                <div className="flex gap-3">
                    <a
                        href={`https://starkscan.co/contract/${wallet?.address}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-800 hover:bg-slate-700 text-slate-100 text-sm font-medium rounded-2xl transition-all border border-slate-700/50"
                    >
                        Explorer <ExternalLink className="w-3 h-3" />
                    </a>
                </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-800/50">
                <p className="text-[11px] text-slate-500 text-center leading-relaxed">
                    This wallet is unique to your account and persistent across sessions.
                    Powered by Chipi Pay SDK.
                </p>
            </div>
        </motion.div>
    );
};

"use client";

import { SignIn, SignUp } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function LoginPage() {
    const [isMounted, setIsMounted] = useState(false);
    const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    const commonAppearance = {
        elements: {
            rootBox: "w-full",
            card: "bg-transparent shadow-none w-full border-none",
            header: "flex flex-col items-center text-center mb-8",
            headerTitle: "text-white font-bold text-3xl tracking-tight mb-2 w-full",
            headerSubtitle: "text-slate-400 text-base font-normal w-full",
            main: "flex flex-col items-stretch",
            form: "w-full space-y-6",
            formFieldRow: "w-full flex justify-center",
            formField: "flex flex-col items-start w-full max-w-[360px] mx-auto",
            socialButtonsBlockButton: "bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 text-white w-full h-12 rounded-xl transition-all flex justify-center items-center px-6 gap-3",
            socialButtonsBlockButtonText: "text-white font-medium text-sm",
            socialButtonsBlockButtonArrow: "hidden",
            formButtonPrimary: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white h-12 text-sm font-bold w-full rounded-xl transition-all shadow-lg shadow-blue-500/25 active:scale-[0.98] mt-4",
            footer: "hidden",
            footerAction: "hidden",
            identityPreviewText: "text-white font-medium",
            identityPreviewEditButton: "text-blue-400 hover:text-blue-300 transition-colors",
            formFieldLabel: "text-slate-300 font-semibold mb-2 text-sm ml-1 w-full text-left",
            formFieldInput: "bg-slate-950/50 border border-slate-800 text-slate-100 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 h-12 rounded-xl transition-all w-full px-4 text-left placeholder:text-slate-500",
            dividerLine: "bg-slate-800",
            dividerText: "text-slate-500 text-[11px] uppercase tracking-[0.2em] font-bold px-4",
            formFieldInputShowPasswordButton: "text-slate-500 hover:text-white transition-colors mr-2",
            alert: "bg-red-500/10 border border-red-500/20 rounded-xl p-4 w-full",
            alertText: "text-red-400 text-sm",
            formFieldSuccessText: "text-green-400 text-xs mt-1 ml-1 w-full text-left",
            formFieldErrorText: "text-red-400 text-xs mt-1 ml-1 w-full text-left",
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center p-6 bg-[#020617]">
            {/* Ambient Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="z-10 w-full max-w-[440px]"
            >
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-6"
                    >
                        Secure Identity Gateway
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
                        Reflecter <span className="text-slate-500 font-light">ID</span>
                    </h1>
                </div>

                <div className="bg-slate-900/40 backdrop-blur-3xl border border-slate-800 rounded-[2rem] shadow-2xl relative overflow-hidden">
                    <div className="p-8 md:p-10">
                        <AnimatePresence mode="wait">
                            {authMode === "signin" ? (
                                <motion.div
                                    key="signin"
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <SignIn appearance={commonAppearance} routing="hash" forceRedirectUrl="/dashboard" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="signup"
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <SignUp appearance={commonAppearance} routing="hash" forceRedirectUrl="/dashboard" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Footer Toggle */}
                    <div className="px-8 py-6 bg-slate-950/40 border-t border-slate-800 flex justify-center">
                        <button
                            onClick={() => setAuthMode(authMode === "signin" ? "signup" : "signin")}
                            className="text-sm font-medium text-slate-400 hover:text-white transition-all flex items-center gap-2 group"
                        >
                            {authMode === "signin"
                                ? "New to Reflecter? Create account"
                                : "Already registered? Sign in"}
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </button>
                    </div>
                </div>

                <p className="mt-12 text-center text-[11px] text-slate-600 uppercase tracking-[0.25em] font-medium">
                    Powered by Starknet Infrastructure
                </p>
            </motion.div>
        </div>
    );
}

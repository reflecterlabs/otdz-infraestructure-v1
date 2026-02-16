"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Zap, Globe, Github, ArrowRight, Wallet, Code2, Lock } from "lucide-react";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-blue-500/30 overflow-x-hidden">
            {/* Background Orbs */}
            <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full -z-10 animate-pulse" />
            <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full -z-10" />

            {/* Navbar */}
            <nav className="flex items-center justify-between px-6 py-8 max-w-7xl mx-auto backdrop-blur-sm sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Shield className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">OPTZ Identity</span>
                </div>
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
                    <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
                    <a href="#architecture" className="hover:text-blue-400 transition-colors">Architecture</a>
                </div>
                <Link
                    href="/login"
                    className="px-5 py-2.5 bg-slate-100 text-slate-950 rounded-full text-sm font-semibold hover:bg-white transition-all shadow-lg hover:shadow-white/10"
                >
                    Get Started
                </Link>
            </nav>

            {/* Hero Section */}
            <section className="pt-24 pb-32 px-6 max-w-7xl mx-auto text-center relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
                        <Zap className="w-3 h-3 fill-current" /> Next-Gen Auth for Starknet
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
                        Social Login Meets <br />
                        <span className="text-blue-500">Smart Wallets</span>
                    </h1>
                    <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
                        Experience the gold standard in Web3 onboarding. Our deterministic identity engine
                        maps social identities to institutional-grade Starknet Smart Wallets with
                        mathematical precision and military-grade isolation.
                    </p>

                </motion.div>
                {/* Dashboard Preview */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 1 }}
                    className="mt-24 relative"
                >
                    <div className="absolute inset-0 bg-blue-500/5 blur-3xl -z-10" />
                    <div className="bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-3xl p-4 shadow-2xl overflow-hidden max-w-4xl mx-auto group">
                        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 mb-4">
                            <div className="w-3 h-3 rounded-full bg-red-400/20 group-hover:bg-red-400 transition-colors" />
                            <div className="w-3 h-3 rounded-full bg-yellow-400/20 group-hover:bg-yellow-400 transition-colors" />
                            <div className="w-3 h-3 rounded-full bg-green-400/20 group-hover:bg-green-400 transition-colors" />
                            <div className="ml-4 h-6 w-1/2 bg-slate-800 rounded-md" />
                        </div>
                        <div className="grid grid-cols-12 gap-4 p-4 text-left">
                            <div className="col-span-4 space-y-3">
                                <div className="h-24 bg-slate-800/50 rounded-2xl animate-pulse" />
                                <div className="h-12 bg-slate-800/50 rounded-2xl" />
                                <div className="h-12 bg-slate-800/50 rounded-2xl" />
                            </div>
                            <div className="col-span-8 flex flex-col gap-3">
                                <div className="h-12 bg-blue-600/20 border border-blue-500/20 rounded-2xl" />
                                <div className="h-40 bg-slate-800/50 rounded-2xl" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-32 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <h2 className="text-3xl font-bold mb-4">Built for Multi-Project Scaling</h2>
                    <p className="text-slate-400">Modular architecture designed for rapid deployment.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: <Shield className="w-6 h-6 text-blue-400" />, title: "Isolated Wallets", desc: "Automatic Organization ID detection for multi-tenant isolation." },
                        { icon: <Globe className="w-6 h-6 text-purple-400" />, title: "Starknet Native", desc: "Powered by Chipi Pay SDK for seamless Account Abstraction." },
                        { icon: <Lock className="w-6 h-6 text-green-400" />, title: "Secure Custody", desc: "Leverage Clerk's enterprise security with Chipi's smart custody." },
                    ].map((f, i) => (
                        <div key={i} className="p-8 bg-slate-900/30 border border-white/5 rounded-3xl hover:border-white/10 transition-colors">
                            <div className="mb-6">{f.icon}</div>
                            <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Steps Section */}
            <section id="architecture" className="py-32 px-6 bg-slate-900/20 border-y border-white/5">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <h2 className="text-4xl font-bold mb-8">Modular & Extensible <br /><span className="text-blue-500">Developer Experience</span></h2>
                        <div className="space-y-8">
                            {[
                                { icon: <Code2 />, step: "01", title: "Clean Hooks API", desc: "Use useFetchWallet() to derive accounts anywhere in your application." },
                                { icon: <Wallet />, step: "02", title: "Composite ID Strategy", desc: "Deterministic mapping between Social ID + Org ID to Smart Contract." },
                                { icon: <Zap />, step: "03", title: "Gasless Transactions", desc: "Ready for sponsored transactions and session keys." },
                            ].map((s, i) => (
                                <div key={i} className="flex gap-6">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-blue-400">
                                        {s.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-1 flex items-center gap-3">
                                            <span className="text-xs text-slate-500 font-mono">{s.step}</span>
                                            {s.title}
                                        </h4>
                                        <p className="text-sm text-slate-400">{s.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-blue-500/10 blur-[100px] -z-10" />
                        <div className="bg-slate-950/80 border border-white/10 rounded-3xl p-8 font-mono text-xs overflow-hidden shadow-2xl">
                            <div className="flex gap-2 mb-6">
                                <div className="w-2 h-2 rounded-full bg-red-500" />
                                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                                <div className="w-2 h-2 rounded-full bg-green-500" />
                            </div>
                            <pre className="text-blue-400">
                                {`// hooks/useFetchWallet.ts
                                    const { wallet } = useFetchWallet();

                                    console.log(wallet.address);
                                    // 0x05f0...8a12

                                    // Deterministic & Secure
                                    const compositeId = \`\${userId}_\${orgId}\`;`}
                            </pre>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Footer */}
            <footer className="py-24 px-6 text-center max-w-3xl mx-auto">
                <p className="text-sm text-slate-500 tracking-widest uppercase mb-4">Powered by ReflecterLabs</p>
                <p className="text-xs text-slate-400 opacity-60">© 2026 OPTZ IDENTITY MODULE. VERSION 1.0.0</p>
            </footer>
        </div>
    );
}

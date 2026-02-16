"use client";

import { UserButton, useUser, SignOutButton } from "@clerk/nextjs";
import { WalletCard } from "@/components/WalletCard";
import { motion } from "framer-motion";
import { LogOut, ShieldCheck, User as UserIcon } from "lucide-react";

export default function DashboardPage() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return null;

  return (
    <main className="min-h-screen p-6 md:p-12 max-w-5xl mx-auto">
      {/* Header */}
      <nav className="flex items-center justify-between mb-16">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">OPTZ</span>
        </div>
        <div className="flex items-center gap-4 bg-slate-900/50 backdrop-blur-md p-1.5 pr-4 rounded-full border border-slate-800">
          <UserButton afterSignOutUrl="/login" />
          <span className="text-sm font-medium text-slate-300 hidden sm:inline">
            {user?.firstName || user?.username}
          </span>
        </div>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: User Profile */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-5 space-y-6"
        >
          <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/60 p-8 rounded-3xl shadow-xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="relative">
                <img
                  src={user?.imageUrl}
                  alt="Profile"
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-800"
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-4 border-slate-900 rounded-full" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-slate-100">{user?.fullName}</h2>
                <p className="text-sm text-slate-500">{user?.primaryEmailAddress?.emailAddress}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-950/30 rounded-2xl border border-slate-800/50">
                <div className="flex items-center gap-3">
                  <UserIcon className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-slate-300">Identity Verified</span>
                </div>
                <span className="text-[10px] font-bold text-blue-500 bg-blue-500/10 px-2 py-1 rounded-md uppercase">Level 1</span>
              </div>

              <SignOutButton>
                <button className="w-full flex items-center justify-center gap-2 py-4 text-sm font-bold text-slate-100 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-2xl transition-all group">
                  <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Terminate Session
                </button>
              </SignOutButton>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Wallet & Assets */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-7"
        >
          <WalletCard />

          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="p-6 bg-slate-900/30 border border-slate-800/50 rounded-3xl">
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-2 font-bold">Total Assets</p>
              <p className="text-2xl font-bold font-mono">$0.00</p>
            </div>
            <div className="p-6 bg-slate-900/30 border border-slate-800/50 rounded-3xl">
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-2 font-bold">Active Org</p>
              <p className="text-2xl font-bold font-mono text-blue-400">
                {(user as any)?.organizationId ? "Corporate" : "Personal"}
              </p>
            </div>
          </div>

          <div className="mt-6 p-6 bg-blue-600/5 border border-blue-500/10 rounded-3xl">
            <h4 className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">Developer Insights</h4>
            <div className="space-y-3 font-mono text-[11px]">
              <div className="flex justify-between border-b border-blue-500/5 pb-2">
                <span className="text-slate-500">Clerk User ID:</span>
                <span className="text-slate-300">{user?.id}</span>
              </div>
              <div className="flex justify-between border-b border-blue-500/5 pb-2">
                <span className="text-slate-500">Wallet Type:</span>
                <span className="text-slate-300 italic text-blue-500/70 underline underline-offset-4">Chipi Pay Smart Wallet</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Protocol:</span>
                <span className="text-slate-300">Starknet AA (SNIP-9)</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative footer element */}
      <footer className="mt-24 text-center">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-800 to-transparent mb-8" />
        <p className="text-slate-600 text-[10px] uppercase tracking-[0.2em] font-medium">
          Secure Infrastructure &copy; 2026 OPTZ Labs
        </p>
      </footer>
    </main>
  );
}

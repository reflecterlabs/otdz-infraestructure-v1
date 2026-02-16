"use client";


import { useAgentWallet, SocialLogin, WalletCard, useFetchWallet } from "@optref/social-login-smart-wallet";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";

export default function Home() {
  const { user } = useUser();
  const { wallet, isLoading: isWalletLoading, registerAgent, isRegistering, agentId, error: walletError } = useAgentWallet();
  const { compositeId } = useFetchWallet();
  const [registerStatus, setRegisterStatus] = useState<string>("");

  useEffect(() => {
    if (user) {
      console.log("DEBUG: User logged in", user.id);
      console.log("DEBUG: Wallet object", wallet);
      console.log("DEBUG: Composite ID", compositeId);
    }
  }, [user, wallet, compositeId]);

  const handleRegister = async () => {
    try {
      setRegisterStatus("Registering...");
      await registerAgent("ipfs://your-metadata", [
        { key: "agentName", value: `Agent_${user?.firstName || 'Unknown'}` },
        { key: "agentType", value: "SmartAgent" }
      ]);
      setRegisterStatus("Successfully registered!");
    } catch (err: any) {
      setRegisterStatus(`Error: ${err.message}`);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#050505] text-white p-8">
      <header className="absolute top-8 right-8 flex items-center gap-4">
        <SignedIn>
          <span className="text-zinc-500 text-sm hidden md:block">{user?.primaryEmailAddress?.emailAddress}</span>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </header>

      <main className="w-full max-w-xl flex flex-col gap-8">
        <div className="text-center">
          <h1 className="text-5xl font-black tracking-tighter bg-gradient-to-r from-white to-zinc-600 bg-clip-text text-transparent italic">
            OPTZ INFRA
          </h1>
          <p className="text-zinc-500 text-sm font-medium tracking-widest mt-2 uppercase">Core Infrastructure & Registry</p>
        </div>

        <SignedOut>
          <div className="bg-zinc-900/40 p-10 rounded-3xl border border-zinc-800/50 backdrop-blur-2xl">
            <h2 className="text-xl font-semibold mb-6 text-center text-zinc-200">Initialize Identity</h2>
            <SocialLogin />
          </div>
        </SignedOut>

        <SignedIn>
          <div className="flex flex-col gap-6 animate-in fade-in duration-700">
            {/* DEBUG MONITOR */}
            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 flex flex-col gap-2">
              <div className="flex justify-between items-center px-1">
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">System Status</span>
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-[10px] font-mono p-2 bg-zinc-900/50 rounded-lg">
                <div className="flex flex-col gap-1">
                  <span className="text-zinc-600">WALLET_ADDR:</span>
                  <span className="text-zinc-400 truncate">{wallet?.address || 'NULL'}</span>
                </div>
                <div className="flex flex-col gap-1 text-right">
                  <span className="text-zinc-600">AGENT_ID:</span>
                  <span className="text-zinc-400">{agentId || 'UNREGISTERED'}</span>
                </div>
              </div>
            </div>

            <WalletCard />

            <div className="bg-zinc-900/40 p-8 rounded-3xl border border-zinc-800/50 backdrop-blur-2xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold text-zinc-100 italic">ERC-8004 COMPLIANCE</h3>
                <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${agentId ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'}`}>
                  {agentId ? "Identity Secured" : "Vulnerable / Unregistered"}
                </div>
              </div>

              {isWalletLoading ? (
                <div className="flex flex-col items-center gap-4 py-8">
                  <div className="w-10 h-10 border-2 border-zinc-800 border-t-zinc-200 rounded-full animate-spin"></div>
                  <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest">Bridging Accounts...</p>
                </div>
              ) : wallet ? (
                <div className="flex flex-col gap-6">
                  <div className="space-y-1">
                    <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest px-1">Network Identity</p>
                    <div className="bg-black/60 p-4 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-colors cursor-pointer group">
                      <p className="font-mono text-xs break-all text-zinc-400 group-hover:text-zinc-200 transition-colors">
                        {wallet.address}
                      </p>
                    </div>
                  </div>

                  {agentId ? (
                    <div className="space-y-1">
                      <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest px-1">Registry Token</p>
                      <div className="bg-indigo-500/5 border border-indigo-500/10 p-4 rounded-2xl">
                        <p className="font-mono text-sm text-indigo-300">#ERC8004-{agentId.padStart(4, '0')}</p>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={handleRegister}
                      disabled={isRegistering}
                      className="w-full py-4 bg-white text-black font-black text-sm rounded-2xl transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 uppercase tracking-tighter"
                    >
                      {isRegistering ? "Confirming Session..." : "Secure Identity On-Chain"}
                    </button>
                  )}

                  {registerStatus && (
                    <div className={`mt-2 p-3 rounded-xl border text-[10px] font-mono text-center ${registerStatus.includes("Error") ? "bg-red-500/5 border-red-500/10 text-red-500" : "bg-zinc-500/5 border-zinc-500/10 text-zinc-500"}`}>
                      {registerStatus}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-red-400 text-sm mb-4">No wallet mapped to {user?.id}</p>
                  <button onClick={() => window.location.reload()} className="px-6 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs hover:bg-zinc-800 transition-colors">
                    Reset Identity Fetch
                  </button>
                </div>
              )}
            </div>
          </div>
        </SignedIn>
      </main>
    </div>
  );
}

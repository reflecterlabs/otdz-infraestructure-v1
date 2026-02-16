import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ChipiClientProvider } from "@chipi-stack/nextjs";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OPTZ - Social Login & Smart Wallets",
  description: "Next.js + Clerk + Chipi Pay Integration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body className={`${inter.className} bg-slate-950 text-slate-50 antialiased`}>
          <ChipiClientProvider apiPublicKey={process.env.NEXT_PUBLIC_CHIPI_API_KEY!}>
            {children}
          </ChipiClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

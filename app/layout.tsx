import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { SolanaNetworkProvider } from "@/context/SolanaContext";
import { SolanaProvider } from "@/components/SolanaProvider";
import { ToastContainer } from "react-toastify";
import { Analytics } from "@vercel/analytics/next";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Ralskill | Développeur Freelance Smart Contract Rust, Solana, EVM",
  description: "Portfolio d'Aldino : Développeur freelance passionné par le Web3, spécialisé en Smart Contracts (Rust, Solana, Solidity, EVM) et Consultant Techno-Fonctionnel SAP. Création d'architectures blockchain sécurisées.",
  keywords: [
    "cherche developpeur smart contract",
    "developpeur freelance blockchain",
    "rust developer",
    "solana developer",
    "evm smart contract",
    "solidity freelance",
    "anchor rust",
    "SAP techno-functional",
    "Ralskill",
    "Aldino",
    "web3 developer freelance",
    "expert blockchain france"
  ],
  authors: [{ name: "Aldino" }],
  creator: "Aldino",
  publisher: "Aldino",
  metadataBase: new URL("https://ralskill.oxalix.io"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en",
      "fr-FR": "/fr",
    },
  },
  openGraph: {
    title: "Ralskill | Développeur Freelance Smart Contract Rust, Solana, EVM",
    description: "Développeur freelance passionné par les Smart Contracts et Consultant Techno-Fonctionnel SAP.",
    url: "https://ralskill.oxalix.io",
    siteName: "Ralskill Portfolio",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Ralskill Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ralskill | Développeur Freelance Smart Contract Rust, Solana, EVM",
    description: "Développeur freelance passionné par les Smart Contracts et Consultant Techno-Fonctionnel SAP.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark scroll-smooth ${jetbrainsMono.variable}`}>
      <body className="antialiased font-mono bg-[#0a0a0a] text-white selection:bg-cyan-500/30">
        <LanguageProvider>
          <SolanaNetworkProvider>
            <SolanaProvider>
              {children}
              <Analytics />
              <ToastContainer position="bottom-right" theme="dark" />
            </SolanaProvider>
          </SolanaNetworkProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

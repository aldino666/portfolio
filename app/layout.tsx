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
  title: "Ralskill — Freelance Smart Contract Developer | Solana & EVM",
  description: "Freelance Web3 developer specialized in Solana smart contracts (Rust/Anchor), Ethereum (Solidity/Hardhat) and SAP. Available for remote projects.",
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
    "Infrastructure blockchain ",
    "oxalix dev",
    "consultant sap-Erp",
    "blockchain architect",
    "blockchain developer",
    "Ramanantsirahonana Aldino"
  ],
  authors: [{ name: "Aldino" }],
  creator: "Aldino",
  publisher: "Aldino",
  metadataBase: new URL("https://ralskill.oxalix.io"),
  alternates: {
    canonical: "https://ralskill.oxalix.io/",
    languages: {
      "en-US": "/en",
      "fr-FR": "/fr",
    },
  },
  openGraph: {
    title: "Ralskill — Freelance Smart Contract Developer | Solana & EVM",
    description: "Freelance Web3 developer specialized in Solana smart contracts (Rust/Anchor), Ethereum (Solidity/Hardhat) and SAP. Available for remote projects.",
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
    title: "Ralskill — Freelance Smart Contract Developer | Solana & EVM",
    description: "Freelance Web3 developer specialized in Solana smart contracts (Rust/Anchor), Ethereum (Solidity/Hardhat) and SAP. Available for remote projects.",
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
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Person",
                    "name": "Aldino",
                    "jobTitle": "Freelance Smart Contract Developer",
                    "url": "https://ralskill.oxalix.io",
                    "knowsAbout": ["Solana", "Rust", "Solidity", "Web3"]
                  })
                }}
              />
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

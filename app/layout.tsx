import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { SolanaNetworkProvider } from "@/context/SolanaContext";
import { SolanaProvider } from "@/components/SolanaProvider";
import { ToastContainer } from "react-toastify";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Ralskill | Smart Contract & Web3 Engineer",
  description: "Aldino's professional portfolio: Expert Web3 Engineer specializing in Smart Contracts (Solidity, Rust, Anchor) and SAP Techno-Functional Consultant. Building robust blockchain architectures.",
  keywords: [
    "Smart Contract",
    "Web3 Engineer",
    "Blockchain Developer",
    "Solana",
    "Ethereum",
    "EVM",
    "Anchor",
    "Rust",
    "Solidity",
    "Hardhat",
    "Blockchain Architecture",
    "SAP Techno-Functional",
    "Ralskill",
    "Aldino"
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
    title: "Ralskill | Smart Contract & Web3 Engineer",
    description: "Expert Web3 Engineer specializing in Smart Contracts and SAP Techno-Functional Consultant.",
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
    title: "Ralskill | Smart Contract & Web3 Engineer",
    description: "Expert Web3 Engineer specializing in Smart Contracts and SAP Techno-Functional Consultant.",
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
              <ToastContainer position="bottom-right" theme="dark" />
            </SolanaProvider>
          </SolanaNetworkProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

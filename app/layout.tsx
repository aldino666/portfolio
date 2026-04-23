import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { SolanaProvider } from "@/components/SolanaProvider";
import { ToastContainer } from "react-toastify";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Portfolio | Web & Web3 & SAP",
  description: "Modern professional portfolio for a Full Stack Developer, Web3 Engineer, and SAP Specialist.",
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
          <SolanaProvider>
            {children}
            <ToastContainer position="bottom-right" theme="dark" />
          </SolanaProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { SolanaProvider } from "@/components/SolanaProvider";
import { ToastContainer } from "react-toastify";

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
    <html lang="en" className="dark scroll-smooth">
      <body className="antialiased bg-[#0a0a0a] text-white selection:bg-emerald-500/30">
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

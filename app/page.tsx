"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import TokenInspector from "@/components/TokenInspector";
import Journey from "@/components/Journey";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Background from "@/components/Background";
import LoadingScreen from "@/components/LoadingScreen";

export default function Home() {
  return (
    <main className="min-h-screen">
      <LoadingScreen />
      <Background />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <TokenInspector />
      <Journey />
      <Contact />
      <Footer />
    </main>
  );
}

import { Aura } from "@/components/Aura";
import { NavBar } from "@/components/NavBar";
import { LenisProvider } from "@/components/LenisProvider";
import { Hero } from "@/components/Hero";
import { Works } from "@/components/Works";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { CustomCursor } from "@/components/CustomCursor";

export default function Home() {
  return (
    <LenisProvider>
      <CustomCursor />
      <Aura />
      <NavBar />
      <main id="main">
        <Hero />
        <Works />
        <About />
        <Contact />
      </main>
    </LenisProvider>
  );
}

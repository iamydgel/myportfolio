import { NavBar } from "@/components/NavBar";
import { LenisProvider } from "@/components/LenisProvider";
import { Hero } from "@/components/Hero";
import { Works } from "@/components/Works";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { SectionTransition } from "@/components/SectionTransition";

export default function Home() {
  return (
    <LenisProvider>
      <NavBar />
      <main id="main">
        <SectionTransition isFirst>
          <Hero />
        </SectionTransition>
        <SectionTransition>
          <Works />
        </SectionTransition>
        <SectionTransition>
          <About />
        </SectionTransition>
        <SectionTransition isLast>
          <Contact />
        </SectionTransition>
      </main>
    </LenisProvider>
  );
}

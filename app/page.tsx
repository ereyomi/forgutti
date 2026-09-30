import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Stack from "@/components/sections/Stack";
import Products from "@/components/sections/Products";
import About from "@/components/sections/About";
import Writing from "@/components/sections/Writing";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Stack />
      <Products />
      <About />
      <Writing />
      <Contact />
    </>
  );
}

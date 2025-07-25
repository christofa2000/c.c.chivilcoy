import Header from '../components/Header';
import Hero   from '../components/Hero';
import Contact from '../components/Contact';
import Kids from '../components/Kids';
import TalleresCarousel from '../components/TalleresCarousel';
import ClasesCarousel from '../components/Clases';
import ColoniaToggle from '../components/Colonia';

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <Hero />
       
        {/* Other sections… */}
        <ClasesCarousel />
        <TalleresCarousel />
        <Kids /> 
        <ColoniaToggle />
        <Contact />
        
      </main>
    </>
  );
}

import Header from '../components/Header';
import Contact from '../components/Contact';
import Kids from '../components/Kids';
import TalleresCarousel from '../components/TalleresCarousel';
import ClasesCarousel from '../components/Clases';
import ColoniaToggle from '../components/Colonia';

export default function Home() {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8 mt-[72px] lg:mt-[88px]  ">
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

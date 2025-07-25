import Header from '../components/Header';
import Hero   from '../components/Hero';
import Contact from '../components/Contact';
import Kids from '../components/Kids';

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <Hero />
       
        {/* Other sections… */}
        <Kids /> 
        <Contact />
        
      </main>
    </>
  );
}

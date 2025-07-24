import Header from '../components/Header';
import Hero   from '../components/Hero';
import Events from '../components/Events';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <Hero />
        <Events />
        {/* Other sections… */}
        <Contact />
      </main>
    </>
  );
}

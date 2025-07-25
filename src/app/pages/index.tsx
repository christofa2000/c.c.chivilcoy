// pages/index.tsx
import type { NextPage } from 'next'
import Header from '../../components/Header'
import Hero from '../../components/Hero'


const Home: NextPage = () => {
  return (
    <>
      <Header />
      <main className="pt-20">
        <Hero />
        
        {/* Aquí luego About, Events, Gallery, Workshops, Contact… */}
      </main>
    </>
  )
}

export default Home

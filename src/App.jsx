import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import TournamentFormat from './components/TournamentFormat'
import Registration from './components/Registration'
import Sponsors from './components/Sponsors'
import Impact from './components/Impact'
import Donation from './components/Donation'
import Gallery from './components/Gallery'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <TournamentFormat />
        <Registration />
        <Sponsors />
        <Impact />
        <Donation />
        <Gallery />
        <Contact />
        <Footer />
      </main>
    </>
  )
}

export default App

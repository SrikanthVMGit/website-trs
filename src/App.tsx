import Navbar from './components/Navbar/Navbar'
import FrameScrollHero from './components/Hero/FrameScrollHero'
import Thickshakes from './components/Thickshakes/Thickshakes'
import Milkshakes from './components/Milkshakes/Milkshakes'
import Icecreams from './components/Icecreams/Icecreams'
import Categories from './components/Categories/Categories'
import SeasonalDrops from './components/SeasonalDrops/SeasonalDrops'
import ArtOfIceCream from './components/ArtOfIceCream/ArtOfIceCream'
import Footer from './components/Footer/Footer'
import './App.css'

function App() {
  return (
    <div className="appWrapper">
      <Navbar />
      <FrameScrollHero />
      <Categories />
      <Icecreams />
      <Milkshakes />
      <Thickshakes />
      <SeasonalDrops />
      <ArtOfIceCream />
      <Footer />
    </div>
  )
}

export default App

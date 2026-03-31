import Navbar from './components/Navbar/Navbar'
import FrameScrollHero from './components/Hero/FrameScrollHero'
import Thickshakes from './components/Thickshakes/Thickshakes'
import Milkshakes from './components/Milkshakes/Milkshakes'
import Icecreams from './components/Icecreams/Icecreams'
import Categories from './components/Categories/Categories'
import SeasonalDrops from './components/SeasonalDrops/SeasonalDrops'
import ArtOfIceCream from './components/ArtOfIceCream/ArtOfIceCream'
import GuestNotes from './components/GuestNotes/GuestNotes'
import Footer from './components/Footer/Footer'
import Ourstory from './components/Ourstory/Ourstory'
import './App.css'
import Enquiry from './components/Enquiry/Enquiry'

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
      <GuestNotes />
      <Ourstory />
      <Enquiry />
      <Footer />
    </div>
  )
}

export default App

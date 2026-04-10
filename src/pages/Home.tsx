import Navbar from '../components/Navbar/Navbar'
import FrameScrollHero from '../components/Hero/FrameScrollHero'
import Thickshakes from '../components/Thickshakes/Thickshakes'
import Milkshakes from '../components/Milkshakes/Milkshakes'
import Scoops from '../components/Scoops/Scoops'
import Categories from '../components/Categories/Categories'
import Menu from '../components/Menu/Menu'
import SeasonalDrops from '../components/SeasonalDrops/SeasonalDrops'
import ArtOfIceCream from '../components/ArtOfIceCream/ArtOfIceCream'
import GuestNotes from '../components/GuestNotes/GuestNotes'
import Footer from '../components/Footer/Footer'
import Ourstory from '../components/Ourstory/Ourstory'
import OurStory2 from '../components/ourstory2/ourstory2'
import Enquiry from '../components/Enquiry/Enquiry'
import Icecreams from '../components/Icecreams/Icecreams'
import WarmSpecials from '../components/WarmSpecials/WarmSpecials'

interface HomeProps {
  handleProgress: (pct: number) => void;
}

export default function Home({ handleProgress }: HomeProps) {
  return (
    <>
      <Navbar />
      <FrameScrollHero onLoadProgress={handleProgress} />
      <Menu />
      <Categories />
      <Scoops />
      <Icecreams />
      <Milkshakes />
      <Thickshakes />
      <WarmSpecials />
      <SeasonalDrops />
      <ArtOfIceCream />
      <GuestNotes />
      <OurStory2 />
      <Ourstory />
      <Enquiry />
      <Footer />
    </>
  )
}

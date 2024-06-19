import Navbar from './components/Navbar'
import LandingPage from './components/LandingPage'
import About from "./components/About"
import Footer from './components/Footer';
import VideoGallery from './components/VideoGallery';
import SocialLinks from './components/Socials'

function App() {

  return (
    <main>
      <Navbar />
      <LandingPage />
      <About />      
      <VideoGallery />
      <SocialLinks />
      <Footer />
    </main>
  );
}

export default App;

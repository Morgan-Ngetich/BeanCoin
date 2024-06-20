import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar'
import LandingPage from './components/LandingPage'
import About from "./components/About"
import Footer from './components/Footer';
import VideoGallery from './components/VideoGallery';
import Map from './components/Map';
import SocialLinks from './components/Socials'
import Wallet from './components/Wallet'; 

function App() {

  return (
    <main>
      <Router>
        <div>
          <Navbar />
          <LandingPage />
          <About />      
          <Map />
          <VideoGallery />
          <SocialLinks />
          <Footer />

          <Switch>
            
            <Route path="/wallet" component={Wallet} />
          </Switch>
        </div>
      </Router>

      
    </main>
  );
}

export default App;

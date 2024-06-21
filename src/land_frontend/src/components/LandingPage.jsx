import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import hero from '../assets/hero.png';
import cup from '../assets/cup.png';
import bean from '../assets/bean.png';
import { AuthClient } from '@dfinity/auth-client';


import About from './About';
import VideoGallery from './VideoGallery';
import Map from './Map';
import SocialLinks from './Socials';

const LandingPage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = async () => {
        const authClient = await AuthClient.create();
        try {
            await authClient.login({
                onSuccess: () => {
                    setIsAuthenticated(true);                    
                },
            });
        } catch (e) {
            setError('Failed to authenticate. Please try again.');
        }
    };

    return (
      <div>
        <Container fluid className="landing-page">
            <Row>
                <Col>
                    <div className="gradient-div"></div>
                    <div className="left-div">
                        <h1>Bean Coin</h1>
                        <p>Today's good mood is sponsored by BeanCoin. Find your perfect cup of coffee and join the BeanCoin revolution! <span className="coffee-cup">☕️</span></p>
                        <button className="Button1" onClick={handleLogin}>Beanify</button> <Link to="/wallet"> <button className="Button2">Wallet</button> </Link>
                    </div>
                </Col>
                <Col className="image-col">
                    <img src={hero} alt="Image" className="image-right" />
                    <img src={bean} alt="bean" className="bean"/>
                    <img src={bean} alt="bean" className="bean1"/>
                    <img src={bean} alt="bean" className="bean2"/>
                    <img src={bean} alt="bean" className="bean3"/>
                    <img src={bean} alt="bean" className="bean4"/>
                    <img src={bean} alt="bean" className="bean5"/>

                    <div className="bottom-box">
                        <img src={cup} alt="Icon" className="icon-image" />            
                        <p className="box-text">But First Coffee</p>
                    </div>          
                </Col>
            </Row>
        </Container>

          <About />
          <VideoGallery />
          <Map />
          <SocialLinks />
      </div>
    );
}

export default LandingPage;

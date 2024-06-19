import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import machine from "../assets/machine.png";
import footer from "../assets/footer.png";
// import './Footer.css'; // Import the CSS file
import { FaTelegram, FaTwitter, FaComments } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer" style={{ backgroundImage: `url(${footer})` }}>
      <Container fluid>
        <Row className="no-gutters">
          <Col md={4} className="left-image-col">
            <div className="left-image"></div>
          </Col>
          <Col md={8}>
            <Row>
              <Col md={4}>
                <h5>Bean Coin</h5>
                <p>
                  Today's good mood is sponsored by BeanCoin. Find your perfect cup
                  of coffee and join the BeanCoin revolution! ☕️
                </p>
              </Col>
              <Col md={4}>
                <h5>Quick Links</h5>
                <ul className="list-unstyled">
                  <li><a href="#home">Home</a></li>
                  <li><a href="#tokenomics">Tokenomics</a></li>
                  <li><a href="#whitepaper">Whitepaper</a></li>                  
                  <li><a href="#contact">Contact</a></li>
                  <li><a href="#Wallet">Wallet</a></li>
                </ul>
              </Col>
              <Col md={4}>
                <h5>Join Our Socials</h5>
                <div className="social-icons">
                  <a href="https://t.me/beanCOinTK" className="social-icon telegram" target="_blank" rel="noopener noreferrer"> <FaTelegram /></a>
                  <a href="https://x.com/BeanCoin_Tkn" className="social-icon twitter" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                  <a href="https://openchat.com/" className="social-icon openchat" target="_blank" rel="noopener noreferrer"><FaComments /></a>
                </div>
              </Col>
            </Row>
            <Row>
              <Col className="text-center mt-3">
                <p>© 2024 BeanCoin. All rights reserved.</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

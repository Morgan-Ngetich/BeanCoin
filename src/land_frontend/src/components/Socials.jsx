import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './SocialLinks.css';
import { FaTelegram, FaTwitter, FaComments } from 'react-icons/fa';

const SocialLinks = () => {
  return (
    <Container fluid className="social-links-container">
      <h2>Socials</h2>
      <Row className="justify-content-center">
        
        <Col xs={12} md={4} className="social-link">
            < FaTelegram className="social-icon"/>
            <a href="https://t.me/beanCOinTK">
              <Button variant="primary" className="social-button">
              Join us on Telegram
              </Button>
            </a>
        </Col>
        <Col xs={12} md={4} className="social-link">
        < FaTwitter className="social-icon"/>
        <a href="https://x.com/BeanCoin_Tkn">
          <Button variant="info" className="social-button"> 
            Follow us on Twitter
          </Button>
        </a>
     
        </Col>
        <Col xs={12} md={4} className="social-link">
        < FaComments className="social-icon"/>
          <Button variant="success" className="social-button">
            Chat with us on OpenChat
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default SocialLinks;

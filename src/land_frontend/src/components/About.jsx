import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import head from "../assets/head.png"
import men from "../assets/men.png"
import coffeeEye from "../assets/coffeeEye.png"
import coffeeMission from "../assets/coffeeMission.png"
import TokenomicsCarousel from './Tokenomics'

const About = () => {
  return (
    <div>
      <Container className="about my-4">
        <Row className="card carder align-items-center">
          <Col xs={12} md={6} className="image-container p-0">
            <img src={head} alt="Coffee" className="image-head" />
          </Col>
          <Col xs={12} md={6} className="content-container p-4">
            <h2 className="header">Our Story</h2>
            <p className="text">
              BeanCoin is a revolutionary cryptocurrency merging coffee culture ☕️ and digital innovation 💻. As the first coffee-themed crypto, BeanCoin connects coffee enthusiasts and investors 🌐 on a decentralized platform. Enjoy financial freedom 💰 while celebrating your love for coffee. Whether you're buying, trading, or staking, BeanCoin offers unique benefits tailored to coffee lovers. Join the BeanCoin revolution today 🚀 and brew your future with us, making every transaction as satisfying as your morning cup 🌄. Embrace the fusion of financial innovation and coffee culture with BeanCoin! ☕️✨
            </p>
          </Col>
        </Row>
      </Container>

      <Card className="about-container">
        <div className="about-vision">
          <Card.Body>
            <Card.Title style={{ color: "white" }}>Our Vision</Card.Title>
            <Card.Text style={{ color: "white" }}>
              BeanCoin envisions a world where coffee enthusiasts and investors unite on a decentralized platform to create a vibrant community ☕️🌐. Our goal is to empower users with financial freedom 💰 through innovative blockchain technology, while fostering a love for coffee culture 🌍❤️. We strive to make BeanCoin a global currency that supports sustainable coffee farming, fair trade practices, and innovative financial solutions. Join us in revolutionizing the way we connect, trade, and support coffee culture, creating a brighter, more inclusive future for all 🚀✨.
            </Card.Text>
          </Card.Body>
        </div>
        <div className="about-mission">
          <Card.Body>
            <Card.Title style={{ color: "white" }}>Our Mission</Card.Title>
            <Card.Text style={{ color: "white" }}>
              BeanCoin's mission is to revolutionize the coffee industry by providing a decentralized platform for enthusiasts and investors. We aim to promote sustainable farming practices, fair trade, and financial innovation. By creating a vibrant community and supporting ethical coffee production, BeanCoin is paving the way for a brighter future for coffee lovers worldwide ☕️🌍.
            </Card.Text>
          </Card.Body>
        </div>
      </Card>

      <div className="men-content">
        <div className="side left left-side">
          <p>Coffee meets cryptocurrency: BeanCoin revolution.</p>
          <p>Sip, invest, enjoy: BeanCoin magic.</p>
          <p>Financial freedom with BeanCoin.</p>
          <p>Digital coffee culture with BeanCoin.</p>
        </div>
        <div className="men-section">
          <img src={men} alt="men" className="men" />
        </div>
        <div className="side right right-side">
          <p>Coffee's crypto future unveiled.</p>
          <p>Invest smart, sip BeanCoin coffee.</p>
          <p>BeanCoin: Blend of finance and coffee.</p>
          <p>Coffee lovers unite with BeanCoin.</p>
        </div>
      </div>

      <TokenomicsCarousel />
    </div>
  )
}

export default About;

import React from 'react';
import { Container } from 'react-bootstrap';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const phases = [
  {
    title: 'Phase 1: Conceptualization and Planning (Q1 2024)',
    details: [
      'Idea Generation: Identify the core value proposition of Bean Coin, focusing on its unique selling points in the memecoin market.',
      'Market Research: Conduct thorough market analysis to understand current trends, competitor offerings, and potential user base.',
      'Whitepaper Development: Draft and publish a comprehensive whitepaper detailing the vision, technology, use cases, and roadmap of Bean Coin.',
      'Team Formation: Assemble a skilled team of developers, marketers, and advisors to guide the project.',
    ],
  },
  {
    title: 'Phase 2: Initial Development (Q2 2024)',
    details: [
      'Blockchain Selection: Choose the blockchain platform that will best support Bean Coin’s goals, ensuring scalability, security, and efficiency.',
      'Smart Contract Development: Develop and test smart contracts for Bean Coin to handle transactions, staking, and governance.',
      'Community Building: Launch social media channels and community forums to start engaging with potential users and investors.',
      'Website Launch: Develop and launch the official Bean Coin website, featuring the whitepaper, roadmap, and community resources.',
    ],
  },
  {
    title: 'Phase 3: Token Creation and Pre-Sale (Q3 2024)',
    details: [
      'Token Creation: Mint the initial supply of Bean Coins and ensure the smart contracts are secure and functional.',
      'Pre-Sale Campaign: Conduct a pre-sale to raise initial funding, offering early investors a chance to purchase Bean Coins at a discounted rate.',
      'Marketing Blitz: Initiate a comprehensive marketing campaign to raise awareness and generate buzz around the pre-sale and the upcoming ICO.',
    ],
  },
  {
    title: 'Phase 4: Initial Coin Offering (ICO) and Launch (Q4 2024)',
    details: [
      'ICO Preparation: Finalize all legal and regulatory requirements for the ICO, ensuring transparency and compliance.',
      'ICO Launch: Conduct the ICO, providing the public with the opportunity to invest in Bean Coin.',
      'Exchange Listings: List Bean Coin on major cryptocurrency exchanges to ensure liquidity and accessibility for investors.',
      'Mainnet Launch: Deploy the Bean Coin blockchain network, making the token fully operational.',
    ],
  },
  {
    title: 'Phase 5: Ecosystem Development (Q1 2025)',
    details: [
      'Partnerships: Form strategic partnerships with other blockchain projects, businesses, and influencers to expand the Bean Coin ecosystem.',
      'Wallet Integration: Develop and release official Bean Coin wallets for various platforms, ensuring secure storage and easy transactions for users.',
      'Community Initiatives: Launch community engagement programs, including a bug bounty program, developer grants, and user rewards to encourage participation and innovation.',
    ],
  },
  {
    title: 'Phase 6: Expansion and Innovation (Q2 2025 and Beyond)',
    details: [
      'Bean Coin Apps: Develop and launch decentralized applications (dApps) that utilize Bean Coin, such as staking platforms, gaming apps, and social media tools.',
      'Continuous Improvement: Regularly update the Bean Coin network with new features, improvements, and security enhancements.',
      'Global Outreach: Expand marketing and community efforts to reach a global audience, increasing adoption and usage of Bean Coin worldwide.',
      'Long-Term Vision: Continuously evolve the Bean Coin ecosystem to remain at the forefront of the memecoin market, adapting to new trends and technological advancements.',
    ],
  },
];

const Map = () => {
  return (
    <Container>
      <h2 className="text-center my-5">Project Timeline</h2>
      <VerticalTimeline>
        {phases.map((phase, index) => (
          <VerticalTimelineElement
            key={index}
            date={phase.title}
            iconStyle={{ background: '#8B4513', color: '#D2691E' }} // Colors updated here
            contentStyle={{ background: '#DEB887', color: '#8B4513' }} // Colors updated here
            contentArrowStyle={{ borderRight: '7px solid  #DEB887' }} // Colors updated here
          >
            <h3 className="vertical-timeline-element-title">{phase.title}</h3>
            <ul>
              {phase.details.map((detail, i) => (
                <li key={i}>{detail}</li>
              ))}
            </ul>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </Container>
  );
};

export default Map;

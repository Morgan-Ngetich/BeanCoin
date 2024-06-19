import React from 'react';
// import DonutChart from './DonutChart';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import blog from "../assets/Blog.png";
import DonutChart from './DonutChart'


const TokenomicsCarousel = () => {
  const items = [
    {
      title: 'Total Supply',
      content: '1,000,000,000 BEAN: This is the maximum number of BeanCoins that will ever be in circulation.'
    },
    {
      title: 'Allocation Breakdown',
      content: (
        <>
          <ul>
            <li>Team: 100,000,000 BEAN (10%)</li>
            <li>Marketing: 150,000,000 BEAN (15%)</li>
            <li>Community: 250,000,000 BEAN (25%)</li>
            <li>Liquidity: 200,000,000 BEAN (20%)</li>
            <li>Public Sale: 300,000,000 BEAN (30%)</li>
          </ul>
          
        </>
      )
    },
    {
      title: 'Staking Rewards',
      content: '100,000,000 BEAN: Allocated specifically for rewarding users who participate in staking their BeanCoins. This incentivizes holding and staking, contributing to network security and stability.'
    },
    {
      title: 'Vesting Schedule',
      content: 'Team Tokens: To prevent immediate sell-off and to ensure long-term alignment with the project\'s success, team tokens are released gradually. 20% released every 6 months over a period of 2.5 years, ensuring that team members remain committed to the project\'s growth and development.'
    },
    {
      title: 'Burn Rate',
      content: '1% of each transaction: To reduce the total supply over time and to increase the scarcity of BeanCoin, 1% of every transaction is burned. This mechanism helps in maintaining the value of the remaining tokens.'
    },
    {
      title: 'Governance',
      content: 'Community Proposals and Voting: BeanCoin holders can participate in the governance of the ecosystem. Proposals can be made regarding the future direction, development, and usage of BeanCoin, and holders can vote on these proposals.'
    },
    {
      title: 'Liquidity Pool',
      content: 'Incentives for Staking and Liquidity Provision: Users who contribute to the liquidity pool and participate in staking are rewarded with BeanCoins from the liquidity allocation. This promotes a healthy and active ecosystem.'
    },
    {
      title: 'Release Mechanism',
      content: 'Gradual Release: Tokens are released in a controlled and gradual manner to ensure the stability of the token\'s value and to avoid market shocks. This approach supports steady growth and adoption.'
    }
  ];

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 3
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <div className="Tokenomics" style={{ backgroundImage: `url(${blog})` }}>
      <h3>Tokenomics</h3>
      
      <Carousel responsive={responsive} infinite={true} className="carousel-container">
        {items.map((item, index) => (
          <div key={index} className="Tokenomics-card">
            <h2>{item.title}</h2>
            <div>{item.content}</div>
          </div>
        ))}
      </Carousel>

      < DonutChart />
    </div>
  );
};

export default TokenomicsCarousel;

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary components
Chart.register(ArcElement, Tooltip, Legend);

const DonutChart = () => {
  const data = {
    labels: ['Team', 'Marketing', 'Community', 'Liquidity', 'Public Sale'],
    datasets: [
      {
        data: [100000000, 150000000, 250000000, 200000000, 300000000],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'right',
        labels: {
          font: {
            size: 14,            
          },
          color: 'white',
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const dataset = tooltipItem.dataset;
            const dataIndex = tooltipItem.dataIndex;
            const label = data.labels[dataIndex] || '';
            const value = dataset.data[dataIndex] || 0;
            const total = dataset.data.reduce((acc, curr) => acc + curr, 0);
            const percentage = ((value / total) * 100).toFixed(2);
            return `${label}: ${value.toLocaleString()} BEAN (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="donut-chart-container">
      <h3>BeanCoin Tokenomics Distribution</h3>
      <Doughnut data={data} options={options} />
    </div>
  );
};


export default DonutChart;
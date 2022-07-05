import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { formatDate } from '../common/CommonUtils';
import Web3 from 'web3';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Price Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'USD Price',
      data: [100, 200, 140, 300, 400, 220, 500],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

export default function Graph({prices}) {
  const getChartData = () => {
    let labels = [];
    let data = [];
    for (let i in prices) {
      const price = prices[i];

      labels.push(formatDate(new Date(price.updatedAt)));
      data.push(Web3.utils.fromWei(price.price + ''));
    }

    return {
      labels,
      datasets: [
        {
          label: 'USD Price',
          data: data,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    };
  }

  return <Bar options={options} data={getChartData()} />;
}

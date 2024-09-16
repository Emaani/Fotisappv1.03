'use client'

import React, { useEffect, useRef } from 'react';
import { Chart, ChartConfiguration } from 'chart.js/auto';
import 'chartjs-adapter-date-fns';

interface PriceChartProps {
  selectedCommodity: string;
  theme: 'light' | 'dark';
}

const PriceChart: React.FC<PriceChartProps> = ({ selectedCommodity, theme }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Generate mock data for the selected commodity
    const mockData = Array.from({ length: 100 }, (_, i) => ({
      x: new Date(2024, 0, i + 1),
      y: Math.random() * 100 + 50
    }));

    const chartConfig: ChartConfiguration = {
      type: 'line',
      data: {
        datasets: [{
          label: selectedCommodity,
          data: mockData,
          borderColor: theme === 'dark' ? 'rgba(75, 192, 192, 1)' : 'rgba(75, 192, 192, 1)',
          backgroundColor: theme === 'dark' ? 'rgba(75, 192, 192, 0.2)' : 'rgba(75, 192, 192, 0.2)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'time',
            time: { unit: 'day' },
            grid: { color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' },
            ticks: { color: theme === 'dark' ? 'white' : 'black' }
          },
          y: {
            grid: { color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' },
            ticks: { color: theme === 'dark' ? 'white' : 'black' }
          }
        },
        plugins: {
          legend: {
            labels: { color: theme === 'dark' ? 'white' : 'black' }
          }
        }
      }
    };

    chartInstance.current = new Chart(ctx, chartConfig);

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [selectedCommodity, theme]);

  return <canvas ref={chartRef} />;
};

export default PriceChart;
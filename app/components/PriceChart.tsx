'use client'

import React, { useEffect, useRef, useMemo, useState } from 'react';
import { Chart, ChartConfiguration } from 'chart.js/auto';
import 'chartjs-adapter-date-fns';

interface PriceChartProps {
  selectedCommodity: string;
  theme: 'light' | 'dark';
}

const PriceChart: React.FC<PriceChartProps> = ({ selectedCommodity, theme }) => {
  const [price, setPrice] = useState<number | null>(null);

  const lineChartRef = useRef<HTMLCanvasElement | null>(null);
  const pieChartRef = useRef<HTMLCanvasElement | null>(null);
  const lineChartInstance = useRef<Chart | null>(null);
  const pieChartInstance = useRef<Chart | null>(null);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Generate synchronized data
  const data = useMemo(() => {
    return months.map(() => Math.random() * 1000 + 500);
  }, [selectedCommodity]);

  // Calculate total and percentages for pie chart
  const total = data.reduce((sum, value) => sum + value, 0);
  const percentages = data.map(value => ((value / total) * 100).toFixed(2));

  const lineChartConfig = useMemo<ChartConfiguration>(() => ({
    type: 'line',
    data: {
      labels: months,
      datasets: [{
        label: selectedCommodity,
        data: data,
        borderColor: theme === 'dark' ? 'rgba(75, 192, 192, 1)' : 'rgba(75, 192, 192, 1)',
        backgroundColor: theme === 'dark' ? 'rgba(75, 192, 192, 0.2)' : 'rgba(75, 192, 192, 0.2)',
        tension: 0.1
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
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
          display: false
        }
      }
    }
  }), [selectedCommodity, theme, data]);

  const pieChartConfig = useMemo<ChartConfiguration>(() => ({
    type: 'doughnut',
    data: {
      labels: months,
      datasets: [{
        data: percentages,
        backgroundColor: [
          '#8b0000', '#ff0000', '#ffc0cb', '#ff69b4', '#00ff00', '#90ee90', '#32cd32', '#006400',
          '#4169e1', '#0000ff', '#00008b', '#4b0082'
        ]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: false
        }
      },
      cutout: '70%'
    }
  }), [percentages]);

  useEffect(() => {
    if (!lineChartRef.current || !pieChartRef.current) return;

    const lineCtx = lineChartRef.current.getContext('2d');
    const pieCtx = pieChartRef.current.getContext('2d');
    if (!lineCtx || !pieCtx) return;

    if (lineChartInstance.current) {
      lineChartInstance.current.destroy();
    }
    if (pieChartInstance.current) {
      pieChartInstance.current.destroy();
    }

    lineChartInstance.current = new Chart(lineCtx, lineChartConfig);
    pieChartInstance.current = new Chart(pieCtx, pieChartConfig);

    return () => {
      if (lineChartInstance.current) {
        lineChartInstance.current.destroy();
      }
      if (pieChartInstance.current) {
        pieChartInstance.current.destroy();
      }
    };
  }, [lineChartConfig, pieChartConfig]);

  // Calculate net outflow (example calculation)
  const netOutflow = (data[data.length - 1] - data[0]).toFixed(2);

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'} p-4`}>
      <div className="mb-8">
        <canvas ref={lineChartRef} />
      </div>
      <div className="flex items-center justify-center">
        <div className="w-48 h-48 relative">
          <canvas ref={pieChartRef} />
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <div className="text-sm">Net Outflow</div>
            <div className="text-2xl font-bold">{netOutflow}</div>
          </div>
        </div>
        <div className="ml-4">
          {months.map((month, index) => (
            <div key={index} className="flex items-center mb-1">
              <div 
                className="w-3 h-3 mr-2" 
                style={{ backgroundColor: pieChartConfig.data.datasets[0]?.backgroundColor?.[index] || 'transparent' }}
              ></div>
              <div className="text-sm">{month}: {percentages[index]}%</div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 text-center">
        <span className="mr-4">Inflow: <span className="font-bold">{data[0].toFixed(2)}</span></span>
        <span>Outflow: <span className="font-bold">{data[data.length - 1].toFixed(2)}</span></span>
      </div>
    </div>
  );
};

export default PriceChart;
'use client'

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PriceChart from './components/PriceChart';
import CommodityList from './components/CommodityList';
import UpcomingEvents from './components/UpcomingEvents';

interface CommodityData {
  name: string;
  price: number;
  change: number;
  changePercentage: number;
}

const hardcodedData: CommodityData[] = [
  { name: 'Soybeans', price: 2500, change: -0.14, changePercentage: -1.32 },
  { name: 'Coffee', price: 13000, change: 1.27, changePercentage: 0.52 },
  { name: 'Maize', price: 900, change: -0.02, changePercentage: -0.41 },
  { name: 'Sesame', price: 6000, change: 0.05, changePercentage: 0.89 },
  { name: 'Sunflower', price: 1300, change: 0.05, changePercentage: 0.89 },
];

const Dashboard: React.FC = () => {
  const [selectedCommodity, setSelectedCommodity] = useState<string>('Soybeans');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <Header theme={theme} toggleTheme={toggleTheme} marketData={hardcodedData} />
      <main className="container mx-auto p-4 grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <PriceChart selectedCommodity={selectedCommodity} theme={theme} />
        </div>
        <div>
          <CommodityList 
            commodities={hardcodedData} 
            setSelectedCommodity={setSelectedCommodity}
          />
          <UpcomingEvents />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
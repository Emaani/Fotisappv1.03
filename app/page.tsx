'use client'

import React, { useState } from 'react';
import { useTheme } from './components/ThemeContext'; // Adjust the import path as needed
import PriceChart from './components/PriceChart';
import CommodityList from './components/CommodityList';
import UpcomingEvents from './components/UpcomingEvents';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import SignUp from './components/Signup';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Link from 'next/link';

<div>
    <Link href="/TradeCommodities">Trade Commodities</Link>
    <Router>
      <Navigation />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </Router>
</div>
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
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <main className="container mx-auto p-4 grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <PriceChart selectedCommodity={selectedCommodity} theme={theme as "light" | "dark"} />
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
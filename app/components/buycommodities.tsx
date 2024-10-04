'use client'

import React, { useState } from 'react';
import { useTheme } from './ThemeContext';

interface Commodity {
  name: string;
  bestSell: number;
  bestBuy: number;
  marketPrice: number;
  change24h: number;
  buyers: number;
  sellers: number;
  marketValue: number;
}

const commodities: Commodity[] = [
  { name: 'SMAZ', bestSell: 765, bestBuy: 760, marketPrice: 765, change24h: 4.73, buyers: 1013, sellers: 243, marketValue: 79.67 },
  { name: 'SSBS', bestSell: 850, bestBuy: 820.8, marketPrice: 870, change24h: 0, buyers: 13, sellers: 51, marketValue: 98.18 },
  { name: 'SPRL', bestSell: 1000, bestBuy: 950, marketPrice: 950, change24h: 0, buyers: 46, sellers: 1050, marketValue: 44.21 },
  { name: 'SSGM', bestSell: 900, bestBuy: 0, marketPrice: 900, change24h: 0, buyers: 0, sellers: 1, marketValue: 18.8 },
  { name: 'SCOC', bestSell: 11800, bestBuy: 11500, marketPrice: 11350, change24h: 0, buyers: 11, sellers: 28, marketValue: 199.2 },
  { name: 'SCSN', bestSell: 1400, bestBuy: 1350, marketPrice: 1350, change24h: 0, buyers: 35, sellers: 40, marketValue: 25.08 },
  { name: 'SSSM', bestSell: 2090, bestBuy: 0, marketPrice: 2090, change24h: 0, buyers: 0, sellers: 0, marketValue: 54.34 },
];

const Commodities: React.FC = () => {
  const { theme } = useTheme();
  const [selectedBoard, setSelectedBoard] = useState('Cash Settled');

  const handleBuy = (commodity: string) => {
    // Check if user is logged in (you'll need to implement this check)
    const isLoggedIn = false; // Replace with actual login check

    if (!isLoggedIn) {
      // Redirect to login page
      window.location.href = '/login';
    } else {
      // Implement buy functionality
      console.log(`Buying ${commodity}`);
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Commodities</h1>
        
        <div className="mb-4">
          <button 
            className={`mr-2 px-3 py-1 rounded ${selectedBoard === 'Cash Settled' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setSelectedBoard('Cash Settled')}
          >
            Cash Settled (8)
          </button>
          <button 
            className={`mr-2 px-3 py-1 rounded ${selectedBoard === 'OTC' ? 'bg-gray-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setSelectedBoard('OTC')}
          >
            OTC (11)
          </button>
          {/* Add other board buttons here */}
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Name</th>
              <th className="text-right py-2">Best Sell</th>
              <th className="text-right py-2">Best Buy</th>
              <th className="text-right py-2">Market Price</th>
              <th className="text-right py-2">24h Change (%)</th>
              <th className="text-center py-2">Buyers/Sellers</th>
              <th className="text-right py-2">Market Value</th>
              <th className="text-center py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {commodities.map((commodity) => (
              <tr key={commodity.name} className="border-b">
                <td className="py-2">{commodity.name}</td>
                <td className="text-right py-2">₦{commodity.bestSell}</td>
                <td className="text-right py-2">₦{commodity.bestBuy}</td>
                <td className="text-right py-2">₦{commodity.marketPrice}</td>
                <td className={`text-right py-2 ${commodity.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {commodity.change24h}%
                </td>
                <td className="text-center py-2">
                  <div className="flex justify-center items-center">
                    <div className="bg-green-500 h-2" style={{width: `${(commodity.buyers / (commodity.buyers + commodity.sellers)) * 100}%`}}></div>
                    <div className="bg-red-500 h-2" style={{width: `${(commodity.sellers / (commodity.buyers + commodity.sellers)) * 100}%`}}></div>
                  </div>
                  <div className="text-xs mt-1">
                    {commodity.buyers}kg / {commodity.sellers}kg
                  </div>
                </td>
                <td className="text-right py-2">₦{commodity.marketValue}M</td>
                <td className="text-center py-2">
                  <button
                    onClick={() => handleBuy(commodity.name)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Buy
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Commodities;
'use client';

import React, { useState } from 'react';
import CommoditySelection from '../components/CommoditySelection';
import CommodityDetails from '../components/TradeCommodityDetails';
import Link from 'next/link';

const BuyCommoditiesPage: React.FC = () => {
  const [selectedCommodity, setSelectedCommodity] = useState('Soybeans');
  const [tradeAmount, setTradeAmount] = useState(0);
  const [riskAmount, setRiskAmount] = useState(0);


  const handleCommodityChange = (commodity: string) => {
    setSelectedCommodity(commodity);
  };

  const handleTrade = () => {
    // Here we will implement the trade functionality
    console.log(`Trading ${tradeAmount} of ${selectedCommodity} at risk ${riskAmount}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200">
      
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Buy Commodities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Commodity Selection Dropdown */}
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
            <CommoditySelection
              selectedCommodity={selectedCommodity}
              onCommodityChange={handleCommodityChange}
            />
          </div>

          {/* Commodity Details Section */}
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
            <CommodityDetails
              commodity={selectedCommodity}
              tradeAmount={tradeAmount}
              riskAmount={riskAmount}
              setTradeAmount={setTradeAmount}
              setRiskAmount={setRiskAmount}
            />
          </div>
        </div>

        {/* Buy/Sell Buttons */}
        <div className="flex justify-around mt-6">
          <button
            className="bg-red-500 text-white font-bold py-2 px-6 rounded-lg"
            onClick={() => handleTrade()}
          >
            Sell {selectedCommodity}
          </button>
          <button
            className="bg-green-500 text-white font-bold py-2 px-6 rounded-lg"
            onClick={() => handleTrade()}
          >
            Buy {selectedCommodity}
          </button>
        </div>

        {/* Back to Dashboard */}
        <div className="mt-8">
          <Link href="/" className="text-blue-500 underline">Back to Dashboard</Link>
        </div>
      </div>
    </div>
  );
};

export default BuyCommoditiesPage;


'use client'

import React, { useState } from 'react';

const BuyCommodities: React.FC = () => {
  // Sample data for commodities
  const commodities = [
    { name: 'SMAZ', bestSell: '₦765', bestBuy: '₦760', marketPrice: '₦765', change: '4.73%', buyers: '1,013 kg', sellers: '243 kg', marketValue: '₦79.67M' },
    { name: 'SSBS', bestSell: '₦850', bestBuy: '₦820.8', marketPrice: '₦870', change: '0.00%', buyers: '13 kg', sellers: '51 kg', marketValue: '₦98.18M' },
    { name: 'SPRL', bestSell: '₦1,000', bestBuy: '₦950', marketPrice: '₦950', change: '0.00%', buyers: '46 kg', sellers: '1,050 kg', marketValue: '₦44.21M' },
    // Add more commodities as needed
  ];

  const [activeTab, setActiveTab] = useState('Cash Settled');

  const renderCommodities = () => {
    return commodities.map((commodity, index) => (
      <div key={index} className="bg-white rounded-lg shadow-md p-4 mb-4">
        <h3 className="text-lg font-semibold">{commodity.name}</h3>
        <p><strong>Best Sell:</strong> {commodity.bestSell}</p>
        <p><strong>Best Buy:</strong> {commodity.bestBuy}</p>
        <p><strong>Market Price:</strong> {commodity.marketPrice}</p>
        <p className={`text-${commodity.change.includes('-') ? 'red' : 'green'}-500`}>
          <strong>24h Change:</strong> {commodity.change}
        </p>
        <p><strong>Buyers:</strong> {commodity.buyers}</p>
        <p><strong>Sellers:</strong> {commodity.sellers}</p>
        <p><strong>Market Value:</strong> {commodity.marketValue}</p>
      </div>
    ));
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <header className="bg-white shadow-md p-4 mb-6">
        <h1 className="text-2xl font-bold">Buy Commodities</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Total Volume</h2>
          <p className="text-2xl">529,927.01 MT</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Total Securities</h2>
          <p className="text-2xl">41</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Number Of Participants</h2>
          <p className="text-2xl">24</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Listed Contracts</h2>
          <p className="text-2xl">3,640</p>
        </div>
      </div>

      <div className="mb-4">
        <button 
          className={`px-4 py-2 rounded ${activeTab === 'Cash Settled' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`} 
          onClick={() => setActiveTab('Cash Settled')}
        >
          Cash Settled
        </button>
        <button 
          className={`px-4 py-2 rounded ${activeTab === 'OTC' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`} 
          onClick={() => setActiveTab('OTC')}
        >
          OTC
        </button>
        <button 
          className={`px-4 py-2 rounded ${activeTab === 'Deliverable Settled' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`} 
          onClick={() => setActiveTab('Deliverable Settled')}
        >
          Deliverable Settled
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {renderCommodities()}
      </div>
    </div>
  );
};

export default BuyCommodities;



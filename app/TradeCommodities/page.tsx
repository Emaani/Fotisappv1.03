'use client';

import React, { useState } from 'react';
import CommoditySelection from '../components/CommoditySelection'; // Ensure correct import
import CommodityDetails from '../components/TradeCommodityDetails'; // Ensure correct import
import Wallet from '../components/Wallet'; // Ensure correct import
import Link from 'next/link';
import { useCommodityPrice } from '../hooks/useCommodityPrice';
import { useTokenBalance } from '../hooks/useTokenBalance';
import { purchaseTokens, cashOutTokens } from '../api/MobileMoneyAPI/MobileMoneyAPI';

const TradeCommoditiesPage: React.FC = () => {
  const [selectedCommodity, setSelectedCommodity] = useState<"Soybeans" | "Coffee" | "Maize" | "Sesame" | "Sunflower">("Soybeans"); // Set a default value
  const [tradeAmount, setTradeAmount] = useState(0);
  const { pricePerUnit, loading: priceLoading } = useCommodityPrice(selectedCommodity);
  const { tokenBalance, loading: balanceLoading } = useTokenBalance();

  const handleCommodityChange = (commodity: "Soybeans" | "Coffee" | "Maize" | "Sesame" | "Sunflower") => {
    setSelectedCommodity(commodity);
  };

  const handleTrade = async (action: 'buy' | 'sell') => {
    const totalCost = tradeAmount * pricePerUnit;
    if (action === 'buy') {
      try {
        await purchaseTokens(totalCost);
        // Update token balance after successful purchase
        // You might want to implement a function to refresh the balance
      } catch (error) {
        console.error('Error purchasing tokens:', error);
      }
    } else {
      try {
        await cashOutTokens(totalCost);
        // Update token balance after successful cash out
        // You might want to implement a function to refresh the balance
      } catch (error) {
        console.error('Error cashing out tokens:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Trade Commodities</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Commodity Selection Dropdown */}
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
            <CommoditySelection
              selectedCommodity={selectedCommodity}
              onCommodityChange={(commodity: string) => {
                if (["Soybeans", "Coffee", "Maize", "Sesame", "Sunflower"].includes(commodity)) {
                  handleCommodityChange(commodity as "Soybeans" | "Coffee" | "Maize" | "Sesame" | "Sunflower");
                }
              }}
            />
          </div>

          {/* Commodity Details Section */}
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
            <CommodityDetails
              commodity={selectedCommodity}
              tradeAmount={tradeAmount}
              setTradeAmount={setTradeAmount}
              currentPrice={pricePerUnit}
              amountInStock={1000} // This should be fetched from an API
              tokenBalance={tokenBalance}
            />
          </div>

          {/* Wallet Section */}
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
            <Wallet tokenBalance={tokenBalance} />
          </div>
        </div>

        {/* Buy/Sell Buttons */}
        <div className="flex justify-around mt-6">
          <button
            className="bg-red-500 text-white font-bold py-2 px-6 rounded-lg"
            onClick={() => handleTrade('sell')}
            disabled={balanceLoading || priceLoading}
          >
            Sell {selectedCommodity}
          </button>
          <button
            className="bg-green-500 text-white font-bold py-2 px-6 rounded-lg"
            onClick={() => handleTrade('buy')}
            disabled={balanceLoading || priceLoading}
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

export default TradeCommoditiesPage;

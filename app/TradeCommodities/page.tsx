'use client';

import React, { useState } from 'react';
import CommoditySelection from '../components/CommoditySelection';
import CommodityDetails from '../components/TradeCommodityDetails';
import Wallet from '../components/Wallet';
import Link from 'next/link';
import { useCommodityPrice } from '../hooks/useCommodityPrice';
import { useTokenBalance } from '../hooks/useTokenBalance';
import { useTokenPurchase } from '../hooks/useTokenPurchase';
import { purchaseTokens, cashOutTokens } from '../api/MobileMoneyAPI/MobileMoneyAPI';

const TradeCommoditiesPage: React.FC = () => {
  interface Transaction {
    id: number;
    amount: number;
    date: string;
    type: 'buy' | 'sell';
    commodity: string;
  }

  const [selectedCommodity, setSelectedCommodity] = useState<"Soybeans" | "Coffee" | "Maize" | "Sesame" | "Sunflower">("Soybeans");
  const [tradeAmount, setTradeAmount] = useState(0);
  const [availableStock, setAvailableStock] = useState(1000);  // Set initial stock
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const { pricePerUnit, loading: priceLoading } = useCommodityPrice(selectedCommodity);
  const { tokenBalance, loading: balanceLoading } = useTokenBalance();
  const { purchaseTokens: buyTokens, purchaseSuccess, loading: purchaseLoading } = useTokenPurchase();

  const handleCommodityChange = (commodity: "Soybeans" | "Coffee" | "Maize" | "Sesame" | "Sunflower") => {
    setSelectedCommodity(commodity);
    setAvailableStock(1000);  // Reset stock when changing commodities
  };

  const handleTrade = async (action: 'buy' | 'sell') => {
    const totalCost = tradeAmount * pricePerUnit;
    if (action === 'buy') {
      try {
        await purchaseTokens(totalCost);
        // Additional logic for after purchase
      } catch (error) {
        console.error('Error purchasing tokens:', error);
      }
    } else {
      try {
        await cashOutTokens(totalCost);
        // Additional logic for after selling
      } catch (error) {
        console.error('Error cashing out tokens:', error);
      }
    }
  };

  const handleBuyTokens = async () => {
    try {
      await buyTokens(tradeAmount);
      if (purchaseSuccess) {
        console.log('Tokens purchased successfully');
      }
    } catch (error) {
      console.error('Error buying tokens:', error);
    }
  };

  const handlePurchase = async (amount: number) => {
    const totalCost = amount * pricePerUnit;
    try {
      await purchaseTokens(totalCost);
      setAvailableStock(prevStock => prevStock - amount);
      setTransactions(prevTransactions => [
        ...prevTransactions,
        {
          id: Date.now(),
          amount,
          date: new Date().toISOString(),
          type: 'buy',
          commodity: selectedCommodity
        }
      ]);
      // Update token balance
    } catch (error) {
      console.error('Error purchasing tokens:', error);
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
              amountInStock={availableStock}  // Pass stock state
              setAmountInStock={setAvailableStock}  // Pass setter for stock
              tokenBalance={tokenBalance}
              currency={''}
              onPurchase={handlePurchase}
            />
          </div>

          {/* Wallet Section */}
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
            <Wallet tokenBalance={tokenBalance} transactions={transactions} />
          </div>
        </div>

        {/* Buy/Sell Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="flex items-center justify-center">
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-md transition duration-300 text-base transform hover:-translate-y-1 hover:shadow-lg active:translate-y-0 active:shadow-md relative overflow-hidden group"
              onClick={() => handleTrade('sell')}
              disabled={balanceLoading || priceLoading}
            >
              <span className="relative z-10">Sell {selectedCommodity}</span>
              <div className="absolute inset-0 bg-white opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            </button>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-md transition duration-300 text-base transform hover:-translate-y-1 hover:shadow-lg active:translate-y-0 active:shadow-md relative overflow-hidden group"
              onClick={() => handleTrade('buy')}
              disabled={balanceLoading || priceLoading}
            >
              <span className="relative z-10">Buy {selectedCommodity}</span>
              <div className="absolute inset-0 bg-white opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            </button>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md transition duration-300 text-base transform hover:-translate-y-1 hover:shadow-lg active:translate-y-0 active:shadow-md relative overflow-hidden group"
              onClick={handleBuyTokens}
              disabled={purchaseLoading}
            >
              <span className="relative z-10">Buy Tokens</span>
              <div className="absolute inset-0 bg-white opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>

        {/* Back to Dashboard */}
        <div className="mt-8">
          <Link href="/" className="text-blue-500 hover:text-blue-600 underline transition duration-300">Back to Dashboard</Link>
        </div>
      </div>
    </div>
  );
};export default TradeCommoditiesPage;

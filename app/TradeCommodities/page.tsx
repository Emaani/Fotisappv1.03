'use client';

import React, { useState } from 'react';
import CommoditySelection from '../components/CommoditySelection';
import CommodityDetails from '../components/TradeCommodityDetails';
import Wallet from '../components/Wallet';
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
  const [availableStock, setAvailableStock] = useState(2000);  // Set initial stock
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [processing, setProcessing] = useState(false);
  const [mobileNumber, setMobileNumber] = useState(""); // State to store mobile number
  const [showMobileInput, setShowMobileInput] = useState(false); // State to control mobile number prompt
  const { pricePerUnit, loading: priceLoading } = useCommodityPrice(selectedCommodity);
  const { tokenBalance, loading: balanceLoading, setTokenBalance } = useTokenBalance(); // Ensure setTokenBalance is available
  const { purchaseTokens: buyTokens, purchaseSuccess, loading: purchaseLoading } = useTokenPurchase();

  // Function to handle commodity change
  const handleCommodityChange = (commodity: "Soybeans" | "Coffee" | "Maize" | "Sesame" | "Sunflower") => {
    setSelectedCommodity(commodity);
    setAvailableStock(1000);  // Reset stock when changing commodities
  };

  // Function to handle buy and sell actions for commodities
  const handleTrade = async (action: 'buy' | 'sell') => {
    const totalCost = tradeAmount * pricePerUnit;
    if (action === 'buy') {
      try {
        setProcessing(true); // Show processing feedback
        await buyTokens(totalCost); // Use the buyTokens function for buying commodity
        setAvailableStock(prevStock => prevStock - tradeAmount); // Deduct from available stock
        setTransactions(prevTransactions => [
          ...prevTransactions,
          {
            id: Date.now(),
            amount: tradeAmount,
            date: new Date().toISOString(),
            type: 'buy',
            commodity: selectedCommodity
          }
        ]);
        setTokenBalance(prevBalance => prevBalance - totalCost); // Update token balance
      } catch (error) {
        console.error('Error purchasing tokens:', error);
      } finally {
        setProcessing(false); // Hide processing feedback
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

  // Function to handle token purchase with Mobile Money
  const handleBuyTokens = async () => {
    // Validate mobile number
    if (mobileNumber.length < 10) {
      alert("Please enter a valid mobile number.");
      return;
    }

    try {
      const totalCost = tradeAmount * pricePerUnit; // Calculate total cost
      setProcessing(true); // Show processing feedback

      // Call the purchase function from MobileMoney API
      const response = await purchaseTokens(mobileNumber, totalCost);
      
      if (response.success) {
        setTokenBalance(prevBalance => prevBalance + tradeAmount); // Add tokens to wallet
        setTransactions(prevTransactions => [
          ...prevTransactions,
          {
            id: Date.now(),
            amount: tradeAmount,
            date: new Date().toISOString(),
            type: 'buy',
            commodity: "Tokens" // Update for token purchase
          }
        ]);
      } else if (response.error === 'low_balance') {
        alert('Transaction failed due to low balance.');
      } else {
        alert('Transaction failed. Please try again.');
      }
    } catch (error) {
      console.error('Error purchasing tokens:', error);
    } finally {
      setProcessing(false); // Hide processing feedback
      setShowMobileInput(false); // Close mobile input
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
              onPurchase={handleTrade} // Use handleTrade directly
            />
          </div>

          {/* Wallet Section */}
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
            <Wallet tokenBalance={tokenBalance} purchaseHistory={transactions} />
          </div>
        </div>

        {/* Buy/Sell Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Sell Commodity Button */}
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

          {/* Buy Commodity Button */}
          <div className="flex items-center justify-center">
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-md transition duration-300 text-base transform hover:-translate-y-1 hover:shadow-lg active:translate-y-0 active:shadow-md relative overflow-hidden group"
              onClick={async () => {
                await handleTrade('buy'); // Call handleTrade directly
              }}
              disabled={balanceLoading || priceLoading || processing}
            >
              <span className="relative z-10">{processing ? 'Processing...' : `Buy ${selectedCommodity}`}</span>
              <div className="absolute inset-0 bg-white opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Buy Token Button */}
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md transition duration-300 text-base transform hover:-translate-y-1 hover:shadow-lg active:translate-y-0 active:shadow-md relative overflow-hidden group"
              onClick={() => setShowMobileInput(true)} // Show mobile input when button is clicked
              disabled={balanceLoading || processing}
            >
              <span className="relative z-10">Buy Tokens</span>
              <div className="absolute inset-0 bg-white opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>

        {/* Modal for Mobile Number Input */}
        {showMobileInput && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg max-w-md mx-auto">
              <h2 className="text-xl font-bold mb-4">Enter Mobile Number</h2>
              <input
                type="text"
                className="w-full p-2 mb-4 border rounded-lg"
                placeholder="Mobile Phone Number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
                onClick={handleBuyTokens}
                disabled={processing}
              >
                {processing ? 'Processing...' : 'Confirm Purchase'}
              </button>
              <button
                className="mt-4 text-red-500 hover:underline"
                onClick={() => setShowMobileInput(false)} // Close modal
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TradeCommoditiesPage;

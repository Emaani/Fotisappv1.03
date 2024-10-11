import React from 'react';
import { Coins } from 'lucide-react';

interface CommodityDetailsProps {
  commodity: string;
  tradeAmount: number;
  setTradeAmount: (amount: number) => void;
  currentPrice: number;
  amountInStock: number;
  setAmountInStock: (newStock: number) => void;  // Added setter for available stock
  tokenBalance: number;
  currency: string;
}

const TradeCommodityDetails: React.FC<CommodityDetailsProps> = ({
  commodity,
  tradeAmount,
  setTradeAmount,
  currentPrice,
  amountInStock,
  setAmountInStock,
  tokenBalance,
  currency
}) => {

  const handleTradeAmountChange = (amount: number) => {
    setTradeAmount(amount);
  };

  const handleBuyCommodity = () => {
    if (tradeAmount <= amountInStock) {
      setAmountInStock(amountInStock - tradeAmount);
    } else {
      alert('Insufficient stock!');
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">{commodity} Trading</h3>
      <div className="flex items-center space-x-2">
        <span className="text-yellow-500">Coin</span>
        <span>Token Balance: {tokenBalance.toFixed(2)}</span>
      </div>
      <div>
        <p>Current Price: {currency}{currentPrice.toFixed(2)}</p>
        <p>Available Stock: {amountInStock}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Amount to Trade:
        </label>
        <input
          type="number"
          value={tradeAmount > 0 ? tradeAmount : ''}
          onChange={(e) => handleTradeAmountChange(Number(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          max={amountInStock}
          min={1}
          placeholder="Enter amount"
        />
      </div>
      <div>
        <p className="font-semibold">Total Cost: {currency}{(tradeAmount * currentPrice).toFixed(2)}</p>
      </div>
      <div className="flex justify-between items-center">
    
      <Coins />
      </div>
    </div>
  );
};

export default TradeCommodityDetails;

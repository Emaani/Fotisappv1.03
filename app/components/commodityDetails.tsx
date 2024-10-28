import React from 'react';

interface CommodityDetailsProps {
  commodity: string;
  tradeAmount: number;
  setTradeAmount: (amount: number) => void;
  currentPrice: number | null;
  amountInStock: number;
  currency: string;
}

const CommodityDetails: React.FC<CommodityDetailsProps> = ({
  commodity,
  tradeAmount,
  setTradeAmount,
  currentPrice,
  amountInStock,
  currency,
}) => {
  const handleTradeAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = parseInt(e.target.value);
    setTradeAmount(isNaN(amount) ? 0 : amount);
  };

  const totalCost = currentPrice !== null ? currentPrice * tradeAmount : null;

  const formatCurrency = (amount: number | null) => {
    if (amount === null) return 'N/A';
    return `${amount.toFixed(2)} ${currency}`;
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">{commodity} Details</h3>
      <div>
        <p>Current Price: {formatCurrency(currentPrice)}</p>
        <p>Available Stock: {amountInStock}</p>
      </div>
      <div>
        <label htmlFor="tradeAmount" className="block mt-2">Trade Amount:</label>
        <input
          type="number"
          id="tradeAmount"
          value={tradeAmount}
          onChange={handleTradeAmountChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div className="mt-2">
        <p>Total Cost: {formatCurrency(totalCost)}</p>
      </div>
    </div>
  );
};

export default CommodityDetails;
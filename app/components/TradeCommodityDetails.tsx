

import React from 'react';

interface CommodityDetailsProps {
  commodity: string;
  tradeAmount: number;
  riskAmount: number;
  setTradeAmount: (amount: number) => void;
  setRiskAmount: (amount: number) => void;
}

const TradeCommodityDetails: React.FC<CommodityDetailsProps> = ({
  commodity,
  tradeAmount,
  riskAmount,
  setTradeAmount,
  setRiskAmount
}) => {
  return (
    <div>
      <h3 className="text-xl font-semibold">Trade {commodity}</h3>

      <div className="mt-4">
        <label className="block">Amount to Trade:</label>
        <input
          type="number"
          value={tradeAmount}
          onChange={(e) => setTradeAmount(Number(e.target.value))}
          className="mt-2 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div className="mt-4">
        <label className="block">Amount to Risk:</label>
        <input
          type="number"
          value={riskAmount}
          onChange={(e) => setRiskAmount(Number(e.target.value))}
          className="mt-2 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      {/* This can be expanded to show more commodity-specific details */}
    </div>
  );
};

export default TradeCommodityDetails;

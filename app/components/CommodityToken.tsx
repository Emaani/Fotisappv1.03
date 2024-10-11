import React, { useState, useEffect } from 'react';

const commodityPrices = {
  Soybean: 2500,
  Coffee: 13000,
  Maize: 900,
  Sesame: 6000,
  Sunflower: 1300,
};

type CommodityType = keyof typeof commodityPrices;

interface TokenInfo {
  commodity: CommodityType;
  amount: number;
  purchasePrice: number;
}

interface CommodityToken {
  id: string;
  info: TokenInfo;
}

const generateTokenId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

const CommodityTokenization: React.FC = () => {
  const [selectedCommodity, setSelectedCommodity] = useState<CommodityType>('Soybean');
  const [tokenAmount, setTokenAmount] = useState<number>(0);
  const [userTokens, setUserTokens] = useState<CommodityToken[]>([]);
  const [userBalance, setUserBalance] = useState<number>(10000);

  const currentPrice = commodityPrices[selectedCommodity];

  useEffect(() => {
    // Example effect: fetch commodity prices or perform some side effect
  }, []);

  const createToken = () => {
    if (tokenAmount <= 0) {
      alert("Please enter a valid token amount.");
      return;
    }

    const tokenValue = tokenAmount * currentPrice;
    if (tokenValue > userBalance) {
      alert("Insufficient balance to create this token.");
      return;
    }

    const newToken: CommodityToken = {
      id: generateTokenId(),
      info: {
        commodity: selectedCommodity,
        amount: tokenAmount,
        purchasePrice: currentPrice,
      },
    };

    setUserTokens([...userTokens, newToken]);
    setUserBalance(userBalance - tokenValue);
    setTokenAmount(0);
  };

  const sellToken = (token: CommodityToken) => {
    const currentValue = token.info.amount * commodityPrices[token.info.commodity];
    setUserBalance(userBalance + currentValue);
    setUserTokens(userTokens.filter((t) => t.id !== token.id));
  };

  const calculateProfit = (token: CommodityToken): number => {
    const currentValue = token.info.amount * commodityPrices[token.info.commodity];
    const purchaseValue = token.info.amount * token.info.purchasePrice;
    return currentValue - purchaseValue;
  };

  return (
    <div className="p-4">
      {/* header style */}
      <h2 className="block text-lg font-medium">Buy Commodity Token</h2>

      <div className="mb-4">
        <p>User Balance: ${userBalance.toFixed(2)}</p>
      </div>

      <div className="mb-4">
        <label className="block text-lg mb-2">Select Commodity:</label>
        <select
          value={selectedCommodity}
          onChange={(e) => setSelectedCommodity(e.target.value as CommodityType)}
          className="p-2 border rounded"
        >
          {Object.keys(commodityPrices).map((commodity) => (
            <option key={commodity} value={commodity}>
              {commodity}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Token Amount:</label>
        <input
          type="number"
          value={tokenAmount}
          onChange={(e) => setTokenAmount(Number(e.target.value))}
          className="p-2 border rounded"
          min="0"
        />
      </div>

      <button
        onClick={createToken}
        className="bg-green-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-600"
      >
        Create Token
      </button>

      <h3 className="text-xl font-semibold mt-8 mb-4">Your Tokens</h3>
      {userTokens.map((token) => (
        <div key={token.id} className="border p-4 mb-4 rounded">
          <p>Commodity: {token.info.commodity}</p>
          <p>Amount: {token.info.amount}</p>
          <p>Purchase Price: ${token.info.purchasePrice}</p>
          <p>Current Value: ${(token.info.amount * commodityPrices[token.info.commodity]).toFixed(2)}</p>
          <p>Profit/Loss: ${calculateProfit(token).toFixed(2)}</p>
          <button
            onClick={() => sellToken(token)}
            className="bg-red-500 text-white p-2 rounded hover:bg-red-600 mt-2"
          >
            Sell Token
          </button>
        </div>
      ))}
    </div>
  );
};

export default CommodityTokenization;

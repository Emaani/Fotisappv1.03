import React from 'react';
import { Coins, User, Clock } from 'lucide-react';

interface WalletProps {
  tokenBalance: number;
  purchaseHistory: { id: number; amount: number; date: string; type: 'buy' | 'sell'; commodity: string }[]; // Update to include type and commodity
}

const Wallet: React.FC<WalletProps> = ({ tokenBalance, purchaseHistory = [] }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Your Wallet</h3>
      <div className="bg-indigo-100 dark:bg-indigo-900 p-4 rounded-lg">
        <div className="flex items-center space-x-2">
          <User className="text-indigo-600 dark:text-indigo-300" />
          <span className="font-medium">Emanzi Mwine</span>
        </div>
        <div className="mt-4 flex items-center space-x-2">
          <Coins className="text-yellow-500" size={24} />
          <span className="text-2xl font-bold">{tokenBalance.toFixed(2)} Tokens</span>
        </div>
      </div>
      <div>
        <h4 className="text-lg font-semibold mb-2">Purchase History</h4>
        <ul className="space-y-2">
          {purchaseHistory.length > 0 ? (
            purchaseHistory.map((purchase) => (
              <li key={purchase.id} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-2 rounded">
                <div className="flex items-center space-x-2">
                  <Clock className="text-gray-500" size={16} />
                  <span>{purchase.date}</span>
                </div>
                <span className="font-medium">{purchase.amount} Tokens ({purchase.commodity})</span> {/* Update this line */}
              </li>
            ))
          ) : (
            <li className="text-gray-500 dark:text-gray-400">No purchase history available.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Wallet;
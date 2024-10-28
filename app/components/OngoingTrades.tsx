import React from 'react';

interface TradeActivity {
  tradeId: number;
  commodity: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  date: string;
}

const ongoingTradeData: TradeActivity[] = [
  { tradeId: 1, commodity: 'Soybeans', amount: 50, status: 'pending', date: '2024-10-01' },
  { tradeId: 2, commodity: 'Coffee', amount: 100, status: 'completed', date: '2024-10-02' },
  { tradeId: 3, commodity: 'Maize', amount: 30, status: 'failed', date: '2024-10-03' },
];

const OngoingTrades: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Ongoing Trades</h3>
      <ul>
        {ongoingTradeData.map((trade) => (
          <li key={trade.tradeId} className="flex justify-between mb-2">
            <div>{trade.commodity} - {trade.amount} units</div>
            <div className={`text-${trade.status === 'completed' ? 'green' : trade.status === 'failed' ? 'red' : 'yellow'}-500`}>
              {trade.status}
            </div>
            <div>{trade.date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OngoingTrades;

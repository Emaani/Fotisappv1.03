import React from 'react';

interface Commodity {
  name: string;
  price: number;
  change: number;
  changePercentage: number;
}

interface CommodityListProps {
  commodities: Commodity[];
  setSelectedCommodity: (commodity: string) => void;
}

const CommodityList: React.FC<CommodityListProps> = ({ commodities, setSelectedCommodity }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Commodities</h2>
      <div className="space-y-2">
        {commodities.map(commodity => (
          <div 
            key={commodity.name} 
            className="flex justify-between items-center cursor-pointer hover:bg-gray-700 p-2 rounded"
            onClick={() => setSelectedCommodity(commodity.name)}
          >
            <span>{commodity.name}</span>
            <div className="text-right">
              <div>{commodity.price.toFixed(2)}</div>
              <div className={commodity.change >= 0 ? 'text-green-500' : 'text-red-500'}>
                {commodity.change.toFixed(2)} ({commodity.changePercentage.toFixed(2)}%)
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommodityList;
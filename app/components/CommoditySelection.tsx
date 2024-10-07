import React from 'react';

interface CommoditySelectionProps {
  selectedCommodity: string;
  onCommodityChange: (commodity: string) => void;
}

const commodities = ['Soybeans', 'Corn', 'Wheat', 'Coffee'];

const CommoditySelection: React.FC<CommoditySelectionProps> = ({ selectedCommodity, onCommodityChange }) => {
  return (
    <div>
      <label htmlFor="commodity" className="block text-lg font-medium">
        Select Commodity:
      </label>
      <select
        id="commodity"
        value={selectedCommodity}
        onChange={(e) => onCommodityChange(e.target.value)}
        className="mt-2 block w-full p-2 border border-gray-300 rounded-md"
      >
        {commodities.map((commodity) => (
          <option key={commodity} value={commodity}>
            {commodity}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CommoditySelection;

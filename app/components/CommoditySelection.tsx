import React from 'react';

interface CommoditySelectionProps {
  selectedCommodity: string;
  onCommodityChange: (commodity: string) => void;
}

const commodities = ['Soybeans', 'Coffee', 'Maize', 'Sesame', 'Sunflower'];

export const CommoditySelection: React.FC<CommoditySelectionProps> = ({ selectedCommodity, onCommodityChange }) => {
  return (
    <select value={selectedCommodity} onChange={(e) => onCommodityChange(e.target.value)}>
      {commodities.map((commodity) => (
        <option key={commodity} value={commodity}>
          {commodity}
        </option>
      ))}
    </select>
  );
};

export default CommoditySelection;

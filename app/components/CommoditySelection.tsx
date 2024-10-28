import React from 'react';

interface CommoditySelectionProps {
  selectedCommodity: string;
  onCommodityChange: (commodity: string) => void;  // Ensure this is a valid function type
}

const commodities = ['Soybeans', 'Coffee', 'Maize', 'Sesame', 'Sunflower'];

export const CommoditySelection: React.FC<CommoditySelectionProps> = ({ selectedCommodity, onCommodityChange }) => {
  if (typeof onCommodityChange !== 'function') {
    console.error('onCommodityChange is not a function');
    return null;  // Prevents rendering if the prop is incorrect
  }

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
